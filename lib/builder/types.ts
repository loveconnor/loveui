export const builderFrameworks = ["next", "vite", "react"] as const

export type BuilderFramework = (typeof builderFrameworks)[number]

export type BuilderRegistryType =
  | "registry:block"
  | "registry:ui"
  | "registry:example"
  | "asset:icon"

export type BuilderCatalogItem = {
  name: string
  title: string
  description: string
  type: BuilderRegistryType
  category: string
  previewUrl?: string
  sourcePath?: string
  exportName?: string
}

export type BuilderDocumentItem = {
  id: string
  registryName: string
  registryType: BuilderRegistryType
  title: string
  previewUrl?: string
  x: number
  y: number
  w: number
  h: number
  rotation: number
  zIndex: number
  locked?: boolean
  overrides?: {
    label?: string
    className?: string
    notes?: string
    text?: Record<string, string>
    textStyles?: Record<string, { fontSize?: number }>
  }
}

export type BuilderDocumentPage = {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
}

export type BuilderDocument = {
  version: 1
  framework: BuilderFramework
  theme: "light" | "dark" | "system"
  pages: BuilderDocumentPage[]
  items: BuilderDocumentItem[]
}

export type BuilderProject = {
  id: string
  userId: string
  name: string
  framework: BuilderFramework
  document: BuilderDocument
  tldrawSnapshot: unknown | null
  createdAt: string
  updatedAt: string
  lastExportedAt: string | null
}

export function isBuilderFramework(value: string): value is BuilderFramework {
  return builderFrameworks.includes(value as BuilderFramework)
}

export function createDefaultBuilderDocument(
  framework: BuilderFramework = "next"
): BuilderDocument {
  return {
    version: 1,
    framework,
    theme: "system",
    pages: [
      {
        id: "page-home",
        name: "Home",
        x: 0,
        y: 0,
        w: 1200,
        h: 900,
      },
    ],
    items: [],
  }
}

export function normalizeBuilderDocument(
  value: unknown,
  fallbackFramework: BuilderFramework = "next"
): BuilderDocument {
  if (!value || typeof value !== "object") {
    return createDefaultBuilderDocument(fallbackFramework)
  }

  const input = value as Partial<BuilderDocument>
  const framework: BuilderFramework = isBuilderFramework(String(input.framework))
    ? input.framework ?? fallbackFramework
    : fallbackFramework

  return {
    version: 1,
    framework,
    theme:
      input.theme === "light" || input.theme === "dark" || input.theme === "system"
        ? input.theme
        : "system",
    pages:
      Array.isArray(input.pages) && input.pages.length > 0
        ? input.pages.map((page, index) => ({
            id: String(page.id || `page-${index + 1}`),
            name: String(page.name || `Page ${index + 1}`),
            x: toFiniteNumber(page.x, 0),
            y: toFiniteNumber(page.y, 0),
            w: Math.max(toFiniteNumber(page.w, 1200), 320),
            h: Math.max(toFiniteNumber(page.h, 900), 320),
          }))
        : createDefaultBuilderDocument(framework).pages,
    items: Array.isArray(input.items)
      ? input.items.map((item, index) => ({
          id: String(item.id || `item-${index + 1}`),
          registryName: String(item.registryName || ""),
          registryType: normalizeRegistryType(item.registryType),
          title: String(item.title || item.registryName || "LoveUI item"),
          previewUrl: item.previewUrl ? String(item.previewUrl) : undefined,
          x: toFiniteNumber(item.x, 48 + index * 24),
          y: toFiniteNumber(item.y, 48 + index * 24),
          w: Math.max(toFiniteNumber(item.w, 360), 80),
          h: Math.max(toFiniteNumber(item.h, 220), 48),
          rotation: toFiniteNumber(item.rotation, 0),
          zIndex: toFiniteNumber(item.zIndex, index),
          locked: Boolean(item.locked),
          overrides:
            item.overrides && typeof item.overrides === "object"
              ? {
                  label: item.overrides.label
                    ? String(item.overrides.label)
                    : undefined,
                  className: item.overrides.className
                    ? String(item.overrides.className)
                    : undefined,
                  notes: item.overrides.notes
                    ? String(item.overrides.notes)
                    : undefined,
                  text: normalizeTextOverrides(item.overrides.text),
                  textStyles: normalizeTextStyleOverrides(item.overrides.textStyles),
                }
              : undefined,
        }))
      : [],
  }
}

function normalizeRegistryType(value: unknown): BuilderRegistryType {
  if (
    value === "registry:block" ||
    value === "registry:ui" ||
    value === "registry:example" ||
    value === "asset:icon"
  ) {
    return value
  }

  return "registry:block"
}

function toFiniteNumber(value: unknown, fallback: number) {
  const number = typeof value === "number" ? value : Number(value)

  return Number.isFinite(number) ? number : fallback
}

function normalizeTextOverrides(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined

  const entries = Object.entries(value)
    .map(([key, entry]) => [String(key), String(entry)] as const)
    .filter(([key]) => key)

  return entries.length ? Object.fromEntries(entries) : undefined
}

function normalizeTextStyleOverrides(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined

  const entries = Object.entries(value)
    .map(([key, entry]) => {
      const style = entry && typeof entry === "object" ? entry as { fontSize?: unknown } : {}
      const fontSize = toFiniteNumber(style.fontSize, NaN)

      return [
        String(key),
        Number.isFinite(fontSize) ? { fontSize: Math.max(8, Math.min(96, fontSize)) } : {},
      ] as const
    })
    .filter(([key, style]) => key && typeof style.fontSize === "number")

  return entries.length ? Object.fromEntries(entries) : undefined
}
