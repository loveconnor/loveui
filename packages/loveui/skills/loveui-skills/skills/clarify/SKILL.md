---
name: clarify
description: Improve labels, instructions, empty states, onboarding, validation messages, and other UX copy.
args:
  - name: target
    description: The feature or area to clarify (optional)
    required: false
user-invokable: true
---

Use this skill when users may not understand what to do, what happened, or why something matters.

## Load

- `references/content-accessibility.md`
- `references/interaction-states.md`

## Copy Rules

- Use the user's domain vocabulary, not generic product filler.
- Replace vague labels like "Submit", "Continue", or "Manage" when the object/action can be named.
- Keep labels short; put nuance in helper text or progressive disclosure.
- Error messages should explain the problem and recovery path.
- Empty states should teach the next useful action without sounding like marketing.
- Onboarding should reduce first-run uncertainty, not add tours for obvious UI.
- Confirmation copy for destructive actions must name the affected object and consequence.

## Workflow

1. List the user's decision points.
2. Rewrite copy around the next action each decision needs.
3. Remove repeated or decorative explanations.
4. Check keyboard/screen-reader labels where copy changed controls.
