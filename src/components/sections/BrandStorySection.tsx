import { Link } from '@tanstack/react-router'
import { Button } from '@components/ui/button'
import { Leaf, Droplets, Wind } from 'lucide-react'

export function BrandStorySection() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Merino Wool',
      description: 'Naturally antibacterial and temperature-regulating. Perfect for Singapore\'s tropical climate.'
    },
    {
      icon: <Droplets className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Machine Washable',
      description: 'Life happens. Just toss them in the wash and they come out fresh every time.'
    },
    {
      icon: <Wind className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Breathable Design',
      description: 'Eucalyptus fiber options for maximum airflow during humid commutes.'
    }
  ]

  return (
    <section className="py-24 bg-[var(--color-oat)]/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-label block mb-4">Our Philosophy</span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-6">
            Designed for the Urban Tropical Life
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            WOOLSTEP was born in Singapore with a simple mission: create sneakers that handle the humidity, look great in the CBD, and feel like walking on clouds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 bg-[var(--color-warm-white)] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="font-[family-name:var(--font-display)] text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/about">
            <Button variant="secondary" size="lg">
              Read Our Full Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
