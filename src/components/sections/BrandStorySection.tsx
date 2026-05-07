import { Link } from '@tanstack/react-router'
import { Button } from '@components/ui/button'
import { Flame, Droplets, ShieldCheck, WashingMachine } from 'lucide-react'

export function BrandStorySection() {
  const features = [
    {
      icon: <Flame className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Temperature Regulating',
      description: 'Cool in 32°C heat, warm in air-con'
    },
    {
      icon: <Droplets className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Moisture Wicking',
      description: 'Absorbs 30% of its weight in vapor'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Naturally Antibacterial',
      description: 'Odor-resistant without chemicals'
    },
    {
      icon: <WashingMachine className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Machine Washable',
      description: 'Cold wash, air dry — good as new'
    }
  ]

  return (
    <section className="py-24 bg-[var(--color-warm-white)]">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <img
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop&q=80"
              alt="Close-up of natural merino wool fibers"
              className="w-full aspect-[3/4] object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="reveal">
            <span className="section-label block mb-4">Why Wool in the Tropics?</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-6">
              Born in Singapore.<br />Crafted for the City.
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              We asked a simple question: why are the most comfortable shoes made from synthetic materials?
              In Singapore's relentless heat and humidity, your feet deserve better than plastic.
            </p>
            <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              Our merino wool comes from ethically farmed sheep in New Zealand's Southern Alps — where
              temperature swings from -10°C to 30°C made nature engineer the perfect breathable fiber.
              We paired it with sugarcane-based SweetFoam™ soles and recycled bottle laces to create
              the lightest, most breathable sneaker you'll wear in the tropics.
            </p>

            <div className="grid grid-cols-2 gap-4 reveal-stagger">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--color-oat)] rounded-md flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-body)] font-semibold text-base mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Read Our Full Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
