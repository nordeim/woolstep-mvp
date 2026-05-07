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
