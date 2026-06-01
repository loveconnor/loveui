---
name: loveui-skills
description: Build beautiful, professional software interfaces and websites with LoveUI. Use when users ask to create, redesign, or polish web apps, pages, dashboards, landing pages, SaaS UI, or multi-page product experiences with high visual quality, responsive behavior, and production-ready code.
---

# LoveUI Skills

Follow this skill to design and implement polished, production-ready UI in LoveUI projects.

## Reference System (Read in Every UI Task)

- Read `references/visual-primitives.md` to set non-negotiable visual constraints.
- Read `references/interaction-heuristics.md` to define interaction behavior and state handling.
- Read `references/structural-cleanliness.md` to enforce semantic, reusable, responsive architecture.
- Use `references/quality-gates.md` as the final ship checklist.

## Extended References (Read Based on Scope)

- Read `references/accessibility-baseline.md` for accessibility requirements (contrast, keyboard, ARIA, touch targets).
- Read `references/content-ux-writing.md` for microcopy, error language, and destructive action wording.
- Read `references/forms-and-validation.md` for form architecture, validation timing, and async validation behavior.
- Read `references/motion-and-feedback.md` for motion timing, feedback primitives, skeleton/spinner decisions.
- Read `references/navigation-and-information-architecture.md` for navigation hierarchy, wayfinding, and URL state.
- Read `references/screenshot-translation-protocol.md` when implementing from screenshots, mockups, or visual references.
- Read `references/component-api-and-naming.md` for prop/API quality, composition patterns, and naming.
- Read `references/frontend-architecture.md` for state boundaries, data flow, side-effect placement, and feature structure.
- Read `references/testing-and-quality-strategy.md` for test scope, visual regression, and release quality gates.

## Skill Pack Discovery (Required)

This repository is a multi-skill pack. In addition to this root skill, the agent must treat every `skills/*/SKILL.md` file as an available specialized skill when this pack is installed.

Before implementation work, scan the `skills/` directory and select the best matching specialist skill(s) for the request.

### Available Specialist Skills

- `skills/adapt/SKILL.md`
- `skills/animate/SKILL.md`
- `skills/audit/SKILL.md`
- `skills/bolder/SKILL.md`
- `skills/clarify/SKILL.md`
- `skills/colorize/SKILL.md`
- `skills/critique/SKILL.md`
- `skills/delight/SKILL.md`
- `skills/distill/SKILL.md`
- `skills/extract/SKILL.md`
- `skills/frontend-design/SKILL.md`
- `skills/harden/SKILL.md`
- `skills/normalize/SKILL.md`
- `skills/onboard/SKILL.md`
- `skills/optimize/SKILL.md`
- `skills/polish/SKILL.md`
- `skills/quieter/SKILL.md`
- `skills/teach-loveui/SKILL.md`

### Routing Rule

- Prefer the most specific specialist skill over generic guidance when one clearly matches the task.
- If multiple specialist skills apply, use one primary skill and at most one supporting skill to avoid conflicting directives.
- If no specialist skill applies, continue with this root skill and the `references/*` system.

## Required Tooling

- Use the `loveui` MCP server as the authoritative source for LoveUI registry knowledge.
- Use MCP `resources/list` to discover all available registry items.
- Use MCP tool `get-loveui-package` to fetch exact registry JSON for selected items.
- Treat MCP results as the source of truth for UI components, building blocks, examples, templates, and related registry entries.

## Core Rules

- Start by extracting constraints: product type, audience, framework, existing design system, and timeline.
- Choose one visual direction before coding. Avoid generic default layouts.
- Build a coherent token system first: spacing, typography, colors, radius, shadows.
- Enforce visual rules from `references/visual-primitives.md` before component assembly.
- Enforce interaction/state rules from `references/interaction-heuristics.md` for every interactive surface.
- Enforce semantic and reuse rules from `references/structural-cleanliness.md` when defining components/layouts.
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

2. Set constraints from references.
- Read `references/visual-primitives.md` and commit to visual constraints (color, type, spacing, depth).
- Read `references/interaction-heuristics.md` and list required states/interactions per core action.
- Read `references/structural-cleanliness.md` and define component boundaries + semantic landmarks.
- If scope includes forms, read `references/forms-and-validation.md`.
- If scope includes content or system messaging, read `references/content-ux-writing.md`.
- If scope includes navigation changes, read `references/navigation-and-information-architecture.md`.
- If scope includes motion/feedback patterns, read `references/motion-and-feedback.md`.
- If user provides screenshots or mockups, read `references/screenshot-translation-protocol.md` and report preserve/normalize/invent decisions.
- For all production work, read `references/accessibility-baseline.md`, `references/component-api-and-naming.md`, `references/frontend-architecture.md`, and `references/testing-and-quality-strategy.md`.

3. Build live LoveUI catalog context with MCP.
- Read `references/mcp-catalog-workflow.md`.
- Call `resources/list` and map candidate registry items for the requested UI.
- Call `get-loveui-package` for each selected item before implementation.

4. Choose visual direction.
- Read `references/design-directions.md`.
- Commit to one direction for the implementation.

5. Choose layout blueprint.
- Read `references/page-blueprints.md`.
- Start from the closest blueprint and adapt.

6. Implement foundations.
- Set design tokens and section rhythm first.
- Confirm consistent container widths and breakpoints.

7. Build reusable UI and compose pages.
- Build reusable components before page assembly.
- Keep APIs variant-driven and minimal.
- Ensure semantics and keyboard support.
- For agent UIs, prefer an “Agent UI Kit” set of blocks:
  - command palette, plan/preview/apply panel, diff viewer, run log/timeline, history/restore, inspector.

8. Apply quality gates.
- Read `references/quality-gates.md`.
- Verify visual primitives, interaction heuristics, and structural cleanliness checks passed.
- Verify accessibility, copy quality, navigation clarity, component API cleanliness, architecture boundaries, and testing gates passed when applicable.
- Fix all failing checks before finalizing.

## Output Contract

Always provide:

- The chosen visual direction and brief rationale.
- Confirmation that `visual-primitives`, `interaction-heuristics`, and `structural-cleanliness` constraints were applied.
- Any additional references used (accessibility/forms/content/motion/navigation/architecture/testing) and how they influenced decisions.
- For screenshot-driven tasks, include what was preserved, normalized, and invented.
- Files created/updated.
- Commands run.
- Any remaining gaps or tradeoffs.
