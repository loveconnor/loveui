"use client"

import { Index } from "@/registry/__index__"

export function RegistryExampleRenderer({ name }: { name: string }) {
  const Component = Index[name]?.component

  if (!Component) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Preview component for{" "}
        <code className="rounded bg-muted px-1.5 py-1 font-mono text-xs">
          {name}
        </code>{" "}
        is not registered yet.
      </div>
    )
  }

  return <Component />
}
