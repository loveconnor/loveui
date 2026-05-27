import { BoldIcon } from "lucide-react"

import { Toggle } from "@/registry/default/ui/toggle"

export default function ToggleWithIcon() {
  return (
    <Toggle variant="outline" aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  )
}
