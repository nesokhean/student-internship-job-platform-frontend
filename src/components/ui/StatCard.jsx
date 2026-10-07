/**
 * Dashboard metric tile: label, headline number, gradient icon chip and an
 * optional hint. The coloured blob is decorative (pointer-events disabled).
 */
export default function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'from-primary to-secondary',
  hint,
  loading = false,
}) {
  return (
    <div className="group relative overflow-hidden rounded-card border border-line bg-surface p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <div
        className={`pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${tone} opacity-15 blur-2xl transition duration-300 group-hover:opacity-30`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
        {Icon && (
          <span className={`rounded-xl bg-gradient-to-br ${tone} p-2 text-white shadow-glow`}>
            <Icon size={16} />
          </span>
        )}
      </div>
      <p className="relative mt-3 font-display text-3xl font-extrabold tabular-nums text-heading">
        {loading ? <span className="skeleton inline-block h-8 w-14 align-middle" /> : value}
      </p>
      {hint && <p className="relative mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}
