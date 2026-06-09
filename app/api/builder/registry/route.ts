import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import { getBuilderRegistryCatalog } from "@/lib/builder/registry"

export const runtime = "nodejs"

export async function GET() {
  const session = await getBuilderSession()

  if ("error" in session) {
    return NextResponse.json({ error: session.error }, { status: session.status })
  }

  const catalog = await getBuilderRegistryCatalog()

  return NextResponse.json(catalog)
}
