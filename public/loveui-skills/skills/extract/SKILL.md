---
name: extract
description: Turn repeated UI patterns into reusable components, variants, tokens, or design-system rules.
args:
  - name: target
    description: The pattern or area to extract (optional)
    required: false
user-invokable: true
---

Use this skill when repeated UI is becoming inconsistent or hard to maintain.

## Load

- `references/structure-architecture.md`
- `references/design-system.md`

## Extraction Rules

- Extract only repeated patterns with stable behavior.
- Preserve existing public APIs unless the user asked for a breaking cleanup.
- Prefer semantic variants over visual one-offs.
- Keep data fetching and side effects out of presentational primitives.
- Move shared tokens before shared components when inconsistency is token-level.
- Document examples through existing local patterns, not new documentation systems.

## Output

Name what was extracted, what was intentionally left local, and how callers should use the new primitive.
