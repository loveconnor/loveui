# Structure Architecture Reference

Use this reference for layout structure, navigation, component boundaries, and frontend architecture.

## Semantic Structure

- Use real landmarks: `header`, `nav`, `main`, `section`, `aside`, `footer`.
- Use buttons for actions and links for navigation.
- Keep heading order logical and visible structure consistent with document structure.
- Avoid div-only interactive controls.

## Responsive Structure

- Design mobile, tablet, and desktop together.
- Use stable dimensions for boards, grids, toolbars, tiles, counters, and fixed-format UI.
- Prefer container queries and content-aware layouts where components move between contexts.
- Do not hide critical functionality on mobile; adapt it.
- Prevent overflow with `min-width: 0`, wrapping, truncation, and explicit aspect ratios.

## Navigation

- Make the user's location obvious with page titles, active nav state, breadcrumbs, or scoped headers.
- Use URL state for shareable filters, tabs, selected records, and search where useful.
- Keep global navigation stable; place contextual actions near the thing they affect.
- Prefer predictable navigation over novelty for operational tools.

## Component APIs

- Extract repeated structure only after the pattern is real.
- Keep props semantic and variant-driven: `tone`, `size`, `density`, `state`, `selected`, `disabled`.
- Avoid boolean prop piles and one-off className tunnels as the main API.
- Compose from smaller primitives when variants start encoding layout and data concerns.

## State Boundaries

- Keep server data, local UI state, form state, and derived state separate.
- Put side effects near data boundaries, not inside presentational components.
- Make optimistic updates reversible when failure is plausible.
- Avoid broad global state for local interaction.
