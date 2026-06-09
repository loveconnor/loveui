import { NextResponse } from "next/server"

import { getBuilderSession } from "@/lib/builder/auth"
import { createBuilderProjectZip } from "@/lib/builder/export"
import {
  getBuilderProject,
  markBuilderProjectExported,
} from "@/lib/builder/projects"
import { isBuilderFramework } from "@/lib/builder/types"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, context: RouteContext) {
  const session = await getBuilderSession()

  if ("error" in session) {
    return NextResponse.json({ error: session.error }, { status: session.status })
  }

  const { id } = await context.params
  const project = await getBuilderProject(session.userId, id)

  if (!project) {
    return NextResponse.json({ error: "Builder project not found." }, { status: 404 })
  }

  let requestedFramework = project.framework

  try {
    const body = await request.json()
    if (body?.framework && isBuilderFramework(String(body.framework))) {
      requestedFramework = String(body.framework) as typeof requestedFramework
    }
  } catch {
    // Export can fall back to the project's saved framework.
  }

  const bytes = await createBuilderProjectZip({
    document: { ...project.document, framework: requestedFramework },
    framework: requestedFramework,
    projectName: project.name,
  })

  await markBuilderProjectExported(session.userId, id)

  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "content-type": "application/zip",
      "content-disposition": `attachment; filename="${project.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "loveui-builder"}.zip"`,
    },
  })
}
