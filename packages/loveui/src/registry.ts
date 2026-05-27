import { constants } from "node:fs";
import { access, readFile, readdir } from "node:fs/promises";
import path, { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import postcssNested from "postcss-nested";

type FileDescriptor = {
  absolute: string;
  relative: string;
};

export type RegistryFile = {
  type?: string;
  path: string;
  target: string;
  content: string;
};

export type LoveUIRegistryItem = {
  $schema: string;
  name: string;
  type: string;
  title?: string;
  description?: string;
  author?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  css?: Record<string, unknown>;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = path.resolve(__dirname, "..");
const PACKAGES_ROOT = path.join(CLI_ROOT, "packages");

const IGNORED_DIRECTORIES = new Set([
  ".turbo",
  ".next",
  ".git",
  "dist",
  "build",
  "storybook-static",
  "node_modules",
  "__tests__",
  "__mocks__",
  "coverage"
]);

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".css",
  ".scss",
  ".sass",
  ".mdx"
]);

const EXCLUDED_FILES = new Set([
  "package.json",
  "tsconfig.json",
  "tsconfig.build.json",
  "tsconfig.test.json",
  "README.md",
  ".DS_Store"
]);

const FILTERED_PACKAGES = new Set([
  "shadcn-ui",
  "typescript-config",
  "patterns",
  "loveui",
  "love-ui"
]);

const toPosix = (value: string) => value.replace(/\\/g, "/");

const collectFiles = async (directory: string, base: string, acc: FileDescriptor[]) => {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) continue;
      await collectFiles(fullPath, base, acc);
      continue;
    }

    const extension = extname(entry.name);
    if (
      !TEXT_EXTENSIONS.has(extension) ||
      EXCLUDED_FILES.has(entry.name) ||
      entry.name.endsWith(".d.ts") ||
      entry.name.endsWith(".test.ts") ||
      entry.name.endsWith(".test.tsx") ||
      entry.name.endsWith(".stories.tsx")
    ) {
      continue;
    }

    acc.push({
      absolute: fullPath,
      relative: toPosix(relative(base, fullPath))
    });
  }
};

type TargetResolution = {
  base: string;
  includePackageName: boolean;
};

const resolveTargetBase = (packageJson: Record<string, any>, packageName: string): TargetResolution => {
  const loveui = packageJson.loveui ?? {};
  const target = typeof loveui.target === "string" ? loveui.target.trim() : "";
  const kind = loveui.category as string | undefined;

  if (target.length > 0) {
    const include =
      typeof loveui.includePackageName === "boolean" ? loveui.includePackageName : false;
    return { base: target.replace(/\/+$/, ""), includePackageName: include };
  }

  if (kind === "feature") {
    return { base: "components", includePackageName: true };
  }

  if (kind === "block") {
    return { base: "components/blocks", includePackageName: true };
  }

  return { base: "components/ui", includePackageName: true };
};

const resolveRegistryType = (packageJson: Record<string, any>) => {
  const loveui = packageJson.loveui ?? {};
  const registryType = loveui.type;
  if (typeof registryType === "string" && registryType.trim().length > 0) {
    return registryType;
  }

  return "registry:ui";
};

