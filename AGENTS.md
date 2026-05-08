Important: File is read fresh for every conversation. Be brief and practical.

- Tech Stack: React 19, TypeScript 5.9, Vite 8, Tailwind CSS v4, TanStack Router 1.114, Zustand 5, Vitest 3

## Convention
Ecommerce MVP for premium wool sneakers (Singapore). File-based routing via TanStack Router. Zustand stores (_not_ React Context). Anti-generic design with strict Tailwind v4 `globals.css` theme.

## Commands
- `npm install --legacy-peer-deps`
- `npm run dev` – Vite dev server (port 5173)
- `npm run build` – TypeScript check + build to `dist/`
- `npm run preview` – Preview production build
- `npm test` – Run Vitest (watch)
- `npx vitest run` – Run Vitest once
- `npx tsc --noEmit` – TypeScript type check
- `npx tsr generate` – Regenerate TanStack Router route tree (always run after adding/changing routes)

## Reference
- Entry: `src/main.tsx`
- Routes: `src/routes/` (file-based: `__root.tsx`, `index.tsx`, `products.index.tsx`, `products/$id.tsx`, etc.)
- Stores: `src/stores/` (Zustand, `.ts` suffix, persist middleware for cart)
- Components: `src/components/`, ui primitives in `src/components/ui/`
- Styles: `src/globals.css` with `@theme inline` Tailwind v4 tokens
- TypeScript config: `tsconfig.json` (`erasableSyntaxOnly`, `noUnusedLocals`, `strict`)
- Vite config: `vite.config.ts`
- Tests: `src/test/`, environment `jsdom`, setup `src/test/setup.ts`

## Anti-Patterns & How to Avoid

### Zustand Reactivity
- **Don't use `useCartStore.getState()` inside JSX.** It does not subscribe to updates.
```typescript
// ❌ WRONG: Stale value, no re-renders
aria-expanded={useCartStore.getState().isOpen}

// ✅ CORRECT: Subscribe to re-renders
const isCartOpen = useCartStore((state) => state.isOpen)
aria-expanded={isCartOpen}
```

### Tailwind v4 CSS-First
- **No `tailwind.config.js`.** All design tokens live in `src/globals.css` via `@theme inline`.
- **No arbitrary values.** Extend `@theme inline` instead of `bg-[#FAF8F5]`.
- **Custom `@keyframes` must be inside `@theme inline`.** E.g., `reveal`, `fade-in-up`.
- **`@layer utilities` for complex CSS classes.** E.g., `.reveal`, `.reveal-stagger`.

### Component Naming
- **Eliminate typos early.** `CartOverly` was renamed to `CartOverlay` during the audit. Always match component name, file name, and import name to prevent confusion.

### Testing Async Logic
- **Stubbed tests must be implemented.** Do not leave `expect(true).toBe(true)` as a placeholder.
- **Use `vi.useFakeTimers()` for time-dependent logic.** E.g., testing `toastStore`'s `setTimeout` auto-removal.

### JSX Element Naming
- **Always match `export` name, `file` name, and `import` name precisely.** Divergence (e.g., `CartOverly` vs `CartOverlay`) causes confusion and violates clean code principles.

## Important Truths
- `npx tsr generate` is **always** required after adding/changing routes. TanStack Router generates `routeTree.gen.ts` from file names.
- `npm install` requires `--legacy-peer-deps` due to Vite 8 peer dependency conflicts.
- `npm run build` runs `tsc && vite build` (type check + bundle).
