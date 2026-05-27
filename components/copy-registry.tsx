"use client"

import * as React from "react"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Icons } from "../packages/loveui/packages/love-ui/src/components/icons"
import { useCopyToClipboard } from "../packages/loveui/packages/love-ui/src/hooks/use-copy-to-clipboard"

import { cn } from "@/lib/utils"
import { Button } from "../packages/loveui/packages/love-ui/src/ui/button"
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "../packages/loveui/packages/love-ui/src/ui/tooltip"

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyRegistry({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
  src?: string
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            data-slot="copy-button"
            size="icon-sm"
            variant={variant}
            className={cn(className)}
            onClick={() => copyToClipboard(value)}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <HugeiconsIcon
                icon={Tick02Icon}
                strokeWidth={2}
                className="size-3.5"
              />
            ) : (
              <Icons.mcp className="size-3.5" />
            )}
          </Button>
        }
      />
      <TooltipPopup>{isCopied ? "Copied" : "Copy Registry URL"}</TooltipPopup>
    </Tooltip>
  )
}
