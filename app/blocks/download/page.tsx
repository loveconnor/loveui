import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { headers } from 'next/headers';
import { ArrowLeft as ArrowLeftIcon } from 'love-ui/icons';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';
import Download01 from '@/packages/loveui-pro/registry/default/blocks/download-01/download';
import Download02 from '@/packages/loveui-pro/registry/default/blocks/download-02/download';

const downloadBlocksDescription =
  'Download blocks for product downloads, platform installers, plugin directories, and release surfaces.';

const downloadBlocks = [
  {
    id: 'download-01',
    installName: 'download-01',
    title: 'Download 1',
    description:
      'Platform download section with operating system cards, requirements, and release links.',
    component: <Download01 />,
    files: ['download.tsx'],
  },
  {
    id: 'download-02',
    installName: 'download-02',
    title: 'Download 2',
    description:
      'Product download layout with feature links, plugin search, and integration options.',
    component: <Download02 />,
    files: ['download.tsx'],
  },
];

export const metadata: Metadata = {
  title: 'Download Blocks',
  description: downloadBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React download blocks',
    'Tailwind download sections',
    'product download page',
    'software installer UI',
  ],
  alternates: {
    canonical: '/blocks/download',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Download Blocks',
    description: downloadBlocksDescription,
    url: '/blocks/download',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Download Blocks',
    description: downloadBlocksDescription,
    images: ['/logo.png'],
  },
};

export const dynamic = 'force-dynamic';

export default async function DownloadBlocksPage() {
  const canViewProCode = await getCanViewProCode();
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Download Blocks',
    description: downloadBlocksDescription,
    url: '/blocks/download',
  });

  const blocks = await Promise.all(
    downloadBlocks.map(async (block) => {
      if (!canViewProCode) {
        return {
          ...block,
          sourceFiles: [],
          sourceCode: '',
        };
      }

      let sourceFiles: Array<{ path: string; content: string }> = [];

      try {
        sourceFiles = await getDownloadBlockSourceFiles(block.id, block.files);
      } catch (error) {
        console.error('Unable to load download source files.', {
          blockId: block.id,
          error,
        });
      }

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
            <h1 className="inline-flex items-start gap-2 text-4xl font-semibold leading-tight tracking-normal text-foreground">
              Download Blocks
              <span className="mt-1 rounded-[3px] bg-[#0d74fd] px-2 py-1 text-xs font-medium uppercase leading-none text-white">
                pro
              </span>
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Download sections composed from LoveUI primitives for installers,
              release pages, and plugin marketplaces.
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
              packageName="loveui-pro"
              sourceCode={block.sourceCode}
              sourceFiles={block.sourceFiles}
              isCodeLocked={!canViewProCode || !block.sourceFiles.length}
              isPro
            >
              <div className="h-[760px] overflow-y-auto bg-background [&>section]:min-h-full [&>section]:w-full">
                {block.component}
              </div>
            </BlockExampleCardShell>
          ))}
        </div>
      </div>
    </main>
  );
}

async function getCanViewProCode() {
  try {
    const [{ auth }, { hasProAccess }] = await Promise.all([
      import('@/lib/auth'),
      import('@/lib/pro-access'),
    ]);
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return hasProAccess(session?.user.email);
  } catch (error) {
    console.error('Unable to check LoveUI Pro access for downloads.', {
      error,
    });

    return false;
  }
}

async function getDownloadBlockSourceFiles(blockId: string, files: string[]) {
  return Promise.all(
    files.map(async (file) => {
      const content = await readFile(
        `${process.cwd()}/packages/loveui-pro/registry/default/blocks/${blockId}/${file}`,
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
    .replace(/@\/components\/ui\//g, '@/components/ui/')
    .replace(/@\/registry\/default\/ui\//g, '@/components/ui/');
}
