---
name: polish
description: Improve an existing UI through spacing, hierarchy, consistency, restraint, visual impact, and final detail work.
args:
  - name: target
    description: The feature or area to polish (optional)
    required: false
user-invokable: true
---

Use this skill when the UI is mostly functional and needs to feel finished.

## Load

- `references/design-system.md`
- `references/interaction-states.md`
- `references/implementation-quality.md`
- Add `references/content-accessibility.md` for copy, forms, and accessibility-sensitive work.

## Polish Pass

- Align spacing to a consistent scale; remove arbitrary gaps.
- Tighten hierarchy: one primary focus, clear section rhythm, fewer competing accents.
- Normalize repeated components to shared variants and token usage.
- Remove unnecessary wrappers, nested cards, decorative noise, and repeated copy.
- Add impact only where the design is too plain: stronger typography, better imagery, sharper contrast, more intentional composition.
- Quiet designs that are too loud: fewer accents, calmer surfaces, reduced shadows, clearer actions.
- Fill missing hover, focus, loading, empty, error, and success states.
- Check mobile and desktop after every meaningful layout change.

## Final Check

- Text fits its containers.
- Buttons and compact controls do not resize unexpectedly.
- Icon sizes, label casing, and alignment are consistent.
- Contrast and focus states are visible.
- No console errors, obvious layout shift, or horizontal overflow.

Polish should improve the whole surface evenly. Do not perfect one corner while leaving the main workflow rough.
