import '../docs-shell.css';

import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { MessageCircle as MessageCircleIcon } from 'love-ui/icons';
import { cn } from '@/lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { DocsHeader } from '@/components/docs-header';
import { AppProviders } from '@/components/app-providers';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const layoutOptions = baseOptions();

  return (
    <AppProviders>
      <DocsLayout
        tree={source.getPageTree()}
        tabs={false}
        {...layoutOptions}
        containerProps={{
          className: '[--fd-header-height:--spacing(14)]',
          style: {
            gridTemplate: `"sidebar sidebar header header header"
"sidebar sidebar toc-popover toc-popover ."
"sidebar sidebar main toc ." 1fr / minmax(0, 1fr) var(--fd-sidebar-col) minmax(0, min(980px, calc(100vw - var(--fd-sidebar-width) - var(--fd-toc-width) - 3rem))) var(--fd-toc-width) minmax(0, 1fr)`,
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
                className: 'text-fd-muted-foreground rounded-2xl',
              }),
            )}
          >
            <MessageCircleIcon className="size-4.5" />
            Ask AI
          </AISearchTrigger>
        </AISearch>


        {children}
      </DocsLayout>
    </AppProviders>
  );
}
