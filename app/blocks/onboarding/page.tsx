import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Onboarding01 as OnboardingOne } from '@/registry/default/blocks/onboarding1/components/onboarding';
import { Onboarding02 as OnboardingTwo } from '@/registry/default/blocks/onboarding2/components/onboarding';
import { Onboarding03 as OnboardingThree } from '@/registry/default/blocks/onboarding3/components/onboarding';
import { Onboarding04 as OnboardingFour } from '@/registry/default/blocks/onboarding4/components/onboarding';
import { Onboarding05 as OnboardingFive } from '@/registry/default/blocks/onboarding5/components/onboarding';
import { Onboarding06 as OnboardingSix } from '@/registry/default/blocks/onboarding6/components/onboarding';
import { Onboarding07 as OnboardingSeven } from '@/registry/default/blocks/onboarding7/components/onboarding';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const onboardingBlocksDescription =
  'Onboarding blocks for checklists, setup flows, progress timelines, and product activation screens.';

const onboardingBlocks = [
  {
    id: 'onboarding1',
    installName: 'onboarding-one',
    title: 'Onboarding 1',
    description: 'Expandable LoveUI setup checklist with actions and progress state.',
    component: <OnboardingOne />,
    files: ['app/page.tsx', 'components/onboarding.tsx'],
  },
  {
    id: 'onboarding2',
    installName: 'onboarding-two',
    title: 'Onboarding 2',
    description: 'Step-by-step activation cards with icon actions and progress bar.',
    component: <OnboardingTwo />,
    files: ['app/page.tsx', 'components/onboarding.tsx'],
  },
  {
    id: 'onboarding3',
    installName: 'onboarding-three',
    title: 'Onboarding 3',
    description: 'Selectable setup checklist with helper copy and compact progress.',
    component: <OnboardingThree />,
    files: ['app/page.tsx', 'components/onboarding.tsx'],
  },
  {
    id: 'onboarding4',
    installName: 'onboarding-four',
    title: 'Onboarding 4',
    description: 'Accordion onboarding flow with gated steps and action panels.',
    component: <OnboardingFour />,
    files: ['app/page.tsx', 'components/onboarding.tsx'],
  },
  {
    id: 'onboarding5',
    installName: 'onboarding-five',
    title: 'Onboarding 5',
    description: 'Activity timeline for source-first LoveUI implementation work.',
    component: <OnboardingFive />,
    files: ['app/page.tsx', 'components/onboarding.tsx'],
  },
  {
    id: 'onboarding6',
    installName: 'onboarding-six',
    title: 'Onboarding 6',
    description: 'Launch progress timeline with completed, active, and upcoming states.',
    component: <OnboardingSix />,
    files: ['app/page.tsx', 'components/onboarding.tsx'],
  },
  {
    id: 'onboarding7',
    installName: 'onboarding-seven',
    title: 'Onboarding 7',
    description: 'Animated setup progress with logs, replay action, and accordion details.',
    component: <OnboardingSeven />,
    files: ['app/page.tsx', 'components/onboarding.tsx'],
  },
];

export const metadata: Metadata = {
  title: 'Onboarding Blocks',
  description: onboardingBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React onboarding blocks',
    'Tailwind onboarding sections',
    'setup checklist blocks',
    'product activation UI',
  ],
  alternates: {
    canonical: '/blocks/onboarding',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Onboarding Blocks',
    description: onboardingBlocksDescription,
    url: '/blocks/onboarding',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Onboarding Blocks',
    description: onboardingBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function OnboardingBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Onboarding Blocks',
    description: onboardingBlocksDescription,
    url: '/blocks/onboarding',
  });
  const blocks = await Promise.all(
    onboardingBlocks.map(async (block) => {
      const sourceFiles = await getOnboardingBlockSourceFiles(
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
              Onboarding Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Setup flows and progress surfaces composed from LoveUI primitives.
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

async function getOnboardingBlockSourceFiles(
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
