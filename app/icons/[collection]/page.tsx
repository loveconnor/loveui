import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getAssetCollectionMeta,
  isAssetCollection,
  type AssetCollection,
} from '@/lib/icons-registry';
import { IconsCollectionPage } from '../page-content';

type PageProps = {
  params: Promise<{
    collection: string;
  }>;
  searchParams: Promise<{
    category?: string;
    style?: string;
  }>;
};

export function generateStaticParams() {
  return [{ collection: 'logos' }, { collection: 'vectors' }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { collection } = await params;

  if (!isAssetCollection(collection) || collection === 'icons') {
    return {};
  }

  const meta = getAssetCollectionMeta(collection);

  return {
    title: meta?.name ?? 'Icons',
    description: meta?.description,
    alternates: {
      canonical: `/icons/${collection}`,
    },
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { collection } = await params;
  const { category, style } = await searchParams;

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
