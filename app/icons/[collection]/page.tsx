import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  formatAssetLabel,
  getAssetCollectionMeta,
  isAssetCollection,
  type AssetCollection,
} from '@/lib/icons-registry';
import { seo, siteKeywords } from '@/lib/seo';
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
  const title = `LoveUI ${meta?.name ?? formatAssetLabel(collection)}`;
  const description =
    meta?.description ??
    `Browse LoveUI ${formatAssetLabel(collection).toLowerCase()} for product interfaces.`;

  return {
    title,
    description,
    keywords: [
      ...siteKeywords,
      `LoveUI ${collection}`,
      `React ${collection}`,
      `SVG ${collection}`,
    ],
    alternates: {
      canonical: `/icons/${collection}`,
    },
    openGraph: {
      type: 'website',
      siteName: seo.name,
      title,
      description,
      url: `/icons/${collection}`,
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
