# LoveUI Registry

Internal reference for the LoveUI component and block registry. This file describes what exists in the repo, how the registry is organized, what each UI component looks like and does, and which full-page or section blocks are available.

## Registry layout

| Area | Path | Purpose |
| --- | --- | --- |
| UI primitives | `registry/default/ui` | Source components users copy into their apps. These are the design-system primitives behind docs examples and blocks. |
| Examples | `registry/default/examples` | Small composed demos used on component documentation pages. There are currently 340 example files. |
| Blocks | `registry/default/blocks` | Larger copyable page sections and screen patterns. There are currently 90 block directories, with 84 populated public block variants and 6 empty sidebar placeholders. |
| Public registry JSON | `packages/loveui/public/r` | Generated install payloads consumed by the CLI and docs copy/install flows. There are currently 1,283 JSON entries, including components, examples, blocks, and generated package items. |
| Component docs | `content/docs/components` | MDX documentation pages for the public component catalog. |
| Docs app components | `components` | Internal components used to render the LoveUI website, docs, previews, code panes, search, and landing page. |
| Component navigation | `lib/components-page-tree.ts` | Source of truth for documented component names, slugs, and short descriptions. |
| Block navigation | `lib/blocks-page-tree.ts` | Source of truth for the high-level block categories shown in the docs sidebar. |

## Registry conventions

Registry entries are source-first. The canonical editable files live in `registry/default`, while the generated install artifacts live in `packages/loveui/public/r`.

Most UI components are low-level React components styled with Tailwind classes and exported from a single file. Many wrap Base UI or Radix primitives, then expose LoveUI names and aliases for shadcn-style compatibility.

Examples are named by component prefix, such as `button-demo`, `button-outline`, or `combobox-grouped`. `lib/component-examples.ts` maps component slugs to example prefixes and preferred first demos.

Blocks are named by category plus variant number, such as `hero1`, `cta-3`, or `stats10`. Install names use words, such as `hero-one`, `cta-three`, or `stats-ten`.

## Public UI components

The public component catalog currently contains 42 documented components.

