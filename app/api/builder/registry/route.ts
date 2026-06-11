import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import { getBuilderRegistryCatalog } from "@/lib/builder/registry"

export const runtime = "nodejs"

export async function GET() {
  const session = await getBuilderSession()
  const catalog = await getBuilderRegistryCatalog({
    includePro: session.canSaveBuilds,
  })

  return NextResponse.json(catalog)
}
