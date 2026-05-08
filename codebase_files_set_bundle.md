# index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/woolstep-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="WOOLSTEP — Premium wool sneakers for the urban Singapore lifestyle. Natural merino wool comfort meets tropical functionality." />
    <title>WOOLSTEP — Natural Comfort. Urban Function.</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

# package.json
```json
{
  "name": "woolstep-mvp",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "route:generate": "tsr generate"
  },
  "dependencies": {
    "@tanstack/react-router": "^1.169.2",
    "@tanstack/router-devtools": "^1.166.13",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.14.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "tailwind-merge": "^3.5.0",
    "zustand": "^5.0.13"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.2.4",
    "@tanstack/router-cli": "^1.166.43",
    "@tanstack/router-plugin": "^1.167.35",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "jsdom": "^29.1.1",
    "tailwindcss": "^4.2.4",
    "typescript": "^6.0.3",
    "vite": "^8.0.11",
    "vitest": "^4.1.5"
  }
}

```

# tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@lib/*": ["./src/lib/*"],
      "@routes/*": ["./src/routes/*"],
      "@stores/*": ["./src/stores/*"],
      "@types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

# tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}

```

# vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
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
    rollupOptions: {
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

# vitest.config.ts
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
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

# src/routeTree.gen.ts
```ts
/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as CartRouteImport } from './routes/cart'
import { Route as AboutRouteImport } from './routes/about'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ProductsIndexRouteImport } from './routes/products.index'
import { Route as ProductsIdRouteImport } from './routes/products/$id'

