# Motion and System Feedback

Animation in LoveUI is strictly functional. It exists to explain state changes, establish spatial relationships, and focus attention—never for mere decoration.

## 1. The Timing and Easing System
- **Speed Constraints:** Interface animations should be virtually imperceptible, serving only to smooth transitions. Default to ultra-fast durations for micro-interactions and slightly longer durations for structural page shifts.
- **Easing Curves:** Never use linear animations. Use snappy, decelerating easing curves for elements entering the screen (starting fast, ending slow) and accelerating curves for elements exiting.

## 2. Purpose-Driven Animation
- **When to Animate:** Animate to show an object's origin (like a modal expanding from a button), to highlight a change in status, or to smooth the transition between layout changes.
- **When to Remain Static:** Do not animate standard data rendering, typography loads, or static structural borders. 

## 3. Skeletons vs. Spinners
- **Skeletons for Known Layouts:** If the structural layout of the incoming data is known (like a list of cards or a table), use pulsing skeleton loaders to establish the spatial expectation before the data arrives.
- **Spinners for Unknowns:** Reserve circular loading spinners strictly for localized, unpredictable actions (like a button processing a payment) or full-page blank-slate loads.

## 4. Toasts and Banners
- **Transient Toasts:** Use small, auto-dismissing toast notifications strictly for low-priority, successful system confirmations (e.g., "Link copied to clipboard"). 
- **Persistent Banners:** Use full-width, non-dismissible (or manually dismissible) banners for high-priority, contextual warnings that affect the user's current workflow (e.g., "Your trial expires in 2 days").

## 5. Timing Defaults
- **Micro interactions:** 120-180ms.
- **Panel open/close:** 180-240ms.
- **Page/route transitions:** 200-300ms, only when they improve orientation.
- **Staggering:** Avoid multi-element staggers unless the sequence communicates order or priority.

## 6. Motion Definition of Done
- Motion explains state or spatial change; no decorative animation loops.
- Reduced-motion preference is respected for non-essential transitions.
- Feedback primitive selection is intentional (skeleton vs spinner, toast vs banner).
- Success, warning, and error feedback are visually and semantically distinct.