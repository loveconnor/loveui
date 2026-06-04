import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { headers } from 'next/headers';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Header as HeaderOne } from '@/registry/default/blocks/header1/components/header';
import { DemoLayout as DemoLayoutOne } from '@/registry/default/blocks/header1/components/demo-layout';
import { Header as HeaderTwo } from '@/registry/default/blocks/header2/components/header';
import { DemoLayout as DemoLayoutTwo } from '@/registry/default/blocks/header2/components/demo-layout';
import { Header as HeaderThree } from '@/registry/default/blocks/header3/components/header';
import { DemoLayout as DemoLayoutThree } from '@/registry/default/blocks/header3/components/demo-layout';
import Header01 from '@/packages/loveui-pro/registry/default/blocks/header-01/page';
import Header02 from '@/packages/loveui-pro/registry/default/blocks/header-02/page';
import Header03 from '@/packages/loveui-pro/registry/default/blocks/header-03/page';
import Header04 from '@/packages/loveui-pro/registry/default/blocks/header-04/page';
import Header05 from '@/packages/loveui-pro/registry/default/blocks/header-05/page';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const headerBlocksDescription =
  'Header blocks for building responsive navigation with polished scroll states.';

const headerBlocks = [
  {
    id: 'header1',
    installName: 'header-one',
    title: 'Header 1',
    description: 'Responsive sticky header with a blurred scroll state.',
    component: (
      <>
        <HeaderOne />
        <DemoLayoutOne />
      </>
    ),
    files: [
      'app/page.tsx',
      'components/header.tsx',
      'components/mobile-nav.tsx',
      'components/logo.tsx',
      'components/demo-layout.tsx',
      'components/ui/portal.tsx',
      'hooks/use-scroll.ts',
    ],
  },
  {
    id: 'header2',
    installName: 'header-two',
    title: 'Header 2',
    description: 'Centered header that compresses into a floating bar on scroll.',
    component: (
      <>
        <HeaderTwo />
        <DemoLayoutTwo />
      </>
    ),
    files: [
      'app/page.tsx',
      'components/header.tsx',
      'components/mobile-nav.tsx',
      'components/logo.tsx',
      'components/demo-layout.tsx',
      'components/ui/portal.tsx',
      'hooks/use-scroll.ts',
    ],
  },
  {
    id: 'header3',
    installName: 'header-three',
    title: 'Header 3',
    description: 'Responsive header with dropdown navigation menus.',
    component: (
      <>
        <HeaderThree />
        <DemoLayoutThree />
      </>
    ),
    files: [
      'app/page.tsx',
      'components/header.tsx',
      'components/desktop-nav.tsx',
      'components/mobile-nav.tsx',
      'components/nav-links.tsx',
      'components/sheard.tsx',
      'components/logo.tsx',
      'components/demo-layout.tsx',
      'components/ui/navigation-menu.tsx',
      'components/ui/portal.tsx',
      'hooks/use-scroll.ts',
    ],
  },
  {
    id: 'header-01',
    installName: 'header-01',
    title: 'Header 4',
    description: 'Floating navigation header with resource menus and theme toggle.',
    component: <Header01 />,
    files: [
      'page.tsx',
      'components/header.tsx',
      'components/demo-layout.tsx',
      'components/logo.tsx',
      'components/search.tsx',
      'components/theme-switch.tsx',
    ],
    isPro: true,
    packageName: 'loveui-pro',
  },
  {
    id: 'header-02',
    installName: 'header-02',
    title: 'Header 5',
    description: 'Floating service header with dropdown navigation and mobile sheet.',
    component: <Header02 />,
    files: [
      'page.tsx',
      'components/header.tsx',
      'components/demo-layout.tsx',
      'components/theme-switch.tsx',
    ],
    isPro: true,
    packageName: 'loveui-pro',
  },
  {
    id: 'header-03',
    installName: 'header-03',
    title: 'Header 6',
    description: 'Responsive application header with search and scroll-aware navigation.',
    component: <Header03 />,
    files: [
      'page.tsx',
      'components/header.tsx',
      'components/demo-layout.tsx',
      'components/search.tsx',
      'components/theme-switch.tsx',
    ],
    isPro: true,
    packageName: 'loveui-pro',
  },
  {
    id: 'header-04',
    installName: 'header-04',
    title: 'Header 7',
    description: 'Compact commerce header with menus, search, cart, and mobile navigation.',
    component: <Header04 />,
    files: [
      'page.tsx',
      'components/header.tsx',
      'components/demo-layout.tsx',
      'components/menus.tsx',
      'components/navigation.tsx',
      'components/phone-menus.tsx',
      'components/search.tsx',
    ],
    isPro: true,
    packageName: 'loveui-pro',
  },
  {
    id: 'header-05',
    installName: 'header-05',
    title: 'Header 8',
    description: 'Enterprise platform header with rich menus, account actions, and theme controls.',
    component: <Header05 />,
    files: [
      'page.tsx',
      'components/header.tsx',
      'components/demo-layout.tsx',
      'components/theme.tsx',
    ],
    isPro: true,
    packageName: 'loveui-pro',
  },
];

export const metadata: Metadata = {
  title: 'Header Blocks',
  description: headerBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React header blocks',
    'Tailwind header blocks',
    'sticky header',
    'navigation templates',
  ],
  alternates: {
    canonical: '/blocks/header',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Header Blocks',
    description: headerBlocksDescription,
    url: '/blocks/header',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Header Blocks',
    description: headerBlocksDescription,
    images: ['/logo.png'],
  },
};

export const dynamic = 'force-dynamic';

export default async function HeaderBlocksPage() {
  const canViewProCode = await getCanViewProCode();
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Header Blocks',
    description: headerBlocksDescription,
    url: '/blocks/header',
  });
  const blocks = await Promise.all(
    headerBlocks.map(async (block) => {
      if (block.isPro && !canViewProCode) {
        return {
          ...block,
          sourceFiles: [],
          sourceCode: '',
        };
      }

      let sourceFiles: Array<{ path: string; content: string }> = [];

      try {
        sourceFiles = await getHeaderBlockSourceFiles(
          block.id,
          block.files,
          Boolean(block.isPro),
        );
      } catch (error) {
        console.error('Unable to load header source files.', {
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
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground">
              Header Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Responsive navigation headers composed from LoveUI primitives.
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
              packageName={block.packageName}
              sourceCode={block.sourceCode}
              sourceFiles={block.sourceFiles}
              isCodeLocked={Boolean(block.isPro) && (!canViewProCode || !block.sourceFiles.length)}
              isPro={block.isPro}
            >
              <div
                className={[
                  'relative isolate h-[640px] overflow-y-auto bg-background',
                  block.isPro ? '[&_.fixed]:!absolute' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="min-h-[1120px]">{block.component}</div>
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
    console.error('Unable to check LoveUI Pro access for headers.', {
      error,
    });

    return false;
  }
}

async function getHeaderBlockSourceFiles(
  blockId: string,
  blockFiles: string[],
  isPro: boolean,
) {
  const registryBase = isPro
    ? 'packages/loveui-pro/registry/default/blocks'
    : 'registry/default/blocks';

  return Promise.all(
    blockFiles.map(async (file) => {
      const content = await readFile(
        `${process.cwd()}/${registryBase}/${blockId}/${file}`,
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
