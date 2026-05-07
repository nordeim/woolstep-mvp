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
