import { Link } from '@tanstack/react-router'
import { Button } from '@components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-warm-white)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=900&fit=crop&q=80"
          alt="Wool sneakers"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-warm-white)]/50 to-[var(--color-warm-white)]" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center animate-[fade-in-up_800ms_ease-out_forwards]">
        <span className="section-label block mb-6">
          Premium Wool Sneakers
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 max-w-4xl mx-auto">
          Natural<br />Comfort.<br />Urban Function.
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Merino wool meets Singapore's tropical rhythm. Sneakers designed for the urban life — breathable, washable, and effortlessly comfortable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" className="group">
              Shop Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="secondary">
              Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
