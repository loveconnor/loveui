#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createInterface } from "node:readline/promises";
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
const BUNDLED_REGISTRY_ROOT = path.join(CLI_ROOT, "registry");
const BUNDLED_SKILLS_ROOT = path.join(CLI_ROOT, "skills");

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
  "input-group",
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

const BUNDLED_BLOCKS = new Map([
  [
    "auth-one",
    {
      sourceDir: "auth1",
      targetBase: "components/blocks/auth/one",
    },
  ],
  [
    "auth-two",
    {
      sourceDir: "auth2",
      targetBase: "components/blocks/auth/two",
    },
  ],
  [
    "auth-three",
    {
      sourceDir: "auth3",
      targetBase: "components/blocks/auth/three",
    },
  ],
  [
    "header-one",
    {
      sourceDir: "header1",
      targetBase: "components/blocks/header/one",
    },
  ],
  [
    "header-two",
    {
      sourceDir: "header2",
      targetBase: "components/blocks/header/two",
    },
  ],
  [
    "header-three",
    {
      sourceDir: "header3",
      targetBase: "components/blocks/header/three",
      dependencies: {
        "@base-ui/react": "^1.5.0",
      },
    },
  ],
  [
    "footer-one",
    {
      sourceDir: "footer1",
      targetBase: "components/blocks/footer/one",
    },
  ],
  [
    "footer-two",
    {
      sourceDir: "footer2",
      targetBase: "components/blocks/footer/two",
    },
  ],
  [
    "footer-three",
    {
      sourceDir: "footer3",
      targetBase: "components/blocks/footer/three",
      dependencies: {
        motion: "^12.40.0",
      },
    },
  ],
  [
    "footer-four",
    {
      sourceDir: "footer4",
      targetBase: "components/blocks/footer/four",
    },
  ],
  [
    "footer-five",
    {
      sourceDir: "footer5",
      targetBase: "components/blocks/footer/five",
    },
  ],
  [
    "footer-six",
    {
      sourceDir: "footer6",
      targetBase: "components/blocks/footer/six",
      dependencies: {
        motion: "^12.40.0",
      },
    },
  ],
  [
    "logo-cloud-one",
    {
      sourceDir: "logo-cloud-1",
      targetBase: "components/blocks/logo-cloud/one",
    },
  ],
  [
    "logo-cloud-two",
    {
      sourceDir: "logo-cloud-2",
      targetBase: "components/blocks/logo-cloud/two",
      dependencies: {
        "class-variance-authority": "^0.7.1",
      },
    },
  ],
  [
    "logo-cloud-three",
    {
      sourceDir: "logo-cloud-3",
      targetBase: "components/blocks/logo-cloud/three",
      dependencies: {
        motion: "^12.40.0",
        "react-use-measure": "^2.1.7",
      },
    },
  ],
  [
    "logo-cloud-four",
    {
      sourceDir: "logo-cloud-4",
      targetBase: "components/blocks/logo-cloud/four",
      dependencies: {
        motion: "^12.40.0",
        "react-use-measure": "^2.1.7",
      },
    },
  ],
  [
    "logo-cloud-five",
    {
      sourceDir: "logo-cloud-5",
      targetBase: "components/blocks/logo-cloud/five",
    },
  ],
  [
    "hero-one",
    {
      sourceDir: "hero1",
      targetBase: "components/blocks/hero/one",
      dependencies: {
        motion: "^12.40.0",
        "react-use-measure": "^2.1.7",
      },
    },
  ],
  [
    "hero-two",
    {
      sourceDir: "hero2",
      targetBase: "components/blocks/hero/two",
      dependencies: {
        "class-variance-authority": "^0.7.1",
        motion: "^12.40.0",
        "react-use-measure": "^2.1.7",
      },
    },
  ],
  [
    "hero-three",
    {
      sourceDir: "hero3",
      targetBase: "components/blocks/hero/three",
      dependencies: {
        motion: "^12.40.0",
        "react-use-measure": "^2.1.7",
      },
    },
  ],
  [
    "404-one",
    {
      sourceDir: "404-1",
      targetBase: "components/blocks/404/one",
    },
  ],
  [
    "404-two",
    {
      sourceDir: "404-2",
      targetBase: "components/blocks/404/two",
    },
  ],
  [
    "cta-one",
    {
      sourceDir: "cta-1",
      targetBase: "components/blocks/cta/one",
    },
  ],
  [
    "cta-two",
    {
      sourceDir: "cta-2",
      targetBase: "components/blocks/cta/two",
    },
  ],
  [
    "cta-three",
    {
      sourceDir: "cta-3",
      targetBase: "components/blocks/cta/three",
    },
  ],
  [
    "cta-four",
    {
      sourceDir: "cta-4",
      targetBase: "components/blocks/cta/four",
    },
  ],
  [
    "cta-five",
    {
      sourceDir: "cta-5",
      targetBase: "components/blocks/cta/five",
    },
  ],
  [
    "faq-one",
    {
      sourceDir: "faq-1",
      targetBase: "components/blocks/faq/one",
    },
  ],
  [
    "faq-two",
    {
      sourceDir: "faq-2",
      targetBase: "components/blocks/faq/two",
    },
  ],
  [
    "faq-three",
    {
      sourceDir: "faq-3",
      targetBase: "components/blocks/faq/three",
    },
  ],
  [
    "faq-four",
    {
      sourceDir: "faq-4",
      targetBase: "components/blocks/faq/four",
    },
  ],
  [
    "faq-five",
    {
      sourceDir: "faq-5",
      targetBase: "components/blocks/faq/five",
    },
  ],
  [
    "pricing-one",
    {
      sourceDir: "pricing1",
      targetBase: "components/blocks/pricing/one",
    },
  ],
  [
    "pricing-two",
    {
      sourceDir: "pricing2",
      targetBase: "components/blocks/pricing/two",
    },
  ],
  [
    "pricing-three",
    {
      sourceDir: "pricing3",
      targetBase: "components/blocks/pricing/three",
    },
  ],
  [
    "pricing-four",
    {
      sourceDir: "pricing4",
      targetBase: "components/blocks/pricing/four",
      dependencies: {
        "@number-flow/react": "^0.6.0",
        motion: "^12.40.0",
      },
    },
  ],
  [
    "testimonials-one",
    {
      sourceDir: "testimonials1",
      targetBase: "components/blocks/testimonials/one",
    },
  ],
  [
    "testimonials-two",
    {
      sourceDir: "testimonials2",
      targetBase: "components/blocks/testimonials/two",
    },
  ],
  [
    "testimonials-three",
    {
      sourceDir: "testimonials3",
      targetBase: "components/blocks/testimonials/three",
      dependencies: {
        "class-variance-authority": "^0.7.1",
      },
    },
  ],
  [
    "testimonials-four",
    {
      sourceDir: "testimonials4",
      targetBase: "components/blocks/testimonials/four",
    },
  ],
  [
    "testimonials-five",
    {
      sourceDir: "testimonials5",
      targetBase: "components/blocks/testimonials/five",
    },
  ],
  [
    "testimonials-six",
    {
      sourceDir: "testimonials6",
      targetBase: "components/blocks/testimonials/six",
      dependencies: {
        motion: "^12.40.0",
        "react-use-measure": "^2.1.7",
      },
    },
  ],
  [
    "features-one",
    {
      sourceDir: "features1",
      targetBase: "components/blocks/features/one",
    },
  ],
  [
    "features-two",
    {
      sourceDir: "features2",
      targetBase: "components/blocks/features/two",
      dependencies: {
        "class-variance-authority": "^0.7.1",
      },
    },
  ],
  [
    "features-three",
    {
      sourceDir: "features3",
      targetBase: "components/blocks/features/three",
    },
  ],
  [
    "features-four",
    {
      sourceDir: "features4",
      targetBase: "components/blocks/features/four",
      dependencies: {
        "class-variance-authority": "^0.7.1",
      },
    },
  ],
  [
    "features-five",
    {
      sourceDir: "features5",
      targetBase: "components/blocks/features/five",
    },
  ],
  [
    "features-six",
    {
      sourceDir: "features6",
      targetBase: "components/blocks/features/six",
      dependencies: {
        cobe: "^2.0.1",
      },
    },
  ],
  [
    "image-gallery-one",
    {
      sourceDir: "image-gallery-1",
      targetBase: "components/blocks/image-gallery/one",
      dependencies: {
        motion: "^12.40.0",
      },
    },
  ],
] as const);

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

