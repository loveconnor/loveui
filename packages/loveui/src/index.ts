#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

type RegistryFile = {
  path: string;
  target: string;
  content?: string;
};

type RegistryPayload = {
  files?: RegistryFile[];
  dependencies?: Record<string, string> | string[];
  registryDependencies?: string[];
  meta?: {
    tags?: string[];
    [key: string]: any;
  };
};

type ComponentsConfig = {
  aliases?: {
    components?: string;
    utils?: string;
    lib?: string;
  };
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = path.resolve(__dirname, "..");
const BUNDLED_PACKAGES_ROOT = path.join(CLI_ROOT, "packages");

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".cts",
  ".mts",
  ".js",
  ".jsx",
  ".css",
  ".scss",
  ".sass",
  ".mdx",
  ".md"
]);

const EXCLUDED_DIRS = new Set([
  "node_modules",
  "dist",
  ".turbo",
  ".next",
  "build",
  ".cache"
]);

// Love-ui components (Base UI) that should be extracted individually
const LOVE_UI_COMPONENTS = new Set([
  "accordion",
  "alert",
  "alert-dialog",
  "autocomplete",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "card",
  "checkbox",
  "checkbox-group",
  "collapsible",
  "combobox",
  "command",
  "dialog",
  "empty",
  "field",
  "fieldset",
  "form",
  "frame",
  "group",
  "input",
  "label",
  "menu",
  "meter",
  "number-field",
  "pagination",
  "popover",
  "preview-card",
  "progress",
  "radio-group",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "skeleton",
  "slider",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toast",
  "toggle",
  "toggle-group",
  "toolbar",
  "tooltip"
]);

const SCRIPT_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"] as const;
const UTILS_TARGET_PATTERN = /(^|\/)lib\/utils(?:\.[a-z]+)?$/i;
const UTILS_IMPORT_PATTERN =
  /@loveui\/ui\/lib\/utils|@loveui\/shadcn-ui\/lib\/utils|@love-ui\/shadcn-ui\/lib\/utils|@\/lib\/utils|~\/lib\/utils|(?:\.\.\/)+ui\/src\/lib\/utils/;
const DEFAULT_UTILS_TEMPLATE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

type TargetResolution = {
  base: string;
  includePackageName: boolean;
};

function getPackageSlug(packageName: string): string {
  if (!packageName) return packageName;
  const parts = packageName.split("/");
  return parts[parts.length - 1] || packageName;
}

