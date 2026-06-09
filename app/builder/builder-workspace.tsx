"use client"

import * as React from "react"
import {
  Box,
  Download,
  FileCode,
  Grid2x2,
  Layers,
  Lock,
  LockOpen,
  Menu,
  Plus,
  Redo2,
  Save,
  Search,
  Trash2,
  Undo2,
  X,
  ZoomIn,
  ZoomOut,
} from "love-ui/icons"
import {
  createShapeId,
  HTMLContainer,
  Rectangle2d,
  resizeBox,
  ShapeUtil,
  T,
  Tldraw,
  type Editor,
  useEditor,
  useValue,
} from "tldraw"
import "tldraw/tldraw.css"

import { cn } from "@/lib/cn"
import {
  createDefaultBuilderDocument,
  isBuilderFramework,
  type BuilderCatalogItem,
  type BuilderDocument,
  type BuilderDocumentItem,
  type BuilderFramework,
  type BuilderProject,
  type BuilderRegistryType,
} from "@/lib/builder/types"
import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"

type BuilderCatalog = {
  blocks: BuilderCatalogItem[]
  components: BuilderCatalogItem[]
  icons: BuilderCatalogItem[]
}

type LoveUIShapeProps = {
  w: number
  h: number
  title: string
  description: string
  registryName: string
  registryType: BuilderRegistryType
  previewUrl: string
  textOverridesJson: string
  textStylesJson: string
  label: string
  className: string
  notes: string
}

type LoveUIShape = {
  id: string
  type: "loveui-item"
  x: number
  y: number
  rotation: number
  isLocked?: boolean
  props: LoveUIShapeProps
}

class LoveUIItemShapeUtil extends ShapeUtil<any> {
  static override type = "loveui-item" as const
  static override props = {
    w: T.number,
    h: T.number,
    title: T.string,
    description: T.string,
    registryName: T.string,
    registryType: T.literalEnum(
      "registry:block",
      "registry:ui",
      "registry:example",
      "asset:icon"
    ),
    previewUrl: T.string,
    textOverridesJson: T.string,
    textStylesJson: T.string,
    label: T.string,
    className: T.string,
    notes: T.string,
  } as any

  override canResize = () => true

  getDefaultProps(): LoveUIShapeProps {
    return {
      w: 360,
      h: 220,
      title: "LoveUI item",
      description: "Registry item",
      registryName: "",
      registryType: "registry:block",
      previewUrl: "",
      textOverridesJson: "{}",
      textStylesJson: "{}",
      label: "",
      className: "",
      notes: "",
    }
  }

  getGeometry(shape: LoveUIShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  component(shape: LoveUIShape) {
    return (
      <HTMLContainer>
        <div
          className="h-full w-full overflow-hidden rounded-md border border-neutral-300 bg-white text-neutral-950 shadow-sm dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50"
          style={{ width: shape.props.w, height: shape.props.h }}
        >
          {shape.props.registryType === "asset:icon" ? (
            <div className="grid h-full w-full place-items-center bg-background p-4">
              {shape.props.previewUrl ? (
                <img
                  alt={shape.props.title}
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                  src={shape.props.previewUrl}
                />
              ) : (
                <Grid2x2 className="size-10 text-muted-foreground" />
              )}
            </div>
          ) : (
            <BuilderPreviewFrame shape={shape} />
          )}
        </div>
      </HTMLContainer>
    )
  }

  indicator(shape: LoveUIShape) {
    return <rect width={shape.props.w} height={shape.props.h} rx={8} ry={8} />
  }

  getIndicatorPath() {
    return undefined
  }

  override onResize(shape: any, info: any) {
    return resizeBox(shape, info)
  }
}

const shapeUtils = [LoveUIItemShapeUtil]

const hiddenTldrawComponents = {
  ActionsMenu: null,
  HelpMenu: null,
  MainMenu: null,
  NavigationPanel: null,
  PageMenu: null,
  StylePanel: null,
  Toolbar: null,
} as const

type PreviewEditMessage = {
  type: "builder-preview:text-overrides"
  shapeId: string
  textOverrides?: Record<string, string>
  textStyles?: Record<string, { fontSize?: number }>
}

function BuilderPreviewFrame({ shape }: { shape: LoveUIShape }) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const editor = useEditor()
  const isSelected = useValue(
    `loveui-item-selected-${shape.id}`,
    () => editor.getSelectedShapeIds().includes(shape.id as any),
    [editor, shape.id]
  )

