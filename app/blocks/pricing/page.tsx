import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { PricingSection as PricingOne } from '@/registry/default/blocks/pricing1/components/pricing';
import { PricingSection as PricingTwo } from '@/registry/default/blocks/pricing2/components/pricing';
import { PricingSection as PricingThree } from '@/registry/default/blocks/pricing3/components/pricing';
import { PricingSection as PricingFour } from '@/registry/default/blocks/pricing4/components/pricing';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const pricingBlocksDescription =
  'Pricing blocks for SaaS plans, plan comparison, billing toggles, and conversion-focused upgrade flows.';

const pricingBlocks = [
  {
    id: 'pricing1',
    installName: 'pricing-one',
    title: 'Pricing 1',
    description:
      'Compact monthly and yearly pricing panel with discount badges and a trust note.',
    component: <PricingOne />,
    files: ['app/page.tsx', 'components/pricing.tsx', 'components/decor-icon.tsx'],
  },
  {
    id: 'pricing2',
    installName: 'pricing-two',
    title: 'Pricing 2',
    description:
      'Bordered two-plan pricing grid with feature checklists and full-width dividers.',
    component: <PricingTwo />,
    files: [
      'app/page.tsx',
      'components/pricing.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: 'pricing3',
    installName: 'pricing-three',
    title: 'Pricing 3',
    description:
      'Three-tier pricing cards with icons, badges, original prices, and feature lists.',
    component: <PricingThree />,
    files: [
      'app/page.tsx',
      'components/pricing.tsx',
      'components/pricing-card.tsx',
    ],
  },
  {
    id: 'pricing4',
    installName: 'pricing-four',
    title: 'Pricing 4',
    description:
      'Animated pricing table with monthly/yearly toggle, discounts, and highlighted plan.',
    component: <PricingFour />,
    files: [
      'app/page.tsx',
      'components/pricing.tsx',
      'components/frequency-toggle.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Pricing Blocks',
  description: pricingBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React pricing blocks',
    'Tailwind pricing sections',
    'SaaS pricing table',
    'billing toggle blocks',
  ],
  alternates: {
    canonical: '/blocks/pricing',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Pricing Blocks',
    description: pricingBlocksDescription,
    url: '/blocks/pricing',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Pricing Blocks',
    description: pricingBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function PricingBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Pricing Blocks',
    description: pricingBlocksDescription,
    url: '/blocks/pricing',
  });
  const blocks = await Promise.all(
    pricingBlocks.map(async (block) => {
      const sourceFiles = await getPricingBlockSourceFiles(block.id, block.files);

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
              Pricing Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Pricing and plan comparison sections composed from LoveUI primitives.
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

async function getPricingBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
