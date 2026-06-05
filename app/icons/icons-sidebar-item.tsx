'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type * as PageTree from 'fumadocs-core/page-tree';

import { cn } from '@/lib/utils';

function stripQuery(url: string) {
  return url.split('?')[0];
}

export function IconsSidebarItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname();
  const active = stripQuery(item.url) === pathname;

  return (
    <Link
      data-active={active}
      data-icons-sidebar-item=""
      href={item.url}
      className={cn(
        'flex min-h-7 w-full items-center rounded-md px-2 text-[13px] leading-none text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2',
        active && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
      )}
    >
      {item.name}
    </Link>
  );
}
