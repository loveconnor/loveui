# Component API and Naming Conventions

UI components are the internal building blocks of the product. Their APIs must be predictable, tightly scoped, and self-documenting to prevent architectural rot.

## 1. Prop Naming Conventions
- **Event Handlers:** All callback properties must start with `on` followed by an explicit verb-noun pairing describing the event trigger (e.g., `onConfirm`, `onDrawerClose`).
- **State Declarations:** Boolean properties that describe the component's state must be phrased as questions or assertions (e.g., `isLoading`, `hasError`, `isExpanded`).

## 2. The Anti-Pattern of Boolean Explosion
- **Variants Over Booleans:** Never use multiple overlapping boolean properties to dictate a component's appearance. Instead of having separate flags for `isPrimary`, `isDestructive`, and `isGhost`, use a single, explicit `variant` property that accepts specific string values. 

## 3. Composition Over Configuration
- **The "Mega Prop" Ban:** A component should never accept a massive data object that dictates its entire internal layout. 
- **Slot Architecture:** Build complex components using modular slots or child compositions. A complex layout should be built by nesting modular sub-components (like Header, Body, and Footer structural elements) rather than passing all data through one monolithic property.

## 4. File and Concept Naming
- **Domain-Driven:** File and component names must describe *what* the component represents within the business logic, not *how* it looks. 
- **Case Consistency:** Enforce strict naming conventions. Use PascalCase for structural component files and kebab-case for utility or conceptual files.

## 5. API Surface Discipline
- **Minimal Public API:** Expose only props needed by real callers; remove speculative options.
- **Stable Defaults:** Prefer sensible defaults so call sites stay short and consistent.
- **Controlled vs Uncontrolled:** If a component can be controlled, define `value` + `onChange` clearly and document fallback behavior.
- **No Leaky Abstractions:** Avoid exposing internal implementation details (DOM shape, internal state flags) through public props.

## 6. Component Definition of Done
- Prop names are explicit and consistent with project conventions.
- Variant model replaces overlapping visual booleans.
- Composition patterns are preferred over mega-config props.
- Component API remains small, predictable, and documented by usage.