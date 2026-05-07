import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="bg-[var(--color-warm-charcoal)] text-[var(--color-oat)] py-16 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-warm-white)] mb-4">
              WOOLSTEP
            </h3>
            <p className="text-sm leading-relaxed">
              Premium wool sneakers for the urban Singapore lifestyle. Natural comfort meets tropical functionality.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4">Quick Links</h4>
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

          <div>
            <h4 className="font-semibold text-[var(--color-warm-white)] mb-4">Connect</h4>
            <p className="text-sm">
              Singapore<br />
              hello@woolstep.sg
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--color-stone)] mt-12 pt-8 text-center text-sm">
          <p>&copy; 2026 WOOLSTEP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
