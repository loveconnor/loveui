import fs from "node:fs/promises"
import path from "node:path"

import { getRegistryItem } from "@/lib/registry"

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
      return registryCode
    }

    try {
      return await fs.readFile(
        path.join(
          /* turbopackIgnore: true */ process.cwd(),
          "registry/default/examples",
          `${name}.tsx`
        ),
        "utf-8"
      )
    } catch {
      return undefined
    }
  }

  if (src) {
    return fs.readFile(
      path.join(/* turbopackIgnore: true */ process.cwd(), src),
      "utf-8"
    )
  }
}
