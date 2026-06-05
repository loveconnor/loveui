import type { Metadata } from 'next';

import { IconsCollectionPage } from './page-content';

export const metadata: Metadata = {
  title: 'Icons',
  description:
    'Browse LoveUI icons, logos, and vectors for product interfaces.',
  alternates: {
    canonical: '/icons',
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
