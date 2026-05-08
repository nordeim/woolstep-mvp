Important: File is read fresh for every conversation. Be brief and practical.

# WOOLSTEP MVP
Premium wool sneaker e-commerce for Singapore's tropical climate. Functional prototype demonstrating modern React 19, TypeScript 5.9, and Vite 8.

## 🛠 Tech Stack
React 19, TypeScript 5.9 (`erasableSyntaxOnly`), Vite 8, Tailwind CSS v4, TanStack Router 1.114, Zustand 5, Vitest 3.
Design: "Wool & Fog" palette, anti-generic aesthetics, shadcn/ui primitives.

## ⚡ Commands
- `npm install --legacy-peer-deps` (Required for Vite 8 peer conflicts)
- `npm run dev` (Port 5173) | `npm run build` (tsc + vite) | `npm run preview`
- `npm test` (Watch) | `npx vitest run` (CI) | `npx vitest --ui`
- `npx tsc --noEmit` (Type check)
- `npx tsr generate` (MANDATORY after any route change)

## 📐 Architecture & Structure
```
src/
├── main.tsx              # Entry (wrap in ErrorBoundary)
├── globals.css           # Tailwind v4 @theme inline tokens
├── components/
│   ├── ui/               # shadcn primitives (Button, Card, Input, Badge)
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, TrustBar, ProductGrid, Newsletter
│   └── cart/             # CartPanel, CartItem, FavoriteButton, CartOverlay, CartDrawer
│   └── CartIcon.tsx       # Bespoke SVG cart icon (18x18, ds
d)cn replacement)
├── stores/               # Zustand (.ts), persist middleware for cart
├── routes/               # TanStack file-based routing
│   ├── __root.tsx        # Root layout + CartOverlay integration
│   ├── index.tsx         # Home (/)
│   ├── about.tsx         # About (/about)
│   ├── cart.tsx          # Cart (/cart)
│   ├── products.index.tsx# Products (/products)
│   └── products/$id.tsx  # Detail (/products/:id)
├── types/                # TS definitions
├── lib/                  # Utilities (cn helper)
└── test/                 # Vitest (jsdom, setup.ts)
```

## 📝 Implementation Standards
### TypeScript (Strict + ErasableSyntaxOnly)
- No `enum`, `namespace`, or parameter properties. Use union types.
- No `any`. Use `unknown` or proper typing. Prefer `interface` for objects, `type` for unions.
- Explicit return types on public functions. Use `import type` for type-only imports.
- Remove `baseUrl` from `tsconfig.json` (deprecated). Use relative paths in `paths`.

### React 19
- `useActionState` for form submissions. Handle loading/error/empty/success states.
- `useOptimistic` for instant UI feedback (cart/favorites).
- Disable buttons during async operations. Show loading state ONLY when no data exists.
- No class components. No `useEffect` for state synchronization.

### Tailwind CSS v4 (CSS-First)
- No `tailwind.config.js`. All tokens in `src/globals.css` via `@theme inline`.
- OKLCH colors preferred. Mobile-first (`sm:`, `md:`, `lg:`).
- No arbitrary values (e.g., `bg-[#FAF8F5]`). Extend `@theme` instead.
- Custom `@keyframes` inside `@theme inline`. Complex classes in `@layer utilities`.

### Zustand State Management
- Flat stores in `src/stores/` (`.ts` extension). Persist middleware for cart.
- ✅ Correct JSX subscription: `const isCartOpen = useCartStore(s => s.isOpen)`
- ❌ Never use `useCartStore.getState()` in JSX (stale, no re-renders).

### Code Quality & Routing
- Early returns, composition over inheritance, self-documenting code.
- Use `cn()` helper (`clsx` + `tailwind-merge`) for conditional classes.
- TanStack Router: Use `createFileRoute`. Navigation: `<Link to="/products/$id" params={{ id: product.id }}>`
- Git: Conventional commits (`feat:`, `fix:`, `chore:`). Atomic commits explaining "why".

