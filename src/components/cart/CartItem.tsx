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
