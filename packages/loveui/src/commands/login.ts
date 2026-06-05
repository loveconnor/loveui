import { getDefaultProApiUrl, saveProAuth } from "@/src/pro/auth"
import { LOVEUI_PRO_REGISTRY_URL } from "@/src/registry/constants"
import { handleError } from "@/src/utils/handle-error"
import { highlighter } from "@/src/utils/highlighter"
import { logger } from "@/src/utils/logger"
import { spinner } from "@/src/utils/spinner"
import { Command } from "commander"
import fetch from "node-fetch"
import prompts from "prompts"
import { z } from "zod"

const loginOptionsSchema = z.object({
  email: z.string().email().optional(),
  token: z.string().optional(),
  apiUrl: z.string().url(),
  registryUrl: z.string(),
  silent: z.boolean(),
})

type LoginResponse = {
  email?: string
  token?: string
  registryUrl?: string
  hasAccess?: boolean
  error?: string
}

export const login = new Command()
  .name("login")
  .description("login to LoveUI Pro")
  .option("--email <email>", "email address with LoveUI Pro access")
  .option("--token <token>", "LoveUI Pro access token")
  .option(
    "--api-url <url>",
    "LoveUI site URL used for auth.",
    getDefaultProApiUrl()
  )
  .option(
    "--registry-url <url>",
    "LoveUI Pro registry URL.",
    LOVEUI_PRO_REGISTRY_URL
  )
  .option("-s, --silent", "mute output.", false)
  .action(async (opts) => {
    try {
      const options = loginOptionsSchema.parse({
        email: opts.email,
        token: opts.token,
        apiUrl: opts.apiUrl.replace(/\/$/, ""),
        registryUrl: opts.registryUrl,
        silent: opts.silent,
      })

      const token = options.token ?? (await requestToken(options))
      const verified = await verifyToken(token, options.apiUrl)

      await saveProAuth({
        email: verified.email ?? options.email,
        token,
        apiUrl: options.apiUrl,
        registryUrl: options.registryUrl,
      })

      if (!options.silent) {
        spinner("Logged in to LoveUI Pro.")?.succeed()
        logger.log(
          `Use ${highlighter.info("love-ui add @love-ui-pro/<component>")} or ${highlighter.info("npx loveui-pro add <component>")}.`
        )
      }
    } catch (error) {
      logger.break()
      handleError(error)
    }
  })

async function requestToken(options: z.infer<typeof loginOptionsSchema>) {
  let email = options.email

  if (!email) {
    const response = await prompts({
      type: "text",
      name: "email",
      message: "Email with LoveUI Pro access",
      validate: (value) =>
        z.string().email().safeParse(value).success || "Enter a valid email.",
    })
    email = response.email
  }

  if (!email) {
    throw new Error("Email is required to login.")
  }

  const authSpinner = spinner("Checking LoveUI Pro access.", {
    silent: options.silent,
  }).start()

  const response = await fetch(`${options.apiUrl}/api/pro/cli-token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ email }),
  })

  const body = (await response.json().catch(() => null)) as LoginResponse | null

  if (!response.ok || !body?.token) {
    authSpinner.fail()
    throw new Error(
      body?.error ?? "Unable to create a LoveUI Pro access token."
    )
  }

  authSpinner.succeed()
  return body.token
}

async function verifyToken(token: string, apiUrl: string) {
  const response = await fetch(`${apiUrl}/api/pro/cli-token`, {
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  })

  const body = (await response.json().catch(() => null)) as LoginResponse | null

  if (!response.ok || !body?.hasAccess) {
    throw new Error(body?.error ?? "LoveUI Pro token verification failed.")
  }

  return body
}
