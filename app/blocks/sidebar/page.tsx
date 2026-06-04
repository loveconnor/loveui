import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { headers } from 'next/headers';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';
import Sidebar01 from '@/packages/loveui-pro/registry/default/blocks/sidebar-01';
import Sidebar02 from '@/packages/loveui-pro/registry/default/blocks/sidebar-02';
import Sidebar03 from '@/packages/loveui-pro/registry/default/blocks/sidebar-03';
import Sidebar04 from '@/packages/loveui-pro/registry/default/blocks/sidebar-04/app/page';
import Sidebar05 from '@/packages/loveui-pro/registry/default/blocks/sidebar-05/app/page';
import Sidebar06 from '@/packages/loveui-pro/registry/default/blocks/sidebar-06/app/page';

const sidebarBlocksDescription =
  'Sidebar blocks for application navigation, nested menus, workspaces, and multi-panel product layouts.';

const sidebarBlocks = [
  {
    id: 'sidebar-01',
    installName: 'sidebar-01',
    title: 'Sidebar 1',
    description: 'Product sidebar with search, collapsible groups, and account actions.',
    component: <Sidebar01 />,
    files: [
      'index.tsx',
      'app-sidebar.tsx',
      'nav-collapsible.tsx',
      'nav-footer.tsx',
      'nav-header.tsx',
      'nav-main.tsx',
      'types.ts',
    ],
  },
  {
    id: 'sidebar-02',
    installName: 'sidebar-02',
    title: 'Sidebar 2',
    description: 'Inset dashboard sidebar with workspace switcher and nested routes.',
    component: <Sidebar02 />,
    files: [
      'index.tsx',
      'app-sidebar.tsx',
      'logo.tsx',
      'nav-main.tsx',
      'nav-notifications.tsx',
      'team-switcher.tsx',
    ],
  },
  {
    id: 'sidebar-03',
    installName: 'sidebar-03',
    title: 'Sidebar 3',
    description: 'Floating dashboard sidebar with notifications and nested navigation.',
    component: <Sidebar03 />,
    files: [
      'index.tsx',
      'app-sidebar.tsx',
      'logo.tsx',
      'nav-main.tsx',
      'nav-notifications.tsx',
      'team-switcher.tsx',
    ],
  },
  {
    id: 'sidebar-04',
    installName: 'sidebar-04',
    title: 'Sidebar 4',
    description: 'Mail-style sidebar with account switcher, folders, and message preview.',
    component: <Sidebar04 />,
    files: ['app/page.tsx', 'app-sidebar.tsx', 'mail-context.tsx', 'nav-user.tsx'],
  },
  {
    id: 'sidebar-05',
    installName: 'sidebar-05',
    title: 'Sidebar 5',
    description: 'Two-panel repository sidebar with expandable sections and detail navigation.',
    component: <Sidebar05 />,
    files: ['app/page.tsx', 'app-sidebar.tsx', 'team-switcher.tsx'],
  },
  {
    id: 'sidebar-06',
    installName: 'sidebar-06',
    title: 'Sidebar 6',
    description: 'Progressive repository sidebar that drills from primary navigation into detail views.',
    component: <Sidebar06 />,
    files: ['app/page.tsx', 'app-sidebar.tsx', 'team-switcher.tsx'],
  },
];

export const metadata: Metadata = {
  title: 'Sidebar Blocks',
  description: sidebarBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React sidebar blocks',
    'Tailwind sidebar layouts',
    'application navigation',
    'dashboard sidebar',
  ],
  alternates: {
    canonical: '/blocks/sidebar',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Sidebar Blocks',
    description: sidebarBlocksDescription,
    url: '/blocks/sidebar',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Sidebar Blocks',
    description: sidebarBlocksDescription,
    images: ['/logo.png'],
  },
};

export const dynamic = 'force-dynamic';

export default async function SidebarBlocksPage() {
  const canViewProCode = await getCanViewProCode();
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Sidebar Blocks',
    description: sidebarBlocksDescription,
    url: '/blocks/sidebar',
  });

  const blocks = await Promise.all(
    sidebarBlocks.map(async (block) => {
      if (!canViewProCode) {
        return {
          ...block,
          sourceFiles: [],
          sourceCode: '',
        };
      }

      let sourceFiles: Array<{ path: string; content: string }> = [];

      try {
        sourceFiles = await getSidebarBlockSourceFiles(block.id, block.files);
      } catch (error) {
        console.error('Unable to load sidebar source files.', {
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
              Sidebar Blocks
              <span className="mt-1 rounded-[3px] bg-[#0d74fd] px-2 py-1 text-xs font-medium uppercase leading-none text-white">
                pro
              </span>
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Application sidebars composed from LoveUI primitives for
              navigation, workspaces, and nested product flows.
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
            >
              <div className="h-[680px] overflow-hidden bg-background [&>*]:!h-full [&_.h-dvh]:!h-full [&_.min-h-svh]:!min-h-full [&_[data-slot=sidebar-inner]]:!h-full [&_[data-slot=sidebar-wrapper]]:!h-full [&_[data-slot=sidebar-wrapper]]:!min-h-full [&_[data-slot=sidebar][data-variant=floating]]:!h-[calc(100%-1rem)] [&_[data-slot=sidebar][data-variant=inset]]:!h-[calc(100%-1rem)] [&_[data-slot=sidebar][data-variant=sidebar]]:!h-full">
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
    console.error('Unable to check LoveUI Pro access for sidebars.', {
      error,
    });

    return false;
  }
}

async function getSidebarBlockSourceFiles(blockId: string, files: string[]) {
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
