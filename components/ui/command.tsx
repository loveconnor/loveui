"use client";

import * as React from 'react';
import { XIcon } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/registry/default/ui/dialog';
import { Input } from '@/registry/default/ui/input';
import { Separator } from '@/registry/default/ui/separator';
import { cn } from '@/lib/utils';

type CommandContextValue = {
  query: string;
  setQuery: (query: string) => void;
};

const CommandContext = React.createContext<CommandContextValue | null>(null);

function CommandDialog({
  children,
  ...props
}: React.ComponentProps<typeof Dialog>) {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!props.open) {
      setQuery('');
    }
  }, [props.open]);

  const value = React.useMemo(
    () => ({
      query,
      setQuery,
    }),
    [query],
  );

  return (
    <Dialog {...props}>
      <DialogContent
        showCloseButton={false}
        className="max-w-xl gap-0 overflow-hidden p-0"
      >
        <CommandContext.Provider value={value}>
          {children}
          <DialogClose className="absolute right-4 top-3 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </CommandContext.Provider>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  onChange,
  value,
  ...props
}: React.ComponentProps<typeof Input>) {
  const context = React.useContext(CommandContext);

  return (
    <div className="flex h-14 items-center border-b px-3">
      <Input
        className={cn(
          'border-0 bg-transparent pr-10 shadow-none before:hidden has-focus-visible:ring-0 dark:bg-transparent [&>input]:bg-transparent [&>input]:py-0',
          className,
        )}
        value={context ? context.query : value}
        onChange={(event) => {
          context?.setQuery(event.target.value);
          onChange?.(event);
        }}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('max-h-[420px] overflow-auto p-2', className)} {...props} />;
}

function CommandEmpty({ className, ...props }: React.ComponentProps<'div'>) {
  const context = React.useContext(CommandContext);

  if (!context?.query.trim()) {
    return null;
  }

  return <div className={cn('py-6 text-center text-sm text-muted-foreground', className)} {...props} />;
}

function CommandGroup({
  heading,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { heading?: React.ReactNode }) {
  return (
    <div className={cn('py-1', className)} {...props}>
      {heading ? (
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </div>
      ) : null}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function CommandItem({
  className,
  onSelect,
  onClick,
  ...props
}: React.ComponentProps<'button'> & { onSelect?: () => void }) {
  const context = React.useContext(CommandContext);
  const textValue = getCommandItemText(props.children);
  const isVisible =
    !context?.query.trim() ||
    textValue.toLowerCase().includes(context.query.trim().toLowerCase());

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent focus:bg-accent',
        className,
      )}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
      }}
      {...props}
    />
  );
}

function CommandSeparator(props: React.ComponentProps<typeof Separator>) {
  return <Separator {...props} />;
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        'ml-auto inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70',
        className,
      )}
      {...props}
    />
  );
}

function getCommandItemText(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return getCommandItemText(child.props.children);
      }

      return '';
    })
    .join(' ');
}

export {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
