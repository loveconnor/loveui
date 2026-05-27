"use client"

import { gooey, type GooeyPosition } from "@loveui/gooey-toast"

import { Button } from "@/registry/default/ui/button"

export default function GooeyToastPosition() {
  const positions: GooeyPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {positions.map((position) => (
        <Button
          key={position}
          variant="outline"
          onClick={() => {
            gooey.show({
              title: position,
              description: `Toast shown at ${position}`,
              position,
            })
          }}
        >
          {position}
        </Button>
      ))}
    </div>
  )
}
