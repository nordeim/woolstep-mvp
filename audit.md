## Root Cause Analysis

### Issue 1: Typo in `CartOverly` Component (Confirmed - CRITICAL)
- **Root Cause**: An obvious spelling error where `CartOverlay` was misspelled as `CartOverly` in both the filename and the exported component name, and then that misspelled name was imported and used in `src/routes/__root.tsx`.
- **Impact**: The code compiles because the import name matches the export name, but it introduces a consistent naming inconsistency that will confuse maintainers and agents.
- **Fix**: Rename the file, component, and all imports to `CartOverlay`.

### Issue 2: `aria-expanded` Bypasses Zustand Reactivity (Confirmed - CRITICAL)
- **Root Cause**: In `src/components/layout/Navbar.tsx`, `aria-expanded` accesses Zustand state directly via `useCartStore.getState().isOpen` inside JSX. This is a state anti-pattern that bypasses React's subscription mechanism.
- **Impact**: `getState()` does not trigger a re-render if the state changes, meaning the `aria-expanded` attribute will become stale and incorrect.
- **Fix**: Subscribe to the `isOpen` state using `useCartStore((state) => state.isOpen)` at the top level of the component.

### Issue 3: Flaky Timeout Test in `toastStore.test.ts` (Confirmed - IMPORTANT)
- **Root Cause**: The test `should auto-remove toast after timeout` is a stubbed test that does not actually test the core logic. The comment explicitly states it is avoided because it is "tricky," but a functional test is required for quality assurance.
- **Impact**: The auto-removal functionality is completely untested. Any change to `toastStore.ts` that breaks the `setTimeout` logic (e.g., the `3000` ms duration, the `filter` logic, or the store's `remove` action) will not be caught by CI.
- **Fix**: Implement the test using Vitest's fake timers (`vi.useFakeTimers()`) to assert that the toast is automatically removed after the specified duration.

### Issue 4: Footer Newsletter Input is Non-functional (Confirmed - IMPORTANT)
- **Root Cause**: In `src/components/layout/Footer.tsx`, the newsletter input is a raw `<input>` tag with no `<form>`, no `onSubmit` handler, and no connection to the `NewsletterSection.tsx` store logic.
- **Impact**: Dead code that creates a false user expectation.
- **Fix**: Convert the UI to a functional `<form>` that calls the newsletter `formAction` from `NewsletterSection.tsx`, or remove it if it is a visual non-interactive element.

### Issue 5: `reveal` CSS Class is Undefined (Confirmed - IMPORTANT)
- **Root Cause**: Classes like `reveal` and `reveal-stagger` are used in `BrandStorySection.tsx` and `TrustBar.tsx`, but no corresponding CSS animations or keyframes are defined in `globals.css`.
- **Impact**: No runtime errors, but the promised animations are missing, leading to a static visual experience and violating the `super-frontend-design` animation standards.
- **Fix**: Define `@keyframes` and utility classes for `reveal` and `reveal-stagger` in `globals.css`.
