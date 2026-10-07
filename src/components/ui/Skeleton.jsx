/** Shimmering placeholder blocks used while data loads. */
export function Skeleton({ className = 'h-4 w-full' }) {
  return <div className={`skeleton ${className}`} />
}

/** Grid of card placeholders — matches the listing/browse layout. */
export function SkeletonCards({ count = 6, className = 'h-48' }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </div>
  )
}

/** Row placeholders for tables and activity lists. */
export function SkeletonRows({ rows = 4 }) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/5" />
          </div>
        </div>
      ))}
    </div>
  )
}
