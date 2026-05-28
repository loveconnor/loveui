import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function ButtonOutlineIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline">
        <ArrowLeftIcon />
        Previous
      </Button>
      <Button variant="outline">
        Next
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
