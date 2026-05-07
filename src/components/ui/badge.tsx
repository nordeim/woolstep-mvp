import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-warm-charcoal)] text-[var(--color-warm-white)]',
        secondary: 'bg-[var(--color-oat)] text-[var(--color-warm-charcoal)]',
        new: 'bg-[var(--color-terracotta)] text-[var(--color-warm-white)]',
        sale: 'bg-[var(--color-error)] text-[var(--color-warm-white)]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
