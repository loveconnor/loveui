"use client"

import * as React from "react"
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignStartVertical,
  BringToFront,
  Check,
  ChevronDown,
  FileCode,
  Lock,
  LockOpen,
  RotateCw,
  SendToBack,
  Trash2,
  X,
} from "love-ui/icons"

import { cn } from "@/lib/cn"
import type { BuilderSelectedElement } from "@/lib/builder/preview-protocol"
import type {
  BuilderDocumentItem,
  BuilderDocumentPage,
  BuilderElementOverride,
} from "@/lib/builder/types"
import type { AlignKind, StudioAction, StudioState } from "./builder-store"

/** An element selected inside a preview iframe, tagged with its layer id. */
export type BuilderElementSelection = BuilderSelectedElement & {
  itemId: string
}

const FONT_WEIGHT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
]

const SHADOW_OPTIONS = [
  { value: "", label: "None" },
  { value: "0 1px 2px rgba(0,0,0,0.1)", label: "Small" },
  { value: "0 4px 12px rgba(0,0,0,0.15)", label: "Medium" },
  { value: "0 12px 32px rgba(0,0,0,0.22)", label: "Large" },
]

const TEXT_ALIGN_OPTIONS = [
  { value: "", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
]

export function BuilderInspectorPanel({
  state,
  dispatch,
  selectedElement,
  onCopyItemCode,
}: {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  selectedElement: BuilderElementSelection | null
  onCopyItemCode: (item: BuilderDocumentItem) => Promise<void>
}) {
  const selectedItems = state.items.filter((item) =>
    state.selection.includes(item.id)
  )
  const selectedFrames = state.pages.filter((page) =>
    state.selection.includes(page.id)
  )
  const single =
    selectedItems.length === 1 && selectedFrames.length === 0
      ? selectedItems[0]
      : null
  const singleFrame =
    selectedFrames.length === 1 && selectedItems.length === 0
      ? selectedFrames[0]
      : null
  const total = selectedItems.length + selectedFrames.length

  const editingItem = state.editingId
    ? state.items.find((item) => item.id === state.editingId)
    : undefined
  const activeElement =
    selectedElement && editingItem && selectedElement.itemId === editingItem.id
      ? selectedElement
      : null

  return (
    <aside className="z-10 flex min-h-0 w-72 shrink-0 flex-col overflow-hidden border-l bg-background">
      <div className="flex h-11 shrink-0 items-center justify-between border-b px-3">
        <h2 className="truncate text-xs font-semibold">
          {activeElement
            ? `<${activeElement.tag}>`
            : single
              ? single.overrides?.label || single.title
              : singleFrame
                ? singleFrame.name
                : total > 1
                  ? `${total} selected`
                  : "Design"}
        </h2>
        {activeElement ? (
          <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400">
            Element
          </span>
        ) : single ? (
          <span className="text-[10px] text-muted-foreground">
            {formatTypeLabel(single.registryType)}
          </span>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeElement && editingItem ? (
          <ElementInspector
            dispatch={dispatch}
            element={activeElement}
            item={editingItem}
          />
        ) : total === 0 ? (
          <EmptyInspector itemCount={state.items.length} />
        ) : (
          <div className="divide-y">
            {total > 1 ? (
              <Section title="Align">
                <AlignControls
                  onAlign={(kind) =>
                    dispatch({ type: "align", ids: state.selection, kind })
                  }
                />
              </Section>
            ) : null}

            <Section title="Position & size">
              {single ? (
                <ItemGeometry dispatch={dispatch} item={single} />
              ) : singleFrame ? (
                <FrameGeometry dispatch={dispatch} frame={singleFrame} />
              ) : (
                <p className="text-[11px] leading-4 text-muted-foreground">
                  Drag on the canvas to move or resize the selection together.
                </p>
              )}
            </Section>

            {selectedItems.length > 0 ? (
              <Section title="Arrange">
                <div className="grid grid-cols-4 gap-1">
                  <IconAction
                    label="Bring to front — ]"
                    onClick={() =>
                      dispatch({
                        type: "reorder",
                        ids: state.selection,
                        direction: "front",
                      })
                    }
                  >
                    <BringToFront className="size-4" />
                  </IconAction>
                  <IconAction
                    label="Bring forward"
                    onClick={() =>
                      dispatch({
                        type: "reorder",
                        ids: state.selection,
                        direction: "forward",
                      })
                    }
                  >
                    <BringToFront className="size-4 opacity-60" />
                  </IconAction>
                  <IconAction
                    label="Send backward"
                    onClick={() =>
                      dispatch({
                        type: "reorder",
                        ids: state.selection,
                        direction: "backward",
                      })
                    }
                  >
                    <SendToBack className="size-4 opacity-60" />
                  </IconAction>
                  <IconAction
                    label="Send to back — ["
                    onClick={() =>
                      dispatch({
                        type: "reorder",
                        ids: state.selection,
                        direction: "back",
                      })
                    }
                  >
                    <SendToBack className="size-4" />
                  </IconAction>
                </div>
              </Section>
            ) : null}

            {singleFrame ? (
              <Section title="Frame">
                <Field label="Name">
                  <input
                    value={singleFrame.name}
                    onChange={(event) =>
                      dispatch({
                        type: "update-frame",
                        id: singleFrame.id,
                        patch: { name: event.target.value },
                      })
                    }
                    className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </Field>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {[
                    { label: "Desktop", w: 1440, h: 900 },
                    { label: "Tablet", w: 834, h: 1112 },
                    { label: "Phone", w: 390, h: 844 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      className="h-7 rounded-md border text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      onClick={() =>
                        dispatch({
                          type: "update-frame",
                          id: singleFrame.id,
                          patch: { w: preset.w, h: preset.h },
                          history: true,
                        })
                      }
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </Section>
            ) : null}

            {single?.registryType === "primitive:text" ? (
              <ItemTextSettings dispatch={dispatch} item={single} />
            ) : null}

            {single && single.registryType !== "asset:icon" ? (
              <ItemAppearance dispatch={dispatch} item={single} />
            ) : null}

            {single ? (
              <ItemSettings
                dispatch={dispatch}
                item={single}
                onCopyItemCode={onCopyItemCode}
              />
            ) : null}

            <Section title="">
              <div className="grid gap-1.5">
                {selectedItems.length > 0 ? (
                  <button
                    type="button"
                    className="flex h-8 items-center justify-center gap-2 rounded-md border text-xs font-medium transition-colors hover:bg-muted"
                    onClick={() =>
                      dispatch({
                        type: "update-item",
                        id: selectedItems[0].id,
                        patch: { locked: !selectedItems[0].locked },
                        history: true,
                      })
                    }
                  >
                    {selectedItems[0].locked ? (
                      <>
                        <LockOpen className="size-3.5" /> Unlock
                      </>
                    ) : (
                      <>
                        <Lock className="size-3.5" /> Lock
                      </>
                    )}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="flex h-8 items-center justify-center gap-2 rounded-md border border-destructive/30 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                  onClick={() =>
                    dispatch({ type: "delete-ids", ids: state.selection })
                  }
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
              </div>
            </Section>
          </div>
        )}
      </div>
    </aside>
  )
}

/* --------------------------- Element inspector --------------------------- */

function ElementInspector({
  item,
  element,
  dispatch,
}: {
  item: BuilderDocumentItem
  element: BuilderElementSelection
  dispatch: React.Dispatch<StudioAction>
}) {
  const mark = useGestureHistory(dispatch)
  const override: BuilderElementOverride =
    item.overrides?.elements?.[element.elementId] ?? element.override ?? {}

  const commitOverride = (next: BuilderElementOverride) => {
    dispatch({
      type: "update-item",
      id: item.id,
      patch: {
        overrides: {
          elements: { ...item.overrides?.elements, [element.elementId]: next },
        },
      },
    })
  }

  const patchOverride = (partial: Partial<BuilderElementOverride>) => {
    mark()
    commitOverride({ ...override, ...partial })
  }

  const patchStyles = (partial: Record<string, string | undefined>) => {
    mark()

    const styles: Record<string, string> = { ...override.styles }

    for (const [key, value] of Object.entries(partial)) {
      if (value === undefined || value === "") {
        delete styles[key]
      } else {
        styles[key] = value
      }
    }

    commitOverride({
      ...override,
      styles: Object.keys(styles).length > 0 ? styles : undefined,
    })
  }

  const resetElement = () => {
    const elements = { ...item.overrides?.elements }

    delete elements[element.elementId]

    dispatch({
      type: "update-item",
      id: item.id,
      patch: { overrides: { elements } },
      history: true,
    })
  }

  const hasOverride =
    Boolean(item.overrides?.elements?.[element.elementId]) ||
    Boolean(element.override)

  const fontSize =
    parsePx(override.styles?.fontSize) ?? element.computed.fontSize
  const radius =
    parsePx(override.styles?.borderRadius) ?? element.computed.borderRadius ?? 0
  const opacityRaw = override.styles?.opacity
    ? Number(override.styles.opacity)
    : (element.computed.opacity ?? 1)
  const opacity = Number.isFinite(opacityRaw) ? opacityRaw : 1
  const fill = override.styles?.backgroundColor ?? element.computed.backgroundColor
  const textColor = override.styles?.color ?? element.computed.color
  const weight = override.styles?.fontWeight ?? element.computed.fontWeight ?? ""

  return (
    <div className="divide-y">
      <Section title="Position & size">
        <div className="grid grid-cols-2 gap-1.5">
          <NumberField
            label="X"
            value={override.dx ?? 0}
            onCommit={(dx) => patchOverride({ dx: dx === 0 ? undefined : dx })}
          />
          <NumberField
            label="Y"
            value={override.dy ?? 0}
            onCommit={(dy) => patchOverride({ dy: dy === 0 ? undefined : dy })}
          />
          <NumberField
            label="W"
            min={8}
            value={override.w ?? element.rect.w}
            onCommit={(w) => patchOverride({ w })}
          />
          <NumberField
            label="H"
            min={8}
            value={override.h ?? element.rect.h}
            onCommit={(h) => patchOverride({ h })}
          />
        </div>
        <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
          X and Y offset the element from its original spot. Drag it on the
          canvas to move it freely.
        </p>
      </Section>

      <Section title="Fill">
        <ColorField
          label="Background"
          value={fill}
          onChange={(value) => patchStyles({ backgroundColor: value })}
        />
      </Section>

      <Section title="Text">
        <div className="grid gap-2">
          <ColorField
            label="Color"
            value={textColor}
            onChange={(value) => patchStyles({ color: value })}
          />
          <div className="grid grid-cols-2 gap-1.5">
            <NumberField
              label="Size"
              min={6}
              value={fontSize ?? 16}
              onCommit={(size) => patchStyles({ fontSize: `${size}px` })}
            />
            <SelectField
              label="Weight"
              options={FONT_WEIGHT_OPTIONS}
              value={
                FONT_WEIGHT_OPTIONS.some((option) => option.value === weight)
                  ? weight
                  : ""
              }
              onChange={(value) => patchStyles({ fontWeight: value })}
            />
          </div>
        </div>
      </Section>

      <Section title="Appearance">
        <div className="grid grid-cols-2 gap-1.5">
          <NumberField
            label="Radius"
            min={0}
            value={Math.round(radius)}
            onCommit={(value) =>
              patchStyles({ borderRadius: value === 0 ? undefined : `${value}px` })
            }
          />
          <NumberField
            label="Opacity"
            min={0}
            max={100}
            suffix="%"
            value={Math.round(opacity * 100)}
            onCommit={(value) =>
              patchStyles({
                opacity:
                  value >= 100 ? undefined : String(clamp(value, 0, 100) / 100),
              })
            }
          />
        </div>
      </Section>

      <Section title="">
        <div className="grid gap-1.5">
          {hasOverride ? (
            <button
              type="button"
              className="flex h-8 items-center justify-center gap-2 rounded-md border text-xs font-medium transition-colors hover:bg-muted"
              onClick={resetElement}
            >
              <X className="size-3.5" />
              Reset element changes
            </button>
          ) : null}
          <p className="text-[10px] leading-4 text-muted-foreground">
            Press <Kbd>Esc</Kbd> to go back to the layer, or double-click text
            to edit it.
          </p>
        </div>
      </Section>
    </div>
  )
}

/* ------------------------------ Empty state ------------------------------ */

function EmptyInspector({ itemCount }: { itemCount: number }) {
  return (
    <div className="p-4">
      <div className="rounded-lg border border-dashed p-4 text-[11px] leading-5 text-muted-foreground">
        <p className="font-medium text-foreground">Nothing selected</p>
        <p className="mt-1">
          {itemCount === 0
            ? "Drag blocks, components, or icons from the Insert panel onto the canvas."
            : "Select something on the canvas to edit its position, size, and styles."}
        </p>
        <ul className="mt-3 space-y-1.5">
          <li>
            <Kbd>V</Kbd> select · <Kbd>H</Kbd> hand · <Kbd>F</Kbd> frame
          </li>
          <li>
            <Kbd>T</Kbd> text · <Kbd>R</Kbd> rectangle
          </li>
          <li>
            <Kbd>Space</Kbd> + drag to pan · <Kbd>⌘</Kbd> + scroll to zoom
          </li>
          <li>Double-click a block, then click anything inside to style it</li>
          <li>
            <Kbd>⌘D</Kbd> duplicate · <Kbd>⌘Z</Kbd> undo · <Kbd>⌘S</Kbd> save
          </li>
        </ul>
      </div>
    </div>
  )
}

/* ------------------------------- Geometry ------------------------------- */

function ItemGeometry({
  item,
  dispatch,
}: {
  item: BuilderDocumentItem
  dispatch: React.Dispatch<StudioAction>
}) {
  function update(patch: Partial<BuilderDocumentItem>) {
    dispatch({ type: "update-item", id: item.id, patch, history: true })
  }

  return (
    <div className="grid grid-cols-2 gap-1.5">
      <NumberField label="X" value={item.x} onCommit={(x) => update({ x })} />
      <NumberField label="Y" value={item.y} onCommit={(y) => update({ y })} />
      <NumberField
        label="W"
        min={16}
        value={item.w}
        onCommit={(w) => update({ w })}
      />
      <NumberField
        label="H"
        min={16}
        value={item.h}
        onCommit={(h) => update({ h })}
      />
      <div className="col-span-2 flex items-center gap-1.5">
        <NumberField
          className="flex-1"
          label={<RotateCw className="size-3" />}
          value={Math.round((item.rotation * 180) / Math.PI)}
          onCommit={(degrees) =>
            update({ rotation: (degrees * Math.PI) / 180 })
          }
        />
        <button
          type="button"
          title={item.locked ? "Unlock" : "Lock"}
          aria-label={item.locked ? "Unlock" : "Lock"}
          data-active={item.locked}
          className="grid size-8 shrink-0 place-items-center rounded-md border text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
          onClick={() => update({ locked: !item.locked })}
        >
          {item.locked ? (
            <Lock className="size-3.5" />
          ) : (
            <LockOpen className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  )
}

function FrameGeometry({
  frame,
  dispatch,
}: {
  frame: BuilderDocumentPage
  dispatch: React.Dispatch<StudioAction>
}) {
  function update(patch: Partial<BuilderDocumentPage>) {
    dispatch({ type: "update-frame", id: frame.id, patch, history: true })
  }

  return (
    <div className="grid grid-cols-2 gap-1.5">
      <NumberField label="X" value={frame.x} onCommit={(x) => update({ x })} />
      <NumberField label="Y" value={frame.y} onCommit={(y) => update({ y })} />
      <NumberField
        label="W"
        min={320}
        value={frame.w}
        onCommit={(w) => update({ w })}
      />
      <NumberField
        label="H"
        min={320}
        value={frame.h}
        onCommit={(h) => update({ h })}
      />
    </div>
  )
}

/* ----------------------------- Item styling ----------------------------- */

function useItemStyles(
  item: BuilderDocumentItem,
  dispatch: React.Dispatch<StudioAction>
) {
  const mark = useGestureHistory(dispatch)
  const styles = React.useMemo(
    () => item.overrides?.styles ?? {},
    [item.overrides?.styles]
  )

  const patchStyles = (partial: Record<string, string | undefined>) => {
    mark()

    const next: Record<string, string> = { ...styles }

    for (const [key, value] of Object.entries(partial)) {
      if (value === undefined || value === "") {
        delete next[key]
      } else {
        next[key] = value
      }
    }

    dispatch({
      type: "update-item",
      id: item.id,
      patch: {
        overrides: { styles: Object.keys(next).length > 0 ? next : undefined },
      },
    })
  }

  return { styles, patchStyles }
}

function ItemAppearance({
  item,
  dispatch,
}: {
  item: BuilderDocumentItem
  dispatch: React.Dispatch<StudioAction>
}) {
  const { styles, patchStyles } = useItemStyles(item, dispatch)

  const opacityRaw = styles.opacity ? Number(styles.opacity) : 1
  const opacity = Number.isFinite(opacityRaw) ? opacityRaw : 1
  const radius = parsePx(styles.borderRadius) ?? 0
  const shadow = styles.boxShadow ?? ""

  return (
    <Section title="Appearance">
      <div className="grid gap-2">
        {item.registryType === "primitive:box" ? (
          <ColorField
            label="Fill"
            value={styles.backgroundColor ?? "#d9d9d9"}
            onChange={(value) => patchStyles({ backgroundColor: value })}
          />
        ) : null}
        <div className="grid grid-cols-2 gap-1.5">
          <NumberField
            label="Radius"
            min={0}
            value={Math.round(radius)}
            onCommit={(value) =>
              patchStyles({
                borderRadius: value === 0 ? undefined : `${value}px`,
              })
            }
          />
          <NumberField
            label="Opacity"
            min={0}
            max={100}
            suffix="%"
            value={Math.round(opacity * 100)}
            onCommit={(value) =>
              patchStyles({
                opacity:
                  value >= 100 ? undefined : String(clamp(value, 0, 100) / 100),
              })
            }
          />
        </div>
        <SelectField
          label="Shadow"
          options={SHADOW_OPTIONS}
          value={
            SHADOW_OPTIONS.some((option) => option.value === shadow)
              ? shadow
              : ""
          }
          onChange={(value) => patchStyles({ boxShadow: value })}
        />
      </div>
    </Section>
  )
}

function ItemTextSettings({
  item,
  dispatch,
}: {
  item: BuilderDocumentItem
  dispatch: React.Dispatch<StudioAction>
}) {
  const { styles, patchStyles } = useItemStyles(item, dispatch)
  const mark = useGestureHistory(dispatch)

  const fontSize = parsePx(styles.fontSize) ?? 16
  const weight = styles.fontWeight ?? ""
  const align = styles.textAlign ?? ""

  return (
    <Section title="Text">
      <div className="grid gap-2">
        <Field label="Content">
          <textarea
            value={item.overrides?.content ?? "Text"}
            onChange={(event) => {
              mark()
              dispatch({
                type: "update-item",
                id: item.id,
                patch: { overrides: { content: event.target.value } },
              })
            }}
            className="min-h-14 w-full resize-y rounded-md border bg-background px-2 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Field>
        <ColorField
          label="Color"
          value={styles.color}
          onChange={(value) => patchStyles({ color: value })}
        />
        <div className="grid grid-cols-2 gap-1.5">
          <NumberField
            label="Size"
            min={6}
            value={fontSize}
            onCommit={(size) => patchStyles({ fontSize: `${size}px` })}
          />
          <SelectField
            label="Weight"
            options={FONT_WEIGHT_OPTIONS}
            value={
              FONT_WEIGHT_OPTIONS.some((option) => option.value === weight)
                ? weight
                : ""
            }
            onChange={(value) => patchStyles({ fontWeight: value })}
          />
        </div>
        <SelectField
          label="Align"
          options={TEXT_ALIGN_OPTIONS}
          value={
            TEXT_ALIGN_OPTIONS.some((option) => option.value === align)
              ? align
              : ""
          }
          onChange={(value) => patchStyles({ textAlign: value })}
        />
      </div>
    </Section>
  )
}

/* ----------------------------- Item settings ----------------------------- */

function ItemSettings({
  item,
  dispatch,
  onCopyItemCode,
}: {
  item: BuilderDocumentItem
  dispatch: React.Dispatch<StudioAction>
  onCopyItemCode: (item: BuilderDocumentItem) => Promise<void>
}) {
  const [copied, setCopied] = React.useState(false)
  const [advancedOpen, setAdvancedOpen] = React.useState(false)
  const isPrimitive =
    item.registryType === "primitive:text" ||
    item.registryType === "primitive:box"
  const textOverrideCount = Object.keys(item.overrides?.text ?? {}).length
  const elementOverrideCount = Object.keys(item.overrides?.elements ?? {}).length

  function updateOverrides(
    overrides: NonNullable<BuilderDocumentItem["overrides"]>
  ) {
    dispatch({ type: "update-item", id: item.id, patch: { overrides } })
  }

  async function copyCode() {
    await onCopyItemCode(item)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      {!isPrimitive ? (
        <Section title="Component">
          <div className="rounded-md border bg-muted/40 px-2.5 py-2">
            <div className="truncate text-xs font-medium">{item.registryName}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">
              {item.registryType}
            </div>
          </div>
          <button
            type="button"
            className="mt-2 flex h-8 w-full items-center justify-center gap-2 rounded-md border text-xs font-medium transition-colors hover:bg-muted"
            onClick={copyCode}
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-green-500" /> Copied
              </>
            ) : (
              <>
                <FileCode className="size-3.5" /> Copy component code
              </>
            )}
          </button>
        </Section>
      ) : null}

      {!isPrimitive && item.registryType !== "asset:icon" ? (
        <Section title="Edits">
          {textOverrideCount > 0 || elementOverrideCount > 0 ? (
            <div className="flex items-center justify-between rounded-md border bg-muted/40 px-2.5 py-2">
              <span className="text-[11px] text-muted-foreground">
                {[
                  textOverrideCount > 0
                    ? `${textOverrideCount} text edit${textOverrideCount === 1 ? "" : "s"}`
                    : null,
                  elementOverrideCount > 0
                    ? `${elementOverrideCount} element edit${elementOverrideCount === 1 ? "" : "s"}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              <button
                type="button"
                className="text-[11px] font-medium text-destructive hover:underline"
                onClick={() =>
                  dispatch({
                    type: "update-item",
                    id: item.id,
                    patch: {
                      overrides: {
                        text: undefined,
                        textStyles: undefined,
                        elements: undefined,
                      },
                    },
                    history: true,
                  })
                }
              >
                Reset
              </button>
            </div>
          ) : (
            <p className="text-[10px] leading-4 text-muted-foreground">
              Double-click the block, then click any button, text, or image
              inside to move, resize, and restyle it.
            </p>
          )}
        </Section>
      ) : null}

      <Section title="">
        <button
          type="button"
          className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => setAdvancedOpen((open) => !open)}
        >
          Advanced
          <ChevronDown
            className={cn("size-3.5 transition-transform", advancedOpen && "rotate-180")}
          />
        </button>
        {advancedOpen ? (
          <div className="mt-2 grid gap-2.5">
            <Field label="Layer name">
              <input
                value={item.overrides?.label ?? ""}
                placeholder={item.title}
                onChange={(event) =>
                  updateOverrides({ label: event.target.value })
                }
                className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
            <Field label="Tailwind classes">
              <input
                value={item.overrides?.className ?? ""}
                placeholder="e.g. rounded-xl shadow-lg"
                onChange={(event) =>
                  updateOverrides({ className: event.target.value })
                }
                className="h-8 w-full rounded-md border bg-background px-2 font-mono text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
            <Field label="Notes (exported as comment)">
              <textarea
                value={item.overrides?.notes ?? ""}
                onChange={(event) =>
                  updateOverrides({ notes: event.target.value })
                }
                className="min-h-14 w-full resize-y rounded-md border bg-background px-2 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
          </div>
        ) : null}
      </Section>
    </>
  )
}

function AlignControls({ onAlign }: { onAlign: (kind: AlignKind) => void }) {
  const controls: { kind: AlignKind; label: string; icon: React.ReactNode }[] = [
    { kind: "left", label: "Align left", icon: <AlignStartVertical className="size-4" /> },
    { kind: "center-x", label: "Align horizontal centers", icon: <AlignCenterVertical className="size-4" /> },
    { kind: "right", label: "Align right", icon: <AlignEndVertical className="size-4" /> },
    { kind: "top", label: "Align top", icon: <AlignStartHorizontal className="size-4" /> },
    { kind: "center-y", label: "Align vertical centers", icon: <AlignCenterHorizontal className="size-4" /> },
    { kind: "bottom", label: "Align bottom", icon: <AlignEndHorizontal className="size-4" /> },
  ]

  return (
    <div className="grid grid-cols-6 gap-1">
      {controls.map((control) => (
        <IconAction
          key={control.kind}
          label={control.label}
          onClick={() => onAlign(control.kind)}
        >
          {control.icon}
        </IconAction>
      ))}
    </div>
  )
}

/* ------------------------------ Primitives ------------------------------ */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="px-3 py-3">
      {title ? (
        <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
      ) : null}
      {children}
    </section>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] font-medium text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

function IconAction({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="grid h-8 place-items-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function NumberField({
  label,
  value,
  min,
  max,
  suffix,
  className,
  onCommit,
}: {
  label: React.ReactNode
  value: number
  min?: number
  max?: number
  suffix?: string
  className?: string
  onCommit: (value: number) => void
}) {
  const [draft, setDraft] = React.useState(() => String(Math.round(value)))
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    if (!focused) setDraft(String(Math.round(value)))
  }, [value, focused])

  function clampValue(input: number) {
    let next = input

    if (min !== undefined) next = Math.max(next, min)
    if (max !== undefined) next = Math.min(next, max)

    return next
  }

  function commit() {
    const parsed = Number(draft)

    if (Number.isFinite(parsed)) {
      onCommit(clampValue(parsed))
    } else {
      setDraft(String(Math.round(value)))
    }
  }

  return (
    <label
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-md border bg-background px-2 focus-within:ring-2 focus-within:ring-ring",
        className
      )}
    >
      <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
        {label}
      </span>
      <input
        value={draft}
        inputMode="numeric"
        onChange={(event) => setDraft(event.target.value)}
        onFocus={(event) => {
          setFocused(true)
          event.target.select()
        }}
        onBlur={() => {
          setFocused(false)
          commit()
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit()
            event.currentTarget.blur()
          }

          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault()

            const delta =
              (event.key === "ArrowUp" ? 1 : -1) * (event.shiftKey ? 10 : 1)
            const parsed = Number(draft)
            const clamped = clampValue(
              (Number.isFinite(parsed) ? parsed : value) + delta
            )

            setDraft(String(clamped))
            onCommit(clamped)
          }
        }}
        className="w-full min-w-0 bg-transparent text-xs tabular-nums outline-none"
      />
      {suffix ? (
        <span className="shrink-0 text-[10px] text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </label>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value?: string
  onChange: (value: string | undefined) => void
}) {
  const [draft, setDraft] = React.useState(value ?? "")
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    if (!focused) setDraft(value ?? "")
  }, [value, focused])

  function commit() {
    const trimmed = draft.trim()

    onChange(trimmed === "" ? undefined : trimmed)
  }

  return (
    <label className="grid gap-1">
      <span className="text-[10px] font-medium text-muted-foreground">
        {label}
      </span>
      <div className="flex h-8 items-center gap-1.5 rounded-md border bg-background px-1.5 focus-within:ring-2 focus-within:ring-ring">
        <span
          className="relative size-5 shrink-0 overflow-hidden rounded-[4px] border"
          style={{ backgroundColor: value ?? "transparent" }}
        >
          <input
            type="color"
            aria-label={`${label} color picker`}
            value={toInputHex(value) ?? "#000000"}
            onChange={(event) => onChange(event.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </span>
        <input
          value={draft}
          placeholder="—"
          onChange={(event) => setDraft(event.target.value)}
          onFocus={(event) => {
            setFocused(true)
            event.target.select()
          }}
          onBlur={() => {
            setFocused(false)
            commit()
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commit()
              event.currentTarget.blur()
            }
          }}
          className="w-full min-w-0 bg-transparent font-mono text-[11px] outline-none"
        />
        {value ? (
          <button
            type="button"
            aria-label={`Clear ${label}`}
            className="grid size-5 shrink-0 place-items-center rounded text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => onChange(undefined)}
          >
            <X className="size-3" />
          </button>
        ) : null}
      </div>
    </label>
  )
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] font-medium text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border bg-muted px-1 py-px font-sans text-[10px] font-medium text-foreground">
      {children}
    </kbd>
  )
}

/* ------------------------------- Helpers ------------------------------- */

/** Push a single undo snapshot per burst of rapid edits. */
function useGestureHistory(dispatch: React.Dispatch<StudioAction>) {
  const lastRef = React.useRef(0)

  return React.useCallback(() => {
    const now = Date.now()

    if (now - lastRef.current > 600) dispatch({ type: "begin-gesture" })

    lastRef.current = now
  }, [dispatch])
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function parsePx(value?: string) {
  if (!value) return undefined

  const parsed = parseFloat(value)

  return Number.isFinite(parsed) ? parsed : undefined
}

function toInputHex(value?: string) {
  if (!value) return null
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value

  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
  }

  return null
}

function formatTypeLabel(type: string) {
  return type
    .replace("registry:", "")
    .replace("asset:", "")
    .replace("primitive:", "")
}
