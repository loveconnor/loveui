import type {
  BuilderDocument,
  BuilderDocumentItem,
  BuilderDocumentPage,
} from "@/lib/builder/types"

export type CanvasTool = "select" | "hand" | "frame" | "text" | "box"

export type Camera = {
  /** Screen-space translation in px. screen = world * z + (x, y) */
  x: number
  y: number
  /** Zoom factor */
  z: number
}

export type Bounds = {
  x: number
  y: number
  w: number
  h: number
}

export type AlignKind =
  | "left"
  | "center-x"
  | "right"
  | "top"
  | "center-y"
  | "bottom"

export type ReorderDirection = "front" | "back" | "forward" | "backward"

type Snapshot = {
  items: BuilderDocumentItem[]
  pages: BuilderDocumentPage[]
}

export type StudioState = {
  items: BuilderDocumentItem[]
  pages: BuilderDocumentPage[]
  selection: string[]
  editingId: string | null
  tool: CanvasTool
  past: Snapshot[]
  future: Snapshot[]
  /** Bumps whenever document content changes; used for autosave dirty checks. */
  revision: number
}

export type StudioAction =
  | { type: "replace-document"; document: BuilderDocument }
  | { type: "set-tool"; tool: CanvasTool }
  | { type: "set-selection"; ids: string[] }
  | { type: "toggle-selection"; id: string }
  | { type: "set-editing"; id: string | null }
  | { type: "begin-gesture" }
  | { type: "add-item"; item: BuilderDocumentItem }
  | { type: "add-frame"; frame: BuilderDocumentPage }
  | { type: "set-node-bounds"; bounds: Record<string, Bounds> }
  | {
      type: "update-item"
      id: string
      patch: Partial<BuilderDocumentItem>
      history?: boolean
    }
  | {
      type: "update-frame"
      id: string
      patch: Partial<BuilderDocumentPage>
      history?: boolean
    }
  | { type: "delete-ids"; ids: string[] }
  | { type: "duplicate-ids"; ids: string[] }
  | { type: "paste-items"; items: BuilderDocumentItem[] }
  | { type: "reorder"; ids: string[]; direction: ReorderDirection }
  | { type: "align"; ids: string[]; kind: AlignKind }
  | { type: "nudge"; ids: string[]; dx: number; dy: number }
  | { type: "undo" }
  | { type: "redo" }

const HISTORY_LIMIT = 60

export function createStudioState(document: BuilderDocument): StudioState {
  const pages = document.pages

  return {
    items: sortByZIndex(document.items),
    pages,
    selection: defaultFrameSelection(pages),
    editingId: null,
    tool: "select",
    past: [],
    future: [],
    revision: 0,
  }
}

export function createId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 13)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

  return `${prefix}-${random}`
}

function sortByZIndex(items: BuilderDocumentItem[]) {
  return [...items].sort((a, b) => a.zIndex - b.zIndex)
}

function snapshot(state: StudioState): Snapshot {
  return { items: state.items, pages: state.pages }
}

function defaultFrameSelection(pages: BuilderDocumentPage[]) {
  return pages[0] ? [pages[0].id] : []
}

function normalizeSelection(ids: string[], pages: BuilderDocumentPage[]) {
  return ids.length > 0 ? ids : defaultFrameSelection(pages)
}

function pushHistory(state: StudioState): StudioState {
  return {
    ...state,
    past: [...state.past.slice(-HISTORY_LIMIT + 1), snapshot(state)],
    future: [],
  }
}

function touched(state: StudioState): StudioState {
  return { ...state, revision: state.revision + 1 }
}

export function isFrameId(state: StudioState, id: string) {
  return state.pages.some((page) => page.id === id)
}

export function getNodeBounds(state: StudioState, id: string): Bounds | null {
  const item = state.items.find((entry) => entry.id === id)

  if (item) return { x: item.x, y: item.y, w: item.w, h: item.h }

  const page = state.pages.find((entry) => entry.id === id)

  if (page) return { x: page.x, y: page.y, w: page.w, h: page.h }

  return null
}

