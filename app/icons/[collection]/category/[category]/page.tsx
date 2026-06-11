import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  formatAssetLabel,
  getAssetCollectionMeta,
  isAssetCollection,
  type AssetCollection,
} from '@/lib/icons-registry';
import { seo, siteKeywords } from '@/lib/seo';
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
  const label = formatAssetLabel(category);
  const collectionName = meta?.name ?? formatAssetLabel(collection);
  const title = `${label} ${collectionName}`;
  const description = `Browse LoveUI ${label.toLowerCase()} ${collectionName.toLowerCase()} for React product interfaces.`;

  return {
    title,
    description,
    keywords: [
      ...siteKeywords,
      `${label} ${collectionName}`,
      `React ${collectionName.toLowerCase()}`,
      `SVG ${collectionName.toLowerCase()}`,
    ],
    alternates: {
      canonical: `/icons/${collection}/category/${category}`,
    },
    openGraph: {
      type: 'website',
      siteName: seo.name,
      title,
      description,
      url: `/icons/${collection}/category/${category}`,
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
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
