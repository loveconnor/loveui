import type { Metadata } from "next"

import { BuilderFramePreview } from "./builder-frame-preview"

export const metadata: Metadata = {
  title: "Builder Preview",
  robots: {
    index: false,
    follow: false,
  },
}

type PreviewPageProps = {
  searchParams: Promise<{
    frame?: string
    project?: string
    snapshot?: string
  }>
}

export default async function BuilderFramePreviewPage({
  searchParams,
}: PreviewPageProps) {
  const params = await searchParams

  return (
    <BuilderFramePreview
      frameId={params.frame}
      projectId={params.project}
      snapshotKey={params.snapshot}
    />
  )
}