const LOVE_UI_GLOBALS_MARKER = "love-ui globals";
const LOVE_UI_GLOBALS_TEMPLATE = `/* love-ui globals */
@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.21 0.006 285.885);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.21 0.006 285.885);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.21 0.006 285.885);
  --primary: oklch(0.274 0.006 286.033);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0 0 0 / 4%);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0 0 0 / 4%);
  --muted-foreground: oklch(0.442 0.017 285.786);
  --accent: oklch(0 0 0 / 4%);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.637 0.237 25.331);
  --destructive-foreground: oklch(0.505 0.213 27.518);
  --info: oklch(0.623 0.214 259.815);
  --info-foreground: oklch(0.488 0.243 264.376);
  --success: oklch(0.696 0.17 162.48);
  --success-foreground: oklch(0.508 0.118 165.612);
  --warning: oklch(0.769 0.188 70.08);
  --warning-foreground: oklch(0.555 0.163 48.998);
  --border: oklch(0 0 0 / 10%);
  --input: oklch(0 0 0 / 10%);
  --ring: oklch(0.705 0.015 286.067);
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.967 0.001 286.375);
  --card: color-mix(in srgb, oklch(0.21 0.006 285.885) 80%, oklch(0.141 0.005 285.823));
  --card-foreground: oklch(0.967 0.001 286.375);
  --popover: oklch(0.21 0.006 285.885);
  --popover-foreground: oklch(0.967 0.001 286.375);
  --primary: oklch(0.967 0.001 286.375);
  --primary-foreground: oklch(0.21 0.006 285.885);
  --secondary: oklch(1 0 0 / 6%);
  --secondary-foreground: oklch(0.967 0.001 286.375);
  --muted: oklch(1 0 0 / 6%);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(1 0 0 / 6%);
  --accent-foreground: oklch(0.967 0.001 286.375);
  --destructive: oklch(0.637 0.237 25.331);
  --destructive-foreground: oklch(0.704 0.191 22.216);
  --info: oklch(0.623 0.214 259.815);
  --info-foreground: oklch(0.707 0.165 254.624);
  --success: oklch(0.696 0.17 162.48);
  --success-foreground: oklch(0.765 0.177 163.223);
  --warning: oklch(0.769 0.188 70.08);
  --warning-foreground: oklch(0.828 0.189 84.429);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.552 0.016 285.938);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
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

async function ensureGlobalsFile(root: string): Promise<{ path: string; created: boolean; updated: boolean; imported: boolean }> {
  const candidates = [
    "app/globals.css",
    "app/global.css",
    "src/app/globals.css",
    "src/app/global.css",
    "styles/globals.css",
    "src/styles/globals.css",
    "globals.css",
    "global.css"
  ];

  let globalsPath = candidates.find((candidate) => existsSync(path.join(root, candidate)));

  if (!globalsPath) {
    if (existsSync(path.join(root, "src", "app"))) {
      globalsPath = "src/app/globals.css";
    } else if (existsSync(path.join(root, "app"))) {
      globalsPath = "app/globals.css";
    } else if (existsSync(path.join(root, "src"))) {
      globalsPath = "src/styles/globals.css";
    } else {
      globalsPath = "globals.css";
    }
  }

  const absolutePath = path.join(root, globalsPath);
  const existed = existsSync(absolutePath);
  let content = existed ? await readFile(absolutePath, "utf8") : "";
  let updated = false;

  if (!/@import\s+["']tailwindcss["']/.test(content)) {
    content = `@import "tailwindcss";\n${content ? `\n${content}` : ""}`;
    updated = true;
  }

  if (!content.includes(LOVE_UI_GLOBALS_MARKER)) {
    content = `${content.trimEnd()}\n\n${LOVE_UI_GLOBALS_TEMPLATE}`;
    updated = true;
  }

  if (!existed || updated) {
    await ensureDirectory(globalsPath, root);
    await writeFile(absolutePath, content, "utf8");
  }

  const imported = await ensureGlobalsImport(root, globalsPath);

  return {
    path: globalsPath,
    created: !existed,
    updated,
    imported
  };
}

async function ensureGlobalsImport(root: string, globalsPath: string): Promise<boolean> {
  const layoutCandidates = [
    "app/layout.tsx",
    "app/layout.jsx",
    "src/app/layout.tsx",
    "src/app/layout.jsx"
  ];
  const layoutPath = layoutCandidates.find((candidate) => existsSync(path.join(root, candidate)));
  if (!layoutPath) return false;

  const absoluteLayoutPath = path.join(root, layoutPath);
  const layout = await readFile(absoluteLayoutPath, "utf8");
  const importPath = toRelativeImport(path.dirname(layoutPath), globalsPath);

  if (layout.includes(`"${importPath}"`) || layout.includes(`'${importPath}'`)) {
    return false;
  }

  const nextLayout = `import "${importPath}";\n${layout}`;
  await writeFile(absoluteLayoutPath, nextLayout, "utf8");
  return true;
}

function toRelativeImport(fromDir: string, targetPath: string): string {
  let relativePath = path.posix.relative(fromDir || ".", targetPath);
  if (!relativePath.startsWith(".")) {
    relativePath = `./${relativePath}`;
  }
  return relativePath;
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

async function collectBundledBlockFiles(
  packageName: string,
  utilsImportPath: string
): Promise<RegistryFile[] | null> {
  const block = BUNDLED_BLOCKS.get(packageName);
  if (!block) return null;

  const blockDir = path.join(BUNDLED_REGISTRY_ROOT, "default", "blocks", block.sourceDir);
  if (!existsSync(blockDir)) return null;

  try {
    const files: RegistryFile[] = [];
    const blockFiles: RegistryFile[] = [];
    const uiDependencies = new Set<string>();

    async function walk(current: string) {
      const entries = await readdir(current, { withFileTypes: true });

      for (const entry of entries) {
        if (EXCLUDED_DIRS.has(entry.name)) continue;

        const fullPath = path.join(current, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
          continue;
        }

        const ext = path.extname(entry.name);
        if (!TEXT_EXTENSIONS.has(ext)) continue;

        const relativePath = path.relative(blockDir, fullPath).split(path.sep).join("/");
        const content = await readFile(fullPath, "utf8");

        for (const match of content.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)) {
          const dependency = match[1];
          if (dependency) uiDependencies.add(dependency);
        }

        blockFiles.push({
          path: `default/blocks/${block.sourceDir}/${relativePath}`,
          target: `${block.targetBase}/${relativePath}`,
          content,
        });
      }
    }

    await walk(blockDir);

    for (const dependency of Array.from(uiDependencies).sort((a, b) => a.localeCompare(b))) {
      const dependencyFiles = await getLoveUiComponent(dependency, utilsImportPath);
      if (dependencyFiles) files.push(...dependencyFiles);
    }

    files.push(...blockFiles);
    return files;
  } catch (error) {
    console.warn(`Warning: unable to read ${packageName} from bundled blocks`, error);
    return null;
  }
}

async function getLoveUiComponent(
  componentName: string,
  utilsImportPath: string
): Promise<RegistryFile[] | null> {
  const registryComponentFile = path.join(
    BUNDLED_REGISTRY_ROOT,
    "default",
    "ui",
    `${componentName}.tsx`
  );

  if (existsSync(registryComponentFile)) {
    try {
      const content = normalizeComponentContent(
        await readFile(registryComponentFile, "utf8"),
        utilsImportPath
      );

      const files: RegistryFile[] = [
        {
          path: `default/ui/${componentName}.tsx`,
          target: `components/ui/${componentName}.tsx`,
          content
        }
      ];

      if (componentName === "toast") {
        const helperFiles = [
          "toast-gooey.tsx",
          "toast-gooey-renderer.tsx",
          "toast-gooey-icons.tsx",
          "toast-gooey-types.ts",
          "toast-gooey.css"
        ];

        for (const helperFile of helperFiles) {
          const helperPath = path.join(BUNDLED_REGISTRY_ROOT, "default", "ui", helperFile);
          if (!existsSync(helperPath)) continue;

          files.push({
            path: `default/ui/${helperFile}`,
            target: `components/ui/${helperFile}`,
            content: await readFile(helperPath, "utf8")
          });
        }
      }

      return files;
    } catch (error) {
      console.warn(`Warning: unable to read ${componentName} from bundled registry`, error);
    }
  }

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

  const registryExampleFile = path.join(
    BUNDLED_REGISTRY_ROOT,
    "default",
    "examples",
    `${packageName}.tsx`
  );

  if (existsSync(registryExampleFile)) {
    try {
      const rawContent = await readFile(registryExampleFile, "utf8");
      const files: RegistryFile[] = [];
      const uiDependencies = Array.from(
        new Set(
          [...rawContent.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)]
            .map((match) => match[1])
            .filter(Boolean)
        )
      );

      for (const dependency of uiDependencies) {
        const dependencyFiles = await getLoveUiComponent(dependency, utilsImportPath);
        if (dependencyFiles) files.push(...dependencyFiles);
      }

      files.push({
        path: `default/examples/${packageName}.tsx`,
        target: `components/${packageName}.tsx`,
        content: normalizeComponentContent(rawContent, utilsImportPath)
      });

      return files;
    } catch (error) {
      console.warn(`Warning: unable to read ${packageName} from bundled registry examples`, error);
      return null;
    }
  }

  const bundledBlockFiles = await collectBundledBlockFiles(packageName, utilsImportPath);
  if (bundledBlockFiles) return bundledBlockFiles;

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
  const sourceDir = path.join(BUNDLED_SKILLS_ROOT, getPackageSlug(packageName));
  if (!existsSync(sourceDir)) return null;
  if (!existsSync(path.join(sourceDir, "SKILL.md"))) return null;
  return sourceDir;
}

type SkillTarget = "codex" | "claude" | "cursor" | "github";
type SkillInstallStatus = "installed" | "exists";

const SKILL_TARGET_OPTIONS: SkillTarget[] = ["codex", "claude", "cursor", "github"];
const SKILL_TARGETS = new Set<SkillTarget>(SKILL_TARGET_OPTIONS);

function resolveCodexHome(): string {
  const codexHome = process.env.CODEX_HOME?.trim();
  if (codexHome) return codexHome;
  return path.join(os.homedir(), ".codex");
}

function resolveClaudeHome(): string {
  const claudeHome = process.env.CLAUDE_HOME?.trim();
  if (claudeHome) return claudeHome;
  return path.join(os.homedir(), ".claude");
}

async function copyBundledSkillToDirectory(
  packageName: string,
  destinationDir: string
): Promise<SkillInstallStatus> {
  const sourceDir = await getBundledSkillSourceDir(packageName);
  if (!sourceDir) {
    throw new Error(`Bundled skill "${packageName}" was not found in this love-ui package.`);
  }

  await mkdir(path.dirname(destinationDir), { recursive: true });

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

async function writeFileIfMissing(filePath: string, content: string): Promise<SkillInstallStatus> {
  await mkdir(path.dirname(filePath), { recursive: true });

  if (existsSync(filePath)) {
    return "exists";
  }

  await writeFile(filePath, content, "utf8");
  return "installed";
}

function cursorRuleContent(packageName: string): string {
  return `---
