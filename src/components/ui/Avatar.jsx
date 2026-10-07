const initialsOf = name =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase() || '?'

/** Profile chip: gradient initials, or the image when a src is supplied. */
export default function Avatar({
  name = '',
  src,
  size = 'h-10 w-10',
  className = '',
  initialsClassName = 'text-xs',
}) {
  const base = `${size} shrink-0 rounded-full object-cover ring-2 ring-surface ${className}`
  if (src) return <img src={src} alt={name} className={base} />
  return (
    <span
      aria-hidden="true"
      className={`${base} inline-flex items-center justify-center bg-gradient-to-br from-primary to-secondary font-display font-bold text-white ${initialsClassName}`}
    >
      {initialsOf(name)}
    </span>
  )
}