| Component | Slug | Examples | What it looks like and does |
| --- | --- | ---: | --- |
| Accordion | `accordion` | 10 | A vertical stack of titled rows that expand into panels. Use it to collapse related sections such as FAQs, settings groups, release notes, or role details. Supports single, multiple, controlled, disabled, icon-led, and card-contained presentations. |
| Alert | `alert` | 10 | A compact callout surface with title, description, optional icon, and optional action. Used for inline success, warning, info, error, and billing notices. The component docs also group alert dialog patterns under this family for blocking confirmations. |
| Autocomplete | `autocomplete` | 14 | A text input with a suggestion popup. Used for search-like selection, member pickers, grouped suggestions, async suggestions, inline autocomplete, clearable inputs, and size variants. |
| Avatar | `avatar` | 14 | A circular or rounded identity image with fallback initials and optional badges. Supports loading states, fallback-only states, status badges, grouped avatars, trust rows, profile badges, radius variants, and account menus. |
| Badge | `badge` | 13 | A small rounded label for status, metadata, counts, categories, and links. Variants include default, secondary, outline, success, warning, error, info, destructive, small, large, icon, linked, and release-status treatments. |
| Breadcrumb | `breadcrumb` | 8 | A horizontal hierarchy of links, separators, and current page text. Used for docs, folders, settings, and nested resources. Includes compact paths, ellipsis truncation, cards, buttons, custom separators, and workspace paths. |
| Button | `button` | 28 | An inline-flex action control with variants and sizes. Supports default, secondary, outline, ghost, link, destructive, destructive outline, icon-only, loading, disabled, theme toggle, command-bar, link-rendered, and icon-leading states. |
| Card | `card` | 15 | A bordered content surface for grouping related content and actions. Used for dashboards, pricing items, profiles, metrics, team members, resources, help links, image features, and expandable usage panels. |
| Checkbox | `checkbox` | 11 | A square checked/unchecked control for independent options and multi-select groups. Supports descriptions, disabled states, form wiring, parent/child nested groups, notification rows, and card-style selection. |
| Collapsible | `collapsible` | 4 | A single show/hide panel controlled by a trigger. It is visually lighter than an accordion and is used for checklists, release notes, command help, and optional detail sections. |
| Combobox | `combobox` | 13 | A typed picker with listbox options and optional chips for multi-select. Used when lists are long enough to need filtering. Supports grouped options, labels, clear buttons, inner input, disabled state, form usage, assignee pickers, and size variants. |
| Dialog | `dialog` | 5 | A centered modal over a backdrop. Used for focused tasks such as inviting members, editing records, confirming close actions, nested flows, and menu-triggered dialogs. Includes header, footer, title, description, close, and content primitives. |
| Empty | `empty` | 4 | An empty-state layout with media/icon, title, description, and optional action area. Used for inbox zero, filtered results, upload queues, and general no-content states. |
| Field | `field` | 18 | A form layout primitive that wires labels, controls, descriptions, validation, required state, disabled state, and errors. Used with inputs, textareas, selects, switches, sliders, radio groups, checkboxes, comboboxes, autocomplete, password fields, and full forms. |
| Fieldset | `fieldset` | 4 | A native fieldset wrapper with a legend. Used to group related controls such as billing address fields, notification settings, and danger-zone forms. |
| Form | `form` | 5 | A form wrapper for submission and validation flows. Examples include basic form usage, React Hook Form or Zod-style validation, newsletter capture, profile cards, and standalone form composition. |
| Frame | `frame` | 4 | A lightweight bordered frame for previews and related information. It is less semantic than Card and is used for examples, analytics panels, code output, and device preview frames. |
| Group | `group` | 5 | A connected control group that removes visual gaps between related actions. Used for segmented filters, toolbar actions, inputs with attached buttons, and compact action clusters. |
| Input | `input` | 8 | A native text-like input styled for the system. Used for text, search, file, disabled, label-wrapped, size variants, and inputs with buttons. |
| Label | `label` | 6 | An accessible label primitive for form controls. It appears in label-specific examples and is also used throughout Field, Input, Combobox, Autocomplete, Number Field, Textarea, and Checkbox demos. |
| Menu | `menu` | 9 | A dropdown menu of actions with keyboard navigation. Supports links, groups, labels, nested submenus, checkbox items, radio groups, hover behavior, and close-on-click control. |
| Meter | `meter` | 5 | A static value-in-range visualization. Used for quota, storage, score, capacity, and formatted measured values. Looks like a labeled track with a filled indicator. |
| Number Field | `number-field` | 11 | A numeric input with increment/decrement buttons and optional scrub area. Used for quantities, ranges, tickets, formatted values, labels, forms, disabled states, and size variants. |
| Pagination | `pagination` | 4 | A page navigation control with previous, next, page links, and ellipsis. Used for results lists, compact navigation, and mini pagination. |
| Popover | `popover` | 4 | A popup anchored to a trigger. Used for lightweight contextual content such as color swatches, account summaries, simple popovers, and closeable panels. |
| Preview Card | `preview-card` | 4 | A hover/focus preview for links. Used for profiles, repositories, products, and generic preview cards. Looks like a small floating card tied to a link. |
| Progress | `progress` | 4 | A task-progress visualization for work that advances over time. Used for onboarding, labels with values, formatted values, and basic progress bars. |
| Radio Group | `radio-group` | 6 | A mutually exclusive selection group. Used for delivery choices, descriptions, cards, forms, disabled items, and standard radio lists. |
| Scroll Area | `scroll-area` | 4 | A custom-styled scroll container with vertical, horizontal, and both-axis examples. Used for fixed-height activity feeds, menus, and overflow regions. |
| Select | `select` | 9 | A dropdown picker for predefined values. Supports groups, disabled state, multiple selection, timezone choice, form wiring, alignment options, and size variants. |
| Separator | `separator` | 4 | A horizontal or vertical visual divider that remains accessible. Used in section labels, vertical stacks, timelines, and basic layout separation. |
| Sheet | `sheet` | 4 | A flyout panel based on dialog behavior. Used for side panels, checkout summaries, profile editors, and position variants. |
| Skeleton | `skeleton` | 4 | Placeholder loading shapes that reserve layout while data loads. Used for single skeletons, dashboards, chat lists, and grouped loading states. |
| Slider | `slider` | 6 | A draggable range control. Used for opacity, vertical sliders, range sliders, form wiring, and visible label/value combinations. |
| Switch | `switch` | 6 | An on/off setting control. Used for immediate settings, descriptions, forms, disabled states, privacy mode, and card-style switch rows. |
| Table | `table` | 5 | A styled HTML table for row and column data. Used for generic tables, framed tables, invoice lists, user-role tables, and default data tables. |
| Tabs | `tabs` | 5 | A set of tab triggers and panels for switching related views in place. Supports default, settings, underline, vertical, and underline-vertical layouts. |
| Textarea | `textarea` | 7 | A multi-line text input. Used for feedback, labels, disabled state, form usage, and size variants. |
| Toast | `toast` | 12 | Notification APIs and renderers for transient feedback. Includes standard toasts, promise toasts, loading states, status toasts, action toasts, sync complete, height demos, and gooey toast variants. |
| Toggle | `toggle` | 17 | A pressed/unpressed button used alone or in groups. Supports icon toggles, outline/default styles, disabled states, view modes, grouped filters, multiple selection, grouped separators, and size variants. |
| Toolbar | `toolbar` | 4 | A horizontal command surface for related controls. Used for editor controls, canvas controls, media controls, and density controls. |
| Tooltip | `tooltip` | 4 | A small hover/focus hint tied to a trigger. Used for icon-only actions, grouped tooltips, keyboard hints, and compact icon rows. |

