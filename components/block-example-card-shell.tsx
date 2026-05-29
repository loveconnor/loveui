"use client"

import * as React from "react"
import { Bun, NPM, PNPM, Yarn } from "@react-symbols/icons"
import {
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  FileCodeIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  TerminalIcon,
} from "lucide-react"

import { CodeblockShiki, CopyButton } from "@/components/code-block"
import { cn } from "@/lib/cn"
import { Button } from "@/registry/default/ui/button"
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet"
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"

export function BlockExampleCardShell({
  title,
  description,
  installName,
  sourceCode,
  sourceFiles,
  children,
  className,
}: {
  title: string
  description: string
  installName: string
  sourceCode: string
  sourceFiles: SourceFile[]
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "not-prose flex h-full flex-col rounded-[18px] border border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_2px_10px_rgb(0_0_0/8%)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_2px_14px_rgb(0_0_0/28%)]",
        className
      )}
    >
      <div className="relative flex-1 overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[inset_0_1px_0_rgb(255_255_255/60%)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[inset_0_1px_0_rgb(255_255_255/8%)]">
        {children}
      </div>
      <div className="flex min-h-16 items-center justify-between gap-3 px-3 py-2">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-card-foreground">
            {title}
          </h2>
          <p className="mt-1 truncate text-[15px] leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <BlockCopyButton value={sourceCode} />
          <BlockCodeSheet
            title={title}
            installName={installName}
            sourceCode={sourceCode}
            sourceFiles={sourceFiles}
          />
        </div>
      </div>
    </div>
  )
}

type SourceFile = {
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

function BlockCodeSheet({
  title,
  installName,
  sourceCode,
  sourceFiles,
}: {
  title: string
  installName: string
  sourceCode: string
  sourceFiles: SourceFile[]
}) {
  const fileTree = React.useMemo(() => buildFileTree(sourceFiles), [sourceFiles])
  const folderIds = React.useMemo(() => getFolderIds(fileTree), [fileTree])
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    () => new Set(folderIds)
  )
  const [selectedPath, setSelectedPath] = React.useState(
    () => sourceFiles[0]?.path ?? ""
  )
  const selectedFile =
    sourceFiles.find((file) => file.path === selectedPath) ?? sourceFiles[0]

  React.useEffect(() => {
    setExpandedFolders(new Set(folderIds))
  }, [folderIds])

  React.useEffect(() => {
    setSelectedPath(sourceFiles[0]?.path ?? "")
  }, [sourceFiles])

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-[10px] px-4 text-[15px] font-semibold shadow-sm"
          />
        }
      >
        View code
      </SheetTrigger>
      <SheetPopup className="w-[calc(100%-(--spacing(6)))] !max-w-[1100px] gap-0 overflow-hidden p-0">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-lg">{title}</SheetTitle>
          <SheetDescription>
            Install this block, then copy any files you want to customize.
          </SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <section className="grid gap-3 border-b px-6 py-5">
            <h3 className="text-lg font-semibold tracking-normal">
              Installation
            </h3>
            <BlockInstallCommand installName={installName} />
          </section>
          <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden md:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="border-b bg-muted/24 p-3 md:border-b-0 md:border-r">
              <div className="max-h-[720px] overflow-auto">
                {fileTree.map((node) => (
                  <FileTreeItem
                    key={node.id}
                    node={node}
                    depth={0}
                    selectedPath={selectedFile?.path ?? ""}
                    expandedFolders={expandedFolders}
                    onToggle={(id) => {
                      setExpandedFolders((current) => {
                        const next = new Set(current)
                        if (next.has(id)) {
                          next.delete(id)
                        } else {
                          next.add(id)
                        }
                        return next
                      })
                    }}
                    onSelect={setSelectedPath}
                  />
                ))}
              </div>
            </aside>
            <div className="flex min-w-0 flex-col overflow-hidden bg-background">
              <div className="flex min-h-11 items-center justify-between gap-3 border-b px-4">
                <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileCodeIcon className="size-4 shrink-0 text-blue-500" />
                  <span className="truncate">{selectedFile?.path ?? "Code"}</span>
                </div>
                <CopyButton content={selectedFile?.content ?? sourceCode} />
              </div>
              <div className="min-h-0 flex-1 overflow-auto px-5 py-4">
                <CodeblockShiki
                  code={selectedFile?.content ?? sourceCode}
                  language={getLanguageFromPath(selectedFile?.path)}
                  className="[&>pre]:m-0"
                />
              </div>
            </div>
          </div>
        </div>
      </SheetPopup>
    </Sheet>
  )
}

