import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Integrations as IntegrationsOne } from '@/registry/default/blocks/integrations1/components/integrations';
import { Integrations as IntegrationsTwo } from '@/registry/default/blocks/integrations2/components/integrations';
import { Integrations as IntegrationsThree } from '@/registry/default/blocks/integrations3/components/integrations';
import { Integrations as IntegrationsFour } from '@/registry/default/blocks/integrations4/components/integrations';
import { Integrations as IntegrationsFive } from '@/registry/default/blocks/integrations5/components/integrations';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const integrationLogoFiles = [
  'components/logos/adobe.svg',
  'components/logos/canva.svg',
  'components/logos/cursor.svg',
  'components/logos/gmail.svg',
  'components/logos/notion.svg',
  'components/logos/planetscale.svg',
  'components/logos/polar.svg',
  'components/logos/supabase.svg',
  'components/logos/vercel.svg',
];

const integrationBlocksDescription =
  'Integration blocks for app ecosystems, connected tool grids, logo clusters, and workflow surfaces.';

const integrationBlocks = [
  {
    id: 'integrations1',
    installName: 'integrations-one',
    title: 'Integrations 1',
    description: 'Compact integration card grid with local logo assets and action link.',
    component: <IntegrationsOne />,
    files: ['app/page.tsx', 'components/integrations.tsx', ...integrationLogoFiles],
  },
  {
    id: 'integrations2',
    installName: 'integrations-two',
    title: 'Integrations 2',
    description: 'Bordered integration matrix with corner accents and local tool logos.',
    component: <IntegrationsTwo />,
    files: [
      'app/page.tsx',
      'components/integrations.tsx',
      'components/decor-icon.tsx',
      ...integrationLogoFiles,
    ],
  },
  {
    id: 'integrations3',
    installName: 'integrations-three',
    title: 'Integrations 3',
    description: 'Split integration section with copy, CTA, and scattered logo grid.',
    component: <IntegrationsThree />,
    files: [
      'app/page.tsx',
      'components/integrations.tsx',
      'components/full-width-divider.tsx',
      ...integrationLogoFiles,
    ],
  },
  {
    id: 'integrations4',
    installName: 'integrations-four',
    title: 'Integrations 4',
    description: 'Large integration hero with masked logo tiles and product-stack copy.',
    component: <IntegrationsFour />,
    files: ['app/page.tsx', 'components/integrations.tsx', ...integrationLogoFiles],
  },
  {
    id: 'integrations5',
    installName: 'integrations-five',
    title: 'Integrations 5',
    description: 'Rounded logo cluster with overlap layout and integrations CTA.',
    component: <IntegrationsFive />,
    files: ['app/page.tsx', 'components/integrations.tsx', ...integrationLogoFiles],
  },
];

export const metadata: Metadata = {
  title: 'Integrations Blocks',
  description: integrationBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React integration blocks',
    'Tailwind integration sections',
    'SaaS integration grid',
    'tool logo blocks',
  ],
  alternates: {
    canonical: '/blocks/integrations',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Integrations Blocks',
    description: integrationBlocksDescription,
    url: '/blocks/integrations',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Integrations Blocks',
    description: integrationBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function IntegrationsBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Integrations Blocks',
    description: integrationBlocksDescription,
    url: '/blocks/integrations',
  });
  const blocks = await Promise.all(
    integrationBlocks.map(async (block) => {
      const sourceFiles = await getIntegrationBlockSourceFiles(
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
              Integrations Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Connected-tool sections composed from LoveUI primitives.
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

async function getIntegrationBlockSourceFiles(
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
