import { blockLinks } from '@/lib/blocks-page-tree';
import { componentLinks } from '@/lib/components-page-tree';
import {
  appName,
  blocksRoute,
  chartsRoute,
  componentsRoute,
  docsRoute,
  gitConfig,
  iconsRoute,
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

export const seoAudience = [
  'frontend developers',
  'React developers',
  'design engineers',
  'product teams',
  'AI coding assistants',
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
  chartsUrl: `${siteUrl}${chartsRoute}`,
  iconsUrl: `${siteUrl}${iconsRoute}`,
  proUrl: `${siteUrl}/pro`,
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
    alternateName: ['Love UI', 'LoveUI Components'],
    url: siteUrl,
    description: siteDescription,
    inLanguage: 'en',
    keywords: siteKeywords.join(', '),
    audience: seoAudience.map((audienceType) => ({
      '@type': 'Audience',
      audienceType,
    })),
    publisher: organizationJsonLd(false),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/api/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd(withContext = true) {
  return {
    ...(withContext ? { '@context': 'https://schema.org' } : {}),
    '@type': 'Organization',
    name: appName,
    url: siteUrl,
    logo: seo.ogImage,
    sameAs: [seo.githubUrl],
  };
}

export function softwareSourceCodeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: appName,
    alternateName: 'LoveUI React components',
    codeRepository: seo.githubUrl,
    programmingLanguage: ['TypeScript', 'TSX', 'CSS'],
    runtimePlatform: ['React', 'Next.js', 'Tailwind CSS'],
    license: 'https://opensource.org/license/mit',
    description: siteDescription,
    url: siteUrl,
    applicationCategory: 'DeveloperApplication',
    keywords: siteKeywords.join(', '),
    audience: seoAudience.map((audienceType) => ({
      '@type': 'Audience',
      audienceType,
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items?: Array<{ name: string; description?: string; url: string }>;
}) {
  const mainEntity = items
    ? itemList(name, items.map((item) => ({
        name: item.name,
        description: item.description ?? '',
        url: item.url,
      })))
    : collectionMainEntity(url);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(url),
    ...(mainEntity ? { mainEntity } : {}),
    breadcrumb: breadcrumbListJsonLd([
      { name: 'Home', url: '/' },
      { name, url },
    ], false),
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
  exampleNames = [],
}: {
  name: string;
  description: string;
  url: string;
  exampleCount: number;
  exampleNames?: string[];
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
      itemListElement: exampleNames.map((exampleName, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: exampleName,
      })),
    },
    breadcrumb: breadcrumbListJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Components', url: componentsRoute },
      { name, url },
    ], false),
  };
}

export function productJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: absoluteUrl(url),
    image: seo.ogImage,
    brand: organizationJsonLd(false),
    category: 'Software source code and UI templates',
    audience: seoAudience.map((audienceType) => ({
      '@type': 'Audience',
      audienceType,
    })),
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      url: absoluteUrl(url),
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
    author: organizationJsonLd(false),
    publisher: organizationJsonLd(false),
    inLanguage: 'en',
    breadcrumb: breadcrumbListJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Docs', url: docsRoute },
      { name: title, url },
    ], false),
    isPartOf: {
      '@type': 'WebSite',
      name: appName,
      url: siteUrl,
    },
  };
}

export function faqPageJsonLd(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbListJsonLd(
  items: Array<{ name: string; url: string }>,
  withContext = true,
) {
  return {
    ...(withContext ? { '@context': 'https://schema.org' } : {}),
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
