import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Card } from '@/components/card';
import { AuthPage as AuthPreviewBlock } from '@/registry/default/blocks/auth2/components/auth';
import { BlogsSection as BlogPreviewBlock } from '@/registry/default/blocks/blogs3/components/blogs';
import { CallToAction as CtaPreviewBlock } from '@/registry/default/blocks/cta-2/components/cta';
import { Contact as ContactPreviewBlock } from '@/registry/default/blocks/contact2/components/contact';
import { FaqsSection as FaqPreviewBlock } from '@/registry/default/blocks/faq-1/components/faq';
import { FeatureSection as FeaturesPreviewBlock } from '@/registry/default/blocks/features4/components/feature-section';
import { HeroSection as HeroPreviewBlock } from '@/registry/default/blocks/hero1/components/hero';
import { Header as HeaderPreviewBlock } from '@/registry/default/blocks/header3/components/header';
import { DemoLayout as HeaderPreviewLayout } from '@/registry/default/blocks/header3/components/demo-layout';
import { ImageGallery as ImageGalleryPreviewBlock } from '@/registry/default/blocks/image-gallery-1/components/image-gallery';
import { Integrations as IntegrationsPreviewBlock } from '@/registry/default/blocks/integrations5/components/integrations';
import { Footer as FooterPreviewBlock } from '@/registry/default/blocks/footer2/components/footer';
import { LogoCloud as LogoCloudPreviewBlock } from '@/registry/default/blocks/logo-cloud-1/components/logo-cloud';
import { NotFoundPage as NotFoundPreviewBlock } from '@/registry/default/blocks/404-2/components/not-found';
import { Onboarding06 as OnboardingPreviewBlock } from '@/registry/default/blocks/onboarding6/components/onboarding';
import { PricingSection as PricingPreviewBlock } from '@/registry/default/blocks/pricing1/components/pricing';
import { Stats14 as StatsPreviewBlock } from '@/registry/default/blocks/stats14/components/stats';
import { TestimonialsSection as TestimonialsPreviewBlock } from '@/registry/default/blocks/testimonials1/components/testimonials';
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

function BlogCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-0 w-[940px] origin-top -translate-x-1/2 scale-[0.28]">
        <BlogPreviewBlock />
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

function ContactCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[820px] -translate-x-1/2 -translate-y-1/2 scale-[0.36]">
        <ContactPreviewBlock />
      </div>
    </div>
  );
}

function IntegrationsCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[720px] -translate-x-1/2 -translate-y-1/2 scale-[0.44]">
        <IntegrationsPreviewBlock />
      </div>
    </div>
  );
}

function FaqCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-3 w-[720px] origin-top -translate-x-1/2 scale-[0.34]">
        <FaqPreviewBlock />
      </div>
    </div>
  );
}

function NotFoundCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[680px] -translate-x-1/2 -translate-y-1/2 scale-[0.34]">
        <NotFoundPreviewBlock />
      </div>
    </div>
  );
}

function OnboardingCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[640px] -translate-x-1/2 -translate-y-1/2 scale-[0.46]">
        <OnboardingPreviewBlock />
      </div>
    </div>
  );
}

function PricingCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[760px] -translate-x-1/2 -translate-y-1/2 scale-[0.38]">
        <PricingPreviewBlock />
      </div>
    </div>
  );
}

function StatsCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 scale-[0.74]">
        <StatsPreviewBlock />
      </div>
    </div>
  );
}

function TestimonialsCategoryPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[680px] -translate-x-1/2 -translate-y-1/2 scale-[0.4]">
        <TestimonialsPreviewBlock />
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

type BlockCategory = {
  title: string;
  description: string;
  count: string;
  url: string;
  preview: ReactNode;
};

