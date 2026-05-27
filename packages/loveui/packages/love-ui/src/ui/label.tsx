import * as React from "react"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@loveui/ui/lib/utils"

function Label({ className, ...props }: ComponentPropsWithoutRef<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("inline-flex items-center gap-2 text-sm/4", className)}
      {...props}
    />
  )
}

export { Label }