export function getSelectionBounds(state: StudioState, ids: string[]) {
  const all = ids
    .map((id) => getNodeBounds(state, id))
    .filter((bounds): bounds is Bounds => bounds !== null)

  return unionBounds(all)
}

export function unionBounds(list: Bounds[]): Bounds | null {
  if (list.length === 0) return null

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const bounds of list) {
    minX = Math.min(minX, bounds.x)
    minY = Math.min(minY, bounds.y)
    maxX = Math.max(maxX, bounds.x + bounds.w)
    maxY = Math.max(maxY, bounds.y + bounds.h)
  }

  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
}

export function boundsIntersect(a: Bounds, b: Bounds) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  )
}

export function studioReducer(
  state: StudioState,
  action: StudioAction
): StudioState {
  switch (action.type) {
    case "replace-document": {
      return createStudioState(action.document)
    }

    case "set-tool": {
      return { ...state, tool: action.tool, editingId: null }
    }

    case "set-selection": {
      const ids = action.ids.filter(
        (id) =>
          state.items.some((item) => item.id === id) || isFrameId(state, id)
      )
      const selection = normalizeSelection(ids, state.pages)

      if (sameIds(selection, state.selection)) return state

      return {
        ...state,
        selection,
        editingId:
          state.editingId && selection.includes(state.editingId)
            ? state.editingId
            : null,
      }
    }

    case "toggle-selection": {
      const selection = normalizeSelection(
        state.selection.includes(action.id)
          ? state.selection.filter((id) => id !== action.id)
          : [...state.selection, action.id],
        state.pages
      )

      return { ...state, selection, editingId: null }
    }

    case "set-editing": {
      return {
        ...state,
        editingId: action.id,
        selection: action.id ? [action.id] : state.selection,
      }
    }

    case "begin-gesture": {
      return pushHistory(state)
    }

    case "add-item": {
      const next = pushHistory(state)

      return touched({
        ...next,
        items: [...next.items, action.item],
        selection: [action.item.id],
        editingId: null,
      })
    }

    case "add-frame": {
      const next = pushHistory(state)

      return touched({
        ...next,
        pages: [...next.pages, action.frame],
        selection: [action.frame.id],
        editingId: null,
      })
    }

    case "set-node-bounds": {
      const items = state.items.map((item) => {
        const bounds = action.bounds[item.id]

        return bounds
          ? {
              ...item,
              x: bounds.x,
              y: bounds.y,
              w: Math.max(bounds.w, 16),
              h: Math.max(bounds.h, 16),
            }
          : item
      })
      const pages = state.pages.map((page) => {
        const bounds = action.bounds[page.id]

        return bounds
          ? {
              ...page,
              x: bounds.x,
              y: bounds.y,
              w: Math.max(bounds.w, 320),
              h: Math.max(bounds.h, 320),
            }
          : page
      })

      return touched({ ...state, items, pages })
    }

    case "update-item": {
      const base = action.history ? pushHistory(state) : state
      const items = base.items.map((item) =>
        item.id === action.id
          ? {
              ...item,
              ...action.patch,
              overrides:
                action.patch.overrides === undefined
                  ? item.overrides
                  : { ...item.overrides, ...action.patch.overrides },
            }
          : item
      )

      return touched({ ...base, items })
    }

    case "update-frame": {
      const base = action.history ? pushHistory(state) : state
      const pages = base.pages.map((page) =>
        page.id === action.id ? { ...page, ...action.patch } : page
      )

      return touched({ ...base, pages })
    }

    case "delete-ids": {
      const ids = new Set(action.ids)
      const items = state.items.filter((item) => !ids.has(item.id))
      // Never delete the last frame.
      let pages = state.pages.filter((page) => !ids.has(page.id))

      if (pages.length === 0) pages = state.pages.slice(0, 1)

      if (items.length === state.items.length && pages === state.pages) {
        return state
      }

      const next = pushHistory(state)

      return touched({
        ...next,
        items,
        pages,
        selection: normalizeSelection(
          next.selection.filter((id) => !ids.has(id)),
          pages
        ),
        editingId:
          next.editingId && ids.has(next.editingId) ? null : next.editingId,
      })
    }

    case "duplicate-ids": {
      const source = state.items.filter((item) => action.ids.includes(item.id))

      if (source.length === 0) return state

      const next = pushHistory(state)
      const clones = source.map((item) => ({
        ...item,
        id: createId("item"),
        x: item.x + 24,
        y: item.y + 24,
        locked: false,
      }))

      return touched({
        ...next,
        items: [...next.items, ...clones],
        selection: clones.map((item) => item.id),
        editingId: null,
      })
    }

    case "paste-items": {
      if (action.items.length === 0) return state

      const next = pushHistory(state)

      return touched({
        ...next,
        items: [...next.items, ...action.items],
        selection: action.items.map((item) => item.id),
        editingId: null,
      })
    }

    case "reorder": {
      const ids = new Set(action.ids)
      const selected = state.items.filter((item) => ids.has(item.id))
      const rest = state.items.filter((item) => !ids.has(item.id))

      if (selected.length === 0) return state

      let items: BuilderDocumentItem[]

      if (action.direction === "front") {
        items = [...rest, ...selected]
      } else if (action.direction === "back") {
        items = [...selected, ...rest]
      } else {
        items = [...state.items]
        const indexes = items
          .map((item, index) => (ids.has(item.id) ? index : -1))
          .filter((index) => index >= 0)

        if (action.direction === "forward") {
          for (const index of [...indexes].reverse()) {
            if (index < items.length - 1 && !ids.has(items[index + 1].id)) {
              const [moved] = items.splice(index, 1)
              items.splice(index + 1, 0, moved)
            }
          }
        } else {
          for (const index of indexes) {
            if (index > 0 && !ids.has(items[index - 1].id)) {
              const [moved] = items.splice(index, 1)
              items.splice(index - 1, 0, moved)
            }
          }
        }
      }

      const next = pushHistory(state)

      return touched({ ...next, items })
    }

    case "align": {
      const bounds = getSelectionBounds(state, action.ids)

      if (!bounds) return state

      const ids = new Set(action.ids)
      const next = pushHistory(state)
      const items = next.items.map((item) => {
        if (!ids.has(item.id)) return item

        return { ...item, ...alignBounds(item, bounds, action.kind) }
      })
      const pages = next.pages.map((page) => {
        if (!ids.has(page.id)) return page

        return { ...page, ...alignBounds(page, bounds, action.kind) }
      })

      return touched({ ...next, items, pages })
    }

    case "nudge": {
      const ids = new Set(action.ids)
      const items = state.items.map((item) =>
        ids.has(item.id) && !item.locked
          ? { ...item, x: item.x + action.dx, y: item.y + action.dy }
          : item
      )
      const pages = state.pages.map((page) =>
        ids.has(page.id)
          ? { ...page, x: page.x + action.dx, y: page.y + action.dy }
          : page
      )

      return touched({ ...state, items, pages })
    }

    case "undo": {
      const previous = state.past[state.past.length - 1]

      if (!previous) return state

      return touched({
        ...state,
        items: previous.items,
        pages: previous.pages,
        past: state.past.slice(0, -1),
        future: [snapshot(state), ...state.future].slice(0, HISTORY_LIMIT),
        selection: normalizeSelection(
          state.selection.filter((id) =>
            previous.items.some((item) => item.id === id) ||
            previous.pages.some((page) => page.id === id)
          ),
          previous.pages
        ),
        editingId: null,
      })
    }

    case "redo": {
      const [next, ...future] = state.future

      if (!next) return state

      return touched({
        ...state,
        items: next.items,
        pages: next.pages,
        past: [...state.past, snapshot(state)].slice(-HISTORY_LIMIT),
        future,
        selection: normalizeSelection(
          state.selection.filter((id) =>
            next.items.some((item) => item.id === id) ||
            next.pages.some((page) => page.id === id)
          ),
          next.pages
        ),
        editingId: null,
      })
    }

    default: {
      return state
    }
  }
}

