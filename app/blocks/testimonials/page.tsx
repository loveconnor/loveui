import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { TestimonialsSection as TestimonialsOne } from '@/registry/default/blocks/testimonials1/components/testimonials';
import { TestimonialsSection as TestimonialsTwo } from '@/registry/default/blocks/testimonials2/components/testimonials';
import { TestimonialsSection as TestimonialsThree } from '@/registry/default/blocks/testimonials3/components/testimonials';
import { TestimonialsSection as TestimonialsFour } from '@/registry/default/blocks/testimonials4/components/testimonials';
import { TestimonialsSection as TestimonialsFive } from '@/registry/default/blocks/testimonials5/components/testimonials';
import { TestimonialsSection as TestimonialsSix } from '@/registry/default/blocks/testimonials6/components/testimonials';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const testimonialsBlocksDescription =
  'Testimonials blocks for customer proof, founder quotes, social proof grids, and rotating quote sections.';

const testimonialsBlocks = [
  {
    id: 'testimonials1',
    installName: 'testimonials-one',
    title: 'Testimonials 1',
    description: 'Centered brand quote with avatar, citation, and divider accent.',
    component: <TestimonialsOne />,
    files: ['app/page.tsx', 'components/testimonials.tsx', 'components/logo.tsx'],
  },
  {
    id: 'testimonials2',
    installName: 'testimonials-two',
    title: 'Testimonials 2',
    description: 'Compact profile quote with masked avatar and decorative rail lines.',
    component: <TestimonialsTwo />,
    files: ['app/page.tsx', 'components/testimonials.tsx'],
  },
  {
    id: 'testimonials3',
    installName: 'testimonials-three',
    title: 'Testimonials 3',
    description: 'Three-card testimonial row with quote icons, avatars, and corner accents.',
    component: <TestimonialsThree />,
    files: [
      'app/page.tsx',
      'components/testimonials.tsx',
      'components/decor-icon.tsx',
    ],
  },
  {
    id: 'testimonials4',
    installName: 'testimonials-four',
    title: 'Testimonials 4',
    description: 'Editorial quote grid with full-width divider rails and split layout.',
    component: <TestimonialsFour />,
    files: [
      'app/page.tsx',
      'components/testimonials.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: 'testimonials5',
    installName: 'testimonials-five',
    title: 'Testimonials 5',
    description: 'Large testimonial wall with grid pattern accents and filler cells.',
    component: <TestimonialsFive />,
    files: [
      'app/page.tsx',
      'components/testimonials.tsx',
      'components/full-width-divider.tsx',
      'components/grid-filler.tsx',
      'components/grid-pattern.tsx',
    ],
  },
  {
    id: 'testimonials6',
    installName: 'testimonials-six',
    title: 'Testimonials 6',
    description: 'Animated vertical testimonial columns with hover speed controls.',
    component: <TestimonialsSix />,
    files: [
      'app/page.tsx',
      'components/testimonials.tsx',
      'components/infinite-slider.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Testimonials Blocks',
  description: testimonialsBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React testimonials blocks',
    'Tailwind testimonial sections',
    'social proof blocks',
    'customer quote sections',
  ],
  alternates: {
    canonical: '/blocks/testimonials',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Testimonials Blocks',
    description: testimonialsBlocksDescription,
    url: '/blocks/testimonials',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Testimonials Blocks',
    description: testimonialsBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function TestimonialsBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Testimonials Blocks',
    description: testimonialsBlocksDescription,
    url: '/blocks/testimonials',
  });
  const blocks = await Promise.all(
    testimonialsBlocks.map(async (block) => {
      const sourceFiles = await getTestimonialsBlockSourceFiles(
        block.id,
        block.files,
      );

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
              Testimonials Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Social proof and quote sections composed from LoveUI primitives.
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

async function getTestimonialsBlockSourceFiles(
  blockId: string,
  blockFiles: string[],
) {
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
