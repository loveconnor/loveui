import type { Metadata } from 'next';

import { formatAssetLabel } from '@/lib/icons-registry';
import { seo, siteKeywords } from '@/lib/seo';
import { IconsCollectionPage } from '../../page-content';

type PageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    style?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const label = formatAssetLabel(category);
  const title = `${label} Icons`;
  const description = `Browse LoveUI ${label.toLowerCase()} icons for React product interfaces.`;

  return {
    title,
    description,
    keywords: [
      ...siteKeywords,
      `${label} icons`,
      `React ${label.toLowerCase()} icons`,
      `SVG ${label.toLowerCase()} icons`,
    ],
    alternates: {
      canonical: `/icons/category/${category}`,
    },
    openGraph: {
      type: 'website',
      siteName: seo.name,
      title,
      description,
      url: `/icons/category/${category}`,
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

export default async function IconCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const { style } = await searchParams;

  return (
    <IconsCollectionPage
      category={category}
      collection="icons"
      style={style}
    />
  );
}
