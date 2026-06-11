import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { AppProviders } from "@/components/app-providers"
import { getBuilderSession } from "@/lib/builder/auth"
import {
  createBuilderProject,
  listBuilderProjects,
} from "@/lib/builder/projects"
import { BuilderSiteHeader } from "./builder-site-header"
import { BuilderWorkspace } from "./builder-workspace"

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

  if ("error" in session) {
    if (session.status === 401) {
      redirect("/login?callbackUrl=%2Fbuilder")
    }

    return (
      <AppProviders>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <BuilderSiteHeader />
          <main className="flex flex-1 items-center justify-center px-6">
            <div className="max-w-md rounded-lg border bg-card p-6 shadow-sm">
              <h1 className="text-xl font-semibold tracking-normal">
                Builder requires Pro
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sign in with a LoveUI Pro account to save Builder projects and
                export generated project ZIPs.
              </p>
            </div>
          </main>
        </div>
      </AppProviders>
    )
  }

  const projects = await listBuilderProjects(session.userId)
  const activeProject =
    projects[0] ??
    (await createBuilderProject({
      userId: session.userId,
      name: "Untitled builder project",
      framework: "next",
    }))

  return (
    <AppProviders>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <BuilderSiteHeader />
        <BuilderWorkspace
          initialProject={activeProject}
          initialProjects={projects.length > 0 ? projects : [activeProject]}
        />
      </div>
    </AppProviders>
  )
}
