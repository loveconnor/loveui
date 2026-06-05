'use client';

import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SearchIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/card';
import { CodeBlockCommand } from '@/components/code-block-command';
import { useCopyToClipboard } from '@/components/use-copy-to-clipboard';
import {
  assetCollections,
  getAssetCategoryUrl,
  getAssetCollectionMeta,
  withAssetParams,
  type AssetCollection,
  type AssetStyleOption,
  type IconRegistryItem,
} from '@/lib/icons-registry';
import { cn } from '@/lib/utils';
import { Button } from '@/registry/default/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/default/ui/dropdown-menu';
import { Input } from '@/registry/default/ui/input';
import {
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
} from '@/registry/default/ui/sheet';
import { Tabs, TabsList, TabsTab } from '@/registry/default/ui/tabs';

type IconsBrowserProps = {
  category: string;
  collection: AssetCollection;
  items: IconRegistryItem[];
  style: string;
  styleOptions: AssetStyleOption[];
};

export function IconsBrowser({
  category,
  collection,
  items,
  style,
  styleOptions,
}: IconsBrowserProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<IconRegistryItem | null>(
    null,
  );
  const collectionUrl = getAssetCollectionMeta(collection)?.url ?? '/icons';
  const currentFilterPath =
    category === 'all'
      ? collectionUrl
      : getAssetCategoryUrl(collection, category);

  const styledItems = useMemo(
    () => items.filter((item) => item.variant === style),
    [items, style],
  );

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return styledItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [item.name, item.id, item.baseId, item.category, item.variant]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query, styledItems]);

  return (
    <main className="[grid-area:main] min-w-0 bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="sticky top-[var(--fd-header-height)] z-20 grid min-h-14 grid-cols-1 items-center gap-3 border-b border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95 md:grid-cols-[1fr_minmax(260px,420px)_1fr]">
        <Tabs
          className="min-w-0"
          onValueChange={(value) => {
            const nextCollection = assetCollections.find(
              (item) => item.slug === value,
            );

            if (nextCollection) router.push(nextCollection.url);
          }}
          value={collection}
        >
          <TabsList className="rounded-none bg-transparent p-0">
            {assetCollections.map((item) => (
              <TabsTab
                className="h-8 rounded-none px-3 font-mono text-sm data-selected:bg-neutral-100 dark:data-selected:bg-neutral-900"
                key={item.slug}
                value={item.slug}
              >
                {item.name}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>

        <label className="relative block min-w-0">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-neutral-600 dark:text-neutral-400" />
          <Input
            aria-label={`Search ${collection}`}
            className="h-9 w-full rounded-none border-neutral-200 bg-white pl-10 pr-3 font-mono text-sm text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${styledItems.length.toLocaleString()} icons...`}
            type="search"
            value={query}
          />
        </label>

        <div className="flex min-w-0 justify-start md:justify-end">
          <Tabs
            className="min-w-0"
            onValueChange={(value) => {
              router.push(
                withAssetParams(currentFilterPath, {
                  style: String(value),
                }),
              );
            }}
            value={style}
          >
            <TabsList className="rounded-none bg-neutral-100 p-1 dark:bg-neutral-900">
            {styleOptions.map((option) => (
              <TabsTab
                className="h-7 rounded-none px-2.5 font-mono text-sm leading-none data-selected:bg-white data-selected:font-semibold dark:data-selected:bg-neutral-950"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </TabsTab>
            ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <section className="min-w-0 bg-white dark:bg-neutral-950">
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(148px,1fr))] gap-4 p-4 sm:grid-cols-[repeat(auto-fill,minmax(164px,1fr))] lg:gap-5 lg:p-5">
            {visibleItems.map((item) => (
              <AssetShowcaseCard
                item={item}
                key={`${item.collection}-${item.id}`}
                onSelect={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center px-6 text-center font-mono text-sm text-neutral-500">
            No assets match the current filters.
          </div>
        )}
      </section>

      <AssetDetailSheet
        item={selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
      />
    </main>
  );
}

function AssetShowcaseCard({
  item,
  onSelect,
}: {
  item: IconRegistryItem;
  onSelect: () => void;
}) {
  const isMonochromeAsset = item.collection !== 'logos';

  return (
    <Card className="group gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.42)]">
      <button
        aria-label={`Open ${item.name}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={onSelect}
        type="button"
      />
      <div className="flex h-[136px] items-center justify-center overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
        <img
          alt={item.name}
          className={cn(
            'block max-h-full max-w-full object-contain',
            item.collection === 'icons' && 'size-10',
            item.collection === 'logos' && 'size-20',
            item.collection === 'vectors' && 'size-24',
            isMonochromeAsset && 'dark:brightness-0 dark:invert',
          )}
          loading="lazy"
          src={item.previewUrl}
          title={item.name}
        />
      </div>
      <div className="flex h-12 min-w-0 items-center px-3 pt-1.5">
        <h2 className="truncate text-sm font-semibold text-card-foreground">
          {item.name}
        </h2>
      </div>
    </Card>
  );
}

function AssetDetailSheet({
  item,
  onOpenChange,
}: {
  item: IconRegistryItem | null;
  onOpenChange: (open: boolean) => void;
}) {
  const importName = item ? getAssetImportName(item) : '';
  const packagePath = item ? `love-ui/${item.collection}` : 'love-ui/icons';
  const figmaUrl = item ? figmaUrlByCollection[item.collection] : null;
  const isMonochromeAsset = item?.collection !== 'logos';
  const { copyToClipboard } = useCopyToClipboard();
  const [assetActionStatus, setAssetActionStatus] =
    useState<AssetActionStatus | null>(null);
  const [copiedImportTarget, setCopiedImportTarget] =
    useState<ImportCopyTarget | null>(null);
  const importStatement = getAssetImportStatement(importName, packagePath);

  useEffect(() => {
    setAssetActionStatus(null);
    setCopiedImportTarget(null);
  }, [item?.id]);

  useEffect(() => {
    if (!assetActionStatus || assetActionStatus.state === 'pending') return;

    const timeout = window.setTimeout(() => {
      setAssetActionStatus(null);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [assetActionStatus]);

  useEffect(() => {
    if (!copiedImportTarget) return;

    const timeout = window.setTimeout(() => {
      setCopiedImportTarget(null);
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [copiedImportTarget]);

  async function copyImportValue(target: ImportCopyTarget, value: string) {
    await copyToClipboard(value);
    setCopiedImportTarget(target);
  }

  async function runAssetAction(
    kind: AssetActionStatus['kind'],
    format: AssetOutputFormat,
  ) {
    if (!item) return;

    setAssetActionStatus({ format, kind, state: 'pending' });

    try {
      if (kind === 'copy') {
        await copyAsset(item, format);
      } else {
        await downloadAsset(item, format);
      }

      setAssetActionStatus({ format, kind, state: 'success' });
    } catch {
      setAssetActionStatus({ format, kind, state: 'error' });
    }
  }

  return (
    <Sheet open={Boolean(item)} onOpenChange={onOpenChange}>
      <SheetPopup className="w-[calc(100%-(--spacing(5)))] !max-w-[480px] gap-0 overflow-hidden p-0">
        {item ? (
          <>
            <SheetHeader className="border-b px-5 py-4">
              <SheetTitle className="pr-8 text-base">{item.name}</SheetTitle>
              <SheetDescription>
                {getAssetCollectionMeta(item.collection)?.name} /{' '}
                {toTitleCase(item.category)} / {toTitleCase(item.variant)}
              </SheetDescription>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="flex h-52 items-center justify-center overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
                <img
                  alt={item.name}
                  className={cn(
                    'block max-h-full max-w-full object-contain',
                    item.collection === 'icons' && 'size-16',
                    item.collection === 'logos' && 'size-28',
                    item.collection === 'vectors' && 'size-32',
                    isMonochromeAsset && 'dark:brightness-0 dark:invert',
                  )}
                  src={item.previewUrl}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <AssetFormatMenu
                  item={item}
                  label="Copy"
                  formats={copyFormats}
                  icon={<CopyIcon />}
                  onSelectFormat={(format) => runAssetAction('copy', format)}
                />
                <AssetFormatMenu
                  item={item}
                  label="Download"
                  formats={downloadFormats}
                  icon={<DownloadIcon />}
                  onSelectFormat={(format) =>
                    runAssetAction('download', format)
                  }
                />
              </div>
              <AssetActionIndicator status={assetActionStatus} />

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Install
                  </h3>
                </div>
                <div className="relative overflow-hidden rounded-lg border bg-background">
                  <CodeBlockCommand
                    __bun__="bun add love-ui@latest"
                    __npm__="npm install love-ui@latest"
                    __pnpm__="pnpm add love-ui@latest"
                    __yarn__="yarn add love-ui@latest"
                  />
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border bg-background">
                <div className="flex min-h-11 items-center justify-between gap-3 border-b px-3">
                  <p className="text-sm font-semibold text-foreground">
                    Import
                  </p>
                </div>
                <div className="divide-y">
                  <ImportCopyRow
                    copied={copiedImportTarget === 'name'}
                    label="component"
                    onCopy={() => copyImportValue('name', importName)}
                    value={importName}
                  />
                  <ImportCopyRow
                    copied={copiedImportTarget === 'import'}
                    label="import"
                    onCopy={() => copyImportValue('import', importStatement)}
                    value={importStatement}
                  />
                </div>
              </div>
            </div>

            {figmaUrl ? (
              <SheetFooter className="border-t p-4">
                <Button
                  asChild
                  className="w-full rounded-[10px]"
                  size="lg"
                  variant="outline"
                >
                  <a href={figmaUrl} rel="noreferrer" target="_blank">
                    <FigmaIcon className="size-4" />
                    Open in Figma
                    <ExternalLinkIcon className="ml-auto size-4 opacity-70" />
                  </a>
                </Button>
              </SheetFooter>
            ) : null}
          </>
        ) : null}
      </SheetPopup>
    </Sheet>
  );
}

function AssetFormatMenu({
  formats,
  icon,
  item,
  label,
  onSelectFormat,
}: {
  formats: readonly AssetOutputFormat[];
  icon: React.ReactNode;
  item: IconRegistryItem;
  label: string;
  onSelectFormat: (format: AssetOutputFormat) => Promise<void> | void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="w-full justify-between rounded-[10px]" variant="outline">
            <span className="flex min-w-0 items-center gap-2">
              {icon}
              {label}
            </span>
            <ChevronDownIcon className="size-4 opacity-70" />
          </Button>
        }
      />
      <DropdownMenuContent align="start" className="min-w-36">
        {formats.map((format) => (
          <DropdownMenuItem
            key={`${item.id}-${label}-${format}`}
            onClick={() => void onSelectFormat(format)}
          >
            {format.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AssetActionIndicator({
  status,
}: {
  status: AssetActionStatus | null;
}) {
  const text = status ? getAssetActionStatusText(status) : 'Ready';

  return (
    <div
      aria-live="polite"
      className={cn(
        'mt-2 flex min-h-5 items-center gap-1.5 text-xs font-medium',
        status?.state === 'success' && 'text-emerald-600 dark:text-emerald-400',
        status?.state === 'error' && 'text-destructive',
        status?.state === 'pending' && 'text-muted-foreground',
        !status && 'invisible',
      )}
    >
      {status?.state === 'success' ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <span
          className={cn(
            'size-1.5 rounded-full bg-current',
            status?.state === 'pending' && 'animate-pulse',
          )}
        />
      )}
      {text}
    </div>
  );
}

function ImportCopyRow({
  copied,
  label,
  onCopy,
  value,
}: {
  copied: boolean;
  label: string;
  onCopy: () => Promise<void> | void;
  value: string;
}) {
  return (
    <div className="grid min-h-12 grid-cols-[5.75rem_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 font-mono text-sm">
      <span className="text-muted-foreground">{label}</span>
      <code className="min-w-0 overflow-x-auto whitespace-nowrap text-foreground">
        {value}
      </code>
      <Button
        aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
        className="size-8 rounded-[10px]"
        onClick={() => void onCopy()}
        size="icon"
        type="button"
        variant="ghost"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 12a4 4 0 1 1 4 4h-4v-4Z"
        fill="#1ABCFE"
      />
      <path d="M4 20a4 4 0 0 1 4-4h4v4a4 4 0 0 1-8 0Z" fill="#0ACF83" />
      <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" fill="#A259FF" />
      <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" fill="#F24E1E" />
      <path d="M12 0h4a4 4 0 0 1 0 8h-4V0Z" fill="#FF7262" />
    </svg>
  );
}

type AssetOutputFormat = 'svg' | 'png' | 'jpg' | 'webp';
type AssetActionStatus = {
  format: AssetOutputFormat;
  kind: 'copy' | 'download';
  state: 'pending' | 'success' | 'error';
};
type ImportCopyTarget = 'name' | 'import';

const copyFormats = ['svg', 'png', 'jpg'] as const satisfies readonly AssetOutputFormat[];
const downloadFormats = ['svg', 'png', 'jpg', 'webp'] as const satisfies readonly AssetOutputFormat[];

const figmaUrlByCollection: Partial<Record<AssetCollection, string>> = {
  icons:
    'https://www.figma.com/community/file/1644595335392005926/loveui-icons',
  logos:
    'https://www.figma.com/community/file/1644597538381032237/loveui-logos?fuid=1273641003818756043',
};

async function copyAsset(item: IconRegistryItem, format: AssetOutputFormat) {
  if (format === 'svg') {
    await navigator.clipboard.writeText(await fetchAssetSvg(item));
    return;
  }

  const blob = await renderAssetBlob(item, format);

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  } catch {
    await navigator.clipboard.writeText(await blobToDataUrl(blob));
  }
}

async function downloadAsset(
  item: IconRegistryItem,
  format: AssetOutputFormat,
) {
  const blob =
    format === 'svg'
      ? new Blob([await fetchAssetSvg(item)], { type: 'image/svg+xml' })
      : await renderAssetBlob(item, format);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = `${item.id}.${format}`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function fetchAssetSvg(item: IconRegistryItem) {
  const response = await fetch(item.previewUrl);

  if (!response.ok) {
    throw new Error(`Unable to load ${item.name}.`);
  }

  return response.text();
}

async function renderAssetBlob(
  item: IconRegistryItem,
  format: Exclude<AssetOutputFormat, 'svg'>,
) {
  const svg = await fetchAssetSvg(item);
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const imageUrl = URL.createObjectURL(svgBlob);
  const image = await loadImage(imageUrl);
  const { width, height } = getRasterSize(item);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  URL.revokeObjectURL(imageUrl);

  if (!context) {
    throw new Error('Canvas is unavailable.');
  }

  canvas.width = width;
  canvas.height = height;

  if (format === 'jpg') {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  }

  context.drawImage(image, 0, 0, width, height);

  const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mimeType, 0.92);
  });

  if (!blob) {
    throw new Error(`Unable to render ${format.toUpperCase()}.`);
  }

  return blob;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function getRasterSize(item: IconRegistryItem) {
  const parts = item.viewBox
    .split(/\s+/)
    .map((part) => Number.parseFloat(part))
    .filter(Number.isFinite);
  const viewBoxWidth = parts[2] ?? 1024;
  const viewBoxHeight = parts[3] ?? viewBoxWidth;
  const scale = 1024 / Math.max(viewBoxWidth, viewBoxHeight);

  return {
    width: Math.max(1, Math.round(viewBoxWidth * scale)),
    height: Math.max(1, Math.round(viewBoxHeight * scale)),
  };
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function getAssetImportName(item: IconRegistryItem) {
  const fileName = item.path.split('/').pop()?.replace(/\.tsx$/, '') ?? item.id;

  return fileName
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function getAssetImportStatement(importName: string, packagePath: string) {
  return `import { ${importName} } from "${packagePath}"`;
}

function getAssetActionStatusText(status: AssetActionStatus) {
  const format = status.format.toUpperCase();
  const verb = status.kind === 'copy' ? 'copy' : 'download';

  if (status.state === 'pending') {
    return status.kind === 'copy'
      ? `Copying ${format}...`
      : `Preparing ${format}...`;
  }

  if (status.state === 'error') {
    return `Could not ${verb} ${format}`;
  }

  return status.kind === 'copy' ? `Copied ${format}` : `Downloaded ${format}`;
}

function toTitleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
