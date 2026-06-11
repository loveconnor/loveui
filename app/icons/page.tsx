import type { Metadata } from 'next';

import { IconsCollectionPage } from './page-content';
import { seo, siteKeywords } from '@/lib/seo';

const iconsDescription =
  'Browse LoveUI interface icons, logos, and vectors for React product interfaces.';

export const metadata: Metadata = {
  title: 'Icons',
  description: iconsDescription,
  keywords: [
    ...siteKeywords,
    'React icons',
    'SVG icons',
    'product interface icons',
    'UI icon library',
  ],
  alternates: {
    canonical: '/icons',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Icons',
    description: iconsDescription,
    url: '/icons',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Icons',
    description: iconsDescription,
    images: ['/logo.png'],
  },
};

type PageProps = {
  searchParams: Promise<{
    category?: string;
    style?: string;
  }>;
};

export default async function IconsPage({ searchParams }: PageProps) {
  const { category, style } = await searchParams;

  return (
    <IconsCollectionPage
      category={category}
      collection="icons"
      style={style}
    />
  );
}
