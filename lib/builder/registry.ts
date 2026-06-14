import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import path from "node:path"

import {
  defaultAssetStyle,
  formatAssetLabel,
  getAssetCollection,
  type AssetCollection,
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

type BuilderRegistrySourceRoot = {
  prefix: string
  roots: string[]
}

type BuilderRegistryIndexSource = {
  index: RegistryIndex | null
  sourceRoots: BuilderRegistrySourceRoot[]
}

const REGISTRY_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "packages/loveui/public/r"
)
const PRO_REGISTRY_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "packages/loveui-pro/public/r"
)
const WORKSPACE_ROOT = /* turbopackIgnore: true */ process.cwd()
const REGISTRY_SOURCE_ROOTS = [
  {
    prefix: "registry/default/blocks/",
    roots: [
      path.join(WORKSPACE_ROOT, "registry/default/blocks"),
      path.join(WORKSPACE_ROOT, "packages/loveui/registry/default/blocks"),
    ],
  },
  {
    prefix: "registry/default/examples/",
    roots: [
      path.join(WORKSPACE_ROOT, "registry/default/examples"),
      path.join(WORKSPACE_ROOT, "packages/loveui/registry/default/examples"),
    ],
  },
  {
    prefix: "registry/default/ui/",
    roots: [
      path.join(WORKSPACE_ROOT, "registry/default/ui"),
      path.join(WORKSPACE_ROOT, "packages/loveui/registry/default/ui"),
    ],
  },
]
const PRO_REGISTRY_SOURCE_ROOTS = [
  {
    prefix: "registry/default/blocks/",
    roots: [
      path.join(WORKSPACE_ROOT, "packages/loveui-pro/registry/default/blocks"),
    ],
  },
  {
    prefix: "registry/default/ui/",
    roots: [path.join(WORKSPACE_ROOT, "packages/loveui-pro/registry/default/ui")],
  },
  {
    prefix: "registry/charts/",
    roots: [path.join(WORKSPACE_ROOT, "packages/loveui-pro/registry/charts")],
  },
  {
    prefix: "packages/loveui-pro/registry/ui/",
    roots: [path.join(WORKSPACE_ROOT, "packages/loveui-pro/registry/ui")],
  },
]

const BUILDER_EXCLUDED_REGISTRY_SOURCES = new Set(["example-app", "page-template"])
const BLOCK_VARIANT_SUFFIX_PATTERN =
  /-(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen)$/i
