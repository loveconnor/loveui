"use client"

import * as React from "react"
import { Check, Copy, Download, FileCode, LoaderCircle, X } from "love-ui/icons"

import { cn } from "@/lib/cn"
import type { BuilderDocument } from "@/lib/builder/types"

type GeneratedFile = {
  path: string
  content: string
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

  async function copy(path: string, content: string) {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedPath(path)
      window.setTimeout(() => setCopiedPath(null), 1600)
    } catch {
      // Clipboard unavailable.
    }
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
          <nav className="w-60 shrink-0 overflow-y-auto border-r bg-muted/30 p-2">
            {!files && !error ? (
              <div className="flex items-center gap-2 px-2 py-4 text-xs text-muted-foreground">
                <LoaderCircle className="size-3.5 animate-spin" />
                Generating code…
              </div>
            ) : null}
            {error ? (
              <p className="px-2 py-4 text-xs text-destructive">{error}</p>
            ) : null}
            {files?.map((file) => (
              <button
                key={file.path}
                type="button"
                data-active={file.path === activePath}
                className="flex w-full items-center rounded-md px-2 py-1.5 text-left font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm"
                onClick={() => setActivePath(file.path)}
              >
                <span className="truncate">{file.path}</span>
              </button>
            ))}
          </nav>

          <div className="relative min-w-0 flex-1 bg-neutral-950">
            {activeFile ? (
              <>
                <div className="absolute right-3 top-3 z-10">
                  <button
                    type="button"
                    className={cn(
                      "flex h-7 items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-2.5 text-[11px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
                    )}
                    onClick={() => copy(activeFile.path, activeFile.content)}
                  >
                    {copiedPath === activeFile.path ? (
                      <>
                        <Check className="size-3 text-green-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="h-full overflow-auto p-4 text-[12px] leading-5 text-neutral-100">
                  <code>{activeFile.content}</code>
                </pre>
              </>
            ) : (
              <div className="grid h-full place-items-center text-xs text-neutral-400">
                {error ? "Code generation failed." : "Select a file to view."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
