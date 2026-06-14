"use client"

import * as React from "react"
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  Eye,
  FileCode,
  Folder,
  LoaderCircle,
  Plus,
  Redo2,
  Trash2,
  Undo2,
} from "love-ui/icons"

import { cn } from "@/lib/cn"
import type { BuilderPreviewChildMessage } from "@/lib/builder/preview-protocol"
import type {
  BuilderCatalogItem,
  BuilderDocument,
  BuilderDocumentItem,
  BuilderFramework,
  BuilderProject,
} from "@/lib/builder/types"
import { isBuilderFramework, normalizeBuilderDocument } from "@/lib/builder/types"
import { BuilderCanvas, isEditableTarget, type BuilderCanvasHandle } from "./builder-canvas"
import { BuilderCodeDialog } from "./builder-code-dialog"
import {
  BuilderInspectorPanel,
  type BuilderElementSelection,
} from "./builder-inspector"
import { BuilderLibraryPanel, type BuilderCatalog } from "./builder-library"
import {
  buildDocument,
  createId,
  createStudioState,
  defaultSizeForCatalogType,
  studioReducer,
  type Camera,
} from "./builder-store"

type SaveState = "saved" | "dirty" | "saving" | "error"
type ResolvedTheme = "light" | "dark"

export function BuilderStudio({
  canSaveBuilds,
  initialProject,
  initialProjects,
  localStorageKey,
  catalog,
}: {
  canSaveBuilds: boolean
  initialProject: BuilderProject
  initialProjects: BuilderProject[]
  localStorageKey: string
  catalog: BuilderCatalog
}) {
  const [project, setProject] = React.useState(initialProject)
  const [projects, setProjects] = React.useState(() =>
    initialProjects.length > 0 ? initialProjects : [initialProject]
  )
  const [state, dispatch] = React.useReducer(
    studioReducer,
    initialProject.document,
    createStudioState
  )
  const [camera, setCamera] = React.useState<Camera>({ x: 0, y: 0, z: 1 })
  const [framework, setFramework] = React.useState<BuilderFramework>(
    initialProject.document.framework
  )
  const [saveState, setSaveState] = React.useState<SaveState>("saved")
  const [isExporting, setIsExporting] = React.useState(false)
  const [codeOpen, setCodeOpen] = React.useState(false)
  const previewTheme = useResolvedTheme()
  const [selectedElement, setSelectedElement] =
    React.useState<BuilderElementSelection | null>(null)

  const canvasRef = React.useRef<BuilderCanvasHandle>(null)
  const clipboardRef = React.useRef<BuilderDocumentItem[]>([])
  const nudgeGestureRef = React.useRef(0)
  const lastEditingRef = React.useRef<string | null>(null)

  const stateRef = React.useRef(state)
  stateRef.current = state
  const projectRef = React.useRef(project)
  projectRef.current = project
  const frameworkRef = React.useRef(framework)
  frameworkRef.current = framework

  const document = React.useMemo(
    () => buildDocument({ state, framework, theme: project.document.theme }),
    [state, framework, project.document.theme]
  )

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      publishBuilderPreviewSnapshot({
        projectId: project.id,
        projectName: project.name,
        document,
      })
    }, 80)

    return () => window.clearTimeout(timeout)
  }, [document, project.id, project.name])

  React.useEffect(() => {
    if (canSaveBuilds) return

    try {
      const raw = window.localStorage.getItem(localStorageKey)

      if (!raw) return

      const parsed = JSON.parse(raw) as Partial<BuilderProject>
      const localProject: BuilderProject = {
        ...initialProject,
        ...parsed,
        id: initialProject.id,
        userId: initialProject.userId,
        framework: isBuilderFramework(String(parsed.framework))
          ? parsed.framework as BuilderFramework
          : initialProject.framework,
        document: normalizeBuilderDocument(
          parsed.document,
          isBuilderFramework(String(parsed.framework))
            ? parsed.framework as BuilderFramework
            : initialProject.framework
        ),
        tldrawSnapshot: null,
        lastExportedAt: null,
      }

      setProject(localProject)
      setProjects([localProject])
      setFramework(localProject.framework)
      dispatch({ type: "replace-document", document: localProject.document })
      setSaveState("saved")
      isFirstRevision.current = true
    } catch {
      // Ignore malformed local drafts and keep the fresh default project.
    }
  }, [canSaveBuilds, initialProject, localStorageKey])

  /* ------------------------------ Saving ------------------------------ */

  const save = React.useCallback(async () => {
    const current = stateRef.current
    const activeProject = projectRef.current
    const nextDocument = buildDocument({
      state: current,
      framework: frameworkRef.current,
      theme: activeProject.document.theme,
    })

    setSaveState("saving")

    if (!canSaveBuilds) {
      try {
        const now = new Date().toISOString()
        const localProject: BuilderProject = {
          ...activeProject,
          framework: frameworkRef.current,
          document: nextDocument,
          updatedAt: now,
        }

        window.localStorage.setItem(localStorageKey, JSON.stringify(localProject))
        setProject(localProject)
        setProjects([localProject])
        setSaveState("saved")

        return true
      } catch {
        setSaveState("error")

        return false
      }
    }

    try {
      const response = await fetch(`/api/builder/projects/${activeProject.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: activeProject.name,
          framework: frameworkRef.current,
          document: nextDocument,
        }),
      })

      if (!response.ok) throw new Error("save failed")

      const body = (await response.json()) as { project: BuilderProject }

      setProjects((entries) =>
        entries.map((entry) => (entry.id === body.project.id ? body.project : entry))
      )
      setProject((entry) =>
        entry.id === body.project.id ? { ...entry, updatedAt: body.project.updatedAt } : entry
      )
      setSaveState((value) => (value === "saving" ? "saved" : value))

      return true
    } catch {
      setSaveState("error")

      return false
    }
  }, [canSaveBuilds, localStorageKey])

  // Autosave: debounce content changes.
  const isFirstRevision = React.useRef(true)

  React.useEffect(() => {
    if (isFirstRevision.current) {
      isFirstRevision.current = false
      return
    }

    setSaveState("dirty")

    const timeout = window.setTimeout(() => {
      void save()
    }, 1200)

    return () => window.clearTimeout(timeout)
  }, [state.revision, project.name, framework, save])

  /* --------------------------- Project actions --------------------------- */

  const switchProject = React.useCallback((next: BuilderProject) => {
    if (!canSaveBuilds) return

    setProject(next)
    setFramework(next.document.framework)
    dispatch({ type: "replace-document", document: next.document })
    setSaveState("saved")
    isFirstRevision.current = true
  }, [canSaveBuilds])

  async function createProject(template?: BuilderProject) {
    if (!canSaveBuilds) return

    const response = await fetch("/api/builder/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: template ? `${template.name} copy` : "Untitled",
        framework: template?.framework ?? "next",
      }),
    })

    if (!response.ok) return

    let { project: created } = (await response.json()) as {
      project: BuilderProject
    }

    if (template) {
      const patch = await fetch(`/api/builder/projects/${created.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: created.name,
          framework: template.framework,
          document: buildDocument({
            state: stateRef.current,
            framework: frameworkRef.current,
            theme: template.document.theme,
          }),
        }),
      })

      if (patch.ok) {
        created = ((await patch.json()) as { project: BuilderProject }).project
      }
    }

    setProjects((entries) => [created, ...entries])
    switchProject(created)
  }

  async function deleteProject(target: BuilderProject) {
    if (!canSaveBuilds) return

    if (
      !window.confirm(`Delete "${target.name}"? This cannot be undone.`)
    ) {
      return
    }

    const response = await fetch(`/api/builder/projects/${target.id}`, {
      method: "DELETE",
    })

    if (!response.ok) return

    const remaining = projects.filter((entry) => entry.id !== target.id)

    setProjects(remaining)

    if (target.id === project.id) {
      if (remaining[0]) {
        switchProject(remaining[0])
      } else {
        await createProject()
      }
    }
  }

  async function exportZip() {
    setIsExporting(true)

    try {
      const saved = await save()

      if (!saved) return

      const response = await fetch(
        `/api/builder/projects/${project.id}/export`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            document,
            framework,
            projectName: project.name,
          }),
        }
      )

      if (!response.ok) return

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const anchor = window.document.createElement("a")

      anchor.href = url
      anchor.download = `${slugify(project.name)}.zip`
      anchor.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }

  async function openFramePreview(frameId: string) {
    const previewWindow = window.open("", "_blank")
    const saved = await save()

    if (!saved) {
      previewWindow?.close()
      return
    }

    const previewDocument = buildDocument({
      state: stateRef.current,
      framework: frameworkRef.current,
      theme: projectRef.current.document.theme,
    })
    const snapshotKey = getBuilderPreviewSnapshotKey(projectRef.current.id)

    publishBuilderPreviewSnapshot({
      projectId: projectRef.current.id,
      projectName: projectRef.current.name,
      document: previewDocument,
    })

    const params = new URLSearchParams({
      project: projectRef.current.id,
      frame: frameId,
      snapshot: snapshotKey,
    })

    const previewUrl = `/builder/preview?${params.toString()}`

    if (previewWindow) {
      previewWindow.location.href = previewUrl
    } else {
      window.open(previewUrl, "_blank")
    }
  }

  /* ----------------------------- Insertion ----------------------------- */

  const insertCatalogItem = React.useCallback(
    (catalogItem: BuilderCatalogItem, point: { x: number; y: number }) => {
      const size = defaultSizeForCatalogType(catalogItem.type)
      const item: BuilderDocumentItem = {
        id: createId("item"),
        registryName: catalogItem.name,
        registryType: catalogItem.type,
        title: catalogItem.title,
        previewUrl: catalogItem.previewUrl,
        assetCollection: catalogItem.assetCollection,
        x: Math.round(point.x - size.w / 2),
        y: Math.round(point.y - size.h / 2),
        w: size.w,
        h: size.h,
        rotation: 0,
        zIndex: stateRef.current.items.length,
        locked: false,
      }

      dispatch({ type: "add-item", item })
    },
    []
  )

  /* --------------------------- Copy item code --------------------------- */

  const copyItemCode = React.useCallback(async (item: BuilderDocumentItem) => {
    try {
      if (item.registryType === "asset:icon") {
        await navigator.clipboard.writeText(
          `import { ${toPascalCase(item.registryName)} } from "${getAssetImportPath(item)}"`
        )
        return
      }

      const response = await fetch(
        `/api/builder/registry/${encodeURIComponent(item.registryName)}`
      )

      if (!response.ok) throw new Error("not found")

      const body = (await response.json()) as {
        files?: { path?: string; content?: string; type?: string }[]
      }
      const file =
        body.files?.find((entry) => entry.content && entry.type !== "registry:page") ??
        body.files?.find((entry) => entry.content)

      if (file?.content) {
        await navigator.clipboard.writeText(file.content)
      }
    } catch {
      // Clipboard or fetch failed; nothing else to do.
    }
  }, [])

  /* ---------------------- Preview iframe edit bridge ---------------------- */

  React.useEffect(() => {
    function handleMessage(event: MessageEvent<BuilderPreviewChildMessage>) {
      if (event.origin !== window.location.origin) return

      const data = event.data

      if (!data || typeof data.type !== "string") return

      if (data.type === "builder-preview:text-overrides") {
        const item = stateRef.current.items.find(
          (entry) => entry.id === data.shapeId
        )

        if (!item) return

        dispatch({
          type: "update-item",
          id: item.id,
          patch: {
            overrides: {
              text: data.textOverrides,
              textStyles: data.textStyles,
            },
          },
        })
        return
      }

      if (data.type === "builder-preview:element-overrides") {
        const item = stateRef.current.items.find(
          (entry) => entry.id === data.shapeId
        )

        if (!item) return

        dispatch({
          type: "update-item",
          id: item.id,
          patch: { overrides: { elements: data.elementOverrides } },
        })
        return
      }

      if (data.type === "builder-preview:element-selected") {
        if (stateRef.current.editingId !== data.shapeId) return

        setSelectedElement(
          data.element ? { itemId: data.shapeId, ...data.element } : null
        )
        return
      }

      if (data.type === "builder-preview:request-exit") {
        if (stateRef.current.editingId === data.shapeId) {
          dispatch({ type: "set-editing", id: null })
        }
      }
    }

    window.addEventListener("message", handleMessage)

    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Snapshot history once when entering inline edit mode and drop any
  // element selection when leaving (or switching) edit mode.
  React.useEffect(() => {
    if (state.editingId && state.editingId !== lastEditingRef.current) {
      dispatch({ type: "begin-gesture" })
    }

    lastEditingRef.current = state.editingId

    setSelectedElement((element) =>
      element && element.itemId === state.editingId ? element : null
    )
  }, [state.editingId])

  /* --------------------------- Keyboard shortcuts --------------------------- */

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) return

      const meta = event.metaKey || event.ctrlKey
      const current = stateRef.current

      if (event.key === "Escape") {
        if (current.editingId) {
          dispatch({ type: "set-editing", id: null })
        } else {
          dispatch({ type: "set-selection", ids: [] })
        }
        return
      }

      if (meta && event.key.toLowerCase() === "s") {
        event.preventDefault()
        void save()
        return
      }

      if (meta && event.key.toLowerCase() === "z") {
        event.preventDefault()
        dispatch({ type: event.shiftKey ? "redo" : "undo" })
        return
      }

      if (meta && event.key.toLowerCase() === "y") {
        event.preventDefault()
        dispatch({ type: "redo" })
        return
      }

      if (meta && event.key.toLowerCase() === "d") {
        event.preventDefault()

        if (current.selection.length > 0) {
          dispatch({ type: "duplicate-ids", ids: current.selection })
        }
        return
      }

      if (meta && (event.key === "=" || event.key === "+")) {
        event.preventDefault()
        canvasRef.current?.zoomIn()
        return
      }

      if (meta && event.key === "-") {
        event.preventDefault()
        canvasRef.current?.zoomOut()
        return
      }

      if (meta && event.key === "0") {
        event.preventDefault()
        canvasRef.current?.zoomTo(1)
        return
      }

      if (!meta && event.shiftKey && event.key === "!") {
        canvasRef.current?.zoomToFit()
        return
      }

      if (meta && event.key.toLowerCase() === "c") {
        const items = current.items.filter((item) =>
          current.selection.includes(item.id)
        )

        if (items.length > 0) clipboardRef.current = items
        return
      }

      if (meta && event.key.toLowerCase() === "x") {
        const items = current.items.filter((item) =>
          current.selection.includes(item.id)
        )

        if (items.length > 0) {
          clipboardRef.current = items
          dispatch({ type: "delete-ids", ids: items.map((item) => item.id) })
        }
        return
      }

      if (meta && event.key.toLowerCase() === "v") {
        if (clipboardRef.current.length > 0) {
          dispatch({
            type: "paste-items",
            items: clipboardRef.current.map((item) => ({
              ...item,
              id: createId("item"),
              x: item.x + 32,
              y: item.y + 32,
              locked: false,
            })),
          })
        }
        return
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        if (current.selection.length > 0) {
          event.preventDefault()
          dispatch({ type: "delete-ids", ids: current.selection })
        }
        return
      }

      if (event.key === "[" || event.key === "]") {
        if (current.selection.length > 0) {
          dispatch({
            type: "reorder",
            ids: current.selection,
            direction: event.key === "]" ? "forward" : "backward",
          })
        }
        return
      }

      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        if (current.selection.length === 0) return

        event.preventDefault()

        const now = Date.now()

        if (now - nudgeGestureRef.current > 600) {
          dispatch({ type: "begin-gesture" })
        }

        nudgeGestureRef.current = now

        const step = event.shiftKey ? 10 : 1

        dispatch({
          type: "nudge",
          ids: current.selection,
          dx:
            event.key === "ArrowLeft"
              ? -step
              : event.key === "ArrowRight"
                ? step
                : 0,
          dy:
            event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0,
        })
        return
      }

      if (!meta) {
        const key = event.key.toLowerCase()

        if (key === "v") dispatch({ type: "set-tool", tool: "select" })
        if (key === "h") dispatch({ type: "set-tool", tool: "hand" })
        if (key === "f") dispatch({ type: "set-tool", tool: "frame" })
        if (key === "t") dispatch({ type: "set-tool", tool: "text" })
        if (key === "r") dispatch({ type: "set-tool", tool: "box" })
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [save])

  /* ------------------------------- Render ------------------------------- */

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background text-foreground">
      <StudioTopBar
        canSaveBuilds={canSaveBuilds}
        canRedo={state.future.length > 0}
        canUndo={state.past.length > 0}
        frames={state.pages}
        framework={framework}
        isExporting={isExporting}
        project={project}
        projects={projects}
        saveState={saveState}
        onCreateProject={() => void createProject()}
        onDeleteProject={(target) => void deleteProject(target)}
        onDuplicateProject={() => void createProject(project)}
        onExportZip={() => void exportZip()}
        onFrameworkChange={setFramework}
        onOpenCode={() => setCodeOpen(true)}
        onPreviewFrame={(frameId) => void openFramePreview(frameId)}
        onRedo={() => dispatch({ type: "redo" })}
        onRenameProject={(name) => {
          setProject((entry) => ({ ...entry, name }))
          setProjects((entries) =>
            entries.map((entry) =>
              entry.id === project.id ? { ...entry, name } : entry
            )
          )
          setSaveState("dirty")
        }}
        onSave={() => void save()}
        onSwitchProject={(target) => {
          if (target.id !== project.id) switchProject(target)
        }}
        onUndo={() => dispatch({ type: "undo" })}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <BuilderLibraryPanel
          catalog={catalog}
          dispatch={dispatch}
          state={state}
          onInsert={(item) => {
            const center = canvasRef.current?.getCenterWorld() ?? { x: 0, y: 0 }

            insertCatalogItem(item, center)
          }}
        />

        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
          <BuilderCanvas
            ref={canvasRef}
            camera={camera}
            dispatch={dispatch}
            fitKey={project.id}
            previewTheme={previewTheme}
            state={state}
            onCameraChange={setCamera}
            onDropCatalogItem={insertCatalogItem}
          />
        </div>

        <BuilderInspectorPanel
          dispatch={dispatch}
          selectedElement={selectedElement}
          state={state}
          onCopyItemCode={copyItemCode}
        />
      </div>

      {codeOpen ? (
        <BuilderCodeDialog
          document={document}
          isExporting={isExporting}
          projectId={project.id}
          projectName={project.name}
          onClose={() => setCodeOpen(false)}
          onExportZip={() => void exportZip()}
        />
      ) : null}
    </div>
  )
}

