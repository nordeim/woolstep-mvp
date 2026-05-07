import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@components/ui/button'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="container-custom py-16 max-w-4xl">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-8 text-center">
        Our Story
      </h1>

      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-6">
          WOOLSTEP was born in the humid streets of Singapore with a simple mission:
          create sneakers that can handle the tropical climate while looking effortlessly
          stylish in the CBD.
        </p>

        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-6">
          Our journey began when our founder, frustrated with synthetic sneakers that
          trapped heat and caused discomfort during daily commutes, discovered the
          magic of merino wool. Temperature-regulating, naturally antibacterial, and
          incredibly soft — it was the perfect material for urban tropical life.
        </p>

        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-12">
          Today, we continue to innovate with eucalyptus fiber options and sustainable
          practices, proving that comfort and style can coexist with environmental
          responsibility.
        </p>
      </div>

      <div className="text-center">
        <a href="https://woolstep.sg" target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="secondary">
            Visit Our Full Site
          </Button>
        </a>
      </div>
    </div>
  )
}
