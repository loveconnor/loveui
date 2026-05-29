import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { ImageGallery as ImageGalleryOne } from '@/registry/default/blocks/image-gallery-1/components/image-gallery';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const imageGalleryBlocksDescription =
  'Image gallery blocks for building responsive visual grids and editorial media sections.';

const imageGalleryBlocks = [
  {
    id: 'image-gallery-1',
    installName: 'image-gallery-one',
    title: 'Image Gallery 1',
    description: 'Responsive masonry-style image grid with lazy image loading.',
    component: <ImageGalleryOne />,
    files: [
      'app/page.tsx',
      'components/image-gallery.tsx',
      'components/lazy-image.tsx',
      'components/aspect-ratio.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Image Gallery Blocks',
  description: imageGalleryBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React image gallery block',
    'Tailwind image gallery',
    'masonry gallery',
    'responsive image grid',
  ],
  alternates: {
    canonical: '/blocks/image-gallery',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Image Gallery Blocks',
    description: imageGalleryBlocksDescription,
    url: '/blocks/image-gallery',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Image Gallery Blocks',
    description: imageGalleryBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function ImageGalleryBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Image Gallery Blocks',
    description: imageGalleryBlocksDescription,
    url: '/blocks/image-gallery',
  });
  const blocks = await Promise.all(
    imageGalleryBlocks.map(async (block) => {
      const sourceFiles = await getImageGalleryBlockSourceFiles(
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
              Image Gallery Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Responsive media galleries composed from LoveUI primitives.
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
              <div className="max-h-[760px] overflow-y-auto bg-background">
                {block.component}
              </div>
            </BlockExampleCardShell>
          ))}
        </div>
      </div>
    </main>
  );
}

async function getImageGalleryBlockSourceFiles(
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
