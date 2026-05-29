import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { blockLinks } from '@/lib/blocks-page-tree';
import {
  getComponentExampleCount,
  getComponentExampleNames,
} from '@/lib/component-examples';
import { componentLinks } from '@/lib/components-page-tree';
import { source } from '@/lib/source';

export type SearchDocumentType =
  | 'app'
  | 'docs'
  | 'components'
  | 'component'
  | 'blocks'
  | 'block'
  | 'block-example';

export type SearchDocument = {
  id: string;
  type: SearchDocumentType;
  url: string;
  title: string;
  description: string;
  content: string;
};

const numberWords = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

export async function getSearchDocuments(): Promise<SearchDocument[]> {
  const [docs, blockExamples] = await Promise.all([
    getDocsSearchDocuments(),
    getBlockExampleDocuments(),
  ]);

  return [
    ...getAppRouteDocuments(),
    ...docs,
    getComponentsIndexDocument(),
    ...getComponentDocuments(),
    getBlocksIndexDocument(),
    ...getBlockDocuments(blockExamples),
    ...blockExamples,
  ];
}

function getAppRouteDocuments(): SearchDocument[] {
  return [
    {
      id: '/',
      type: 'app',
      url: '/',
      title: 'LoveUI',
      description:
        'Open-source React components, examples, blocks, and patterns for polished product interfaces.',
      content:
        'LoveUI home page. Primary routes: /docs, /components, /blocks, /llms.txt, /llms-full.txt. Includes React components, Tailwind CSS examples, block pages, and documentation.',
    },
    {
      id: '/docs',
      type: 'app',
      url: '/docs',
      title: 'Documentation',
      description: 'LoveUI documentation index.',
      content:
        'Documentation for getting started, styling, accessibility, component guide, contributing, and component docs.',
    },
    {
      id: '/llms.txt',
      type: 'app',
      url: '/llms.txt',
      title: 'LLM Index',
      description: 'Machine-readable LoveUI index for AI assistants.',
      content:
        'LLM index with primary documentation, component catalog, block catalog, and links for AI assistants.',
    },
    {
      id: '/llms-full.txt',
      type: 'app',
      url: '/llms-full.txt',
      title: 'Full LLM Context',
      description: 'Full machine-readable LoveUI context for AI assistants.',
      content:
        'Full LLM context with docs content, component examples, block catalog, and registry names for AI assistants.',
    },
  ];
}

async function getDocsSearchDocuments(): Promise<SearchDocument[]> {
  const docs = await Promise.all(
    source.getPages().map(async (page): Promise<SearchDocument | null> => {
      if (!('getText' in page.data)) return null;

      return {
        id: page.url,
        type: 'docs' as const,
        title: page.data.title,
        description: page.data.description ?? '',
        url: page.url,
        content: await getPageText(page),
      };
    }),
  );

  return docs.filter((doc): doc is SearchDocument => Boolean(doc));
}

async function getPageText(page: (typeof source)['$inferPage']) {
  try {
    return await page.data.getText('processed');
  } catch {
    return await page.data.getText('raw');
  }
}

function getComponentsIndexDocument(): SearchDocument {
  return {
    id: '/components',
    type: 'components',
    url: '/components',
    title: 'Components',
    description:
      'Browse reusable LoveUI React components, examples, and product interface patterns for Tailwind CSS applications.',
    content: componentLinks
      .map(
        (component) =>
          `${component.name} component. ${component.description} URL: /components/${component.slug}`,
      )
      .join('\n'),
  };
}

function getComponentDocuments(): SearchDocument[] {
  return componentLinks.map((component) => {
    const examples = getComponentExampleNames(component.slug);
    const exampleCount = getComponentExampleCount(component.slug);

    return {
      id: `/components/${component.slug}`,
      type: 'component',
      url: `/components/${component.slug}`,
      title: `${component.name} Examples`,
      description: `${exampleCount} interactive examples for the ${component.name} React component.`,
      content: [
        `${component.name} React component.`,
        component.description,
        `Route: /components/${component.slug}`,
        `Example count: ${exampleCount}`,
        `Example registry names: ${examples.join(', ')}`,
        `Install command: npx love-ui add ${component.slug}`,
        `${component.name} Tailwind component examples and product interface patterns.`,
      ].join('\n'),
    };
  });
}

function getBlocksIndexDocument(): SearchDocument {
  return {
    id: '/blocks',
    type: 'blocks',
    url: '/blocks',
    title: 'Blocks',
    description:
      'Browse production-ready LoveUI blocks for composing complete application screens with Tailwind CSS.',
    content: blockLinks
      .map(
        (block) =>
          `${block.name} blocks. ${block.description} URL: /blocks/${block.slug}`,
      )
      .join('\n'),
  };
}

function getBlockDocuments(blockExamples: SearchDocument[]): SearchDocument[] {
  return blockLinks.map((block) => {
    const examples = blockExamples.filter(
      (example) => example.url === `/blocks/${block.slug}`,
    );

    return {
      id: `/blocks/${block.slug}`,
      type: 'block',
      url: `/blocks/${block.slug}`,
      title: `${block.name} Blocks`,
      description: block.description,
      content: [
        `${block.name} blocks for LoveUI.`,
        block.description,
        `Route: /blocks/${block.slug}`,
        `Available examples: ${examples.map((example) => example.title).join(', ')}`,
        ...examples.map((example) => `${example.title}: ${example.description}`),
      ].join('\n'),
    };
  });
}

async function getBlockExampleDocuments(): Promise<SearchDocument[]> {
  const pages = await Promise.all(
    blockLinks.map(async (block) => {
      const filePath = path.join(process.cwd(), 'app', 'blocks', block.slug, 'page.tsx');
      const source = await readFile(filePath, 'utf8');
      const examples = extractBlockExamples(source);

      return examples.map((example) => ({
        id: `/blocks/${block.slug}#${example.installName}`,
        type: 'block-example' as const,
        url: `/blocks/${block.slug}`,
        title: example.title,
        description: example.description,
        content: [
          `${example.title} ${block.name} block.`,
          example.description,
          block.description,
          `Route: /blocks/${block.slug}`,
          `Registry id: ${example.id}`,
          `Install name: ${example.installName}`,
          `Install command: npx love-ui add ${example.installName}`,
          `Aliases: ${getNumberAliases(example.title)}`,
          example.id.replace(/[0-9-]/g, ' '),
        ].join('\n'),
      }));
    }),
  );

  return pages.flat();
}

function extractBlockExamples(source: string) {
  const examples: Array<{
    id: string;
    installName: string;
    title: string;
    description: string;
  }> = [];
  const blockPattern =
    /{\s*id:\s*'([^']+)'[\s\S]*?installName:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?description:\s*(?:'([^']+)'|"([^"]+)"|`([^`]+)`)/g;

  for (const match of source.matchAll(blockPattern)) {
    examples.push({
      id: match[1],
      installName: match[2],
      title: match[3],
      description: normalizeWhitespace(match[4] ?? match[5] ?? match[6] ?? ''),
    });
  }

  return examples;
}

function getNumberAliases(value: string) {
  return value.replace(/\b(\d+)\b/g, (_, digit: string) => {
    const word = numberWords[Number(digit)];
    return word ? `${digit} ${word}` : digit;
  });
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}
