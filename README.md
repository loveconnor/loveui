# LoveUI

LoveUI is an open-source React UI library for building polished product
interfaces.

This repo contains the LoveUI website, docs, component examples, and copy-paste
blocks. It is for developers who want ready-to-use React and Tailwind CSS
components without installing a large design system package.

## What is included

- Docs for using and customizing LoveUI
- Reusable UI components
- Component examples with source code
- Full page and section blocks
- AI-readable docs through `llms.txt` and `llms-full.txt`

## Tech stack

- Next.js
- React
- Tailwind CSS
- Fumadocs
- Base UI

## Run locally

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Useful commands

```bash
bun run types:check
bun run build
```

## Main folders

- `app` - site routes and API routes
- `content` - docs content
- `components` - website and shared components
- `registry` - LoveUI components, examples, and blocks
- `lib` - data, SEO, search, and source helpers
