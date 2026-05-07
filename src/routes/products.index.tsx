import { createFileRoute } from '@tanstack/react-router'
import { ProductGrid } from '@components/sections/ProductGrid'

export const Route = createFileRoute('/products/')({
  component: ProductsIndexComponent,
})

function ProductsIndexComponent() {
  return (
    <div className="container-custom py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-8 text-center">
        Our Collection
      </h1>
      <ProductGrid />
    </div>
  )
}
