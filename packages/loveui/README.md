# love-ui

Command line utility and component registry source for LoveUI.

## Usage

Install a component with `npx`:

```bash
npx love-ui@latest add alert
```

Install LoveUI Skills for an AI coding tool:

```bash
npx love-ui@latest add loveui-skills
```

The CLI will ask which target to install. You can also pass a target directly: `codex`, `claude`, `cursor`, `github`, or `all`.

The package ships the CLI and the repository-level `registry/` tree used by the CLI.

## Development

```bash
bun install
bun run build
```

The build script bundles the CLI into `dist/` and copies the repository-level `registry/` directory into this package before npm creates the release tarball.
