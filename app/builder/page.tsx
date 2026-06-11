import type { Metadata } from "next"

import { AppProviders } from "@/components/app-providers"
import { getBuilderSession } from "@/lib/builder/auth"
import {
  createBuilderProject,
  listBuilderProjects,
} from "@/lib/builder/projects"
import { getBuilderRegistryCatalog } from "@/lib/builder/registry"
import { createDefaultBuilderDocument } from "@/lib/builder/types"
import { BuilderSiteHeader } from "./builder-site-header"
import { BuilderStudio } from "./builder-studio"

export const metadata: Metadata = {
  title: "Builder",
  description: "Compose LoveUI blocks, components, and icons on an infinite canvas.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function BuilderPage() {
  const session = await getBuilderSession()

  const [projects, catalog] = await Promise.all([
    session.canSaveBuilds ? listBuilderProjects(session.userId) : [],
    getBuilderRegistryCatalog({ includePro: session.canSaveBuilds }),
  ])
  const activeProject =
    projects[0] ??
    (session.canSaveBuilds
      ? await createBuilderProject({
          userId: session.userId,
          name: "Untitled build",
          framework: "next",
        })
      : createLocalBuilderProject(session.userId))

  return (
    <AppProviders>
      <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
        <BuilderSiteHeader />
        <main className="min-h-0 flex-1 overflow-hidden">
          <BuilderStudio
            canSaveBuilds={session.canSaveBuilds}
            initialProject={activeProject}
            initialProjects={projects.length > 0 ? projects : [activeProject]}
            localStorageKey={`loveui:builder:local-draft:${session.userId}`}
            catalog={catalog}
          />
        </main>
      </div>
    </AppProviders>
  )
}

function createLocalBuilderProject(userId: string) {
  const now = new Date().toISOString()

  return {
    id: `local-${userId}`,
    userId,
    name: "Untitled build",
    framework: "next" as const,
    document: createDefaultBuilderDocument("next"),
    tldrawSnapshot: null,
    createdAt: now,
    updatedAt: now,
    lastExportedAt: null,
  }
}
