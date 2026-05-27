import { readFile } from "node:fs/promises"
import path from "node:path"

type RegistryFile = {
  path?: string
  content?: string
  type?: string
}

type RegistryItem = {
  name?: string
  files?: RegistryFile[]
}

const REGISTRY_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "packages/loveui/public/r"
)

export async function getRegistryItem(name: string): Promise<RegistryItem | null> {
  try {
    const file = await readFile(path.join(REGISTRY_ROOT, `${name}.json`), "utf8")
    return JSON.parse(file) as RegistryItem
  } catch {
    return null
  }
}
