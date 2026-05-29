import type { Metadata } from 'next';
import { Card } from '@/components/card';
import { AuthPage as AuthPreviewBlock } from '@/registry/default/blocks/auth2/components/auth';
import { CallToAction as CtaPreviewBlock } from '@/registry/default/blocks/cta-2/components/cta';
import { FeatureSection as FeaturesPreviewBlock } from '@/registry/default/blocks/features4/components/feature-section';
import { HeroSection as HeroPreviewBlock } from '@/registry/default/blocks/hero1/components/hero';
import { Header as HeaderPreviewBlock } from '@/registry/default/blocks/header3/components/header';
import { DemoLayout as HeaderPreviewLayout } from '@/registry/default/blocks/header3/components/demo-layout';
import { ImageGallery as ImageGalleryPreviewBlock } from '@/registry/default/blocks/image-gallery-1/components/image-gallery';
import { Footer as FooterPreviewBlock } from '@/registry/default/blocks/footer2/components/footer';
import { LogoCloud as LogoCloudPreviewBlock } from '@/registry/default/blocks/logo-cloud-1/components/logo-cloud';
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

function AuthCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="absolute left-1/2 top-1/2 w-[680px] -translate-x-1/2 -translate-y-1/2 scale-[0.32] pointer-events-none">
        <AuthPreviewBlock />
      </div>
    </div>
  );
}

function HeroCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-0 w-[980px] origin-top -translate-x-1/2 scale-[0.32]">
        <HeroPreviewBlock />
      </div>
    </div>
  );
}

function FeaturesCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[980px] -translate-x-1/2 -translate-y-1/2 scale-[0.34]">
        <FeaturesPreviewBlock />
      </div>
    </div>
  );
}

function CtaCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[760px] -translate-x-1/2 -translate-y-1/2 scale-[0.46]">
        <CtaPreviewBlock />
      </div>
    </div>
  );
}

function HeaderCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-3 w-[1040px] origin-top -translate-x-1/2 scale-[0.32]">
        <HeaderPreviewBlock />
        <HeaderPreviewLayout />
      </div>
    </div>
  );
}

function FooterCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 bottom-0 w-[960px] origin-bottom -translate-x-1/2 scale-[0.34]">
        <FooterPreviewBlock />
      </div>
    </div>
  );
}

function LogoCloudCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[680px] -translate-x-1/2 -translate-y-1/2 scale-[0.48]">
        <LogoCloudPreviewBlock />
      </div>
    </div>
  );
}

function ImageGalleryCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-0 w-[980px] origin-top -translate-x-1/2 scale-[0.28]">
        <ImageGalleryPreviewBlock />
      </div>
    </div>
  );
}

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
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <AuthCategoryPreview />
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
                3 Blocks
              </span>
            </div>
          </Card>
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/hero"
          >
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <HeroCategoryPreview />
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  Hero
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Landing page hero sections.
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                3 Blocks
              </span>
            </div>
          </Card>
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/header"
          >
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <HeaderCategoryPreview />
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  Header
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Navigation headers with scroll states.
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                3 Blocks
              </span>
            </div>
          </Card>
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/cta"
          >
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <CtaCategoryPreview />
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  CTA
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Conversion sections with focused actions.
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                5 Blocks
              </span>
            </div>
          </Card>
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/features"
          >
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <FeaturesCategoryPreview />
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  Features
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Product capability sections.
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                6 Blocks
              </span>
            </div>
          </Card>
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/footer"
          >
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <FooterCategoryPreview />
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  Footer
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Site footers with links and social surfaces.
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                6 Blocks
              </span>
            </div>
          </Card>
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/logo-cloud"
          >
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <LogoCloudCategoryPreview />
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  Logo Cloud
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Customer and partner brand sections.
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                5 Blocks
              </span>
            </div>
          </Card>
          <Card
            className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            url="/blocks/image-gallery"
          >
            <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
              <ImageGalleryCategoryPreview />
            </div>
            <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  Image Gallery
                </h2>
                <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
                  Responsive visual gallery sections.
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