const BUILDER_ASSET_COLLECTIONS: AssetCollection[] = ["icons", "logos", "vectors"]
const BUILDER_BLOCK_TITLES: Record<string, string> = {
  "auth-one": "Social Sign-In",
  "auth-two": "Email Sign-In",
  "auth-three": "Minimal Sign-Up",
  "features-one": "Four-Column Features",
  "features-two": "Dashed Feature Cards",
  "features-three": "Bordered Feature Grid",
  "features-four": "Product Feature Cards",
  "features-five": "Pattern Feature Grid",
  "features-six": "Visual Feature Grid",
  "footer-one": "Compact Footer",
  "footer-two": "Resource Footer",
  "footer-three": "Animated Footer",
  "footer-four": "Social Card Footer",
  "footer-five": "Newsletter Footer",
  "footer-six": "Sticky Reveal Footer",
  "header-one": "Blurred Sticky Header",
  "header-two": "Floating Scroll Header",
  "header-three": "Dropdown Header",
  "hero-one": "Logo Marquee Hero",
  "hero-two": "Dashboard Hero",
  "hero-three": "Product Preview Hero",
  "image-gallery-one": "Masonry Image Grid",
  "logo-cloud-one": "Bordered Logo Grid",
  "logo-cloud-two": "Alternating Logo Grid",
  "logo-cloud-three": "Scrolling Logo Row",
  "logo-cloud-four": "Blurred Logo Marquee",
  "logo-cloud-five": "Wrapped Logo Cloud",
  "cta-one": "Split CTA Bar",
  "cta-two": "Stacked CTA",
  "cta-three": "Bordered CTA Panel",
  "cta-four": "Trial Card CTA",
  "cta-five": "Newsletter CTA",
  "faq-one": "Centered FAQ",
  "faq-two": "Two-Column FAQ",
  "faq-three": "Split Rail FAQ",
  "faq-four": "Topic Filter FAQ",
  "faq-five": "Searchable FAQ",
  "pricing-one": "Billing Toggle Pricing",
  "pricing-two": "Two-Plan Pricing",
  "pricing-three": "Three-Tier Pricing",
  "pricing-four": "Animated Pricing Table",
  "testimonials-one": "Brand Quote",
  "testimonials-two": "Profile Quote",
  "testimonials-three": "Testimonial Cards",
  "testimonials-four": "Editorial Quote Grid",
  "testimonials-five": "Testimonial Wall",
  "testimonials-six": "Animated Testimonials",
  "404-one": "Bordered 404",
  "404-two": "Minimal 404",
  "blog-one": "Compact Blog Index",
  "blog-two": "Editorial Blog Grid",
  "blog-three": "Image Blog Grid",
  "contact-one": "Contact Method Row",
  "contact-two": "Contact Action Cards",
  "contact-three": "Contact Directory",
  "contact-four": "Split Contact Form",
  "contact-five": "Bordered Contact Form",
  "integrations-one": "Integration Cards",
  "integrations-two": "Integration Matrix",
  "integrations-three": "Split Integrations",
  "integrations-four": "Integration Hero",
  "integrations-five": "Logo Cluster",
  "onboarding-one": "Setup Checklist",
  "onboarding-two": "Activation Steps",
  "onboarding-three": "Selectable Checklist",
  "onboarding-four": "Accordion Onboarding",
  "onboarding-five": "Activity Timeline",
  "onboarding-six": "Launch Timeline",
  "onboarding-seven": "Animated Setup Progress",
  "stats-one": "Metric Strip",
  "stats-two": "Trend Metric Cards",
  "stats-three": "Compact Metrics",
  "stats-four": "Badge Trend Metrics",
  "stats-five": "Linked Metric Cards",
  "stats-six": "Goal Metric Cards",
  "stats-seven": "Plan Overview Cards",
  "stats-eight": "Radial Progress Cards",
  "stats-nine": "Usage Limit Cards",
  "stats-ten": "Sparkline Metrics",
  "stats-eleven": "Usage Guardrails",
  "stats-twelve": "Donut Usage List",
  "stats-thirteen": "Stacked Usage Bar",
  "stats-fourteen": "Breakdown Usage Card",
  "stats-fifteen": "Projection List",
  "pro-area-chart": "Area Chart Variations",
  "pro-bar-chart": "Bar Chart Variations",
  "pro-line-chart": "Line Chart Variations",
  "pro-scatter-chart": "Scatter Chart Variations",
  "pro-funnel-chart": "Funnel Chart Variations",
  "pro-treemap-chart": "Treemap Variations",
  "pro-pie-chart": "Pie Chart Variations",
  "pro-radar-chart": "Radar Chart Variations",
  "pro-radial-chart": "Radial Chart Variations",
  "header-01": "Design Hub Header",
  "header-02": "Service Header",
  "header-03": "App Header",
  "header-04": "Commerce Header",
  "header-05": "Enterprise Header",
  "download-01": "OS Download Cards",
  "download-02": "Plugin Download Layout",
}

