import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { LogoCloud as LogoCloudOne } from '@/registry/default/blocks/logo-cloud-1/components/logo-cloud';
import { LogoCloud as LogoCloudTwo } from '@/registry/default/blocks/logo-cloud-2/components/logo-cloud';
import { LogoCloud as LogoCloudThree } from '@/registry/default/blocks/logo-cloud-3/components/logo-cloud';
import { LogoCloud as LogoCloudFour } from '@/registry/default/blocks/logo-cloud-4/components/logo-cloud';
import { LogoCloud as LogoCloudFive } from '@/registry/default/blocks/logo-cloud-5/components/logo-cloud';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const logoCloudBlocksDescription =
  'Logo cloud blocks for showcasing customer, partner, and integration brands.';

const logoFiles = [
  'components/logos/claude-wordmark.svg',
  'components/logos/clerk-wordmark.svg',
  'components/logos/github-wordmark.svg',
  'components/logos/nvidia-wordmark.svg',
  'components/logos/openai-wordmark.svg',
  'components/logos/supabase-wordmark.svg',
  'components/logos/turso-wordmark.svg',
  'components/logos/vercel-wordmark.svg',
];

const logoCloudBlocks = [
  {
    id: 'logo-cloud-1',
    installName: 'logo-cloud-one',
    title: 'Logo Cloud 1',
    description: 'Bordered partner logo grid with a compact section heading.',
    component: <LogoCloudOne />,
    files: [
      'app/page.tsx',
      'components/logo-cloud.tsx',
      ...logoFiles,
    ],
  },
  {
    id: 'logo-cloud-2',
    installName: 'logo-cloud-two',
    title: 'Logo Cloud 2',
    description: 'Alternating logo grid with decorative border accents.',
    component: <LogoCloudTwo />,
    files: [
      'app/page.tsx',
      'components/logo-cloud.tsx',
      'components/decor-icon.tsx',
      ...logoFiles,
    ],
  },
  {
    id: 'logo-cloud-3',
    installName: 'logo-cloud-three',
    title: 'Logo Cloud 3',
    description: 'Animated scrolling logo row with masked edges.',
    component: <LogoCloudThree />,
    files: [
      'app/page.tsx',
      'components/logo-cloud.tsx',
      'components/infinite-slider.tsx',
      ...logoFiles,
    ],
  },
  {
    id: 'logo-cloud-4',
    installName: 'logo-cloud-four',
    title: 'Logo Cloud 4',
    description: 'Animated logo marquee with progressive blur fades.',
    component: <LogoCloudFour />,
    files: [
      'app/page.tsx',
      'components/logo-cloud.tsx',
      'components/infinite-slider.tsx',
      'components/progressive-blur.tsx',
      ...logoFiles,
    ],
  },
  {
    id: 'logo-cloud-5',
    installName: 'logo-cloud-five',
    title: 'Logo Cloud 5',
    description: 'Flexible wrap logo cloud for dense brand lists.',
    component: <LogoCloudFive />,
    files: [
      'app/page.tsx',
      'components/logo-cloud.tsx',
      ...logoFiles,
    ],
  },
];

export const metadata: Metadata = {
  title: 'Logo Cloud Blocks',
  description: logoCloudBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React logo cloud blocks',
    'Tailwind logo cloud',
    'partner logo section',
    'customer logo grid',
  ],
  alternates: {
    canonical: '/blocks/logo-cloud',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Logo Cloud Blocks',
    description: logoCloudBlocksDescription,
    url: '/blocks/logo-cloud',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Logo Cloud Blocks',
    description: logoCloudBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function LogoCloudBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Logo Cloud Blocks',
    description: logoCloudBlocksDescription,
    url: '/blocks/logo-cloud',
  });
  const blocks = await Promise.all(
    logoCloudBlocks.map(async (block) => {
      const sourceFiles = await getLogoCloudBlockSourceFiles(block.id, block.files);

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
              Logo Cloud Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Brand proof sections composed from LoveUI primitives.
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

async function getLogoCloudBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
