import { ComponentExampleCardShell } from "@/components/component-example-card-shell"
import { ComponentSource } from "@/components/component-source"
import { formatExampleTitle } from "@/lib/component-examples"
import { getComponentSourceCode } from "@/lib/component-source-code"
import { Index } from "@/registry/__index__"

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
  const Component = Index[name]?.component
  const sourceCode = await getComponentSourceCode({ name })

  return (
    <ComponentExampleCardShell
      className={className}
      align={align}
      description={formatExampleTitle(name, componentSlug)}
      installName={name}
      sourceCode={sourceCode}
      component={
        Component ? (
          <Component />
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            Preview component for{" "}
            <code className="rounded bg-muted px-1.5 py-1 font-mono text-xs">
              {name}
            </code>{" "}
            is not registered yet.
          </div>
        )
      }
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
