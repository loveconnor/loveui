"use client"

import * as React from "react"
import {
  Box,
  Component,
  Eye,
  Frame,
  Grid2x2,
  Layers,
  Lock,
  LockOpen,
  Search,
  Shapes,
  Trash2,
} from "love-ui/icons"

import { cn } from "@/lib/cn"
import type {
  BuilderCatalogItem,
  BuilderDocumentItem,
  BuilderDocumentPage,
} from "@/lib/builder/types"
import type { StudioAction, StudioState } from "./builder-store"

export type BuilderCatalog = {
  blocks: BuilderCatalogItem[]
  components: BuilderCatalogItem[]
  icons: BuilderCatalogItem[]
}

type CatalogTab = keyof BuilderCatalog

export function BuilderLibraryPanel({
  catalog,
  state,
  dispatch,
  onInsert,
}: {
  catalog: BuilderCatalog
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  onInsert: (item: BuilderCatalogItem) => void
}) {
  const [panelTab, setPanelTab] = React.useState<"insert" | "layers">("insert")

  return (
    <aside className="z-10 flex min-h-0 w-72 shrink-0 flex-col overflow-hidden border-r bg-background">
      <div className="flex shrink-0 items-center gap-1 border-b px-2 py-2">
        {(
          [
            { id: "insert", label: "Insert", icon: <Shapes className="size-3.5" /> },
            { id: "layers", label: "Layers", icon: <Layers className="size-3.5" /> },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            data-active={panelTab === tab.id}
            className="flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
            onClick={() => setPanelTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {panelTab === "insert" ? (
        <InsertTab catalog={catalog} onInsert={onInsert} />
      ) : (
        <LayersTab dispatch={dispatch} state={state} />
      )}
    </aside>
  )
}

/* ------------------------------ Insert tab ------------------------------ */

function InsertTab({
  catalog,
  onInsert,
}: {
  catalog: BuilderCatalog
  onInsert: (item: BuilderCatalogItem) => void
}) {
  const [tab, setTab] = React.useState<CatalogTab>("blocks")
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState("all")

  const items = catalog[tab]
  const categories = React.useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [items]
  )
  const visible = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false
      if (!normalized) return true

      return `${item.title} ${item.name} ${item.description} ${item.category}`
        .toLowerCase()
        .includes(normalized)
    })
  }, [items, query, category])

  return (
    <>
      <div className="shrink-0 space-y-2.5 border-b p-3">
        <div className="grid grid-cols-3 rounded-lg bg-muted p-0.5">
          {(["blocks", "components", "icons"] as const).map((entry) => (
            <button
              key={entry}
              type="button"
              data-active={tab === entry}
              className="h-7 rounded-md text-xs font-medium capitalize text-muted-foreground transition-colors data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm"
              onClick={() => {
                setTab(entry)
                setCategory("all")
              }}
            >
              {entry}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-background px-2 focus-within:ring-2 focus-within:ring-ring">
          <Search className="size-3.5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${tab}…`}
            className="h-8 min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
        {categories.length > 1 ? (
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-8 w-full rounded-md border bg-background px-2 text-xs"
            aria-label="Category"
          >
            <option value="all">All categories</option>
            {categories.map((entry) => (
              <option key={entry} value={entry}>
                {formatLabel(entry)}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {visible.length === 0 ? (
          <p className="px-2 py-8 text-center text-xs text-muted-foreground">
            No results. Try a different search.
          </p>
        ) : tab === "icons" ? (
          <div className="grid grid-cols-4 gap-1">
            {visible.map((item) => (
              <button
                key={`${item.type}:${item.name}`}
                type="button"
                draggable
                title={item.title}
                onClick={() => onInsert(item)}
                onDragStart={(event) => setDragPayload(event, item)}
                className="grid aspect-square cursor-grab place-items-center rounded-md border border-transparent transition-colors hover:border-border hover:bg-muted active:cursor-grabbing"
              >
                {item.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={item.title}
                    className="size-6 object-contain dark:invert"
                    draggable={false}
                    src={item.previewUrl}
                  />
                ) : (
                  <Grid2x2 className="size-5 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid gap-1">
            {visible.map((item) => (
              <button
                key={`${item.type}:${item.name}`}
                type="button"
                draggable
                onClick={() => onInsert(item)}
                onDragStart={(event) => setDragPayload(event, item)}
                className="group flex cursor-grab items-center gap-2.5 rounded-md p-2 text-left transition-colors hover:bg-muted active:cursor-grabbing"
              >
                <div className="grid size-8 shrink-0 place-items-center rounded-md border bg-background text-muted-foreground group-hover:text-foreground">
                  {item.type === "registry:block" ? (
                    <Box className="size-3.5" />
                  ) : (
                    <Component className="size-3.5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium">{item.title}</div>
                  <div className="truncate text-[10px] text-muted-foreground">
                    {formatLabel(item.category)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t px-3 py-2 text-[10px] leading-4 text-muted-foreground">
        Drag onto the canvas, or click to insert at the center of the view.
      </div>
    </>
  )
}

function setDragPayload(
  event: React.DragEvent<HTMLButtonElement>,
  item: BuilderCatalogItem
) {
  event.dataTransfer.setData(
    "application/x-loveui-builder-item",
    JSON.stringify(item)
  )
  event.dataTransfer.effectAllowed = "copy"
}

/* ------------------------------ Layers tab ------------------------------ */

function LayersTab({
  state,
  dispatch,
}: {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
}) {
  // Topmost first, like Figma.
  const items = [...state.items].reverse()

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-2">
      <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        Frames
      </div>
      <div className="grid gap-0.5">
        {state.pages.map((page) => (
          <FrameRow
            key={page.id}
            dispatch={dispatch}
            page={page}
            selected={state.selection.includes(page.id)}
            canDelete={state.pages.length > 1}
          />
        ))}
      </div>

      <div className="px-2 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        Layers
      </div>
      {items.length === 0 ? (
        <p className="px-2 py-6 text-center text-xs text-muted-foreground">
          The canvas is empty. Insert blocks or components to get started.
        </p>
      ) : (
        <div className="grid gap-0.5">
          {items.map((item) => (
            <LayerRow
              key={item.id}
              dispatch={dispatch}
              item={item}
              selected={state.selection.includes(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FrameRow({
  page,
  selected,
  canDelete,
  dispatch,
}: {
  page: BuilderDocumentPage
  selected: boolean
  canDelete: boolean
  dispatch: React.Dispatch<StudioAction>
}) {
  return (
    <div
      data-selected={selected}
      className="group flex h-8 items-center gap-2 rounded-md px-2 text-xs transition-colors hover:bg-muted data-[selected=true]:bg-blue-500/10 data-[selected=true]:text-blue-600 dark:data-[selected=true]:text-blue-400"
    >
      <Frame className="size-3.5 shrink-0" />
      <button
        type="button"
        className="min-w-0 flex-1 truncate text-left font-medium"
        onClick={(event) =>
          event.shiftKey
            ? dispatch({ type: "toggle-selection", id: page.id })
            : dispatch({ type: "set-selection", ids: [page.id] })
        }
      >
        {page.name}
      </button>
      {canDelete ? (
        <button
          type="button"
          aria-label={`Delete ${page.name}`}
          className="hidden shrink-0 text-muted-foreground hover:text-destructive group-hover:block"
          onClick={() => dispatch({ type: "delete-ids", ids: [page.id] })}
        >
          <Trash2 className="size-3.5" />
        </button>
      ) : null}
    </div>
  )
}

function LayerRow({
  item,
  selected,
  dispatch,
}: {
  item: BuilderDocumentItem
  selected: boolean
  dispatch: React.Dispatch<StudioAction>
}) {
  const label = item.overrides?.label || item.title

  return (
    <div
      data-selected={selected}
      className="group flex h-8 items-center gap-2 rounded-md px-2 text-xs transition-colors hover:bg-muted data-[selected=true]:bg-blue-500/10 data-[selected=true]:text-blue-600 dark:data-[selected=true]:text-blue-400"
    >
      {item.registryType === "asset:icon" ? (
        <Grid2x2 className="size-3.5 shrink-0" />
      ) : item.registryType === "registry:block" ? (
        <Box className="size-3.5 shrink-0" />
      ) : (
        <Component className="size-3.5 shrink-0" />
      )}
      <button
        type="button"
        className="min-w-0 flex-1 truncate text-left"
        title={label}
        onClick={(event) =>
          event.shiftKey
            ? dispatch({ type: "toggle-selection", id: item.id })
            : dispatch({ type: "set-selection", ids: [item.id] })
        }
        onDoubleClick={() => dispatch({ type: "set-editing", id: item.id })}
      >
        {label}
      </button>
      <button
        type="button"
        aria-label={item.locked ? "Unlock layer" : "Lock layer"}
        className={cn(
          "shrink-0 text-muted-foreground hover:text-foreground",
          item.locked ? "block" : "hidden group-hover:block"
        )}
        onClick={() =>
          dispatch({
            type: "update-item",
            id: item.id,
            patch: { locked: !item.locked },
            history: true,
          })
        }
      >
        {item.locked ? (
          <Lock className="size-3.5" />
        ) : (
          <LockOpen className="size-3.5" />
        )}
      </button>
      <button
        type="button"
        aria-label="Delete layer"
        className="hidden shrink-0 text-muted-foreground hover:text-destructive group-hover:block"
        onClick={() => dispatch({ type: "delete-ids", ids: [item.id] })}
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  )
}

function formatLabel(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}
