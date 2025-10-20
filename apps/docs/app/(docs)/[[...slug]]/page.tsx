import type { TableOfContents } from "fumadocs-core/server";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Installer } from "../../../components/installer";
import { PoweredBy } from "../../../components/powered-by";
import { Preview } from "../../../components/preview";
import { source } from "../../../lib/source";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const Page = async (props: PageProps) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!params.slug) {
    redirect("/docs");
  }

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  const updatedToc: TableOfContents = [
    {
      title: "Installation",
      url: "#installation",
      depth: 2,
    },
    ...page.data.toc,
  ];

  const type = page.data.info.path.startsWith("blocks")
    ? "block"
    : "component";

  return (
    <DocsPage
      container={{
        className: 'max-w-[75rem]'
      }}
      full={page.data.full ?? page.slugs.includes("blocks")}
      tableOfContent={{
        style: "clerk",
        footer: page.data.dependencies && (
          <PoweredBy packages={page.data.dependencies} />
        ),
      }}
      toc={updatedToc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        {page.data.installer && (
          <>
            <Preview path={page.data.installer} type={type} />
            <h2 id="installation">Installation</h2>
            <Installer packageName={page.data.installer} />
          </>
        )}
        <MDX
          components={{
            ...defaultMdxComponents,
            Installer,
            Preview,
            PoweredBy,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
};

export const generateStaticParams = async () => source.generateParams();

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!params.slug) {
    return {
      title: "LoveUI",
      description:
        "LoveUI is a custom registry of composable, accessible and open source components designed for use with shadcn/ui.",
    };
  }

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "website",
      images: [
        {
          url: `/og?slug=${params.slug?.join("/") ?? ""}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: page.data.title,
      description: page.data.description,
      images: [
        {
          url: `/og?slug=${params.slug?.join("/") ?? ""}`,
          width: 1200,
          height: 630,
        },
      ],
      card: "summary_large_image",
      creator: '@cando145',
    }
  };
};

export default Page;
