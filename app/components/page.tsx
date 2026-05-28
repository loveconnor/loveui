import type { ReactNode } from 'react';
import {
  BellIcon,
  FileIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { Card } from '@/components/card';
import { getComponentExampleCount } from '@/lib/component-examples';
import { componentLinks } from '@/lib/components-page-tree';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/registry/default/ui/accordion';
import { Alert, AlertTitle } from '@/registry/default/ui/alert';
import {
  Autocomplete,
  AutocompleteInput,
} from '@/registry/default/ui/autocomplete';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/registry/default/ui/avatar';
import { Badge } from '@/registry/default/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/registry/default/ui/breadcrumb';
import { Button } from '@/registry/default/ui/button';
import {
  Card as UICard,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from '@/registry/default/ui/card';
import { Checkbox } from '@/registry/default/ui/checkbox';
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from '@/registry/default/ui/collapsible';
import { Combobox, ComboboxInput } from '@/registry/default/ui/combobox';
import { Dialog, DialogTrigger } from '@/registry/default/ui/dialog';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/registry/default/ui/empty';
import { Field, FieldLabel } from '@/registry/default/ui/field';
import { Fieldset, FieldsetLegend } from '@/registry/default/ui/fieldset';
import { Form } from '@/registry/default/ui/form';
import { Frame, FrameHeader, FramePanel, FrameTitle } from '@/registry/default/ui/frame';
import { Group, GroupItem, GroupSeparator } from '@/registry/default/ui/group';
import { Input } from '@/registry/default/ui/input';
import { Label } from '@/registry/default/ui/label';
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from '@/registry/default/ui/menu';
import {
  Meter,
  MeterIndicator,
  MeterTrack,
  MeterValue,
} from '@/registry/default/ui/meter';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/registry/default/ui/number-field';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/registry/default/ui/pagination';
import {
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@/registry/default/ui/popover';
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from '@/registry/default/ui/preview-card';
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
  ProgressValue,
} from '@/registry/default/ui/progress';
import { Radio, RadioGroup } from '@/registry/default/ui/radio-group';
import { ScrollArea } from '@/registry/default/ui/scroll-area';
import {
  Select,
  SelectTrigger,
  SelectValue,
} from '@/registry/default/ui/select';
import { Separator } from '@/registry/default/ui/separator';
import { Sheet, SheetTrigger } from '@/registry/default/ui/sheet';
import { Skeleton } from '@/registry/default/ui/skeleton';
import { Switch } from '@/registry/default/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/registry/default/ui/table';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/default/ui/tabs';
import { Textarea } from '@/registry/default/ui/textarea';
import { Toggle, ToggleGroup } from '@/registry/default/ui/toggle';
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/registry/default/ui/toolbar';
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from '@/registry/default/ui/tooltip';

const featured = new Set(['accordion', 'alert', 'avatar']);

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-8">
            <div className="flex w-full max-w-[300px] items-center justify-center text-foreground">
        {children}
      </div>
    </div>
  );
}

