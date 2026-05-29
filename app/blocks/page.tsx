import type { Metadata } from 'next';
import { LockKeyholeIcon } from 'lucide-react';
import { Card } from '@/components/card';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const blocksDescription =
  'Browse production-ready LoveUI blocks for composing complete application screens with Tailwind CSS.';

export const metadata: Metadata = {
  title: 'Blocks',
  description: blocksDescription,
  keywords: [
    ...siteKeywords,
    'React blocks',
    'Tailwind blocks',
    'authentication block',
    'application screen templates',
  ],
  alternates: {
    canonical: '/blocks',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Blocks',
    description: blocksDescription,
    url: '/blocks',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Blocks',
    description: blocksDescription,
    images: ['/logo.png'],
  },
};

export default function BlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Blocks',
    description: blocksDescription,
    url: '/blocks',
  });

  return (
    <main className="[grid-area:main] min-w-0 bg-fd-background px-5 py-10 md:px-9 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-[1080px]">
        <div className="max-w-[820px]">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground">
            Blocks
          </h1>
          <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
            Complete interface sections built from LoveUI primitives. Start
            with a full screen, then adapt the pieces to fit your product.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/auth"
          >
            <div className="flex h-[184px] items-center justify-center overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <div className="flex size-16 items-center justify-center rounded-lg border bg-background shadow-xs">
                <LockKeyholeIcon className="size-7 text-foreground" />
              </div>
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  Auth
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Sign-in and account entry screens.
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                1 Block
              </span>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
