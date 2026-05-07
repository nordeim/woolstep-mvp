import * as React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback
      if (Fallback) {
        return <Fallback error={this.state.error} />
      }
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-warm-white)]">
          <div className="text-center p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl mb-4">
              Something went wrong
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              {this.state.error.message}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)] rounded-md hover:bg-[#2a2620] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
