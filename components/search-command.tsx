'use client';

import { SearchIcon } from 'lucide-react';
import type {
  FullSearchTriggerProps,
  SearchTriggerProps,
} from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

import { cn } from '@/lib/cn';
import { Kbd } from '@/components/ui/kbd';
import { Button } from '@/registry/default/ui/button';

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
    <Button
      aria-label="Search LoveUI"
      className={cn(
        compact
          ? 'size-9 p-0 text-muted-foreground'
          : 'w-full justify-start gap-2 text-muted-foreground',
        className
      )}
      onClick={() => setOpenSearch(true)}
      type="button"
      variant="outline"
      {...props}
    >
      <SearchIcon className="size-4" />
      {compact ? null : (
        <>
          <span className="min-w-0 flex-1 text-left">Search</span>
          <Kbd className="ml-auto gap-0 px-1.5">
            {hotKey.map((key, index) => (
              <span key={index}>{key.display}</span>
            ))}
          </Kbd>
        </>
      )}
    </Button>
  );
}
