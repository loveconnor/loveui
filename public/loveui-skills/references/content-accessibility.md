# Content Accessibility Reference

Use this reference for UX writing, labels, keyboard support, and accessibility basics.

## UX Writing

- Use concrete nouns and verbs from the product domain.
- Labels should be short and stable; helper text should answer the next likely question.
- Empty states should explain why the state exists and offer a next action.
- Error messages should name the problem and recovery path.
- Destructive actions need specific object names, consequence text, and a clear cancel path.
- Do not describe UI features, styling, or instructions users can infer from the interface.

## Accessibility Baseline

- Text contrast should meet WCAG AA: 4.5:1 for normal text and 3:1 for large text or UI graphics.
- Touch targets should be at least 44px by 44px on touch surfaces.
- Keyboard users must be able to reach and operate every interactive element.
- Focus indicators must be visible and not rely on color alone.
- Inputs need programmatic labels; errors should connect to fields with ARIA where appropriate.
- Images need useful alt text unless decorative.

## ARIA

- Prefer semantic HTML before ARIA.
- Add ARIA only when it improves the accessibility tree.
- Keep `aria-expanded`, `aria-selected`, `aria-current`, and `aria-invalid` in sync with visible state.
- Do not add roles that fight native semantics.

## Resilience

- Test long names, missing content, CJK text, RTL text, emoji, and 200% browser zoom.
- Avoid fixed text containers that assume short English copy.
- Use logical CSS properties when directional spacing matters.
