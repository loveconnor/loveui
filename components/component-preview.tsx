import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { Index } from "@/registry/__index__"

interface ComponentPreviewProps
  extends Omit<React.ComponentProps<"div">, "ref"> {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Component = Index[name]?.component

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
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
      source={<ComponentSource name={name} collapsible={false} />}
      {...props}
    />
  )
}
