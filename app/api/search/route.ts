import { getSearchDocuments, type SearchDocument } from '@/lib/search-corpus';

type CommandSearchResult = {
  id: string;
  type: 'page' | 'text';
  url: string;
  content: string;
  breadcrumbs?: string[];
};

const searchDocuments = getSearchDocuments();

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = (params.get('query') ?? params.get('q') ?? '').trim();

  if (!query) {
    return Response.json([]);
  }

  const documents = await searchDocuments;

  return Response.json(searchCommandDocuments(documents, query));
}

function searchCommandDocuments(
  documents: SearchDocument[],
  query: string,
): CommandSearchResult[] {
  const normalizedQuery = normalizeSearchValue(query);
  const terms = normalizedQuery.split(' ').filter(Boolean);

  if (terms.length === 0) return [];

  return documents
    .map((document) => ({
      document,
      score: getSearchScore(document, normalizedQuery, terms),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      return a.document.title.localeCompare(b.document.title);
    })
    .slice(0, 50)
    .map(({ document }) => toCommandSearchResult(document));
}

function getSearchScore(
  document: SearchDocument,
  query: string,
  terms: string[],
) {
  const title = normalizeSearchValue(document.title);
  const description = normalizeSearchValue(document.description);
  const content = normalizeSearchValue(document.content);
  const url = normalizeSearchValue(document.url);
  const type = normalizeSearchValue(document.type);
  const searchableText = [title, description, content, url, type].join(' ');

  if (!terms.every((term) => searchableText.includes(term))) return 0;

  let score = getFieldScore(title, query, terms, 120, 80, 48);
  score += getFieldScore(description, query, terms, 42, 30, 18);
  score += getFieldScore(url, query, terms, 30, 22, 12);
  score += getFieldScore(type, query, terms, 18, 12, 8);
  score += getFieldScore(content, query, terms, 16, 10, 5);

  if (document.type === 'icon-asset') score += 32;
  if (document.type === 'component' || document.type === 'block-example') {
    score += 12;
  }

  return score;
}

function getFieldScore(
  field: string,
  query: string,
  terms: string[],
  exactScore: number,
  startsWithScore: number,
  includesScore: number,
) {
  let score = 0;

  if (field === query) score += exactScore;
  if (field.startsWith(query)) score += startsWithScore;
  if (field.includes(query)) score += includesScore;

  for (const term of terms) {
    if (field.split(' ').some((word) => word === term)) {
      score += Math.floor(includesScore * 0.65);
      continue;
    }

    if (field.includes(term)) {
      score += Math.floor(includesScore * 0.35);
    }
  }

  return score;
}

function toCommandSearchResult(document: SearchDocument): CommandSearchResult {
  return {
    id: document.id,
    type: document.type === 'icon-asset' ? 'text' : 'page',
    url: document.url,
    content: document.title,
    breadcrumbs: getSearchBreadcrumbs(document),
  };
}

function getSearchBreadcrumbs(document: SearchDocument) {
  if (document.type === 'icon-asset') {
    const [, collection = 'icons', category] =
      document.id.match(/^\/icons\/assets\/([^/]+)\/([^/]+)/) ?? [];
    const collectionLabel =
      collection === 'icons' ? undefined : formatBreadcrumb(collection);

    return [
      'Icons',
      collectionLabel,
      category ? formatBreadcrumb(category) : undefined,
    ].filter((item): item is string => Boolean(item));
  }

  if (document.url.startsWith('/components/')) return ['Components'];
  if (document.url.startsWith('/blocks/')) return ['Blocks'];
  if (document.url.startsWith('/docs/')) return ['Docs'];
  if (document.url.startsWith('/icons/logos')) return ['Icons', 'Logos'];
  if (document.url.startsWith('/icons/vectors')) return ['Icons', 'Vectors'];
  if (document.url.startsWith('/icons')) return ['Icons'];

  return undefined;
}

function normalizeSearchValue(value: string | undefined) {
  return (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatBreadcrumb(value: string) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
