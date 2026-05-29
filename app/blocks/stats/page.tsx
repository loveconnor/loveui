import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import StatsOne from '@/registry/default/blocks/stats1/components/stats';
import StatsTwo from '@/registry/default/blocks/stats2/components/stats';
import StatsThree from '@/registry/default/blocks/stats3/components/stats';
import StatsFour from '@/registry/default/blocks/stats4/components/stats';
import StatsFive from '@/registry/default/blocks/stats5/components/stats';
import StatsSix from '@/registry/default/blocks/stats6/components/stats';
import StatsSeven from '@/registry/default/blocks/stats7/components/stats';
import StatsEight from '@/registry/default/blocks/stats8/components/stats';
import StatsNine from '@/registry/default/blocks/stats9/components/stats';
import StatsTen from '@/registry/default/blocks/stats10/components/stats';
import StatsEleven from '@/registry/default/blocks/stats11/components/stats';
import StatsTwelve from '@/registry/default/blocks/stats12/components/stats';
import StatsThirteen from '@/registry/default/blocks/stats13/components/stats';
import { Stats14 as StatsFourteen } from '@/registry/default/blocks/stats14/components/stats';
import { Stats15 as StatsFifteen } from '@/registry/default/blocks/stats15/components/stats';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const statsBlocksDescription =
  'Stats blocks for metrics, usage summaries, product dashboards, and performance highlights.';

const statsBlocks = [
  {
    id: 'stats1',
    installName: 'stats-one',
    title: 'Stats 1',
    description: 'Bordered four-column metric strip with directional change labels.',
    component: <StatsOne />,
  },
  {
    id: 'stats2',
    installName: 'stats-two',
    title: 'Stats 2',
    description: 'Divided metric cards with previous values and trend badges.',
    component: <StatsTwo />,
  },
  {
    id: 'stats3',
    installName: 'stats-three',
    title: 'Stats 3',
    description: 'Responsive metric cards with compact change indicators.',
    component: <StatsThree />,
  },
  {
    id: 'stats4',
    installName: 'stats-four',
    title: 'Stats 4',
    description: 'Three-card metric row with badge trends and large values.',
    component: <StatsFour />,
  },
  {
    id: 'stats5',
    installName: 'stats-five',
    title: 'Stats 5',
    description: 'Metric cards with footer links and positive or negative movement.',
    component: <StatsFive />,
  },
  {
    id: 'stats6',
    installName: 'stats-six',
    title: 'Stats 6',
    description: 'Status-driven metric cards with goals and contextual icons.',
    component: <StatsSix />,
  },
  {
    id: 'stats7',
    installName: 'stats-seven',
    title: 'Stats 7',
    description: 'Plan overview cards with radial capacity charts.',
    component: <StatsSeven />,
  },
  {
    id: 'stats8',
    installName: 'stats-eight',
    title: 'Stats 8',
    description: 'Radial progress cards with category coverage and footer links.',
    component: <StatsEight />,
  },
  {
    id: 'stats9',
    installName: 'stats-nine',
    title: 'Stats 9',
    description: 'Usage limit cards with progress bars and quota labels.',
    component: <StatsNine />,
  },
  {
    id: 'stats10',
    installName: 'stats-ten',
    title: 'Stats 10',
    description: 'Sparkline metric cards with positive and negative trend charts.',
    component: <StatsTen />,
  },
  {
    id: 'stats11',
    installName: 'stats-eleven',
    title: 'Stats 11',
    description: 'Usage guardrail cards with progress, actions, and edit dialog.',
    component: <StatsEleven />,
  },
  {
    id: 'stats12',
    installName: 'stats-twelve',
    title: 'Stats 12',
    description: 'Compact usage list with donut progress indicators.',
    component: <StatsTwelve />,
  },
  {
    id: 'stats13',
    installName: 'stats-thirteen',
    title: 'Stats 13',
    description: 'Stacked usage bar with segment legend and free capacity.',
    component: <StatsThirteen />,
  },
  {
    id: 'stats14',
    installName: 'stats-fourteen',
    title: 'Stats 14',
    description: 'Compact usage card with breakdown bar and category legend.',
    component: <StatsFourteen />,
  },
  {
    id: 'stats15',
    installName: 'stats-fifteen',
    title: 'Stats 15',
    description: 'Small projection list with values and percentage badges.',
    component: <StatsFifteen />,
  },
];

export const metadata: Metadata = {
  title: 'Stats Blocks',
  description: statsBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React stats blocks',
    'Tailwind metric cards',
    'dashboard stats sections',
    'usage metric blocks',
  ],
  alternates: {
    canonical: '/blocks/stats',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Stats Blocks',
    description: statsBlocksDescription,
    url: '/blocks/stats',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Stats Blocks',
    description: statsBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function StatsBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Stats Blocks',
    description: statsBlocksDescription,
    url: '/blocks/stats',
  });
  const blocks = await Promise.all(
    statsBlocks.map(async (block) => {
      const sourceFiles = await getStatsBlockSourceFiles(block.id);

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
              Stats Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Metric cards and usage summaries composed from LoveUI primitives.
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

async function getStatsBlockSourceFiles(blockId: string) {
  return Promise.all(
    ['app/page.tsx', 'components/stats.tsx'].map(async (file) => {
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
