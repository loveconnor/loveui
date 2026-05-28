import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function ButtonGhostIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="ghost">
        <ArrowLeftIcon />
        Previous
      </Button>
      <Button variant="ghost">
        Next
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