## 🚫 Anti-Patterns & Rules
- **Naming:** Match `export`, `file`, and `import` names exactly. (e.g., `CartOverlay`, not `CartOverly`)
- **Zustand:** Never call `getState()` inside JSX.
- **Tailwind:** Never use arbitrary values or external config files.
- **TypeScript:** No `enum`, `namespace`, `any`, or `baseUrl`.
- **React:** No legacy patterns. Use React 19 hooks. Wrap root in `ErrorBoundary`.
- **Routing:** Always run `npx tsr generate` after adding/changing route files.
- **UI:** Customize shadcn/ui primitives via Tailwind. Don't build from scratch.
- **CartOverlay:** Must be integrated into `__root.tsx` with proper z-index layering (`--z-overlay`, `--z-cart`).

## 🧪 Testing & QA
- **Framework:** Vitest 3 + `@testing-library/react` (jsdom).
- **Standards:** Behavior-driven. Test user actions, not implementation. Use factory pattern for mock data.
- **Async/Time:** Use `vi.useFakeTimers()` for time-dependent logic (e.g., toast 3s auto-remove). No placeholder `expect(true).toBe(true)`.
- **Coverage:** `cartStore`, `toastStore`, `favoritesStore`, `cartDrawer` (15 tests total).

## 🐛 Troubleshooting & Debt
### Tailwind Negative Value Syntax (CRITICAL)
```css
/* ❌ WRONG: Double-hyphen is invalid Tailwind v4 */
className="absolute bottom--24 left--24 ..."

/* ✅ CORRECT: Single hyphen prefix for negative values */
className="absolute -bottom-24 -left-24 ..."
```
Note: Tailwind v4 does NOT parse `bottom--24` as a negative value. This silently fails — the element gets no positioning. Always use `-bottom-24`.

### `inert` React Prop is BOOLEAN (TS2322)
```tsx
/* ❌ WRONG: `inert` expects boolean | undefined, NOT string */
<aside inert={isOpen ? undefined : 'true'} />  // TS2322 error

/* ✅ CORRECT: Boolean expression or omitted */
<aside inert={!isOpen} />
```
This applies to both `inert` and `contentEditable` — they are boolean-valued React props.

### TanStack Router `Link` in Unit Tests
```tsx
/* ❌ WRONG: Tests for components using <Link> crash without router context */
render(<CartDrawer />)  // throws "useRouter must be used inside <RouterProvider>"

/* ✅ CORRECT: Mock the router in test setup */
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  )
}))
```

### React 19 Asynchronous State Updates in Tests
```tsx
/* ❌ WRONG: State updates outside fireEvent require act() */
useCartStore.getState().openCart()

/* ✅ CORRECT: Wrap store mutations in act() so DOM updates are flushed */
await act(async () => {
  useCartStore.getState().openCart()
})
```

- `manualChunks` build error: Vite 8/Rolldown requires function form in `vite.config.ts`.
- Dependency conflicts: Always use `--legacy-peer-deps`.
- TS test errors: Ensure no unused imports (`noUnusedLocals: true`).
- **Technical Debt:** React Compiler Babel plugin disabled (pkg availability), Lighthouse CI pending, E2E tests needed.
- **Next Steps:** Search, auth, checkout flow, reviews, image zoom, backend API, deployment.

## ✅ Success Metrics
- `npm run build` < 1s, `npx vitest run` passes 15 tests, `npx tsc --noEmit` zero errors.
- All routes render correctly. Cart (add/remove/update) & favorites (optimistic) work.
- Newsletter uses `useActionState` with pending states. Responsive layout & mobile nav functional.
- Toast notifications fire on cart actions. TrustBar, Footer (newsletter + payment icons), and CartOverlay integrated.

## 🔮 Future API & Env (Reference)
- Endpoints: `/api/products`, `/api/cart`, `/api/checkout`
- Response: `{ data: T, meta?: { page, total } }` | Error: `{ error: { message, code } }`
- Env Vars: `VITE_API_URL`, `VITE_GA_ID`, `VITE_STRIPE_KEY`
