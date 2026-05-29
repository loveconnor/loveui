'use client';

import Link from 'fumadocs-core/link';
import { usePathname } from 'fumadocs-core/framework';
import type { ComponentProps } from 'react';
import {
  isLinkItemActive,
  type LinkItemType,
} from 'fumadocs-ui/layouts/shared';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { ThemeSwitch } from '@/components/theme-switch';
import { cn } from '@/lib/cn';
import { appName } from '@/lib/shared';

function BlocksHeaderLink({ item }: { item: LinkItemType }) {
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

export function BlocksHeader({ className, ...props }: ComponentProps<'header'>) {
  const {
    isNavTransparent,
    navItems,
    slots,
    props: { nav },
  } = useDocsLayout();

  if (nav?.component) {
    return nav.component;
  }

  const textItems = navItems.filter((item) => item.type !== 'icon');
  const iconItems = navItems.filter((item) => item.type === 'icon');

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
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {slots.navTitle ? (
          <slots.navTitle className="inline-flex shrink-0 items-center gap-2.5 font-semibold" />
        ) : (
          <Link href="/" className="shrink-0 font-semibold text-fd-foreground">
            {appName}
          </Link>
        )}
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {textItems.map((item, index) => (
            <BlocksHeaderLink key={index} item={item} />
          ))}
        </nav>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {nav?.children}
        <ThemeSwitch />
        {iconItems.map((item, index) => (
          <BlocksHeaderLink key={index} item={item} />
        ))}
      </div>
    </header>
  );
}
