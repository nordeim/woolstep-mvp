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
