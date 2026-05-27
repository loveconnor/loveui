// @ts-ignore - Next types are supplied by consuming app via peerDependencies
import Link from "next/link"

import { Button } from "@loveui/ui/ui/button"

export function SiteCta() {
  return (
    <section>
      <div className="container flex w-full items-center justify-center gap-2 px-4 sm:px-6">
        <Button render={<Link href="/docs" />}>
          Read the docs
        </Button>
        <Button variant="outline" render={<Link href="/building-blocks" />}>
          Browse blocks
        </Button>
      </div>
    </section>
  )
}
