"use client"

import * as React from "react"

import type {
  BuilderElementComputedStyles,
  BuilderPreviewChildMessage,
  BuilderPreviewParentMessage,
  BuilderSelectedElement,
} from "@/lib/builder/preview-protocol"
import type { BuilderElementOverride } from "@/lib/builder/types"

type Rect = { x: number; y: number; w: number; h: number }

type SnapGuides = {
  vertical: number[]
  horizontal: number[]
}

type HorizontalResizeSnap = {
  score: number
  dw: number
  guides: number[]
}

type VerticalResizeSnap = {
  score: number
  dh: number
  guides: number[]
}

type HandleId = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w"

const HANDLES: { id: HandleId; cursor: string }[] = [
  { id: "nw", cursor: "nwse-resize" },
  { id: "n", cursor: "ns-resize" },
  { id: "ne", cursor: "nesw-resize" },
  { id: "e", cursor: "ew-resize" },
  { id: "se", cursor: "nwse-resize" },
  { id: "s", cursor: "ns-resize" },
  { id: "sw", cursor: "nesw-resize" },
  { id: "w", cursor: "ew-resize" },
]

const EMPTY_SNAP_GUIDES: SnapGuides = { vertical: [], horizontal: [] }

type DragState =
  | {
      kind: "move"
      startX: number
      startY: number
      baseDx: number
      baseDy: number
      startRect: Rect
      moved: boolean
    }
  | {
      kind: "resize"
      handle: HandleId
      startX: number
      startY: number
      baseDx: number
      baseDy: number
      startW: number
      startH: number
      startRect: Rect
      moved: boolean
    }