const packageManagers = [
  {
    id: "pnpm",
    label: "pnpm",
    icon: PNPM,
    getCommand: (slug: string) => `pnpm dlx love-ui@latest add ${slug}`,
  },
  {
    id: "npm",
    label: "npm",
    icon: NPM,
    getCommand: (slug: string) => `npx love-ui@latest add ${slug}`,
  },
  {
    id: "yarn",
    label: "yarn",
    icon: Yarn,
    getCommand: (slug: string) => `yarn dlx love-ui@latest add ${slug}`,
  },
  {
    id: "bun",
    label: "bun",
    icon: Bun,
    getCommand: (slug: string) => `bunx love-ui@latest add ${slug}`,
  },
] as const

function BlockInstallCommand({ installName }: { installName: string }) {
  const [selectedManager, setSelectedManager] =
    React.useState<(typeof packageManagers)[number]["id"]>("pnpm")

  const activeManager =
    packageManagers.find((manager) => manager.id === selectedManager) ??
    packageManagers[0]
  const command = activeManager.getCommand(installName)

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b px-3">
        <div className="flex min-w-0 items-center gap-2">
          <TerminalIcon className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto py-2">
            {packageManagers.map((manager) => (
              <button
                key={manager.id}
                type="button"
                data-active={manager.id === selectedManager}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
                onClick={() => setSelectedManager(manager.id)}
              >
                <manager.icon className="size-4 shrink-0" />
                {manager.label}
              </button>
            ))}
          </div>
        </div>
        <BlockCopyButton value={command} variant="ghost" />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-6">
        <code>{command}</code>
      </pre>
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
  const Icon = isFolder ? (isExpanded ? FolderOpenIcon : FolderIcon) : getFileIcon(node.path)

  return (
    <div>
      <button
        type="button"
        data-selected={isSelected}
        className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[selected=true]:bg-accent data-[selected=true]:text-foreground"
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={() => {
          if (isFolder) {
            onToggle(node.id)
          } else {
            onSelect(node.path)
          }
        }}
      >
        {isFolder ? (
          <ChevronRightIcon
            data-expanded={isExpanded}
            className="size-3.5 shrink-0 transition-transform data-[expanded=true]:rotate-90"
          />
        ) : (
          <span className="size-3.5 shrink-0" />
        )}
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{node.name}</span>
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

function buildFileTree(files: SourceFile[]) {
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
  if (/\.(ts|tsx|js|jsx)$/.test(path)) return FileCodeIcon
  return FileIcon
}

function getLanguageFromPath(path?: string) {
  if (!path) return "tsx"
  const extension = path.split(".").pop()
  if (extension === "ts" || extension === "tsx" || extension === "js" || extension === "jsx") {
    return extension
  }
  if (extension === "json") return "json"
  if (extension === "css") return "css"
  return "tsx"
}

function BlockCopyButton({
  value,
  variant = "outline",
}: {
  value: string
  variant?: "outline" | "ghost"
}) {
  const [isCopied, setIsCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  async function copyCode() {
    await navigator.clipboard.writeText(value)
    setIsCopied(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false)
    }, 1400)
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            size="icon"
            variant={variant}
            className={cn(
              "size-9 rounded-[10px]",
              variant === "outline" && "shadow-sm"
            )}
            aria-label={isCopied ? "Copied code" : "Copy code"}
            onClick={copyCode}
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        }
      />
      <TooltipPopup>{isCopied ? "Copied" : "Copy code"}</TooltipPopup>
    </Tooltip>
  )
}
