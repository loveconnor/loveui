import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { hasProAccess } from "@/lib/pro-access"

export type BuilderSession =
  {
    userId: string
    email: string | null
    canSaveBuilds: boolean
  }

export async function getBuilderSession(): Promise<BuilderSession> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const email = session?.user.email

  if (!session?.user.id || !email) {
    return {
      userId: "anonymous",
      email: null,
      canSaveBuilds: false,
    }
  }

  return {
    userId: session.user.id,
    email,
    canSaveBuilds: await hasProAccess(email),
  }
}
