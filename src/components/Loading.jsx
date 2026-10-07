import { Loader2 } from 'lucide-react'

/** Centered spinner with a soft pulsing halo. */
export default function Loading({ label = 'Loading…', className = 'py-16' }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 text-muted ${className}`} role="status" aria-live="polite">
      <span className="relative grid place-items-center">
        <span className="animate-ring absolute h-11 w-11 rounded-full" />
        <Loader2 className="animate-spin text-primary" size={26} />
      </span>
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}