function alignBounds(
  node: { x: number; y: number; w: number; h: number },
  bounds: Bounds,
  kind: AlignKind
) {
  switch (kind) {
    case "left":
      return { x: bounds.x }
    case "center-x":
      return { x: bounds.x + (bounds.w - node.w) / 2 }
    case "right":
      return { x: bounds.x + bounds.w - node.w }
    case "top":
      return { y: bounds.y }
    case "center-y":
      return { y: bounds.y + (bounds.h - node.h) / 2 }
    case "bottom":
      return { y: bounds.y + bounds.h - node.h }
  }
}

function sameIds(a: string[], b: string[]) {
  return a.length === b.length && a.every((id, index) => id === b[index])
}

/* ----------------------------- Snapping ------------------------------ */

export type SnapGuides = {
  vertical: number[]
  horizontal: number[]
}

export type SnapResult = {
  dx: number
  dy: number
  guides: SnapGuides
}

/**
 * Figma-style smart guides: snap a moving bounds against the edges and
 * centers of every static node within `threshold` world units.
 */
export function computeSnap(
  moving: Bounds,
  staticBounds: Bounds[],
  threshold: number
): SnapResult {
  const movingXs = [moving.x, moving.x + moving.w / 2, moving.x + moving.w]
  const movingYs = [moving.y, moving.y + moving.h / 2, moving.y + moving.h]

  let bestDx: number | null = null
  let bestDy: number | null = null
  let snapX: number | null = null
  let snapY: number | null = null

  for (const bounds of staticBounds) {
    const targetXs = [bounds.x, bounds.x + bounds.w / 2, bounds.x + bounds.w]
    const targetYs = [bounds.y, bounds.y + bounds.h / 2, bounds.y + bounds.h]

    for (const source of movingXs) {
      for (const target of targetXs) {
        const delta = target - source

        if (
          Math.abs(delta) <= threshold &&
          (bestDx === null || Math.abs(delta) < Math.abs(bestDx))
        ) {
          bestDx = delta
          snapX = target
        }
      }
    }

    for (const source of movingYs) {
      for (const target of targetYs) {
        const delta = target - source

        if (
          Math.abs(delta) <= threshold &&
          (bestDy === null || Math.abs(delta) < Math.abs(bestDy))
        ) {
          bestDy = delta
          snapY = target
        }
      }
    }
  }

  return {
    dx: bestDx ?? 0,
    dy: bestDy ?? 0,
    guides: {
      vertical: snapX === null ? [] : [snapX],
      horizontal: snapY === null ? [] : [snapY],
    },
  }
}

/* --------------------------- Misc helpers ---------------------------- */

export function defaultSizeForCatalogType(type: string) {
  if (type === "registry:block") return { w: 960, h: 560 }
  if (type === "asset:icon") return { w: 96, h: 96 }
  if (type === "primitive:text") return { w: 220, h: 40 }
  if (type === "primitive:box") return { w: 200, h: 160 }

  return { w: 420, h: 280 }
}

export function buildDocument({
  state,
  framework,
  theme,
}: {
  state: StudioState
  framework: BuilderDocument["framework"]
  theme: BuilderDocument["theme"]
}): BuilderDocument {
  return {
    version: 1,
    framework,
    theme,
    pages: state.pages,
    items: state.items.map((item, index) => ({ ...item, zIndex: index })),
  }
}
