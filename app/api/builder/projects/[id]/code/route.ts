import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import { createProjectFiles } from "@/lib/builder/export"
import { getBuilderProject } from "@/lib/builder/projects"
import {
  isBuilderFramework,
  normalizeBuilderDocument,
  type BuilderFramework,
} from "@/lib/builder/types"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, context: RouteContext) {
  const session = await getBuilderSession()

  const { id } = await context.params
  let body: Record<string, unknown> = {}
  let document = null as ReturnType<typeof normalizeBuilderDocument> | null
  let framework: BuilderFramework = "next"
  let projectName = "loveui-builder-export"

  try {
    const input = await request.json()

    body = input && typeof input === "object" ? input as Record<string, unknown> : {}

    if (body?.document) {
      document = normalizeBuilderDocument(body.document)
      framework = document.framework
    }

    if (body?.framework && isBuilderFramework(String(body.framework))) {
      framework = String(body.framework) as BuilderFramework
    }

    if (body?.projectName) projectName = String(body.projectName)
  } catch {
    // Fall back to a saved project below when possible.
  }

  if (!document) {
    if (!session.canSaveBuilds) {
      return NextResponse.json(
        { error: "A local document is required." },
        { status: 400 }
      )
    }

    const project = await getBuilderProject(session.userId, id)

    if (!project) {
      return NextResponse.json({ error: "Builder project not found." }, { status: 404 })
    }

    document = project.document
    framework = project.framework
    projectName = project.name
  }

  const files = await createProjectFiles({
    document: { ...document, framework },
    framework,
    projectName,
    includeProRegistry: session.canSaveBuilds,
  })

  return NextResponse.json({ files })
}
