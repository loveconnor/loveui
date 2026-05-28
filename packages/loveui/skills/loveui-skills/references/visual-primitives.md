# Visual Primitives & Aesthetic Constraints

This document defines the strict visual boundaries for all LoveUI generations. The goal is an ultra-clean, minimalist, and highly professional aesthetic. You must adhere to these foundational design rules before assembling any layout.

## 1. The Zero-Gradient Mandate
Under no circumstances should gradients be applied to backgrounds, typography, borders, or buttons unless explicitly requested by the user. Gradients introduce unnecessary visual noise. Rely entirely on flat, solid colors to establish depth and hierarchy.

## 2. Monochromatic Dominance & Singular Accent
The color system must be strictly disciplined. 
- **Base Palette:** Ninety percent of the interface must utilize a neutral, monochromatic scale (e.g., pure grays, slates, or zincs). 
- **Accent Application:** Select exactly one primary brand color. This color must be reserved exclusively for primary actions, active states, and critical data highlights. Never use the accent color for decorative backgrounds or structural borders.
- **Backgrounds:** Default to a pure white or an ultra-light gray for light mode, and a pure black or ultra-dark gray for dark mode. Avoid mid-tones for main structural backgrounds.

## 3. Topographic Typography
Typography must do the heavy lifting for the interface's structural hierarchy.
- **Font Selection:** Always default to a clean, modern, sans-serif system typeface.
- **Scale and Weight:** Enforce a strict typographic scale. Page titles must be large and bold; section headings should be medium and semibold; body text must be legible and regular weight.
- **Subordinate Text:** Metadata, timestamps, and secondary descriptions must utilize a smaller font size and a muted text color to recede visually. 

## 4. The Spatial Grid 
Whitespace is the primary tool for organizing information.
- **Strict Multiples:** All margins, padding, and positional values must adhere to a strict base-8 (or base-4 for micro-spacing) mathematical scale. 
- **Breathing Room:** Never crowd elements. Elements that belong to the same logical group should be closer together, while distinct sections must be separated by generous, mathematically consistent whitespace.

## 5. Depth and Containment
Avoid heavy drop shadows and thick borders. 
- **Separation:** Use ultra-subtle, one-pixel borders in a very light gray to separate panels and sections.
- **Elevation:** If shadows are necessary to indicate a floating element (like a dropdown menu or modal), use the softest, most diffused, and smallest shadow available. The interface should feel flat and crisp, not raised and heavy.

## 6. Implementation Defaults (Use Unless User Overrides)
- **Spacing Scale:** `4, 8, 12, 16, 24, 32, 40, 48, 64`.
- **Radius Scale:** `6` (inputs/buttons), `10` (cards), `14` (modals/drawers), avoid mixing many radii.
- **Border Color:** one neutral border token for most surfaces, one stronger border token for focus/active grouping.
- **Shadow Policy:** no persistent heavy shadows; one subtle shadow token for floating layers only.
- **Accent Budget:** one accent hue, with at most two intensity steps for hover/active states.

## 7. Definition of Done (Visual)
- No gradients unless explicitly requested.
- Accent color appears only on primary actions, active states, and critical highlights.
- Typography hierarchy is clear at a glance (title, section, body, metadata).
- Spacing values snap to the defined scale and are consistent between similar sections.
- Borders/shadows are subtle, sparse, and purposeful.