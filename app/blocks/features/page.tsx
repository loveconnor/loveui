import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { FeatureSection as FeaturesOne } from '@/registry/default/blocks/features1/components/feature-section';
import { FeatureSection as FeaturesTwo } from '@/registry/default/blocks/features2/components/feature-section';
import { FeatureSection as FeaturesThree } from '@/registry/default/blocks/features3/components/feature-section';
import { FeatureSection as FeaturesFour } from '@/registry/default/blocks/features4/components/feature-section';
import { FeatureSection as FeaturesFive } from '@/registry/default/blocks/features5/components/feature-section';
import { FeatureSection as FeaturesSix } from '@/registry/default/blocks/features6/components/feature-section';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const featuresBlocksDescription =
  'Feature blocks for presenting product capabilities, benefits, and visual proof points.';

const featuresBlocks = [
  {
    id: 'features1',
    installName: 'features-one',
    title: 'Features 1',
    description: 'Compact four-column feature strip with icon dividers.',
    component: <FeaturesOne />,
    files: ['app/page.tsx', 'components/feature-section.tsx'],
  },
  {
    id: 'features2',
    installName: 'features-two',
    title: 'Features 2',
    description: 'Three-card feature section with dashed borders and corner accents.',
    component: <FeaturesTwo />,
    files: [
      'app/page.tsx',
      'components/feature-section.tsx',
      'components/decor-icon.tsx',
    ],
  },
  {
    id: 'features3',
    installName: 'features-three',
    title: 'Features 3',
    description: 'Full-width bordered feature grid with section dividers.',
    component: <FeaturesThree />,
    files: [
      'app/page.tsx',
      'components/feature-section.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: 'features4',
    installName: 'features-four',
    title: 'Features 4',
    description: 'Product feature cards with extended borders and icon badges.',
    component: <FeaturesFour />,
    files: [
      'app/page.tsx',
      'components/feature-section.tsx',
      'components/decor-icon.tsx',
    ],
  },
  {
    id: 'features5',
    installName: 'features-five',
    title: 'Features 5',
    description: 'Six-card feature grid with subtle grid-pattern backgrounds.',
    component: <FeaturesFive />,
    files: [
      'app/page.tsx',
      'components/feature-section.tsx',
      'components/grid-pattern.tsx',
    ],
  },
  {
    id: 'features6',
    installName: 'features-six',
    title: 'Features 6',
    description: 'Large feature grid with custom visuals, analytics, and globe card.',
    component: <FeaturesSix />,
    files: [
      'app/page.tsx',
      'components/feature-section.tsx',
      'components/cobe-globe.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Features Blocks',
  description: featuresBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React feature blocks',
    'Tailwind feature sections',
    'SaaS feature grid',
    'product feature cards',
  ],
  alternates: {
    canonical: '/blocks/features',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Features Blocks',
    description: featuresBlocksDescription,
    url: '/blocks/features',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Features Blocks',
    description: featuresBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function FeaturesBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Features Blocks',
    description: featuresBlocksDescription,
    url: '/blocks/features',
  });
  const blocks = await Promise.all(
    featuresBlocks.map(async (block) => {
      const sourceFiles = await getFeaturesBlockSourceFiles(block.id, block.files);

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
              Features Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Product capability sections composed from LoveUI primitives.
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

async function getFeaturesBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
