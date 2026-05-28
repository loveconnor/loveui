import { ComponentExampleCard } from "@/components/component-example-card"
import { getComponentExampleNames } from "@/lib/component-examples"
import { cn } from "@/lib/cn"

export function ComponentExamples({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const examples = getComponentExampleNames(name)

  if (examples.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No examples are registered for this component yet.
      </p>
    )
  }

  return (
    <div
      className={cn(
        "not-prose mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2",
        className
      )}
    >
      {examples.map((example) => (
        <ComponentExampleCard
          key={example}
          name={example}
          componentSlug={name}
          className="my-0 h-full"
        />
      ))}
    </div>
  )
}
