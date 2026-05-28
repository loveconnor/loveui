# love-ui

Command line utility and component registry source for LoveUI.

## Usage

Install a component with `npx`:

```bash
npx love-ui@latest add alert
```

The package ships the CLI and the repository-level `registry/` tree used by the CLI.

## Development

```bash
bun install
bun run build
```

The build script bundles the CLI into `dist/` and copies the repository-level `registry/` directory into this package before npm creates the release tarball.
