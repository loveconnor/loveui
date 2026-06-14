"use client"

import * as React from "react"

import { cn } from "@/lib/cn"
import type { BuilderPreviewParentMessage } from "@/lib/builder/preview-protocol"
import type {
  BuilderDocument,
  BuilderDocumentItem,
  BuilderDocumentPage,
} from "@/lib/builder/types"
import { normalizeBuilderDocument } from "@/lib/builder/types"

type BuilderPreviewSnapshot = {
  type?: string
  projectId?: string
  projectName?: string
  document?: unknown
  updatedAt?: string
}

type LoadState =
  | { status: "loading" }
  | { status: "ready"; projectName: string; document: BuilderDocument }
  | { status: "error"; message: string }

export function BuilderFramePreview({
  frameId,
  projectId,
  snapshotKey,
}: {
  frameId?: string
  projectId?: string
  snapshotKey?: string
}) {
  const [state, setState] = React.useState<LoadState>({ status: "loading" })
  const previewAreaRef = React.useRef<HTMLDivElement>(null)
  const previewAreaSize = useElementSize(previewAreaRef)
  const applySnapshot = React.useCallback((snapshot: BuilderPreviewSnapshot) => {
    if (!snapshot.document) return

    setState({
      status: "ready",
      projectName: snapshot.projectName || "Builder preview",
      document: normalizeBuilderDocument(snapshot.document),
    })
  }, [])

  React.useEffect(() => {
    let cancelled = false

    async function loadPreview() {
      const snapshot = readPreviewSnapshot(snapshotKey, projectId)

      if (snapshot?.document) {
        if (cancelled) return

        applySnapshot(snapshot)
        return
      }

      if (!projectId) {
        if (!cancelled) {
          setState({
            status: "error",
            message: "No builder project or preview snapshot was provided.",
          })
        }
        return
      }

      try {
        const response = await fetch(`/api/builder/projects/${projectId}`)

        if (!response.ok) throw new Error("preview unavailable")

        const body = (await response.json()) as {
          project?: { name?: string; document?: unknown }
        }

        if (cancelled) return

        setState({
          status: "ready",
          projectName: body.project?.name || "Builder preview",
          document: normalizeBuilderDocument(body.project?.document),
        })
      } catch {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              "This preview is no longer available. Return to Builder and open Preview again.",
          })
        }
      }
    }

    void loadPreview()

    return () => {
      cancelled = true
    }
  }, [applySnapshot, projectId, snapshotKey])

  React.useEffect(() => {
    if (!projectId) return

    const snapshotStorageKey = snapshotKey || getBuilderPreviewSnapshotKey(projectId)
    const channel =
      "BroadcastChannel" in window
        ? new BroadcastChannel(getBuilderPreviewChannelName(projectId))
        : null

    function handleSnapshot(value: unknown) {
      const snapshot = parsePreviewSnapshot(value)

      if (!snapshot?.document) return
      if (snapshot.projectId && snapshot.projectId !== projectId) return

      applySnapshot(snapshot)
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== snapshotStorageKey || !event.newValue) return

      handleSnapshot(event.newValue)
    }

    if (channel) {
      channel.onmessage = (event) => handleSnapshot(event.data)
    }

    window.addEventListener("storage", handleStorage)

    return () => {
      channel?.close()
      window.removeEventListener("storage", handleStorage)
    }
  }, [applySnapshot, projectId, snapshotKey])

  if (state.status === "loading") {
    return <PreviewMessage title="Loading preview" />
  }

  if (state.status === "error") {
    return <PreviewMessage title="Preview unavailable" detail={state.message} />
  }

  const frame =
    state.document.pages.find((page) => page.id === frameId) ??
    state.document.pages[0]

  if (!frame) {
    return (
      <PreviewMessage
        title="No frames found"
        detail="Add a frame in Builder, then open Preview again."
      />
    )
  }

  const theme = resolvePreviewTheme(state.document.theme)

  return (
    <main
      className={cn(
        "min-h-screen overflow-auto bg-neutral-100 text-foreground dark:bg-neutral-950",
        theme === "dark" && "dark"
      )}
    >
      <div className="sticky top-0 z-20 flex h-12 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{frame.name}</div>
          <div className="text-[11px] text-muted-foreground">
            {state.projectName} / {Math.round(frame.w)}x{Math.round(frame.h)}
          </div>
        </div>
      </div>

      <div
        ref={previewAreaRef}
        className="h-[calc(100vh-3rem)] w-full overflow-auto bg-background"
      >
        <FramePreviewSurface
          frame={frame}
          items={state.document.items}
          theme={theme}
          viewport={previewAreaSize}
        />
      </div>
    </main>
  )
}

function useElementSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState({ w: 0, h: 0 })

  React.useEffect(() => {
    const element = ref.current

    if (!element) return

    const update = () => {
      const rect = element.getBoundingClientRect()

      setSize({ w: rect.width, h: rect.height })
    }
    const observer = new ResizeObserver(update)

    update()
    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])

  return size
}

function readPreviewSnapshot(
  snapshotKey: string | undefined,
  projectId: string | undefined
) {
  const keys = [
    snapshotKey,
    projectId ? getBuilderPreviewSnapshotKey(projectId) : undefined,
  ].filter((key): key is string => Boolean(key))

  for (const key of keys) {
    try {
      const raw = window.localStorage.getItem(key)

      if (!raw) continue

      return parsePreviewSnapshot(raw)
    } catch {
      // Try the next available preview source.
    }
  }

  return null
}

