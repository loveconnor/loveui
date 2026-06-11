import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import { getRegistryPayload } from "@/lib/builder/registry"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{ name: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const session = await getBuilderSession()
  const { name } = await context.params
  const payload = await getRegistryPayload(name, {
    includePro: session.canSaveBuilds,
  })

  if (!payload) {
    return NextResponse.json({ error: "Registry item not found." }, { status: 404 })
  }

  return NextResponse.json(payload)
}