## Support-only UI files

These files live in `registry/default/ui` but are not separate public component pages.

| File | Role |
| --- | --- |
| `alert-dialog.tsx` | Blocking confirmation dialog primitives. Re-exported through the Alert documentation family and used for destructive or decision-heavy flows. |
| `chart.tsx` | Recharts integration helpers: container, tooltip, legend, and chart style injection. Used by chart-like blocks and metric visualizations rather than a public docs page. |
| `checkbox-group.tsx` | Group wrapper for checkbox sets. Documented through Checkbox and Field examples. |
| `dropdown-menu.tsx` | Compatibility aliases for `menu.tsx` exports using dropdown-menu naming. |
| `input-group.tsx` | Attached input composition helpers for prefix/suffix text, buttons, inputs, and textareas. |
| `toast-gooey.tsx` | Gooey toast entrypoint and behavior layer. |
| `toast-gooey-renderer.tsx` | Renderer for gooey toast animation and layout. |
| `toast-gooey-icons.tsx` | Icon set used by gooey toast statuses. |
| `toast-gooey-types.ts` | Shared TypeScript types for gooey toast state and API. |
| `toast-gooey.css` | CSS animation and visual styles for gooey toasts. |
| `toggle-group.tsx` | Group wrapper and separator for Toggle collections. Documented through Toggle. |

## Internal docs app components

These components are for the LoveUI website and docs app. They are not registry primitives users install directly, but they are important for maintaining previews and documentation.