description: Use LoveUI Skills when building, reviewing, or polishing LoveUI interfaces.
globs: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
alwaysApply: false
---

Use the LoveUI skill pack in \`.cursor/loveui-skills\` for LoveUI UI work.

Start with \`.cursor/loveui-skills/SKILL.md\`, then read the matching files in \`.cursor/loveui-skills/references\` and \`.cursor/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${packageName}
`;
}

function githubInstructionContent(packageName: string): string {
  return `---
applyTo: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
---

# LoveUI Skills

Use the LoveUI skill pack in \`.github/loveui-skills\` when building, reviewing, or polishing LoveUI interfaces.

Start with \`.github/loveui-skills/SKILL.md\`, then read the matching files in \`.github/loveui-skills/references\` and \`.github/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${packageName}
`;
}

async function installBundledSkillForTarget(
  packageName: string,
  target: SkillTarget,
  projectRoot: string
): Promise<Array<{ label: string; path: string; status: SkillInstallStatus }>> {
  const skillName = getPackageSlug(packageName);

  if (target === "codex") {
    const destinationDir = path.join(resolveCodexHome(), "skills", skillName);
    return [{
      label: "Codex skill",
      path: destinationDir,
      status: await copyBundledSkillToDirectory(packageName, destinationDir)
    }];
  }

  if (target === "claude") {
    const destinationDir = path.join(resolveClaudeHome(), "skills", skillName);
    return [{
      label: "Claude skill",
      path: destinationDir,
      status: await copyBundledSkillToDirectory(packageName, destinationDir)
    }];
  }

  if (target === "cursor") {
    const destinationDir = path.join(projectRoot, ".cursor", "loveui-skills");
    const rulePath = path.join(projectRoot, ".cursor", "rules", "loveui-skills.mdc");

    return [
      {
        label: "Cursor skill files",
        path: destinationDir,
        status: await copyBundledSkillToDirectory(packageName, destinationDir)
      },
      {
        label: "Cursor rule",
        path: rulePath,
        status: await writeFileIfMissing(rulePath, cursorRuleContent(packageName))
      }
    ];
  }

  const destinationDir = path.join(projectRoot, ".github", "loveui-skills");
  const instructionPath = path.join(projectRoot, ".github", "instructions", "loveui-skills.instructions.md");

  return [
    {
      label: "GitHub skill files",
      path: destinationDir,
      status: await copyBundledSkillToDirectory(packageName, destinationDir)
    },
    {
      label: "GitHub Copilot instructions",
      path: instructionPath,
      status: await writeFileIfMissing(instructionPath, githubInstructionContent(packageName))
    }
  ];
}

