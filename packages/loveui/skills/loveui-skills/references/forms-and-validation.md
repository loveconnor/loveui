# Forms and Validation Architecture

Forms are the primary engine of data collection. Their design must minimize anxiety and maximize completion rates through logical flow and intelligent feedback.

## 1. Cognitive Grouping
- **Chunking:** Break long forms into logical, thematic sections using clear headings or multi-step wizards. A user should never face a wall of inputs.
- **Single Column Layouts:** Default to single-column forms. Users read forms top-to-bottom; multi-column layouts disrupt the visual scanning path and increase cognitive load.

## 2. Required vs. Optional Conventions
- **Assume Required:** In modern SaaS, most form fields should be required. Instead of marking every field with a red asterisk, explicitly mark the rare optional fields with an "(optional)" text label next to the field name.

## 3. Inline Validation Timing
- **Reward Early, Punish Late:** Never show an error while the user is actively typing in a field for the first time. 
- **On Blur:** Validate a field and display errors only after the user has finished typing and moved away from the input (on blur).
- **Error Recovery:** Once an error is displayed, switch to aggressive validation. Clear the error immediately as the user types the correct input (on change) to provide instant positive reinforcement.

## 4. Asynchronous Validation
- **Immediate Feedback:** For fields that require server-side checks (like username availability or complex data formatting), display a subtle, inline loading indicator within the input field to communicate that the system is checking.

## 5. Submission and Error Summary
- **Preserve Input:** Never clear user-entered values after validation failures.
- **First Error Focus:** On submit failure, move focus to the first invalid field and keep inline errors visible.
- **Error Summary:** For long forms, show a top-level summary linking to invalid fields.
- **Pending State:** Disable duplicate submit attempts while request is in flight and show explicit progress text.

## 6. Form Definition of Done
- Required vs optional fields are unambiguous.
- Inline validation timing follows on-blur first, then on-change recovery.
- Async validation has visible pending, success, and failure states.
- Failed submits preserve values and provide clear correction path.