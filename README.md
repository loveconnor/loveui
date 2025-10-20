# LoveUI
> Composable, production-ready React building blocks that install straight into your codebase.

<div align="center">
  <img src="https://img.shields.io/npm/dy/loveui" alt="Downloads per year" />
  <img src="https://img.shields.io/npm/v/loveui" alt="Version" />
  <img src="https://img.shields.io/github/license/loveconnor/love-ui" alt="License" />
</div>

[Explore the full documentation and component gallery →](https://www.loveui.dev)

## Table of Contents
- [What is LoveUI?](#what-is-loveui)
- [Highlights](#highlights)
- [Base Components, Features, Sections & Snippets](#base-components-features-sections--snippets)
- [Component Catalog](#component-catalog)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Model Context Protocol](#model-context-protocol)
- [Contributing](#contributing)
- [License](#license)

## What is LoveUI?
**LoveUI** is an open-source, TypeScript-first component system for React and Next.js teams that want production-ready UI without surrendering control. Instead of shipping opaque bundles, every install drops real source files into your project — so you can read, edit, theme, and extend them like any other part of your design system.

The library blends headless primitives, fully wired feature components, reusable patterns, and tooling:
- A fast CLI (`npx loveui add ...`) on top of the shadcn/ui generator.
- A curated catalog of functional UI (think Gantt charts, Kanban boards, AI-ready editors, QR code widgets, dashboards, story reels, and more).
- A documentation site (Next.js + Tailwind + Fumadocs) that doubles as a playground and reference.
- Shared configs and patterns that keep every component consistent, accessible, and themeable.

## Highlights
- **Full ownership:** Components are copied into your repo under `@/components/love-ui`, not hidden behind a package boundary.
- **Feature-rich UI:** Beyond primitives — you get calendars, project boards, editors, media players, analytics widgets, and templates that ship real logic.
- **Composable + headless:** Built to compose with shadcn/ui and Tailwind CSS. Markup and behavior stay approachable, so extending is straightforward.
- **Accessible by default:** Keyboard interactions, ARIA attributes, and screen reader support are built in across the catalog.
- **TypeScript everywhere:** Strong types, clear props, predictable APIs, and autocompletion out of the box.
- **Tooling included:** A shared `@repo/typescript-config`, a `turbo`-powered monorepo, and docs you can run locally keep contributions and customization smooth.
- **MIT licensed & community driven:** Transparent codebase, open contribution process, and a rapidly growing set of components.

## Base Components, Features, Sections & Snippets
- **Base Components** live in the `loveui` package. They are foundational UI pieces (Button, Input, Switch, Dialog, etc.) that mirror shadcn/ui ergonomics while staying unstyled enough to serve as building blocks for your own components.
- **Features** are installable, production-ready experiences (e.g., Gantt, Kanban, QR Code). Each ships with its logic, accessibility wiring, and Tailwind styling so you can drop it into production immediately.
- **Sections** are pre-built page slices such as pricing, onboarding, and dashboards. They compose multiple features into opinionated experiences so you can scaffold pages in minutes.
- **Snippets** live in `@repo/patterns` and provide smaller interaction recipes (input groups, form controls, command menus) built on shadcn/ui primitives. Use them as references or copy/paste snippets when designing your own system.

## Component Catalog
Install any component with `npx loveui add <name>` (multiple names supported). Each entry below installs into `@/components/love-ui/<name>` with demo-ready examples.

| Component | What it ships |
| --- | --- |
| Announcement | A compound banner badge for lightweight product updates. |
| Avatar Stack | Overlapping avatars for collaborative indicators or teams. |
| Banner | Full-width announcement strip with messaging and CTA support. |
| Calendar | A full calendar grid for scheduling and planning views. |
| Choicebox | Card-style radio/checkbox inputs for visual option selectors. |
| Code Block | Syntax highlighting with line numbers and copy-to-clipboard. |
| Color Picker | Figma-inspired color picker with formats and swatches. |
| Combobox | Autocomplete input and command palette with async-ready list. |
| Comparison | Draggable slider for before/after media comparisons. |
| Contribution Graph | GitHub-style contribution heatmap for activity data. |
| Credit Card | Validation-ready credit card display and form helpers. |
| Cursor | Live cursor indicator for multi-user or presentation contexts. |
| Deck | Tinder-like swipeable card stack with smooth gestures. |
| Dialog Stack | Stackable dialogs and wizards with navigation controls. |
| Dropzone | Drag-and-drop file uploader with progress hooks. |
| Editor | Rich-text editor with formatting, lists, and hotkeys. |
| Gantt | Hierarchical Gantt chart for project timelines and milestones. |
| Glimpse | Link hover previews that fetch and display URL metadata. |
| Image Crop | Aspect-ratio constrained cropper for media workflows. |
| Image Zoom | Zoom-and-pan viewer for high-resolution imagery. |
| Kanban | Column-based task board with drag-and-drop lanes. |
| List | Sorted list view with grouping, priority, and status indicators. |
| Marquee | Continuous horizontal scroller for logos, stats, or headlines. |
| Mini Calendar | Compact calendar picker focused on nearby dates. |
| Pill | Flexible badge/pill UI with variants and icons. |
| QR Code | QR generator with download-ready output. |
| Rating | Accessible star rating input with hover states. |
| Reel | Vertical story reel with timers, media, and progress UI. |
| Relative Time | Multi-timezone relative time display utilities. |
| Sandbox | Embedded preview sandbox to demo interactive components. |
| Snippet | Tabbed code snippets with copy support and language tabs. |
| Spinner | Animated progress spinner primitives. |
| Status | Status badge set for uptime/health indicators. |
| Stories | Carousel of story cards similar to social media stories. |
| Table | Data table primitives with header, sorting, and slots. |
| Tags | Multi-tag input + display utilities. |
| Theme Switcher | Light/dark/system theme toggle integrated with next-themes. |
| Ticker | Finance ticker with symbols, price, and change deltas. |
| Tree | Expandable/collapsible tree with animated nodes. |
| Typography | Opinionated typography styles and tokens. |
| Video Player | Styled player built on media-chrome with custom controls. |

Support packages:
- `@repo/patterns` — curated layout and flow patterns built on shadcn/ui.
- `@repo/shadcn-ui` — LoveUI’s pinned shadcn/ui registry configuration.
- `@repo/typescript-config` — shared TS configs for packages and apps.

## How It Works
- The `loveui` npm package exposes a CLI (`npx loveui add ...`) that wraps the shadcn/ui generator and fetches blueprints hosted on [loveui.dev](https://www.loveui.dev).
- Each blueprint expands into React + TypeScript + Tailwind source files inside your project. You are free to refactor, rename, or theme them like native code.
- Components share tokens, utilities, and patterns so installs stay consistent. Optional dependencies are declared per component so your bundle only includes what you use.
- The monorepo powering the library uses Next.js + Turborepo, making it easy to run the docs or contribute new components.

## Getting Started
### Prerequisites
- Node.js **18+**
- React **18+** (Next.js 15 works great)
- Tailwind CSS configured in **CSS Variables** mode with [shadcn/ui](https://ui.shadcn.com) initialized (LoveUI builds on those primitives)

### Install the LoveUI CLI
Install as a project dependency (recommended for teams) or rely on `npx`:

```bash
npm install loveui --save-dev
# pnpm add -D loveui
# yarn add -D loveui
```

### Add components
Fetch any component directly into your project:

```bash
npx loveui add gantt kanban table
```

The CLI prints progress for each install. Files land in your configured components directory (usually `@/components/love-ui/<component>`), along with any new dependencies.

### Use components in React

```tsx
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/love-ui/announcement'

export function Hero() {
  return (
    <Announcement>
      <AnnouncementTag>Latest update</AnnouncementTag>
      <AnnouncementTitle>New feature added</AnnouncementTitle>
    </Announcement>
  )
}
```

Because the source is local, you can open the generated file, adjust Tailwind classes, or extend it with your own logic.

### Theming and customization
- Tailwind classes ship alongside the markup, so you can copy/paste or replace them with tokens from your system.
- Dark mode and CSS variable theming are wired in — update your token definitions once and every LoveUI component inherits the palette.
- Components extend native HTML props (e.g., `AnnouncementTag` extends `HTMLDivElement` attributes), making it easy to add handlers or accessibility attributes.

## Local Development
Clone the repo, install dependencies, and run the docs locally:

```bash
pnpm install
pnpm dev          # turbo dev – runs the docs app and any component story sandboxes
pnpm build        # turbo build – builds packages and the docs site
pnpm lint         # ultracite lint
pnpm test         # hooks into package-level tests (if present)
```

Open [http://localhost:3000](http://localhost:3000) to browse the docs once `pnpm dev` is running.

## Project Structure
```text
apps/
  docs/           Next.js + Fumadocs documentation site
packages/
  <component>/    Source for each installable LoveUI component
  patterns/       Shared layout and flow blueprints
  shadcn-ui/      Registry config consumed by the CLI
  typescript-config/ Shared tsconfig bases
scripts/
  index.ts        Entry point for the `loveui` CLI
```

Key documentation content lives under `apps/docs/content/docs`, including philosophy (`apps/docs/content/docs/philosophy.mdx`), setup (`apps/docs/content/docs/setup.mdx`), troubleshooting (`apps/docs/content/docs/troubleshooting.mdx`), and contribution guidelines (`apps/docs/content/docs/how-to-contribute.mdx`).

## Model Context Protocol
LoveUI exposes an MCP server so AI coding assistants can browse the component catalog. Add the following to your MCP configuration (see `apps/docs/content/docs/mcp.mdx` for full instructions):

```json
{
  "mcpServers": {
    "love-ui": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://www.loveui.dev/api/mcp/mcp"
      ]
    }
  }
}
```

After restarting your AI tool, ask it for LoveUI components or examples and it will stream documentation directly from the official registry.

## Contributing
We welcome new components, bug fixes, docs updates, and tooling improvements.

- Read the contribution playbook in `apps/docs/content/docs/how-to-contribute.mdx`.
- Review `apps/docs/content/docs/new-components.mdx` for expectations around design, accessibility, and documentation.
- Run `pnpm dev` to preview the docs while you iterate.
- Open a pull request with clear descriptions and, when possible, include demo references or tests.

## License
LoveUI is open source under the [MIT License](license.md). Use it freely in commercial and personal projects.