  const postCurrentOverrides = React.useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "builder-preview:apply-overrides",
        shapeId: shape.id,
        textOverrides: parseJsonRecord(shape.props.textOverridesJson),
        textStyles: parseJsonRecord(shape.props.textStylesJson),
      },
      window.location.origin
    )
  }, [shape.id, shape.props.textOverridesJson, shape.props.textStylesJson])

  React.useEffect(() => {
    postCurrentOverrides()
  }, [postCurrentOverrides])

  return (
    <iframe
      ref={iframeRef}
      title={shape.props.title}
      src={`/builder/preview/${encodeURIComponent(
        shape.props.registryName
      )}?shapeId=${encodeURIComponent(shape.id)}`}
      className="h-full w-full border-0 bg-background"
      style={{ pointerEvents: isSelected ? "auto" : "none" }}
      onLoad={postCurrentOverrides}
    />
  )
}

export function BuilderWorkspace({
  initialProject,
  initialProjects,
}: {
  initialProject: BuilderProject
  initialProjects: BuilderProject[]
}) {
  const [project, setProject] = React.useState(initialProject)
  const [projects, setProjects] = React.useState(() =>
    initialProjects.length ? initialProjects : [initialProject]
  )
  const [catalog, setCatalog] = React.useState<BuilderCatalog>({
    blocks: [],
    components: [],
    icons: [],
  })
  const [catalogState, setCatalogState] = React.useState({
    tab: "blocks" as keyof BuilderCatalog,
    query: "",
    category: "all",
  })
  const [editor, setEditor] = React.useState<Editor | null>(null)
  const [document, setDocument] = React.useState<BuilderDocument>(
    initialProject.document
  )
  const [selectedItem, setSelectedItem] =
    React.useState<BuilderDocumentItem | null>(null)
  const [saveState, setSaveState] = React.useState<"saved" | "dirty" | "saving">(
    "saved"
  )
  const [isExporting, setIsExporting] = React.useState(false)
  const [leftOpen, setLeftOpen] = React.useState(false)
  const [rightOpen, setRightOpen] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false

    fetch("/api/builder/registry")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load registry catalog.")
        return response.json() as Promise<BuilderCatalog>
      })
      .then((nextCatalog) => {
        if (!cancelled) setCatalog(nextCatalog)
      })
      .catch(() => {
        if (!cancelled) {
          setCatalog({ blocks: [], components: [], icons: [] })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    if (!editor) return

    hydrateCanvas(editor, project)
    const interval = window.setInterval(() => {
      const nextDocument = readDocumentFromEditor(editor, project.document)
      setDocument(nextDocument)
      setSelectedItem(readSelectedItem(editor, nextDocument))
    }, 400)

    return () => window.clearInterval(interval)
  }, [editor, project])

  React.useEffect(() => {
    if (!editor) return

    const activeEditor = editor

    function handlePreviewMessage(event: MessageEvent<PreviewEditMessage>) {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== "builder-preview:text-overrides") return

      const shape = activeEditor.getShape(event.data.shapeId as any) as
        | LoveUIShape
        | undefined

      if (!shape || shape.type !== "loveui-item") return

      const textOverridesJson = stableJson(event.data.textOverrides ?? {})
      const textStylesJson = stableJson(event.data.textStyles ?? {})

      activeEditor.updateShapes([
        {
          id: shape.id,
          type: "loveui-item",
          props: {
            ...shape.props,
            textOverridesJson,
            textStylesJson,
          },
        },
      ] as any)
      setSelectedItem((current) =>
        current?.id === shape.id
          ? {
              ...current,
              overrides: {
                ...current.overrides,
                text: event.data.textOverrides,
                textStyles: event.data.textStyles,
              },
            }
          : current
      )
      markDirty()
    }

    window.addEventListener("message", handlePreviewMessage)

    return () => window.removeEventListener("message", handlePreviewMessage)
  }, [editor])

  function markDirty() {
    setSaveState((current) => (current === "saving" ? current : "dirty"))
  }

  async function saveProject() {
    if (!editor) return false

    const nextDocument = readDocumentFromEditor(editor, document)
    setSaveState("saving")

    const response = await fetch(`/api/builder/projects/${project.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: project.name,
        framework: document.framework,
        document: nextDocument,
        tldrawSnapshot: editor.getSnapshot(),
      }),
    })

    if (!response.ok) {
      setSaveState("dirty")
      return false
    }

    const body = (await response.json()) as { project: BuilderProject }
    setProject(body.project)
    setProjects((current) =>
      current.map((item) => (item.id === body.project.id ? body.project : item))
    )
    setDocument(body.project.document)
    setSaveState("saved")

    return true
  }

  async function createProject() {
    const response = await fetch("/api/builder/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Untitled builder project", framework: "next" }),
    })

    if (!response.ok) return

    const body = (await response.json()) as { project: BuilderProject }
    setProjects((current) => [body.project, ...current])
    setProject(body.project)
    setDocument(body.project.document)
    setSaveState("saved")
  }

  async function exportZip() {
    setIsExporting(true)

    const saved = await saveProject()

    if (!saved) {
      setIsExporting(false)
      return
    }

    const response = await fetch(`/api/builder/projects/${project.id}/export`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ framework: document.framework }),
    })

    setIsExporting(false)

    if (!response.ok) return

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const anchor = window.document.createElement("a")
    anchor.href = url
    anchor.download = `${project.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "loveui-builder"}.zip`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function updateProjectName(value: string) {
    setProject((current) => ({ ...current, name: value }))
    markDirty()
  }

  function updateFramework(value: string) {
    if (!isBuilderFramework(value)) return

    setDocument((current) => ({ ...current, framework: value }))
    markDirty()
  }

  function updateSelectedItem(patch: Partial<BuilderDocumentItem>) {
    if (!editor || !selectedItem) return

    const shape = editor.getShape(selectedItem.id as any) as LoveUIShape | undefined

    if (!shape || shape.type !== "loveui-item") return

    const next = {
      ...selectedItem,
      ...patch,
      overrides: {
        ...selectedItem.overrides,
        ...patch.overrides,
      },
    }

    editor.updateShapes([
      {
        id: shape.id,
        type: "loveui-item",
        x: next.x,
        y: next.y,
        rotation: next.rotation,
        isLocked: next.locked,
        props: {
          ...shape.props,
          w: next.w,
          h: next.h,
          previewUrl: next.previewUrl ?? shape.props.previewUrl,
          textOverridesJson: stableJson(next.overrides?.text ?? {}),
          textStylesJson: stableJson(next.overrides?.textStyles ?? {}),
          label: next.overrides?.label ?? "",
          className: next.overrides?.className ?? "",
          notes: next.overrides?.notes ?? "",
        },
      },
    ] as any)
    setSelectedItem(next)
    markDirty()
  }

  function deleteSelectedItem() {
    if (!editor || !selectedItem) return

    editor.deleteShapes([selectedItem.id as any])
    setSelectedItem(null)
    markDirty()
  }

  function duplicateSelectedItem() {
    if (!editor || !selectedItem) return

    editor.duplicateShapes([selectedItem.id as any], { x: 24, y: 24 })
    markDirty()
  }

  function addCatalogItem(item: BuilderCatalogItem) {
    if (!editor) return

    createLoveUIShape(editor, item, { x: 80 + document.items.length * 24, y: 80 })
    markDirty()
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (!editor) return

    const data = event.dataTransfer.getData("application/x-loveui-builder-item")
    if (!data) return

    const item = JSON.parse(data) as BuilderCatalogItem
    const point = editor.screenToPage({ x: event.clientX, y: event.clientY })
    createLoveUIShape(editor, item, point)
    markDirty()
  }

  const visibleItems = filterCatalogItems(catalog[catalogState.tab], catalogState)
  const categories = getCategories(catalog[catalogState.tab])
  const activePage = document.pages[0] ?? createDefaultBuilderDocument().pages[0]

  return (
    <main className="flex h-[calc(100vh-3.5rem)] min-h-0 flex-col overflow-hidden bg-neutral-100 text-foreground">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-3">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setLeftOpen(true)}
          aria-label="Open registry"
        >
          <Menu />
        </Button>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Input
            value={project.name}
            onChange={(event) => updateProjectName(event.target.value)}
            className="h-9 max-w-[240px] border-transparent bg-transparent px-1 text-sm font-semibold shadow-none focus-visible:border-border"
            aria-label="Project name"
          />
          <select
            value={project.id}
            onChange={(event) => {
              const nextProject = projects.find((item) => item.id === event.target.value)
              if (nextProject) {
                setProject(nextProject)
                setDocument(nextProject.document)
                setSaveState("saved")
              }
            }}
            className="hidden h-9 max-w-[220px] rounded-md border bg-background px-2 text-sm text-muted-foreground md:block"
            aria-label="Project"
          >
            {projects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <Button type="button" variant="outline" size="sm" onClick={createProject}>
            <Plus />
            New
          </Button>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          <BuilderIconButton label="Undo" onClick={() => editor?.undo()}>
            <Undo2 />
          </BuilderIconButton>
          <BuilderIconButton label="Redo" onClick={() => editor?.redo()}>
            <Redo2 />
          </BuilderIconButton>
          <BuilderIconButton label="Zoom out" onClick={() => editor?.zoomOut()}>
            <ZoomOut />
          </BuilderIconButton>
          <BuilderIconButton label="Zoom in" onClick={() => editor?.zoomIn()}>
            <ZoomIn />
          </BuilderIconButton>
        </div>
        <select
          value={document.framework}
          onChange={(event) => updateFramework(event.target.value)}
          className="h-9 rounded-md border bg-background px-2 text-sm"
          aria-label="Export framework"
        >
          <option value="next">Next.js</option>
          <option value="vite">Vite</option>
          <option value="react">React</option>
        </select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={saveProject}
          disabled={saveState === "saving"}
        >
          <Save />
          {saveState === "saving" ? "Saving" : saveState === "dirty" ? "Save" : "Saved"}
        </Button>
        <Button type="button" size="sm" onClick={exportZip} disabled={isExporting}>
          <Download />
          {isExporting ? "Exporting" : "Export ZIP"}
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setRightOpen(true)}
          aria-label="Open inspector"
        >
          <FileCode />
        </Button>
      </header>

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <BuilderSidebar
          catalogState={catalogState}
          categories={categories}
          items={visibleItems}
          open={leftOpen}
          onAddItem={addCatalogItem}
          onClose={() => setLeftOpen(false)}
          onStateChange={setCatalogState}
        />

        <section
          className="relative min-w-0 flex-1 overflow-hidden bg-[#f2f3f5]"
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
        >
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-md border bg-background/95 px-3 py-2 shadow-sm backdrop-blur">
            <div className="text-xs font-semibold text-foreground">Page</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {activePage.name} · {Math.round(activePage.w)} x {Math.round(activePage.h)}
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-md border bg-background/95 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
            Drag registry items onto the page frame.
          </div>
          <Tldraw
            components={hiddenTldrawComponents}
            onMount={setEditor}
            shapeUtils={shapeUtils as any}
          />
        </section>

        <BuilderInspector
          document={document}
          open={rightOpen}
          selectedItem={selectedItem}
          onClose={() => setRightOpen(false)}
          onDelete={deleteSelectedItem}
          onDuplicate={duplicateSelectedItem}
          onUpdate={updateSelectedItem}
        />
      </div>
    </main>
  )
}

function BuilderSidebar({
  catalogState,
  categories,
  items,
  open,
  onAddItem,
  onClose,
  onStateChange,
}: {
  catalogState: { tab: keyof BuilderCatalog; query: string; category: string }
  categories: string[]
  items: BuilderCatalogItem[]
  open: boolean
  onAddItem: (item: BuilderCatalogItem) => void
  onClose: () => void
  onStateChange: React.Dispatch<
    React.SetStateAction<{ tab: keyof BuilderCatalog; query: string; category: string }>
  >
}) {
  return (
    <aside
      className={cn(
        "z-40 flex h-full w-80 shrink-0 flex-col border-r bg-background",
        "fixed inset-y-0 left-0 shadow-xl transition-transform lg:relative lg:inset-auto lg:translate-x-0 lg:shadow-none",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div>
          <h2 className="text-sm font-semibold">LoveUI Registry</h2>
          <p className="text-xs text-muted-foreground">Blocks, components, icons</p>
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={onClose}
          aria-label="Close registry"
        >
          <X />
        </Button>
      </div>
      <div className="border-b p-3">
        <div className="grid grid-cols-3 rounded-md border bg-muted/40 p-1">
          {(["blocks", "components", "icons"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              data-active={catalogState.tab === tab}
              className="h-8 rounded px-2 text-xs font-medium capitalize text-muted-foreground data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm"
              onClick={() =>
                onStateChange((current) => ({ ...current, tab, category: "all" }))
              }
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md border bg-background px-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={catalogState.query}
            onChange={(event) =>
              onStateChange((current) => ({ ...current, query: event.target.value }))
            }
            placeholder="Search registry"
            className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <select
          value={catalogState.category}
          onChange={(event) =>
            onStateChange((current) => ({ ...current, category: event.target.value }))
          }
          className="mt-3 h-9 w-full rounded-md border bg-background px-2 text-sm"
          aria-label="Registry category"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatLabel(category)}
            </option>
          ))}
        </select>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-3">
        <div className="grid gap-2">
          {items.map((item) => (
            <button
              key={`${item.type}:${item.name}`}
              type="button"
              draggable
              onClick={() => onAddItem(item)}
              onDragStart={(event) => {
                event.dataTransfer.setData(
                  "application/x-loveui-builder-item",
                  JSON.stringify(item)
                )
              }}
              className="group rounded-md border bg-background p-3 text-left shadow-sm transition-colors hover:border-foreground/30"
            >
              <div className="flex items-start gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-md border bg-muted">
                  {item.type === "registry:block" ? (
                    <Layers className="size-4" />
                  ) : item.type === "asset:icon" ? (
                    <Grid2x2 className="size-4" />
                  ) : (
                    <Box className="size-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{item.title}</div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-2 text-[11px] font-medium text-muted-foreground">
                    {formatLabel(item.category)}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

function BuilderInspector({
  document,
  open,
  selectedItem,
  onClose,
  onDelete,
  onDuplicate,
  onUpdate,
}: {
  document: BuilderDocument
  open: boolean
  selectedItem: BuilderDocumentItem | null
  onClose: () => void
  onDelete: () => void
  onDuplicate: () => void
  onUpdate: (patch: Partial<BuilderDocumentItem>) => void
}) {
  return (
    <aside
      className={cn(
        "z-40 flex h-full w-80 shrink-0 flex-col border-l bg-background",
        "fixed inset-y-0 right-0 shadow-xl transition-transform lg:relative lg:inset-auto lg:translate-x-0 lg:shadow-none",
        open ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div>
          <h2 className="text-sm font-semibold">Properties</h2>
          <p className="text-xs text-muted-foreground">
            {selectedItem ? selectedItem.title : `${document.items.length} items`}
          </p>
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={onClose}
          aria-label="Close inspector"
        >
          <X />
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {!selectedItem ? (
          <div className="rounded-md border border-dashed p-4 text-sm leading-6 text-muted-foreground">
            Select a LoveUI item on the canvas to edit its position, size, and
            export metadata.
          </div>
        ) : (
          <div className="grid gap-5">
            <section>
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                Registry
              </h3>
              <div className="mt-3 rounded-md border p-3">
                <div className="text-sm font-medium">{selectedItem.registryName}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {selectedItem.registryType}
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                Layout
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <NumberField label="X" value={selectedItem.x} onChange={(x) => onUpdate({ x })} />
                <NumberField label="Y" value={selectedItem.y} onChange={(y) => onUpdate({ y })} />
                <NumberField label="W" value={selectedItem.w} onChange={(w) => onUpdate({ w })} />
                <NumberField label="H" value={selectedItem.h} onChange={(h) => onUpdate({ h })} />
              </div>
            </section>
            <section>
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                Overrides
              </h3>
              <div className="mt-3 grid gap-3">
                <TextField
                  label="Label"
                  value={selectedItem.overrides?.label ?? ""}
                  onChange={(label) => onUpdate({ overrides: { label } })}
                />
                <TextField
                  label="Class"
                  value={selectedItem.overrides?.className ?? ""}
                  onChange={(className) => onUpdate({ overrides: { className } })}
                />
                <label className="grid gap-1.5 text-sm">
                  <span className="text-xs font-medium text-muted-foreground">Notes</span>
                  <textarea
                    value={selectedItem.overrides?.notes ?? ""}
                    onChange={(event) =>
                      onUpdate({ overrides: { notes: event.target.value } })
                    }
                    className="min-h-20 rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
              </div>
            </section>
            <section className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" onClick={onDuplicate}>
                <Plus />
                Duplicate
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onUpdate({ locked: !selectedItem.locked })}
              >
                {selectedItem.locked ? <LockOpen /> : <Lock />}
                {selectedItem.locked ? "Unlock" : "Lock"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="col-span-2"
                onClick={onDelete}
              >
                <Trash2 />
                Delete
              </Button>
            </section>
          </div>
        )}
      </div>
    </aside>
  )
}

function BuilderIconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </Button>
  )
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type="number"
        value={Math.round(value)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  )
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  )
}

function hydrateCanvas(editor: Editor, project: BuilderProject) {
  editor.deleteShapes(editor.getCurrentPageShapesSorted().map((shape) => shape.id))

  if (project.tldrawSnapshot) {
    try {
      editor.loadSnapshot(project.tldrawSnapshot as ReturnType<Editor["getSnapshot"]>)
      return
    } catch {
      editor.deleteShapes(editor.getCurrentPageShapesSorted().map((shape) => shape.id))
    }
  }

  const page = project.document.pages[0] ?? createDefaultBuilderDocument().pages[0]
  editor.createShapes([
    {
      id: createShapeId("home-frame"),
      type: "frame",
      x: page.x,
      y: page.y,
      props: { w: page.w, h: page.h, name: page.name },
      isLocked: true,
    },
    ...project.document.items.map((item) => documentItemToShape(item)),
  ] as any)
  editor.zoomToFit()
}

function documentItemToShape(item: BuilderDocumentItem) {
  return {
    id: item.id,
    type: "loveui-item",
    x: item.x,
    y: item.y,
    rotation: item.rotation,
    opacity: 1,
    isLocked: Boolean(item.locked),
    props: {
      w: item.w,
      h: item.h,
      title: item.title,
      description: item.overrides?.notes || "LoveUI registry item",
      registryName: item.registryName,
      registryType: item.registryType,
      previewUrl: item.previewUrl ?? "",
      textOverridesJson: stableJson(item.overrides?.text ?? {}),
      textStylesJson: stableJson(item.overrides?.textStyles ?? {}),
      label: item.overrides?.label ?? "",
      className: item.overrides?.className ?? "",
      notes: item.overrides?.notes ?? "",
    },
  }
}

function createLoveUIShape(
  editor: Editor,
  item: BuilderCatalogItem,
  point: { x: number; y: number }
) {
  const id = createShapeId()
  const size = getDefaultShapeSize(item)

  editor.createShapes([
    {
      id,
      type: "loveui-item",
      x: point.x,
      y: point.y,
      props: {
        w: size.w,
        h: size.h,
        title: item.title,
        description: item.description,
        registryName: item.name,
        registryType: item.type,
        previewUrl: item.previewUrl ?? "",
        textOverridesJson: "{}",
        textStylesJson: "{}",
        label: "",
        className: "",
        notes: "",
      },
    },
  ] as any)
  editor.select(id as any)
}

function readDocumentFromEditor(
  editor: Editor,
  fallback: BuilderDocument
): BuilderDocument {
  const shapes = editor.getCurrentPageShapesSorted()
  const frame = shapes.find((shape) => shape.type === "frame")
  const items = shapes
    .filter((shape) => (shape as { type: string }).type === "loveui-item")
    .map((shape) => shape as unknown as LoveUIShape)
    .map((shape, index) => ({
      id: shape.id,
      registryName: shape.props.registryName,
      registryType: shape.props.registryType,
      title: shape.props.title,
      previewUrl: shape.props.previewUrl || undefined,
      x: shape.x,
      y: shape.y,
      w: shape.props.w,
      h: shape.props.h,
      rotation: shape.rotation,
      zIndex: index,
      locked: shape.isLocked,
      overrides: {
        label: shape.props.label || undefined,
        className: shape.props.className || undefined,
        notes: shape.props.notes || undefined,
        text: parseJsonRecord(shape.props.textOverridesJson),
        textStyles: parseJsonRecord(shape.props.textStylesJson),
      },
    }))

  return {
    ...fallback,
    pages: [
      {
        id: fallback.pages[0]?.id ?? "page-home",
        name:
          frame && "name" in frame.props
            ? String((frame.props as { name?: string }).name || "Home")
            : "Home",
        x: frame?.x ?? fallback.pages[0]?.x ?? 0,
        y: frame?.y ?? fallback.pages[0]?.y ?? 0,
        w:
          frame && "w" in frame.props
            ? Number((frame.props as { w?: number }).w)
            : fallback.pages[0]?.w ?? 1200,
        h:
          frame && "h" in frame.props
            ? Number((frame.props as { h?: number }).h)
            : fallback.pages[0]?.h ?? 900,
      },
    ],
    items,
  }
}

function readSelectedItem(editor: Editor, document: BuilderDocument) {
  const selectedId = editor.getSelectedShapeIds()[0]

  if (!selectedId) return null

  return document.items.find((item) => item.id === selectedId) ?? null
}

function filterCatalogItems(
  items: BuilderCatalogItem[],
  state: { query: string; category: string }
) {
  const query = state.query.trim().toLowerCase()

  return items.filter((item) => {
    if (state.category !== "all" && item.category !== state.category) return false
    if (!query) return true

    return `${item.title} ${item.name} ${item.description} ${item.category}`
      .toLowerCase()
      .includes(query)
  })
}

function getCategories(items: BuilderCatalogItem[]) {
  return Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
    a.localeCompare(b)
  )
}

function getDefaultShapeSize(item: BuilderCatalogItem) {
  if (item.type === "registry:block") return { w: 720, h: 420 }
  if (item.type === "asset:icon") return { w: 96, h: 96 }

  return { w: 360, h: 220 }
}

function formatLabel(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function parseJsonRecord(value: string | undefined) {
  if (!value) return {}

  try {
    const parsed = JSON.parse(value) as unknown

    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, any>
      : {}
  } catch {
    return {}
  }
}

function stableJson(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "{}"

  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, entry]) => {
      if (entry === undefined || entry === null || entry === "") return false
      if (typeof entry === "object" && Object.keys(entry).length === 0) return false

      return true
    })
    .sort(([a], [b]) => a.localeCompare(b))

  return entries.length ? JSON.stringify(Object.fromEntries(entries)) : "{}"
}
