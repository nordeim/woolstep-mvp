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
