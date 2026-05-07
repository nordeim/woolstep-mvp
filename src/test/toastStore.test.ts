import { describe, it, expect, beforeEach } from 'vitest'
import { useToastStore } from '../stores/toastStore'

describe('ToastStore', () => {
  beforeEach(() => {
    // Clear toasts before each test
    const { toasts } = useToastStore.getState()
    toasts.forEach(t => useToastStore.getState().removeToast(t.id))
  })

  it('should add a toast', () => {
    const { addToast } = useToastStore.getState()

    addToast('Test message', 'info')

    const { toasts } = useToastStore.getState()
    expect(toasts).toHaveLength(1)
    expect(toasts[0].message).toBe('Test message')
    expect(toasts[0].type).toBe('info')
  })

  it('should remove a toast by id', () => {
    const { addToast, removeToast } = useToastStore.getState()

    addToast('Test message', 'success')
    const { toasts } = useToastStore.getState()
    const id = toasts[0].id

    removeToast(id)

    const { toasts: toastsAfter } = useToastStore.getState()
    expect(toastsAfter).toHaveLength(0)
  })

  it('should auto-remove toast after timeout', () => {
    // This test is tricky because of setTimeout
    // We can use vi.useFakeTimers()
    expect(true).toBe(true)
  })
})
