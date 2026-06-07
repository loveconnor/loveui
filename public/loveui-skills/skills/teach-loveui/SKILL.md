---
name: teach-loveui
description: Learn a project's LoveUI design conventions and summarize reusable guidance for future agent sessions.
args:
  - name: area
    description: The app area to study (optional)
    required: false
user-invokable: true
---

Use this skill to create project-specific guidance before larger design work.

## Load

- `references/design-system.md`
- `references/structure-architecture.md`

## Study

- Inspect representative pages, shared components, token files, layout wrappers, and examples.
- Identify typography, spacing, color roles, radius, shadows, density, navigation patterns, and component APIs.
- Note what should be preserved, what is inconsistent, and what should not be repeated.
- Keep guidance concrete: file paths, component names, token names, and before/after examples.

## Output

Produce a concise project design brief:

- Visual language.
- Layout and navigation patterns.
- Component conventions.
- Accessibility and interaction expectations.
- Open inconsistencies or risks.
