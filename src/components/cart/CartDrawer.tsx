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
