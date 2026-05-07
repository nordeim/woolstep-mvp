import { Link } from '@tanstack/react-router'
import { useProductStore } from '@stores/productStore'
import { useCartStore } from '@stores/cartStore'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { FavoriteButton } from '@components/FavoriteButton'
import { cn } from '@lib/utils'

export function ProductGrid() {
  const { getFilteredProducts, filter, setFilter } = useProductStore()
  const { addItem } = useCartStore()
  const products = getFilteredProducts()

  const filters: { label: string; value: 'all' | 'men' | 'women' | 'runners' | 'loungers' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Runners', value: 'runners' },
    { label: 'Loungers', value: 'loungers' }
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="section-label block mb-4">Curated Collection</span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-6">
            Step Into Comfort
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200',
                filter === f.value
                  ? 'bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)]'
                  : 'bg-[var(--color-oat)] text-[var(--color-text-secondary)] hover:bg-[var(--color-foggy-gray)]'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[var(--color-warm-white)] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <Link to="/products/$id" params={{ id: product.id }} className="block relative aspect-[4/5] overflow-hidden bg-[var(--color-oat)]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <Badge
                    variant={product.badge === 'new' ? 'new' : 'sale'}
                    className="absolute top-4 left-4"
                  >
                    {product.badge}
                  </Badge>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to="/products/$id"
                        params={{ id: product.id }}
                        className="font-[family-name:var(--font-display)] text-xl hover:text-[var(--color-terracotta)] transition-colors"
                      >
                        {product.name}
                      </Link>
                      <FavoriteButton productId={product.id} />
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] capitalize">
                      {product.category.join(', ')}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="font-semibold text-lg">S${product.price}</span>
                    {product.originalPrice && (
                      <span className="block text-sm text-[var(--color-text-muted)] line-through">
                        S${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category[0]
                    })
                  }
                >
                  Quick Add
                </Button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-12">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  )
}
