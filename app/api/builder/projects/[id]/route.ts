import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import {
  deleteBuilderProject,
  getBuilderProject,
  updateBuilderProject,
} from "@/lib/builder/projects"
import {
  isBuilderFramework,
  normalizeBuilderDocument,
  type BuilderFramework,
} from "@/lib/builder/types"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const session = await getBuilderSession()

  if (!session.canSaveBuilds) {
    return NextResponse.json(
      { error: "Saving builds requires LoveUI Pro." },
      { status: 403 }
    )
  }

  const { id } = await context.params
  const project = await getBuilderProject(session.userId, id)

  if (!project) {
    return NextResponse.json({ error: "Builder project not found." }, { status: 404 })
  }

  return NextResponse.json({ project })
}

export async function PATCH(request: Request, context: RouteContext) {
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
  const framework: BuilderFramework | undefined = isBuilderFramework(
    String(input.framework)
  )
    ? String(input.framework) as BuilderFramework
    : undefined
  const { id } = await context.params
  const project = await updateBuilderProject({
    userId: session.userId,
    projectId: id,
    name: input.name ? String(input.name) : undefined,
    framework,
    document: input.document
      ? normalizeBuilderDocument(input.document, framework ?? "next")
      : undefined,
    tldrawSnapshot:
      "tldrawSnapshot" in input ? input.tldrawSnapshot ?? null : undefined,
  })

  if (!project) {
    return NextResponse.json({ error: "Builder project not found." }, { status: 404 })
  }

  return NextResponse.json({ project })
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getBuilderSession()

  if (!session.canSaveBuilds) {
    return NextResponse.json(
      { error: "Saving builds requires LoveUI Pro." },
      { status: 403 }
    )
  }

  const { id } = await context.params
  const deleted = await deleteBuilderProject(session.userId, id)

  if (!deleted) {
    return NextResponse.json({ error: "Builder project not found." }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
