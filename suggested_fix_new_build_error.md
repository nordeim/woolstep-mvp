**Research Plan & Findings**

### Step 1 – Confirm the Root Cause
- **Search Query**: `TypeScript 6.0 baseUrl deprecated alternative`
- **Key Finding**: The official TypeScript 5.x→6.0 migration guide confirms that `baseUrl` is deprecated in 6.0 and will be removed in 7.0. It was historically required before TS 4.1 but is now unnecessary. The fix is to delete `baseUrl` and prepend the old `baseUrl` value directly into each `paths` entry.

### Step 2 – Research the Migration Process
- **Search Query**: `TypeScript baseUrl deprecation fix paths without baseUrl`
- **Key Finding**: The migration consists of **removing `"baseUrl": "."`** and changing all `"paths"` entries from bare folder names (e.g., `"src/*"`) to relative paths (`"./src/*"`). This is documented in multiple community sources.
- **Verification**: The same pattern appears on Stack Overflow (Option 'baseUrl' is deprecated ...), GitHub issues, and dev.to articles.

### Step 3 – Evaluate the Automated Tool
- **Search Query**: `andrewbranch/ts5to6 fix baseUrl`
- **Key Finding**: The `@andrewbranch/ts5to6` CLI can automatically remove `baseUrl` and rewrite `paths` entries. Running `npx @andrewbranch/ts5to6 --fixBaseUrl .` is a zero‑touch alternative.

### Step 4 – Investigate Vite‑Specific Solutions
- **Search Query**: `Vite 8 resolve tsconfigPaths built-in support`
- **Key Finding**: Vite 8 has a native `resolve.tsconfigPaths` option (disabled by default) that reads aliases directly from `tsconfig.json`. However, the project currently uses explicit `resolve.alias`, so switching to the native option is optional.

### Step 5 – Finalise the Migration Approach
- **Selected approach**: 
  1. **Remove** `"baseUrl": "."` from `tsconfig.json`.
  2. **Prefix** every `"paths"` mapping with `"./"`.
  3. Retain the existing `resolve.alias` in `vite.config.ts` (since it already matches the corrected `paths`).

---

## Optimal Fix (Manual Migration)

### Changes to `tsconfig.json`
```diff
-    "baseUrl": ".",
     "paths": {
-      "@/*": ["src/*"],
-      "@components/*": ["src/components/*"],
-      "@hooks/*": ["src/hooks/*"],
-      "@lib/*": ["src/lib/*"],
-      "@routes/*": ["src/routes/*"],
-      "@stores/*": ["src/stores/*"],
-      "@types/*": ["src/types/*"]
+      "@/*": ["./src/*"],
+      "@components/*": ["./src/components/*"],
+      "@hooks/*": ["./src/hooks/*"],
+      "@lib/*": ["./src/lib/*"],
+      "@routes/*": ["./src/routes/*"],
+      "@stores/*": ["./src/stores/*"],
+      "@types/*": ["./src/types/*"]
     }
```

### Changes to `vite.config.ts` and `vitest.config.ts`
No changes are required. The existing `resolve.alias` section already maps each `@...` prefix correctly, and it will continue to work with the updated `tsconfig.json`. Both TypeScript’s type resolution (through `paths`) and Vite’s bundler resolution (through `alias`) will use the same paths.

---

## Verification
1. **Test type‑checking**: `npx tsc --noEmit`  
2. **Test development server**: `npx vite --clearScreen=false`  
3. **Test production build**: `npm run build`  
4. Confirm that all imports using `@/*`, `@components/*`, etc., still resolve correctly.

There will be no remaining TS5101 error, and the project will be compatible with TypeScript 7.0.

---

Fix Applied: TypeScript baseUrl Deprecation
The build error TS5101: Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0 has been resolved.
What Was Done
Per suggested_fix_new_build_error.md, I applied the manual migration:
1. Removed "baseUrl": "." from tsconfig.json
2. Prefixed all paths values with "./" to make them relative (e.g., "src/*" → "./src/*")
Verification
Command	Status
npx tsc --noEmit	✅ Pass (no errors)
npm run build	✅ Pass (707ms, all chunks output)
npx vitest run	✅ Pass (9/9 tests passing)
Remaining Warnings
The dev server warnings about esbuild and optimizeDeps.rollupOptions are harmless deprecation notices from Vite 8's migration to Rolldown/OXC. They do not affect functionality and will be resolved when the project upgrades to the newer Vite 8 plugin suite (@vitejs/plugin-react-oxc).

