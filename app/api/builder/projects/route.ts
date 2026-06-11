import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import {
  createBuilderProject,
  listBuilderProjects,
} from "@/lib/builder/projects"
import { isBuilderFramework } from "@/lib/builder/types"

export const runtime = "nodejs"

export async function GET() {
  const session = await getBuilderSession()

  if (!session.canSaveBuilds) {
    return NextResponse.json({ projects: [] })
  }

  const projects = await listBuilderProjects(session.userId)

  return NextResponse.json({ projects })
}

export async function POST(request: Request) {
  const session = await getBuilderSession()

  if (!session.canSaveBuilds) {
    return NextResponse.json(
      { error: "Saving builds requires LoveUI Pro." },
      { status: 403 }
    )
  }

  let body: unknown = {}

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {}
  const framework = isBuilderFramework(String(input.framework))
    ? String(input.framework)
    : "next"
  const project = await createBuilderProject({
    userId: session.userId,
    name: input.name ? String(input.name) : undefined,
    framework: framework as "next" | "vite" | "react",
  })

  return NextResponse.json({ project }, { status: 201 })
}
