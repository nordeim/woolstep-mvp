
# File 14: Layout components — Navbar
navbar_component = '''import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@stores/cartStore'
import { cn } from '@lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { items, openCart, getCount } = useCartStore()
  const count = getCount()

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Collection' },
    { to: '/about', label: 'Our Story' }
  ]

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
          scrolled
            ? 'bg-[var(--color-warm-white)]/95 backdrop-blur-md shadow-sm h-16'
            : 'bg-transparent h-[72px]'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom flex items-center justify-between h-full">
          <Link to="/" className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-warm-charcoal)]">
            WOOLSTEP
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-warm-charcoal)] transition-colors relative group"
                  activeProps={{ className: 'text-[var(--color-warm-charcoal)]' }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-warm-charcoal)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-[var(--color-text-primary)] hover:scale-105 transition-transform"
              aria-label="Shopping cart"
              aria-expanded={useCartStore.getState().isOpen}
            >
              <ShoppingBag className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)] text-xs font-bold rounded-full flex items-center justify-center animate-[badge-pulse_300ms_ease-out]">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-[var(--color-text-primary)]"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-[200] bg-[var(--color-warm-white)] flex flex-col p-8 transition-transform duration-300 md:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-between items-center mb-16">
          <span className="font-[family-name:var(--font-display)] text-2xl font-medium">WOOLSTEP</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-text-primary)] hover:text-[var(--color-terracotta)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
'''

with open(f"{work_dir}/src/components/layout/Navbar.tsx", "w") as f:
    f.write(navbar_component)

print("✅ components/layout/Navbar.tsx written")

