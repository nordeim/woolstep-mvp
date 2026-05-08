import { useCartStore } from '@stores/cartStore'

export function CartOverlay() {
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-[rgba(44,40,36,0.4)] z-[var(--z-overlay)] transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeCart}
      aria-hidden="true"
    />
  )
}
