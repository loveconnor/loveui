import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { ArrowLeftIcon } from 'lucide-react';
import { BlockExampleCardShell } from '@/components/block-example-card-shell';
import { Contact as ContactOne } from '@/registry/default/blocks/contact1/components/contact';
import { Contact as ContactTwo } from '@/registry/default/blocks/contact2/components/contact';
import { Contact as ContactThree } from '@/registry/default/blocks/contact3/components/contact';
import { ContactSection as ContactFour } from '@/registry/default/blocks/contact4/components/contact';
import { ContactSection as ContactFive } from '@/registry/default/blocks/contact5/components/contact';
import { Button } from '@/registry/default/ui/button';
import { collectionPageJsonLd, seo, siteKeywords } from '@/lib/seo';

const contactBlocksDescription =
  'Contact blocks for support channels, feedback forms, sales inquiries, and product help surfaces.';

const contactBlocks = [
  {
    id: 'contact1',
    installName: 'contact-one',
    title: 'Contact 1',
    description: 'Compact contact method row with icon cards and divider rails.',
    component: <ContactOne />,
    files: [
      'app/page.tsx',
      'components/contact.tsx',
      'components/full-width-divider.tsx',
    ],
  },
  {
    id: 'contact2',
    installName: 'contact-two',
    title: 'Contact 2',
    description: 'Three-card contact grid with email, social, and community actions.',
    component: <ContactTwo />,
    files: [
      'app/page.tsx',
      'components/contact.tsx',
      'components/full-width-divider.tsx',
      'components/icons/x-icon.tsx',
    ],
  },
  {
    id: 'contact3',
    installName: 'contact-three',
    title: 'Contact 3',
    description:
      'Full-page contact directory with email, location, phone, and social links.',
    component: <ContactThree />,
    files: [
      'app/page.tsx',
      'components/contact.tsx',
      'components/full-width-divider.tsx',
      'components/icons/github-icon.tsx',
      'components/icons/x-icon.tsx',
    ],
  },
  {
    id: 'contact4',
    installName: 'contact-four',
    title: 'Contact 4',
    description:
      'Split contact form with contact details, inputs, textarea, and primary action.',
    component: <ContactFour />,
    files: ['app/page.tsx', 'components/contact.tsx'],
  },
  {
    id: 'contact5',
    installName: 'contact-five',
    title: 'Contact 5',
    description:
      'Bordered contact form with corner accents, contact methods, and stacked fields.',
    component: <ContactFive />,
    files: ['app/page.tsx', 'components/contact.tsx', 'components/decor-icon.tsx'],
  },
];

export const metadata: Metadata = {
  title: 'Contact Blocks',
  description: contactBlocksDescription,
  keywords: [
    ...siteKeywords,
    'React contact blocks',
    'Tailwind contact sections',
    'contact form blocks',
    'support section blocks',
  ],
  alternates: {
    canonical: '/blocks/contact',
  },
  openGraph: {
    type: 'website',
    siteName: seo.name,
    title: 'LoveUI Contact Blocks',
    description: contactBlocksDescription,
    url: '/blocks/contact',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveUI Contact Blocks',
    description: contactBlocksDescription,
    images: ['/logo.png'],
  },
};

export default async function ContactBlocksPage() {
  const jsonLd = collectionPageJsonLd({
    name: 'LoveUI Contact Blocks',
    description: contactBlocksDescription,
    url: '/blocks/contact',
  });
  const blocks = await Promise.all(
    contactBlocks.map(async (block) => {
      const sourceFiles = await getContactBlockSourceFiles(
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
              Contact Blocks
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Support channels and contact forms composed from LoveUI primitives.
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

async function getContactBlockSourceFiles(
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