| Component | Path | What it does |
| --- | --- | --- |
| Search | `components/ai/search.tsx` | AI/search UI for docs lookup. |
| BlockExampleCardShell | `components/block-example-card-shell.tsx` | Framed block preview card with title, description, copy button, install command, and code sheet with file tree. |
| BlocksHeader | `components/blocks-header.tsx` | Header treatment for block category pages. |
| Card | `components/card.tsx` | Site-level card wrapper used outside the installable registry Card. |
| CodeBlockCommand | `components/code-block-command.tsx` | Command-specific code block rendering. |
| CodeBlock | `components/code-block.tsx` | Main site code block wrapper. |
| CodeCollapsibleWrapper | `components/code-collapsible-wrapper.tsx` | Collapsible wrapper for long code samples. |
| ComponentExampleCardShell | `components/component-example-card-shell.tsx` | Framing shell for component examples. |
| ComponentExampleCard | `components/component-example-card.tsx` | Higher-level component example card. |
| ComponentExamples | `components/component-examples.tsx` | Renders the example grid/list for a component page. |
| ComponentPreviewTabs | `components/component-preview-tabs.tsx` | Preview/source tabs for examples. |
| ComponentPreview | `components/component-preview.tsx` | Embeds a named registry example preview. |
| ComponentSource | `components/component-source.tsx` | Loads and displays component source code in docs. |
| CopyRegistry | `components/copy-registry.tsx` | Copy/install affordance for registry payloads. |
| DocsHeader | `components/docs-header.tsx` | Shared docs page heading area. |
| FumadocsCommandSearch | `components/fumadocs-command-search.tsx` | Fumadocs-integrated command search. |
| Markdown | `components/markdown.tsx` | Markdown rendering bridge for docs content. |
| MDX | `components/mdx.tsx` | MDX component mapping for content pages. |
| RegistryExampleRenderer | `components/registry-example-renderer.tsx` | Resolves registry example names and renders the corresponding React component. |
| SearchCommand | `components/search-command.tsx` | Search command palette UI. |
| ThemeSwitch | `components/theme-switch.tsx` | Site theme toggle. |
| UI Button | `components/ui/button.tsx` | Site-local button, separate from installable `registry/default/ui/button.tsx`. |
| Kbd | `components/ui/kbd.tsx` | Keyboard-key visual token for docs UI. |
| Code block package manager blocks | `components/ui/code-block/src/components/code-block/blocks/*` | Specialized code-block renderers for package-manager tabs, inline code, and multi-tab snippets. |
| Code block client renderers | `components/ui/code-block/src/components/code-block/client/*` | Client syntax highlighting renderers for Shiki and Sugar High. |
| Code block UI pieces | `components/ui/code-block/src/components/code-block/*` | Copy button, MDX pre-renderers, dropdown menu, tabs, and core code block implementation. |
| Code block stores and utilities | `components/ui/code-block/src/stores`, `components/ui/code-block/src/utils` | Package-manager preference state, copy helpers, React text extraction, and highlighter helpers. |
| Landing components | `components/landing/*` | Marketing/homepage pieces: decorative icon, divider, GitHub icon, grid pattern, CTA, features, footer, and hero. |
| useCopyToClipboard | `components/use-copy-to-clipboard.ts` | Site hook for clipboard actions and copied state. |

## Block categories

| Category | Slug | Purpose |
| --- | --- | --- |
| 404 | `404` | Missing pages, broken links, empty routes, and recovery actions. |
| Auth | `auth` | Polished sign-in and account entry screens. |
| Blog | `blog` | Editorial sections, article indexes, and content marketing layouts. |
| Contact | `contact` | Support pages, sales forms, office details, and community links. |
| CTA | `cta` | Conversion sections, newsletter capture, and trial signup prompts. |
| FAQ | `faq` | Help centers, product pages, onboarding flows, and support surfaces. |
| Features | `features` | Product benefits, capability grids, and marketing feature sections. |
| Footer | `footer` | Navigation, resource links, social actions, and app store badges. |
| Header | `header` | Responsive site navigation, product menus, and sticky app bars. |
| Hero | `hero` | Landing page hero sections, product launches, previews, and agency pages. |
| Image Gallery | `image-gallery` | Responsive visual grids and editorial media sections. |
| Integrations | `integrations` | Tool directories, logo matrices, and connected product sections. |
| Logo Cloud | `logo-cloud` | Partner proof, customer lists, and animated brand rows. |
| Onboarding | `onboarding` | Setup checklists, activation flows, progress timelines, and implementation guidance. |
| Pricing | `pricing` | Subscription tiers, plan comparisons, and checkout conversion sections. |
| Stats | `stats` | Metrics, quota displays, progress summaries, trend cards, and usage dashboards. |
| Testimonials | `testimonials` | Customer proof, founder quotes, social proof grids, and rotating quote sections. |
| Sidebar | `sidebar` | Placeholder category only at the moment. `sidebar1` through `sidebar6` directories exist but are empty, and only `sidebar-nav.json` appears in the generated public registry. |

## Blocks

### 404

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `404-1` | `404-one` | Bordered 404 empty state with divider rails and paired recovery actions. |
| `404-2` | `404-two` | Minimal centered 404 empty state with oversized masked title and action pair. |

### Auth

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `auth1` | `auth-one` | Social sign-in screen with an interactive particle field. |
| `auth2` | `auth-two` | Centered sign-in with email, divider, and social options. |
| `auth3` | `auth-three` | Minimal centered sign-up with logo, email, and social options. |

### Blog

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `blogs1` | `blog-one` | Compact blog index with dashed date rails and divider accents. |
| `blogs2` | `blog-two` | Dense editorial card grid with categories, authors, and filler cells. |
| `blogs3` | `blog-three` | Image-led blog grid with lazy-loaded thumbnails and article metadata. |

