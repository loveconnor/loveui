'use client';

import Link from 'fumadocs-core/link';
import { usePathname } from 'fumadocs-core/framework';
import { SidebarIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import {
  isLinkItemActive,
  type LinkItemType,
} from 'fumadocs-ui/layouts/shared';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { SidebarCollapseTrigger } from 'fumadocs-ui/components/sidebar/base';
import { cn } from '@/lib/cn';

function DocsHeaderLink({ item }: { item: LinkItemType }) {
  const pathname = usePathname();

  if (item.type === 'custom') {
    return item.children;
  }

  if (item.type === 'menu') {
    return (
      <span className="text-sm font-medium text-fd-muted-foreground">
        {item.text}
      </span>
    );
  }

  return (
    <Link
      href={item.url}
      external={item.external}
      aria-label={item.type === 'icon' ? item.label : undefined}
      data-active={isLinkItemActive(item, pathname)}
      className={cn(
        item.type === 'icon'
          ? buttonVariants({
              color: 'ghost',
              size: 'icon-sm',
              className: 'text-fd-muted-foreground',
            })
          : 'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground data-[active=true]:bg-fd-accent data-[active=true]:text-fd-foreground',
      )}
    >
      {item.type === 'icon' ? item.icon : item.text}
    </Link>
  );
}

export function DocsHeader({ className, ...props }: ComponentProps<'header'>) {
  const {
    isNavTransparent,
    navItems,
    slots,
    props: { nav },
  } = useDocsLayout();
  const { collapsed } = slots.sidebar.useSidebar();

  if (nav?.component) {
    return nav.component;
  }

  return (
    <header
      id="nd-subnav"
      data-transparent={isNavTransparent}
      className={cn(
        '[grid-area:header] sticky top-(--fd-docs-row-1) z-30 flex h-14 items-center gap-4 border-b bg-fd-background/80 px-4 backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {collapsed ? (
          <div className="flex items-center gap-1">
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  size: 'icon-sm',
                  className: 'p-2 text-fd-muted-foreground',
                }),
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
            {slots.searchTrigger ? (
              <slots.searchTrigger.sm
                hideIfDisabled
                className="p-2 text-fd-muted-foreground"
              />
            ) : null}
          </div>
        ) : null}
        {slots.navTitle ? (
          <slots.navTitle className="inline-flex shrink-0 items-center gap-2.5 font-semibold md:hidden" />
        ) : null}
        <nav className="flex min-w-0 items-center gap-1">
          {navItems
            .filter((item) => item.type !== 'icon')
            .map((item, index) => (
              <DocsHeaderLink key={index} item={item} />
            ))}
        </nav>
      </div>
      <div className="flex items-center gap-1">
        {nav?.children}
        {navItems
          .filter((item) => item.type === 'icon')
          .map((item, index) => (
            <DocsHeaderLink key={index} item={item} />
          ))}
        {slots.sidebar ? (
          <slots.sidebar.trigger
            className={cn(
              buttonVariants({
                color: 'ghost',
                size: 'icon-sm',
                className: 'p-2 md:hidden',
              }),
            )}
          >
            <SidebarIcon />
          </slots.sidebar.trigger>
        ) : null}
      </div>
    </header>
  );
}
