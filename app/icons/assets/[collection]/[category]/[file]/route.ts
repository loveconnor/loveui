import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

import { isAssetCollection } from '@/lib/icons-registry';

type RouteProps = {
  params: Promise<{
    collection: string;
    category: string;
    file: string;
  }>;
};

const registryRoots = {
  icons: 'packages/loveui/registry/default/icons/src/logos',
  logos: 'packages/loveui/registry/default/logos/src/logos',
  vectors: 'packages/loveui/registry/default/vectors/src/logos',
} as const;

export async function GET(_request: Request, { params }: RouteProps) {
  const { collection, category, file } = await params;

  if (
    !isAssetCollection(collection) ||
    category.includes('/') ||
    file.includes('/') ||
    !file.endsWith('.svg')
  ) {
    return new NextResponse('Not found', { status: 404 });
  }

  const root = path.join(process.cwd(), registryRoots[collection]);
  const assetPath = path.join(root, category, file);

  if (!assetPath.startsWith(root)) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const svg = await readFile(assetPath, 'utf8');

    return new NextResponse(svg, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': 'image/svg+xml; charset=utf-8',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
