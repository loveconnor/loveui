# Page Blueprints

Use these as defaults and adapt to product constraints.

## SaaS Dashboard

1. Global header: context, search, notifications, profile.
2. KPI row: 3-6 key metrics with trend indicators.
3. Primary insights zone: chart/table split.
4. Secondary panels: activity, alerts, tasks, or funnel.
5. Footer utilities: status/help links.

## Marketing / Landing

1. Hero: value proposition + primary CTA.
2. Proof: logos, social proof, key stats.
3. Feature grid with concise benefit copy.
4. FAQ or comparison section.
5. Final CTA + footer.

## Workspace / Tool Screen

1. Top bar: context title + critical actions.
2. Left navigation rail or sidebar.
3. Main canvas or primary panel.
4. Secondary inspector/context panel.
5. Feedback layer: toast, inline status, banners.

## Settings / Account

1. Section tabs or sidebar nav.
2. Profile and organization settings.
3. Billing and subscription controls.
4. Security/access controls.
5. Danger zone and audit/history.

## Content / Docs

1. Title block with metadata.
2. Reading progress + table of contents.
3. Main semantic content body.
4. Related resources and next action.
5. Feedback/edit links.

## Agent Workspace (Plan → Preview → Apply)

Use this when the UI includes an agent that proposes changes or executes steps.

1. Top bar: workspace context + primary action (Apply) + secondary (Preview/Run) + palette trigger.
2. Left rail: activity feed or “runs” list (recent executions).
3. Center: tabbed **Plan / Preview / Apply** surface.
   - Plan: concise bullets + risk label.
   - Preview: diff + before/after preview + impacted files list.
   - Apply: progress, step timeline, streaming log, final summary.
4. Right inspector: “Why this?”, provenance, settings, and per-change details.
5. Bottom feedback: toasts (with Undo), warnings, and inline error recovery actions.

## Diff Review (Focused)

Use for heavy change review or refactors.

1. Header: scope summary (files, risk, estimated impact) + primary actions.
2. Diff list (left): files/sections, filters (only changed, risky, failing gates).
3. Diff viewer (center): side-by-side by default with inline comments.
4. Run/test panel (right or bottom): checks, failures, rerun buttons.
5. Footer: Apply/merge controls + Undo/restore point creation.

## History & Restore

Use when users need confidence and rollback.

1. Timeline of restore points with metadata (who/when/what).
2. Compare view between any two snapshots.
3. Restore flow (preview + confirm).
4. Guardrails for destructive restores.
5. Export/share audit trail if relevant.
