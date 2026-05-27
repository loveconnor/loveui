"use client"

import * as React from "react"
import {
  ComputerTerminal02Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { useCopyToClipboard } from "../packages/loveui/packages/love-ui/src/hooks/use-copy-to-clipboard"
import { Button } from "../packages/loveui/packages/love-ui/src/ui/button"
import { Tabs, TabsList, TabsPanel, TabsTab } from "../packages/loveui/packages/love-ui/src/ui/tabs"
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "../packages/loveui/packages/love-ui/src/ui/tooltip"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [packageManager, setPackageManager] = React.useState<
    "pnpm" | "npm" | "yarn" | "bun"
  >("pnpm")
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]

    if (!command) {
      return
    }

    copyToClipboard(command)
  }, [packageManager, tabs, copyToClipboard])

  return (
    <div className="overflow-x-auto">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setPackageManager(value as "pnpm" | "npm" | "yarn" | "bun")
        }}
        className="gap-0"
      >
        <div className="flex items-center gap-2 border-b border-border/64 px-4 py-1 font-mono">
          <HugeiconsIcon
            icon={ComputerTerminal02Icon}
            strokeWidth={2}
            className="size-5 text-code-foreground sm:size-4"
          />
          <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTab key={key} value={key} className="rounded-lg">
                  {key}
                </TabsTab>
              )
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsPanel key={key} value={key} className="mt-0 px-4 py-3.5">
                <pre>
                  <code
                    className="relative font-mono text-[.8125rem] leading-none"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsPanel>
            )
          })}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              data-slot="copy-button"
              size="icon"
              variant="ghost"
              className="absolute top-1.5 right-1.5 z-3 size-9 opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-8"
              onClick={copyCommand}
            >
              <span className="sr-only">Copy</span>
              {isCopied ? (
                <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
              )}
            </Button>
          }
        />
        <TooltipPopup>{isCopied ? "Copied" : "Copy to Clipboard"}</TooltipPopup>
      </Tooltip>
    </div>
  )
}
