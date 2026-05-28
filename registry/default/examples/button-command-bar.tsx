import { CommandIcon, PlusIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function ButtonCommandBar() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <PlusIcon />
        New task
      </Button>
      <Button variant="outline">
        <CommandIcon />
        Command menu
      </Button>
    </div>
  )
}
