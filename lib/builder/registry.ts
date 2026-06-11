import { readFile } from "node:fs/promises"
import path from "node:path"

import {
  getAssetCollection,
  getAssetStyle,
  type IconRegistryItem,
} from "@/lib/icons-registry"
import type { BuilderCatalogItem, BuilderRegistryType } from "@/lib/builder/types"

type RegistryFile = {
  path?: string
  target?: string
  type?: string
  content?: string
}

export type BuilderRegistryItemPayload = {
  name: string
  type: BuilderRegistryType | string
  title?: string
  description?: string
  categories?: string[]
  meta?: {
    source?: string
  }
  files?: RegistryFile[]
  dependencies?: string[]
  registryDependencies?: string[]
}

type RegistryIndex = {
  items?: BuilderRegistryItemPayload[]
}

const REGISTRY_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "packages/loveui/public/r"
)
const PRO_REGISTRY_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "packages/loveui-pro/public/r"
)

const BUILDER_EXCLUDED_REGISTRY_SOURCES = new Set(["example-app", "page-template"])

export async function getBuilderRegistryCatalog({
  includePro = false,
}: {
  includePro?: boolean
} = {}) {
  const registryIndexes = await Promise.all([
    readRegistryIndex(),
    includePro ? readRegistryIndex(PRO_REGISTRY_ROOT) : Promise.resolve(null),
  ])
  const registryItems = registryIndexes
    .flatMap((registryIndex) => registryIndex?.items ?? [])
    .filter((item) =>
      isBuilderCatalogRegistryType(item) && !isExcludedBuilderRegistryItem(item)
    )
    .map(registryItemToCatalogItem)

  const iconStyle = getAssetStyle("icons")
  const iconItems = getAssetCollection("icons")
    .filter((item) => item.variant === iconStyle)
    .slice(0, 500)
    .map(iconToCatalogItem)

  return {
    blocks: mergeCatalogItems(
      registryItems.filter((item) => item.type === "registry:block")
    ),
    components: mergeCatalogItems(
      registryItems.filter(
        (item) => item.type === "registry:ui" || item.type === "registry:example"
      )
    ),
    icons: iconItems,
  }
}

function isBuilderCatalogRegistryType(item: BuilderRegistryItemPayload) {
  return (
    item.type === "registry:block" ||
    item.type === "registry:ui" ||
    item.type === "registry:example"
  )
}

function isExcludedBuilderRegistryItem(item: BuilderRegistryItemPayload) {
  const source = item.meta?.source

  if (source && BUILDER_EXCLUDED_REGISTRY_SOURCES.has(source)) return true

  return Boolean(
    item.categories?.some((category) =>
      BUILDER_EXCLUDED_REGISTRY_SOURCES.has(category)
    )
  )
}

export async function getRegistryPayload(
  name: string,
  {
    includePro = false,
  }: {
    includePro?: boolean
  } = {}
) {
  const safeName = normalizeRegistryName(name)

  if (!safeName) return null

  for (const root of includePro ? [PRO_REGISTRY_ROOT, REGISTRY_ROOT] : [REGISTRY_ROOT]) {
    try {
      const content = await readFile(path.join(root, `${safeName}.json`), "utf8")

      return JSON.parse(content) as BuilderRegistryItemPayload
    } catch {
      // Try the next registry root.
    }
  }

  return null
}

export async function readRegistryIndex(root = REGISTRY_ROOT) {
  const content = await readFile(path.join(root, "registry.json"), "utf8")

  return JSON.parse(content) as RegistryIndex
}

export function normalizeRegistryName(name: string) {
  const normalized = name.trim().replace(/\.json$/i, "")

  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(normalized)) {
    return null
  }

  return normalized
}

export function registryDependencyToName(value: string) {
  const input = value.trim()

  if (!input) return null

  if (input.startsWith("@love-ui/")) {
    return normalizeRegistryName(input.replace("@love-ui/", ""))
  }

  try {
    const url = new URL(input)
    const file = url.pathname.split("/").pop() ?? ""

    return normalizeRegistryName(file)
  } catch {
    return normalizeRegistryName(input)
  }
}

function iconToCatalogItem(item: IconRegistryItem): BuilderCatalogItem {
  return {
    name: item.id,
    title: item.name,
    description: `${item.category} icon from LoveUI.`,
    type: "asset:icon",
    category: item.category,
    previewUrl: item.previewUrl,
    sourcePath: item.sourcePath,
    exportName: toPascalCase(item.id),
  }
}

function registryItemToCatalogItem(item: BuilderRegistryItemPayload): BuilderCatalogItem {
  return {
    name: item.name,
    title: formatRegistryTitle(item),
    description: item.description ?? "LoveUI registry item.",
    type: item.type as BuilderCatalogItem["type"],
    category: getRegistryCategory(item),
  }
}

function mergeCatalogItems(items: BuilderCatalogItem[]) {
  return Array.from(
    items
      .reduce((map, item) => map.set(item.name, item), new Map<string, BuilderCatalogItem>())
      .values()
  )
}

function getRegistryCategory(item: BuilderRegistryItemPayload) {
  return (
    item.categories?.find((entry) => entry !== "block" && entry !== "pro") ??
    item.categories?.[0] ??
    String(item.type).replace("registry:", "")
  )
}

function formatRegistryTitle(item: BuilderRegistryItemPayload) {
  if (item.description && item.type === "registry:example") {
    return item.description
  }

  if (item.title) {
    return item.title
      .split("/")
      .map((part) => formatWords(part))
      .join(" ")
  }

  return formatWords(item.name)
}

function formatWords(value: string) {
  return value
    .replace(/^template-/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function toPascalCase(value: string) {
  return value
    .split(/[-_]/)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("")
}
