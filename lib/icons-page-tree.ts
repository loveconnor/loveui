import { createElement } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';

import {
  type AssetCollection,
  formatAssetLabel,
  getAssetCategoryItems,
  getAssetCollection,
  getAssetCollectionMeta,
  getAssetStyle,
  withAssetParams,
} from '@/lib/icons-registry';

function sidebarLabel(label: string, count: number) {
  return createElement(
    'span',
    {
      className: 'flex w-full items-center justify-between gap-3',
    },
    createElement('span', { className: 'truncate' }, label),
    createElement(
      'span',
      { className: 'shrink-0 text-xs tabular-nums text-muted-foreground' },
      count.toLocaleString(),
    ),
  );
}

export function getIconsPageTree({
  collection,
  style,
}: {
  collection: AssetCollection;
  style?: string;
}): PageTree.Root {
  const activeStyle = getAssetStyle(collection, style);
  const meta = getAssetCollectionMeta(collection);
  const collectionUrl = meta?.url ?? '/icons';
  const itemCount = getAssetCollection(collection).filter(
    (item) => item.variant === activeStyle,
  ).length;
  const categories = getAssetCategoryItems({
    collection,
    style: activeStyle,
  });

  return {
    type: 'root',
    name: meta?.name ?? 'Icons',
    children: [
      {
        type: 'page',
        name: sidebarLabel('All', itemCount),
        url: withAssetParams(collectionUrl, { style: activeStyle }),
      },
      ...categories.map((category) => ({
        type: 'page' as const,
        name: sidebarLabel(formatAssetLabel(category.name), category.count),
        url: category.url,
      })),
    ],
  };
}
