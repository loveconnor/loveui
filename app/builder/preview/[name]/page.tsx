import type { ComponentType } from "react"

import { AppProviders } from "@/components/app-providers"
import { getComponentExampleNames } from "@/lib/component-examples"
import { Index } from "@/registry/__index__"
import { BuilderPreviewSurface } from "./builder-preview-surface"

export const dynamic = "force-dynamic"

type PreviewPageProps = {
  params: Promise<{ name: string }>
  searchParams: Promise<{ shapeId?: string; theme?: string }>
}

type PreviewModule = {
  default: ComponentType
}

const blockPreviewLoaders: Record<string, () => Promise<PreviewModule>> = {
  "404-one": () => import("@/registry/default/blocks/404-1/app/page"),
  "404-two": () => import("@/registry/default/blocks/404-2/app/page"),
  "auth-one": () => import("@/registry/default/blocks/auth1/app/page"),
  "auth-two": () => import("@/registry/default/blocks/auth2/app/page"),
  "auth-three": () => import("@/registry/default/blocks/auth3/app/page"),
  "blog-one": () => import("@/registry/default/blocks/blogs1/app/page"),
  "blog-two": () => import("@/registry/default/blocks/blogs2/app/page"),
  "blog-three": () => import("@/registry/default/blocks/blogs3/app/page"),
  "contact-one": () => import("@/registry/default/blocks/contact1/app/page"),
  "contact-two": () => import("@/registry/default/blocks/contact2/app/page"),
  "contact-three": () => import("@/registry/default/blocks/contact3/app/page"),
  "contact-four": () => import("@/registry/default/blocks/contact4/app/page"),
  "contact-five": () => import("@/registry/default/blocks/contact5/app/page"),
  "cta-one": () => import("@/registry/default/blocks/cta-1/app/page"),
  "cta-two": () => import("@/registry/default/blocks/cta-2/app/page"),
  "cta-three": () => import("@/registry/default/blocks/cta-3/app/page"),
  "cta-four": () => import("@/registry/default/blocks/cta-4/app/page"),
  "cta-five": () => import("@/registry/default/blocks/cta-5/app/page"),
  "faq-one": () => import("@/registry/default/blocks/faq-1/app/page"),
  "faq-two": () => import("@/registry/default/blocks/faq-2/app/page"),
  "faq-three": () => import("@/registry/default/blocks/faq-3/app/page"),
  "faq-four": () => import("@/registry/default/blocks/faq-4/app/page"),
  "faq-five": () => import("@/registry/default/blocks/faq-5/app/page"),
  "features-one": () => import("@/registry/default/blocks/features1/app/page"),
  "features-two": () => import("@/registry/default/blocks/features2/app/page"),
  "features-three": () => import("@/registry/default/blocks/features3/app/page"),
  "features-four": () => import("@/registry/default/blocks/features4/app/page"),
  "features-five": () => import("@/registry/default/blocks/features5/app/page"),
  "features-six": () => import("@/registry/default/blocks/features6/app/page"),
  "footer-one": () => import("@/registry/default/blocks/footer1/app/page"),
  "footer-two": () => import("@/registry/default/blocks/footer2/app/page"),
  "footer-three": () => import("@/registry/default/blocks/footer3/app/page"),
  "footer-four": () => import("@/registry/default/blocks/footer4/app/page"),
  "footer-five": () => import("@/registry/default/blocks/footer5/app/page"),
  "footer-six": () => import("@/registry/default/blocks/footer6/app/page"),
  "header-one": () => import("@/registry/default/blocks/header1/app/page"),
  "header-two": () => import("@/registry/default/blocks/header2/app/page"),
  "header-three": () => import("@/registry/default/blocks/header3/app/page"),
  "hero-one": () => import("@/registry/default/blocks/hero1/app/page"),
  "hero-two": () => import("@/registry/default/blocks/hero2/app/page"),
  "hero-three": () => import("@/registry/default/blocks/hero3/app/page"),
  "image-gallery-one": () =>
    import("@/registry/default/blocks/image-gallery-1/app/page"),
  "integrations-one": () =>
    import("@/registry/default/blocks/integrations1/app/page"),
  "integrations-two": () =>
    import("@/registry/default/blocks/integrations2/app/page"),
  "integrations-three": () =>
    import("@/registry/default/blocks/integrations3/app/page"),
  "integrations-four": () =>
    import("@/registry/default/blocks/integrations4/app/page"),
  "integrations-five": () =>
    import("@/registry/default/blocks/integrations5/app/page"),
  "logo-cloud-one": () =>
    import("@/registry/default/blocks/logo-cloud-1/app/page"),
  "logo-cloud-two": () =>
    import("@/registry/default/blocks/logo-cloud-2/app/page"),
  "logo-cloud-three": () =>
    import("@/registry/default/blocks/logo-cloud-3/app/page"),
  "logo-cloud-four": () =>
    import("@/registry/default/blocks/logo-cloud-4/app/page"),
  "logo-cloud-five": () =>
    import("@/registry/default/blocks/logo-cloud-5/app/page"),
  "onboarding-one": () => import("@/registry/default/blocks/onboarding1/app/page"),
  "onboarding-two": () => import("@/registry/default/blocks/onboarding2/app/page"),
  "onboarding-three": () =>
    import("@/registry/default/blocks/onboarding3/app/page"),
  "onboarding-four": () =>
    import("@/registry/default/blocks/onboarding4/app/page"),
  "onboarding-five": () =>
    import("@/registry/default/blocks/onboarding5/app/page"),
  "onboarding-six": () => import("@/registry/default/blocks/onboarding6/app/page"),
  "onboarding-seven": () =>
    import("@/registry/default/blocks/onboarding7/app/page"),
  "pricing-one": () => import("@/registry/default/blocks/pricing1/app/page"),
  "pricing-two": () => import("@/registry/default/blocks/pricing2/app/page"),
  "pricing-three": () => import("@/registry/default/blocks/pricing3/app/page"),
  "pricing-four": () => import("@/registry/default/blocks/pricing4/app/page"),
  "stats-one": () => import("@/registry/default/blocks/stats1/app/page"),
  "stats-two": () => import("@/registry/default/blocks/stats2/app/page"),
  "stats-three": () => import("@/registry/default/blocks/stats3/app/page"),
  "stats-four": () => import("@/registry/default/blocks/stats4/app/page"),
  "stats-five": () => import("@/registry/default/blocks/stats5/app/page"),
  "stats-six": () => import("@/registry/default/blocks/stats6/app/page"),
  "stats-seven": () =>
    import("@/packages/loveui-pro/registry/default/blocks/stats7/app/page"),
  "stats-eight": () =>
    import("@/packages/loveui-pro/registry/default/blocks/stats8/app/page"),
  "stats-nine": () => import("@/registry/default/blocks/stats9/app/page"),
  "stats-ten": () =>
    import("@/packages/loveui-pro/registry/default/blocks/stats10/app/page"),
  "stats-eleven": () => import("@/registry/default/blocks/stats11/app/page"),
  "stats-twelve": () =>
    import("@/packages/loveui-pro/registry/default/blocks/stats12/app/page"),
  "stats-thirteen": () => import("@/registry/default/blocks/stats13/app/page"),
  "stats-fourteen": () => import("@/registry/default/blocks/stats14/app/page"),
  "stats-fifteen": () => import("@/registry/default/blocks/stats15/app/page"),
  "testimonials-one": () =>
    import("@/registry/default/blocks/testimonials1/app/page"),
  "testimonials-two": () =>
    import("@/registry/default/blocks/testimonials2/app/page"),
  "testimonials-three": () =>
    import("@/registry/default/blocks/testimonials3/app/page"),
  "testimonials-four": () =>
    import("@/registry/default/blocks/testimonials4/app/page"),
  "testimonials-five": () =>
    import("@/registry/default/blocks/testimonials5/app/page"),
  "testimonials-six": () =>
    import("@/registry/default/blocks/testimonials6/app/page"),
}

