"use client";

import { Badge } from "@repo/shadcn-ui/components/ui/badge";
import { navigationMenuTriggerStyle } from "@repo/shadcn-ui/components/ui/navigation-menu";
import { cn } from "@repo/shadcn-ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinksProps = {
  className: string;
  blocksCount: number;
  componentsCount: number;
  primitivesCount: number;
  patternsCount: number;
};

export const Links = ({
  className,
  blocksCount,
  componentsCount,
  primitivesCount,
  patternsCount,
}: LinksProps) => {
  const pathname = usePathname();

  const links = [
    {
      label: "Base Components",
      href: "/primitives",
      active: pathname.startsWith("/primitives"),
      count: primitivesCount,
      disabled: false,
      comingSoon: false,
    },
    {
      label: "Features",
      href: "/components",
      active: pathname.startsWith("/components"),
      count: componentsCount,
      disabled: false,
      comingSoon: false,
    },
    {
      label: "Sections",
      href: "/blocks",
      active: pathname.startsWith("/blocks"),
      count: blocksCount,
      disabled: false,
      comingSoon: false,
    },
    {
      label: "Snippets",
      href: "/patterns",
      active: pathname.startsWith("/patterns"),
      count: patternsCount,
      disabled: false,
      comingSoon: false,
    },
        {
      label: "Templates",
      href: "/templates",
      active: false,
      count: undefined,
      disabled: true,
      comingSoon: true,
    },
       {
      label: "Backgrounds",
      href: "/backgrounds",
      active: false,
      count: undefined,
      disabled: true,
      comingSoon: true,
    },
  ];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {links.map((link) => {
        const content = (
          <span className="flex items-center gap-1.5">
            {link.label}
            {link.comingSoon && (
              <Badge variant="outline" className="text-xs">
                Coming Soon
              </Badge>
            )}
            {link.count !== undefined && !link.comingSoon && (
              <Badge variant="secondary" className="text-xs">
                {link.count}
              </Badge>
            )}
          </span>
        );

        if (link.disabled) {
          return (
            <span
              className={cn(
                navigationMenuTriggerStyle(),
                "h-auto cursor-not-allowed bg-transparent px-3 py-1.5 opacity-50 shadow-none"
              )}
              key={link.href}
            >
              {content}
            </span>
          );
        }

        return (
          <Link
            className={cn(
              navigationMenuTriggerStyle(),
              "h-auto bg-transparent px-3 py-1.5 shadow-none transition-all",
              link.active && "bg-primary/10 text-primary"
            )}
            href={link.href}
            key={link.href}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
};