const CartRoute = CartRouteImport.update({
  id: '/cart',
  path: '/cart',
  getParentRoute: () => rootRouteImport,
} as any)
const AboutRoute = AboutRouteImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const ProductsIndexRoute = ProductsIndexRouteImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRouteImport,
} as any)
const ProductsIdRoute = ProductsIdRouteImport.update({
  id: '/products/$id',
  path: '/products/$id',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/cart': typeof CartRoute
  '/products/$id': typeof ProductsIdRoute
  '/products/': typeof ProductsIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/cart': typeof CartRoute
  '/products/$id': typeof ProductsIdRoute
  '/products': typeof ProductsIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/cart': typeof CartRoute
  '/products/$id': typeof ProductsIdRoute
  '/products/': typeof ProductsIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/cart' | '/products/$id' | '/products/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/cart' | '/products/$id' | '/products'
  id: '__root__' | '/' | '/about' | '/cart' | '/products/$id' | '/products/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  CartRoute: typeof CartRoute
  ProductsIdRoute: typeof ProductsIdRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/cart': {
      id: '/cart'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products/'
      preLoaderRoute: typeof ProductsIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/products/$id': {
      id: '/products/$id'
      path: '/products/$id'
      fullPath: '/products/$id'
      preLoaderRoute: typeof ProductsIdRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  CartRoute: CartRoute,
  ProductsIdRoute: ProductsIdRoute,
  ProductsIndexRoute: ProductsIndexRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

```

# src/vite-env.d.ts
```ts
/// <reference types="vite/client" />

```

# src/main.tsx
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ErrorBoundary } from './components/ErrorBoundary'
import './globals.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
)

```

# src/components/CartIcon.tsx
```tsx
export function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={18}
      height={18}
      className={className}
      aria-hidden="true"
    >
      {/* Arch handle */}
      <path d="M9 4a3 3 0 0 1 6 0" />
      {/* Bag body */}
      <path d="M3 8h18l-1.5 12H4.5L3 8z" />
    </svg>
  )
}

```

# src/components/layout/Footer.tsx
```tsx
import { useActionState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ArrowRight } from 'lucide-react'

export function Footer() {
  const initialState: { message: string; type: 'idle' | 'success' | 'error' } = {
    message: '',
    type: 'idle'
  }

  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const email = formData.get('email') as string

      if (!email || !email.includes('@')) {
        return { message: 'Please enter a valid email address.', type: 'error' as const }
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      return { message: 'Thanks for subscribing! Check your inbox soon.', type: 'success' as const }
    },
    initialState
  )

  return (
    <footer className="bg-[var(--color-warm-charcoal)] text-[var(--color-foggy-gray)] py-16 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="max-w-[300px]">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-warm-white)] mb-4">
              WOOLSTEP
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-stone)] mb-6">
              Premium wool sneakers for the urban Singapore lifestyle. Natural comfort meets tropical functionality.
            </p>
            {/* Newsletter Signup */}
            <form action={formAction} className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                disabled={isPending}
                className="flex-1 bg-[rgba(250,248,245,0.1)] border-[rgba(250,248,245,0.2)] text-[var(--color-warm-white)] placeholder:text-[var(--color-stone)] text-sm min-h-[48px]"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[var(--color-terracotta)] text-[var(--color-warm-charcoal)] hover:bg-[var(--color-foggy-gray)] px-4 text-sm font-semibold min-h-[48px]"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            {state.type !== 'idle' && (
              <p
                className={`mt-2 text-xs ${
                  state.type === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
                }`}
                role="alert"
              >
                {state.message}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[var(--color-warm-white)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[var(--color-warm-white)] transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--color-warm-white)] transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <p className="text-sm text-[var(--color-stone)] mb-6">
              Singapore<br />
              hello@woolstep.sg
            </p>
          </div>

          {/* Payment Icons */}
          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4 text-sm uppercase tracking-wider">
              Secure Payment
            </h4>
            <div className="flex gap-3 items-center flex-wrap">
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                VISA
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                MC
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                PayPal
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                Apple Pay
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                Google Pay
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(250,248,245,0.1)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-[var(--color-stone)]">
            &copy; 2026 WOOLSTEP. All rights reserved.
          </p>
          <p className="text-[var(--color-stone)] text-xs">
            Built with ❤️ using React 19 + TypeScript 5.9 + Vite 8
          </p>
        </div>
      </div>
    </footer>
  )
}

```

# src/components/layout/Navbar.tsx
```tsx
import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { CartIcon } from '@components/CartIcon'
import { useCartStore } from '@stores/cartStore'
import { cn } from '@lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, getCount } = useCartStore()
  const count = getCount()
  const isCartOpen = useCartStore((state) => state.isOpen)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Collection' },
    { to: '/about', label: 'Our Story' }
  ]

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
          scrolled
            ? 'bg-[var(--color-warm-white)]/95 backdrop-blur-md shadow-sm h-16'
            : 'bg-transparent h-[72px]'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom flex items-center justify-between h-full">
          <Link to="/" className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-warm-charcoal)]">
            WOOLSTEP
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-warm-charcoal)] transition-colors relative group"
                  activeProps={{ className: 'text-[var(--color-warm-charcoal)]' }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-warm-charcoal)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-[var(--color-text-primary)] hover:scale-105 transition-transform"
              aria-label="Shopping cart"
              aria-expanded={isCartOpen}
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)] text-xs font-bold rounded-full flex items-center justify-center animate-[badge-pulse_300ms_ease-out]">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-[var(--color-text-primary)]"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-[200] bg-[var(--color-warm-white)] flex flex-col p-8 transition-transform duration-300 md:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-between items-center mb-16">
          <span className="font-[family-name:var(--font-display)] text-2xl font-medium">WOOLSTEP</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-text-primary)] hover:text-[var(--color-terracotta)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

```

# src/components/cart/CartItem.tsx
```tsx
import { useCartStore } from '@stores/cartStore'
import { Trash2 } from 'lucide-react'

export function CartItem({ item }: { item: { id: string; name: string; price: number; image: string; quantity: number } }) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex gap-6 p-6 bg-[var(--color-warm-white)] rounded-lg shadow-sm">
      <div className="w-24 h-24 rounded-md overflow-hidden bg-[var(--color-oat)] flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-xl mb-1">
            {item.name}
          </h3>
          <p className="text-[var(--color-text-muted)] text-sm">
            S${item.price} each
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="w-8 h-8 rounded-full border border-[var(--color-foggy-gray)] flex items-center justify-center hover:bg-[var(--color-oat)] transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="w-8 h-8 rounded-full border border-[var(--color-foggy-gray)] flex items-center justify-center hover:bg-[var(--color-oat)] transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <span className="font-semibold text-lg">S${item.price * item.quantity}</span>
        <button
          onClick={() => removeItem(item.id)}
          className="text-[var(--color-error)] hover:opacity-70 transition-opacity"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

```

# src/components/cart/CartDrawer.tsx
```tsx
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useCartStore } from '@stores/cartStore'
import { cn } from '@lib/utils'
import { Button } from '@components/ui/button'
import { X } from 'lucide-react'
import { CartItem } from './CartItem'

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const getTotal = useCartStore((s) => s.getTotal)
  const getCount = useCartStore((s) => s.getCount)

  const total = getTotal()
  const count = getCount()

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, closeCart])

  /* Prevent body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isEmpty = count === 0

  return (
    <aside
      role="dialog"
      aria-label="Shopping cart"
      aria-modal="true"
      className={cn(
        'fixed inset-y-0 right-0 w-full max-w-md bg-[var(--color-warm-white)] z-[var(--z-cart)]',
        'shadow-xl flex flex-col transition-transform duration-300 ease-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      inert={!isOpen}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--color-foggy-gray)]/20">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">Your Cart</h2>
        <button
          onClick={closeCart}
          aria-label="Close cart"
          className="p-2 -mr-2 text-[var(--color-text-secondary)] hover:text-[var(--color-warm-charcoal)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {isEmpty ? (
          <div className="text-center py-16">
            <p className="text-xl text-[var(--color-text-muted)] mb-6">
              Your cart is empty
            </p>
            <Link to="/products" onClick={closeCart}>
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isEmpty && (
        <div className="p-6 border-t border-[var(--color-foggy-gray)]/20 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg text-[var(--color-text-secondary)]">
              Total ({count} items)
            </span>
            <span className="text-2xl font-[family-name:var(--font-display)]">
              S${total}
            </span>
          </div>
          <Button size="lg" className="w-full">
            Checkout
          </Button>
          <Button size="lg" variant="ghost" className="w-full" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      )}
    </aside>
  )
}

```

# src/components/cart/CartPanel.tsx
```tsx
import { Link } from '@tanstack/react-router'
import { useCartStore } from '@stores/cartStore'
import { Button } from '@components/ui/button'
import { CartItem } from './CartItem'

export function CartPanel() {
  const { items, getTotal, getCount, clearCart } = useCartStore()
  const total = getTotal()
  const count = getCount()

  if (count === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-[var(--color-text-muted)] mb-6">
          Your cart is empty
        </p>
        <Link to="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t border-[var(--color-foggy-gray)] pt-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg text-[var(--color-text-secondary)]">
            Total ({count} items)
          </span>
          <span className="text-3xl font-[family-name:var(--font-display)]">
            S${total}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1">
            Checkout
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Link to="/products" className="flex-1">
            <Button size="lg" variant="ghost" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

```

# src/components/cart/CartOverlay.tsx
```tsx
import { cn } from '@lib/utils'
import { useCartStore } from '@stores/cartStore'

export function CartOverlay() {
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)

  return (
    <div
      className={cn(
        'fixed inset-0 bg-[rgba(44,40,36,0.4)] z-[var(--z-overlay)] transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={closeCart}
      aria-hidden="true"
      inert={!isOpen}
    />
  )
}

```

# src/components/ui/card.tsx
```tsx
import * as React from 'react'
import { cn } from '@lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-[var(--color-oat)] bg-[var(--color-warm-white)] text-[var(--color-text-primary)] shadow-sm transition-all duration-300',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[var(--color-text-secondary)]', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

```

# src/components/ui/badge.tsx
```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)]',
        secondary: 'bg-[var(--color-oat)] text-[var(--color-warm-charcoal)]',
        new: 'bg-[var(--color-terracotta)] text-[var(--color-warm-white)]',
        sale: 'bg-[var(--color-error)] text-[var(--color-warm-white)]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

# src/components/ui/button.tsx
```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)] hover:bg-[#2a2620]',
        secondary: 'border border-[var(--color-foggy-gray)] bg-transparent text-[var(--color-warm-charcoal)] hover:bg-[var(--color-oat)]',
        ghost: 'hover:bg-[var(--color-oat)] text-[var(--color-text-secondary)] hover:text-[var(--color-warm-charcoal)]',
        outline: 'border border-[var(--color-foggy-gray)] bg-transparent'
      },
      size: {
        default: 'h-12 px-6 py-2',
        sm: 'h-10 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }

```

# src/components/ui/input.tsx
```tsx
import * as React from 'react'
import { cn } from '@lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-md border border-[var(--color-foggy-gray)] bg-[var(--color-warm-white)] px-4 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta)] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }

```

# src/components/sections/TrustBar.tsx
```tsx
import { Truck, Shield, Recycle } from 'lucide-react'
import { cn } from '@lib/utils'

export function TrustBar() {
  const trustItems = [
    {
      icon: <Truck className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Free Shipping',
      subtitle: 'On orders over S$100'
    },
    {
      icon: <Shield className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: '30-Day Returns',
      subtitle: 'Hassle-free, no questions'
    },
    {
      icon: <Recycle className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Carbon Neutral',
      subtitle: 'Certified B Corp pending'
    },
    {
      icon: <Shield className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Secure Payment',
      subtitle: '256-bit SSL encryption'
    }
  ]

  return (
    <section className="py-6 md:py-8 bg-[var(--color-warm-white)] border-y border-[var(--color-oat)]" aria-label="Trust indicators">
      <div className="container-custom">
        <div className="flex justify-around items-center flex-wrap gap-4 md:gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className={cn("flex items-center gap-3", "reveal")} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="w-10 h-10 bg-[var(--color-oat)] rounded-md flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-[family-name:var(--font-body)] font-semibold text-sm text-[var(--color-text-primary)]">
                  {item.title}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```

# src/components/sections/NewsletterSection.tsx
```tsx
import { useActionState } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'

export function NewsletterSection() {
  const initialState: { message: string; type: 'idle' | 'success' | 'error' } = {
    message: '',
    type: 'idle'
  }

  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const email = formData.get('email') as string

      if (!email || !email.includes('@')) {
        return { message: 'Please enter a valid email address.', type: 'error' as const }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate success (in real app, would call API)
      return { message: 'Thanks for subscribing! Check your inbox soon.', type: 'success' as const }
    },
    initialState
  )

  return (
    <section className="py-16 md:py-24 bg-[var(--color-oat)]/30">
      <div className="container-custom max-w-2xl mx-auto text-center">
        <span className="section-label block mb-4">Stay Connected</span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
          Get First Access
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Be the first to know about new drops, exclusive events, and Singapore-specific releases.
        </p>

        <form action={formAction} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="flex-1"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {state.type !== 'idle' && (
          <p
            className={`mt-4 text-sm ${
              state.type === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
            }`}
            role="alert"
          >
            {state.message}
          </p>
        )}
      </div>
    </section>
  )
}

```

# src/components/sections/HeroSection.tsx
```tsx
import { Link } from '@tanstack/react-router'
import { Button } from '@components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-warm-white)]">
      {/* Background Image with Accent */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=900&fit=crop&q=80"
          alt="Wool sneakers"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-warm-white)]/50 to-[var(--color-warm-white)]" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-foggy-gray)] rounded-lg opacity-30 -z-10" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center animate-[fade-in-up_800ms_ease-out_forwards]">
        <span className="section-label block mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[var(--color-terracotta)]" />
          Singapore's First Wool Sneaker Brand
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 max-w-4xl mx-auto">
          Natural<br />Comfort.<br />Urban Function.
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Crafted from premium New Zealand merino wool, engineered for Singapore's tropical climate. Breathable, temperature-regulating, and impossibly soft — from the Central Business District to East Coast Park.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" className="group">
              Shop Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="secondary">
              Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

```

# src/components/sections/ProductGrid.tsx
```tsx
import { Link } from '@tanstack/react-router'
import { useProductStore } from '@stores/productStore'
import { useCartStore } from '@stores/cartStore'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { FavoriteButton } from '@components/FavoriteButton'
import { cn } from '@lib/utils'

export function ProductGrid() {
  const { getFilteredProducts, filter, setFilter } = useProductStore()
  const { addItem } = useCartStore()
  const products = getFilteredProducts()

  const filters: { label: string; value: 'all' | 'men' | 'women' | 'runners' | 'loungers' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Runners', value: 'runners' },
    { label: 'Loungers', value: 'loungers' }
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="section-label block mb-4">Curated Collection</span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-6">
            Step Into Comfort
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200',
                filter === f.value
                  ? 'bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)]'
                  : 'bg-[var(--color-oat)] text-[var(--color-text-secondary)] hover:bg-[var(--color-foggy-gray)]'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[var(--color-warm-white)] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <Link to="/products/$id" params={{ id: product.id }} className="block relative aspect-[4/5] overflow-hidden bg-[var(--color-oat)]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <Badge
                    variant={product.badge === 'new' ? 'new' : 'sale'}
                    className="absolute top-4 left-4"
                  >
                    {product.badge}
                  </Badge>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to="/products/$id"
                        params={{ id: product.id }}
                        className="font-[family-name:var(--font-display)] text-xl hover:text-[var(--color-terracotta)] transition-colors"
                      >
                        {product.name}
                      </Link>
                      <FavoriteButton productId={product.id} />
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] capitalize">
                      {product.category.join(', ')}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="font-semibold text-lg">S${product.price}</span>
                    {product.originalPrice && (
                      <span className="block text-sm text-[var(--color-text-muted)] line-through">
                        S${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category[0]
                    })
                  }
                >
                  Quick Add — Size 9
                </Button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-12">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  )
}

```

# src/components/sections/BrandStorySection.tsx
```tsx
import { Link } from '@tanstack/react-router'
import { Button } from '@components/ui/button'
import { Flame, Droplets, ShieldCheck, WashingMachine } from 'lucide-react'

export function BrandStorySection() {
  const features = [
    {
      icon: <Flame className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Temperature Regulating',
      description: 'Cool in 32°C heat, warm in air-con'
    },
    {
      icon: <Droplets className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Moisture Wicking',
      description: 'Absorbs 30% of its weight in vapor'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Naturally Antibacterial',
      description: 'Odor-resistant without chemicals'
    },
    {
      icon: <WashingMachine className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Machine Washable',
      description: 'Cold wash, air dry — good as new'
    }
  ]

  return (
    <section className="py-24 bg-[var(--color-warm-white)]">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <img
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop&q=80"
              alt="Close-up of natural merino wool fibers"
              className="w-full aspect-[3/4] object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="reveal">
            <span className="section-label block mb-4">Why Wool in the Tropics?</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-6">
              Born in Singapore.<br />Crafted for the City.
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              We asked a simple question: why are the most comfortable shoes made from synthetic materials?
              In Singapore's relentless heat and humidity, your feet deserve better than plastic.
            </p>
            <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              Our merino wool comes from ethically farmed sheep in New Zealand's Southern Alps — where
              temperature swings from -10°C to 30°C made nature engineer the perfect breathable fiber.
              We paired it with sugarcane-based SweetFoam™ soles and recycled bottle laces to create
              the lightest, most breathable sneaker you'll wear in the tropics.
            </p>

            <div className="grid grid-cols-2 gap-4 reveal-stagger">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--color-oat)] rounded-md flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-body)] font-semibold text-base mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Read Our Full Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

