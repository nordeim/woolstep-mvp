import { createFileRoute } from '@tanstack/react-router'
import { CartPanel } from '@components/cart/CartPanel'

export const Route = createFileRoute('/cart')({
  component: CartComponent,
})

function CartComponent() {
  return (
    <div className="container-custom py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-8 text-center">
        Your Cart
      </h1>
      <CartPanel />
    </div>
  )
}
