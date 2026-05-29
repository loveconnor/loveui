import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Footer as FooterOne } from '@/registry/default/blocks/footer1/components/footer';
import { Footer as FooterTwo } from '@/registry/default/blocks/footer2/components/footer';
import { Footer as FooterThree } from '@/registry/default/blocks/footer3/components/footer';
import { Footer as FooterFour } from '@/registry/default/blocks/footer4/components/footer';
import { Footer as FooterFive } from '@/registry/default/blocks/footer5/components/footer';
import { StickyFooter as FooterSix } from '@/registry/default/blocks/footer6/components/footer';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const footerBlocksDescription =
  'Footer blocks for building polished site endings with navigation, app links, social links, and sticky reveal layouts.';

const footerBlocks = [
  {
    id: 'footer1',
    installName: 'footer-one',
    title: 'Footer 1',
    description: 'Compact footer with brand, navigation links, and social actions.',
    component: <FooterOne />,
    files: [
      'app/page.tsx',
      'components/footer.tsx',
      'components/logo.tsx',
      'components/icons/github-icon.tsx',
      'components/icons/x-icon.tsx',
    ],
  },
  {
    id: 'footer2',
    installName: 'footer-two',
    title: 'Footer 2',
    description: 'Bordered footer with resource columns and social links.',
    component: <FooterTwo />,
    files: [
      'app/page.tsx',
      'components/footer.tsx',
      'components/full-width-divider.tsx',
      'components/logo.tsx',
      'components/icons/github-icon.tsx',
      'components/icons/instagram-icon.tsx',
      'components/icons/x-icon.tsx',
    ],
  },
  {
    id: 'footer3',
    installName: 'footer-three',
    title: 'Footer 3',
    description: 'Animated rounded footer with grouped links and social icons.',
    component: <FooterThree />,
    files: [
      'app/page.tsx',
      'components/footer.tsx',
      'components/logo.tsx',
      'components/icons/github-icon.tsx',
      'components/icons/instagram-icon.tsx',
      'components/icons/linkedin-icon.tsx',
      'components/icons/x-icon.tsx',
    ],
  },
  {
    id: 'footer4',
    installName: 'footer-four',
    title: 'Footer 4',
    description: 'Column footer with social cards and divided link groups.',
    component: <FooterFour />,
    files: [
      'app/page.tsx',
      'components/footer.tsx',
      'components/icons/github-icon.tsx',
      'components/icons/instagram-icon.tsx',
      'components/icons/linkedin-icon.tsx',
      'components/icons/x-icon.tsx',
      'components/logo.tsx',
    ],
  },
  {
    id: 'footer5',
    installName: 'footer-five',
    title: 'Footer 5',
    description: 'App-focused footer with dense links, social buttons, and store badges.',
    component: <FooterFive />,
    files: [
      'app/page.tsx',
      'components/footer.tsx',
      'components/logo.tsx',
      'components/icons/apple-icon.tsx',
      'components/icons/facebook-icon.tsx',
      'components/icons/google-play-icon.tsx',
      'components/icons/instagram-icon.tsx',
      'components/icons/linkedin-icon.tsx',
      'components/icons/x-icon.tsx',
    ],
  },
  {
    id: 'footer6',
    installName: 'footer-six',
    title: 'Footer 6',
    description: 'Sticky reveal footer with animated link groups and social actions.',
    component: (
      <div className="relative h-[640px] overflow-hidden">
        <FooterSix preview />
      </div>
    ),
    files: [
      'app/page.tsx',
      'components/footer.tsx',
      'components/logo.tsx',
      'components/icons/apple-icon.tsx',
      'components/icons/facebook-icon.tsx',
      'components/icons/github-icon.tsx',
      'components/icons/google-play-icon.tsx',
      'components/icons/instagram-icon.tsx',
      'components/icons/linkedin-icon.tsx',
      'components/icons/x-icon.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Footer Blocks',
  description: footerBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React footer blocks',
    'Tailwind footer blocks',
    'site footer templates',
    'footer navigation',
  ],
  alternates: {
    canonical: '/blocks/footer',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Footer Blocks',
    description: footerBlocksDescription,
    url: '/blocks/footer',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Footer Blocks',
    description: footerBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function FooterBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Footer Blocks',
    description: footerBlocksDescription,
    url: '/blocks/footer',
  });
  const blocks = await Promise.all(
    footerBlocks.map(async (block) => {
      const sourceFiles = await getFooterBlockSourceFiles(block.id, block.files);

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
              Footer Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Complete footer sections composed from LoveUI primitives.
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
              <div className="bg-background">{block.component}</div>
            </BlockExampleCardShell>
          ))}
        </div>
      </div>
    </main>
  );
}

async function getFooterBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
