import { useActionState } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'

export function NewsletterSection() {
  const initialState: { message: string; type: 'idle' | 'success' | 'error' } = {
    message: '',
    type: 'idle'
  }

  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const email = formData.get('email') as string

      if (!email || !email.includes('@')) {
        return { message: 'Please enter a valid email address.', type: 'error' as const }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate success (in real app, would call API)
      return { message: 'Thanks for subscribing! Check your inbox soon.', type: 'success' as const }
    },
    initialState
  )

  return (
    <section className="py-16 md:py-24 bg-[var(--color-oat)]/30">
      <div className="container-custom max-w-2xl mx-auto text-center">
        <span className="section-label block mb-4">Stay Connected</span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
          Get First Access
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Be the first to know about new drops, exclusive events, and Singapore-specific releases.
        </p>

        <form action={formAction} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="flex-1"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {state.type !== 'idle' && (
          <p
            className={`mt-4 text-sm ${
              state.type === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
            }`}
            role="alert"
          >
            {state.message}
          </p>
        )}
      </div>
    </section>
  )
}