function ComponentPreview({ slug, name }: { slug: string; name: string }) {
  switch (slug) {
    case 'accordion':
      return (
        <PreviewFrame>
          <Accordion className="w-full" defaultValue={['product']}>
            {['Product Information', 'Shipping Details', 'Return Policy'].map(
              (item) => (
                <AccordionItem key={item} value={item.toLowerCase().split(' ')[0]}>
                  <AccordionTrigger>{item}</AccordionTrigger>
                  <AccordionPanel className="text-xs">
                    Component details and configuration.
                  </AccordionPanel>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </PreviewFrame>
      );
    case 'alert':
      return (
        <PreviewFrame>
          <Alert className="max-w-[270px]">
            <InfoIcon />
            <AlertTitle className="truncate text-xs">
              This Alert has a title and an icon.
            </AlertTitle>
          </Alert>
        </PreviewFrame>
      );
    case 'autocomplete':
      return (
        <PreviewFrame>
          <Autocomplete items={[{ label: 'Apple', value: 'apple' }]}>
            <AutocompleteInput placeholder="Search items..." />
          </Autocomplete>
        </PreviewFrame>
      );
    case 'avatar':
      return (
        <PreviewFrame>
          <div className="flex -space-x-2">
            {[
              'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80',
              'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80',
              'https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=96&h=96&dpr=2&q=80',
            ].map((src, index) => (
              <Avatar key={src} className="ring-2 ring-background">
                <AvatarImage src={src} alt={`Avatar ${index + 1}`} />
                <AvatarFallback>U{index + 1}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </PreviewFrame>
      );
    case 'badge':
      return (
        <PreviewFrame>
          <Badge variant="secondary" size="lg">
            Badge
          </Badge>
        </PreviewFrame>
      );
    case 'breadcrumb':
      return (
        <PreviewFrame>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <HomeIcon className="size-3.5" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewFrame>
      );
    case 'button':
      return (
        <PreviewFrame>
          <Button>Button</Button>
        </PreviewFrame>
      );
    case 'card':
      return (
        <PreviewFrame>
          <UICard className="w-52">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Reusable container.</CardDescription>
            </CardHeader>
            <CardPanel />
          </UICard>
        </PreviewFrame>
      );
    case 'checkbox':
      return (
        <PreviewFrame>
          <label className="flex items-center gap-2 text-sm font-medium">
            <Checkbox defaultChecked />
            Accept terms
          </label>
        </PreviewFrame>
      );
    case 'collapsible':
      return (
        <PreviewFrame>
          <Collapsible className="w-full rounded-lg border p-3" defaultOpen>
            <CollapsibleTrigger className="flex w-full justify-between text-sm font-medium">
              Details
            </CollapsibleTrigger>
            <CollapsiblePanel className="pt-2 text-xs text-muted-foreground">
              Hidden content panel.
            </CollapsiblePanel>
          </Collapsible>
        </PreviewFrame>
      );
    case 'combobox':
      return (
        <PreviewFrame>
          <Combobox items={[{ label: 'Apple', value: 'apple' }]}>
            <ComboboxInput placeholder="Select an item..." />
          </Combobox>
        </PreviewFrame>
      );
    case 'dialog':
      return (
        <PreviewFrame>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Open dialog
            </DialogTrigger>
          </Dialog>
        </PreviewFrame>
      );
    case 'empty':
      return (
        <PreviewFrame>
          <Empty className="border p-6 md:p-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MailIcon />
              </EmptyMedia>
              <EmptyTitle className="text-base">No messages</EmptyTitle>
              <EmptyDescription>No content yet.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </PreviewFrame>
      );
    case 'field':
      return (
        <PreviewFrame>
          <Field className="w-full">
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="you@example.com" />
          </Field>
        </PreviewFrame>
      );
    case 'fieldset':
      return (
        <PreviewFrame>
          <Fieldset className="w-full rounded-lg border p-4">
            <FieldsetLegend>Profile</FieldsetLegend>
            <Input placeholder="Name" />
          </Fieldset>
        </PreviewFrame>
      );
    case 'form':
      return (
        <PreviewFrame>
          <Form className="w-full space-y-3">
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input placeholder="loveui" />
            </Field>
          </Form>
        </PreviewFrame>
      );
    case 'frame':
      return (
        <PreviewFrame>
          <Frame className="w-56">
            <FrameHeader>
              <FrameTitle>Preview</FrameTitle>
            </FrameHeader>
            <FramePanel className="h-16" />
          </Frame>
        </PreviewFrame>
      );
    case 'group':
      return (
        <PreviewFrame>
          <Group>
            <GroupItem render={<Button variant="outline" />}>One</GroupItem>
            <GroupSeparator />
            <GroupItem render={<Button variant="outline" />}>Two</GroupItem>
          </Group>
        </PreviewFrame>
      );
    case 'input':
      return (
        <PreviewFrame>
          <Input placeholder="Input" />
        </PreviewFrame>
      );
    case 'label':
      return (
        <PreviewFrame>
          <div className="w-full space-y-2">
            <Label htmlFor="component-label-preview">Label</Label>
            <Input id="component-label-preview" placeholder="Field" />
          </div>
        </PreviewFrame>
      );
    case 'menu':
      return (
        <PreviewFrame>
          <Menu>
            <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
            <MenuPopup>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
            </MenuPopup>
          </Menu>
        </PreviewFrame>
      );
    case 'meter':
      return (
        <PreviewFrame>
          <Meter value={64}>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Usage</span>
              <MeterValue />
            </div>
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </PreviewFrame>
      );
    case 'number-field':
      return (
        <PreviewFrame>
          <NumberField className="w-40" defaultValue={12}>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </PreviewFrame>
      );
    case 'pagination':
      return (
        <PreviewFrame>
          <Pagination>
            <PaginationContent>
              {[1, 2, 3].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink href="#" isActive={page === 2}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </PreviewFrame>
      );
    case 'popover':
      return (
        <PreviewFrame>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>Popover</PopoverTrigger>
            <PopoverPopup>
              <PopoverTitle>Popover</PopoverTitle>
            </PopoverPopup>
          </Popover>
        </PreviewFrame>
      );
    case 'preview-card':
      return (
        <PreviewFrame>
          <PreviewCard>
            <PreviewCardTrigger render={<Button variant="outline" />}>
              Hover card
            </PreviewCardTrigger>
            <PreviewCardPopup>Preview content</PreviewCardPopup>
          </PreviewCard>
        </PreviewFrame>
      );
    case 'progress':
      return (
        <PreviewFrame>
          <Progress value={58}>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Progress</span>
              <ProgressValue />
            </div>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </PreviewFrame>
      );
    case 'radio-group':
      return (
        <PreviewFrame>
          <RadioGroup defaultValue="default">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Radio value="default" />
              Default
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Radio value="custom" />
              Custom
            </label>
          </RadioGroup>
        </PreviewFrame>
      );
    case 'scroll-area':
      return (
        <PreviewFrame>
          <ScrollArea className="h-24 w-48 rounded-lg border p-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="mb-2 h-2 rounded bg-muted" />
            ))}
          </ScrollArea>
        </PreviewFrame>
      );
    case 'select':
      return (
        <PreviewFrame>
          <Select
            items={[
              { label: 'Option one', value: 'one' },
              { label: 'Option two', value: 'two' },
            ]}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
          </Select>
        </PreviewFrame>
      );
    case 'separator':
      return (
        <PreviewFrame>
          <div className="w-full space-y-4">
            <div className="text-sm font-medium">Section</div>
            <Separator />
            <div className="text-sm text-muted-foreground">Separated content</div>
          </div>
        </PreviewFrame>
      );
    case 'sheet':
      return (
        <PreviewFrame>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
          </Sheet>
        </PreviewFrame>
      );
    case 'skeleton':
      return (
        <PreviewFrame>
          <div className="flex w-full items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </PreviewFrame>
      );
    case 'slider':
      return (
        <PreviewFrame>
          <div className="relative h-2 w-full max-w-52 rounded-full bg-input">
            <div className="h-full w-1/2 rounded-full bg-primary" />
            <span className="absolute left-1/2 top-1/2 size-4 -translate-y-1/2 rounded-full border border-input bg-background shadow-xs" />
          </div>
        </PreviewFrame>
      );
    case 'switch':
      return (
        <PreviewFrame>
          <label className="flex items-center gap-3 text-sm font-medium">
            <Switch defaultChecked />
            Enabled
          </label>
        </PreviewFrame>
      );
    case 'table':
      return (
        <PreviewFrame>
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ada</TableCell>
                <TableCell>Live</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </PreviewFrame>
      );
    case 'tabs':
      return (
        <PreviewFrame>
          <Tabs className="w-full" defaultValue="preview">
            <TabsList>
              <TabsTab value="preview">Preview</TabsTab>
              <TabsTab value="code">Code</TabsTab>
            </TabsList>
            <TabsPanel value="preview" className="mt-3 rounded-lg border p-3 text-sm">
              Tab panel
            </TabsPanel>
          </Tabs>
        </PreviewFrame>
      );
    case 'textarea':
      return (
        <PreviewFrame>
          <Textarea placeholder="Textarea" />
        </PreviewFrame>
      );
    case 'toast':
      return (
        <PreviewFrame>
          <Button variant="outline">
            <BellIcon />
            Toast
          </Button>
        </PreviewFrame>
      );
    case 'toggle':
      return (
        <PreviewFrame>
          <ToggleGroup defaultValue={['bold']}>
            <Toggle value="bold" variant="outline">
              B
            </Toggle>
            <Toggle value="italic" variant="outline">
              I
            </Toggle>
          </ToggleGroup>
        </PreviewFrame>
      );
    case 'toolbar':
      return (
        <PreviewFrame>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarButton>
                <FileIcon />
              </ToolbarButton>
              <ToolbarSeparator />
              <ToolbarButton>
                <SettingsIcon />
              </ToolbarButton>
            </ToolbarGroup>
          </Toolbar>
        </PreviewFrame>
      );
    case 'tooltip':
      return (
        <PreviewFrame>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Tooltip
            </TooltipTrigger>
            <TooltipPopup>Tooltip content</TooltipPopup>
          </Tooltip>
        </PreviewFrame>
      );
    default:
      return (
        <PreviewFrame>
          <Button variant="outline">
            <UserIcon />
            {name}
          </Button>
        </PreviewFrame>
      );
  }
}

export default function ComponentsPage() {
  const cards = [
    ...componentLinks.filter((component) => featured.has(component.slug)),
    ...componentLinks.filter((component) => !featured.has(component.slug)),
  ];

  return (
    <main className="[grid-area:main] min-w-0 bg-fd-background px-5 py-10 md:px-9 lg:px-12">
      <div className="mx-auto w-full max-w-[1080px]">
        <div className="max-w-[820px]">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground">
            Components
          </h1>
          <p className="mt-3 max-w-[780px] text-[15px] font-medium leading-6 text-muted-foreground">
            A collection of reusable primitives and prebuilt blocks for building
            applications faster. Start with simple pieces, combine them into
            full interfaces, and ship polished product experiences without
            starting from scratch.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((component) => (
            <Card
              key={component.slug}
              url={`/components/${component.slug}`}
              className="gap-0 overflow-hidden rounded-[16px] border-neutral-200 bg-white p-1.5 text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.32)]"
            >
              <div className="flex h-[184px] items-center justify-center overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
                <ComponentPreview slug={component.slug} name={component.name} />
              </div>
              <div className="flex h-14 items-center justify-between gap-4 px-3 pt-1.5">
                <h2 className="truncate text-base font-semibold text-card-foreground">
                  {component.name}
                </h2>
                <span className="shrink-0 text-sm font-medium text-muted-foreground">
                  {getComponentExampleCount(component.slug)}{' '}
                  {getComponentExampleCount(component.slug) === 1
                    ? 'Example'
                    : 'Examples'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
