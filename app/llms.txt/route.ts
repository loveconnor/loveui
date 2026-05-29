import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { blockLinks } from '@/lib/blocks-page-tree';
import { componentLinks } from '@/lib/components-page-tree';
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

  const body = `# ${seo.name}

> ${seo.description}

LoveUI is an open-source React and Tailwind CSS component system. The docs are optimized for developers and AI coding assistants that need exact installation, usage, source, and example context.

## Primary resources

- [Documentation](${seo.docsUrl})
- [Components](${seo.componentsUrl})
- [Blocks](${seo.blocksUrl})
- [Full LLM context](${seo.url}/llms-full.txt)
- [GitHub repository](${seo.githubUrl})

## Component catalog

${componentIndex}

## Block catalog

${blockIndex}

## Documentation index

${llms(source).index()}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
