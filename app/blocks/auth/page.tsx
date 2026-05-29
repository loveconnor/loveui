import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { AuthPage as AuthOnePage } from '@/registry/default/blocks/auth1/components/auth-page';
import { AuthPage as AuthTwoPage } from '@/registry/default/blocks/auth2/components/auth';
import { AuthPage as AuthThreePage } from '@/registry/default/blocks/auth3/components/auth-page';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const authBlocksDescription =
  'Authentication blocks for building polished sign-in and account entry screens with LoveUI.';

const authBlocks = [
  {
    id: 'auth1',
    installName: 'auth-one',
    title: 'Auth 1',
    description: 'Social sign-in screen with an interactive particle field.',
    component: <AuthOnePage />,
    files: [
      'app/page.tsx',
      'components/auth-page.tsx',
      'components/particles.tsx',
      'components/logo.tsx',
      'components/icons/google-icon.tsx',
      'components/icons/github-icon.tsx',
    ],
  },
  {
    id: 'auth2',
    installName: 'auth-two',
    title: 'Auth 2',
    description: 'Centered sign-in with email, divider, and social options.',
    component: <AuthTwoPage />,
    files: [
      'app/page.tsx',
      'components/auth.tsx',
      'components/ui/auth-divider.tsx',
      'components/ui/decor-icon.tsx',
      'components/icons/google-icon.tsx',
      'components/icons/github-icon.tsx',
    ],
  },
  {
    id: 'auth3',
    installName: 'auth-three',
    title: 'Auth 3',
    description: 'Minimal centered sign-up with logo, email, and social options.',
    component: <AuthThreePage />,
    files: [
      'app/page.tsx',
      'components/auth-page.tsx',
      'components/logo.tsx',
      'components/ui/auth-divider.tsx',
      'components/ui/decor-icon.tsx',
      'components/icons/google-icon.tsx',
      'components/icons/github-icon.tsx',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Auth Blocks',
  description: authBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React auth blocks',
    'Tailwind auth blocks',
    'sign in screen',
    'authentication templates',
  ],
  alternates: {
    canonical: '/blocks/auth',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Auth Blocks',
    description: authBlocksDescription,
    url: '/blocks/auth',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Auth Blocks',
    description: authBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function AuthBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Auth Blocks',
    description: authBlocksDescription,
    url: '/blocks/auth',
  });
  const blocks = await Promise.all(
    authBlocks.map(async (block) => {
      const sourceFiles = await getAuthBlockSourceFiles(block.id, block.files);

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
              Auth Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Full authentication screens composed from LoveUI primitives.
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

async function getAuthBlockSourceFiles(blockId: string, blockFiles: string[]) {
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
