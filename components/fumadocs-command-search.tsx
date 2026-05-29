'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  BookOpenIcon,
  FileTextIcon,
  HashIcon,
  LifeBuoyIcon,
  MessageSquareIcon,
  SearchIcon,
} from 'lucide-react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
  type SearchItemType,
} from 'fumadocs-ui/components/dialog/search';
import type { DefaultSearchDialogProps } from 'fumadocs-ui/components/dialog/search-default';

import { cn } from '@/lib/cn';

function ResultIcon({ type }: { type: SearchItemType['type'] }) {
  if (type === 'heading') {
    return <HashIcon className="size-4 shrink-0 text-muted-foreground" />;
  }

  if (type === 'text') {
    return <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />;
  }

  return <BookOpenIcon className="size-4 shrink-0 text-muted-foreground" />;
}

const fallbackLinks = [
  {
    id: 'docs',
    type: 'page' as const,
    content: 'Documentation',
    url: '/docs',
    icon: <BookOpenIcon />,
  },
  {
    id: 'components',
    type: 'page' as const,
    content: 'Components',
    url: '/components',
    icon: <LifeBuoyIcon />,
  },
  {
    id: 'blocks',
    type: 'page' as const,
    content: 'Blocks',
    url: '/blocks',
    icon: <MessageSquareIcon />,
  },
];

function renderInlineMarkdown(value: string, keyPrefix = 'text') {
  const parts = value.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span className="font-medium" key={key}>
          {part.slice(2, -2)}
        </span>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          className="rounded border bg-muted px-1 py-0.5 font-mono text-[0.875em]"
          key={key}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

function SearchMarkdown({ children }: { children: string }) {
  const parts = children.split(/(<mark>.*?<\/mark>)/g);

  return parts.map((part, index) => {
    const markMatch = part.match(/^<mark>(.*?)<\/mark>$/);

    if (markMatch) {
      return (
        <mark
          className="bg-transparent text-foreground underline underline-offset-2"
          key={`mark-${index}`}
        >
          {renderInlineMarkdown(markMatch[1], `mark-${index}`)}
        </mark>
      );
    }

    return renderInlineMarkdown(part, `part-${index}`);
  });
}

function ResultContent({ item }: { item: SearchItemType }) {
  if (item.type === 'action') return item.node;

  const customIcon = (item as SearchItemType & { icon?: ReactNode }).icon;
  const content =
    typeof item.content === 'string' ? <SearchMarkdown>{item.content}</SearchMarkdown> : item.content;

  return (
    <>
      <span className="[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
        {customIcon ?? <ResultIcon type={item.type} />}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="min-w-0 truncate font-medium text-sm leading-5">
          {content}
        </div>
        {item.breadcrumbs && item.breadcrumbs.length > 0 ? (
          <div className="flex min-w-0 items-center gap-1 truncate text-muted-foreground text-xs leading-4">
            {item.breadcrumbs.map((breadcrumb, index) => (
              <span className="min-w-0 truncate" key={index}>
                {breadcrumb}
                {index < item.breadcrumbs!.length - 1 ? ' /' : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export function FumadocsCommandSearch({
  defaultTag,
  tags = [],
  api,
  delayMs,
  type = 'fetch',
  allowClear = false,
  links = [],
  footer,
  ...props
}: DefaultSearchDialogProps) {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);
  const { search, setSearch, query } = useDocsSearch(
    type === 'fetch'
      ? {
          type: 'fetch',
          api,
          locale,
          tag,
          delayMs,
        }
      : {
          type: 'static',
          from: api,
          locale,
          tag,
          delayMs,
        }
  );
  const defaultItems = useMemo(() => {
    if (links.length === 0) return fallbackLinks;

    return links.map(([name, link]) => ({
      type: 'page' as const,
      id: name,
      content: name,
      url: link,
    }));
  }, [links]);
  const items = query.data !== 'empty' ? query.data : defaultItems;
  const showResults = search.trim().length > 0;

  useOnChange(defaultTag, (value) => {
    setTag(value);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay className="bg-background/70 backdrop-blur-sm" />
      <SearchDialogContent
        className={cn(
          'top-[12vh] w-[calc(100%-2rem)] max-w-xl rounded-xl border bg-popover text-popover-foreground shadow-xl shadow-black/20',
          '*:border-b-0'
        )}
      >
        <div className="flex min-h-16 items-center gap-3 border-b px-4 py-3 [&_input]:h-10 [&_input]:text-base">
          <SearchIcon
            className={cn(
              'size-5 shrink-0 text-muted-foreground',
              query.isLoading && 'animate-pulse'
            )}
          />
          <SearchDialogInput
            className="h-13 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            placeholder="Search or jump to..."
          />
          <SearchDialogClose className="h-8 rounded-lg px-2.5 text-xs">
            ESC
          </SearchDialogClose>
        </div>

        <div className="p-2 pt-3">
          <div className="px-2 pb-2 font-medium text-muted-foreground text-xs">
            {showResults ? 'Results' : 'Quick Links'}
          </div>
          <SearchDialogList
            items={items}
            className="h-auto transition-none [&>div]:max-h-[420px] [&>div]:p-0"
            Empty={() => (
              <div className="py-8 text-center text-muted-foreground text-sm">
                No results found.
              </div>
            )}
            Item={({ item, onClick }) => (
              <SearchDialogListItem
                item={item}
                onClick={onClick}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm outline-none',
                  'font-normal leading-none',
                  'aria-selected:bg-muted aria-selected:text-foreground hover:bg-muted'
                )}
              >
                <ResultContent item={item} />
              </SearchDialogListItem>
            )}
          />
        </div>
      </SearchDialogContent>
      <SearchDialogFooter className="border-t bg-popover px-3 py-2">
        {tags.length > 0 ? (
          <TagsList
            allowClear={allowClear}
            onTagChange={setTag}
            tag={tag}
          >
            {tags.map((tag) => (
              <TagsListItem key={tag.value} value={tag.value}>
                {tag.name}
              </TagsListItem>
            ))}
          </TagsList>
        ) : null}
        {footer}
      </SearchDialogFooter>
    </SearchDialog>
  );
}
