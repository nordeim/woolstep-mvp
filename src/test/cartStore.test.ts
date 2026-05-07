import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../stores/cartStore'

describe('CartStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useCartStore.getState().clearCart()
  })

  it('should add item to cart', () => {
    const { addItem, getCount, getTotal } = useCartStore.getState()
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })

    expect(getCount()).toBe(1)
    expect(getTotal()).toBe(100)
  })

  it('should increment quantity when adding same item', () => {
    const { addItem, getCount, getTotal } = useCartStore.getState()
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })

    expect(getCount()).toBe(2)
    expect(getTotal()).toBe(200)
  })

  it('should remove item from cart', () => {
    const { addItem, removeItem, getCount } = useCartStore.getState()
    
    addItem({
      id: 'test-1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'men'
    })
    
    removeItem('test-1')
    
    expect(getCount()).toBe(0)
  })
})
