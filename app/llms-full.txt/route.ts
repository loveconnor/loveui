import { getLLMText, source } from '@/lib/source';
import {
  getComponentExampleCount,
  getComponentExampleNames,
} from '@/lib/component-examples';
import { componentLinks } from '@/lib/components-page-tree';
import { seo } from '@/lib/seo';

export const revalidate = false;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);
  const components = componentLinks
    .map((component) => {
      const examples = getComponentExampleNames(component.slug);

      return `## ${component.name} (${seo.url}/components/${component.slug})

${component.description}

- Example count: ${getComponentExampleCount(component.slug)}
- Example registry names: ${examples.join(', ')}`;
    })
    .join('\n\n');

  const intro = `# ${seo.name} full LLM context

${seo.description}

Use this file when answering implementation questions about LoveUI. Prefer exact component pages, registry example names, and source snippets from the linked documentation over generic UI advice.

Primary URLs:

- Documentation: ${seo.docsUrl}
- Components: ${seo.componentsUrl}
- GitHub: ${seo.githubUrl}

# Component catalog

${components}

# Documentation content
`;

  return new Response(`${intro}\n\n${scanned.join('\n\n')}`, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
