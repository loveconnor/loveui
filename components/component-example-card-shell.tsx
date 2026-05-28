"use client"

import * as React from "react"
import { Bun, NPM, PNPM, Yarn } from "@react-symbols/icons"
import { CheckIcon, CopyIcon, TerminalIcon } from "lucide-react"

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

export function ComponentExampleCardShell({
  description,
  installName,
  align = "center",
  component,
  source,
  sourceCode,
  className,
}: {
  description: string
  installName: string
  align?: "center" | "start" | "end"
  component: React.ReactNode
  source: React.ReactNode
  sourceCode?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "not-prose flex h-full flex-col rounded-[18px] border border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_2px_10px_rgb(0_0_0/8%)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_2px_14px_rgb(0_0_0/28%)]",
        className
      )}
    >
      <div
        className="relative flex-1 overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[inset_0_1px_0_rgb(255_255_255/60%)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[inset_0_1px_0_rgb(255_255_255/8%)]"
      >
        <div
          data-align={align}
          className="preview flex min-h-[360px] w-full justify-center overflow-auto p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start max-sm:min-h-[300px] max-sm:px-6"
        >
          {component}
        </div>
      </div>
      <div className="flex min-h-16 items-center justify-between gap-3 px-3 py-2">
        <p className="min-w-0 truncate text-[15px] leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {sourceCode && <ExampleCopyButton value={sourceCode} />}
          <ExampleCodeSheet
            installName={installName}
            title={description}
            source={source}
          />
        </div>
      </div>
    </div>
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

function ExampleCodeSheet({
  installName,
  title,
  source,
}: {
  installName: string
  title: string
  source: React.ReactNode
}) {
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
      <SheetPopup className="w-[calc(100%-(--spacing(6)))] !max-w-[820px] gap-0 overflow-hidden p-0">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-lg">{title}</SheetTitle>
          <SheetDescription>
            Install this example, then copy the source into your app.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <section className="grid gap-3">
            <h3 className="text-lg font-semibold tracking-normal">
              Installation
            </h3>
            <InstallCommand installName={installName} />
          </section>

          <section className="mt-8 grid gap-3">
            <h3 className="text-lg font-semibold tracking-normal">Code</h3>
            <div className="overflow-hidden rounded-lg border bg-code">
              {source}
            </div>
          </section>
        </div>
      </SheetPopup>
    </Sheet>
  )
}

function InstallCommand({ installName }: { installName: string }) {
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
        <ExampleCopyButton value={command} variant="ghost" />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-6">
        <code>{command}</code>
      </pre>
    </div>
  )
}

function ExampleCopyButton({
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
            className="size-9 rounded-[10px] shadow-sm"
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