### Contact

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `contact1` | `contact-one` | Compact contact method row with icon cards and divider rails. |
| `contact2` | `contact-two` | Three-card contact grid with email, social, and community actions. |
| `contact3` | `contact-three` | Full-page contact directory with email, location, phone, and social links. |
| `contact4` | `contact-four` | Split contact form with contact details, inputs, textarea, and primary action. |
| `contact5` | `contact-five` | Bordered contact form with corner accents, contact methods, and stacked fields. |

### CTA

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `cta-1` | `cta-one` | Split call-to-action bar with compact copy and paired buttons. |
| `cta-2` | `cta-two` | Stacked CTA section with supporting copy and a tinted action row. |
| `cta-3` | `cta-three` | Bordered CTA panel with corner accents and centered actions. |
| `cta-4` | `cta-four` | Rounded card CTA with trial messaging and button pair. |
| `cta-5` | `cta-five` | Newsletter CTA with email input, proof avatars, and divider rails. |

### FAQ

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `faq-1` | `faq-one` | Centered FAQ section with intro copy, bordered accordion, and support link. |
| `faq-2` | `faq-two` | Two-column FAQ layout with a fixed intro panel and footer contact row. |
| `faq-3` | `faq-three` | Split FAQ section with guide rail accents and decorated accordion items. |
| `faq-4` | `faq-four` | Categorized FAQ browser with topic filters and compact answer cards. |
| `faq-5` | `faq-five` | Searchable FAQ center with category tabs, empty state, and contact link. |

### Features

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `features1` | `features-one` | Compact four-column feature strip with icon dividers. |
| `features2` | `features-two` | Three-card feature section with dashed borders and corner accents. |
| `features3` | `features-three` | Full-width bordered feature grid with section dividers. |
| `features4` | `features-four` | Product feature cards with extended borders and icon badges. |
| `features5` | `features-five` | Six-card feature grid with subtle grid-pattern backgrounds. |
| `features6` | `features-six` | Large feature grid with custom visuals, analytics, and globe card. |

### Footer

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `footer1` | `footer-one` | Compact footer with brand, navigation links, and social actions. |
| `footer2` | `footer-two` | Bordered footer with resource columns and social links. |
| `footer3` | `footer-three` | Animated rounded footer with grouped links and social icons. |
| `footer4` | `footer-four` | Column footer with social cards and divided link groups. |
| `footer5` | `footer-five` | App-focused footer with dense links, social buttons, and store badges. |
| `footer6` | `footer-six` | Sticky reveal footer with animated link groups and social actions. |

### Header

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `header1` | `header-one` | Responsive sticky header with a blurred scroll state. |
| `header2` | `header-two` | Centered header that compresses into a floating bar on scroll. |
| `header3` | `header-three` | Responsive header with dropdown navigation menus. |

### Hero

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `hero1` | `hero-one` | Centered hero with sticky header, pill announcement, and logo marquee. |
| `hero2` | `hero-two` | Bordered agency hero with dashboard preview and partner logos. |
| `hero3` | `hero-three` | Left-aligned hero with product preview, sticky header, and logo row. |

### Image Gallery

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `image-gallery-1` | `image-gallery-one` | Responsive masonry-style image grid with lazy image loading. |

### Integrations

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `integrations1` | `integrations-one` | Compact integration card grid with local logo assets and action link. |
| `integrations2` | `integrations-two` | Bordered integration matrix with corner accents and local tool logos. |
| `integrations3` | `integrations-three` | Split integration section with copy, CTA, and scattered logo grid. |
| `integrations4` | `integrations-four` | Large integration hero with masked logo tiles and product-stack copy. |
| `integrations5` | `integrations-five` | Rounded logo cluster with overlap layout and integrations CTA. |

### Logo Cloud

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `logo-cloud-1` | `logo-cloud-one` | Bordered partner logo grid with a compact section heading. |
| `logo-cloud-2` | `logo-cloud-two` | Alternating logo grid with decorative border accents. |
| `logo-cloud-3` | `logo-cloud-three` | Animated scrolling logo row with masked edges. |
| `logo-cloud-4` | `logo-cloud-four` | Animated logo marquee with progressive blur fades. |
| `logo-cloud-5` | `logo-cloud-five` | Flexible wrap logo cloud for dense brand lists. |

