# Interaction & UX Heuristics

A beautiful interface is useless if it feels static or overwhelming. This document dictates the behavioral expectations and user experience rules for all LoveUI elements.

## 1. Mandatory Micro-Interactions
Every interactive element on the screen must provide immediate visual feedback to the user.
- **Hover States:** Any clickable element must visibly react when a cursor passes over it, typically through a subtle background color shift or a slight change in opacity.
- **Focus Rings:** Accessibility is non-negotiable. All inputs and buttons must display a crisp, highly visible focus ring when navigated via keyboard. 
- **Disabled States:** Elements that are currently inactive must be visually muted (lowered opacity) and visually communicate that they cannot be interacted with.

## 2. Progressive Disclosure
Interfaces must respect the user's cognitive load. Do not present every possible action or piece of data at once.
- **Primary vs. Secondary:** A screen or panel should have exactly one clear primary action. 
- **Hiding Complexity:** If a surface requires more than four or five actions, the secondary and tertiary actions must be nested behind a context menu, an "Advanced" toggle, or a "More options" dropdown. Keep the default view pristine.

## 3. Predictable Alignment
The human eye scans for patterns. Breakages in alignment create subconscious friction.
- **Text and Data:** Default to left-alignment for almost all text, forms, and data tables. Numbers in tables should be right-aligned for easy comparison.
- **Centering:** Reserve center-alignment strictly for standalone elements like marketing hero headers or empty-state messaging. Do not center-align paragraphs of text or form fields.
- **Structural Integrity:** Ensure that the edges of containers, typography bounding boxes, and image assets align perfectly on a vertical axis down the page.

## 4. State Management Visibility
The user must never guess what the system is doing.
- **Transitional States:** Define clear visual states for when data is loading (e.g., subtle pulsing skeletons instead of disruptive spinners).
- **Empty States:** When a data table or list is empty, never leave a blank screen. Always provide a beautifully formatted empty state that explains what belongs there and offers a primary action to populate it.

## 5. Feedback Timing & Motion Restraint
Motion should communicate cause-and-effect, never decorate.
- **Timing:** Keep most transitions between 120-220ms; avoid slow, dramatic easing for core actions.
- **Consistency:** Reuse the same interaction timing/easing tokens across buttons, menus, drawers, and toasts.
- **Reduced Motion:** Respect reduced-motion preferences by minimizing or disabling non-essential movement.

## 6. Action Safety & Recovery
Users need confidence when actions can change real state.
- **Risk Signaling:** Label risky actions with clear severity and consequence language before execution.
- **Confirmation:** Require confirm + preview for destructive or high-impact changes.
- **Recovery:** Success feedback should include Undo when the action is reversible.
- **Error Recovery:** Error states must present at least one clear next action (retry, edit input, or open details).

## 7. Definition of Done (Interaction)
- Every interactive element has visible hover, focus, and disabled states.
- Primary action is obvious in each major screen/panel.
- Loading, empty, error, and success states are implemented for key workflows.
- Keyboard navigation and focus order are coherent for primary flows.
- Complex action sets are progressively disclosed rather than front-loaded.