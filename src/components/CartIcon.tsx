export function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={18}
      height={18}
      className={className}
      aria-hidden="true"
    >
      {/* Arch handle */}
      <path d="M9 4a3 3 0 0 1 6 0" />
      {/* Bag body */}
      <path d="M3 8h18l-1.5 12H4.5L3 8z" />
    </svg>
  )
}
