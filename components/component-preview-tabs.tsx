"use client"

import * as React from "react"

import { cn } from "@/lib/cn"
import { Tabs, TabsList, TabsTab } from "../packages/loveui/packages/love-ui/src/ui/tabs"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
              <TabsTab value="preview" className="rounded-lg">
                Preview
              </TabsTab>
              <TabsTab value="code" className="rounded-lg">
                Code
              </TabsTab>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="relative rounded-xl border data-[tab=code]:bg-code"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <div
            data-align={align}
            className={cn(
              "preview flex h-[450px] w-full justify-center overflow-y-auto p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start max-sm:px-6"
            )}
          >
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[450px]"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
