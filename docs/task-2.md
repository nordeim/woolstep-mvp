Continuing with Phase 4: IMPLEMENT — generating the remaining core configuration and application files.


import os

work_dir = "/mnt/agents/output/woolstep-mvp"

# File 4: index.html
index_html = '''<!doctype html>
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
'''

with open(f"{work_dir}/index.html", "w") as f:
    f.write(index_html)

# File 5: Tailwind CSS v4 globals.css
globals_css = '''@import "tailwindcss";

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
'''

with open(f"{work_dir}/src/globals.css", "w") as f:
    f.write(globals_css)

print("✅ index.html + globals.css written")



# File 6: Type definitions
types_index = '''// Product type — erasableSyntaxOnly compliant (no enums)
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
'''

with open(f"{work_dir}/src/types/index.ts", "w") as f:
    f.write(types_index)

# File 7: Utility functions (cn helper)
utils = '''import { type ClassValue, clsx } from 'clsx'
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
'''

with open(f"{work_dir}/src/lib/utils.ts", "w") as f:
    f.write(utils)

print("✅ types/index.ts + lib/utils.ts written")



# File 8: Zustand Cart Store
store_cart = '''import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@types'

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
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
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
'''

with open(f"{work_dir}/src/stores/cartStore.ts", "w") as f:
    f.write(store_cart)

# File 9: Product data store
store_products = '''import { create } from 'zustand'
import type { Product, FilterCategory } from '@types'

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
'''

with open(f"{work_dir}/src/stores/productStore.ts", "w") as f:
    f.write(store_products)

print("✅ stores/cartStore.ts + stores/productStore.ts written")

