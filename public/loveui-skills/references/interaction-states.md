# Interaction States Reference

Use this reference for forms, feedback, motion, and state completeness.

## Interaction Model

- Define the core user actions before building controls.
- Show 3-5 primary actions by default; move secondary or risky work behind menus, drawers, command palettes, or advanced sections.
- Prefer controls that match the input: switches for booleans, segmented controls for modes, sliders/steppers for bounded numbers, menus for option sets, tabs for peer views.
- Every interactive element needs default, hover, focus, active, disabled, loading, error, and success behavior where applicable.

## Forms

- Put labels close to inputs and keep helper text specific.
- Validate on submit by default; validate on blur or input only when it prevents expensive or invalid work.
- Preserve user input after errors.
- Put inline errors near the field and a summary at the top for long forms.
- Disable or debounce duplicate submits and show what is happening.

## Loading, Empty, Error, Success

- Initial loading should reserve layout space with skeletons or stable placeholders.
- Use spinners only for short, localized actions where shape is unknown.
- Empty states should name what is missing and offer the next useful action.
- Error states should explain what failed, what the user can do, and whether retry is available.
- Success states should confirm the result and offer undo for reversible changes.

## Motion

- Use motion to clarify state change, spatial relationship, or completion.
- Keep most transitions between 120ms and 240ms; larger page transitions can be longer when purposeful.
- Animate transform and opacity. Avoid animating layout properties.
- Avoid bounce or elastic easing for product UI.
- Respect `prefers-reduced-motion`.

## Agent Workflows

- Agent or automation flows must show Plan -> Preview -> Apply.
- High-risk actions require confirmation and preview.
- Provide history/restore for high-impact changes and undo in success feedback for reversible work.
- Explain suggestions with a short "Why this?" affordance and provenance labels.
