# Frontend Architecture Philosophy

The boundary between interface rendering and data logic must be impenetrable. A clean architecture ensures the UI remains fast, scalable, and easy to debug.

## 1. State and Data Boundaries
- **Local vs. Global:** Default to keeping state strictly local to the component that needs it. Only elevate state to a global context if it is required by multiple, disconnected regions of the application (like user authentication status or global theme settings).
- **Derived State:** Never store data in the state if it can be mathematically derived or filtered from existing data on the fly.

## 2. Server vs. Client Logic Separation
- **Dumb Components:** Visual interface components must be entirely unaware of how data is fetched or mutated. They should simply receive data, render it beautifully, and emit events when the user interacts.
- **Smart Wrappers:** All data fetching, caching, and server mutation logic must be abstracted into dedicated container modules or custom hooks that wrap the visual components.

## 3. API Conventions and Side Effects
- **Predictable Mutations:** Side effects (like submitting data to a server) must be highly localized and traceable. 
- **Optimistic UI:** When a user takes a highly predictable action (like starring an item), update the visual interface instantly to assume success, while handling the actual server request silently in the background. If the request fails, cleanly revert the interface and show an error.

## 4. Folder Structure Logic
- **Feature-Centric:** Organize the architecture by feature domain (e.g., "Authentication", "Billing", "Projects") rather than by file type (e.g., putting all global components in one massive folder). This ensures that deleting a feature completely removes its associated logic and interface elements.

## 5. Data and Side-Effect Boundaries
- **One Mutation Path:** Each write action should have one clear pathway (action/hook/service), not duplicated request logic across components.
- **Fetch Ownership:** Data fetching responsibility should be explicit per route/feature to prevent duplicate requests and race conditions.
- **Error Normalization:** Normalize server errors into predictable shapes before they reach presentation components.
- **Caching Rules:** Define stale/refresh behavior intentionally for each high-traffic surface.

## 6. Architecture Definition of Done
- Local, shared, and global state boundaries are justified and documented by usage.
- Presentational components remain data-source agnostic.
- Side effects are traceable and concentrated in predictable modules.
- Feature folders encapsulate UI, state, and behavior coherently.