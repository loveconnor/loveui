"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github } from "love-ui/icons"

import {
  AccountNavActions,
  BookCallLink,
} from "@/components/account-nav-actions"
import { SearchCommandFull, SearchCommandSmall } from "@/components/search-command"
import { ThemeSwitch } from "@/components/theme-switch"
import { cn } from "@/lib/cn"
import {
  appName,
  blocksRoute,
  chartsRoute,
  componentsRoute,
  docsRoute,
  gitConfig,
  iconsRoute,
} from "@/lib/shared"

const builderNavItems = [
  { text: "Docs", url: docsRoute },
  { text: "Components", url: componentsRoute },
  { text: "Blocks", url: blocksRoute },
  { text: "Charts", url: chartsRoute },
  { text: "Icons", url: iconsRoute },
  { text: "Builder", url: "/builder" },
]

export function BuilderSiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-14 shrink-0 border-b bg-fd-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-full w-full max-w-(--fd-layout-width) items-center gap-4 px-4">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2.5 font-semibold text-fd-foreground"
          >
            <Image
              alt=""
              className="size-6 rounded-md"
              height={24}
              sizes="24px"
              src="/icon.svg"
              width={24}
            />
            <span>{appName}</span>
          </Link>
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {builderNavItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                data-active={
                  item.url === "/builder"
                    ? pathname.startsWith("/builder")
                    : pathname === item.url || pathname.startsWith(`${item.url}/`)
                }
                className="inline-flex h-9 shrink-0 items-center rounded-md px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground data-[active=true]:bg-fd-accent data-[active=true]:text-fd-foreground"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        <div className="ms-auto flex min-w-0 shrink-0 items-center justify-end gap-1.5">
          <SearchCommandFull
            hideIfDisabled
            className="hidden w-64 shrink-0 rounded-full ps-2.5 xl:inline-flex"
          />
          <SearchCommandSmall hideIfDisabled className="p-2 xl:hidden" />
          <ThemeSwitch />
          <AccountNavActions />
          <Link
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cn(
              "inline-grid size-9 shrink-0 place-items-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
            )}
          >
            <Github className="size-4" />
          </Link>
          <BookCallLink />
        </div>
      </nav>
    </header>
  )
}
