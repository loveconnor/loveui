import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { MessageCircleIcon } from 'lucide-react';

import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { DocsHeader } from '@/components/docs-header';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import {
  getAssetCollection,
  getAssetCollectionMeta,
  getAssetStyle,
  getAssetStyleOptions,
  type AssetCollection,
} from '@/lib/icons-registry';
import { baseOptions } from '@/lib/layout.shared';
import { collectionPageJsonLd } from '@/lib/seo';
import { cn } from '@/lib/cn';
import { getIconsPageTree } from '@/lib/icons-page-tree';
import { IconsBrowser } from './icons-browser';
import { IconsSidebarItem } from './icons-sidebar-item';

type IconsCollectionPageProps = {
  collection: AssetCollection;
  category?: string;
  style?: string;
};

export function IconsCollectionPage({
  category = 'all',
  collection,
  style,
}: IconsCollectionPageProps) {
  const items = getAssetCollection(collection);
  const meta = getAssetCollectionMeta(collection);
  const activeStyle = getAssetStyle(collection, style);
  const layoutOptions = baseOptions();
  const description =
    meta?.description ??
    'Browse LoveUI icons, logos, and vectors for product interfaces.';
  const jsonLd = collectionPageJsonLd({
    name: `LoveUI ${meta?.name ?? 'Icons'}`,
    description,
    url: meta?.url ?? '/icons',
  });

  return (
    <DocsLayout
      tree={getIconsPageTree({ collection, style: activeStyle })}
      tabs={false}
      {...layoutOptions}
      containerProps={{
        className: 'icons-docs-layout [--fd-header-height:--spacing(14)]',
        style: {
          gridTemplate: `"sidebar sidebar header header header"
"sidebar sidebar toc-popover toc-popover ."
"sidebar sidebar main main main" 1fr / minmax(min-content, 1fr) var(--fd-sidebar-col) minmax(0, calc(var(--fd-layout-width,97rem) - var(--fd-sidebar-width))) minmax(min-content, 1fr) minmax(min-content, 1fr)`,
        },
      }}
      sidebar={{
        components: {
          Item: IconsSidebarItem,
        },
        defaultOpenLevel: 1,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IconsBrowser
        category={category}
        collection={collection}
        items={items}
        style={activeStyle}
        styleOptions={getAssetStyleOptions(collection)}
      />
    </DocsLayout>
  );
}
