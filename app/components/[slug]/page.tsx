import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeftIcon } from "lucide-react"
import { PageFooter } from "fumadocs-ui/layouts/docs/page"

import { ComponentExamples } from "@/components/component-examples"
import {
  getComponentExampleCount,
  getComponentExampleNames,
} from "@/lib/component-examples"
import {
  componentLinks,
  getComponentFooterItems,
} from "@/lib/components-page-tree"

type ComponentPageProps = {
  params: Promise<{
    slug: string
  }>
}

function getComponent(slug: string) {
  return componentLinks.find((component) => component.slug === slug)
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const component = getComponent(slug)

  if (!component) {
    notFound()
  }

  const exampleCount = getComponentExampleCount(slug)

  return (
    <main className="[grid-area:main] min-w-0 bg-fd-background px-5 py-10 md:px-9 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <Link
          href="/components"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Components
        </Link>

        <div className="mt-8 max-w-[820px]">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground">
            {component.name}
          </h1>
          <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
            Explore {exampleCount} interactive {component.name.toLowerCase()}{" "}
            {exampleCount === 1 ? "example" : "examples"} covering common
            layouts, states, sizes, and real interface patterns.
          </p>
        </div>

        <ComponentExamples name={slug} />

        <PageFooter className="mt-10" items={getComponentFooterItems(slug)} />
      </div>
    </main>
  )
}

export function generateStaticParams() {
  return componentLinks.map((component) => ({ slug: component.slug }))
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params
  const component = getComponent(slug)

  if (!component) {
    notFound()
  }

  const exampleCount = getComponentExampleNames(slug).length

  return {
    title: `${component.name} Examples`,
    description: `${exampleCount} interactive examples for the ${component.name} component.`,
  }
}
