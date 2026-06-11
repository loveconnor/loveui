"use client"

import * as React from "react"
import {
  Frame,
  Grid2x2,
  Hand,
  Lock,
  Minus,
  MousePointer2,
  Plus,
  Square,
  Type,
} from "love-ui/icons"

import { cn } from "@/lib/cn"
import type { BuilderPreviewParentMessage } from "@/lib/builder/preview-protocol"
import type {
  BuilderCatalogItem,
  BuilderDocumentItem,
  BuilderDocumentPage,
} from "@/lib/builder/types"
import {
  boundsIntersect,
  computeSnap,
  createId,
  getNodeBounds,
  getSelectionBounds,
  unionBounds,
  type Bounds,
  type Camera,
  type CanvasTool,
  type SnapGuides,
  type StudioAction,
  type StudioState,
} from "./builder-store"

const MIN_ZOOM = 0.04
const MAX_ZOOM = 4
const GRID_SIZE = 24
const DRAG_THRESHOLD = 3

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

type Interaction =
  | { kind: "pan"; startClient: { x: number; y: number }; startCamera: Camera }
  | {
      kind: "move"
      ids: string[]
      startBounds: Map<string, Bounds>
      startWorld: { x: number; y: number }
      began: boolean
      clickCandidate: string | null
      editOnClick: boolean
    }
  | {
      kind: "resize"
      handle: HandleId
      ids: string[]
      startBounds: Map<string, Bounds>
      groupStart: Bounds
      began: boolean
    }
  | {
      kind: "marquee"
      startWorld: { x: number; y: number }
      additive: boolean
      baseSelection: string[]
    }
  | {
      kind: "draw"
      tool: "frame" | "text" | "box"
      startWorld: { x: number; y: number }
    }

export type BuilderCanvasProps = {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  camera: Camera
  previewTheme: "light" | "dark"
  onCameraChange: (camera: Camera) => void
  onDropCatalogItem: (item: BuilderCatalogItem, point: { x: number; y: number }) => void
  /** Refit the viewport when this changes (e.g. project switch). */
  fitKey: string
}

export type BuilderCanvasHandle = {
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoom: number) => void
  zoomToFit: () => void
  getCenterWorld: () => { x: number; y: number }
}