function parseSkillTargets(args: string[]): SkillTarget[] {
  const targets = new Set<SkillTarget>();

  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (!arg) continue;

    if (arg === "--target" || arg === "--agent" || arg === "-t") {
      const value = args[index + 1];
      index++;
      if (!value) {
        throw new Error(`Missing value for ${arg}. Use one of: codex, claude, cursor, github, all.`);
      }
      addSkillTargetValue(value, targets);
      continue;
    }

    if (arg.startsWith("--target=")) {
      addSkillTargetValue(arg.slice("--target=".length), targets);
      continue;
    }

    if (arg.startsWith("--agent=")) {
      addSkillTargetValue(arg.slice("--agent=".length), targets);
      continue;
    }

    addSkillTargetValue(arg, targets);
  }

  return [...targets];
}

function addSkillTargetValue(value: string, targets: Set<SkillTarget>) {
  const normalized = value.trim().toLowerCase();

  if (normalized === "all") {
    for (const target of SKILL_TARGETS) targets.add(target);
    return;
  }

  if (!SKILL_TARGETS.has(normalized as SkillTarget)) {
    throw new Error(`Unknown skill target "${value}". Use one of: codex, claude, cursor, github, all.`);
  }

  targets.add(normalized as SkillTarget);
}

async function promptForSkillTargets(): Promise<SkillTarget[]> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error(
      "Missing skill target. Use one of: codex, claude, cursor, github, all."
    );
  }

  const choices = [
    ...SKILL_TARGET_OPTIONS.map((target, index) => ({
      label: target,
      number: String(index + 1),
      targets: [target]
    })),
    {
      label: "all",
      number: String(SKILL_TARGET_OPTIONS.length + 1),
      targets: [...SKILL_TARGET_OPTIONS]
    }
  ];

  console.log("\nWhich AI tool should LoveUI Skills target?\n");
  for (const choice of choices) {
    console.log(`  ${choice.number}. ${choice.label}`);
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    while (true) {
      const answer = (await rl.question("\nSelect a target: ")).trim().toLowerCase();
      const choice = choices.find(
        (option) => option.number === answer || option.label === answer
      );

      if (choice) return choice.targets;

      console.log("Please choose codex, claude, cursor, github, all, or a number from the list.");
    }
  } finally {
    rl.close();
  }
}

