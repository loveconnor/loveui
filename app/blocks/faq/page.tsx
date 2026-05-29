import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { FaqsSection as FaqOne } from '@/registry/default/blocks/faq-1/components/faq';
import { FaqsSection as FaqTwo } from '@/registry/default/blocks/faq-2/components/faq';
import { FaqsSection as FaqThree } from '@/registry/default/blocks/faq-3/components/faq';
import { FaqsSection as FaqFour } from '@/registry/default/blocks/faq-4/components/faq';
import { FaqsSection as FaqFive } from '@/registry/default/blocks/faq-5/components/faq';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const faqBlocksDescription =
  'FAQ blocks for help centers, product pages, onboarding flows, and support surfaces.';

const faqBlocks = [
  {
    id: 'faq-1',
    installName: 'faq-one',
    title: 'FAQ 1',
    description: 'Centered FAQ section with intro copy, bordered accordion, and support link.',
    component: <FaqOne />,
    files: ['app/page.tsx', 'components/faq.tsx'],
  },
  {
    id: 'faq-2',
    installName: 'faq-two',
    title: 'FAQ 2',
    description: 'Two-column FAQ layout with a fixed intro panel and footer contact row.',
    component: <FaqTwo />,
    files: ['app/page.tsx', 'components/faq.tsx'],
  },
  {
    id: 'faq-3',
    installName: 'faq-three',
    title: 'FAQ 3',
    description: 'Split FAQ section with guide rail accents and decorated accordion items.',
    component: <FaqThree />,
    files: ['app/page.tsx', 'components/faq.tsx', 'components/decor-icon.tsx'],
  },
  {
    id: 'faq-4',
    installName: 'faq-four',
    title: 'FAQ 4',
    description: 'Categorized FAQ browser with topic filters and compact answer cards.',
    component: <FaqFour />,
    files: ['app/page.tsx', 'components/faq.tsx'],
  },
  {
    id: 'faq-5',
    installName: 'faq-five',
    title: 'FAQ 5',
    description: 'Searchable FAQ center with category tabs, empty state, and contact link.',
    component: <FaqFive />,
    files: [
      'app/page.tsx',
      'components/faq.tsx',
      'components/full-width-divider.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'FAQ Blocks',
  description: faqBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React FAQ blocks',
    'Tailwind FAQ sections',
    'accordion FAQ',
    'support page blocks',
  ],
  alternates: {
    canonical: '/blocks/faq',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI FAQ Blocks',
    description: faqBlocksDescription,
    url: '/blocks/faq',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI FAQ Blocks',
    description: faqBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function FaqBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI FAQ Blocks',
    description: faqBlocksDescription,
    url: '/blocks/faq',
  });
  const blocks = await Promise.all(
    faqBlocks.map(async (block) => {
      const sourceFiles = await getFaqBlockSourceFiles(block.id, block.files);

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
              FAQ Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Help and support sections composed from LoveUI primitives.
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

async function getFaqBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
