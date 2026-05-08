import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup, act, waitFor } from '@testing-library/react'
import { useCartStore } from '../stores/cartStore'
import { CartDrawer } from '../components/cart/CartDrawer'

/* Mock TanStack Router Link so tests don't need RouterProvider */
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  )
}))

describe('CartDrawer', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
    useCartStore.getState().closeCart()
  })

  afterEach(() => {
    cleanup()
    useCartStore.getState().closeCart()
  })

  it('should render hidden when cart is closed', () => {
    render(<CartDrawer />)
    const panel = screen.getByRole('dialog', { name: 'Shopping cart' })
    expect(panel).toBeDefined()
    expect(panel).toHaveClass('translate-x-full')
  })

  it('should reveal panel when cart opens', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    const panel = screen.getByRole('dialog', { name: 'Shopping cart' })
    await waitFor(() => {
      expect(panel).toHaveClass('translate-x-0')
    })
  })

  it('should show empty state when cart is empty', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    expect(screen.getByText('Your cart is empty')).toBeDefined()
  })

  it('should close on close button click', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    const closeBtn = screen.getByLabelText('Close cart')
    fireEvent.click(closeBtn)
    expect(useCartStore.getState().isOpen).toBe(false)
  })

  it('should close on Escape key', async () => {
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    fireEvent.keyDown(document.body, { key: 'Escape' })
    expect(useCartStore.getState().isOpen).toBe(false)
  })

  it('should render cart items when present', async () => {
    const { addItem } = useCartStore.getState()
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })
    addItem({
      id: 'test-2',
      name: 'Another Product',
      price: 200,
      image: 'test2.jpg',
      category: 'women'
    })
    render(<CartDrawer />)
    await act(async () => {
      useCartStore.getState().openCart()
    })
    expect(screen.getByText('Test Product')).toBeDefined()
    expect(screen.getByText('Another Product')).toBeDefined()
  })
})
