import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getAssetCollectionMeta,
  isAssetCollection,
  type AssetCollection,
} from '@/lib/icons-registry';
import { IconsCollectionPage } from '../../../page-content';

type PageProps = {
  params: Promise<{
    category: string;
    collection: string;
  }>;
  searchParams: Promise<{
    style?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, collection } = await params;

  if (!isAssetCollection(collection) || collection === 'icons') {
    return {};
  }

  const meta = getAssetCollectionMeta(collection);

  return {
    title: `${category} ${meta?.name ?? 'Icons'}`,
    alternates: {
      canonical: `/icons/${collection}/category/${category}`,
    },
  };
}

export default async function CollectionCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category, collection } = await params;
  const { style } = await searchParams;

  if (!isAssetCollection(collection) || collection === 'icons') {
    notFound();
  }

  return (
    <IconsCollectionPage
      category={category}
      collection={collection as AssetCollection}
      style={style}
    />
  );
}

