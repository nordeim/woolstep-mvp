import { createFileRoute, useParams } from '@tanstack/react-router'
import { useProductStore } from '@stores/productStore'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { useCartStore } from '@stores/cartStore'

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailComponent,
})

function ProductDetailComponent() {
  const { id } = useParams({ from: '/products/$id' })
  const { products } = useProductStore()
  const { addItem } = useCartStore()

  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-[family-name:var(--font-display)] text-4xl">
              {product.name}
            </h1>
            {product.badge && (
              <Badge variant={product.badge === 'new' ? 'new' : 'sale'}>
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold">S${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-[var(--color-text-muted)] line-through">
                S${product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            {product.description}
          </p>
          <Button
            size="lg"
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category[0]
            })}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
