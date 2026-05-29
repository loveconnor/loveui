import { blockLinks } from '@/lib/blocks-page-tree';
import { componentLinks } from '@/lib/components-page-tree';
import {
  appName,
  blocksRoute,
  componentsRoute,
  docsRoute,
  gitConfig,
} from '@/lib/shared';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.loveui.dev'
).replace(/\/$/, '');

export const siteDescription =
  'Open-source React components, examples, and patterns for building polished product interfaces with Tailwind CSS.';

export const siteKeywords = [
  'LoveUI',
  'React components',
  'Tailwind CSS components',
  'open source UI',
  'component library',
  'copy paste components',
  'design system',
  'accessible components',
  'Base UI components',
  'Next.js UI',
  'SaaS UI components',
  'dashboard components',
  'admin UI',
];

export const seo = {
  name: appName,
  title: `${appName} - React components for product interfaces`,
  description: siteDescription,
  url: siteUrl,
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  docsUrl: `${siteUrl}${docsRoute}`,
  componentsUrl: `${siteUrl}${componentsRoute}`,
  blocksUrl: `${siteUrl}${blocksRoute}`,
  llmsTxtUrl: `${siteUrl}/llms.txt`,
  llmsFullTxtUrl: `${siteUrl}/llms-full.txt`,
  ogImage: `${siteUrl}/logo.png`,
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageTitle(title: string) {
  return `${title} - ${appName}`;
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appName,
    url: siteUrl,
    description: siteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/api/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function softwareSourceCodeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: appName,
    codeRepository: seo.githubUrl,
    programmingLanguage: ['TypeScript', 'TSX', 'CSS'],
    runtimePlatform: ['React', 'Next.js', 'Tailwind CSS'],
    license: 'https://opensource.org/license/mit',
    description: siteDescription,
    url: siteUrl,
  };
}

export function collectionPageJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const mainEntity = collectionMainEntity(url);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(url),
    ...(mainEntity ? { mainEntity } : {}),
    isPartOf: {
      '@type': 'WebSite',
      name: appName,
      url: siteUrl,
    },
  };
}

function collectionMainEntity(url: string) {
  if (url === componentsRoute) {
    return itemList(
      'LoveUI component pages',
      componentLinks.map((component) => ({
        name: `${component.name} React component`,
        description: component.description,
        url: `${componentsRoute}/${component.slug}`,
      })),
    );
  }

  if (url === blocksRoute) {
    return itemList(
      'LoveUI block pages',
      blockLinks.map((block) => ({
        name: `${block.name} blocks`,
        description: block.description,
        url: `${blocksRoute}/${block.slug}`,
      })),
    );
  }

  const block = blockLinks.find((item) => url === `${blocksRoute}/${item.slug}`);

  if (block) {
    return {
      '@type': 'ItemList',
      name: `LoveUI ${block.name} block examples`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: `${block.name} blocks`,
          description: block.description,
          url: absoluteUrl(`${blocksRoute}/${block.slug}`),
        },
      ],
    };
  }

  return undefined;
}

function itemList(
  name: string,
  items: Array<{ name: string; description: string; url: string }>,
) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(item.url),
    })),
  };
}

export function componentJsonLd({
  name,
  description,
  url,
  exampleCount,
}: {
  name: string;
  description: string;
  url: string;
  exampleCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${name} React component examples`,
    description,
    url: absoluteUrl(url),
    about: [
      'React',
      'Tailwind CSS',
      'UI component',
      `${name} component`,
    ],
    proficiencyLevel: 'Beginner',
    isPartOf: {
      '@type': 'WebSite',
      name: appName,
      url: siteUrl,
    },
    hasPart: {
      '@type': 'ItemList',
      numberOfItems: exampleCount,
      name: `${name} examples`,
    },
  };
}

export function docsArticleJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: absoluteUrl(url),
    about: ['LoveUI', 'React components', 'Tailwind CSS', 'UI development'],
    isPartOf: {
      '@type': 'WebSite',
      name: appName,
      url: siteUrl,
    },
  };
}
