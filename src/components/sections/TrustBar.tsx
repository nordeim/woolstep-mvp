import { Truck, Shield, Recycle } from 'lucide-react'
import { cn } from '@lib/utils'

export function TrustBar() {
  const trustItems = [
    {
      icon: <Truck className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Free Shipping',
      subtitle: 'On orders over S$100'
    },
    {
      icon: <Shield className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: '30-Day Returns',
      subtitle: 'Hassle-free, no questions'
    },
    {
      icon: <Recycle className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Carbon Neutral',
      subtitle: 'Certified B Corp pending'
    },
    {
      icon: <Shield className="w-8 h-8 text-[var(--color-terracotta)]" />,
      title: 'Secure Payment',
      subtitle: '256-bit SSL encryption'
    }
  ]

  return (
    <section className="py-6 md:py-8 bg-[var(--color-warm-white)] border-y border-[var(--color-oat)]" aria-label="Trust indicators">
      <div className="container-custom">
        <div className="flex justify-around items-center flex-wrap gap-4 md:gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className={cn("flex items-center gap-3", "reveal")} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="w-10 h-10 bg-[var(--color-oat)] rounded-md flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-[family-name:var(--font-body)] font-semibold text-sm text-[var(--color-text-primary)]">
                  {item.title}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
