import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { headers } from "next/headers";
import { ArrowLeft as ArrowLeftIcon } from "love-ui/icons";
import { BlockExampleCardShell } from "@/components/block-example-card-shell";
import { Button } from "@/registry/default/ui/button";
import { collectionPageJsonLd, seo, siteKeywords } from "@/lib/seo";
import { CommandPaletteOne } from "@/packages/loveui-pro/components/blocks/command-palette/command-palette-1";
import { CommandPaletteTwo } from "@/packages/loveui-pro/components/blocks/command-palette/command-palette-2";
import { CommandPaletteThree } from "@/packages/loveui-pro/components/blocks/command-palette/command-palette-3";
import { CommandPaletteFour } from "@/packages/loveui-pro/components/blocks/command-palette/command-palette-4";
import { CommandPaletteFive } from "@/packages/loveui-pro/components/blocks/command-palette/command-palette-5";

const commandPaletteBlocksDescription =
  "Command palette blocks for keyboard-first search, quick actions, and application navigation.";

function getCommandPaletteSourceFiles(fileName: string) {
  return [
    {
      source: `packages/loveui-pro/components/blocks/command-palette/${fileName}`,
      path: `components/blocks/command-palette/${fileName}`,
    },
    {
      source:
        "packages/loveui-pro/components/ui/command-palette/CommandPalette.tsx",
      path: "components/ui/command-palette/CommandPalette.tsx",
    },
    {
      source: "packages/loveui-pro/components/ui/command-palette/Icon.tsx",
      path: "components/ui/command-palette/Icon.tsx",
    },
    {
      source: "packages/loveui-pro/components/ui/command-palette/Search.tsx",
      path: "components/ui/command-palette/Search.tsx",
    },
    {
      source: "packages/loveui-pro/components/ui/command-palette/List.tsx",
      path: "components/ui/command-palette/List.tsx",
    },
    {
      source: "packages/loveui-pro/components/ui/command-palette/ListItem.tsx",
      path: "components/ui/command-palette/ListItem.tsx",
    },
    {
      source:
        "packages/loveui-pro/components/ui/command-palette/RecentActions.tsx",
      path: "components/ui/command-palette/RecentActions.tsx",
    },
    {
      source: "packages/loveui-pro/lib/context.ts",
      path: "lib/context.ts",
    },
    {
      source: "packages/loveui-pro/lib/utils.tsx",
      path: "lib/utils.tsx",
    },
    {
      source: "packages/loveui-pro/types/commandTypes.ts",
      path: "types/commandTypes.ts",
    },
  ];
}

const commandPaletteBlocks = [
  {
    id: "command-palette",
    installName: "command-palette",
    title: "Command Palette 1",
    description:
      "Workspace command palette for document actions, settings, and navigation.",
    component: <CommandPaletteOne />,
    files: getCommandPaletteSourceFiles("command-palette-1.tsx"),
  },
  {
    id: "command-palette-docs",
    installName: "command-palette-docs",
    title: "Command Palette 2",
    description:
      "Documentation command palette for pages, utilities, and copy actions.",
    component: <CommandPaletteTwo />,
    files: getCommandPaletteSourceFiles("command-palette-2.tsx"),
  },
  {
    id: "command-palette-admin",
    installName: "command-palette-admin",
    title: "Command Palette 3",
    description:
      "Admin command palette for team management and operational shortcuts.",
    component: <CommandPaletteThree />,
    files: getCommandPaletteSourceFiles("command-palette-3.tsx"),
  },
  {
    id: "command-palette-ai",
    installName: "command-palette-ai",
    title: "Command Palette 4",
    description:
      "AI command launcher with workflow actions and custom footer guidance.",
    component: <CommandPaletteFour />,
    files: getCommandPaletteSourceFiles("command-palette-4.tsx"),
  },
  {
    id: "command-palette-projects",
    installName: "command-palette-projects",
    title: "Command Palette 5",
    description:
      "Project switcher command palette for jumping between workspaces and saved views.",
    component: <CommandPaletteFive />,
    files: getCommandPaletteSourceFiles("command-palette-5.tsx"),
  },
];

