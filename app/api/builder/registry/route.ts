import { NextResponse } from "next/server"

import { getBuilderRegistryCatalog } from "@/lib/builder/registry"

export const runtime = "nodejs"

export async function GET() {
  const catalog = await getBuilderRegistryCatalog()

  return NextResponse.json(catalog)
}
