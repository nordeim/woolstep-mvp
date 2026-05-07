import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@components/sections/HeroSection'
import { BrandStorySection } from '@components/sections/BrandStorySection'
import { ProductGrid } from '@components/sections/ProductGrid'
import { NewsletterSection } from '@components/sections/NewsletterSection'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <ProductGrid />
      <NewsletterSection />
    </>
  )
}
