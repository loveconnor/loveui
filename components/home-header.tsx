'use client';

import Link from 'fumadocs-core/link';
import { usePathname } from 'fumadocs-core/framework';
import type { ComponentProps } from 'react';
import {
  isLinkItemActive,
  type LinkItemType,
} from 'fumadocs-ui/layouts/shared';
import { useHomeLayout } from 'fumadocs-ui/layouts/home';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/cn';
import { AccountNavActions } from '@/components/account-nav-actions';

function HeaderLink({ item }: { item: LinkItemType }) {
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
          : 'inline-flex h-9 shrink-0 items-center rounded-md px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground data-[active=true]:bg-fd-accent data-[active=true]:text-fd-foreground',
      )}
    >
      {item.type === 'icon' ? item.icon : item.text}
    </Link>
  );
}

function isIconItem(item: LinkItemType) {
  return item.type === 'icon';
}

export function HomeHeader({ className, ...props }: ComponentProps<'header'>) {
  const {
    navItems,
    slots,
    props: { nav },
  } = useHomeLayout();

  if (nav?.component) {
    return nav.component;
  }

  const textItems = navItems.filter((item) => !isIconItem(item));
  const iconItems = navItems.filter(isIconItem);

  return (
    <header
      id="nd-nav"
      className={cn(
        'sticky top-0 z-40 h-14 border-b bg-fd-background/80 backdrop-blur-lg',
        className,
      )}
      {...props}
    >
      <nav className="mx-auto flex h-full w-full max-w-(--fd-layout-width) items-center gap-4 px-4">
        <div className="order-1 flex min-w-0 grow items-center gap-4">
          {slots.navTitle ? (
            <slots.navTitle className="inline-flex shrink-0 items-center gap-2.5 font-semibold" />
          ) : null}
          <div className="flex min-w-0 grow items-center gap-1 overflow-x-auto">
            {textItems.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="order-2 ms-auto flex min-w-0 shrink-0 items-center justify-end gap-1.5">
          {slots.searchTrigger ? (
            <slots.searchTrigger.full
              hideIfDisabled
              className="hidden w-64 shrink-0 rounded-full ps-2.5 xl:inline-flex"
            />
          ) : null}
          {slots.themeSwitch ? <slots.themeSwitch /> : null}
          <AccountNavActions />
          <ul className="flex flex-row items-center gap-2 empty:hidden">
            {iconItems.map((item, index) => (
              <li className="-mx-1 first:ms-0 last:me-0" key={index}>
                <HeaderLink item={item} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
