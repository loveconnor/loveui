# Screenshot Translation Protocol

When provided with a static screenshot, mockup, or reference image, the goal is not to blindly duplicate pixels. The goal is to deconstruct the image's intent and reconstruct it using LoveUI's strict architectural and visual constraints. A static image is an incomplete blueprint; you must infer the missing systemic rules.

## 1. Visual Deconstruction and The Grid
Before analyzing any specific element, deconstruct the macro-layout of the provided image into a strict mathematical grid.
- **Identify the Skeleton:** Map the image into core structural landmarks (e.g., Sidebars, Navigation Rails, Primary Canvas, Context Panels). Do not proceed until the overarching grid or flexbox architecture is conceptually defined.
- **Normalize to the 8pt System:** Reference images often contain arbitrary or messy spacing. You must aggressively normalize all observed margins, paddings, and gaps into strict multiples of 4px or 8px. If a screenshot shows a 17px gap, correct it to 16px. 
- **Alignment Enforcement:** Identify the primary alignment axes in the image. If elements in the screenshot are slightly misaligned, assume it is a human error in the mockup and enforce mathematically perfect horizontal and vertical alignment in the reconstruction.

## 2. Token Extraction and System Mapping
Do not sample exact hex codes or font sizes from the image if they violate LoveUI core principles. Translate the image's aesthetic into your predefined system tokens.
- **Color Translation:** Strip away any gradients or excessive color usage found in the screenshot. Map the dominant background and surface colors to the closest LoveUI monochromatic tokens (Slate, Zinc, etc.). Identify the single primary action color in the screenshot and map it to the LoveUI accent token. 
- **Typography Standardization:** Ignore the specific font family in the screenshot. Map the visual hierarchy (massive headers, readable body text, muted metadata) strictly to the established LoveUI typographic scale. Enforce readability over stylistic quirks.
- **Containment Rules:** If the screenshot utilizes heavy drop shadows or thick borders for containment, downgrade them. Translate these boundaries into LoveUI's ultra-subtle 1px borders or the softest available elevation tokens.

## 3. Component Identification and Modularization
Never build a single, monolithic interface just because the screenshot looks like one flat image.
- **Pattern Recognition:** Scan the screenshot for repeating visual patterns (e.g., a list of similar items, a row of metric cards). Extract these into conceptual, reusable sub-components rather than repeating the structural logic.
- **Semantic Mapping:** Identify visual elements and assign them their correct semantic intent. If a visual block looks like a button but acts as a navigation link, structure it semantically as an anchor, regardless of its visual presentation.

## 4. Inferring the Invisible (State and Interaction)
A screenshot only represents a single moment in time (usually the "happy path"). You are strictly required to invent and implement the missing interactive dimensions.
- **Mandatory Micro-Interactions:** Even if not pictured, you must define and apply logical `hover`, `focus`, and `disabled` states for every interactive element identified in the image.
- **Edge Case Extrapolation:** The screenshot likely shows perfect data. You must design how the UI behaves when the data is imperfect. Define the text-truncation rules for long strings, the wrapping behavior for flex layouts, and the empty states if the visible data were to be removed.

## 5. Viewport Adaptation
A screenshot represents exactly one screen width. You must immediately define how this layout expands and contracts.
- **Degradation Strategy:** Determine the mobile behavior for the desktop screenshot. Decide which columns will stack, which sidebars will become off-canvas drawers, and which secondary elements will be hidden behind progressive disclosure menus on smaller screens.

## 6. Translation Workflow (Execution Order)
1. **Classify source:** identify whether input is dashboard, marketing, workspace, settings, docs, or agent workspace.
2. **Select blueprint:** map to `references/page-blueprints.md` and note any deviations.
3. **Token-map visuals:** translate typography, spacing, color, radius, border, and elevation into LoveUI tokens.
4. **Extract components:** list reusable blocks before coding repeated patterns.
5. **Define states:** add hover/focus/disabled + loading/empty/error/success behavior.
6. **Adapt responsively:** define desktop/tablet/mobile layout transitions.
7. **Validate gates:** run `references/quality-gates.md` and accessibility checks before final output.

## 7. Output Requirements for Screenshot Tasks
When implementing from screenshots, always report:
- **What was preserved:** hierarchy, information zoning, and key interaction model.
- **What was normalized:** spacing alignment, token choices, contrast, and semantics.
- **What was invented:** missing states, edge-case behavior, and mobile adaptations.
- **Risk notes:** areas where screenshot ambiguity required assumptions.

## 8. Definition of Done (Screenshot Translation)
- Layout is mathematically aligned and normalized to 4/8 spacing increments.
- Visual style conforms to LoveUI primitives rather than raw pixel copying.
- Repeated patterns are componentized with reusable APIs.
- Interaction states and non-happy-path states are explicitly implemented.
- Result is responsive and passes quality + accessibility gates.