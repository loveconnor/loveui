export const builderFrameworks = ["next", "vite", "react"] as const

export type BuilderFramework = (typeof builderFrameworks)[number]

export type BuilderRegistryType =
  | "registry:block"
  | "registry:ui"
  | "registry:example"
  | "asset:icon"
  | "primitive:text"
  | "primitive:box"

/**
 * Per-element overrides applied inside a rendered block/component preview.
 * Keyed by the element's stable `data-builder-el` id.
 */
export type BuilderElementOverride = {
  /** Translation offset in px relative to the element's natural position. */
  dx?: number
  dy?: number
  /** Explicit size in px. */
  w?: number
  h?: number
  /** Inline CSS declarations, camelCase keys (e.g. backgroundColor). */
  styles?: Record<string, string>
  /** Hide this element from the rendered block/export without deleting source. */
  hidden?: boolean
  /** Prototype/export link target for interactive elements inside a preview. */
  link?: BuilderElementLink
}

export type BuilderElementLink = {
  kind: "frame"
  pageId: string
}

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
    /** Text content for primitive:text layers. */
    content?: string
    /** Item-level inline styles, camelCase keys (fill, radius, opacity…). */
    styles?: Record<string, string>
    text?: Record<string, string>
    textStyles?: Record<string, { fontSize?: number }>
    /** Overrides for elements inside the rendered preview. */
    elements?: Record<string, BuilderElementOverride>
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
                  content:
                    item.overrides.content !== undefined
                      ? String(item.overrides.content)
                      : undefined,
                  styles: normalizeStyleMap(item.overrides.styles),
                  text: normalizeTextOverrides(item.overrides.text),
                  textStyles: normalizeTextStyleOverrides(item.overrides.textStyles),
                  elements: normalizeElementOverrides(item.overrides.elements),
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
    value === "asset:icon" ||
    value === "primitive:text" ||
    value === "primitive:box"
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

function normalizeStyleMap(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined

  const entries = Object.entries(value)
    .map(([key, entry]) => [String(key), String(entry)] as const)
    .filter(([key, entry]) => key && entry)

  return entries.length ? Object.fromEntries(entries) : undefined
}

function normalizeElementOverrides(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined

  const result: Record<string, BuilderElementOverride> = {}

  for (const [key, raw] of Object.entries(value)) {
    if (!key || !raw || typeof raw !== "object") continue

    const input = raw as BuilderElementOverride
    const entry: BuilderElementOverride = {}
    const dx = toFiniteNumber(input.dx, 0)
    const dy = toFiniteNumber(input.dy, 0)
    const w = toFiniteNumber(input.w, NaN)
    const h = toFiniteNumber(input.h, NaN)
    const styles = normalizeStyleMap(input.styles)

    if (dx) entry.dx = dx
    if (dy) entry.dy = dy
    if (Number.isFinite(w) && w > 0) entry.w = w
    if (Number.isFinite(h) && h > 0) entry.h = h
    if (styles) entry.styles = styles
    if (input.hidden) entry.hidden = true
    const link = normalizeElementLink(input.link)

    if (link) entry.link = link

    if (Object.keys(entry).length > 0) result[key] = entry
  }

  return Object.keys(result).length > 0 ? result : undefined
}

function normalizeElementLink(value: unknown): BuilderElementLink | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined
  }

  const input = value as Partial<BuilderElementLink>

  if (input.kind === "frame" && input.pageId) {
    return { kind: "frame", pageId: String(input.pageId) }
  }

  return undefined
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
