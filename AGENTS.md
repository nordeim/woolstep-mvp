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
