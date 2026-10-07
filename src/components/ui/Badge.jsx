/** Status pill. Pair with a tone string from helpers.statusTone(). */
export default function Badge({ children, tone = 'badge-neutral', dot = false, className = '' }) {
  return (
    <span className={`badge ${tone} ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
