import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { MessageCircleIcon } from 'lucide-react';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { DocsHeader } from '@/components/docs-header';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { componentsPageTree } from '@/lib/components-page-tree';
import { baseOptions } from '@/lib/layout.shared';
import { cn } from '@/lib/cn';

export default function Layout({ children }: { children: ReactNode }) {
  const layoutOptions = baseOptions();

  return (
    <DocsLayout
      tree={componentsPageTree}
      tabs={false}
      {...layoutOptions}
      containerProps={{
        className: '[--fd-header-height:--spacing(14)]',
        style: {
          gridTemplate: `"sidebar sidebar header header header"
"sidebar sidebar toc-popover toc-popover ."
"sidebar sidebar main main main" 1fr / minmax(min-content, 1fr) var(--fd-sidebar-col) minmax(0, calc(var(--fd-layout-width,97rem) - var(--fd-sidebar-width))) minmax(min-content, 1fr) minmax(min-content, 1fr)`,
        },
      }}
      slots={{ ...layoutOptions.slots, header: DocsHeader }}
    >
      <AISearch>
        <AISearchPanel />
        <AISearchTrigger
          position="float"
          className={cn(
            buttonVariants({
              variant: 'secondary',
              className: 'rounded-2xl text-fd-muted-foreground',
            }),
          )}
        >
          <MessageCircleIcon className="size-4.5" />
          Ask AI
        </AISearchTrigger>
      </AISearch>

      {children}
    </DocsLayout>
  );
}