function useResolvedTheme(): ResolvedTheme {
  const [theme, setTheme] = React.useState<ResolvedTheme>("light")

  React.useEffect(() => {
    const root = document.documentElement
    const updateTheme = () => {
      setTheme(root.classList.contains("dark") ? "dark" : "light")
    }
    const observer = new MutationObserver(updateTheme)

    updateTheme()
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  return theme
}

/* -------------------------------- Top bar -------------------------------- */

function StudioTopBar({
  canSaveBuilds,
  project,
  projects,
  saveState,
  frames,
  framework,
  canUndo,
  canRedo,
  isExporting,
  onSwitchProject,
  onCreateProject,
  onDuplicateProject,
  onDeleteProject,
  onRenameProject,
  onFrameworkChange,
  onUndo,
  onRedo,
  onSave,
  onOpenCode,
  onPreviewFrame,
  onExportZip,
}: {
  canSaveBuilds: boolean
  project: BuilderProject
  projects: BuilderProject[]
  saveState: SaveState
  frames: BuilderProject["document"]["pages"]
  framework: BuilderFramework
  canUndo: boolean
  canRedo: boolean
  isExporting: boolean
  onSwitchProject: (project: BuilderProject) => void
  onCreateProject: () => void
  onDuplicateProject: () => void
  onDeleteProject: (project: BuilderProject) => void
  onRenameProject: (name: string) => void
  onFrameworkChange: (framework: BuilderFramework) => void
  onUndo: () => void
  onRedo: () => void
  onSave: () => void
  onOpenCode: () => void
  onPreviewFrame: (frameId: string) => void
  onExportZip: () => void
}) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [previewMenuOpen, setPreviewMenuOpen] = React.useState(false)

  return (
    <header className="relative z-40 flex h-12 shrink-0 items-center gap-2 border-b bg-background px-3">
      {/* Project switcher */}
      <div className="relative flex min-w-0 items-center">
        <input
          value={project.name}
          onChange={(event) => onRenameProject(event.target.value)}
          aria-label="Project name"
          className="h-8 w-44 truncate rounded-md border border-transparent bg-transparent px-2 text-sm font-medium outline-none transition-colors hover:border-border focus-visible:border-border"
        />
        <button
          type="button"
          aria-label="Open projects menu"
          className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <ChevronDown className="size-3.5" />
        </button>

        {menuOpen ? (
          <>
            <div
              className="fixed inset-0 z-40"
              aria-hidden
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-lg border bg-background p-1 shadow-xl">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {canSaveBuilds ? "Saved builds" : "Local draft"}
                </span>
                {canSaveBuilds ? (
                  <button
                    type="button"
                    className="flex h-6 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => {
                      onCreateProject()
                      setMenuOpen(false)
                    }}
                  >
                    <Plus className="size-3" />
                    New
                  </button>
                ) : null}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {projects.map((entry) => (
                  <div
                    key={entry.id}
                    data-active={entry.id === project.id}
                    className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted data-[active=true]:bg-muted/70"
                  >
                    <Folder className="size-3.5 shrink-0 text-muted-foreground" />
                    <button
                      type="button"
                      className="min-w-0 flex-1 text-left"
                      onClick={() => {
                        onSwitchProject(entry)
                        setMenuOpen(false)
                      }}
                    >
                      <span className="block truncate text-xs font-medium">
                        {entry.name}
                      </span>
                      <span className="block text-[10px] text-muted-foreground">
                        Edited {formatRelativeTime(entry.updatedAt)}
                      </span>
                    </button>
                    {entry.id === project.id ? (
                      <Check className="size-3.5 shrink-0 text-blue-500" />
                    ) : canSaveBuilds ? (
                      <button
                        type="button"
                        aria-label={`Delete ${entry.name}`}
                        className="hidden shrink-0 text-muted-foreground hover:text-destructive group-hover:block"
                        onClick={() => onDeleteProject(entry)}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
              {canSaveBuilds ? (
                <div className="mt-1 border-t pt-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                  onClick={() => {
                    onDuplicateProject()
                    setMenuOpen(false)
                  }}
                >
                  <Copy className="size-3.5 text-muted-foreground" />
                  Duplicate current build
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                  onClick={() => {
                    onDeleteProject(project)
                    setMenuOpen(false)
                  }}
                >
                  <Trash2 className="size-3.5" />
                  Delete current build
                </button>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      {/* Save status */}
      <button
        type="button"
        onClick={onSave}
        title={canSaveBuilds ? "Save — ⌘S" : "Save locally — ⌘S"}
        className={cn(
          "hidden shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors hover:bg-muted sm:flex",
          saveState === "error" ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {saveState === "saving" ? (
          <>
            <LoaderCircle className="size-3 animate-spin" /> Saving…
          </>
        ) : saveState === "dirty" ? (
          canSaveBuilds ? "Unsaved changes" : "Local changes"
        ) : saveState === "error" ? (
          canSaveBuilds ? "Save failed — retry" : "Local save failed — retry"
        ) : !canSaveBuilds ? (
          <>
            <Check className="size-3" /> Saved locally
          </>
        ) : (
          <>
            <Check className="size-3" /> Saved
          </>
        )}
      </button>

      <div className="flex-1" />

      {/* Undo / redo */}
      <div className="hidden items-center gap-0.5 md:flex">
        <TopBarIconButton disabled={!canUndo} label="Undo — ⌘Z" onClick={onUndo}>
          <Undo2 className="size-4" />
        </TopBarIconButton>
        <TopBarIconButton disabled={!canRedo} label="Redo — ⇧⌘Z" onClick={onRedo}>
          <Redo2 className="size-4" />
        </TopBarIconButton>
      </div>

      <div className="hidden h-5 w-px bg-border md:block" />

      <select
        value={framework}
        onChange={(event) => {
          if (isBuilderFramework(event.target.value)) {
            onFrameworkChange(event.target.value)
          }
        }}
        aria-label="Export framework"
        className="h-8 rounded-md border bg-background px-2 text-xs font-medium"
      >
        <option value="next">Next.js</option>
        <option value="vite">Vite</option>
        <option value="react">React</option>
      </select>

      <div className="relative">
        <button
          type="button"
          disabled={frames.length === 0}
          className="flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          onClick={() => {
            if (frames.length === 1 && frames[0]) {
              onPreviewFrame(frames[0].id)
              return
            }

            setPreviewMenuOpen((open) => !open)
          }}
        >
          <Eye className="size-3.5" />
          Preview
          {frames.length > 1 ? <ChevronDown className="size-3" /> : null}
        </button>

        {previewMenuOpen && frames.length > 1 ? (
          <>
            <div
              className="fixed inset-0 z-40"
              aria-hidden
              onClick={() => setPreviewMenuOpen(false)}
            />
            <div className="absolute right-0 top-full z-50 mt-1.5 w-56 rounded-lg border bg-background p-1 shadow-xl">
              <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Preview frame
              </div>
              <div className="max-h-72 overflow-y-auto">
                {frames.map((frame) => (
                  <button
                    key={frame.id}
                    type="button"
                    className="flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors hover:bg-muted"
                    onClick={() => {
                      onPreviewFrame(frame.id)
                      setPreviewMenuOpen(false)
                    }}
                  >
                    <span className="min-w-0 flex-1 truncate">{frame.name}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {Math.round(frame.w)}x{Math.round(frame.h)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <button
        type="button"
        className="flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors hover:bg-muted"
        onClick={onOpenCode}
      >
        <FileCode className="size-3.5" />
        Code
      </button>

      <button
        type="button"
        disabled={isExporting}
        className="flex h-8 items-center gap-2 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        onClick={onExportZip}
      >
        {isExporting ? (
          <LoaderCircle className="size-3.5 animate-spin" />
        ) : (
          <Download className="size-3.5" />
        )}
        Export
      </button>
    </header>
  )
}

function TopBarIconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

/* ------------------------------- Helpers ------------------------------- */

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "loveui-build"
  )
}

function toPascalCase(value: string) {
  return value
    .split(/[-_]/)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("")
}

function getAssetImportPath(item: BuilderDocumentItem) {
  return `love-ui/${item.assetCollection ?? "icons"}`
}

function getBuilderPreviewSnapshotKey(projectId: string) {
  return `loveui:builder:preview:${projectId}`
}

function getBuilderPreviewChannelName(projectId: string) {
  return `loveui:builder:preview-channel:${projectId}`
}

function publishBuilderPreviewSnapshot({
  projectId,
  projectName,
  document,
}: {
  projectId: string
  projectName: string
  document: BuilderDocument
}) {
  const snapshot = {
    type: "builder-preview:snapshot",
    projectId,
    projectName,
    document,
    updatedAt: new Date().toISOString(),
  }

  try {
    window.localStorage.setItem(
      getBuilderPreviewSnapshotKey(projectId),
      JSON.stringify(snapshot)
    )
  } catch {
    // Preview sync is best-effort; keep Builder usable if storage is unavailable.
  }

  try {
    if (!("BroadcastChannel" in window)) return

    const channel = new BroadcastChannel(getBuilderPreviewChannelName(projectId))

    channel.postMessage(snapshot)
    channel.close()
  } catch {
    // Storage events still provide a fallback for browsers without channels.
  }
}

function formatRelativeTime(iso: string) {
  const delta = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(delta / 60_000)

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.round(minutes / 60)

  if (hours < 24) return `${hours}h ago`

  const days = Math.round(hours / 24)

  if (days < 30) return `${days}d ago`

  return new Date(iso).toLocaleDateString()
}
