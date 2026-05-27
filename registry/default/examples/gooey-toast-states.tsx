"use client"

import { gooey } from "@loveui/gooey-toast"

import { Button } from "@/registry/default/ui/button"

export default function GooeyToastStates() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => {
          gooey.success({
            title: "Success!",
            description: "Your changes have been saved.",
          })
        }}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          gooey.error({
            title: "Error",
            description: "Something went wrong. Please try again.",
          })
        }}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          gooey.warning({
            title: "Warning",
            description: "This action cannot be undone.",
          })
        }}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          gooey.info({
            title: "Did you know?",
            description: "You can customize toast animations.",
          })
        }}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          gooey.action({
            title: "Action Required",
            description: "Please review your settings.",
          })
        }}
      >
        Action
      </Button>
    </div>
  )
}
