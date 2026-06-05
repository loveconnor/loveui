import { promises as fs } from "fs"
import { readFileSync } from "fs"
import { homedir } from "os"
import path from "path"

import { LOVEUI_URL } from "@/src/registry/constants"

export type LoveUIAuthConfig = {
  pro?: {
    email?: string
    token?: string
    apiUrl?: string
    registryUrl?: string
    createdAt?: string
  }
}

const AUTH_DIR =
  process.env.LOVEUI_AUTH_DIR ?? path.join(homedir(), ".love-ui")
const AUTH_FILE = path.join(AUTH_DIR, "auth.json")

export function getDefaultProApiUrl() {
  return process.env.LOVEUI_PRO_API_URL ?? LOVEUI_URL
}

export async function readAuthConfig(): Promise<LoveUIAuthConfig> {
  try {
    return JSON.parse(await fs.readFile(AUTH_FILE, "utf8"))
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return {}
    }

    throw error
  }
}

export async function writeAuthConfig(config: LoveUIAuthConfig) {
  await fs.mkdir(AUTH_DIR, { recursive: true, mode: 0o700 })
  await fs.writeFile(AUTH_FILE, `${JSON.stringify(config, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  })
}

export async function saveProAuth(input: {
  email?: string
  token: string
  apiUrl?: string
  registryUrl?: string
}) {
  const config = await readAuthConfig()

  await writeAuthConfig({
    ...config,
    pro: {
      email: input.email,
      token: input.token,
      apiUrl: input.apiUrl,
      registryUrl: input.registryUrl,
      createdAt: new Date().toISOString(),
    },
  })
}

export async function clearProAuth() {
  const config = await readAuthConfig()
  delete config.pro
  await writeAuthConfig(config)
}

export async function getStoredProAuth() {
  return (await readAuthConfig()).pro
}

export async function getStoredProToken() {
  return process.env.LOVEUI_PRO_TOKEN ?? (await getStoredProAuth())?.token
}

export function getStoredProTokenSync() {
  if (process.env.LOVEUI_PRO_TOKEN) {
    return process.env.LOVEUI_PRO_TOKEN
  }

  try {
    const config = JSON.parse(readFileSync(AUTH_FILE, "utf8")) as LoveUIAuthConfig
    return config.pro?.token
  } catch {
    return undefined
  }
}
