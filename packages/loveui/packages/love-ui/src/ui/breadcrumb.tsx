import * as React from "react"
import type { ComponentPropsWithoutRef } from "react"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@loveui/ui/lib/utils"

function Breadcrumb({ ...props }: ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex list-none flex-wrap items-center gap-1.5 p-0 text-sm break-words text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  const defaultProps = {
    "data-slot": "breadcrumb-link",
    className: cn("transition-colors hover:text-foreground", className),
  }

  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(defaultProps, props),
  })
}

function BreadcrumbPage({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("opacity-72 [&>svg]:size-4", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