function normalizeAliasPath(alias: string): string {
  let normalized = alias.trim();
  if (!normalized) return normalized;

  if (normalized.startsWith("@/") || normalized.startsWith("~/")) {
    normalized = `src/${normalized.slice(2)}`;
  }

  if (normalized.startsWith("/")) {
    normalized = normalized.slice(1);
  }

  normalized = normalized.replace(/^\.\//, "");
  normalized = normalized.replace(/\/+$/, "");

  return normalized;
}

function normalizeImportPath(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

function stripScriptExtension(value: string): string {
  return value.replace(/\.(?:ts|tsx|js|jsx)$/i, "");
}

function withScriptExtensions(filePath: string): string[] {
  const normalized = stripScriptExtension(filePath);
  return SCRIPT_EXTENSIONS.map((extension) => `${normalized}${extension}`);
}

function resolveBasePrefix(componentsDir: string): "src" | "app" | null {
  const normalized = componentsDir.replace(/\/+$/, "");
  if (normalized === "src" || normalized.startsWith("src/")) return "src";
  if (normalized === "app" || normalized.startsWith("app/")) return "app";
  return null;
}

function normalizePackageDirectory(packageName: string): string {
  const slug = getPackageSlug(packageName);
  if (slug === "ui") return "love-ui";
  return slug;
}

function resolveTargetConfig(packageJson: Record<string, any>): TargetResolution {
  const loveui = packageJson.loveui ?? {};
  const target = typeof loveui.target === "string" ? loveui.target.trim() : "";
  const category = loveui.category as string | undefined;

  if (target) {
    const include = typeof loveui.includePackageName === "boolean" ? loveui.includePackageName : false;
    return {
      base: target.replace(/\/+$/, ""),
      includePackageName: include,
    };
  }

  if (category === "feature") {
    return { base: "components", includePackageName: true };
  }

  if (category === "block") {
    return { base: "components/blocks", includePackageName: true };
  }

  return { base: "components/ui", includePackageName: true };
}

function adjustPathForConfig(
  relative: string,
  targetConfig: TargetResolution,
  packageSlug: string
): { cleanedPath: string; target: string } {
  let cleanedPath = relative.startsWith("src/") ? relative.slice(4) : relative;

  if (!targetConfig.includePackageName) {
    const baseSegments = targetConfig.base.split("/").filter(Boolean);
    const lastSegment = baseSegments[baseSegments.length - 1];
    if (lastSegment && cleanedPath.startsWith(`${lastSegment}/`)) {
      cleanedPath = cleanedPath.slice(lastSegment.length + 1);
    }
  }

  const prefix = targetConfig.includePackageName
    ? `${targetConfig.base}/${packageSlug}`
    : targetConfig.base;

  const normalizedPrefix = prefix.replace(/\/+/g, "/");
  const target = `${normalizedPrefix}/${cleanedPath}`.replace(/\/+/g, "/");

  return { cleanedPath, target };
}

async function loadComponentsConfig(root: string): Promise<ComponentsConfig["aliases"] | null> {
  const configPath = path.join(root, "components.json");
  try {
    const raw = await readFile(configPath, "utf8");
    const parsed = JSON.parse(raw) as ComponentsConfig;
    return parsed.aliases ?? null;
  } catch {
    return null;
  }
}

async function loadCompilerPaths(
  root: string
): Promise<Record<string, string[]> | null> {
  const configPath = ["tsconfig.json", "jsconfig.json"]
    .map((file) => path.join(root, file))
    .find((file) => existsSync(file));

  if (!configPath) return null;

  try {
    const raw = await readFile(configPath, "utf8");
    const parsed = JSON.parse(raw) as Record<string, any>;
    const paths = parsed.compilerOptions?.paths;
    if (!paths || typeof paths !== "object") {
      return null;
    }

    return paths as Record<string, string[]>;
  } catch {
    return null;
  }
}

function resolveAliasPrefix(
  componentAlias: string | undefined,
  compilerPaths: Record<string, string[]> | null
): "@/" | "~/" {
  if (typeof componentAlias === "string") {
    if (componentAlias.trim().startsWith("~/")) return "~/";
    if (componentAlias.trim().startsWith("@/")) return "@/";
  }

  if (compilerPaths) {
    if (Object.prototype.hasOwnProperty.call(compilerPaths, "~/*")) {
      return "~/";
    }
    if (Object.prototype.hasOwnProperty.call(compilerPaths, "@/*")) {
      return "@/";
    }
  }

  return "@/";
}

async function detectComponentsDir(
  root: string,
  configuredComponentsDir: string | null,
  compilerPaths: Record<string, string[]> | null
): Promise<string> {
  if (configuredComponentsDir && configuredComponentsDir.length > 0) {
    return configuredComponentsDir;
  }

  const existingUiDirs = ["src/components/ui", "app/components/ui", "components/ui"];
  for (const uiDir of existingUiDirs) {
    if (existsSync(path.join(root, uiDir))) {
      return uiDir.replace(/\/ui$/, "");
    }
  }

  const existingComponentsDirs = ["src/components", "app/components", "components"];
  for (const componentsDir of existingComponentsDirs) {
    if (existsSync(path.join(root, componentsDir))) {
      return componentsDir;
    }
  }

  if (compilerPaths) {
    const aliasPaths = compilerPaths["@/*"] ?? compilerPaths["~/*"] ?? [];
    if (
      Array.isArray(aliasPaths) &&
      aliasPaths.some((candidate) => /^\.?\/?src\//.test(candidate))
    ) {
      return "src/components";
    }
    if (
      Array.isArray(aliasPaths) &&
      aliasPaths.some((candidate) => /^\.?\/?app\//.test(candidate))
    ) {
      return "app/components";
    }
  }

  if (existsSync(path.join(root, "src"))) {
    return "src/components";
  }

  if (existsSync(path.join(root, "app"))) {
    return "app/components";
  }

  return "components";
}

async function resolveUtilsLocation(
  root: string,
  componentsDir: string,
  aliasPrefix: "@/" | "~/",
  aliases: ComponentsConfig["aliases"] | null
): Promise<{ utilsImportPath: string; utilsFilePath: string }> {
  const configuredUtilsAlias =
    aliases?.utils ??
    (aliases?.lib ? `${aliases.lib.replace(/\/+$/, "")}/utils` : undefined);

  if (configuredUtilsAlias && configuredUtilsAlias.trim().length > 0) {
    const importPath = stripScriptExtension(normalizeImportPath(configuredUtilsAlias));
    const configuredPath = stripScriptExtension(normalizeAliasPath(configuredUtilsAlias));

    for (const candidate of withScriptExtensions(configuredPath)) {
      if (existsSync(path.join(root, candidate))) {
        return {
          utilsImportPath: importPath,
          utilsFilePath: candidate
        };
      }
    }

    return {
      utilsImportPath: importPath,
      utilsFilePath: `${configuredPath}.ts`
    };
  }

  const basePrefix = resolveBasePrefix(componentsDir);
  const preferredBase = basePrefix ? `${basePrefix}/lib/utils` : "lib/utils";
  const searchBases = Array.from(
    new Set([
      preferredBase,
      "src/lib/utils",
      "app/lib/utils",
      "lib/utils"
    ])
  );

  for (const base of searchBases) {
    for (const candidate of withScriptExtensions(base)) {
      if (existsSync(path.join(root, candidate))) {
        return {
          utilsImportPath: `${aliasPrefix}lib/utils`,
          utilsFilePath: candidate
        };
      }
    }
  }

  return {
    utilsImportPath: `${aliasPrefix}lib/utils`,
    utilsFilePath: `${preferredBase}.ts`
  };
}

function adjustTargetPath(target: string, componentsDir: string, utilsFilePath: string): string {
  const collapse = (value: string) => {
    const lead = value.startsWith("/");
    const trail = value.endsWith("/");
    const parts = value.split("/").filter(Boolean);
    const collapsed: string[] = [];
    for (const part of parts) {
      if (collapsed[collapsed.length - 1] === part) continue;
      collapsed.push(part);
    }
    const body = collapsed.join("/");
    return `${lead ? "/" : ""}${body}${trail ? "/" : ""}`;
  };

  const normalizedDir = componentsDir.replace(/\/+$/, "");
  const normalizedTarget = target.replace(/^\.?\//, "");

  if (UTILS_TARGET_PATTERN.test(normalizedTarget)) {
    return collapse(utilsFilePath);
  }

  // Handle components/ paths - replace "components" with the resolved directory
  if (normalizedTarget.startsWith("components/")) {
    const remainder = normalizedTarget.slice("components".length);
    return collapse(`${normalizedDir}${remainder}`.replace(/^\//, ""));
  }

  // Handle lib/ paths - prepend the base directory (src/, app/, or nothing) to lib paths
  if (normalizedTarget.startsWith("lib/")) {
    if (normalizedDir.startsWith("src/")) {
      return collapse(`src/${normalizedTarget}`);
    }
    if (normalizedDir.startsWith("app/")) {
      return collapse(`app/${normalizedTarget}`);
    }
  }

  // Handle hooks/ paths - prepend the base directory (src/, app/, or nothing) to hooks paths
  if (normalizedTarget.startsWith("hooks/")) {
    if (normalizedDir.startsWith("src/")) {
      return collapse(`src/${normalizedTarget}`);
    }
    if (normalizedDir.startsWith("app/")) {
      return collapse(`app/${normalizedTarget}`);
    }
  }

  // Handle ui/ paths - these should go to components/ui/
  if (normalizedTarget.startsWith("ui/")) {
    return collapse(`${normalizedDir}/${normalizedTarget}`);
  }

  return collapse(normalizedTarget);
}

function normalizeComponentContent(content: string, utilsImportPath: string): string {
  const aliasPrefix = utilsImportPath.startsWith("~/") ? "~/" : "@/";

  let normalized = content;
  normalized = normalized.replace(
    /@\/registry\/default\/components\//g,
    `${aliasPrefix}components/`
  );
  normalized = normalized.replace(
    /@\/registry\/default\/ui\//g,
    `${aliasPrefix}components/ui/`
  );
  normalized = normalized.replace(
    /@\/registry\/default\/hooks\//g,
    `${aliasPrefix}hooks/`
  );
  normalized = normalized.replace(
    /@\/registry\/default\/lib\//g,
    `${aliasPrefix}lib/`
  );
  normalized = normalized.replace(
    /@loveui\/ui\/ui\//g,
    `${aliasPrefix}components/ui/`
  );
  normalized = normalized.replace(
    /@loveui\/ui\/lib\//g,
    `${aliasPrefix}lib/`
  );
  normalized = normalized.replace(
    /@\/ui\//g,
    `${aliasPrefix}components/ui/`
  );
  normalized = normalized.replace(
    /@\/registry\/building-blocks\/default\/components\//g,
    `${aliasPrefix}components/`
  );
  normalized = normalized.replace(
    /@\/registry\/building-blocks\/default\/ui\//g,
    `${aliasPrefix}components/ui/`
  );
  normalized = normalized.replace(
    /@\/registry\/building-blocks\/default\/lib\//g,
    `${aliasPrefix}lib/`
  );
  normalized = normalized.replace(
    /@\/registry\/building-blocks\/default\/hooks\//g,
    `${aliasPrefix}hooks/`
  );
  normalized = normalized.replace(
    /@\/registry\/default\/components\//g,
    `${aliasPrefix}components/`
  );
  normalized = normalized.replace(
    /@\/registry\/default\/ui\//g,
    `${aliasPrefix}components/ui/`
  );
  normalized = normalized.replace(
    /@\/registry\/default\/lib\//g,
    `${aliasPrefix}lib/`
  );
  normalized = normalized.replace(
    /@\/registry\/default\/hooks\//g,
    `${aliasPrefix}hooks/`
  );

  normalized = normalized.replace(
    /from\s+["']@loveui\/ui\/lib\/utils["']/g,
    `from "${utilsImportPath}"`
  );
  normalized = normalized.replace(
    /from\s+["']@loveui\/shadcn-ui\/lib\/utils["']/g,
    `from "${utilsImportPath}"`
  );
  normalized = normalized.replace(
    /from\s+["']@love-ui\/shadcn-ui\/lib\/utils["']/g,
    `from "${utilsImportPath}"`
  );
  normalized = normalized.replace(
    /from\s+["']@\/lib\/utils["']/g,
    `from "${utilsImportPath}"`
  );
  normalized = normalized.replace(
    /from\s+["']~\/lib\/utils["']/g,
    `from "${utilsImportPath}"`
  );
  normalized = normalized.replace(
    /from\s+["'](?:\.\.\/)+ui\/src\/lib\/utils["']/g,
    `from "${utilsImportPath}"`
  );

  return normalized;
}

async function ensureUtilsFile(root: string, utilsFilePath: string): Promise<boolean> {
  if (existsSync(path.join(root, utilsFilePath))) {
    return false;
  }

  let content = DEFAULT_UTILS_TEMPLATE;
  const bundledUtilsPath = path.join(BUNDLED_PACKAGES_ROOT, "love-ui", "src", "lib", "utils.ts");
  if (existsSync(bundledUtilsPath)) {
    try {
      content = await readFile(bundledUtilsPath, "utf8");
    } catch {
      /* ignore and fall back to default template */
    }
  }

  await ensureDirectory(utilsFilePath, root);
  await writeFile(path.join(root, utilsFilePath), content, "utf8");

  return true;
}

async function ensureDirectory(filePath: string, root: string) {
  const dir = path.dirname(path.join(root, filePath));
  await mkdir(dir, { recursive: true });
}

async function collectBundledFiles(packageDir: string, packageName: string): Promise<RegistryFile[]> {
  const pkgJsonPath = path.join(packageDir, "package.json");
  let packageJson: Record<string, any> = {};
  try {
    const raw = await readFile(pkgJsonPath, "utf8");
    packageJson = JSON.parse(raw) as Record<string, any>;
  } catch {
    /* ignore */
  }

  const targetConfig = resolveTargetConfig(packageJson);
  const packageSlug = getPackageSlug(packageName);

  const files: RegistryFile[] = [];

  async function walk(current: string, base: string) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;

      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath, base);
        continue;
      }

      const ext = path.extname(entry.name);
      if (!TEXT_EXTENSIONS.has(ext)) continue;
      if (entry.name === "package.json") continue;

      const absolutePosix = path
        .relative(base, fullPath)
        .split(path.sep)
        .join("/");

      const { target } = adjustPathForConfig(absolutePosix, targetConfig, packageSlug);
      const content = await readFile(fullPath, "utf8");

      files.push({
        path: absolutePosix,
        target,
        content,
      });
    }
  }

  await walk(packageDir, packageDir);
  return files;
}

async function getLoveUiComponent(
  componentName: string,
  utilsImportPath: string
): Promise<RegistryFile[] | null> {
  // Love-ui components use Base UI
  const loveUiDir = path.join(BUNDLED_PACKAGES_ROOT, "love-ui");
  const componentFile = path.join(loveUiDir, "src", "ui", `${componentName}.tsx`);

  if (!existsSync(componentFile)) {
    return null;
  }

  try {
    const files: RegistryFile[] = [];

    // Read component file
    let content = await readFile(componentFile, "utf8");

    // Fix import paths to use local utils import alias
    content = normalizeComponentContent(content, utilsImportPath);

    files.push({
      path: `src/ui/${componentName}.tsx`,
      target: `components/ui/${componentName}.tsx`,
      content
    });

    // Always include utils.ts
    const utilsFile = path.join(loveUiDir, "src", "lib", "utils.ts");
    if (existsSync(utilsFile)) {
      const utilsContent = await readFile(utilsFile, "utf8");
      files.push({
        path: "src/lib/utils.ts",
        target: "lib/utils.ts",
        content: utilsContent
      });
    }

    return files;
  } catch (error) {
    console.warn(`Warning: unable to read ${componentName} component`, error);
    return null;
  }
}

async function getBundledRegistryFiles(
  packageName: string,
  utilsImportPath: string
): Promise<RegistryFile[] | null> {
  // Check if it's a love-ui component (Base UI)
  if (LOVE_UI_COMPONENTS.has(packageName)) {
    return await getLoveUiComponent(packageName, utilsImportPath);
  }

  const directory = normalizePackageDirectory(packageName);
  const sourceDir = path.join(BUNDLED_PACKAGES_ROOT, directory);
  if (!existsSync(sourceDir)) return null;

  try {
    return await collectBundledFiles(sourceDir, packageName);
  } catch (error) {
    console.warn(`Warning: unable to read bundled sources for ${packageName}`, error);
    return null;
  }
}

async function getBundledSkillSourceDir(packageName: string): Promise<string | null> {
  const directory = normalizePackageDirectory(packageName);
  const sourceDir = path.join(BUNDLED_PACKAGES_ROOT, directory);
  if (!existsSync(sourceDir)) return null;
  if (!existsSync(path.join(sourceDir, "SKILL.md"))) return null;
  return sourceDir;
}

function resolveCodexHome(): string {
  const codexHome = process.env.CODEX_HOME?.trim();
  if (codexHome) return codexHome;
  return path.join(os.homedir(), ".codex");
}

async function installBundledSkill(packageName: string): Promise<"installed" | "exists" | "missing"> {
  const sourceDir = await getBundledSkillSourceDir(packageName);
  if (!sourceDir) return "missing";

  const codexHome = resolveCodexHome();
  const skillsRoot = path.join(codexHome, "skills");
  const skillName = getPackageSlug(packageName);
  const destinationDir = path.join(skillsRoot, skillName);

  await mkdir(skillsRoot, { recursive: true });

  if (existsSync(destinationDir)) {
    return "exists";
  }

  await cp(sourceDir, destinationDir, {
    recursive: true,
    force: false,
    filter: (src) => {
      const base = path.basename(src);
      if (EXCLUDED_DIRS.has(base)) return false;
      return true;
    }
  });

  return "installed";
}

// Core dependencies that all love-ui components need
const LOVE_UI_CORE_DEPS: Record<string, string> = {
  "@base-ui-components/react": "1.0.0-beta.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1"
};

async function extractDependencies(packageName: string): Promise<Record<string, string>> {
  // For love-ui components, return core dependencies
  if (LOVE_UI_COMPONENTS.has(packageName)) {
    return { ...LOVE_UI_CORE_DEPS };
  }

  // For other packages, use their package.json
  const directory = normalizePackageDirectory(packageName);
  const pkgJsonPath = path.join(BUNDLED_PACKAGES_ROOT, directory, "package.json");

  try {
    const raw = await readFile(pkgJsonPath, "utf8");
    const parsed = JSON.parse(raw) as Record<string, any>;
    return parsed.dependencies ?? {};
  } catch {
    return {};
  }
}

async function detectPackageManager(root: string): Promise<"npm" | "yarn" | "pnpm" | "bun"> {
  if (existsSync(path.join(root, "bun.lockb"))) return "bun";
  if (existsSync(path.join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(root, "yarn.lock"))) return "yarn";
  return "npm";
}

async function installDependencies(
  dependencies: Record<string, string>,
  packageManager: "npm" | "yarn" | "pnpm" | "bun",
  root: string
): Promise<boolean> {
  const deps = Object.entries(dependencies);
  if (deps.length === 0) return true;

  console.log(`\nInstalling dependencies...`);
  const depList = deps.map(([name, version]) => `${name}@${version}`);

  let command: string;
  switch (packageManager) {
    case "bun":
      command = `bun add ${depList.join(" ")}`;
      break;
    case "pnpm":
      command = `pnpm add ${depList.join(" ")}`;
      break;
    case "yarn":
      command = `yarn add ${depList.join(" ")}`;
      break;
    default:
      command = `npm install ${depList.join(" ")}`;
  }

  const result = spawnSync(command, {
    stdio: "inherit",
    shell: true,
    cwd: root,
  });

  if (result.error || result.status !== 0) {
    console.warn(`\nFailed to install dependencies. You may need to install them manually:`);
    console.warn(`  ${depList.join("\n  ")}`);
    return false;
  }

  console.log(`Dependencies installed successfully!\n`);
  return true;
}

export async function run(argv: string[] = process.argv.slice(2)) {
  if (argv.length === 0 || (argv.length === 1 && (argv[0] === "--version" || argv[0] === "-v"))) {
    console.log("love-ui version 1.1.9");
    process.exit(0);
  }

  if (argv.length < 2 || argv[0] !== "add") {
    console.log("Usage: npx love-ui add [...packages]");
    console.log("       npx love-ui --version");
    process.exit(1);
  }

  const packageNames = argv.slice(1);
  const projectRoot = process.cwd();
  const aliases = await loadComponentsConfig(projectRoot);
  const compilerPaths = await loadCompilerPaths(projectRoot);
  const configuredComponentsDir = aliases?.components
    ? normalizeAliasPath(aliases.components)
    : null;
  const componentsDir = await detectComponentsDir(
    projectRoot,
    configuredComponentsDir,
    compilerPaths
  );
  const aliasPrefix = resolveAliasPrefix(aliases?.components, compilerPaths);
  const { utilsImportPath, utilsFilePath } = await resolveUtilsLocation(
    projectRoot,
    componentsDir,
    aliasPrefix,
    aliases
  );
  const packageManager = await detectPackageManager(projectRoot);
  const componentsUiDir = componentsDir.endsWith("/ui")
    ? componentsDir
    : `${componentsDir}/ui`;

  let projectDirectoriesPrepared = false;
  let installedAnyProjectPackage = false;

  const allDependencies: Record<string, string> = {};

  for (const packageName of packageNames) {
    if (!packageName.trim()) {
      continue;
    }

    console.log(`\nAdding ${packageName}...`);

    const skillInstallResult = await installBundledSkill(packageName);
    if (skillInstallResult === "installed") {
      console.log(`✓ Installed skill "${packageName}" to ${path.join(resolveCodexHome(), "skills", getPackageSlug(packageName))}`);
      console.log("Restart Codex to pick up new skills.");
      continue;
    }
    if (skillInstallResult === "exists") {
      console.log(`✓ Skill "${packageName}" is already installed.`);
      console.log("Restart Codex if you do not see it yet.");
      continue;
    }

    if (!projectDirectoriesPrepared) {
      await mkdir(path.join(projectRoot, componentsDir), { recursive: true });
      await mkdir(path.join(projectRoot, componentsUiDir), { recursive: true });
      projectDirectoriesPrepared = true;
    }
    installedAnyProjectPackage = true;

    let payload: RegistryPayload | null = null;
    let bundledFiles: RegistryFile[] | null = null;

    // Check if packageName is a URL
    if (packageName.startsWith('http://') || packageName.startsWith('https://')) {
      // Auto-correct common URL mistakes
      let correctedUrl = packageName;

      // Fix: /building-blocks/r/ should be /building-blocks/ (without /r/)
      if (correctedUrl.includes('/building-blocks/r/')) {
        correctedUrl = correctedUrl.replace('/building-blocks/r/', '/building-blocks/');
        console.log(`Auto-corrected URL to: ${correctedUrl}`);
      }

      // Fetch from the provided URL
      try {
        const response = await fetch(correctedUrl);
        if (response.ok) {
          payload = (await response.json()) as RegistryPayload;
        } else {
          console.warn(`Failed to fetch ${correctedUrl}: HTTP ${response.status}`);
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${correctedUrl}:`, error);
      }
    } else {
      // Try to fetch from registry first
      const url = new URL(`r/${packageName}.json`, "https://www.loveui.dev/");
      try {
        const response = await fetch(url);
        if (response.ok) {
          payload = (await response.json()) as RegistryPayload;
        }
      } catch {
        // Silently fall back to bundled files
      }

      // Use bundled files as primary source for named components
      bundledFiles = await getBundledRegistryFiles(packageName, utilsImportPath);
    }

    // Get files and normalize them (building blocks use 'path' instead of 'target')
    let definitions: RegistryFile[] = bundledFiles ?? payload?.files ?? [];

    // Normalize building block format: if target is missing, use path as target
    // Strip "registry/default/" prefix from building block paths
    definitions = definitions.map(file => {
      let target = file.target || file.path;

      // Remove registry prefix for building blocks
      if (target.startsWith('registry/default/')) {
        target = target.replace('registry/default/', '');
      }

      return {
        ...file,
        target
      };
    });

    // Detect and rename main component file based on subfolder structure or meta tags
    // For building blocks with pattern: comp-XXX.tsx + subfolder/
    // Rename comp-XXX.tsx to subfolder-name-demo.tsx to avoid naming conflicts
    const mainComponentFile = definitions.find(file =>
      file.target.match(/^components\/comp-\d+\.tsx$/)
    );

    if (mainComponentFile) {
      // Find if there's a subfolder (e.g., event-calendar/)
      const subfolderFiles = definitions.filter(file =>
        file.target.match(/^components\/[^/]+\//) &&
        file.target !== mainComponentFile.target
      );

      if (subfolderFiles.length > 0 && subfolderFiles[0]) {
        // Strategy 1: Use subfolder name
        const match = subfolderFiles[0].target.match(/^components\/([^/]+)\//);
        if (match && match[1]) {
          const subfolderName = match[1];
          // Rename comp-542.tsx to event-calendar-demo.tsx to avoid conflicts with folder name
          mainComponentFile.target = `components/${subfolderName}-demo.tsx`;
        }
      } else if (payload?.meta?.tags && Array.isArray(payload.meta.tags) && payload.meta.tags.length > 0) {
        // Strategy 2: Use meta tags to generate a meaningful name
        // Take first 2-3 relevant tags and create a name
        const tags = payload.meta.tags as string[];
        const relevantTags = tags.slice(0, 2).filter((tag: string) => tag.length > 0);
        if (relevantTags.length > 0) {
          const generatedName = relevantTags.join('-').toLowerCase().replace(/\s+/g, '-');
          mainComponentFile.target = `components/${generatedName}.tsx`;
        }
      }
    }

    if (!definitions.length) {
      console.warn(`Component "${packageName}" not found. Available components can be found at https://loveui.dev`);
      continue;
    }

    const needsUtilsFile = definitions.some(
      (file) =>
        UTILS_TARGET_PATTERN.test(file.target) ||
        (typeof file.content === "string" && UTILS_IMPORT_PATTERN.test(file.content))
    );

    if (needsUtilsFile) {
      await ensureUtilsFile(projectRoot, utilsFilePath);
    }

    // Copy component files
    let filesCreated = 0;
    let filesUpdated = 0;

    for (const file of definitions) {
      if (!file.content) continue;

      const desiredPath = adjustTargetPath(file.target, componentsDir, utilsFilePath);
      const absolutePath = path.join(projectRoot, desiredPath);
      const alreadyExists = existsSync(absolutePath);
      const isUtilsFile = stripScriptExtension(desiredPath) === stripScriptExtension(utilsFilePath);

      if (isUtilsFile && alreadyExists) {
        continue;
      }

      let content = normalizeComponentContent(file.content, utilsImportPath);

      if (alreadyExists) {
        try {
          const existingContent = await readFile(absolutePath, "utf8");
          if (existingContent === content) {
            continue;
          }
        } catch {
          /* ignore read errors and overwrite below */
        }
      }

      await ensureDirectory(desiredPath, projectRoot);
      await writeFile(absolutePath, content, "utf8");

      if (alreadyExists) {
        filesUpdated++;
      } else {
        filesCreated++;
      }
    }

    if (filesCreated > 0) {
      console.log(`✓ Created ${filesCreated} file${filesCreated > 1 ? 's' : ''}`);
    }
    if (filesUpdated > 0) {
      console.log(`✓ Updated ${filesUpdated} file${filesUpdated > 1 ? 's' : ''}`);
    }

    // Install registry dependencies (UI components needed by building blocks)
    if (payload?.registryDependencies && payload.registryDependencies.length > 0) {
      console.log(`\nInstalling ${payload.registryDependencies.length} required component${payload.registryDependencies.length > 1 ? 's' : ''}...`);

      for (const depUrl of payload.registryDependencies) {
        // Fix URL if it's pointing to wrong domain
        let fixedUrl = depUrl;
        if (depUrl.startsWith('https://loveui.dev/building-blocks/r/')) {
          // Convert to correct URL: https://ui.loveui.dev/ui/r/...
          const componentName = depUrl.split('/').pop();
          fixedUrl = `https://ui.loveui.dev/ui/r/${componentName}`;
        }

        try {
          const response = await fetch(fixedUrl);
          if (response.ok) {
            const depPayload = (await response.json()) as RegistryPayload;
            const depFiles: RegistryFile[] = depPayload?.files ?? [];

            // Normalize and fix paths for dependency files
            const normalizedDepFiles = depFiles.map(file => {
              let target = file.target || file.path;
              if (target.startsWith('registry/default/')) {
                target = target.replace('registry/default/', '');
              }
              return { ...file, target };
            });

            // Install dependency files
            for (const file of normalizedDepFiles) {
              if (!file.content) continue;

              const desiredPath = adjustTargetPath(file.target, componentsDir, utilsFilePath);
              const absolutePath = path.join(projectRoot, desiredPath);
              const alreadyExists = existsSync(absolutePath);
              const isUtilsFile =
                stripScriptExtension(desiredPath) === stripScriptExtension(utilsFilePath);

              if (isUtilsFile && alreadyExists) {
                continue;
              }

              let content = normalizeComponentContent(file.content, utilsImportPath);

              if (alreadyExists) {
                try {
                  const existingContent = await readFile(absolutePath, "utf8");
                  if (existingContent === content) {
                    continue; // Skip if already installed
                  }
                } catch {
                  /* ignore */
                }
              }

              await ensureDirectory(desiredPath, projectRoot);
              await writeFile(absolutePath, content, "utf8");
            }

            // Collect dependencies from registry dependencies
            // Filter out invalid packages that don't exist on npm
            const invalidPackages = ['@loveui/shadcn-ui', 'jotai', 'lucide-react', 'react', 'react-dom'];

            if (depPayload?.dependencies) {
              if (Array.isArray(depPayload.dependencies)) {
                depPayload.dependencies.forEach(dep => {
                  if (!invalidPackages.includes(dep)) {
                    allDependencies[dep] = "latest";
                  }
                });
              } else {
                const depsRecord = depPayload.dependencies as Record<string, string>;
                Object.keys(depsRecord).forEach(dep => {
                  if (!invalidPackages.includes(dep) && depsRecord[dep]) {
                    allDependencies[dep] = depsRecord[dep];
                  }
                });
              }
            }
          } else {
            console.warn(`  ✗ Failed to fetch ${fixedUrl}: HTTP ${response.status}`);
          }
        } catch (error) {
          console.warn(`  ✗ Failed to install ${fixedUrl}:`, (error as Error).message);
        }
      }

      console.log(`✓ Installed registry dependencies`);
    }

    // Collect dependencies
    let deps: Record<string, string> = {};

    // If we fetched from URL and payload has dependencies, use those
    if (payload?.dependencies) {
      if (Array.isArray(payload.dependencies)) {
        // Convert array of package names to Record with "latest" version
        payload.dependencies.forEach(dep => {
          deps[dep] = "latest";
        });
      } else {
        // Already in the correct format
        deps = payload.dependencies;
      }
    } else {
      // Otherwise extract from package.json
      deps = await extractDependencies(packageName);
    }

    Object.assign(allDependencies, deps);
  }

  // Install all dependencies at once
  if (Object.keys(allDependencies).length > 0) {
    await installDependencies(allDependencies, packageManager, projectRoot);
  }

  if (installedAnyProjectPackage) {
    console.log(`\n✓ Done! You can now import and use the components in your app.`);
  } else {
    console.log(`\n✓ Done! Skill installation complete.`);
  }
}

// Run when executed as a CLI (via bin or direct node execution)
// Skip when imported as a module
const isMainModule = process.argv[1] && (
  import.meta.url === pathToFileURL(process.argv[1]).href ||
  process.argv[1].includes('love-ui') ||
  process.argv[1].includes('loveui')
);

if (isMainModule) {
  run().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
