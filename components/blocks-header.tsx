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
        '[grid-area:header] sticky top-(--fd-docs-row-1) z-30 h-14 border-b bg-fd-background/80 backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center gap-4 px-4">
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
        <div className="flex flex-1 flex-row items-center justify-end gap-1.5 max-lg:hidden">
          {slots.searchTrigger ? (
            <slots.searchTrigger.full
              hideIfDisabled
              className="w-full max-w-[240px] rounded-full ps-2.5"
            />
          ) : null}
          {nav?.children}
          {slots.themeSwitch ? <slots.themeSwitch /> : null}
          <ul className="flex flex-row items-center gap-2 empty:hidden">
            {iconItems.map((item, index) => (
              <li className="-mx-1 first:ms-0 last:me-0" key={index}>
                <BlocksHeaderLink item={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row items-center ms-auto -me-1.5 lg:hidden">
          {slots.searchTrigger ? (
            <slots.searchTrigger.sm hideIfDisabled className="p-2" />
          ) : null}
        </div>
      </div>
    </header>
  );
}
