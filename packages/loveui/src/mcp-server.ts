#!/usr/bin/env node

import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourceTemplatesRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import packageJson from "../package.json" with { type: "json" };
import { listRegistryPackages, loadRegistryItem } from "./registry.js";

const LOVEUI_REGISTRY_SCHEME = "loveui://registry/";
const LOVEUI_RESOURCE_TEMPLATE = "loveui://registry/{package}";
const GET_PACKAGE_TOOL_NAME = "get-loveui-package";
const EXCLUDED_REGISTRY_NAMES = new Set([
  "shadcn-ui",
  "typescript-config",
  "eslint-config",
  "patterns",
  "loveui",
  "love-ui"
]);

type RegistrySnapshot = {
  dir: string;
  names: string[];
  nameSet: Set<string>;
};

type RegistrySnapshotIndex = {
  items?: Array<{
    name?: string;
  }>;
};

type RegistryItem = Record<string, unknown> & {
  name?: string;
  dependencies?: unknown;
  devDependencies?: unknown;
  registryDependencies?: unknown;
};

const INTERNAL_DEPENDENCY_PREFIXES = ["@loveui/", "@love-ui/", "@repo/"];
const EXCLUDED_INTERNAL_PACKAGES = new Set([
  "@loveui/shadcn-ui",
  "@love-ui/shadcn-ui"
]);

const createResourceUri = (packageName: string) => `${LOVEUI_REGISTRY_SCHEME}${packageName}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = path.resolve(__dirname, "..");
const REGISTRY_SNAPSHOT_DIR_CANDIDATES = [
  path.join(CLI_ROOT, "public", "r"),
  path.resolve(CLI_ROOT, "..", "..", "apps", "ui", "public", "r"),
  path.resolve(process.cwd(), "apps", "ui", "public", "r")
];

const ensureReadable = async (targetPath: string) => {
  try {
    await access(targetPath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

const isInternalDependency = (dependency: string) =>
  INTERNAL_DEPENDENCY_PREFIXES.some((prefix) => dependency.startsWith(prefix));

const normalizeInternalDependency = (dependency: string) =>
  dependency
    .replace(/^@repo\//, "")
    .replace(/^@loveui\//, "")
    .replace(/^@love-ui\//, "");

const toDependencyList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((dep): dep is string => typeof dep === "string");
  }

  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>);
  }

  return [];
};

const sanitizeDependencies = (value: unknown) => {
  const sanitized = Array.from(
    new Set(
      toDependencyList(value).filter(
        (dependency) =>
          !isInternalDependency(dependency) && !EXCLUDED_INTERNAL_PACKAGES.has(dependency)
      )
    )
  );

  return sanitized.length > 0 ? sanitized : undefined;
};

const sanitizeRegistryDependencies = (value: unknown) => {
  const sanitized = Array.from(
    new Set(
      toDependencyList(value)
        .map((dependency) => dependency.trim())
        .filter(Boolean)
        .filter((dependency) => !EXCLUDED_INTERNAL_PACKAGES.has(dependency))
        .map((dependency) =>
          isInternalDependency(dependency)
            ? `https://www.loveui.dev/r/${normalizeInternalDependency(dependency)}.json`
            : dependency
        )
    )
  );

  return sanitized.length > 0 ? sanitized : undefined;
};

