import { Link } from '@tanstack/react-router'
import { Button } from '@components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[var(--color-warm-charcoal)] text-[var(--color-foggy-gray)] py-16 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="max-w-[300px]">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-warm-white)] mb-4">
              WOOLSTEP
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-stone)] mb-6">
              Premium wool sneakers for the urban Singapore lifestyle. Natural comfort meets tropical functionality.
            </p>
            {/* Newsletter Signup */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-[rgba(250,248,245,0.1)] border border-[rgba(250,248,245,0.2)] rounded-md text-[var(--color-warm-white)] text-sm font-[family-name:var(--font-body)] min-h-[48px]"
              />
              <Button className="bg-[var(--color-terracotta)] text-[var(--color-warm-charcoal)] hover:bg-[var(--color-foggy-gray)] px-4 py-2 text-sm font-semibold min-h-[48px]">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[var(--color-warm-white)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[var(--color-warm-white)] transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--color-warm-white)] transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <p className="text-sm text-[var(--color-stone)] mb-6">
              Singapore<br />
              hello@woolstep.sg
            </p>
          </div>

          {/* Payment Icons */}
          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4 text-sm uppercase tracking-wider">
              Secure Payment
            </h4>
            <div className="flex gap-3 items-center flex-wrap">
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                VISA
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                MC
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                PayPal
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                Apple Pay
              </div>
              <div className="h-6 text-[var(--color-stone)] text-xs border border-[var(--color-stone)] rounded px-2 flex items-center">
                Google Pay
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(250,248,245,0.1)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-[var(--color-stone)]">
            &copy; 2026 WOOLSTEP. All rights reserved.
          </p>
          <p className="text-[var(--color-stone)] text-xs">
            Built with ❤️ using React 19 + TypeScript 5.9 + Vite 8
          </p>
        </div>
      </div>
    </footer>
  )
}
