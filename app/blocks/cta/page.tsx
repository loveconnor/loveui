import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { CallToAction as CtaOne } from '@/registry/default/blocks/cta-1/components/cta';
import { CallToAction as CtaTwo } from '@/registry/default/blocks/cta-2/components/cta';
import { CallToAction as CtaThree } from '@/registry/default/blocks/cta-3/components/cta';
import { CallToAction as CtaFour } from '@/registry/default/blocks/cta-4/components/cta';
import { CallToAction as CtaFive } from '@/registry/default/blocks/cta-5/components/cta';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const ctaBlocksDescription =
  'CTA blocks for focused conversion moments, newsletter signups, and sales motions.';

const ctaBlocks = [
  {
    id: 'cta-1',
    installName: 'cta-one',
    title: 'CTA 1',
    description: 'Split call-to-action bar with compact copy and paired buttons.',
    component: <CtaOne />,
    files: [
      'app/page.tsx',
      'components/cta.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: 'cta-2',
    installName: 'cta-two',
    title: 'CTA 2',
    description: 'Stacked CTA section with supporting copy and a tinted action row.',
    component: <CtaTwo />,
    files: [
      'app/page.tsx',
      'components/cta.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: 'cta-3',
    installName: 'cta-three',
    title: 'CTA 3',
    description: 'Bordered CTA panel with corner accents and centered actions.',
    component: <CtaThree />,
    files: [
      'app/page.tsx',
      'components/cta.tsx',
      'components/decor-icon.tsx',
    ],
  },
  {
    id: 'cta-4',
    installName: 'cta-four',
    title: 'CTA 4',
    description: 'Rounded card CTA with trial messaging and button pair.',
    component: <CtaFour />,
    files: ['app/page.tsx', 'components/cta.tsx'],
  },
  {
    id: 'cta-5',
    installName: 'cta-five',
    title: 'CTA 5',
    description: 'Newsletter CTA with email input, proof avatars, and divider rails.',
    component: <CtaFive />,
    files: [
      'app/page.tsx',
      'components/cta.tsx',
      'components/full-width-divider.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'CTA Blocks',
  description: ctaBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React CTA blocks',
    'Tailwind CTA sections',
    'newsletter signup block',
    'conversion section',
  ],
  alternates: {
    canonical: '/blocks/cta',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI CTA Blocks',
    description: ctaBlocksDescription,
    url: '/blocks/cta',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI CTA Blocks',
    description: ctaBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function CtaBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI CTA Blocks',
    description: ctaBlocksDescription,
    url: '/blocks/cta',
  });
  const blocks = await Promise.all(
    ctaBlocks.map(async (block) => {
      const sourceFiles = await getCtaBlockSourceFiles(block.id, block.files);

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
              CTA Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Focused conversion sections composed from LoveUI primitives.
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

async function getCtaBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
