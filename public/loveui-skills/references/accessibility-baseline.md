# Accessibility Baseline (WCAG-Focused)

Accessibility is not an enhancement; it is a foundational requirement for all LoveUI components. Every interface must be universally usable by default.

## 1. Contrast and Visual Legibility
- **Text Contrast:** All normal-sized text must strictly meet WCAG AA standards (minimum 4.5:1 contrast ratio against its background). Large text (18pt and above) must meet a 3:1 ratio.
- **Non-Text Contrast:** Essential UI components, such as input borders, icons, and focus rings, must maintain a 3:1 contrast ratio against adjacent colors to ensure they are perceivable.

## 2. Keyboard Navigation & Focus Order
- **Focus Indicators:** Every interactive element must have a highly visible focus ring. Never remove the default outline unless replacing it with a more prominent, brand-aligned focus state.
- **Logical Flow:** Focus must travel predictably from top-to-bottom, left-to-right. The DOM order must match the visual order.
- **No Traps:** A user must be able to navigate into and out of any component (like a modal or complex widget) using only the `Tab` and `Shift+Tab` keys.

## 3. ARIA Rules of Engagement
- **First Rule of ARIA:** No ARIA is better than bad ARIA. Always use native semantic HTML elements (`nav`, `button`, `dialog`) before reaching for ARIA roles.
- **State Management:** Use `aria-expanded`, `aria-pressed`, and `aria-invalid` to programmatically communicate the live state of interactive components to screen readers.
- **Hidden Elements:** Ensure decorative icons or redundant visual elements are hidden from screen readers to reduce auditory clutter. 

## 4. Screen Reader Context
- **Actionable Labels:** Icon-only buttons (like a trash can or a magnifying glass) must have explicit, visually hidden text labels explaining their exact function.
- **Contextual Announcements:** Dynamic page changes, such as a successful form submission or a new error appearing, must be announced to assistive technologies via live regions.

## 5. Reduced Motion & Touch Targets
- **Motion Preferences:** All decorative animations and continuous motion must be disabled if the user's operating system requests reduced motion.
- **Touch Targets:** Any interactive element on a touch device must have a minimum interactive area of 44x44 pixels, even if the visual element (like a small icon) is smaller.

## 6. Accessibility Verification Checklist
- **Keyboard Pass:** Navigate core flows with keyboard only (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`) and verify no blocked step.
- **Screen Reader Labels:** Validate that icon-only controls, form inputs, and landmark regions have meaningful announced names.
- **Focus Visibility:** Confirm focus ring remains visible on all interactive controls in both light and dark themes.
- **Contrast Spot Checks:** Validate primary text, muted text, and controls against their backgrounds.
- **Dynamic Announcements:** Verify success/error/status updates are announced when content changes asynchronously.