export async function getBuilderRegistryCatalog({
  includePro = false,
}: {
  includePro?: boolean
} = {}) {
  const registryIndexes: BuilderRegistryIndexSource[] = await Promise.all([
    readBuilderRegistryIndex(REGISTRY_ROOT, REGISTRY_SOURCE_ROOTS),
    includePro
      ? readBuilderRegistryIndex(PRO_REGISTRY_ROOT, PRO_REGISTRY_SOURCE_ROOTS)
      : Promise.resolve({ index: null, sourceRoots: PRO_REGISTRY_SOURCE_ROOTS }),
  ])
  const registryItems = registryIndexes
    .flatMap(({ index, sourceRoots }) =>
      (index?.items ?? []).map((item) => ({ item, sourceRoots }))
    )
    .filter((item) =>
      isBuilderCatalogRegistryType(item.item) &&
      !isExcludedBuilderRegistryItem(item.item) &&
      hasBuilderRegistrySource(item.item, item.sourceRoots)
    )
    .map(({ item }) => registryItemToCatalogItem(item))

  const iconItems = BUILDER_ASSET_COLLECTIONS.flatMap((collection) =>
    getAssetCollection(collection).map(iconToCatalogItem)
  )

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

async function readBuilderRegistryIndex(
  root: string,
  sourceRoots: BuilderRegistrySourceRoot[]
): Promise<BuilderRegistryIndexSource> {
  return {
    index: await readRegistryIndex(root),
    sourceRoots,
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

function hasBuilderRegistrySource(
  item: BuilderRegistryItemPayload,
  sourceRoots: BuilderRegistrySourceRoot[]
) {
  const sourcePaths =
    item.files
      ?.map((file) => file.path)
      .filter((filePath): filePath is string => Boolean(filePath)) ?? []

  if (sourcePaths.length > 0) {
    return sourcePaths.some((filePath) => sourceFileExists(sourceRoots, filePath))
  }

  if (item.type === "registry:block" && item.meta?.source === "block") {
    return getBlockSourceCandidates(item).some((filePath) =>
      sourceFileExists(sourceRoots, filePath)
    )
  }

  return false
}

function sourceFileExists(sourceRoots: BuilderRegistrySourceRoot[], filePath: string) {
  if (path.isAbsolute(filePath)) return false

  return sourceRoots.some(({ prefix, roots }) => {
    if (!filePath.startsWith(prefix)) return false

    const relativeFilePath = filePath.slice(prefix.length)

    return roots.some((sourceRoot) => {
      const absoluteSourceRoot = path.resolve(sourceRoot)
      const absoluteFilePath = path.resolve(absoluteSourceRoot, relativeFilePath)

      if (
        absoluteFilePath !== absoluteSourceRoot &&
        !absoluteFilePath.startsWith(`${absoluteSourceRoot}${path.sep}`)
      ) {
        return false
      }

      return existsSync(absoluteFilePath)
    })
  })
}

function getBlockSourceCandidates(item: BuilderRegistryItemPayload) {
  const variant = item.name.replace(BLOCK_VARIANT_SUFFIX_PATTERN, "")
  const variantNumber = item.name.match(BLOCK_VARIANT_SUFFIX_PATTERN)?.[1]
  const number = variantNumber ? numberWordToInt(variantNumber) : null

  if (!variant || !number) return []

  return [
    `registry/default/blocks/${variant}${number}`,
    `registry/default/blocks/${variant}-${number}`,
    `registry/default/blocks/${variant}s${number}`,
  ]
}

function numberWordToInt(value: string) {
  const numberByWord: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
  }

  return numberByWord[value.toLowerCase()] ?? null
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
  const collectionLabel = formatAssetLabel(item.collection)
  const variantLabel =
    item.variant === defaultAssetStyle[item.collection]
      ? ""
      : ` ${formatAssetLabel(item.variant)}`

  return {
    name: item.id,
    title: `${item.name}${variantLabel}`,
    description: `${collectionLabel} asset from LoveUI ${formatAssetLabel(item.category)}.`,
    type: "asset:icon",
    category: `${item.collection}/${item.category}`,
    previewUrl: item.previewUrl,
    sourcePath: item.sourcePath,
    exportName: toPascalCase(item.id),
    assetCollection: item.collection,
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
  if (item.type === "registry:block") {
    const customTitle = BUILDER_BLOCK_TITLES[item.name]

    if (customTitle) return customTitle
  }

  if (item.title) {
    return formatRegistryTitleText(item.title)
  }

  if (item.description) {
    return formatShortRegistryDescription(item.description)
  }

  return formatWords(item.name)
}

function formatRegistryTitleText(value: string) {
  const title = value.includes("/")
    ? value
        .split("/")
        .map((part) => formatWords(part))
        .join(" ")
    : value

  return title
    .replace(/\s+-\s+/g, " ")
    .replace(/^(A|An)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim()
}

function formatShortRegistryDescription(value: string) {
  const cleaned = value
    .replace(/\.$/, "")
    .replace(/^(A|An)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim()
  const [mainClause] = cleaned.split(/\s+(?:with|for)\s+/i)

  return mainClause && mainClause.length >= 8 ? mainClause : cleaned
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
