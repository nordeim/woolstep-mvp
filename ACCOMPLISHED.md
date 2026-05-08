# ACCOMPLISHED — WOOLSTEP MVP Build Report

**Date**: 2026-05-08
**Version**: 0.1.0 (MVP)
**Maintainer**: WOOLSTEP Team

---

## Latest Code Changes

### New Files Created

| File | Description | Size |
|------|-------------|------|
| `src/components/sections/TrustBar.tsx` | Trust indicators section | 1,839 bytes |
| `src/components/cart/CartOverlay.tsx` | Semi-transparent cart overlay | 497 bytes |
| `CLAUDE.md` | AI agent briefing document | 14,155 bytes |
| `README.md` | Comprehensive project documentation | 16,583 bytes |

### Files Modified/Rewritten

| File | Changes Made | Status |
|------|-------------|--------|
| `src/components/sections/HeroSection.tsx` | Added label, image accent, updated subtitle | MODIFIED |
| `src/components/sections/BrandStorySection.tsx` | Expanded to 4 features + narrative | REWRITTEN |
| `src/components/sections/ProductGrid.tsx` | Added size info to Quick Add button | MODIFIED |
| `src/components/layout/Footer.tsx` | Newsletter signup + payment icons | REWRITTEN |
| `src/routes/__root.tsx` | Integrated CartOverlay component | UPDATED |
| `src/routes/index.tsx` | Added TrustBar to homepage | UPDATED |
| `README.md` | Updated with latest changes | UPDATED |
| `AGENTS.md` | Updated with anti-patterns | UPDATED |

### Audit & Remediation (2026-05-08)

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | `CartOverly` typo | Critical | Renamed to `CartOverlay` |
| 2 | `aria-expanded` anti-pattern | Critical | Replaced `getState()` with selector |
| 3 | Toast test stubbed | Important | Implemented `vi.useFakeTimers()` |
| 4 | Footer newsletter non-functional | Important | Converted to `useActionState` form |
| 5 | Missing `reveal` CSS | Medium | Added `@keyframes reveal` |
| 6 | `baseUrl` deprecated (TS5101) | Medium | Removed `baseUrl`, used relative paths |

---

## Issues Fixed

### TypeScript Errors

| Issue | Solution | Status |
|-------|---------|--------|
| `useCartStore` import path wrong | Fixed import path in `cartStore.ts` | FIXED |
| Unused variables in test files | Removed unused destructured variables | FIXED |
| Missing `Route` import in `__root.tsx` | Added `createRootRoute` import | FIXED |
| `erasableSyntaxOnly` violations | Task files were guides only | N/A |
| **`baseUrl` deprecated in TypeScript 6.0** | Removed `baseUrl`, prepended `./` to paths | FIXED |

### Build Errors

| Issue | Solution | Status |
|-------|---------|--------|
| `manualChunks` object form | Changed to function in `vite.config.ts` | FIXED |
| `@babel/plugin-react-compiler` not found | Removed from `package.json` | FIXED |
| Route generation failures | Ran `npx tsr generate` | FIXED |
| Mermaid syntax errors | Rewrote with proper Mermaid syntax | FIXED |
| **Runtime `jsx` deprecation warning** | Upgraded node packages | FIXED |

### Dependency Conflicts

| Issue | Solution | Status |
|-------|---------|--------|
| Vite 8 + `@vitejs/plugin-react` conflict | Use `--legacy-peer-deps` | FIXED |
| `esbuild` option deprecated | Vite 8 uses Rolldown, harmless | ACCEPTABLE |

---

## Gotchas to Look Out For

### 1. Vite 8 + Rolldown Specifics

```
GOTCHA: manualChunks must be a FUNCTION, not an object
WRONG (Vite 6 style):
  manualChunks: { 'react-vendor': ['react', 'react-dom'] }

CORRECT (Vite 8 style):
  manualChunks: (id: string) => {
    if (id.includes('react')) return 'react-vendor'
  }
```

### 2. TanStack Router File Naming

```
GOTCHA: File names determine route paths
$id.tsx creates /products/:id route
products.index.tsx creates /products route

Always run after route changes:
  npx tsr generate
```

### 3. TypeScript `erasableSyntaxOnly`

```typescript
// GOTCHA: No enums allowed
// WRONG:
enum ProductType { Men = 'men' }

// CORRECT:
type ProductCategory = 'men' | 'women'
```

### 4. Tailwind v4 CSS-First

```css
/* GOTCHA: No tailwind.config.js in v4! */
/* All tokens go in src/globals.css via @theme inline */

/* WRONG: */
/* tailwind.config.js exists */

/* CORRECT: */
@theme inline {
  --color-custom: #123456;
}
```

### 5. React 19 `useActionState` Form Handling

