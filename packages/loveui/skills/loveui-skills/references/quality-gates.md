# Quality Gates

Ship only after all gates pass.

## Visual System

- Typography scale is consistent.
- Spacing increments are consistent.
- Color and elevation are tokenized and purposeful.
- Radius and border treatment are coherent.

## UX and Interaction

- Primary action is obvious on every view.
- Hover/focus/active/disabled states are present.
- Loading/empty/error/success states are implemented.
- Core workflows are obvious and low-friction.

### Agent UX Gates (Ship-blockers)

If the UI includes an agent or “apply changes” workflow:

- **Plan → Preview → Apply** exists and is the default path.
- **Preview required** for high-risk operations (routing/auth/data model/destructive ops).
- **Undo** exists for reversible actions and appears in the success toast.
- **History/restore** exists for high-impact changes (restore points/snapshots).
- **Visible system status**: current step, progress, and outcome are always visible.
- **No dead ends**: every empty/error state has a next action.
- **Choice architecture**: 3–5 primary actions max on the default surface; progressive disclosure for the rest.
- **Keyboard-first happy path**: palette + navigable controls for key actions.
- **Provenance**: users can see where suggestions/actions came from (“Why this?”, sources).

## Responsive Behavior

- Layout works on mobile, tablet, desktop.
- Critical actions remain accessible on small screens.
- Data surfaces degrade gracefully on narrow viewports.

## Accessibility

- Text/control contrast is sufficient.
- Keyboard navigation works for all key actions.
- Semantic headings/landmarks are present.
- Form labels and validation feedback are clear.

## Maintainability

- Components are reusable and not tightly coupled.
- Motion is meaningful and restrained.
- Naming and file organization are consistent.
- Avoid unnecessary client-side complexity.