const ensureExists = async (targetPath: string) => {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const isInternalDependency = (dependency: string) =>
  dependency.startsWith("@loveui/") ||
  dependency.startsWith("@love-ui/") ||
  dependency.startsWith("@repo/");

const normalizeInternalPackage = (dependency: string) =>
  dependency
    .replace(/^@repo\//, "")
    .replace(/^@loveui\//, "")
    .replace(/^@love-ui\//, "");

const INTERNAL_DEPENDENCY_EXCLUSIONS = new Set([
  "@loveui/shadcn-ui",
  "@love-ui/shadcn-ui"
]);

export const listRegistryPackages = async (): Promise<string[]> => {
  const entries = await readdir(PACKAGES_ROOT, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !FILTERED_PACKAGES.has(name))
    .sort((a, b) => a.localeCompare(b));
};

export const loadRegistryItem = async (packageName: string): Promise<LoveUIRegistryItem> => {
  const packageDir = join(PACKAGES_ROOT, packageName);
  const packageJsonPath = join(packageDir, "package.json");

  if (!(await ensureExists(packageJsonPath))) {
    throw new Error(`Missing package.json for ${packageName}`);
  }

  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8")) as Record<string, any>;
  const registryType = resolveRegistryType(packageJson);

  const dependencyEntries = Object.keys(packageJson.dependencies ?? {});
  const peerEntries = Object.keys(packageJson.peerDependencies ?? {});
  const devEntries = Object.keys(packageJson.devDependencies ?? {});

  const internalDependencies = new Set(
    [...dependencyEntries, ...peerEntries, ...devEntries]
      .filter(isInternalDependency)
      .filter((dep) => !INTERNAL_DEPENDENCY_EXCLUSIONS.has(dep))
  );

  const dependencies = [
    ...new Set(
      [...dependencyEntries, ...peerEntries].filter((dep) => !isInternalDependency(dep))
    )
  ];

  const devDependencies = [
    ...new Set(
      devEntries.filter(
        (dep) =>
          !isInternalDependency(dep) &&
          ![
            "@loveui/typescript-config",
            "@types/react",
            "@types/react-dom",
            "typescript"
          ].includes(dep)
      )
    )
  ];

  const registryDependencies: string[] = [];
  for (const dep of internalDependencies) {
    const normalized = normalizeInternalPackage(dep);
    registryDependencies.push(`https://www.loveui.dev/r/${normalized}.json`);
  }

  const discoveredFiles: FileDescriptor[] = [];
  await collectFiles(packageDir, packageDir, discoveredFiles);

  const files: RegistryFile[] = [];
  const css: Record<string, Record<string, unknown>> = {};

  const targetConfig = resolveTargetBase(packageJson, packageName);

  for (const file of discoveredFiles) {
    const content = await readFile(file.absolute, "utf8");
    const extension = extname(file.absolute);

    if (extension === ".css" || extension === ".scss" || extension === ".sass") {
      const processed = await postcss([postcssNested]).process(content, { from: undefined });
      const ast = postcss.parse(processed.css);

      ast.walkAtRules("layer", (atRule) => {
        const layerKey = `@layer ${atRule.params}`;
        css[layerKey] ??= {};

        atRule.walkRules((rule) => {
          if (
            rule.parent &&
            rule.parent.type === "atrule" &&
            (rule.parent as any).name === "media"
          ) {
            return;
          }

          const selector = rule.selector;
          const declaration: Record<string, string> = {};

          rule.walkDecls((decl) => {
            declaration[decl.prop] = decl.value;
          });

          if (Object.keys(declaration).length > 0) {
            (css[layerKey] as Record<string, unknown>)[selector] = declaration;
          }
        });

        atRule.walkAtRules("media", (mediaRule) => {
          const mediaKey = `@media ${mediaRule.params}`;
          const layer = css[layerKey] as Record<string, unknown>;
          layer[mediaKey] ??= {};

          const mediaBucket = layer[mediaKey] as Record<string, unknown>;

          mediaRule.walkRules((rule) => {
            const selector = rule.selector;
            const declaration: Record<string, string> = {};

            rule.walkDecls((decl) => {
              declaration[decl.prop] = decl.value;
            });

            if (Object.keys(declaration).length > 0) {
              mediaBucket[selector] = declaration;
            }
          });
        });
      });

      continue;
    }

    let cleanedPath = file.relative.startsWith("src/") ? file.relative.slice(4) : file.relative;

    if (!targetConfig.includePackageName) {
      const baseSegments = targetConfig.base.split("/").filter(Boolean);
      const lastSegment = baseSegments[baseSegments.length - 1];
      if (lastSegment && cleanedPath.startsWith(`${lastSegment}/`)) {
        cleanedPath = cleanedPath.slice(lastSegment.length + 1);
      }
    }

    const packageSlug = packageName.includes("/")
      ? packageName.split("/").pop() ?? packageName
      : packageName;

    const prefix = targetConfig.includePackageName
      ? `${targetConfig.base}/${packageSlug}`
      : targetConfig.base;

    const normalizedPrefix = prefix.replace(/\/+$/, "");

    files.push({
      type: registryType,
      path: cleanedPath,
      target: `${normalizedPrefix}/${cleanedPath}`.replace(/\/+/g, "/"),
      content
    });
  }

  const cssOnly = !files.length && Object.keys(css).length > 0;
  const finalType = cssOnly ? "registry:style" : registryType;

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: packageName,
    type: finalType,
    title: packageJson.title ?? packageName,
    description: packageJson.description,
    author: packageJson.author ?? "Connor Love <hello@loveconnor.com>",
    dependencies: dependencies.length ? dependencies : undefined,
    devDependencies: devDependencies.length ? devDependencies : undefined,
    registryDependencies: registryDependencies.length
      ? Array.from(new Set(registryDependencies))
      : undefined,
    files: files.length ? files : undefined,
    css: Object.keys(css).length ? css : undefined
  };
};
