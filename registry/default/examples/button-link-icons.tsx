import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function ButtonLinkIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="link">
        <ArrowLeftIcon />
        Previous
      </Button>
      <Button variant="link">
        Next
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
