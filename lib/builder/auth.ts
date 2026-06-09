import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { hasProAccess } from "@/lib/pro-access"

export type BuilderSession =
  | {
      userId: string
      email: string
    }
  | {
      error: string
      status: 401 | 403
    }

export async function getBuilderSession(): Promise<BuilderSession> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const email = session?.user.email

  if (!session?.user.id || !email) {
    return { error: "You must be logged in.", status: 401 }
  }

  if (!(await hasProAccess(email))) {
    return { error: "LoveUI Pro access is required.", status: 403 }
  }

  return {
    userId: session.user.id,
    email,
  }
}