### Onboarding

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `onboarding1` | `onboarding-one` | Expandable LoveUI setup checklist with actions and progress state. |
| `onboarding2` | `onboarding-two` | Step-by-step activation cards with icon actions and progress bar. |
| `onboarding3` | `onboarding-three` | Selectable setup checklist with helper copy and compact progress. |
| `onboarding4` | `onboarding-four` | Accordion onboarding flow with gated steps and action panels. |
| `onboarding5` | `onboarding-five` | Activity timeline for source-first LoveUI implementation work. |
| `onboarding6` | `onboarding-six` | Launch progress timeline with completed, active, and upcoming states. |
| `onboarding7` | `onboarding-seven` | Animated setup progress with logs, replay action, and accordion details. |

### Pricing

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `pricing1` | `pricing-one` | Compact monthly and yearly pricing panel with discount badges and a trust note. |
| `pricing2` | `pricing-two` | Bordered two-plan pricing grid with feature checklists and full-width dividers. |
| `pricing3` | `pricing-three` | Three-tier pricing cards with icons, badges, original prices, and feature lists. |
| `pricing4` | `pricing-four` | Animated pricing table with monthly/yearly toggle, discounts, and highlighted plan. |

### Stats

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `stats1` | `stats-one` | Bordered four-column metric strip with directional change labels. |
| `stats2` | `stats-two` | Divided metric cards with previous values and trend badges. |
| `stats3` | `stats-three` | Responsive metric cards with compact change indicators. |
| `stats4` | `stats-four` | Three-card metric row with badge trends and large values. |
| `stats5` | `stats-five` | Metric cards with footer links and positive or negative movement. |
| `stats6` | `stats-six` | Status-driven metric cards with goals and contextual icons. |
| `stats7` | `stats-seven` | Plan overview cards with radial capacity charts. |
| `stats8` | `stats-eight` | Radial progress cards with category coverage and footer links. |
| `stats9` | `stats-nine` | Usage limit cards with progress bars and quota labels. |
| `stats10` | `stats-ten` | Sparkline metric cards with positive and negative trend charts. |
| `stats11` | `stats-eleven` | Usage guardrail cards with progress, actions, and edit dialog. |
| `stats12` | `stats-twelve` | Compact usage list with donut progress indicators. |
| `stats13` | `stats-thirteen` | Stacked usage bar with segment legend and free capacity. |
| `stats14` | `stats-fourteen` | Compact usage card with breakdown bar and category legend. |
| `stats15` | `stats-fifteen` | Small projection list with values and percentage badges. |

### Testimonials

| Block | Install name | What it looks like and does |
| --- | --- | --- |
| `testimonials1` | `testimonials-one` | Centered brand quote with avatar, citation, and divider accent. |
| `testimonials2` | `testimonials-two` | Compact profile quote with masked avatar and decorative rail lines. |
| `testimonials3` | `testimonials-three` | Three-card testimonial row with quote icons, avatars, and corner accents. |
| `testimonials4` | `testimonials-four` | Editorial quote grid with full-width divider rails and split layout. |
| `testimonials5` | `testimonials-five` | Large testimonial wall with grid pattern accents and filler cells. |
| `testimonials6` | `testimonials-six` | Animated vertical testimonial columns with hover speed controls. |

### Sidebar placeholders

`registry/default/blocks/sidebar1` through `registry/default/blocks/sidebar6` exist as directories, but they currently contain empty `app` and `components` folders. They should be treated as placeholders until populated. The generated public registry currently includes `sidebar-nav.json`, not full sidebar block variants.

## Maintenance checklist

When adding or changing registry items:

1. Add or update source files under `registry/default/ui`, `registry/default/examples`, or `registry/default/blocks`.
2. Update `content/docs/components/*.mdx` when a public component changes behavior, anatomy, variants, accessibility guidance, or installation steps.
3. Update `lib/components-page-tree.ts` for public component catalog changes.
4. Update `lib/component-examples.ts` when example naming does not follow the default component prefix.
5. Update the relevant `app/blocks/<category>/page.tsx` data when adding populated block variants.
6. Regenerate public registry JSON under `packages/loveui/public/r` with the project registry build flow.
7. Refresh this file whenever the component list, block list, install names, or support-only files change.
