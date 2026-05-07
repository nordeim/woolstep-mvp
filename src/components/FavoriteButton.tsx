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
