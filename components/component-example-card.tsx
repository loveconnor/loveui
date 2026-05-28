import { ComponentExampleCardShell } from "@/components/component-example-card-shell"
import { ComponentSource } from "@/components/component-source"
import { RegistryExampleRenderer } from "@/components/registry-example-renderer"
import { formatExampleTitle } from "@/lib/component-examples"
import { getComponentSourceCode } from "@/lib/component-source-code"

export async function ComponentExampleCard({
  name,
  componentSlug,
  align = "center",
  className,
}: {
  name: string
  componentSlug: string
  align?: "center" | "start" | "end"
  className?: string
}) {
  const sourceCode = await getComponentSourceCode({ name })

  return (
    <ComponentExampleCardShell
      className={className}
      align={align}
      description={formatExampleTitle(name, componentSlug)}
      installName={name}
      sourceCode={sourceCode}
      component={<RegistryExampleRenderer name={name} />}
      source={
        <ComponentSource
          name={name}
          collapsible={false}
          className="**:[figure]:!m-0 **:[pre]:max-h-none **:[pre]:min-h-[520px]"
        />
      }
    />
  )
}