async function installLoveUiSkills(args: string[], projectRoot: string) {
  const packageName = "loveui-skills";
  const parsedTargets = parseSkillTargets(args);
  const targets = parsedTargets.length > 0 ? parsedTargets : await promptForSkillTargets();

  if (!await getBundledSkillSourceDir(packageName)) {
    throw new Error("The loveui-skills pack is missing from this love-ui package. Try updating to the latest version.");
  }

  console.log(`\nAdding ${packageName} for ${targets.join(", ")}...`);

  for (const target of targets) {
    const results = await installBundledSkillForTarget(packageName, target, projectRoot);

    for (const result of results) {
      const verb = result.status === "installed" ? "Installed" : "Already exists";
      console.log(`✓ ${verb}: ${result.label} at ${result.path}`);
    }
  }

  console.log("\n✓ Done! Restart or reload your AI tool so it can pick up the new instructions.");
}

// Core dependencies that all love-ui components need
const LOVE_UI_CORE_DEPS: Record<string, string> = {
  "@base-ui-components/react": "1.0.0-beta.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^1.16.0",
  "tailwind-merge": "^3.3.1"
};

async function extractDependencies(packageName: string): Promise<Record<string, string>> {
  // For love-ui components, return core dependencies
  if (
    LOVE_UI_COMPONENTS.has(packageName) ||
    existsSync(path.join(BUNDLED_REGISTRY_ROOT, "default", "examples", `${packageName}.tsx`))
  ) {
    return { ...LOVE_UI_CORE_DEPS };
  }

  const bundledBlock = BUNDLED_BLOCKS.get(packageName);
  if (bundledBlock) {
    return {
      ...LOVE_UI_CORE_DEPS,
      ...("dependencies" in bundledBlock ? bundledBlock.dependencies : {}),
    };
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
    console.log("       npx love-ui add loveui-skills [codex|claude|cursor|github|all]");
    console.log("       npx love-ui add loveui-skills --agent codex");
    console.log("       npx love-ui --version");
    process.exit(1);
  }

  if (getPackageSlug(argv[1] ?? "") === "loveui-skills") {
    await installLoveUiSkills(argv.slice(2), process.cwd());
    return;
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
  let globalsPrepared = false;

  const allDependencies: Record<string, string> = {};

  for (const packageName of packageNames) {
    if (!packageName.trim()) {
      continue;
    }

    console.log(`\nAdding ${packageName}...`);

    if (!projectDirectoriesPrepared) {
      await mkdir(path.join(projectRoot, componentsDir), { recursive: true });
      await mkdir(path.join(projectRoot, componentsUiDir), { recursive: true });
      projectDirectoriesPrepared = true;
    }
    if (!globalsPrepared) {
      const globalsResult = await ensureGlobalsFile(projectRoot);
      if (globalsResult.created) {
        console.log(`✓ Created ${globalsResult.path}`);
      } else if (globalsResult.updated) {
        console.log(`✓ Updated ${globalsResult.path}`);
      }
      if (globalsResult.imported) {
        console.log(`✓ Imported ${globalsResult.path} from app layout`);
      }
      globalsPrepared = true;
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
