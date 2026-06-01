# MCP Catalog Workflow

Use this workflow whenever the `loveui` MCP server is available.

## Goal

Access complete LoveUI registry knowledge from MCP for:

- UI components
- building blocks
- examples/demos
- templates and related registry entries

## Mandatory Steps

1. Call `resources/list` on the `loveui` MCP server.
- Treat this output as the authoritative live catalog.
- Do not assume availability from memory.

2. Narrow candidates by user intent.
- Match names to required surfaces and interactions.
- Keep a shortlist of likely registry items.

3. Fetch exact definitions with `get-loveui-package`.
- Call once per shortlisted item.
- Read `type`, `files`, `dependencies`, `registryDependencies`, and metadata.

4. Build install plan.
- Use `npx love-ui add <component>` for install commands.
- Never use internal package installs (`@loveui/*`, `@love-ui/*`, `@repo/*`).

5. Validate composition coverage.
- Ensure selected items cover all required screens and states.
- Add missing items by repeating steps 2-4.

## Agent UI Kit (When an agent is present)

If the experience includes “generate/apply changes”, always attempt to assemble a minimal “Agent UI Kit”
from registry items (components, blocks, examples). Look for items that cover:

- Command palette / quick actions
- Plan → Preview → Apply panels
- Diff viewer (code/text) and/or before/after preview
- Run log / timeline (steps, progress, streaming output)
- History / restore (snapshots, rollback)
- Inspector / “why this?” drawer
- Toasts with Undo, banners, inline status components

If any of these are missing from the selected set, return to steps 2–4 and add them.

## Selection Heuristics

- Prefer base primitives first, then add higher-level blocks/examples.
- Use examples/demos to accelerate layout and interaction scaffolding.
- Keep installed set minimal for maintainability.
- For agent UIs:
  - prioritize diff/log/history primitives early,
  - prioritize keyboard-first affordances (palette, shortcuts),
  - prefer context-valid actions over huge menus.

## Output Requirements

When presenting work, include:

- MCP items selected (names).
- Install commands executed.
- Why each selected item maps to the requested UX.
- For agent UIs: where Plan/Preview/Apply, Undo, and History live in the UI.
