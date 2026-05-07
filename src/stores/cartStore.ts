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