export function BuilderPreviewSurface({
  interactive = false,
  shapeId,
  previewTheme,
  children,
}: {
  interactive?: boolean
  shapeId: string
  previewTheme: "light" | "dark"
  children: React.ReactNode
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const textOverridesRef = React.useRef<Record<string, string>>({})
  const textStylesRef = React.useRef<Record<string, { fontSize?: number }>>({})
  const elementOverridesRef = React.useRef<Record<string, BuilderElementOverride>>(
    {}
  )
  const touchedElementsRef = React.useRef(new Set<string>())
  const dragRef = React.useRef<DragState | null>(null)
  const selectedIdRef = React.useRef<string | null>(null)

  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [selectedRect, setSelectedRect] = React.useState<Rect | null>(null)
  const [selectedTag, setSelectedTag] = React.useState("")
  const [snapGuides, setSnapGuides] = React.useState<SnapGuides>({
    vertical: [],
    horizontal: [],
  })
  const [textEditingId, setTextEditingId] = React.useState<string | null>(null)

  selectedIdRef.current = selectedId

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", previewTheme === "dark")
    document.documentElement.style.colorScheme = previewTheme
  }, [previewTheme])

  /* ------------------------------ Messaging ------------------------------ */

  const post = React.useCallback((message: BuilderPreviewChildMessage) => {
    window.parent.postMessage(message, window.location.origin)
  }, [])

  const postTextOverrides = React.useCallback(() => {
    post({
      type: "builder-preview:text-overrides",
      shapeId,
      textOverrides: textOverridesRef.current,
      textStyles: textStylesRef.current,
    })
  }, [post, shapeId])

  const postElementOverrides = React.useCallback(() => {
    post({
      type: "builder-preview:element-overrides",
      shapeId,
      elementOverrides: elementOverridesRef.current,
    })
  }, [post, shapeId])

  const postSelection = React.useCallback(
    (element: HTMLElement | null) => {
      post({
        type: "builder-preview:element-selected",
        shapeId,
        element: element ? describeElement(element, elementOverridesRef.current) : null,
      })
    },
    [post, shapeId]
  )

  /* ------------------------------ Selection ------------------------------ */

  const getSelectedElement = React.useCallback(() => {
    const root = rootRef.current
    const id = selectedIdRef.current

    if (!root || !id) return null

    return root.querySelector<HTMLElement>(
      `[data-builder-el="${CSS.escape(id)}"]`
    )
  }, [])

  const refreshOverlay = React.useCallback(() => {
    const element = getSelectedElement()

    if (!element) {
      setSelectedRect(null)
      return
    }

    const rect = element.getBoundingClientRect()

    setSelectedRect({ x: rect.left, y: rect.top, w: rect.width, h: rect.height })
  }, [getSelectedElement])

  const selectElement = React.useCallback(
    (element: HTMLElement | null, notify = true) => {
      const id = element?.dataset.builderEl ?? null

      setSelectedId(id)
      selectedIdRef.current = id
      setSelectedTag(element ? element.tagName.toLowerCase() : "")

      if (element) {
        const rect = element.getBoundingClientRect()

        setSelectedRect({
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height,
        })
      } else {
        setSelectedRect(null)
      }

      if (notify) postSelection(element)
    },
    [postSelection]
  )

  /* -------------------------- Override application ------------------------ */

  const applyTextOverrides = React.useCallback(() => {
    const root = rootRef.current

    if (!root) return

    const spans = root.querySelectorAll<HTMLElement>("[data-builder-text-id]")

    spans.forEach((span) => {
      const id = span.dataset.builderTextId
      const original = span.dataset.builderOriginalText

      if (!id || original === undefined) return

      const nextText = textOverridesRef.current[id] ?? original

      if (span.textContent !== nextText) span.textContent = nextText

      const fontSize = textStylesRef.current[id]?.fontSize

      span.style.fontSize = fontSize ? `${fontSize}px` : ""
    })
  }, [])

  const applyElementOverrides = React.useCallback(() => {
    const root = rootRef.current

    if (!root) return

    const map = elementOverridesRef.current

    // Restore elements whose override was removed.
    for (const id of [...touchedElementsRef.current]) {
      if (map[id]) continue

      const element = root.querySelector<HTMLElement>(
        `[data-builder-el="${CSS.escape(id)}"]`
      )

      if (element) {
        restoreOriginalStyle(element)
        delete element.dataset.builderLinkPageId
      }

      touchedElementsRef.current.delete(id)
    }

    for (const [id, override] of Object.entries(map)) {
      const element = root.querySelector<HTMLElement>(
        `[data-builder-el="${CSS.escape(id)}"]`
      )

      if (!element) continue

      if (!("builderOrigStyle" in element.dataset)) {
        element.dataset.builderOrigStyle = element.getAttribute("style") ?? ""
      }

      restoreOriginalStyle(element)
      applyOverrideToElement(element, override)
      touchedElementsRef.current.add(id)
    }

    refreshOverlay()

    const selected = getSelectedElement()

    if (selected) postSelection(selected)
  }, [getSelectedElement, postSelection, refreshOverlay])

  /* ------------------------------ Text editing --------------------------- */

  const startTextEdit = React.useCallback((span: HTMLElement) => {
    span.contentEditable = "true"
    span.focus()

    const selection = window.getSelection()

    if (selection) {
      const range = document.createRange()

      range.selectNodeContents(span)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    setTextEditingId(span.dataset.builderTextId ?? null)
  }, [])

  /* ------------------------------- Hit testing --------------------------- */

  const elementAtPoint = React.useCallback((x: number, y: number) => {
    const overlay = overlayRef.current
    const previous = overlay?.style.display ?? ""

    if (overlay) overlay.style.display = "none"

    const element = document.elementFromPoint(x, y) as HTMLElement | null

    if (overlay) overlay.style.display = previous

    return element
  }, [])

  const pickAtPoint = React.useCallback(
    (x: number, y: number) => {
      const root = rootRef.current
      const hit = elementAtPoint(x, y)

      if (!root || !hit || !root.contains(hit)) return null

      return pickSelectable(hit, root)
    },
    [elementAtPoint]
  )

  /* ----------------------------- Mount effects --------------------------- */

  React.useEffect(() => {
    const root = rootRef.current

    if (!root) return

    prepareEditableText(root)
    prepareElements(root)
    applyTextOverrides()
    applyElementOverrides()

    function handleInput(event: Event) {
      const target = getTextTarget(event.target)

      if (!target) return

      updateTextOverride(target, textOverridesRef.current)
      postTextOverrides()
    }

    function handleFocusOut(event: FocusEvent) {
      const target = getTextTarget(event.target)

      if (!target) return

      target.contentEditable = "false"
      setTextEditingId(null)
      updateTextOverride(target, textOverridesRef.current)
      postTextOverrides()
    }

    function handleKeyDown(event: KeyboardEvent) {
      const target = getTextTarget(event.target)

      if (target && event.key === "Enter") {
        event.preventDefault()
        target.blur()
      }
    }

    root.addEventListener("input", handleInput)
    root.addEventListener("focusout", handleFocusOut)
    root.addEventListener("keydown", handleKeyDown)

    return () => {
      root.removeEventListener("input", handleInput)
      root.removeEventListener("focusout", handleFocusOut)
      root.removeEventListener("keydown", handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Suppress the block's own interactivity (links navigating, demo buttons…)
  // and turn clicks into element selection instead.
  React.useEffect(() => {
    if (interactive) return

    function handleClickCapture(event: MouseEvent) {
      const root = rootRef.current
      const overlay = overlayRef.current
      const target = event.target as HTMLElement | null

      if (!root || !target) return
      if (overlay?.contains(target)) return

      // Allow interaction with actively edited text.
      if (getTextTarget(target)?.isContentEditable) return

      event.preventDefault()
      event.stopPropagation()

      if (!root.contains(target)) {
        selectElement(null)
        return
      }

      selectElement(pickSelectable(target, root))
    }

    function handleDoubleClickCapture(event: MouseEvent) {
      const root = rootRef.current
      const overlay = overlayRef.current
      const target = event.target as HTMLElement | null

      if (!root || !target || overlay?.contains(target)) return
      if (getTextTarget(target)?.isContentEditable) return

      event.preventDefault()
      event.stopPropagation()

      const span = getTextTarget(target)

      if (span && root.contains(span)) startTextEdit(span)
    }

    document.addEventListener("click", handleClickCapture, true)
    document.addEventListener("dblclick", handleDoubleClickCapture, true)

    return () => {
      document.removeEventListener("click", handleClickCapture, true)
      document.removeEventListener("dblclick", handleDoubleClickCapture, true)
    }
  }, [interactive, selectElement, startTextEdit])

  // Messages from the studio.
  React.useEffect(() => {
    function handleMessage(event: MessageEvent<BuilderPreviewParentMessage>) {
      if (event.origin !== window.location.origin) return

      const data = event.data

      if (!data || data.shapeId !== shapeId) return

      if (data.type === "builder-preview:apply-overrides") {
        textOverridesRef.current = data.textOverrides ?? {}
        textStylesRef.current = data.textStyles ?? {}
        elementOverridesRef.current = data.elementOverrides ?? {}
        applyTextOverrides()
        applyElementOverrides()
      }

      if (data.type === "builder-preview:set-editing" && !data.editing) {
        selectElement(null, false)
        setTextEditingId(null)
      }
    }

    window.addEventListener("message", handleMessage)
    post({ type: "builder-preview:ready", shapeId })

    return () => window.removeEventListener("message", handleMessage)
  }, [applyElementOverrides, applyTextOverrides, post, selectElement, shapeId])

  // Escape steps out: text edit → element selection → studio exit.
  const hideSelectedElement = React.useCallback(() => {
    const id = selectedIdRef.current

    if (!id) return

    const next = {
      ...(elementOverridesRef.current[id] ?? {}),
      hidden: true,
    }

    elementOverridesRef.current = {
      ...elementOverridesRef.current,
      [id]: next,
    }

    const element = getSelectedElement()

    if (element) {
      restoreOriginalStyle(element)
      applyOverrideToElement(element, next)
      touchedElementsRef.current.add(id)
    }

    postElementOverrides()
    selectElement(null)
  }, [getSelectedElement, postElementOverrides, selectElement])

  React.useEffect(() => {
    if (interactive) return

    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selectedIdRef.current &&
        !textEditingId
      ) {
        event.preventDefault()
        hideSelectedElement()
        return
      }

      if (event.key !== "Escape") return

      if (textEditingId) {
        const active = document.activeElement as HTMLElement | null

        active?.blur()
        setTextEditingId(null)
        return
      }

      if (selectedIdRef.current) {
        selectElement(null)
        return
      }

      post({ type: "builder-preview:request-exit", shapeId })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [hideSelectedElement, interactive, post, selectElement, shapeId, textEditingId])

  // Keep the overlay glued to the element on scroll/resize.
  React.useEffect(() => {
    if (!selectedId) return

    window.addEventListener("scroll", refreshOverlay, true)
    window.addEventListener("resize", refreshOverlay)

    return () => {
      window.removeEventListener("scroll", refreshOverlay, true)
      window.removeEventListener("resize", refreshOverlay)
    }
  }, [refreshOverlay, selectedId])

  /* ------------------------------ Drag logic ----------------------------- */

  const commitDrag = React.useCallback(() => {
    const element = getSelectedElement()

    dragRef.current = null
    setSnapGuides(EMPTY_SNAP_GUIDES)

    if (!element) return

    postElementOverrides()
    refreshOverlay()
    postSelection(element)
  }, [getSelectedElement, postElementOverrides, postSelection, refreshOverlay])

  function startOverlayDrag(event: React.PointerEvent, handle: HandleId | null) {
    const element = getSelectedElement()
    const id = selectedIdRef.current

    if (!element || !id) return

    event.preventDefault()
    event.stopPropagation()
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)

    const override = elementOverridesRef.current[id] ?? {}
    const rect = element.getBoundingClientRect()

    if (!("builderOrigStyle" in element.dataset)) {
      element.dataset.builderOrigStyle = element.getAttribute("style") ?? ""
    }

    dragRef.current = handle
      ? {
          kind: "resize",
          handle,
          startX: event.clientX,
          startY: event.clientY,
          baseDx: override.dx ?? 0,
          baseDy: override.dy ?? 0,
          startW: override.w ?? rect.width,
          startH: override.h ?? rect.height,
          startRect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
          moved: false,
        }
      : {
          kind: "move",
          startX: event.clientX,
          startY: event.clientY,
          baseDx: override.dx ?? 0,
          baseDy: override.dy ?? 0,
          startRect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
          moved: false,
        }
  }

  function onOverlayPointerMove(event: React.PointerEvent) {
    const drag = dragRef.current
    const element = getSelectedElement()
    const id = selectedIdRef.current

    if (!drag || !element || !id) return

    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY

    if (!drag.moved && Math.hypot(dx, dy) < 3) return

    drag.moved = true

    const previous = elementOverridesRef.current[id] ?? {}
    let next: BuilderElementOverride

    if (drag.kind === "move") {
      const snap = event.metaKey
        ? { dx: 0, dy: 0, guides: EMPTY_SNAP_GUIDES }
        : computePreviewSnap(
            {
              x: drag.startRect.x + dx,
              y: drag.startRect.y + dy,
              w: drag.startRect.w,
              h: drag.startRect.h,
            },
            getPreviewSnapTargets(rootRef.current, element),
            6
          )

      setSnapGuides(snap.guides)
      next = {
        ...previous,
        dx: drag.baseDx + dx + snap.dx,
        dy: drag.baseDy + dy + snap.dy,
      }
    } else {
      const dirX = drag.handle.includes("e") ? 1 : drag.handle.includes("w") ? -1 : 0
      const dirY = drag.handle.includes("s") ? 1 : drag.handle.includes("n") ? -1 : 0
      const rawW = Math.max(8, drag.startW + dx * dirX)
      const rawH = Math.max(8, drag.startH + dy * dirY)
      const proposed = {
        x: drag.startRect.x + (dirX < 0 ? drag.startW - rawW : 0),
        y: drag.startRect.y + (dirY < 0 ? drag.startH - rawH : 0),
        w: rawW,
        h: rawH,
      }
      const snap = event.metaKey
        ? { rect: proposed, guides: EMPTY_SNAP_GUIDES }
        : computePreviewResizeSnap(
            proposed,
            getPreviewSnapTargets(rootRef.current, element),
            6,
            dirX,
            dirY
          )
      const { w, h } = snap.rect

      setSnapGuides(snap.guides)

      next = {
        ...previous,
        w: dirX === 0 ? previous.w : w,
        h: dirY === 0 ? previous.h : h,
        dx: drag.handle.includes("w") ? drag.baseDx + (drag.startW - w) : previous.dx,
        dy: drag.handle.includes("n") ? drag.baseDy + (drag.startH - h) : previous.dy,
      }
    }

    elementOverridesRef.current = { ...elementOverridesRef.current, [id]: next }
    restoreOriginalStyle(element)
    applyOverrideToElement(element, next)
    touchedElementsRef.current.add(id)
    refreshOverlay()
  }

  function onOverlayPointerUp(event: React.PointerEvent) {
    const drag = dragRef.current

    if (!drag) return

    if (!drag.moved && drag.kind === "move") {
      // Plain click on the overlay: re-pick beneath the cursor (select
      // siblings/children without leaving edit mode).
      dragRef.current = null
      setSnapGuides(EMPTY_SNAP_GUIDES)

      const next = pickAtPoint(event.clientX, event.clientY)

      selectElement(next)
      return
    }

    commitDrag()
  }

  function onOverlayDoubleClick(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    const hit = elementAtPoint(event.clientX, event.clientY)
    const span = hit ? getTextTarget(hit) : null

    if (span && rootRef.current?.contains(span)) {
      selectElement(null, false)
      startTextEdit(span)
      return
    }

    const next = pickAtPoint(event.clientX, event.clientY)

    if (next) selectElement(next)
  }

  /* ------------------------------ Font size UI --------------------------- */

  function changeTextFontSize(delta: number) {
    const root = rootRef.current

    if (!root || !textEditingId) return

    const target = root.querySelector<HTMLElement>(
      `[data-builder-text-id="${CSS.escape(textEditingId)}"]`
    )

    if (!target) return

    const current =
      textStylesRef.current[textEditingId]?.fontSize ??
      Number.parseFloat(window.getComputedStyle(target).fontSize) ??
      16
    const next = Math.max(8, Math.min(96, Math.round(current + delta)))

    textStylesRef.current = {
      ...textStylesRef.current,
      [textEditingId]: { fontSize: next },
    }
    target.style.fontSize = `${next}px`
    postTextOverrides()
  }

  function resetTextFontSize() {
    const root = rootRef.current

    if (!root || !textEditingId) return

    const nextStyles = { ...textStylesRef.current }

    delete nextStyles[textEditingId]
    textStylesRef.current = nextStyles

    const target = root.querySelector<HTMLElement>(
      `[data-builder-text-id="${CSS.escape(textEditingId)}"]`
    )

    if (target) target.style.fontSize = ""

    postTextOverrides()
  }

  /* -------------------------------- Render ------------------------------- */

  return (
    <>
      <div ref={rootRef}>{children}</div>

      {selectedRect && !textEditingId && !interactive ? (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[2147483640]"
          style={{ pointerEvents: "none" }}
        >
          {snapGuides.vertical.map((x) => (
            <div
              key={`v-${x}`}
              className="absolute inset-y-0 w-px bg-red-500"
              style={{ left: x }}
            />
          ))}
          {snapGuides.horizontal.map((y) => (
            <div
              key={`h-${y}`}
              className="absolute inset-x-0 h-px bg-red-500"
              style={{ top: y }}
            />
          ))}

          <div
            className="absolute border-2 border-blue-500"
            style={{
              left: selectedRect.x,
              top: selectedRect.y,
              width: selectedRect.w,
              height: selectedRect.h,
              pointerEvents: "auto",
              cursor: "move",
              touchAction: "none",
            }}
            onPointerDown={(event) => startOverlayDrag(event, null)}
            onPointerMove={onOverlayPointerMove}
            onPointerUp={onOverlayPointerUp}
            onDoubleClick={onOverlayDoubleClick}
          >
            <span className="absolute -top-6 left-0 rounded-sm bg-blue-500 px-1.5 py-0.5 font-sans text-[10px] font-medium lowercase text-white">
              {selectedTag} · {Math.round(selectedRect.w)}×
              {Math.round(selectedRect.h)}
            </span>
            {HANDLES.map((handle) => (
              <div
                key={handle.id}
                className="absolute size-2 rounded-[2px] border border-blue-500 bg-white"
                style={{
                  ...handlePosition(handle.id),
                  cursor: handle.cursor,
                  pointerEvents: "auto",
                  touchAction: "none",
                }}
                onPointerDown={(event) => startOverlayDrag(event, handle.id)}
                onPointerMove={onOverlayPointerMove}
                onPointerUp={onOverlayPointerUp}
              />
            ))}
          </div>
        </div>
      ) : null}

      {textEditingId && !interactive ? (
        <div className="fixed right-3 top-3 z-[2147483647] flex items-center gap-1 rounded-md border bg-background/95 p-1 text-foreground shadow-lg backdrop-blur">
          <button
            type="button"
            className="h-7 rounded px-2 text-xs font-semibold hover:bg-muted"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => changeTextFontSize(-2)}
          >
            A-
          </button>
          <button
            type="button"
            className="h-7 rounded px-2 text-xs font-semibold hover:bg-muted"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => changeTextFontSize(2)}
          >
            A+
          </button>
          <button
            type="button"
            className="h-7 rounded px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            onMouseDown={(event) => event.preventDefault()}
            onClick={resetTextFontSize}
          >
            Reset
          </button>
        </div>
      ) : null}
    </>
  )
}

/* --------------------------------- Helpers -------------------------------- */

function handlePosition(handle: HandleId): React.CSSProperties {
  const offset = -5

  switch (handle) {
    case "nw":
      return { left: offset, top: offset }
    case "n":
      return { left: "calc(50% - 4px)", top: offset }
    case "ne":
      return { right: offset, top: offset }
    case "e":
      return { right: offset, top: "calc(50% - 4px)" }
    case "se":
      return { right: offset, bottom: offset }
    case "s":
      return { left: "calc(50% - 4px)", bottom: offset }
    case "sw":
      return { left: offset, bottom: offset }
    case "w":
      return { left: offset, top: "calc(50% - 4px)" }
  }
}

function getPreviewSnapTargets(root: HTMLElement | null, moving: HTMLElement) {
  if (!root) return []

  const targets: Rect[] = []
  const rootRect = root.getBoundingClientRect()

  if (rootRect.width > 0 && rootRect.height > 0) {
    targets.push({
      x: rootRect.left,
      y: rootRect.top,
      w: rootRect.width,
      h: rootRect.height,
    })
  }

  root.querySelectorAll<HTMLElement>("[data-builder-el]").forEach((element) => {
    if (element === moving || moving.contains(element)) return

    const rect = element.getBoundingClientRect()

    if (rect.width < 2 || rect.height < 2) return

    targets.push({
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height,
    })
  })

  return targets
}

function computePreviewSnap(
  moving: Rect,
  targets: Rect[],
  threshold: number
) {
  const movingXs = [moving.x, moving.x + moving.w / 2, moving.x + moving.w]
  const movingYs = [moving.y, moving.y + moving.h / 2, moving.y + moving.h]

  let bestDx: number | null = null
  let bestDy: number | null = null
  let snapX: number | null = null
  let snapY: number | null = null

  for (const targetRect of targets) {
    const targetXs = [
      targetRect.x,
      targetRect.x + targetRect.w / 2,
      targetRect.x + targetRect.w,
    ]
    const targetYs = [
      targetRect.y,
      targetRect.y + targetRect.h / 2,
      targetRect.y + targetRect.h,
    ]

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

function computePreviewResizeSnap(
  proposed: Rect,
  targets: Rect[],
  threshold: number,
  dirX: -1 | 0 | 1,
  dirY: -1 | 0 | 1
) {
  let rect = { ...proposed }
  const guides: SnapGuides = { vertical: [], horizontal: [] }

  if (dirX !== 0) {
    const snap = findHorizontalResizeSnap(proposed, targets, threshold, dirX)

    if (snap) {
      rect.w = Math.max(8, proposed.w + snap.dw)
      if (dirX < 0) rect.x = proposed.x - snap.dw
      guides.vertical = snap.guides
    }
  }

  if (dirY !== 0) {
    const snap = findVerticalResizeSnap(proposed, targets, threshold, dirY)

    if (snap) {
      rect.h = Math.max(8, proposed.h + snap.dh)
      if (dirY < 0) rect.y = proposed.y - snap.dh
      guides.horizontal = snap.guides
    }
  }

  return { rect, guides }
}

function findHorizontalResizeSnap(
  proposed: Rect,
  targets: Rect[],
  threshold: number,
  dirX: -1 | 1
): HorizontalResizeSnap | null {
  let best: HorizontalResizeSnap | null = null
  const draggedEdge = dirX > 0 ? proposed.x + proposed.w : proposed.x

  function consider(score: number, dw: number, guides: number[]) {
    if (proposed.w + dw < 8) return
    if (best && score >= best.score) return
    best = { score, dw, guides }
  }

  for (const target of targets) {
    for (const targetX of [target.x, target.x + target.w / 2, target.x + target.w]) {
      const edgeDelta = targetX - draggedEdge

      if (Math.abs(edgeDelta) <= threshold) {
        consider(Math.abs(edgeDelta), edgeDelta * dirX, [targetX])
      }
    }

    const widthDelta = target.w - proposed.w

    if (Math.abs(widthDelta) <= threshold) {
      consider(Math.abs(widthDelta), widthDelta, [target.x, target.x + target.w])
    }
  }

  return best
}

function findVerticalResizeSnap(
  proposed: Rect,
  targets: Rect[],
  threshold: number,
  dirY: -1 | 1
): VerticalResizeSnap | null {
  let best: VerticalResizeSnap | null = null
  const draggedEdge = dirY > 0 ? proposed.y + proposed.h : proposed.y

  function consider(score: number, dh: number, guides: number[]) {
    if (proposed.h + dh < 8) return
    if (best && score >= best.score) return
    best = { score, dh, guides }
  }

  for (const target of targets) {
    for (const targetY of [target.y, target.y + target.h / 2, target.y + target.h]) {
      const edgeDelta = targetY - draggedEdge

      if (Math.abs(edgeDelta) <= threshold) {
        consider(Math.abs(edgeDelta), edgeDelta * dirY, [targetY])
      }
    }

    const heightDelta = target.h - proposed.h

    if (Math.abs(heightDelta) <= threshold) {
      consider(Math.abs(heightDelta), heightDelta, [target.y, target.y + target.h])
    }
  }

  return best
}

function pickSelectable(start: HTMLElement, root: HTMLElement) {
  // Prefer meaningful interactive elements over their inner spans.
  const interactive = start.closest<HTMLElement>(
    "button, a, input, select, textarea, img, svg, [role='button']"
  )
  let candidate: HTMLElement | null =
    interactive && root.contains(interactive) && interactive !== root
      ? interactive
      : start

  while (candidate && candidate !== root && !candidate.dataset?.builderEl) {
    candidate = candidate.parentElement
  }

  return candidate && candidate !== root ? candidate : null
}

function describeElement(
  element: HTMLElement,
  overrides: Record<string, BuilderElementOverride>
): BuilderSelectedElement {
  const id = element.dataset.builderEl ?? ""
  const rect = element.getBoundingClientRect()

  return {
    elementId: id,
    tag: element.tagName.toLowerCase(),
    rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
    computed: readComputedStyles(element),
    override: overrides[id],
  }
}

function readComputedStyles(element: HTMLElement): BuilderElementComputedStyles {
  const computed = window.getComputedStyle(element)

  return {
    color: toHexColor(computed.color),
    backgroundColor: toHexColor(computed.backgroundColor),
    fontSize: Number.parseFloat(computed.fontSize) || undefined,
    fontWeight: computed.fontWeight,
    borderRadius: Number.parseFloat(computed.borderRadius) || 0,
    opacity: Number.parseFloat(computed.opacity),
  }
}

let colorProbe: CanvasRenderingContext2D | null | undefined

function toHexColor(value: string) {
  if (!value || value === "transparent") return undefined

  if (colorProbe === undefined) {
    colorProbe = document.createElement("canvas").getContext("2d")
  }

  if (!colorProbe) return undefined

  colorProbe.fillStyle = "#000000"
  colorProbe.fillStyle = value

  const normalized = colorProbe.fillStyle

  if (typeof normalized === "string" && normalized.startsWith("#")) {
    return normalized
  }

  // rgba(...) → fully transparent returns undefined, otherwise drop alpha.
  const match = String(normalized).match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\)/
  )

  if (!match) return undefined

  const alpha = match[4] === undefined ? 1 : Number.parseFloat(match[4])

  if (alpha === 0) return undefined

  const toHex = (part: string) =>
    Math.round(Number.parseFloat(part)).toString(16).padStart(2, "0")

  return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`
}

function applyOverrideToElement(
  element: HTMLElement,
  override: BuilderElementOverride
) {
  const style = element.style

  if (override.hidden) {
    style.display = "none"
    delete element.dataset.builderLinkPageId
    return
  }

  if (override.dx || override.dy) {
    style.transform = `translate(${override.dx ?? 0}px, ${override.dy ?? 0}px)`
  }

  if (override.w !== undefined) style.width = `${override.w}px`
  if (override.h !== undefined) style.height = `${override.h}px`

  if (override.link?.kind === "frame") {
    element.dataset.builderLinkPageId = override.link.pageId
  } else {
    delete element.dataset.builderLinkPageId
  }

  for (const [key, value] of Object.entries(override.styles ?? {})) {
    // Keys are camelCase CSS properties.
    ;(style as unknown as Record<string, string>)[key] = value
  }
}

function restoreOriginalStyle(element: HTMLElement) {
  const original = element.dataset.builderOrigStyle

  if (original === undefined) return

  if (original) {
    element.setAttribute("style", original)
  } else {
    element.removeAttribute("style")
  }
}

function prepareElements(root: HTMLElement) {
  if (root.dataset.builderElPrepared === "true") return

  root.dataset.builderElPrepared = "true"

  let index = 0

  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    // Tag svg roots but not their internals.
    if (element.closest("svg") && element.tagName.toLowerCase() !== "svg") return

    element.dataset.builderEl = String(index++)
  })
}

function prepareEditableText(root: HTMLElement) {
  if (root.dataset.builderTextPrepared === "true") return

  root.dataset.builderTextPrepared = "true"

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent
      const parent = node.parentElement

      if (!text?.trim() || !parent) return NodeFilter.FILTER_REJECT
      if (parent.closest("[data-builder-text-id]")) return NodeFilter.FILTER_REJECT
      if (parent.closest("script, style, svg, textarea, input, select")) {
        return NodeFilter.FILTER_REJECT
      }

      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes: Text[] = []
  let current = walker.nextNode()

  while (current) {
    textNodes.push(current as Text)
    current = walker.nextNode()
  }

  textNodes.forEach((node, index) => {
    const span = document.createElement("span")

    span.dataset.builderTextId = String(index)
    span.dataset.builderOriginalText = node.textContent ?? ""
    span.spellcheck = false
    span.className = "rounded-sm outline-none focus:ring-2 focus:ring-blue-500"
    span.textContent = node.textContent

    node.replaceWith(span)
  })
}

function getTextTarget(target: EventTarget | null) {
  return target instanceof HTMLElement
    ? target.closest<HTMLElement>("[data-builder-text-id]")
    : null
}

function updateTextOverride(
  target: HTMLElement,
  overrides: Record<string, string>
) {
  const id = target.dataset.builderTextId
  const original = target.dataset.builderOriginalText

  if (!id || original === undefined) return

  const value = target.textContent ?? ""

  if (value === original) {
    delete overrides[id]
  } else {
    overrides[id] = value
  }
}