export const metadata: Metadata = {
  title: "Command Palette Blocks",
  description: commandPaletteBlocksDescription,
  keywords: [
    ...siteKeywords,
    "React command palette",
    "Tailwind command menu",
    "quick action palette",
    "keyboard navigation UI",
  ],
  alternates: {
    canonical: "/blocks/command-palette",
  },
  openGraph: {
    type: "website",
    siteName: seo.name,
    title: "LoveUI Command Palette Blocks",
    description: commandPaletteBlocksDescription,
    url: "/blocks/command-palette",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoveUI Command Palette Blocks",
    description: commandPaletteBlocksDescription,
    images: ["/logo.png"],
  },
};

export const dynamic = "force-dynamic";

export default async function CommandPaletteBlocksPage() {
  const canViewProCode = await getCanViewProCode();
  const jsonLd = collectionPageJsonLd({
    name: "LoveUI Command Palette Blocks",
    description: commandPaletteBlocksDescription,
    url: "/blocks/command-palette",
  });
  const blocks = await Promise.all(
    commandPaletteBlocks.map(async (block) => {
      if (!canViewProCode) {
        return {
          ...block,
          sourceFiles: [],
          sourceCode: "",
        };
      }

      let sourceFiles: Array<{ path: string; content: string }> = [];

      try {
        sourceFiles = await getCommandPaletteBlockSourceFiles(block.files);
      } catch (error) {
        console.error("Unable to load command palette source files.", {
          blockId: block.id,
          error,
        });
      }

      return {
        ...block,
        sourceFiles,
        sourceCode: sourceFiles
          .map((file) => `// ${file.path}\n${file.content.trimEnd()}`)
          .join("\n\n"),
      };
    })
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
              Command Palette Blocks
              <span className="mt-1 rounded-[3px] bg-[#0d74fd] px-2 py-1 text-xs font-medium uppercase leading-none text-white">
                pro
              </span>
            </h1>
            <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-6 text-muted-foreground">
              Keyboard-first search and quick action surfaces composed from
              LoveUI primitives.
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
              {block.component}
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
      import("@/lib/auth"),
      import("@/lib/pro-access"),
    ]);
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return hasProAccess(session?.user.email);
  } catch (error) {
    console.error("Unable to check LoveUI Pro access for command palette.", {
      error,
    });

    return false;
  }
}

async function getCommandPaletteBlockSourceFiles(
  blockFiles: Array<{ source: string; path: string }>
) {
  return Promise.all(
    blockFiles.map(async (file) => {
      const content = await readFile(`${process.cwd()}/${file.source}`, "utf8");

      return {
        path: file.path,
        content: formatBlockSourceForDisplay(content),
      };
    })
  );
}

function formatBlockSourceForDisplay(source: string) {
  return source
    .replace(/@\/packages\/loveui-pro\/components\/ui\//g, "@/components/ui/")
    .replace(/@\/packages\/loveui-pro\/lib\//g, "@/lib/")
    .replace(/@\/packages\/loveui-pro\/types\//g, "@/types/")
    .replace(/@\/registry\/default\/ui\//g, "@/components/ui/")
    .replace(
      /(["'])\.\.\/\.\.\/ui\/command-palette\//g,
      "$1@/components/ui/command-palette/"
    )
    .replace(
      /(["'])\.\.\/components\/ui\/command-palette\//g,
      "$1@/components/ui/command-palette/"
    )
    .replace(
      /(["'])\.\.\/\.\.\/\.\.\/lib\//g,
      "$1@/lib/"
    )
    .replace(/(["'])\.\.\/lib\//g, "$1@/lib/")
    .replace(
      /(["'])\.\.\/\.\.\/\.\.\/types\//g,
      "$1@/types/"
    )
    .replace(/(["'])\.\.\/types\//g, "$1@/types/");
}
