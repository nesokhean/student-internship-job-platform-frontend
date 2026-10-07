/** Gradient progress bar (profile completeness, review progress, ...). */
export default function Progress({ value = 0, max = 100, label, hint }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0
  return (
    <div>
      {(label || hint) && (
        <div className="mb-1.5 flex items-center justify-between gap-3 text-xs font-semibold text-muted">
          <span>{label}</span>
          <span className="tabular-nums">{hint ?? `${pct}%`}</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
