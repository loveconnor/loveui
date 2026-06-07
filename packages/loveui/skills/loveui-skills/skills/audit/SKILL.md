---
name: audit
description: Review interface quality and return prioritized findings with severity, impact, and recommended fixes.
args:
  - name: area
    description: The feature or area to audit (optional)
    required: false
user-invokable: true
---

Use this skill for review-only requests. Do not fix issues unless the user explicitly asks.

## Load

- `references/design-system.md`
- `references/interaction-states.md`
- `references/structure-architecture.md`
- `references/content-accessibility.md`
- `references/implementation-quality.md`

## Audit Dimensions

- Visual quality: hierarchy, spacing, typography, color, depth, brand/product fit, generic AI tells.
- Interaction: hover/focus/active/disabled/loading/error/success states, command hierarchy, empty states.
- Accessibility: semantics, labels, contrast, keyboard paths, focus visibility, touch targets.
- Responsive behavior: mobile/tablet/desktop layout, overflow, text wrapping, hidden critical actions.
- Architecture: component boundaries, token usage, duplicated patterns, state ownership.
- Performance: images, animation properties, unnecessary imports, render hotspots, layout shift.

## Report Format

Start with findings ordered by severity.

For each finding include:

- Location: file/component/route and line when available.
- Severity: Critical, High, Medium, or Low.
- Impact: why it matters to users or maintainers.
- Recommendation: specific fix direction.

Then include:

- Top 3 fixes to do first.
- Positive patterns worth preserving.
- Test or verification gaps.

Be strict, but avoid noise. Do not list low-value nitpicks when larger usability or accessibility issues exist.
