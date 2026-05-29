import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { MessageCircleIcon } from 'lucide-react';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { BlocksHeader } from '@/components/blocks-header';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { baseOptions } from '@/lib/layout.shared';
import { cn } from '@/lib/cn';

const blocksPageTree = {
  type: 'root' as const,
  name: 'Blocks',
  children: [],
};

export default function Layout({ children }: { children: ReactNode }) {
  const layoutOptions = baseOptions();

  return (
    <DocsLayout
      tree={blocksPageTree}
      tabs={false}
      sidebar={{ enabled: false }}
      {...layoutOptions}
      containerProps={{
        className: '[--fd-header-height:--spacing(14)]',
        style: {
          gridTemplate: `"header header header"
"toc-popover toc-popover ."
"main main main" 1fr / minmax(min-content, 1fr) minmax(0, calc(var(--fd-layout-width,97rem))) minmax(min-content, 1fr)`,
        },
      }}
      slots={{ ...layoutOptions.slots, header: BlocksHeader }}
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