const normalizeRegistryName = (name: string) =>
  name
    .trim()
    .replace(/^@repo\//, "")
    .replace(/^@loveui\//, "")
    .replace(/^@love-ui\//, "");

const assertSupportedRegistryName = (name: string) => {
  const normalized = normalizeRegistryName(name);
  if (EXCLUDED_REGISTRY_NAMES.has(normalized)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      `${normalized} is an internal package and should not be used directly. Use \`npx love-ui add <component>\` with a public component name.`
    );
  }

  return normalized;
};

const normalizeRegistryItemForMcp = (item: unknown): RegistryItem => {
  if (!item || typeof item !== "object") {
    return {
      mcpHints: {
        installPattern: "npx love-ui add <component>",
        neverInstall: ["@loveui/*", "@love-ui/*", "@repo/*"]
      }
    };
  }

  const baseItem = { ...(item as RegistryItem) };
  const dependencies = sanitizeDependencies(baseItem.dependencies);
  const devDependencies = sanitizeDependencies(baseItem.devDependencies);
  const registryDependencies = sanitizeRegistryDependencies(baseItem.registryDependencies);
  const componentName =
    typeof baseItem.name === "string" && baseItem.name.trim().length > 0
      ? baseItem.name.trim()
      : "<component>";

  const normalized: RegistryItem = {
    ...baseItem,
    mcpHints: {
      installPattern: "npx love-ui add <component>",
      installCommand: `npx love-ui add ${componentName}`,
      neverInstall: ["@loveui/*", "@love-ui/*", "@repo/*", "@loveui/shadcn-ui"]
    }
  };

  if (dependencies) {
    normalized.dependencies = dependencies;
  } else {
    delete normalized.dependencies;
  }

  if (devDependencies) {
    normalized.devDependencies = devDependencies;
  } else {
    delete normalized.devDependencies;
  }

  if (registryDependencies) {
    normalized.registryDependencies = registryDependencies;
  } else {
    delete normalized.registryDependencies;
  }

  return normalized;
};

let registrySnapshotPromise: Promise<RegistrySnapshot | null> | null = null;

const loadRegistrySnapshot = async (): Promise<RegistrySnapshot | null> => {
  if (!registrySnapshotPromise) {
    registrySnapshotPromise = (async () => {
      for (const dir of REGISTRY_SNAPSHOT_DIR_CANDIDATES) {
        const indexPath = path.join(dir, "registry.json");
        if (!(await ensureReadable(indexPath))) continue;

        try {
          const index = JSON.parse(
            await readFile(indexPath, "utf8")
          ) as RegistrySnapshotIndex;
          const names = Array.from(
            new Set(
              (index.items ?? [])
                .map((item) => item.name?.trim())
                .filter((name): name is string => Boolean(name))
            )
          ).sort((a, b) => a.localeCompare(b));

          if (names.length === 0) continue;

          return {
            dir,
            names,
            nameSet: new Set(names)
          };
        } catch {
          continue;
        }
      }

      return null;
    })();
  }

  return registrySnapshotPromise;
};

const listAvailableRegistryNames = async () => {
  const [snapshot, packageNames] = await Promise.all([
    loadRegistrySnapshot(),
    listRegistryPackages()
  ]);

  const names = new Set<string>(packageNames);
  for (const name of snapshot?.names ?? []) {
    names.add(name);
  }

  return Array.from(names)
    .map((name) => normalizeRegistryName(name))
    .filter((name) => !EXCLUDED_REGISTRY_NAMES.has(name))
    .sort((a, b) => a.localeCompare(b));
};

const readSnapshotRegistryItem = async (packageName: string) => {
  const snapshot = await loadRegistrySnapshot();
  if (!snapshot || !snapshot.nameSet.has(packageName)) {
    return null;
  }

  const itemPath = path.join(snapshot.dir, `${packageName}.json`);
  if (!(await ensureReadable(itemPath))) {
    return null;
  }

  return JSON.parse(await readFile(itemPath, "utf8"));
};

const getPackageNameFromUri = (uri: string) => {
  if (!uri.startsWith(LOVEUI_REGISTRY_SCHEME)) {
    throw new McpError(ErrorCode.InvalidParams, `Unsupported resource URI: ${uri}`);
  }

  const packageName = decodeURIComponent(uri.slice(LOVEUI_REGISTRY_SCHEME.length)).trim();
  if (!packageName) {
    throw new McpError(ErrorCode.InvalidParams, "Package name is required.");
  }

  return packageName;
};

const readRegistryItem = async (packageName: string) => {
  const normalizedName = assertSupportedRegistryName(packageName);

  try {
    const snapshotItem = await readSnapshotRegistryItem(normalizedName);
    if (snapshotItem) {
      return normalizeRegistryItemForMcp(snapshotItem);
    }

    return normalizeRegistryItemForMcp(await loadRegistryItem(normalizedName));
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }

    if (
      error instanceof Error &&
      error.message.startsWith(`Missing package.json for ${normalizedName}`)
    ) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Registry item "${normalizedName}" was not found. Call resources/list and use an exact item name from the registry.`
      );
    }

    throw new McpError(
      ErrorCode.InvalidParams,
      error instanceof Error ? error.message : String(error)
    );
  }
};

async function main() {
  const server = new Server(
    {
      name: "loveui-mcp",
      version: packageJson.version ?? "0.0.0"
    },
    {
      capabilities: {
        resources: {
          listChanged: true
        },
        tools: {
          listChanged: true
        }
      }
    }
  );

  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const packages = await listAvailableRegistryNames();

    return {
      resources: packages.map((pkg) => ({
        uri: createResourceUri(pkg),
        name: pkg,
        description: `loveui registry definition for ${pkg}`,
        mimeType: "application/json"
      }))
    };
  });

  server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
    return {
      resourceTemplates: [
        {
          name: "loveui-registry",
          uriTemplate: LOVEUI_RESOURCE_TEMPLATE,
          description: "loveui registry definitions by package name",
          mimeType: "application/json"
        }
      ]
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const packageName = getPackageNameFromUri(request.params.uri);
    const registryItem = await readRegistryItem(packageName);

    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "application/json",
          text: JSON.stringify(registryItem, null, 2)
        }
      ]
    };
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: GET_PACKAGE_TOOL_NAME,
          description:
            "Fetch a loveui registry definition by package name. Always install with `npx love-ui add <component>` and never install @loveui/* packages directly.",
          inputSchema: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: {
                type: "string",
                description: "Package name, e.g. badge"
              }
            },
            required: ["name"]
          }
        }
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name !== GET_PACKAGE_TOOL_NAME) {
      throw new McpError(ErrorCode.InvalidParams, `Tool ${request.params.name} not found`);
    }

    const name = request.params.arguments?.name;
    if (typeof name !== "string" || name.trim() === "") {
      throw new McpError(ErrorCode.InvalidParams, "Package name is required.");
    }

    const registryItem = await readRegistryItem(name.trim());
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(registryItem, null, 2)
        }
      ]
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
