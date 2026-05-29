import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { NotFoundPage as NotFoundOne } from '@/registry/default/blocks/404-1/components/not-found';
import { NotFoundPage as NotFoundTwo } from '@/registry/default/blocks/404-2/components/not-found';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const notFoundBlocksDescription =
  '404 blocks for missing pages, broken links, empty routes, and recovery actions.';

const notFoundBlocks = [
  {
    id: '404-1',
    installName: '404-one',
    title: '404 1',
    description:
      'Bordered 404 empty state with divider rails and paired recovery actions.',
    component: <NotFoundOne />,
    files: [
      'app/page.tsx',
      'components/not-found.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: '404-2',
    installName: '404-two',
    title: '404 2',
    description:
      'Minimal centered 404 empty state with oversized masked title and action pair.',
    component: <NotFoundTwo />,
    files: ['app/page.tsx', 'components/not-found.tsx'],
  },
];

export const metadata: Metadata = {
  title: '404 Blocks',
  description: notFoundBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React 404 blocks',
    'Tailwind 404 page',
    'not found page',
    'empty state blocks',
  ],
  alternates: {
    canonical: '/blocks/404',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI 404 Blocks',
    description: notFoundBlocksDescription,
    url: '/blocks/404',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI 404 Blocks',
    description: notFoundBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function NotFoundBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI 404 Blocks',
    description: notFoundBlocksDescription,
    url: '/blocks/404',
  });
  const blocks = await Promise.all(
    notFoundBlocks.map(async (block) => {
      const sourceFiles = await getNotFoundBlockSourceFiles(
        block.id,
        block.files,
      );

      return {
        ...block,
        sourceFiles,
        sourceCode: sourceFiles
          .map((file) => `// ${file.path}\n${file.content.trimEnd()}`)
          .join('\n\n'),
      };
    }),
  );

  return (
    <main className="[grid-area:main] min-w-0 bg-fd-background px-5 py-10 md:px-9 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[820px]">
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground">
              404 Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Missing-page and recovery states composed from LoveUI primitives.
            </p>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <a href="/blocks">
              <ArrowLeftIcon />
              Blocks
            </a>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8">
          {blocks.map((block) => (
            <BlockExampleCardShell
              key={block.id}
              title={block.title}
              description={block.description}
              installName={block.installName}
              sourceCode={block.sourceCode}
              sourceFiles={block.sourceFiles}
            >
              <div className="bg-background px-4 py-12 md:px-8">
                {block.component}
              </div>
            </BlockExampleCardShell>
          ))}
        </div>
      </div>
    </main>
  );
}

async function getNotFoundBlockSourceFiles(
  blockId: string,
  blockFiles: string[],
) {
  return Promise.all(
    blockFiles.map(async (file) => {
      const content = await readFile(
        `${process.cwd()}/registry/default/blocks/${blockId}/${file}`,
        'utf8',
      );

      return {
        path: file,
        content: formatBlockSourceForDisplay(content),
      };
    }),
  );
}

function formatBlockSourceForDisplay(source: string) {
  return source
    .replace(/@\/registry\/default\/ui\//g, '@/components/ui/')
    .replace(/@\/registry\/default\/blocks\//g, '@/components/blocks/');
}
