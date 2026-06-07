---
name: harden
description: Make a UI production-ready through accessibility, errors, long content, i18n, performance, and edge-case resilience.
args:
  - name: target
    description: The feature or area to harden (optional)
    required: false
user-invokable: true
---

Use this skill when ideal demo data is likely hiding real-world failures.

## Load

- `references/content-accessibility.md`
- `references/interaction-states.md`
- `references/structure-architecture.md`
- `references/implementation-quality.md`

## Hardening Checklist

- Long, short, missing, CJK, RTL, emoji, and translated text do not break layout.
- Forms preserve input, prevent duplicate submits, and show recoverable errors.
- API states cover 400, 401, 403, 404, 429, 500, offline, timeout, and permission problems when relevant.
- Empty and no-results states offer useful next actions.
- Keyboard navigation, focus order, labels, contrast, and ARIA are correct.
- Images have dimensions, useful alt text, and lazy loading where appropriate.
- Large lists use pagination, search, filtering, or virtualization.
- Animations use transform/opacity and respect reduced motion.
- Imports, rerenders, and client boundaries are not heavier than necessary.

## Verification

Run the lightest reliable checks for the change: type/lint/tests when available, browser inspection for layout, and manual keyboard checks for interactive flows.
