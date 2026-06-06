import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { ArrowLeft as ArrowLeftIcon } from 'love-ui/icons';
import { PageFooter } from 'fumadocs-ui/layouts/docs/page';

import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { auth } from '@/lib/auth';
import {
  chartBlocks,
  getChartBlock,
  getChartExampleSourcePayload,
} from '@/lib/chart-blocks';
import { hasProAccess } from '@/lib/pro-access';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

type ChartPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = 'force-dynamic';

export default async function ChartPage({ params }: ChartPageProps) {
  const { slug } = await params;
  const chart = getChartBlock(slug);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const canViewProCode = await hasProAccess(session?.user.email);

  if (!chart) {
    notFound();
  }

  const examples = await Promise.all(
    chart.examples.map(async (example) => {
      if (!canViewProCode) {
        return {
          ...example,
          sourceCode: '',
          sourceFiles: [],
        };
      }

      return {
        ...example,
        ...(await getChartExampleSourcePayload(example)),
      };
    }),
  );
  const jsonLd = collectionPageJsonLd({
    name: `LoveUI Pro ${chart.name}`,
    description: chart.description,
    url: `/charts/${chart.slug}`,
  });

  return (
    <main className="[grid-area:main] min-w-0 bg-fd-background px-5 py-10 md:px-9 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-[1280px]">
        <Link
          href="/charts"
          className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Charts
        </Link>

        <div className="mt-8 max-w-[820px]">
          <h1 className="inline-flex items-start gap-2 text-4xl font-semibold leading-tight tracking-normal text-foreground">
            {chart.name}
            <span className="mt-1 rounded-[3px] bg-[#0d74fd] px-2 py-1 text-xs font-medium uppercase leading-none text-white">
              pro
            </span>
          </h1>
          <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
            {chart.description} This LoveUI Pro chart block includes a live
            preview, install command, and source files.
          </p>
        </div>

        <div className="not-prose mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {examples.map((example) => (
            <BlockExampleCardShell
              key={example.slug}
              title={example.name}
              description={example.description}
              installName={example.installName}
              packageName="loveui-pro"
              sourceCode={example.sourceCode}
              sourceFiles={example.sourceFiles}
              isCodeLocked={!canViewProCode}
              className="my-0 h-full"
            >
              <div className="flex min-h-[430px] items-stretch bg-background [&_[data-slot=card]]:h-full [&_[data-slot=card]]:w-full [&_[data-slot=card]]:rounded-none [&_[data-slot=card]]:bg-transparent [&_[data-slot=card]]:shadow-none [&_[data-slot=card]]:ring-0 [&_[data-slot=card]]:[border:0]">
                {example.component}
              </div>
            </BlockExampleCardShell>
          ))}
        </div>

        <PageFooter className="mt-10" items={getChartFooterItems(chart.slug)} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return chartBlocks.map((chart) => ({ slug: chart.slug }));
}

export async function generateMetadata({
  params,
}: ChartPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chart = getChartBlock(slug);

  if (!chart) {
    notFound();
  }

  const title = `${chart.name} - LoveUI Pro`;
  const description = `${chart.description} Built with Recharts for production dashboards and reporting views.`;

  return {
    title,
    description,
    keywords: [
      ...siteKeywords,
      `${chart.name} React`,
      `${chart.name} Recharts`,
      `${chart.name} dashboard block`,
    ],
    alternates: {
      canonical: `/charts/${chart.slug}`,
    },
    openGraph: {
      type: 'article',
      siteName: seo.name,
      title,
      description,
      url: `/charts/${chart.slug}`,
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
  };
}

function getChartFooterItems(slug: string) {
  const index = chartBlocks.findIndex((chart) => chart.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previous:
      index === 0
        ? {
            name: 'All Charts',
            url: '/charts',
            description: 'Browse every LoveUI Pro chart block.',
          }
        : toFooterItem(chartBlocks[index - 1]),
    next: chartBlocks[index + 1]
      ? toFooterItem(chartBlocks[index + 1])
      : undefined,
  };
}

function toFooterItem(chart: (typeof chartBlocks)[number]) {
  return {
    name: chart.name,
    url: `/charts/${chart.slug}`,
    description: chart.description,
  };
}
