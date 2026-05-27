---
name: loveui-skills
description: Build beautiful, professional software interfaces and websites with LoveUI. Use when users ask to create, redesign, or polish web apps, pages, dashboards, landing pages, SaaS UI, or multi-page product experiences with high visual quality, responsive behavior, and production-ready code.
---

# LoveUI Skills

Follow this skill to design and implement polished, production-ready UI in LoveUI projects.

## Required Tooling

- Use the `loveui` MCP server as the authoritative source for LoveUI registry knowledge.
- Use MCP `resources/list` to discover all available registry items.
- Use MCP tool `get-loveui-package` to fetch exact registry JSON for selected items.
- Treat MCP results as the source of truth for UI components, building blocks, examples, templates, and related registry entries.

## Core Rules

- Start by extracting constraints: product type, audience, framework, existing design system, and timeline.
- Choose one visual direction before coding. Avoid generic default layouts.
- Build a coherent token system first: spacing, typography, colors, radius, shadows.
- Design desktop and mobile together.
- Define loading, empty, error, and success states for core surfaces.
- Preserve existing visual patterns when working in an established codebase.
- For LoveUI installs, use `npx love-ui add <component>` only.
- Never install internal packages directly (`@loveui/*`, `@love-ui/*`, `@repo/*`).
- Do not guess component availability from memory when MCP is available.

## Agent UX Contract (Non-Negotiables)

When the UI includes an agent, automation, or “apply changes” workflow, the implementation MUST include:

### Plan → Preview → Apply

- **Plan:** 1–3 bullets: what will change, why, what won’t change.
- **Preview:** diffs/screenshots/structured change summary BEFORE commit.
- **Apply:** execution state + completion summary.

### Undo & History are first‑class

- **Undo** in the success toast for reversible actions.
- **History** panel with restore points for high‑impact operations.
- High‑risk actions require confirmation + preview.

### Choice Architecture

- Default surface shows **3–5** primary actions max.
- Use progressive disclosure: “More…”, “Advanced”, context menus.
- Prefer a command palette with context-valid actions (keyboard-first).

### Trust & Explainability Primitives

- “Why this?” drawer for suggestions (short, plain-language).
- Source/provenance pill (e.g., “From LoveUI registry” / “From MCP item X”).
- Risk labeling: Low (styling), Medium (layout), High (data/auth/routing).
- No dead ends: every empty/error state offers a next action.

## Workflow

1. Define scope and screens.
- List exact pages/views and core user actions for each.
- For agent surfaces, define the Plan/Preview/Apply flow and the rollback strategy.

2. Build live LoveUI catalog context with MCP.
- Read `references/mcp-catalog-workflow.md`.
- Call `resources/list` and map candidate registry items for the requested UI.
- Call `get-loveui-package` for each selected item before implementation.

3. Choose visual direction.
- Read `references/design-directions.md`.
- Commit to one direction for the implementation.

4. Choose layout blueprint.
- Read `references/page-blueprints.md`.
- Start from the closest blueprint and adapt.

5. Implement foundations.
- Set design tokens and section rhythm first.
- Confirm consistent container widths and breakpoints.

6. Build reusable UI and compose pages.
- Build reusable components before page assembly.
- Keep APIs variant-driven and minimal.
- Ensure semantics and keyboard support.
- For agent UIs, prefer an “Agent UI Kit” set of blocks:
  - command palette, plan/preview/apply panel, diff viewer, run log/timeline, history/restore, inspector.

7. Apply quality gates.
- Read `references/quality-gates.md`.
- Fix all failing checks before finalizing.

## Output Contract

Always provide:

- The chosen visual direction and brief rationale.
- Files created/updated.
- Commands run.
- Any remaining gaps or tradeoffs.
