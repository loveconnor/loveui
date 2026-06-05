import type { Metadata } from 'next';

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

  return {
    title: `${category} Icons`,
    alternates: {
      canonical: `/icons/category/${category}`,
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

