"use client"

import { gooey } from "@loveui/gooey-toast"

import { Button } from "@/registry/default/ui/button"

export default function GooeyToastWithButton() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        const id = gooey.action({
          title: "File deleted",
          description: "Your file has been moved to trash.",
          button: {
            title: "Undo",
            onClick: () => {
              gooey.dismiss(id)
              gooey.success({
                title: "Restored",
                description: "Your file has been restored.",
              })
            },
          },
        })
      }}
    >
      Delete File
    </Button>
  )
}
