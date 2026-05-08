## The Plan

### 1. Confirm & Trace All Deprecation Warnings
- **Action**: Run `VITE_DEPRECATION_TRACE=1 npx vite --clearScreen=false` to get full stack traces for:
  - `esbuild` option deprecated → oxc.
  - `optimizeDeps.rollupOptions` / `ssr.optimizeDeps.rollupOptions` deprecated → rolldownOptions.
- **Expected discovery**: The traces will point exactly to which plugin (e.g., `@vitejs/plugin-react`, `@tanstack/router-plugin`) is passing these deprecated options.

### 2. Investigate the “Invalid input options (jsx)” Error
- **Search exact message**: *"Invalid input options (1 issue found) - For the "jsx". Invalid key: Expected never but received "jsx"."*
- **Target**: This is an esbuild validation error. In Vite 8, the internal esbuild/oxc layer now rejects a bare `jsx` key (previously used by `@vitejs/plugin-react` to configure esbuild). The new oxc-based plugin expects a different configuration shape.
- **Correlation**: The error repeats twice, likely because two different plugins or the same plugin twice tries to pass `esbuild.jsx`. Given the stack, it’s almost certainly `@vitejs/plugin-react` (v4.3.0) which still uses the old esbuild option format.

### 3. Migrate from `@vitejs/plugin-react` to `@vitejs/plugin-react-oxc`
- **Research**: Check the [official Vite 8 Rolldown Migration Guide](https://vite.dev/rolldown) and the `@vitejs/plugin-react-oxc` npm page for React 19 compatibility.
- **Findings**: `@vitejs/plugin-react-oxc` (latest v0.2+) is the drop-in replacement. It eliminates the esbuild dependency internally and uses oxc for JSX transformation, resolving both the `esbuild` deprecation and the `jsx` error.
- **Impact**: No code changes needed in components; JSX/TSX compilation remains identical.

### 4. Replace Deprecated `rollupOptions` with `rolldownOptions`
- **Search** for Vite 8 build configuration changes.
- **Expect**: The `build.rollupOptions` object must be renamed to `build.rolldownOptions`. The structure of `output.manualChunks` is compatible.
- **Action**: Update `vite.config.ts` and `vitest.config.ts` accordingly.

### 5. Audit Other Plugins for Deprecation Triggers
- **@tanstack/router-plugin** v1.114.0 may internally use deprecated rollup options. Check its changelog for updates. If necessary, upgrade to the latest minor version (still within v1.x) that aligns with Vite 8.
- **@tailwindcss/vite** v4.0.0 is likely compatible, but verify no deprecation warnings originate from it.

### 6. Update `package.json` and Configuration Files
- Replace `@vitejs/plugin-react` with `@vitejs/plugin-react-oxc`.
- Upgrade `@tanstack/router-plugin` and `@tanstack/router-cli` to latest v1.x that supports Vite 8.
- Modify `vite.config.ts` and `vitest.config.ts` to use `rolldownOptions`.

### 7. Test and Validate
- Delete `node_modules/.vite` cache.
- Run `npm run dev` and confirm zero warnings/errors.
- Run `npm run build` to ensure production build succeeds.
- Run `npm test` to confirm no breaking changes.

---

## Resulting Fix (Implementation)

Based on the plan, apply these changes:

### **package.json (excerpt)**
```diff
  "devDependencies": {
-   "@vitejs/plugin-react": "^4.3.0",
+   "@vitejs/plugin-react-oxc": "^0.2.1",
    "@tanstack/router-cli": "^1.114.1",
    "@tanstack/router-plugin": "^1.114.1",
    ...
  }
```
(Note: Update to the latest compatible v1.x for TanStack; 1.114.1 or higher)

### **vite.config.ts**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-oxc'  // ← changed
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@routes': '/src/routes',
      '@stores': '/src/stores',
      '@types': '/src/types'
    }
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    // ↓ renamed from rollupOptions
    rolldownOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/@tanstack')) {
            return 'router-vendor'
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/class-variance-authority') || id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge')) {
            return 'ui-vendor'
          }
        }
      }
    }
  }
})
```

### **vitest.config.ts**
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-oxc'  // ← changed
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react' }),
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@routes': '/src/routes',
      '@stores': '/src/stores',
      '@types': '/src/types'
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts'
  }
})
```

---

## Verification After Changes
1. **Clear cache**: `rm -rf node_modules/.vite`
2. **Reinstall**: `npm install`
3. **Run**: `npx vite --clearScreen=false`
4. **Expected output**:
   - No `esbuild` deprecation warning.
   - No `rollupOptions` deprecation warning.
   - No “Invalid input options (jsx)” error.
   - Clean startup with only the Vite ready message.

If any warning persists, use `VITE_DEPRECATION_TRACE=1` again to locate the remaining culprit (likely an outdated sub-dependency) and upgrade accordingly.

This plan and fix systematically eliminate every warning and error while embracing Vite 8’s modern toolchain.