export const BuilderCanvas = React.forwardRef<BuilderCanvasHandle, BuilderCanvasProps>(
  function BuilderCanvas(
    { state, dispatch, camera, previewTheme, onCameraChange, onDropCatalogItem, fitKey },
    ref
  ) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const interactionRef = React.useRef<Interaction | null>(null)
    const [spacePressed, setSpacePressed] = React.useState(false)
    const [isPanning, setIsPanning] = React.useState(false)
    const [hoverId, setHoverId] = React.useState<string | null>(null)
    const [marquee, setMarquee] = React.useState<Bounds | null>(null)
    const [frameDraft, setFrameDraft] = React.useState<Bounds | null>(null)
    const [guides, setGuides] = React.useState<SnapGuides>({
      vertical: [],
      horizontal: [],
    })

    const stateRef = React.useRef(state)
    stateRef.current = state
    const cameraRef = React.useRef(camera)
    cameraRef.current = camera

    const screenToWorld = React.useCallback((clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect()
      const cam = cameraRef.current

      if (!rect) return { x: 0, y: 0 }

      return {
        x: (clientX - rect.left - cam.x) / cam.z,
        y: (clientY - rect.top - cam.y) / cam.z,
      }
    }, [])

    const zoomAt = React.useCallback(
      (clientX: number, clientY: number, nextZoom: number) => {
        const rect = containerRef.current?.getBoundingClientRect()
        const cam = cameraRef.current

        if (!rect) return

        const z = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)
        const px = clientX - rect.left
        const py = clientY - rect.top

        onCameraChange({
          x: px - ((px - cam.x) / cam.z) * z,
          y: py - ((py - cam.y) / cam.z) * z,
          z,
        })
      },
      [onCameraChange]
    )

    const zoomAtCenter = React.useCallback(
      (factor: number) => {
        const rect = containerRef.current?.getBoundingClientRect()

        if (!rect) return

        zoomAt(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          cameraRef.current.z * factor
        )
      },
      [zoomAt]
    )

    const zoomToFit = React.useCallback(() => {
      const rect = containerRef.current?.getBoundingClientRect()

      if (!rect) return

      const current = stateRef.current
      const bounds = unionBounds([
        ...current.pages.map((page) => ({
          x: page.x,
          y: page.y,
          w: page.w,
          h: page.h,
        })),
        ...current.items.map((item) => ({
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        })),
      ])

      if (!bounds) {
        onCameraChange({ x: rect.width / 2, y: rect.height / 2, z: 1 })
        return
      }

      const padding = 80
      const z = clamp(
        Math.min(
          (rect.width - padding * 2) / bounds.w,
          (rect.height - padding * 2) / bounds.h
        ),
        MIN_ZOOM,
        1.5
      )

      onCameraChange({
        x: rect.width / 2 - (bounds.x + bounds.w / 2) * z,
        y: rect.height / 2 - (bounds.y + bounds.h / 2) * z,
        z,
      })
    }, [onCameraChange])

    React.useImperativeHandle(
      ref,
      () => ({
        zoomIn: () => zoomAtCenter(1.25),
        zoomOut: () => zoomAtCenter(0.8),
        zoomTo: (zoom: number) => {
          const rect = containerRef.current?.getBoundingClientRect()

          if (!rect) return

          zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, zoom)
        },
        zoomToFit,
        getCenterWorld: () => {
          const rect = containerRef.current?.getBoundingClientRect()

          if (!rect) return { x: 0, y: 0 }

          return screenToWorld(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          )
        },
      }),
      [zoomAt, zoomAtCenter, zoomToFit, screenToWorld]
    )

    // Fit the view whenever the project changes.
    React.useEffect(() => {
      zoomToFit()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fitKey])

    // Space bar pan + non-passive wheel handling.
    React.useEffect(() => {
      const element = containerRef.current

      if (!element) return

      function handleWheel(event: WheelEvent) {
        event.preventDefault()

        const cam = cameraRef.current

        if (event.ctrlKey || event.metaKey) {
          zoomAt(
            event.clientX,
            event.clientY,
            cam.z * Math.exp(-event.deltaY * 0.01)
          )
        } else {
          onCameraChange({
            x: cam.x - event.deltaX,
            y: cam.y - event.deltaY,
            z: cam.z,
          })
        }
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (event.code !== "Space" || isEditableTarget(event.target)) return

        event.preventDefault()
        setSpacePressed(true)
      }

      function handleKeyUp(event: KeyboardEvent) {
        if (event.code === "Space") setSpacePressed(false)
      }

      element.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("keyup", handleKeyUp)

      return () => {
        element.removeEventListener("wheel", handleWheel)
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("keyup", handleKeyUp)
      }
    }, [onCameraChange, zoomAt])

    /* ------------------------- Pointer handlers ------------------------- */

    function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
      if (event.button === 2) return

      // Let inline text editing (primitive text layers) receive the event.
      if (isEditableTarget(event.target)) return

      // Floating canvas controls manage their own clicks.
      if ((event.target as HTMLElement).closest("[data-builder-control]")) return

      const container = containerRef.current

      if (!container) return

      container.setPointerCapture(event.pointerId)

      const target = event.target as HTMLElement
      const world = screenToWorld(event.clientX, event.clientY)
      const current = stateRef.current

      // Panning: middle mouse, space, or hand tool.
      if (event.button === 1 || spacePressed || current.tool === "hand") {
        interactionRef.current = {
          kind: "pan",
          startClient: { x: event.clientX, y: event.clientY },
          startCamera: cameraRef.current,
        }
        setIsPanning(true)
        return
      }

      // Resize handle?
      const handle = target.closest<HTMLElement>("[data-resize-handle]")

      if (handle && current.selection.length > 0) {
        const groupStart = getSelectionBounds(current, current.selection)

        if (!groupStart) return

        const startBounds = new Map<string, Bounds>()

        for (const id of current.selection) {
          const bounds = getNodeBounds(current, id)

          if (bounds) startBounds.set(id, bounds)
        }

        interactionRef.current = {
          kind: "resize",
          handle: handle.dataset.resizeHandle as HandleId,
          ids: current.selection,
          startBounds,
          groupStart,
          began: false,
        }
        return
      }

      // Draw tools create new frames or primitive layers.
      if (
        current.tool === "frame" ||
        current.tool === "text" ||
        current.tool === "box"
      ) {
        interactionRef.current = {
          kind: "draw",
          tool: current.tool,
          startWorld: world,
        }
        return
      }

      // Node (item or frame label)?
      const nodeElement = target.closest<HTMLElement>("[data-node-id]")
      const nodeId = nodeElement?.dataset.nodeId ?? null

      if (nodeId) {
        if (current.editingId === nodeId) return

        const node = current.items.find((entry) => entry.id === nodeId)
        const canEdit = Boolean(
          node &&
            node.registryType !== "asset:icon" &&
            node.registryType !== "primitive:box" &&
            !node.locked
        )

        // Double-click drills into the content for inline editing.
        // (Handled here because pointer capture retargets native dblclick.)
        if (canEdit && event.detail >= 2 && !event.shiftKey) {
          dispatch({ type: "set-selection", ids: [nodeId] })
          dispatch({ type: "set-editing", id: nodeId })
          return
        }

        let selection = current.selection

        if (event.shiftKey) {
          dispatch({ type: "toggle-selection", id: nodeId })
          selection = current.selection.includes(nodeId)
            ? current.selection.filter((id) => id !== nodeId)
            : [...current.selection, nodeId]
        } else if (!current.selection.includes(nodeId)) {
          dispatch({ type: "set-selection", ids: [nodeId] })
          selection = [nodeId]
        }

        if (current.editingId) dispatch({ type: "set-editing", id: null })

        // Collect movable nodes; dragging a frame brings its contents along.
        const moveIds = new Set<string>()

        for (const id of selection) {
          const item = current.items.find((entry) => entry.id === id)

          if (item) {
            if (!item.locked) moveIds.add(id)
            continue
          }

          const page = current.pages.find((entry) => entry.id === id)

          if (page) {
            moveIds.add(id)

            for (const item of current.items) {
              if (
                !item.locked &&
                item.x + item.w / 2 >= page.x &&
                item.x + item.w / 2 <= page.x + page.w &&
                item.y + item.h / 2 >= page.y &&
                item.y + item.h / 2 <= page.y + page.h
              ) {
                moveIds.add(item.id)
              }
            }
          }
        }

        const startBounds = new Map<string, Bounds>()

        for (const id of moveIds) {
          const bounds = getNodeBounds(current, id)

          if (bounds) startBounds.set(id, bounds)
        }

        interactionRef.current = {
          kind: "move",
          ids: [...moveIds],
          startBounds,
          startWorld: world,
          began: false,
          clickCandidate:
            !event.shiftKey && current.selection.includes(nodeId) ? nodeId : null,
          editOnClick:
            canEdit &&
            !event.shiftKey &&
            current.selection.length === 1 &&
            current.selection[0] === nodeId,
        }
        return
      }

      // Empty canvas: exit edit mode, start marquee.
      if (current.editingId) dispatch({ type: "set-editing", id: null })

      interactionRef.current = {
        kind: "marquee",
        startWorld: world,
        additive: event.shiftKey,
        baseSelection: event.shiftKey ? current.selection : [],
      }

      if (!event.shiftKey) dispatch({ type: "set-selection", ids: [] })
    }

    function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
      const interaction = interactionRef.current

      if (!interaction) {
        const target = event.target as HTMLElement
        const nodeElement = target.closest<HTMLElement>("[data-node-id]")

        setHoverId(nodeElement?.dataset.nodeId ?? null)
        return
      }

      const world = screenToWorld(event.clientX, event.clientY)
      const cam = cameraRef.current
      const current = stateRef.current

      if (interaction.kind === "pan") {
        onCameraChange({
          x:
            interaction.startCamera.x + event.clientX - interaction.startClient.x,
          y:
            interaction.startCamera.y + event.clientY - interaction.startClient.y,
          z: interaction.startCamera.z,
        })
        return
      }

      if (interaction.kind === "move") {
        const dx = world.x - interaction.startWorld.x
        const dy = world.y - interaction.startWorld.y

        if (
          !interaction.began &&
          Math.hypot(dx * cam.z, dy * cam.z) < DRAG_THRESHOLD
        ) {
          return
        }

        if (!interaction.began) {
          interaction.began = true
          dispatch({ type: "begin-gesture" })
        }

        const movingStart = unionBounds([...interaction.startBounds.values()])

        let snapDx = 0
        let snapDy = 0
        let nextGuides: SnapGuides = { vertical: [], horizontal: [] }

        if (movingStart && !event.metaKey) {
          const movingIds = new Set(interaction.ids)
          const staticBounds: Bounds[] = [
            ...current.items
              .filter((item) => !movingIds.has(item.id))
              .map((item) => ({ x: item.x, y: item.y, w: item.w, h: item.h })),
            ...current.pages
              .filter((page) => !movingIds.has(page.id))
              .map((page) => ({ x: page.x, y: page.y, w: page.w, h: page.h })),
          ]
          const snap = computeSnap(
            {
              x: movingStart.x + dx,
              y: movingStart.y + dy,
              w: movingStart.w,
              h: movingStart.h,
            },
            staticBounds,
            6 / cam.z
          )

          snapDx = snap.dx
          snapDy = snap.dy
          nextGuides = snap.guides
        }

        setGuides(nextGuides)

        const bounds: Record<string, Bounds> = {}

        for (const [id, start] of interaction.startBounds) {
          bounds[id] = {
            x: start.x + dx + snapDx,
            y: start.y + dy + snapDy,
            w: start.w,
            h: start.h,
          }
        }

        dispatch({ type: "set-node-bounds", bounds })
        return
      }

      if (interaction.kind === "resize") {
        if (!interaction.began) {
          interaction.began = true
          dispatch({ type: "begin-gesture" })
        }

        const group = interaction.groupStart
        const anchor = getResizeAnchor(group, interaction.handle)
        const horizontal = interaction.handle.includes("e")
          ? 1
          : interaction.handle.includes("w")
            ? -1
            : 0
        const vertical = interaction.handle.includes("s")
          ? 1
          : interaction.handle.includes("n")
            ? -1
            : 0

        let scaleX =
          horizontal === 0 ? 1 : ((world.x - anchor.x) * horizontal) / group.w
        let scaleY =
          vertical === 0 ? 1 : ((world.y - anchor.y) * vertical) / group.h

        scaleX = Math.max(scaleX, 16 / group.w)
        scaleY = Math.max(scaleY, 16 / group.h)

        if (event.shiftKey && horizontal !== 0 && vertical !== 0) {
          const uniform = Math.max(scaleX, scaleY)

          scaleX = uniform
          scaleY = uniform
        }

        const bounds: Record<string, Bounds> = {}

        for (const [id, start] of interaction.startBounds) {
          bounds[id] = {
            x: anchor.x + (start.x - anchor.x) * scaleX,
            y: anchor.y + (start.y - anchor.y) * scaleY,
            w: start.w * scaleX,
            h: start.h * scaleY,
          }
        }

        dispatch({ type: "set-node-bounds", bounds })
        return
      }

      if (interaction.kind === "marquee") {
        const rect = normalizeBounds(interaction.startWorld, world)

        setMarquee(rect)

        const hits = current.items
          .filter((item) =>
            boundsIntersect(rect, {
              x: item.x,
              y: item.y,
              w: item.w,
              h: item.h,
            })
          )
          .map((item) => item.id)
        const merged = interaction.additive
          ? [...new Set([...interaction.baseSelection, ...hits])]
          : hits

        dispatch({ type: "set-selection", ids: merged })
        return
      }

      if (interaction.kind === "draw") {
        setFrameDraft(normalizeBounds(interaction.startWorld, world))
      }
    }

    function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
      const interaction = interactionRef.current

      interactionRef.current = null
      setIsPanning(false)
      setGuides({ vertical: [], horizontal: [] })
      setMarquee(null)

      containerRef.current?.releasePointerCapture(event.pointerId)

      if (!interaction) return

      if (
        interaction.kind === "move" &&
        !interaction.began &&
        interaction.clickCandidate
      ) {
        if (interaction.editOnClick) {
          // Clicking an already-selected item drills into its content.
          dispatch({ type: "set-editing", id: interaction.clickCandidate })
        } else {
          dispatch({ type: "set-selection", ids: [interaction.clickCandidate] })
        }
      }

      if (interaction.kind === "draw") {
        const world = screenToWorld(event.clientX, event.clientY)
        const rect = normalizeBounds(interaction.startWorld, world)

        setFrameDraft(null)

        if (interaction.tool === "frame") {
          const isClick = rect.w < 40 || rect.h < 40
          const frame: BuilderDocumentPage = {
            id: createId("page"),
            name: `Frame ${stateRef.current.pages.length + 1}`,
            x: isClick ? interaction.startWorld.x : rect.x,
            y: isClick ? interaction.startWorld.y : rect.y,
            w: isClick ? 1280 : Math.max(rect.w, 320),
            h: isClick ? 800 : Math.max(rect.h, 320),
          }

          dispatch({ type: "add-frame", frame })
          dispatch({ type: "set-tool", tool: "select" })
          return
        }

        // Text / rectangle primitive layers.
        const isText = interaction.tool === "text"
        const isClick = rect.w < 8 || rect.h < 8
        const item: BuilderDocumentItem = {
          id: createId("item"),
          registryName: isText ? "text" : "box",
          registryType: isText ? "primitive:text" : "primitive:box",
          title: isText ? "Text" : "Rectangle",
          x: isClick ? interaction.startWorld.x : rect.x,
          y: isClick ? interaction.startWorld.y : rect.y,
          w: isClick ? (isText ? 220 : 200) : Math.max(rect.w, 24),
          h: isClick ? (isText ? 40 : 160) : Math.max(rect.h, 24),
          rotation: 0,
          zIndex: stateRef.current.items.length,
          overrides: isText ? { content: "Text" } : undefined,
        }

        dispatch({ type: "add-item", item })
        dispatch({ type: "set-tool", tool: "select" })

        // Drop straight into typing for new text layers.
        if (isText) dispatch({ type: "set-editing", id: item.id })
      }
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>) {
      event.preventDefault()

      const data = event.dataTransfer.getData("application/x-loveui-builder-item")

      if (!data) return

      try {
        const item = JSON.parse(data) as BuilderCatalogItem

        onDropCatalogItem(item, screenToWorld(event.clientX, event.clientY))
      } catch {
        // Ignore malformed payloads.
      }
    }

    /* ----------------------------- Rendering ----------------------------- */

    const selectionBounds = getSelectionBounds(state, state.selection)
    const singleSelected =
      state.selection.length === 1
        ? state.items.find((item) => item.id === state.selection[0])
        : undefined
    const selectionLocked = Boolean(singleSelected?.locked)
    const cursor = isPanning
      ? "grabbing"
      : spacePressed || state.tool === "hand"
        ? "grab"
        : state.tool === "frame" || state.tool === "text" || state.tool === "box"
          ? "crosshair"
          : "default"
    const gridSize = GRID_SIZE * camera.z

    return (
      <div
        ref={containerRef}
        className="relative h-full w-full touch-none select-none overflow-hidden bg-neutral-100 [--builder-dot:rgba(0,0,0,0.18)] dark:bg-neutral-900 dark:[--builder-dot:rgba(255,255,255,0.14)]"
        style={{
          cursor,
          backgroundImage:
            camera.z > 0.35
              ? "radial-gradient(circle, var(--builder-dot, rgba(0,0,0,0.18)) 1px, transparent 1px)"
              : undefined,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundPosition: `${camera.x}px ${camera.y}px`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setHoverId(null)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
      >
        {/* World layer */}
        <div
          className="absolute left-0 top-0"
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.z})`,
            transformOrigin: "0 0",
          }}
        >
          {state.pages.map((page) => (
            <CanvasFrame
              key={page.id}
              page={page}
              zoom={camera.z}
              selected={state.selection.includes(page.id)}
              hovered={hoverId === page.id}
            />
          ))}

          {state.items.map((item) => (
            <CanvasItem
              key={item.id}
              dispatch={dispatch}
              item={item}
              editing={state.editingId === item.id}
              previewTheme={previewTheme}
              selected={state.selection.includes(item.id)}
            />
          ))}

          {frameDraft ? (
            <div
              className="absolute border border-blue-500 bg-blue-500/10"
              style={{
                left: frameDraft.x,
                top: frameDraft.y,
                width: frameDraft.w,
                height: frameDraft.h,
                borderWidth: 1 / camera.z,
              }}
            />
          ) : null}
        </div>

        {/* Screen-space overlay */}
        <CanvasOverlay
          camera={camera}
          guides={guides}
          hoverBounds={
            hoverId &&
            !state.selection.includes(hoverId) &&
            state.editingId !== hoverId
              ? getNodeBounds(state, hoverId)
              : null
          }
          marquee={marquee}
          selectionBounds={state.editingId ? null : selectionBounds}
          selectionLocked={selectionLocked}
          showHandles={!state.editingId && state.selection.length > 0}
        />

        {state.editingId ? (
          <div className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-600 backdrop-blur dark:text-blue-400">
            Editing content — press Esc or click outside to finish
          </div>
        ) : null}

        {/* Floating tools */}
        <CanvasToolbar
          tool={state.tool}
          onToolChange={(tool) => dispatch({ type: "set-tool", tool })}
        />
        <CanvasZoomControls
          zoom={camera.z}
          onZoomIn={() => zoomAtCenter(1.25)}
          onZoomOut={() => zoomAtCenter(0.8)}
          onZoomToFit={zoomToFit}
          onZoomTo={(zoom) => {
            const rect = containerRef.current?.getBoundingClientRect()

            if (!rect) return

            zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, zoom)
          }}
        />
      </div>
    )
  }
)

/* ------------------------------- Frames -------------------------------- */

function CanvasFrame({
  page,
  zoom,
  selected,
  hovered,
}: {
  page: BuilderDocumentPage
  zoom: number
  selected: boolean
  hovered: boolean
}) {
  return (
    <>
      <button
        type="button"
        data-node-id={page.id}
        className={cn(
          "absolute origin-bottom-left cursor-default truncate text-left font-medium",
          selected || hovered
            ? "text-blue-600 dark:text-blue-400"
            : "text-neutral-500 dark:text-neutral-400"
        )}
        style={{
          left: page.x,
          top: page.y,
          transform: `translateY(-100%) scale(${1 / zoom})`,
          fontSize: 12,
          maxWidth: page.w * zoom,
          paddingBottom: 4,
        }}
      >
        {page.name}
      </button>
      <div
        className="pointer-events-none absolute rounded-sm bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] dark:bg-neutral-950"
        style={{
          left: page.x,
          top: page.y,
          width: page.w,
          height: page.h,
        }}
      />
    </>
  )
}

/* -------------------------------- Items -------------------------------- */

const CanvasItem = React.memo(function CanvasItem({
  dispatch,
  item,
  editing,
  previewTheme,
  selected,
}: {
  dispatch: React.Dispatch<StudioAction>
  item: BuilderDocumentItem
  editing: boolean
  previewTheme: "light" | "dark"
  selected: boolean
}) {
  const isPrimitive =
    item.registryType === "primitive:text" || item.registryType === "primitive:box"

  return (
    <div
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.h,
        transform: item.rotation ? `rotate(${item.rotation}rad)` : undefined,
      }}
    >
      <div
        className={cn(
          "h-full w-full overflow-hidden",
          item.registryType === "asset:icon" || isPrimitive
            ? "bg-transparent"
            : "rounded-[2px] bg-white dark:bg-neutral-950",
          item.registryType === "primitive:box" && "bg-[#d9d9d9]",
          item.registryType === "primitive:text" &&
            "text-base text-neutral-900 dark:text-neutral-50",
          editing && "ring-2 ring-blue-500",
          item.overrides?.className
        )}
        style={item.overrides?.styles as React.CSSProperties | undefined}
      >
        {item.registryType === "asset:icon" ? (
          <div className="grid h-full w-full place-items-center">
            {item.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={item.title}
                className="h-full w-full object-contain dark:invert"
                draggable={false}
                src={item.previewUrl}
              />
            ) : (
              <Grid2x2 className="size-10 text-muted-foreground" />
            )}
          </div>
        ) : item.registryType === "primitive:box" ? null : item.registryType ===
          "primitive:text" ? (
          <CanvasPrimitiveText dispatch={dispatch} editing={editing} item={item} />
        ) : (
          <CanvasItemFrame
            editing={editing}
            item={item}
            previewTheme={previewTheme}
          />
        )}
      </div>

      {/* Hit target — disabled while editing so the content is interactive. */}
      <div
        data-node-id={item.id}
        className={cn("absolute inset-0", editing && "pointer-events-none")}
      >
        {item.locked && selected ? (
          <div className="absolute right-1 top-1 rounded bg-neutral-900/70 p-1 text-white">
            <Lock className="size-3" />
          </div>
        ) : null}
      </div>
    </div>
  )
})

function CanvasPrimitiveText({
  dispatch,
  editing,
  item,
}: {
  dispatch: React.Dispatch<StudioAction>
  editing: boolean
  item: BuilderDocumentItem
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const content = item.overrides?.content ?? "Text"

  const commit = React.useCallback(() => {
    const element = ref.current

    if (!element) return

    const text = element.innerText.replace(/\n+$/, "")

    if (text === (item.overrides?.content ?? "Text")) return

    dispatch({
      type: "update-item",
      id: item.id,
      patch: { overrides: { content: text } },
      history: true,
    })
  }, [dispatch, item.id, item.overrides?.content])

  // Focus + select all when entering edit mode; commit when leaving it.
  React.useEffect(() => {
    const element = ref.current

    if (!element) return

    if (editing) {
      element.focus()

      const range = document.createRange()

      range.selectNodeContents(element)

      const selection = window.getSelection()

      selection?.removeAllRanges()
      selection?.addRange(range)
      return
    }

    commit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing])

  return (
    <div
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      className={cn(
        "h-full w-full whitespace-pre-wrap break-words outline-none",
        editing && "cursor-text select-text"
      )}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault()
          event.stopPropagation()
          event.currentTarget.blur()
          dispatch({ type: "set-editing", id: null })
        }
      }}
    >
      {content}
    </div>
  )
}

function CanvasItemFrame({
  item,
  editing,
  previewTheme,
}: {
  item: BuilderDocumentItem
  editing: boolean
  previewTheme: "light" | "dark"
}) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  const postOverrides = React.useCallback(() => {
    const message: BuilderPreviewParentMessage = {
      type: "builder-preview:apply-overrides",
      shapeId: item.id,
      textOverrides: item.overrides?.text ?? {},
      textStyles: item.overrides?.textStyles ?? {},
      elementOverrides: item.overrides?.elements ?? {},
    }

    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin)
  }, [
    item.id,
    item.overrides?.text,
    item.overrides?.textStyles,
    item.overrides?.elements,
  ])

  React.useEffect(() => {
    postOverrides()
  }, [postOverrides])

  // Tell the preview when content editing starts/stops so it can manage
  // its in-frame selection overlay.
  React.useEffect(() => {
    const message: BuilderPreviewParentMessage = {
      type: "builder-preview:set-editing",
      shapeId: item.id,
      editing,
    }

    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin)
  }, [editing, item.id])

  return (
    <iframe
      ref={iframeRef}
      title={item.title}
      src={`/builder/preview/${encodeURIComponent(item.registryName)}?shapeId=${encodeURIComponent(item.id)}&theme=${previewTheme}`}
      className="h-full w-full border-0 bg-white dark:bg-neutral-950"
      style={{ pointerEvents: editing ? "auto" : "none" }}
      loading="lazy"
      onLoad={postOverrides}
    />
  )
}

/* ------------------------------- Overlay ------------------------------- */

function CanvasOverlay({
  camera,
  guides,
  hoverBounds,
  marquee,
  selectionBounds,
  selectionLocked,
  showHandles,
}: {
  camera: Camera
  guides: SnapGuides
  hoverBounds: Bounds | null
  marquee: Bounds | null
  selectionBounds: Bounds | null
  selectionLocked: boolean
  showHandles: boolean
}) {
  const toScreen = (bounds: Bounds) => ({
    x: bounds.x * camera.z + camera.x,
    y: bounds.y * camera.z + camera.y,
    w: bounds.w * camera.z,
    h: bounds.h * camera.z,
  })

  const selection = selectionBounds ? toScreen(selectionBounds) : null
  const hover = hoverBounds ? toScreen(hoverBounds) : null
  const marqueeScreen = marquee ? toScreen(marquee) : null

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {hover ? (
        <div
          className="absolute border-2 border-blue-500/70"
          style={{ left: hover.x, top: hover.y, width: hover.w, height: hover.h }}
        />
      ) : null}

      {guides.vertical.map((x) => (
        <div
          key={`v-${x}`}
          className="absolute inset-y-0 w-px bg-red-500"
          style={{ left: x * camera.z + camera.x }}
        />
      ))}
      {guides.horizontal.map((y) => (
        <div
          key={`h-${y}`}
          className="absolute inset-x-0 h-px bg-red-500"
          style={{ top: y * camera.z + camera.y }}
        />
      ))}

      {selection ? (
        <>
          <div
            className={cn(
              "absolute border-2",
              selectionLocked ? "border-neutral-400" : "border-blue-500"
            )}
            style={{
              left: selection.x,
              top: selection.y,
              width: selection.w,
              height: selection.h,
            }}
          />
          {showHandles && !selectionLocked
            ? HANDLES.map((handle) => {
                const position = getHandlePosition(selection, handle.id)

                return (
                  <div
                    key={handle.id}
                    data-resize-handle={handle.id}
                    className="pointer-events-auto absolute size-2.5 rounded-[2px] border border-blue-500 bg-white shadow-sm dark:bg-neutral-950"
                    style={{
                      left: position.x - 5,
                      top: position.y - 5,
                      cursor: handle.cursor,
                    }}
                  />
                )
              })
            : null}
          {selectionBounds ? (
            <div
              className="absolute -translate-x-1/2 rounded-sm bg-blue-500 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white"
              style={{
                left: selection.x + selection.w / 2,
                top: selection.y + selection.h + 8,
              }}
            >
              {Math.round(selectionBounds.w)} × {Math.round(selectionBounds.h)}
            </div>
          ) : null}
        </>
      ) : null}

      {marqueeScreen ? (
        <div
          className="absolute border border-blue-500 bg-blue-500/10"
          style={{
            left: marqueeScreen.x,
            top: marqueeScreen.y,
            width: marqueeScreen.w,
            height: marqueeScreen.h,
          }}
        />
      ) : null}
    </div>
  )
}

/* ---------------------------- Floating tools ---------------------------- */

function CanvasToolbar({
  tool,
  onToolChange,
}: {
  tool: CanvasTool
  onToolChange: (tool: CanvasTool) => void
}) {
  const tools: { id: CanvasTool; label: string; icon: React.ReactNode }[] = [
    { id: "select", label: "Select — V", icon: <MousePointer2 className="size-4" /> },
    { id: "hand", label: "Hand — H", icon: <Hand className="size-4" /> },
    { id: "frame", label: "Frame — F", icon: <Frame className="size-4" /> },
    { id: "box", label: "Rectangle — R", icon: <Square className="size-4" /> },
    { id: "text", label: "Text — T", icon: <Type className="size-4" /> },
  ]

  return (
    <div
      data-builder-control=""
      className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-0.5 rounded-xl border bg-background p-1 shadow-lg"
    >
      {tools.map((entry) => (
        <button
          key={entry.id}
          type="button"
          title={entry.label}
          aria-label={entry.label}
          data-active={tool === entry.id}
          className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-blue-500 data-[active=true]:text-white"
          onClick={() => onToolChange(entry.id)}
        >
          {entry.icon}
        </button>
      ))}
    </div>
  )
}

function CanvasZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomTo,
  onZoomToFit,
}: {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomTo: (zoom: number) => void
  onZoomToFit: () => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div data-builder-control="" className="absolute bottom-4 right-4 z-30">
      {open ? (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}
      <div className="relative z-40 flex items-center rounded-xl border bg-background p-1 shadow-lg">
        <button
          type="button"
          aria-label="Zoom out"
          className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
          onClick={onZoomOut}
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          className="h-8 min-w-14 rounded-lg px-1 text-center text-xs font-medium tabular-nums text-foreground hover:bg-muted"
          onClick={() => setOpen((current) => !current)}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
          onClick={onZoomIn}
        >
          <Plus className="size-4" />
        </button>

        {open ? (
          <div className="absolute bottom-full right-0 mb-2 w-44 rounded-lg border bg-background p-1 shadow-xl">
            {[
              { label: "Zoom to fit", shortcut: "⇧1", action: onZoomToFit },
              { label: "Zoom to 50%", action: () => onZoomTo(0.5) },
              { label: "Zoom to 100%", shortcut: "⌘0", action: () => onZoomTo(1) },
              { label: "Zoom to 200%", action: () => onZoomTo(2) },
            ].map((entry) => (
              <button
                key={entry.label}
                type="button"
                className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs font-medium hover:bg-muted"
                onClick={() => {
                  entry.action()
                  setOpen(false)
                }}
              >
                {entry.label}
                {entry.shortcut ? (
                  <span className="text-muted-foreground">{entry.shortcut}</span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/* ------------------------------- Helpers ------------------------------- */

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeBounds(
  a: { x: number; y: number },
  b: { x: number; y: number }
): Bounds {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    w: Math.abs(a.x - b.x),
    h: Math.abs(a.y - b.y),
  }
}

function getResizeAnchor(bounds: Bounds, handle: HandleId) {
  return {
    x: handle.includes("w")
      ? bounds.x + bounds.w
      : handle.includes("e")
        ? bounds.x
        : bounds.x,
    y: handle.includes("n")
      ? bounds.y + bounds.h
      : handle.includes("s")
        ? bounds.y
        : bounds.y,
  }
}

function getHandlePosition(
  bounds: { x: number; y: number; w: number; h: number },
  handle: HandleId
) {
  const cx = bounds.x + bounds.w / 2
  const cy = bounds.y + bounds.h / 2

  switch (handle) {
    case "nw":
      return { x: bounds.x, y: bounds.y }
    case "n":
      return { x: cx, y: bounds.y }
    case "ne":
      return { x: bounds.x + bounds.w, y: bounds.y }
    case "e":
      return { x: bounds.x + bounds.w, y: cy }
    case "se":
      return { x: bounds.x + bounds.w, y: bounds.y + bounds.h }
    case "s":
      return { x: cx, y: bounds.y + bounds.h }
    case "sw":
      return { x: bounds.x, y: bounds.y + bounds.h }
    case "w":
      return { x: bounds.x, y: cy }
  }
}

export function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}