function parsePreviewSnapshot(value: unknown): BuilderPreviewSnapshot | null {
  try {
    const input =
      typeof value === "string" ? JSON.parse(value) as unknown : value

    if (!input || typeof input !== "object") return null

    return input as BuilderPreviewSnapshot
  } catch {
    return null
  }
}

function getBuilderPreviewSnapshotKey(projectId: string) {
  return `loveui:builder:preview:${projectId}`
}

function getBuilderPreviewChannelName(projectId: string) {
  return `loveui:builder:preview-channel:${projectId}`
}

function FramePreviewSurface({
  frame,
  items,
  theme,
  viewport,
}: {
  frame: BuilderDocumentPage
  items: BuilderDocumentItem[]
  theme: "light" | "dark"
  viewport: { w: number; h: number }
}) {
  const frameItems = items
    .filter((item) => isItemInsideFrame(item, frame))
    .sort((a, b) => a.zIndex - b.zIndex)
  const hasStickyHeader = frameItems.some((item) => item.overrides?.stickyHeader)
  const scale = viewport.w > 0 ? viewport.w / frame.w : 1
  const scaledHeight = frame.h * scale

  return (
    <div
      className="relative w-full overflow-visible"
      style={{ height: scaledHeight }}
    >
      <section
        aria-label={frame.name}
        className={cn(
          "relative origin-top-left bg-background",
          hasStickyHeader ? "overflow-visible" : "overflow-hidden"
        )}
        style={{
          width: Math.round(frame.w),
          height: Math.round(frame.h),
          transform: `scale(${scale})`,
        }}
      >
        {frameItems.length > 0 ? (
          frameItems.map((item) => (
            <FramePreviewItem
              key={item.id}
              frame={frame}
              item={item}
              theme={theme}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            This frame is empty.
          </div>
        )}
      </section>
    </div>
  )
}

function FramePreviewItem({
  frame,
  item,
  theme,
}: {
  frame: BuilderDocumentPage
  item: BuilderDocumentItem
  theme: "light" | "dark"
}) {
  const isPrimitive =
    item.registryType === "primitive:text" || item.registryType === "primitive:box"
  const left = Math.round(item.x - frame.x)
  const top = Math.round(item.y - frame.y)
  const stickyHeader = Boolean(item.overrides?.stickyHeader)
  const wrapperStyle: React.CSSProperties = stickyHeader
    ? {
        marginLeft: left,
        marginTop: top,
        top: 0,
        width: Math.round(item.w),
        height: Math.round(item.h),
        zIndex: Math.max(item.zIndex, 1000),
      }
    : {
        left,
        top,
        width: Math.round(item.w),
        height: Math.round(item.h),
        transform: item.rotation ? `rotate(${item.rotation}rad)` : undefined,
        zIndex: item.zIndex,
      }

  return (
    <div
      className={cn(
        "overflow-hidden",
        stickyHeader ? "sticky" : "absolute"
      )}
      style={wrapperStyle}
    >
      <div
        className={cn(
          "h-full w-full",
          item.registryType === "asset:icon" || isPrimitive
            ? "bg-transparent"
            : "bg-white dark:bg-neutral-950",
          item.registryType === "primitive:box" && "bg-[#d9d9d9]",
          item.registryType === "primitive:text" &&
            "whitespace-pre-wrap break-words text-base text-neutral-900 dark:text-neutral-50",
          item.overrides?.className
        )}
        style={item.overrides?.styles as React.CSSProperties | undefined}
      >
        {item.registryType === "asset:icon" ? (
          <AssetPreview item={item} />
        ) : item.registryType === "primitive:box" ? null : item.registryType ===
          "primitive:text" ? (
          item.overrides?.content ?? "Text"
        ) : (
          <RegistryItemPreview item={item} theme={theme} />
        )}
      </div>
    </div>
  )
}

function AssetPreview({ item }: { item: BuilderDocumentItem }) {
  if (!item.previewUrl) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={item.title}
      className={cn(
        "h-full w-full object-contain",
        (!item.assetCollection || item.assetCollection === "icons") && "dark:invert"
      )}
      draggable={false}
      decoding="async"
      src={item.previewUrl}
    />
  )
}

function RegistryItemPreview({
  item,
  theme,
}: {
  item: BuilderDocumentItem
  theme: "light" | "dark"
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

  return (
    <iframe
      ref={iframeRef}
      title={item.title}
      src={`/builder/preview/${encodeURIComponent(item.registryName)}?shapeId=${encodeURIComponent(item.id)}&theme=${theme}&mode=interactive`}
      className="h-full w-full border-0 bg-white dark:bg-neutral-950"
      onLoad={postOverrides}
    />
  )
}

function PreviewMessage({
  title,
  detail,
}: {
  title: string
  detail?: string
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
      <div className="max-w-sm text-center">
        <h1 className="text-sm font-semibold">{title}</h1>
        {detail ? (
          <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
        ) : null}
      </div>
    </main>
  )
}

function isItemInsideFrame(
  item: BuilderDocumentItem,
  frame: Pick<BuilderDocumentPage, "x" | "y" | "w" | "h">
) {
  const centerX = item.x + item.w / 2
  const centerY = item.y + item.h / 2

  return (
    centerX >= frame.x &&
    centerX <= frame.x + frame.w &&
    centerY >= frame.y &&
    centerY <= frame.y + frame.h
  )
}

function resolvePreviewTheme(theme: BuilderDocument["theme"]) {
  if (theme === "light" || theme === "dark") return theme

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}
