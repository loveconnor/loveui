import type { Metadata } from 'next';

import { Card } from '@/components/card';
import { chartBlocks } from '@/lib/chart-blocks';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const chartsDescription =
  'Browse production-ready LoveUI Pro chart blocks for dashboards, analytics surfaces, and reporting views.';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Charts',
  description: chartsDescription,
  keywords: [
    ...siteKeywords,
    'LoveUI Pro charts',
    'Recharts chart blocks',
    'dashboard chart components',
    'analytics UI blocks',
  ],
  alternates: {
    canonical: '/charts',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Pro Charts',
    description: chartsDescription,
    url: '/charts',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Pro Charts',
    description: chartsDescription,
    images: ['/logo.png'],
  },
};

export default function ChartsPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Pro Charts',
    description: chartsDescription,
    url: '/charts',
  });

  return (
    <main className="[grid-area:main] min-w-0 bg-fd-background px-5 py-10 md:px-9 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="max-w-[820px]">
          <h1 className="inline-flex items-start gap-2 text-4xl font-semibold leading-tight tracking-normal text-foreground">
            Charts
            <span className="mt-1 rounded-[3px] bg-[#0d74fd] px-2 py-1 text-xs font-medium uppercase leading-none text-white">
              pro
            </span>
          </h1>
          <p className="mt-3 max-w-[780px] text-[15px] font-medium leading-6 text-muted-foreground">
            Production-ready chart blocks built for dashboards and reporting
            interfaces. Start with a chart type, then adapt the examples to fit
            your product data.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {chartBlocks.map((chart) => (
            <Card
              key={chart.slug}
              url={`/charts/${chart.slug}`}
              className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            >
              <div className="relative h-[260px] overflow-hidden rounded-[14px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                <div className="pointer-events-none absolute inset-0 p-5 [&_[data-slot=card]]:h-full [&_[data-slot=card]]:w-full [&_[data-slot=card]]:gap-0 [&_[data-slot=card]]:overflow-hidden [&_[data-slot=card]]:rounded-none [&_[data-slot=card]]:border-0 [&_[data-slot=card]]:bg-transparent [&_[data-slot=card]]:py-0 [&_[data-slot=card]]:shadow-none [&_[data-slot=card]]:ring-0 [&_[data-slot=card-content]]:flex [&_[data-slot=card-content]]:h-full [&_[data-slot=card-content]]:items-center [&_[data-slot=card-content]]:px-0 [&_[data-slot=card-content]]:py-0 [&_[data-slot=card-footer]]:hidden [&_[data-slot=card-header]]:hidden [&_[data-slot=chart]]:aspect-auto [&_[data-slot=chart]]:h-full [&_[data-slot=chart]]:max-h-full [&_[data-slot=chart]]:w-full">
                  {chart.component}
                </div>
              </div>
              <div className="flex min-h-20 flex-col justify-center gap-1 px-3 pt-2">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  {chart.name}
                </h2>
                <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
                  {chart.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
