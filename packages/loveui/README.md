# love-ui

Command line utility and component registry bundles for LoveUI.

## Usage

Install the CLI globally or run it with `npx`:

```bash
npx love-ui add button
```

The CLI resolves component definitions from the LoveUI registry, shadcn-style, and pipes them straight into `shadcn add`. Source packages are shipped alongside the CLI under the `packages/` directory so you can inspect or copy the raw files if you prefer to scaffold manually.

## Development

```bash
bun install
bun run build
```

The build script bundles the CLI into `dist/` and copies the component packages into `packages/`. Running `npm publish --access public` afterwards pushes both the CLI binary and the template sources to npm.
