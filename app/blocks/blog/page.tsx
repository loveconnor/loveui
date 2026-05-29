import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { BlogsSection as BlogOne } from '@/registry/default/blocks/blogs1/components/blogs';
import { BlogsSection as BlogTwo } from '@/registry/default/blocks/blogs2/components/blogs';
import { BlogsSection as BlogThree } from '@/registry/default/blocks/blogs3/components/blogs';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const blogBlocksDescription =
  'Blog blocks for changelogs, product writing, editorial grids, and resource pages.';

const blogBlocks = [
  {
    id: 'blogs1',
    installName: 'blog-one',
    title: 'Blog 1',
    description: 'Compact blog index with dashed date rails and divider accents.',
    component: <BlogOne />,
    files: [
      'app/page.tsx',
      'components/blogs.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: 'blogs2',
    installName: 'blog-two',
    title: 'Blog 2',
    description: 'Dense editorial card grid with categories, authors, and filler cells.',
    component: <BlogTwo />,
    files: [
      'app/page.tsx',
      'components/blogs.tsx',
      'components/full-width-divider.tsx',
      'components/grid-filler.tsx',
    ],
  },
  {
    id: 'blogs3',
    installName: 'blog-three',
    title: 'Blog 3',
    description:
      'Image-led blog grid with lazy-loaded thumbnails and article metadata.',
    component: <BlogThree />,
    files: [
      'app/page.tsx',
      'components/blogs.tsx',
      'components/full-width-divider.tsx',
      'components/lazy-image.tsx',
      'components/aspect-ratio.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Blog Blocks',
  description: blogBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React blog blocks',
    'Tailwind blog sections',
    'article grid blocks',
    'resource page blocks',
  ],
  alternates: {
    canonical: '/blocks/blog',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Blog Blocks',
    description: blogBlocksDescription,
    url: '/blocks/blog',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Blog Blocks',
    description: blogBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function BlogBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Blog Blocks',
    description: blogBlocksDescription,
    url: '/blocks/blog',
  });
  const blocks = await Promise.all(
    blogBlocks.map(async (block) => {
      const sourceFiles = await getBlogBlockSourceFiles(block.id, block.files);

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
              Blog Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Editorial indexes and article grids composed from LoveUI primitives.
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

async function getBlogBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