```tsx
// GOTCHA: formAction receives (prevState, formData)
const [state, formAction, isPending] = useActionState(
  async (prevState, formData: FormData) => {
    return { message: '...', type: 'success' }
  },
  initialState
)

// Form must use action prop (not onSubmit)
<form action={formAction}>
```

### 6. Vitest + TanStack Router

```
GOTCHA: Vitest needs path aliases configured
Add to vitest.config.ts:

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      // ...
    }
  }
})
```

---

## Troubleshooting Tips

### Build Failures

```bash
# Issue: "Cannot find module '@tanstack/react-router'"
Solution:
  npm install --legacy-peer-deps
  npx tsr generate  # Regenerate route tree

# Issue: "manualChunks is not a function"
Solution: Check vite.config.ts uses function form

# Issue: "TypeScript errors in build"
Solution:
  npx tsc --noEmit  # Check all errors

# Issue: "Option 'baseUrl' is deprecated" (TS5101)
Solution:
  1. Remove "baseUrl": "." from tsconfig.json
  2. Prepend "./" to all paths values
```

### Runtime Issues

```bash
# Issue: Cart not updating / toast not appearing
Solution: Check Zustand store is properly imported
  grep -r "useCartStore" src/components/

# Issue: Routes showing 404
Solution: Check route file naming
  ls -la src/routes/
  npx tsr generate  # Regenerate

# Issue: "Invalid input options - For the 'jsx'"
Solution: Upgrade node packages
  npm install --legacy-peer-deps
```

### Test Failures

```bash
# Issue: "Cannot find module '@testing-library/react'"
Solution:
  npm install --save-dev @testing-library/react @testing-library/jest-dom

# Issue: Tests failing with module resolution
Solution: Add path aliases to vitest.config.ts
```

---

## Build & Test Status

### Verification (2026-05-08)

```bash
PASS npm run build
     Status: PASS (692ms, 1684 modules transformed)

PASS npx vitest run
     Status: PASS (9/9 tests passing)
     cartStore.test.ts: 3 tests
     toastStore.test.ts: 3 tests (auto-removal tested)
     favoritesStore.test.ts: 3 tests

PASS npx tsc --noEmit
     Status: PASS (no TypeScript errors)

PASS npm run build
     Status: PASS (production build succeeds)
```

---

## Anti-Patterns Found & Resolved

### ANTI-PATTERN 1: getState() inside JSX

```tsx
// WRONG (stale, non-reactive)
aria-expanded={useCartStore.getState().isOpen}

// FIXED (reactive, re-renders correctly)
const isCartOpen = useCartStore((state) => state.isOpen)
aria-expanded={isCartOpen}
```

### ANTI-PATTERN 2: Stubbed test

```typescript
// WRONG (does not test behavior)
it('should auto-remove toast after timeout', () => {
  expect(true).toBe(true)
})

// FIXED (proper time-based test)
it('should auto-remove toast after timeout', () => {
  vi.useFakeTimers()
  addToast('Auto remove toast', 'info')
  expect(useToastStore.getState().toasts).toHaveLength(1)
  vi.advanceTimersByTime(3100)
  expect(useToastStore.getState().toasts).toHaveLength(0)
  vi.useRealTimers()
})
```

### ANTI-PATTERN 3: Non-functional input

```tsx
// WRONG (user expectation mismatch)
<input type="email" placeholder="your@email.com" />

// FIXED (functional form with useActionState)
<form action={formAction}>
  <Input type="email" name="email" required disabled={isPending} />
  <Button type="submit" disabled={isPending}>
    {isPending ? 'Subscribing...' : 'Subscribe'}
  </Button>
  {state.type !== 'idle' && <p role="alert">{state.message}</p>}
</form>
```

### ANTI-PATTERN 4: Undefined CSS classes

```css
/* WRONG (referenced but undefined) */
<div className="reveal"> /* No definition in globals.css */

/* FIXED (define @keyframes + utility) */
@theme inline {
  --animate-reveal: reveal 800ms ease-out forwards;
  @keyframes reveal {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
@layer utilities {
  .reveal { opacity: 0; animation: var(--animate-reveal); }
  .reveal-stagger > * { opacity: 0; animation: var(--animate-reveal); }
}
```

### ANTI-PATTERN 5: Deprecated baseUrl

```json
/* WRONG (deprecated in TypeScript 6.0) */
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}

/* FIXED (remove baseUrl, use relative paths) */
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## Acknowledgments

- **Design Inspiration**: WOOLSTEP (Singapore-based wool sneaker brand)
- **Typography**: Playfair Display & DM Sans (Google Fonts)
- **Icons**: Lucide React (0.460.0)
- **Images**: Unsplash (merino wool sneaker photography)

---

**Project Status**: ✅ MVP Complete — Ready for Enhancement!
