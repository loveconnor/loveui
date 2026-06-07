# Implementation Quality Reference

Use this reference for LoveUI registry lookup, blueprints, screenshot translation, testing, and final checks.

## LoveUI Registry Workflow

- Treat the LoveUI MCP server as the source of truth for components, blocks, examples, templates, and registry metadata.
- Use MCP `resources/list` to discover candidate registry items.
- Use MCP `get-loveui-package` before implementing selected registry items.
- Install LoveUI items with `npx love-ui add <component>` only.
- Never install internal packages directly (`@loveui/*`, `@love-ui/*`, `@repo/*`).

## Blueprint Selection

- Dashboard: sidebar or top nav, summary metrics, primary table/list, filters, empty/error/loading states.
- Settings: scoped nav, focused forms, save/cancel affordances, dirty state, validation, success/undo.
- Docs: readable content column, persistent nav, headings, code examples, callouts, responsive table handling.
- Workspace: primary canvas/list, inspector/sidebar, command/search, selected item state, history.
- Agent flow: Plan -> Preview -> Apply, diff/screenshot preview, run log, risk labels, history/restore.
- Marketing/product: first-viewport product signal, real imagery or useful media, proof, conversion path, visible next section.

## Screenshot Translation

- Identify what to preserve, normalize, and invent before coding.
- Preserve information hierarchy, core spacing relationships, unique brand/product signals, and important affordances.
- Normalize obvious inconsistencies, inaccessible contrast, broken alignment, and platform-specific artifacts.
- Invent missing states, responsive behavior, and component boundaries.

## Testing Strategy

- Match test scope to risk and blast radius.
- For narrow visual edits, run lint/type checks and manually inspect affected responsive states.
- For shared components, add focused tests for variants, keyboard behavior, and disabled/loading/error states.
- For workflows, test the happy path plus one failure path.
- For major frontend work, verify in browser screenshots across desktop and mobile.

## Final Quality Gates

- Visual direction is coherent and domain-specific.
- Typography, spacing, color, borders, radius, and elevation use a consistent token system.
- Interactive states are complete and accessible.
- Loading, empty, error, and success states exist for core flows.
- Layout works on mobile and desktop without overlap or horizontal overflow.
- Components are semantic, reusable where appropriate, and not over-abstracted.
- Copy is specific, concise, and recoverable.
- Relevant commands/tests ran, or gaps are reported.
