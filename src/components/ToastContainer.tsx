import { useToastStore } from '@stores/toastStore'

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-[var(--z-toast)] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg animate-[fade-in-up_300ms_ease-out] ${
            toast.type === 'success' ? 'bg-[var(--color-success)] text-white' :
            toast.type === 'error' ? 'bg-[var(--color-error)] text-white' :
            'bg-[var(--color-warm-charcoal)] text-white'
          }`}
          role="alert"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
