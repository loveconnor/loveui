---
name: adapt
description: Adapt an interface across mobile, tablet, desktop, density, or a new usage context without losing core functionality.
args:
  - name: target
    description: The feature or area to adapt (optional)
    required: false
user-invokable: true
---

Use this skill for responsive fixes, density changes, and context changes.

## Load

- `references/structure-architecture.md`
- `references/interaction-states.md`
- `references/design-system.md`

## Adaptation Rules

- Preserve core actions across viewports; do not hide critical functionality on mobile.
- Change structure, not just scale. Dense tables may become cards, split panes may become stacked flows, sidebars may become drawers.
- Keep touch targets at least 44px on touch devices.
- Define stable dimensions for toolbars, boards, tiles, counters, and fixed-format UI.
- Test long labels, narrow screens, wide screens, and 200% zoom.
- Keep state and selection visible when layout changes.

## Output

State what changed per viewport or context and note any tradeoff, such as density vs readability.
