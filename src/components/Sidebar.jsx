import { NavLink } from 'react-router-dom'

/** Dashboard navigation. Active items get the brand gradient pill. */
export default function Sidebar({ items = [], onNavigate }) {
  const cls = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
        : 'text-muted hover:bg-surface-2 hover:text-heading'
    }`

  return (
    <nav className="space-y-1.5">
      {items.map(({ to, label, icon: Icon, end, soon }) =>
        soon ? (
          <span
            key={to}
            aria-disabled="true"
            className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted/60"
          >
            <Icon size={18} className="shrink-0" />
            {label}
            <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted ring-1 ring-inset ring-line">
              Soon
            </span>
          </span>
        ) : (
          <NavLink key={to} to={to} end={end} className={cls} onClick={onNavigate}>
            <Icon size={18} className="shrink-0 transition duration-200 group-hover:scale-110" />
            {label}
          </NavLink>
        )
      )}
    </nav>
  )
}
