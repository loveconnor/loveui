import iconsJson from '@/packages/loveui/registry/default/icons/src/generated/logos.json';
import logosJson from '@/packages/loveui/registry/default/logos/src/generated/logos.json';
import vectorsJson from '@/packages/loveui/registry/default/vectors/src/generated/logos.json';

export type AssetCollection = 'icons' | 'logos' | 'vectors';

type RegistryAssetJson = {
  id: string;
  baseId: string;
  variant: string;
  name: string;
  path: string;
  category: string;
  tags?: string[];
  viewBox: string;
};

type RegistryJson = {
  logos: RegistryAssetJson[];
};

export type IconRegistryItem = RegistryAssetJson & {
  collection: AssetCollection;
  fileName: string;
  sourcePath: string;
  previewUrl: string;
};

export type AssetStyleOption = {
  value: string;
  label: string;
};

export type AssetCategoryItem = {
  name: string;
  label: string;
  count: number;
  url: string;
};

export const assetCollections = [
  {
    slug: 'icons',
    name: 'Icons',
    url: '/icons',
    description: 'Interface icons, symbols, and pictograms from LoveUI.',
  },
  {
    slug: 'logos',
    name: 'Logos',
    url: '/icons/logos',
    description: 'Brand, product, payment, flag, and platform logos.',
  },
  {
    slug: 'vectors',
    name: 'Vectors',
    url: '/icons/vectors',
    description: 'Abstract marks, characters, shapes, and illustration vectors.',
  },
] as const satisfies readonly {
  slug: AssetCollection;
  name: string;
  url: string;
  description: string;
}[];

const registryJsonByCollection: Record<AssetCollection, RegistryJson> = {
  icons: iconsJson as RegistryJson,
  logos: logosJson as RegistryJson,
  vectors: vectorsJson as RegistryJson,
};

export const defaultAssetStyle: Record<AssetCollection, string> = {
  icons: 'default',
  logos: 'default',
  vectors: 'shapes',
};

const assetStyleLabels: Record<AssetCollection, Record<string, string>> = {
  icons: {
    default: 'Outline',
    filled: 'Filled',
    rounded: 'Rounded',
    doodle: 'Doodle',
  },
  logos: {
    default: 'Icon',
    wordmark: 'Wordmark',
    symbols: 'Symbols',
  },
  vectors: {
    shapes: 'Shapes',
    sketch: 'Sketch',
    character: 'Character',
    pattern: 'Pattern',
    texture: 'Texture',
  },
};

const assetStyleOrder: Record<AssetCollection, string[]> = {
  icons: ['default', 'filled', 'rounded', 'doodle'],
  logos: ['default', 'wordmark', 'symbols'],
  vectors: ['shapes', 'sketch', 'character', 'pattern', 'texture'],
};

export function getAssetCollection(
  collection: AssetCollection,
): IconRegistryItem[] {
  return registryJsonByCollection[collection].logos
    .map((item) => {
      const sourcePath = item.path
        .replace('./generated/', '')
        .replace(/\.tsx$/, '.svg');
      const [category, fileName] = sourcePath.split('/');

      return {
        ...item,
        collection,
        category: category ?? item.category,
        fileName: fileName ?? `${item.id}.svg`,
        sourcePath,
        previewUrl: `/icons/assets/${collection}/${encodeURIComponent(
          category ?? item.category,
        )}/${encodeURIComponent(fileName ?? `${item.id}.svg`)}`,
      };
    })
    .sort((a, b) => {
      const categoryOrder = a.category.localeCompare(b.category);

      if (categoryOrder !== 0) return categoryOrder;

      return a.name.localeCompare(b.name);
    });
}

export function getAssetCollectionMeta(collection: AssetCollection) {
  return assetCollections.find((item) => item.slug === collection);
}

export function getAssetStyleOptions(
  collection: AssetCollection,
): AssetStyleOption[] {
  const styles = new Set(
    registryJsonByCollection[collection].logos.map((item) => item.variant),
  );

  return assetStyleOrder[collection]
    .filter((style) => styles.has(style))
    .map((style) => ({
      value: style,
      label: assetStyleLabels[collection][style] ?? formatAssetLabel(style),
    }));
}

export function getAssetStyle(
  collection: AssetCollection,
  value?: string,
) {
  const styles = getAssetStyleOptions(collection).map((option) => option.value);

  if (value && styles.includes(value)) return value;

  return defaultAssetStyle[collection];
}

export function getAssetCategoryItems({
  collection,
  style,
}: {
  collection: AssetCollection;
  style: string;
}): AssetCategoryItem[] {
  const categoryCounts = new Map<string, number>();

  for (const item of getAssetCollection(collection)) {
    if (item.variant !== style) continue;

    categoryCounts.set(item.category, (categoryCounts.get(item.category) ?? 0) + 1);
  }

  return Array.from(categoryCounts.entries())
    .map(([name, count]) => ({
      name,
      label: formatAssetLabel(name),
      count,
      url: getAssetCategoryUrl(collection, name, style),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAssetCategoryUrl(
  collection: AssetCollection,
  category: string,
  style?: string,
) {
  const collectionUrl = getAssetCollectionMeta(collection)?.url ?? '/icons';
  const path =
    collection === 'icons'
      ? `/icons/category/${category}`
      : `${collectionUrl}/category/${category}`;

  return withAssetParams(path, { style });
}

export function withAssetParams(
  url: string,
  params: {
    category?: string;
    style?: string;
  },
) {
  const searchParams = new URLSearchParams();

  if (params.category && params.category !== 'all') {
    searchParams.set('category', params.category);
  }

  if (params.style) {
    searchParams.set('style', params.style);
  }

  const query = searchParams.toString();

  return query ? `${url}?${query}` : url;
}

export function isAssetCollection(value: string): value is AssetCollection {
  return value === 'icons' || value === 'logos' || value === 'vectors';
}

export function formatAssetLabel(value: string) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
