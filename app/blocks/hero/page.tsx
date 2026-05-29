import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Header as HeaderOne } from '@/registry/default/blocks/hero1/components/header';
import { HeroSection as HeroOne } from '@/registry/default/blocks/hero1/components/hero';
import { LogosSection as LogosOne } from '@/registry/default/blocks/hero1/components/logos-section';
import { Header as HeaderTwo } from '@/registry/default/blocks/hero2/components/header';
import { HeroSection as HeroTwo } from '@/registry/default/blocks/hero2/components/hero';
import { LogosSection as LogosTwo } from '@/registry/default/blocks/hero2/components/logos-section';
import { Header as HeaderThree } from '@/registry/default/blocks/hero3/components/header';
import { HeroSection as HeroThree } from '@/registry/default/blocks/hero3/components/hero';
import { LogosSection as LogosThree } from '@/registry/default/blocks/hero3/components/logos-section';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const heroBlocksDescription =
  'Hero blocks for building polished above-the-fold product and agency pages.';

const logoFiles = [
  'components/logos/claude-wordmark.svg',
  'components/logos/clerk-wordmark.svg',
  'components/logos/github-wordmark.svg',
  'components/logos/nvidia-wordmark.svg',
  'components/logos/openai-wordmark.svg',
  'components/logos/supabase-wordmark.svg',
  'components/logos/turso-wordmark.svg',
  'components/logos/vercel-wordmark.svg',
];

const sharedHeroFiles = [
  'app/page.tsx',
  'components/header.tsx',
  'components/hero.tsx',
  'components/infinite-slider.tsx',
  'components/logo-cloud.tsx',
  'components/logo.tsx',
  'components/logos-section.tsx',
  'components/mobile-nav.tsx',
  'components/ui/portal.tsx',
  'hooks/use-scroll.ts',
  ...logoFiles,
];

const heroBlocks = [
  {
    id: 'hero1',
    installName: 'hero-one',
    title: 'Hero 1',
    description: 'Centered hero with sticky header, pill announcement, and logo marquee.',
    component: (
      <>
        <HeaderOne />
        <main className="grow">
          <HeroOne />
          <LogosOne />
        </main>
      </>
    ),
    files: sharedHeroFiles,
  },
  {
    id: 'hero2',
    installName: 'hero-two',
    title: 'Hero 2',
    description: 'Bordered agency hero with dashboard preview and partner logos.',
    component: (
      <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
        <HeaderTwo />
        <main className="relative mx-auto max-w-4xl grow before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border">
          <HeroTwo />
          <LogosTwo />
        </main>
      </div>
    ),
    files: [
      'app/page.tsx',
      'components/decor-icon.tsx',
      'components/full-width-divider.tsx',
      ...sharedHeroFiles.filter((file) => file !== 'app/page.tsx'),
    ],
  },
  {
    id: 'hero3',
    installName: 'hero-three',
    title: 'Hero 3',
    description: 'Left-aligned hero with product preview, sticky header, and logo row.',
    component: (
      <>
        <HeaderThree />
        <main className="grow">
          <HeroThree />
          <LogosThree />
        </main>
      </>
    ),
    files: sharedHeroFiles,
  },
];

export const metadata: Metadata = {
  title: 'Hero Blocks',
  description: heroBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React hero blocks',
    'Tailwind hero sections',
    'landing page hero',
    'SaaS hero template',
  ],
  alternates: {
    canonical: '/blocks/hero',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Hero Blocks',
    description: heroBlocksDescription,
    url: '/blocks/hero',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Hero Blocks',
    description: heroBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function HeroBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Hero Blocks',
    description: heroBlocksDescription,
    url: '/blocks/hero',
  });
  const blocks = await Promise.all(
    heroBlocks.map(async (block) => {
      const sourceFiles = await getHeroBlockSourceFiles(block.id, block.files);

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
              Hero Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Full hero sections composed from LoveUI primitives.
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
              <div className="relative min-h-[720px] overflow-hidden bg-background">
                {block.component}
              </div>
            </BlockExampleCardShell>
          ))}
        </div>
      </div>
    </main>
  );
}

async function getHeroBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
