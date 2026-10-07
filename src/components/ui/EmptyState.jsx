/** Friendly zero-data panel: icon chip, title, copy and an optional action. */
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      {Icon && (
        <span className="mb-3 rounded-2xl bg-primary-50 p-3.5 text-primary ring-1 ring-inset ring-primary/15">
          <Icon size={26} />
        </span>
      )}
      <h2 className="font-display text-lg font-bold text-heading">{title}</h2>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
