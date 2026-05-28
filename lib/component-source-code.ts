import fs from "node:fs/promises"
import path from "node:path"

import { getRegistryItem } from "@/lib/registry"
import { formatDisplaySourceCode } from "@/lib/display-source-code"

export async function getComponentSourceCode({
  name,
  src,
}: {
  name?: string
  src?: string
}) {
  if (!name && !src) {
    return undefined
  }

  if (name) {
    const item = await getRegistryItem(name)
    const registryCode = item?.files?.[0]?.content

    if (registryCode) {
      return formatDisplaySourceCode(registryCode)
    }

    try {
      const code = await fs.readFile(
        path.join(
          /* turbopackIgnore: true */ process.cwd(),
          "registry/default/examples",
          `${name}.tsx`
        ),
        "utf-8"
      )

      return formatDisplaySourceCode(code)
    } catch {
      return undefined
    }
  }

  if (src) {
    const code = await fs.readFile(
      path.join(/* turbopackIgnore: true */ process.cwd(), src),
      "utf-8"
    )

    return formatDisplaySourceCode(code)
  }
}
