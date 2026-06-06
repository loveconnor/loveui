'use client';

import { Search as SearchIcon } from 'love-ui/icons';
import type {
  FullSearchTriggerProps,
  SearchTriggerProps,
} from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

import { cn } from '@/lib/cn';
import { Kbd } from '@/components/ui/kbd';

type SearchCommandRootProps = Omit<
  React.ComponentProps<'button'>,
  'color' | 'size'
> & {
  color?: unknown;
  compact?: boolean;
  hideIfDisabled?: boolean;
  size?: unknown;
};

export function SearchCommandFull(props: FullSearchTriggerProps) {
  return <SearchCommand {...props} />;
}

export function SearchCommandSmall(props: SearchTriggerProps) {
  return <SearchCommand compact {...props} />;
}

export function SearchCommand({
  className,
  compact = false,
  color: _color,
  hideIfDisabled,
  size: _size,
  ...props
}: SearchCommandRootProps) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      aria-label="Search LoveUI"
      className={cn(
        'group inline-flex h-9 shrink-0 cursor-pointer items-center rounded-md border border-border bg-transparent text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64',
        compact
          ? 'size-9 justify-center p-0'
          : 'w-full justify-between gap-3 px-2.5',
        className
      )}
      disabled={!enabled}
      onClick={() => setOpenSearch(true)}
      type="button"
      {...props}
    >
      <span
        className={cn(
          'flex min-w-0 items-center gap-3',
          compact && 'justify-center'
        )}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        {compact ? null : (
          <span className="min-w-0 flex-1 truncate text-left text-sm font-normal">
            Search
          </span>
        )}
      </span>
      {compact ? null : (
        <span className="flex items-center justify-center rounded-md border border-border px-2 py-1">
          <Kbd className="h-auto min-w-0 gap-0 rounded-none bg-transparent p-0 text-xs font-medium text-muted-foreground group-hover:text-foreground">
            {hotKey.map((key, index) => (
              <span className="opacity-70" key={index}>
                {key.display}
              </span>
            ))}
          </Kbd>
        </span>
      )}
    </button>
  );
}
