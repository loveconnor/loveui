"use client"

import * as React from "react"
import {
  Check,
  ChevronRight,
  Copy,
  Download,
  FileCode,
  FileText,
  Folder,
  FolderOpen,
  LoaderCircle,
  X,
} from "love-ui/icons"

import { cn } from "@/lib/cn"
import { CodeblockShiki } from "@/components/code-block"
import type { BuilderDocument } from "@/lib/builder/types"

type GeneratedFile = {
  path: string
  content: string
}

type FileTreeNode = {
  id: string
  name: string
  path: string
  type: "folder" | "file"
  children: FileTreeNode[]
}

export function BuilderCodeDialog({
  projectId,
  projectName,
  document,
  isExporting,
  onExportZip,
  onClose,
}: {
  projectId: string
  projectName: string
  document: BuilderDocument
  isExporting: boolean
  onExportZip: () => void
  onClose: () => void
}) {
  const [files, setFiles] = React.useState<GeneratedFile[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [activePath, setActivePath] = React.useState<string | null>(null)
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    () => new Set()
  )

  React.useEffect(() => {
    let cancelled = false

    setFiles(null)
    setError(null)

    fetch(`/api/builder/projects/${projectId}/code`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        document,
        framework: document.framework,
        projectName,
      }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to generate code.")

        return (await response.json()) as { files: GeneratedFile[] }
      })
      .then((body) => {
        if (cancelled) return

        setFiles(body.files)
        setExpandedFolders(new Set(getFolderIds(buildFileTree(body.files))))

        const entry =
          body.files.find((file) => /(^|\/)(page|App)\.tsx$/.test(file.path)) ??
          body.files[0]

        setActivePath(entry?.path ?? null)
      })
      .catch((cause: Error) => {
        if (!cancelled) setError(cause.message)
      })

    return () => {
      cancelled = true
    }
  }, [projectId, document])

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const activeFile = files?.find((file) => file.path === activePath) ?? null
  const fileTree = React.useMemo(() => buildFileTree(files ?? []), [files])
  const activeLanguage = getLanguageFromPath(activeFile?.path)

  async function copy(path: string, content: string) {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedPath(path)
      window.setTimeout(() => setCopiedPath(null), 1600)
    } catch {
      // Clipboard unavailable.
    }
  }

  function toggleFolder(id: string) {
    setExpandedFolders((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Generated code"
    >
      <div
        className="flex h-[min(720px,90vh)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2.5">
            <FileCode className="size-4 text-muted-foreground" />
            <div>
              <h2 className="text-sm font-semibold">Code — {projectName}</h2>
              <p className="text-[11px] text-muted-foreground">
                {document.framework === "next"
                  ? "Next.js"
                  : document.framework === "vite"
                    ? "Vite + React"
                    : "React"}{" "}
                project · {files?.length ?? "…"} files
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
              disabled={isExporting}
              onClick={onExportZip}
            >
              {isExporting ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" />
              )}
              Download ZIP
            </button>
            <button
              type="button"
              aria-label="Close"
              className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={onClose}
            >
              <X className="size-4" />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <nav
            className="w-72 shrink-0 overflow-y-auto border-r bg-sidebar p-2 text-sidebar-foreground"
            aria-label="Generated files"
          >
            {!files && !error ? (
              <div className="flex items-center gap-2 px-2 py-4 text-xs text-muted-foreground">
                <LoaderCircle className="size-3.5 animate-spin" />
                Generating code…
              </div>
            ) : null}
            {error ? (
              <p className="px-2 py-4 text-xs text-destructive">{error}</p>
            ) : null}
            {fileTree.map((node) => (
              <FileTreeItem
                key={node.id}
                node={node}
                depth={0}
                selectedPath={activePath ?? ""}
                expandedFolders={expandedFolders}
                onToggle={toggleFolder}
                onSelect={setActivePath}
              />
            ))}
          </nav>

          <div className="relative flex min-w-0 flex-1 flex-col bg-code text-code-foreground">
            {activeFile ? (
              <>
                <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b bg-background/70 px-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileCode className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate font-mono text-xs text-foreground">
                      {activeFile.path}
                    </span>
                    <span className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                      {activeLanguage}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "flex h-7 shrink-0 items-center gap-1.5 rounded-md border bg-background px-2.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
                    )}
                    onClick={() => copy(activeFile.path, activeFile.content)}
                  >
                    {copiedPath === activeFile.path ? (
                      <>
                        <Check className="size-3 text-success-foreground" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="min-h-0 flex-1 overflow-auto">
                  <CodeblockShiki
                    code={activeFile.content}
                    language={activeLanguage}
                    className="text-[12px] leading-5 [&>pre]:min-h-full [&>pre]:px-0 [&>pre]:py-4"
                  />
                </div>
              </>
            ) : (
              <div className="grid h-full place-items-center text-xs text-muted-foreground">
                {error ? "Code generation failed." : "Select a file to view."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FileTreeItem({
  node,
  depth,
  selectedPath,
  expandedFolders,
  onToggle,
  onSelect,
}: {
  node: FileTreeNode
  depth: number
  selectedPath: string
  expandedFolders: Set<string>
  onToggle: (id: string) => void
  onSelect: (path: string) => void
}) {
  const isFolder = node.type === "folder"
  const isExpanded = expandedFolders.has(node.id)
  const isSelected = node.path === selectedPath
  const Icon = isFolder
    ? isExpanded
      ? FolderOpen
      : Folder
    : getFileIcon(node.path)

  return (
    <div>
      <button
        type="button"
        data-selected={isSelected}
        className="group flex h-7 w-full items-center gap-1.5 rounded-md pr-2 text-left text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:shadow-sm"
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        onClick={() => {
          if (isFolder) {
            onToggle(node.id)
          } else {
            onSelect(node.path)
          }
        }}
      >
        {isFolder ? (
          <ChevronRight
            data-expanded={isExpanded}
            className="size-3 shrink-0 transition-transform data-[expanded=true]:rotate-90"
          />
        ) : (
          <span className="size-3 shrink-0" />
        )}
        <Icon
          className={cn(
            "size-3.5 shrink-0",
            isFolder ? "text-muted-foreground" : "text-muted-foreground/80",
            isSelected && "text-foreground"
          )}
        />
        <span className={cn("min-w-0 truncate", isFolder && "font-medium")}>
          {node.name}
        </span>
      </button>
      {isFolder && isExpanded
        ? node.children.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedPath={selectedPath}
              expandedFolders={expandedFolders}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))
        : null}
    </div>
  )
}

function buildFileTree(files: GeneratedFile[]) {
  const root: FileTreeNode = {
    id: "root",
    name: "root",
    path: "",
    type: "folder",
    children: [],
  }

  for (const file of files) {
    const parts = file.path.split("/")
    let current = root

    parts.forEach((part, index) => {
      const path = parts.slice(0, index + 1).join("/")
      const isFile = index === parts.length - 1
      let child = current.children.find((node) => node.name === part)

      if (!child) {
        child = {
          id: path,
          name: part,
          path,
          type: isFile ? "file" : "folder",
          children: [],
        }
        current.children.push(child)
      }

      current = child
    })
  }

  sortTree(root)
  return root.children
}

function sortTree(node: FileTreeNode) {
  node.children.sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  node.children.forEach(sortTree)
}

function getFolderIds(nodes: FileTreeNode[]) {
  const ids: string[] = []

  function walk(node: FileTreeNode) {
    if (node.type === "folder") {
      ids.push(node.id)
      node.children.forEach(walk)
    }
  }

  nodes.forEach(walk)
  return ids
}

function getFileIcon(path: string) {
  if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(path)) return FileCode
  return FileText
}

function getLanguageFromPath(path?: string) {
  if (!path) return "tsx"

  const extension = path.split(".").pop()
  if (extension === "ts" || extension === "tsx") return extension
  if (extension === "js" || extension === "jsx" || extension === "mjs" || extension === "cjs") {
    return "js"
  }
  if (extension === "json") return "json"
  if (extension === "css") return "css"
  if (extension === "html") return "html"
  if (extension === "md" || extension === "mdx") return "mdx"
  return "tsx"
}