export default async function BuilderPreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  const { name } = await params
  const { shapeId, theme } = await searchParams
  const Component = await resolvePreviewComponent(name)
  const previewTheme = theme === "dark" ? "dark" : "light"

  if (!Component) {
    return (
      <PreviewMessage
        title="Preview unavailable"
        detail={`${name} does not have a local Builder preview yet.`}
      />
    )
  }

  return (
    <AppProviders>
      <main
        className={`min-h-screen overflow-auto bg-background text-foreground ${previewTheme === "dark" ? "dark" : ""}`}
      >
        <BuilderPreviewSurface
          shapeId={shapeId || name}
          previewTheme={previewTheme}
        >
          <Component />
        </BuilderPreviewSurface>
      </main>
    </AppProviders>
  )
}

async function resolvePreviewComponent(name: string) {
  const blockLoader = blockPreviewLoaders[name]

  if (blockLoader) {
    const module = await blockLoader()

    return module.default
  }

  const directExample = Index[name]?.component

  if (directExample) return directExample

  const firstExampleName = getComponentExampleNames(name)[0]

  return firstExampleName ? Index[firstExampleName]?.component : undefined
}

function PreviewMessage({ title, detail }: { title: string; detail: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
      <div className="max-w-sm rounded-md border bg-card p-4 text-center shadow-sm">
        <h1 className="text-sm font-semibold">{title}</h1>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
      </div>
    </main>
  )
}
