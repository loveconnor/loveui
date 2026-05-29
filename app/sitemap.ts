import type { MetadataRoute } from 'next';
import { blockLinks } from '@/lib/blocks-page-tree';
import { componentLinks } from '@/lib/components-page-tree';
import { source } from '@/lib/source';
import { absoluteUrl, siteUrl } from '@/lib/seo';

function sitemapEntry(
  path: string,
  options: Pick<
    MetadataRoute.Sitemap[number],
    'changeFrequency' | 'priority'
  >,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    ...options,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages = source.getPages().map((page) =>
    sitemapEntry(page.url, {
      changeFrequency: 'weekly',
      priority: page.url === '/docs' ? 1 : 0.8,
    }),
  );

  const componentPages = componentLinks.map((component) =>
    sitemapEntry(`/components/${component.slug}`, {
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
  );

  const blockPages = blockLinks.map((block) =>
    sitemapEntry(`/blocks/${block.slug}`, {
      changeFrequency: 'weekly',
      priority: 0.85,
    }),
  );

  return [
    sitemapEntry('/', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/components', { changeFrequency: 'weekly', priority: 0.95 }),
    sitemapEntry('/blocks', { changeFrequency: 'weekly', priority: 0.9 }),
    sitemapEntry('/llms.txt', { changeFrequency: 'weekly', priority: 0.5 }),
    sitemapEntry('/llms-full.txt', { changeFrequency: 'weekly', priority: 0.5 }),
    ...docsPages,
    ...componentPages,
    ...blockPages,
  ].filter((entry, index, entries) => {
    const firstIndex = entries.findIndex((item) => item.url === entry.url);
    return firstIndex === index && entry.url.startsWith(siteUrl);
  });
}
