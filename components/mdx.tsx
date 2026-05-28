import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import {
  Children,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from 'react';
import { CodeBlock } from '@/components/code-block';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/default/ui/tabs';
import { ComponentPreview } from './component-preview';
import { ComponentSource } from './component-source';

function MdxPre(props: ComponentProps<'pre'>) {
  const code = Children.only(props.children) as ReactElement;
  const codeProps = code.props as ComponentProps<'code'>;
  const content = getTextContent(codeProps.children);
  const title =
    (props as { 'data-title'?: string; title?: string })['data-title'] ??
    (props as { title?: string }).title ??
    (codeProps as { 'data-title'?: string; title?: string })['data-title'] ??
    (codeProps as { title?: string }).title;
  const explicitLang = getExplicitLanguage(props, codeProps);
  const lang = explicitLang ?? inferLanguage(content, title) ?? 'text';

  return <CodeBlock code={content.trimEnd()} language={lang} title={title} />;
}

function getExplicitLanguage(
  preProps: ComponentProps<'pre'>,
  codeProps: ComponentProps<'code'>,
): string | undefined {
  const classNameCandidates = [preProps.className, codeProps.className];
  const attributeCandidates = [
    (preProps as { 'data-language'?: string })['data-language'],
    (codeProps as { 'data-language'?: string })['data-language'],
    (preProps as { 'data-lang'?: string })['data-lang'],
    (codeProps as { 'data-lang'?: string })['data-lang'],
  ];

  for (const candidate of classNameCandidates) {
    if (!candidate) continue;

    const languageClass = String(candidate)
      .split(/\s+/)
      .find((value) => value.startsWith('language-'));

    if (languageClass) return languageClass.slice('language-'.length);
  }

  for (const candidate of attributeCandidates) {
    if (!candidate) continue;
    return String(candidate);
  }
}

function getTextContent(children: ReactNode): string {
  let value = '';

  Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      value += child;
      return;
    }

    if (isValidElement<{ children?: ReactNode }>(child)) {
      value += getTextContent(child.props.children);
    }
  });

  return value;
}

function inferLanguage(code: string, title?: string): string | undefined {
  const extension = title?.split('.').pop();

  if (extension && extension !== title) return extension;
  if (/^\s*(bunx?|npx|npm|pnpm|yarn)\b/.test(code)) return 'bash';
  if (/<[A-Z][\w.]*[\s>]|<\/[A-Z][\w.]*>/.test(code)) return 'tsx';
  if (/^\s*(import|export)\s/m.test(code)) return 'ts';
  if (/^\s*(const|let|var|function|type|interface|class)\s/m.test(code)) return 'ts';
  if (/^\s*[@.#]?[a-zA-Z][\w-]*\s*\{/.test(code)) return 'css';
}

function findFirstTabValue(children: ReactNode): string | undefined {
  let value: string | undefined;

  Children.forEach(children, (child) => {
    if (value) return;
    if (!child || typeof child !== 'object' || !('props' in child)) return;

    const element = child as ReactElement<{
      children?: ReactNode;
      value?: unknown;
    }>;
    if (element.type === TabsTab && typeof element.props.value === 'string') {
      value = element.props.value;
      return;
    }

    const nestedValue = findFirstTabValue(element.props.children);
    if (nestedValue) value = nestedValue;
  });

  return value;
}

function CodeTabs({ children, defaultValue, ...props }: ComponentProps<typeof Tabs>) {
  const resolvedDefaultValue = defaultValue ?? findFirstTabValue(children);

  return (
    <Tabs defaultValue={resolvedDefaultValue} {...props}>
      {children}
    </Tabs>
  );
}

function ScriptAsTemplate({ children }: ComponentProps<'script'>) {
  return <template>{children}</template>;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: MdxPre,
    script: ScriptAsTemplate,
    Step,
    Steps,
    CodeTabs,
    ComponentPreview,
    ComponentSource,
    TabsList,
    TabsTab,
    TabsPanel,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