```

# src/components/ErrorBoundary.tsx
```tsx
import * as React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback
      if (Fallback) {
        return <Fallback error={this.state.error} />
      }
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-warm-white)]">
          <div className="text-center p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl mb-4">
              Something went wrong
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              {this.state.error.message}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)] rounded-md hover:bg-[#2a2620] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

```

# src/components/ToastContainer.tsx
```tsx
import { useToastStore } from '@stores/toastStore'

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-[var(--z-toast)] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg animate-[fade-in-up_300ms_ease-out] ${
            toast.type === 'success' ? 'bg-[var(--color-success)] text-white' :
            toast.type === 'error' ? 'bg-[var(--color-error)] text-white' :
            'bg-[var(--color-warm-charcoal)] text-white'
          }`}
          role="alert"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

```

# src/components/FavoriteButton.tsx
```tsx
import { useOptimistic } from 'react'
import { useFavoritesStore } from '@stores/favoritesStore'

export function FavoriteButton({ productId }: { productId: string }) {
  const favorites = useFavoritesStore(state => state.favorites)
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)

  const [optimisticFavorited, addOptimisticFavorite] = useOptimistic(
    favorites.has(productId),
    (state, _value) => !state
  )

  const handleClick = async () => {
    addOptimisticFavorite(null)
    await toggleFavorite(productId)
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 hover:scale-110 transition-transform"
      aria-label={optimisticFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {optimisticFavorited ? '❤️' : '🤍'}
    </button>
  )
}

```

# src/stores/cartStore.ts
```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types'
import { useToastStore } from './toastStore'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const { items } = get()
        const existing = items.find((i) => i.id === item.id)

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
        useToastStore.getState().addToast(`${item.name} added to cart`, 'success')
      },

      removeItem: (id) => {
        const item = get().items.find((i) => i.id === id)
        set({ items: get().items.filter((i) => i.id !== id) })
        if (item) {
          useToastStore.getState().addToast(`${item.name} removed from cart`, 'error')
        }
      },

      updateQuantity: (id, delta) => {
        const { items } = get()
        const item = items.find((i) => i.id === id)
        if (!item) return

        const newQuantity = item.quantity + delta
        if (newQuantity <= 0) {
          set({ items: items.filter((i) => i.id !== id) })
        } else {
          set({
            items: items.map((i) =>
              i.id === id ? { ...i, quantity: newQuantity } : i
            )
          })
        }
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      }
    }),
    {
      name: 'woolstep-cart',
      partialize: (state) => ({ items: state.items })
    }
  )
)

```

# src/stores/toastStore.ts
```ts
import { create } from 'zustand'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastState {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }))
    // Auto-remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
    }, 3000)
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
  }
}))

```

# src/stores/productStore.ts
```ts
import { create } from 'zustand'
import type { Product, FilterCategory } from '../types'

interface ProductState {
  products: Product[]
  filter: FilterCategory
  setFilter: (filter: FilterCategory) => void
  getFilteredProducts: () => Product[]
}

const productsData: Product[] = [
  {
    id: 'wool-runner-mens',
    name: 'Wool Runner',
    price: 189,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&q=80',
    category: ['men', 'runners'],
    badge: 'new',
    description: 'Our signature everyday runner. Premium merino wool upper with SweetFoam™ sole.'
  },
  {
    id: 'wool-lounger-womens',
    name: 'Wool Lounger',
    price: 169,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=500&fit=crop&q=80',
    category: ['women', 'loungers'],
    description: 'Slip-on simplicity. The easiest way to step into natural comfort.'
  },
  {
    id: 'tree-runner-mens',
    name: 'Tree Runner',
    price: 199,
    originalPrice: 235,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=500&fit=crop&q=80',
    category: ['men', 'runners'],
    badge: 'sale',
    description: 'Eucalyptus fiber upper. Even more breathable for Singapore humidity.'
  },
  {
    id: 'wool-dasher-womens',
    name: 'Wool Dasher',
    price: 219,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=500&fit=crop&q=80',
    category: ['women', 'runners'],
    description: 'Performance runner with extra cushioning. From CBD to MacRitchie.'
  },
  {
    id: 'wool-pipers-mens',
    name: 'Wool Pipers',
    price: 179,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=500&fit=crop&q=80',
    category: ['men', 'loungers'],
    description: 'High-top comfort. Extra ankle support with the same wool breathability.'
  },
  {
    id: 'tree-breezers-womens',
    name: 'Tree Breezers',
    price: 159,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop&q=80',
    category: ['women', 'loungers'],
    badge: 'new',
    description: 'Ballet flat elegance meets eucalyptus fiber comfort. Office to dinner.'
  }
]

export const useProductStore = create<ProductState>((set, get) => ({
  products: productsData,
  filter: 'all',
  setFilter: (filter) => set({ filter }),
  getFilteredProducts: () => {
    const { products, filter } = get()
    if (filter === 'all') return products
    return products.filter((p) => p.category.includes(filter))
  }
}))

```

# src/stores/favoritesStore.ts
```ts
import { create } from 'zustand'

interface FavoritesState {
  favorites: Set<string>
  toggleFavorite: (productId: string) => Promise<void>
}

export const useFavoritesStore = create<FavoritesState>((set, _get) => ({
  favorites: new Set<string>(),

  toggleFavorite: async (productId) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    set(state => {
      const newFavorites = new Set(state.favorites)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return { favorites: newFavorites }
    })
  }
}))

```

# src/test/cartDrawer.test.tsx
```tsx
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup, act, waitFor } from '@testing-library/react'
import { useCartStore } from '../stores/cartStore'
import { CartDrawer } from '../components/cart/CartDrawer'

/* Mock TanStack Router Link so tests don't need RouterProvider */
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  )
}))

describe('CartDrawer', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
    useCartStore.getState().closeCart()
  })

  afterEach(() => {
    cleanup()
    useCartStore.getState().closeCart()
  })

  it('should render hidden when cart is closed', () => {
    render(<CartDrawer />)
    const panel = screen.getByRole('dialog', { name: 'Shopping cart' })
    expect(panel).toBeDefined()
    expect(panel).toHaveClass('translate-x-full')
  })

  it('should reveal panel when cart opens', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    const panel = screen.getByRole('dialog', { name: 'Shopping cart' })
    await waitFor(() => {
      expect(panel).toHaveClass('translate-x-0')
    })
  })

  it('should show empty state when cart is empty', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    expect(screen.getByText('Your cart is empty')).toBeDefined()
  })

  it('should close on close button click', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    const closeBtn = screen.getByLabelText('Close cart')
    fireEvent.click(closeBtn)
    expect(useCartStore.getState().isOpen).toBe(false)
  })

  it('should close on Escape key', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    fireEvent.keyDown(document.body, { key: 'Escape' })
    expect(useCartStore.getState().isOpen).toBe(false)
  })

  it('should render cart items when present', async () => {
    const { addItem } = useCartStore.getState()
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })
    addItem({
      id: 'test-2',
      name: 'Another Product',
      price: 200,
      image: 'test2.jpg',
      category: 'women'
    })
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    expect(screen.getByText('Test Product')).toBeDefined()
    expect(screen.getByText('Another Product')).toBeDefined()
  })
})

```

# src/test/cartStore.test.ts
```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../stores/cartStore'

describe('CartStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useCartStore.getState().clearCart()
  })

  it('should add item to cart', () => {
    const { addItem, getCount, getTotal } = useCartStore.getState()
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })

    expect(getCount()).toBe(1)
    expect(getTotal()).toBe(100)
  })

  it('should increment quantity when adding same item', () => {
    const { addItem, getCount, getTotal } = useCartStore.getState()
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })

    expect(getCount()).toBe(2)
    expect(getTotal()).toBe(200)
  })

  it('should remove item from cart', () => {
    const { addItem, removeItem, getCount } = useCartStore.getState()
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })
    
    removeItem('test-1')
    
    expect(getCount()).toBe(0)
  })
})

```

# src/test/toastStore.test.ts
```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useToastStore } from '../stores/toastStore'

describe('ToastStore', () => {
  beforeEach(() => {
    // Clear toasts before each test
    const { toasts } = useToastStore.getState()
    toasts.forEach(t => useToastStore.getState().removeToast(t.id))
  })

  it('should add a toast', () => {
    const { addToast } = useToastStore.getState()

    addToast('Test message', 'info')

    const { toasts } = useToastStore.getState()
    expect(toasts).toHaveLength(1)
    expect(toasts[0].message).toBe('Test message')
    expect(toasts[0].type).toBe('info')
  })

  it('should remove a toast by id', () => {
    const { addToast, removeToast } = useToastStore.getState()

    addToast('Test message', 'success')
    const { toasts } = useToastStore.getState()
    const id = toasts[0].id

    removeToast(id)

    const { toasts: toastsAfter } = useToastStore.getState()
    expect(toastsAfter).toHaveLength(0)
  })

  it('should auto-remove toast after timeout', () => {
    // Use Vitest's fake timers to assert auto-removal logic properly
    vi.useFakeTimers()

    const { addToast } = useToastStore.getState()

    addToast('Auto remove toast', 'info')
    expect(useToastStore.getState().toasts).toHaveLength(1)

    // Fast-forward past the 3000ms auto-removal timeout
    vi.advanceTimersByTime(3100)

    expect(useToastStore.getState().toasts).toHaveLength(0)

    vi.useRealTimers()
  })
})
```

# src/test/favoritesStore.test.ts
```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useFavoritesStore } from '../stores/favoritesStore'

describe('FavoritesStore', () => {
  beforeEach(async () => {
    // Clear favorites before each test
    const store = useFavoritesStore.getState()
    const favorites = store.favorites
    for (const id of favorites) {
      await store.toggleFavorite(id)
    }
  })

  it('should toggle favorite on', async () => {
    const { toggleFavorite } = useFavoritesStore.getState()

    await toggleFavorite('product-1')

    const { favorites: after } = useFavoritesStore.getState()
    expect(after.has('product-1')).toBe(true)
  })

  it('should toggle favorite off', async () => {
    const { toggleFavorite } = useFavoritesStore.getState()

    // First add
    await toggleFavorite('product-1')
    // Then remove
    await toggleFavorite('product-1')

    const { favorites: after } = useFavoritesStore.getState()
    expect(after.has('product-1')).toBe(false)
  })

  it('should handle multiple favorites', async () => {
    const { toggleFavorite } = useFavoritesStore.getState()

    await toggleFavorite('product-1')
    await toggleFavorite('product-2')

    const { favorites } = useFavoritesStore.getState()
    expect(favorites.has('product-1')).toBe(true)
    expect(favorites.has('product-2')).toBe(true)
    expect(favorites.size).toBe(2)
  })
})

```

# src/test/setup.ts
```ts
import '@testing-library/jest-dom'

```

# src/lib/utils.ts
```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `S$${price}`
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

```

# src/globals.css
```css
@import "tailwindcss";

@theme inline {
  /* Color Palette — "Wool & Fog" */
  --color-warm-white: #FAF8F5;
  --color-oat: #EDE8DF;
  --color-foggy-gray: #D5CFC4;
  --color-stone: #9A9185;
  --color-taupe: #7A7268;
  --color-warm-charcoal: #3D3832;
  --color-terracotta: #C4A882;
  --color-success: #8B9A7B;
  --color-error: #B87A6E;
  --color-text-primary: #2C2824;
  --color-text-secondary: #6B6560;
  --color-text-muted: #9A9185;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* Spacing Scale */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  --spacing-4: 24px;
  --spacing-5: 32px;
  --spacing-6: 48px;
  --spacing-7: 64px;
  --spacing-8: 80px;
  --spacing-9: 120px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(44, 40, 36, 0.04);
  --shadow-md: 0 4px 12px rgba(44, 40, 36, 0.06);
  --shadow-lg: 0 12px 32px rgba(44, 40, 36, 0.08);
  --shadow-xl: 0 24px 48px rgba(44, 40, 36, 0.10);

  /* Z-Index */
  --z-base: 0;
  --z-raised: 10;
  --z-sticky: 100;
  --z-overlay: 200;
  --z-cart: 300;
  --z-modal: 400;
  --z-toast: 500;

  /* Animations */
  --animate-fade-in-up: fade-in-up 800ms ease-out forwards;
  --animate-fade-in-right: fade-in-right 800ms ease-out forwards;
  --animate-badge-pulse: badge-pulse 300ms ease-out;
  --animate-reveal: reveal 800ms ease-out forwards;

  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-in-right {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes badge-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  @keyframes reveal {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-primary);
    background-color: var(--color-warm-white);
    letter-spacing: 0.01em;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--color-text-primary);
  }

  :focus-visible {
    outline: 2px solid var(--color-terracotta);
    outline-offset: 2px;
  }

  ::selection {
    background-color: var(--color-oat);
    color: var(--color-warm-charcoal);
  }
}

@layer utilities {
  .container-custom {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section-label {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-terracotta);
  }

  .reveal {
    opacity: 0;
    animation: var(--animate-reveal);
  }

  .reveal-stagger > * {
    opacity: 0;
    animation: var(--animate-reveal);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

```

# src/types/index.ts
```ts
// Product type — erasableSyntaxOnly compliant (no enums)
export type ProductCategory = 'men' | 'women' | 'runners' | 'loungers'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: ProductCategory[]
  badge?: 'new' | 'sale'
  description: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

export type FilterCategory = 'all' | ProductCategory

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

```

# src/routes/__root.tsx
```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@components/layout/Navbar'
import { Footer } from '@components/layout/Footer'
import { ToastContainer } from '@components/ToastContainer'
import { CartOverlay } from '@components/cart/CartOverlay'
import { CartDrawer } from '@components/cart/CartDrawer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px]">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
      <CartOverlay />
      <CartDrawer />
    </>
  )
}

```

# src/routes/products.index.tsx
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { ProductGrid } from '@components/sections/ProductGrid'

export const Route = createFileRoute('/products/')({
  component: ProductsIndexComponent,
})

function ProductsIndexComponent() {
  return (
    <div className="container-custom py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-8 text-center">
        Our Collection
      </h1>
      <ProductGrid />
    </div>
  )
}

```

# src/routes/products/$id.tsx
```tsx
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useProductStore } from '@stores/productStore'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { useCartStore } from '@stores/cartStore'

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailComponent,
})