const marketingBlockCategories: BlockCategory[] = [
  {
    title: 'Header',
    description: 'Navigation headers with scroll states.',
    count: '3 Blocks',
    url: '/blocks/header',
    preview: <HeaderCategoryPreview />,
  },
  {
    title: 'Hero',
    description: 'Landing page hero sections.',
    count: '3 Blocks',
    url: '/blocks/hero',
    preview: <HeroCategoryPreview />,
  },
  {
    title: 'Features',
    description: 'Product capability sections.',
    count: '6 Blocks',
    url: '/blocks/features',
    preview: <FeaturesCategoryPreview />,
  },
  {
    title: 'Call to Action',
    description: 'Conversion sections with focused actions.',
    count: '5 Blocks',
    url: '/blocks/cta',
    preview: <CtaCategoryPreview />,
  },
  {
    title: 'Pricing',
    description: 'Plan and subscription pricing sections.',
    count: '4 Blocks',
    url: '/blocks/pricing',
    preview: <PricingCategoryPreview />,
  },
  {
    title: 'Testimonials',
    description: 'Social proof and quote sections.',
    count: '6 Blocks',
    url: '/blocks/testimonials',
    preview: <TestimonialsCategoryPreview />,
  },
  {
    title: 'Frequently Asked Questions',
    description: 'Support sections with expandable answers.',
    count: '5 Blocks',
    url: '/blocks/faq',
    preview: <FaqCategoryPreview />,
  },
  {
    title: 'Integrations',
    description: 'Connected app and tool sections.',
    count: '5 Blocks',
    url: '/blocks/integrations',
    preview: <IntegrationsCategoryPreview />,
  },
  {
    title: 'Contact',
    description: 'Support channels and contact forms.',
    count: '5 Blocks',
    url: '/blocks/contact',
    preview: <ContactCategoryPreview />,
  },
  {
    title: 'Logo Cloud',
    description: 'Customer and partner brand sections.',
    count: '5 Blocks',
    url: '/blocks/logo-cloud',
    preview: <LogoCloudCategoryPreview />,
  },
  {
    title: 'Blog',
    description: 'Editorial indexes and article grids.',
    count: '3 Blocks',
    url: '/blocks/blog',
    preview: <BlogCategoryPreview />,
  },
  {
    title: 'Image Gallery',
    description: 'Responsive visual gallery sections.',
    count: '1 Block',
    url: '/blocks/image-gallery',
    preview: <ImageGalleryCategoryPreview />,
  },
  {
    title: 'Footer',
    description: 'Site footers with links and social surfaces.',
    count: '6 Blocks',
    url: '/blocks/footer',
    preview: <FooterCategoryPreview />,
  },
];

const applicationBlockCategories: BlockCategory[] = [
  {
    title: 'Auth',
    description: 'Sign-in and account entry screens.',
    count: '3 Blocks',
    url: '/blocks/auth',
    preview: <AuthCategoryPreview />,
  },
  {
    title: 'Onboarding',
    description: 'Setup flows and progress states.',
    count: '7 Blocks',
    url: '/blocks/onboarding',
    preview: <OnboardingCategoryPreview />,
  },
  {
    title: 'Stats',
    description: 'Metric cards and usage summaries.',
    count: '15 Blocks',
    url: '/blocks/stats',
    preview: <StatsCategoryPreview />,
  },
  {
    title: '404',
    description: 'Missing-page recovery states.',
    count: '2 Blocks',
    url: '/blocks/404',
    preview: <NotFoundCategoryPreview />,
  },
];

function BlockCategoryCard({ category }: { category: BlockCategory }) {
  return (
    <Card
      className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
      url={category.url}
    >
      <div className="h-[184px] overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
        {category.preview}
      </div>
      <div className="flex h-16 items-center justify-between gap-4 px-3 pt-1.5">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-card-foreground">
            {category.title}
          </h2>
          <p className="mt-1 truncate text-sm font-medium text-muted-foreground">
            {category.description}
          </p>
        </div>
        <span className="shrink-0 text-sm font-medium text-muted-foreground">
          {category.count}
        </span>
      </div>
    </Card>
  );
}

function BlockCategorySection({
  title,
  description,
  categories,
}: {
  title: string;
  description: string;
  categories: BlockCategory[];
}) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-normal text-foreground">
            {title}
          </h2>
          <p className="mt-1 max-w-[640px] text-sm font-medium leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <span className="w-fit rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {categories.length} Categories
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <BlockCategoryCard category={category} key={category.url} />
        ))}
      </div>
    </section>
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

        <BlockCategorySection
          categories={marketingBlockCategories}
          description="Public-facing sections for websites, launch pages, content hubs, contact surfaces, and conversion flows."
          title="Marketing & Website"
        />
        <BlockCategorySection
          categories={applicationBlockCategories}
          description="Product flows and application states for account access, setup, and recovery."
          title="Application UI"
        />
      </div>
    </main>
  );
}
