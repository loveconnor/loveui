"use client"

import { gooey } from "@loveui/gooey-toast"

import { Button } from "@/registry/default/ui/button"

export default function GooeyToastPromise() {
  const handlePromise = () => {
    const promise = new Promise<{ name: string }>((resolve) => {
      setTimeout(() => resolve({ name: "User" }), 2000)
    })

    gooey.promise(promise, {
      loading: { title: "Loading..." },
      success: (data) => ({
        title: "Success!",
        description: `Welcome back, ${data.name}!`,
      }),
      error: {
        title: "Error",
        description: "Failed to load data.",
      },
    })
  }

  return (
    <Button variant="outline" onClick={handlePromise}>
      Load Data
    </Button>
  )
}
