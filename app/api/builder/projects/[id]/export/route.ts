import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import { createBuilderProjectZip } from "@/lib/builder/export"
import {
  getBuilderProject,
  markBuilderProjectExported,
} from "@/lib/builder/projects"
import {
  isBuilderFramework,
  normalizeBuilderDocument,
  type BuilderDocument,
  type BuilderFramework,
} from "@/lib/builder/types"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, context: RouteContext) {
  const session = await getBuilderSession()

  const { id } = await context.params
  let document: BuilderDocument | null = null
  let requestedFramework: BuilderFramework = "next"
  let projectName = "loveui-builder"
  let isCloudProject = false

  try {
    const body = await request.json()

    if (body?.document) {
      document = normalizeBuilderDocument(body.document)
      requestedFramework = document.framework
    }

    if (body?.framework && isBuilderFramework(String(body.framework))) {
      requestedFramework = String(body.framework) as BuilderFramework
    }

    if (body?.projectName) projectName = String(body.projectName)
  } catch {
    // Export can fall back to the saved project document when possible.
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
    requestedFramework = project.framework
    projectName = project.name
    isCloudProject = true
  }

  const bytes = await createBuilderProjectZip({
    document: { ...document, framework: requestedFramework },
    framework: requestedFramework,
    projectName,
    includeProRegistry: session.canSaveBuilds,
  })

  if (isCloudProject) {
    await markBuilderProjectExported(session.userId, id)
  }

  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "content-type": "application/zip",
      "content-disposition": `attachment; filename="${projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "loveui-builder"}.zip"`,
    },
  })
}
