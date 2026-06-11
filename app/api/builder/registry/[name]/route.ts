import { NextResponse } from "next/server"

import { getRegistryPayload } from "@/lib/builder/registry"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{ name: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { name } = await context.params
  const payload = await getRegistryPayload(name)

  if (!payload) {
    return NextResponse.json({ error: "Registry item not found." }, { status: 404 })
  }

  return NextResponse.json(payload)
}
