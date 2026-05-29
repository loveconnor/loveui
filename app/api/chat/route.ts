import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from 'ai';
import { z } from 'zod';
import { Document, type DocumentData } from 'flexsearch';
import {
  getSearchDocuments,
  type SearchDocument,
  type SearchDocumentType,
} from '@/lib/search-corpus';

interface CustomDocument extends DocumentData {
  id: string;
  type: SearchDocumentType;
  url: string;
  title: string;
  description: string;
  content: string;
}

export type ChatUIMessage = UIMessage<
  never,
  {
    client: {
      location: string;
    };
  }
>;

const searchServer = createSearchServer();

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: 'id',
      index: ['title', 'description', 'content', 'type', 'url'],
      store: true,
    },
  });

  const docs = await getSearchDocuments();

  for (const doc of docs) {
    search.add(toCustomDocument(doc));
  }

  return search;
}

function toCustomDocument(doc: SearchDocument): CustomDocument {
  return doc;
}

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const DEFAULT_OPENROUTER_MODEL = 'openrouter/free';

function getOpenRouterModel() {
  return process.env.OPENROUTER_MODEL ?? DEFAULT_OPENROUTER_MODEL;
}

function getChatErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const model = getOpenRouterModel();

  if (!process.env.OPENROUTER_API_KEY) {
    return 'OpenRouter is not configured. Add OPENROUTER_API_KEY to .env.local and restart the dev server.';
  }

  if (
    (model.endsWith(':free') || model === 'openrouter/free') &&
    /rate.?limit|temporarily rate-limited|upstream/i.test(message)
  ) {
    return [
      `The configured OpenRouter model (${model}) is free and is currently rate-limited upstream.`,
      'Free OpenRouter models are best-effort; retry shortly, or use OPENROUTER_MODEL=openrouter/free to route across available free models.',
    ].join(' ');
  }

  if (/rate.?limit|temporarily rate-limited|upstream/i.test(message)) {
    return `The configured OpenRouter model (${model}) is currently rate-limited upstream. Retry shortly or switch OPENROUTER_MODEL.`;
  }

  return message || 'The AI chat request failed.';
}

/** System prompt, you can update it to provide more specific information */
const systemPrompt = [
  'You are an AI assistant for the LoveUI app and documentation site.',
  'Use the `search` tool to retrieve relevant app context before answering when needed.',
  'The search corpus includes docs, component pages, component examples, block pages, block examples, install names, and app routes.',
  'The `search` tool returns raw JSON results from the app search corpus. Use those results to ground your answer and cite sources as markdown links using the document `url` field when available.',
  'When a user asks what components or blocks exist, answer from search results with names, short descriptions, and links.',
  'If you cannot find the answer in search results, say you do not know and suggest a better search query.',
].join('\n');

export async function POST(req: Request, ctx: RouteContext<"/api/chat">) {
  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      {
        error:
          'OpenRouter is not configured. Add OPENROUTER_API_KEY to .env.local and restart the dev server.',
      },
      { status: 500 },
    );
  }

  const reqJson = await req.json();
  const model = getOpenRouterModel();

  const result = streamText({
    model: openrouter.chat(model),
    stopWhen: stepCountIs(5),
    tools: {
      search: searchTool,
    },
    messages: [
      { role: 'system', content: systemPrompt },
      ...(await convertToModelMessages<ChatUIMessage>(reqJson.messages ?? [], {
        convertDataPart(part) {
          if (part.type === 'data-client')
            return {
              type: 'text',
              text: `[Client Context: ${JSON.stringify(part.data)}]`,
            };
        },
      })),
    ],
    toolChoice: 'auto',
  });

  return result.toUIMessageStreamResponse({
    onError: getChatErrorMessage,
  });
}

export type SearchTool = typeof searchTool;

const searchTool = tool({
  description:
    'Search all LoveUI app content, including docs, component pages, examples, block pages, and block examples. Returns raw JSON results.',
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    const search = await searchServer;
    return await search.searchAsync(query, { limit, merge: true, enrich: true });
  },
});