function ProductDetailComponent() {
  const { id } = useParams({ from: '/products/$id' })
  const { products } = useProductStore()
  const { addItem } = useCartStore()

  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-[family-name:var(--font-display)] text-4xl">
              {product.name}
            </h1>
            {product.badge && (
              <Badge variant={product.badge === 'new' ? 'new' : 'sale'}>
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold">S${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-[var(--color-text-muted)] line-through">
                S${product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            {product.description}
          </p>
          <Button
            size="lg"
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category[0]
            })}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

```

# src/routes/index.tsx
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@components/sections/HeroSection'
import { TrustBar } from '@components/sections/TrustBar'
import { BrandStorySection } from '@components/sections/BrandStorySection'
import { ProductGrid } from '@components/sections/ProductGrid'
import { NewsletterSection } from '@components/sections/NewsletterSection'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <BrandStorySection />
      <ProductGrid />
      <NewsletterSection />
    </>
  )
}

```

# src/routes/about.tsx
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@components/ui/button'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="container-custom py-16 max-w-4xl">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-8 text-center">
        Our Story
      </h1>

      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-6">
          WOOLSTEP was born in the humid streets of Singapore with a simple mission:
          create sneakers that can handle the tropical climate while looking effortlessly
          stylish in the CBD.
        </p>

        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-6">
          Our journey began when our founder, frustrated with synthetic sneakers that
          trapped heat and caused discomfort during daily commutes, discovered the
          magic of merino wool. Temperature-regulating, naturally antibacterial, and
          incredibly soft — it was the perfect material for urban tropical life.
        </p>

        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-12">
          Today, we continue to innovate with eucalyptus fiber options and sustainable
          practices, proving that comfort and style can coexist with environmental
          responsibility.
        </p>
      </div>

      <div className="text-center">
        <a href="https://woolstep.sg" target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="secondary">
            Visit Our Full Site
          </Button>
        </a>
      </div>
    </div>
  )
}

```

# src/routes/cart.tsx
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { CartPanel } from '@components/cart/CartPanel'

export const Route = createFileRoute('/cart')({
  component: CartComponent,
})

function CartComponent() {
  return (
    <div className="container-custom py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-8 text-center">
        Your Cart
      </h1>
      <CartPanel />
    </div>
  )
}

```

