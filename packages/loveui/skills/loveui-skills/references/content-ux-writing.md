# Content and UX Writing

Words are the most critical interface layer. LoveUI relies on crisp, predictable, and plain-language microcopy to guide users without cognitive friction.

## 1. Action-Oriented Button Labels
- **Verb-Led:** Buttons must always start with a strong, unambiguous verb that describes the exact outcome of the click (e.g., "Create Project", "Delete Account", "Save Changes").
- **Avoid Vagueness:** Never use generic labels like "Submit", "Click Here", or "Go" for primary workflows.

## 2. Empty, Error, and Loading States
- **Empty States:** An empty screen is a missed opportunity. Empty state copy must explain what the space is for, why it is currently empty, and provide a clear primary action to populate it.
- **Error Copy:** Never blame the user. Error messages must explicitly state what went wrong in plain language and provide a direct path to resolution. Avoid technical jargon or error codes in the user-facing text.
- **Loading Copy:** For operations taking longer than two seconds, provide context on what the system is doing (e.g., "Analyzing your dataset..." rather than just "Loading...").

## 3. Confirmation and Destructive Language
- **High-Friction Language:** Destructive actions must use explicitly cautious language. The confirmation button must match the severity of the action (e.g., "Yes, Delete Organization").
- **Double Confirmation:** For irreversible, high-impact actions, require the user to manually type the name of the object being deleted to confirm intent.

## 4. Tone Consistency and Plain Language
- **Professional but Human:** The tone should be helpful, direct, and encouraging. Avoid overly robotic phrasing, but do not use forced humor, slang, or emojis in system-level messaging.
- **Reading Level:** Write interface copy at an eighth-grade reading level. Prioritize clarity over cleverness.

## 5. Copy Templates (Default Patterns)
- **Empty state:** `"[Resource] appears here. [One-line benefit]. [Primary action]."`
- **Error state:** `"We couldn't [action]. [Likely reason if known]. [Next step]."`
- **Success toast:** `"[Action] complete."` plus `Undo` for reversible operations.
- **Destructive confirm title:** `"Delete [object]?"`
- **Destructive confirm body:** `"This will [consequence]. This action [is/is not] reversible."`

## 6. UX Writing Definition of Done
- Labels, helper text, and validation messages use consistent terminology.
- Every empty/error/loading/success state includes clear next-step guidance.
- Destructive actions communicate consequence and reversibility explicitly.
- Primary actions use specific verb-led labels, not generic wording.