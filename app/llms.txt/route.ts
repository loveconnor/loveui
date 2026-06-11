import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { blockLinks } from '@/lib/blocks-page-tree';
import { chartBlocks } from '@/lib/chart-blocks';
import { componentLinks } from '@/lib/components-page-tree';
import {
  assetCollections,
  defaultAssetStyle,
  getAssetCategoryItems,
} from '@/lib/icons-registry';
import { seo } from '@/lib/seo';

export const revalidate = false;

export function GET() {
  const componentIndex = componentLinks
    .map(
      (component) =>
        `- [${component.name}](${seo.url}/components/${component.slug}): ${component.description}`,
    )
    .join('\n');
  const blockIndex = blockLinks
    .map(
      (block) =>
        `- [${block.name} Blocks](${seo.url}/blocks/${block.slug}): ${block.description}`,
    )
    .join('\n');
  const chartIndex = chartBlocks
    .map(
      (chart) =>
        `- [${chart.name}](${seo.url}/charts/${chart.slug}): ${chart.description}`,
    )
    .join('\n');
  const iconIndex = assetCollections
    .map((collection) => {
      const categories = getAssetCategoryItems({
        collection: collection.slug,
        style: defaultAssetStyle[collection.slug],
      })
        .slice(0, 12)
        .map((category) => category.label)
        .join(', ');

      return `- [${collection.name}](${seo.url}${collection.url}): ${collection.description} Popular categories: ${categories}.`;
    })
    .join('\n');

  const body = `# ${seo.name}

> ${seo.description}

LoveUI is an open-source React and Tailwind CSS component system for polished product interfaces, SaaS apps, dashboards, forms, charts, and application screens. The docs are optimized for developers and AI coding assistants that need exact installation, usage, source, and example context.

## Primary resources

- [Documentation](${seo.docsUrl})
- [Components](${seo.componentsUrl})
- [Blocks](${seo.blocksUrl})
- [Charts](${seo.chartsUrl})
- [Icons](${seo.iconsUrl})
- [LoveUI Pro](${seo.proUrl})
- [Full LLM context](${seo.url}/llms-full.txt)
- [GitHub repository](${seo.githubUrl})

## What LoveUI is best for

- React components for product interfaces, dashboards, SaaS apps, admin panels, and design systems.
- Tailwind CSS component examples with accessible states, interaction patterns, and copy-paste source.
- Production-ready blocks for heroes, pricing, auth, sidebars, command palettes, forms, charts, and complete application surfaces.
- AI-assisted UI building with exact registry names, install commands, source context, and docs pages.

## Component catalog

${componentIndex}

## Block catalog

${blockIndex}

## Chart catalog

${chartIndex}

## Icon and asset catalog

${iconIndex}

## Documentation index

${llms(source).index()}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
