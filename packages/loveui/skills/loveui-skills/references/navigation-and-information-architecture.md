# Navigation and Information Architecture

Users should never feel lost. Navigation must act as a reliable map, heavily favoring explicit wayfinding over hidden menus.

## 1. Navigation Depth and Hierarchy
- **The Three-Click Rule:** A user should be able to reach any core functional area of the application within three interactions. 
- **Flat Over Deep:** Avoid deep nesting. If an architecture requires four levels of folders or menus, the top-level categorization must be re-evaluated and flattened.

## 2. Wayfinding and Context
- **Active States:** The current location must always be explicitly highlighted in the primary and secondary navigation menus using bold typography, distinct background colors, or structural indicators.
- **Breadcrumbs:** Utilize breadcrumbs for any view that is two or more levels deep. Breadcrumbs provide immediate context and an easy escape hatch to higher-level directories.

## 3. URL as the Source of Truth
- **State in the URL:** Any significant UI state change—such as opening a specific tab, applying a data filter, or opening a detail drawer—must be reflected in the URL parameters. 
- **Shareability:** A user should be able to copy the URL at any exact moment, send it to a colleague, and have the interface load in the exact same state, including active filters and open views.

## 4. Mobile Navigation Grace
- **Bottom vs. Top:** On mobile, place primary navigation items in a highly accessible bottom bar. Reserve "hamburger" menus strictly for secondary settings, billing, and account management, never for core daily workflows.

## 5. IA and Navigation Guardrails
- **Single Primary Nav Model:** Use one primary navigation pattern per app area; avoid mixing unrelated paradigms in the same workspace.
- **Stable Labels:** Keep navigation labels consistent across screens and releases unless a migration is intentional and documented.
- **Back Behavior:** Browser back/forward should restore prior view state (filters, selected tab, pagination) when feasible.
- **Escalation Path:** Deep detail views should always offer an obvious route back to the parent context.

## 6. Navigation Definition of Done
- Users can reach any core area quickly without hidden detours.
- Active context is visible in nav and page-level heading hierarchy.
- URL reflects meaningful state for sharing and restoring context.
- Mobile navigation keeps core actions in thumb-reachable zones.