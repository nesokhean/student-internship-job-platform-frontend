import { Link, useParams, useNavigate } from 'react-router-dom'
import { MapPin, Banknote, Clock, CalendarDays, Bookmark, CheckCircle2, ArrowLeft, Building2 } from 'lucide-react'
import { Logo } from './JobCard.jsx'
import MapEmbed from './MapEmbed.jsx'
import EmptyState from './ui/EmptyState.jsx'
import { getCompany, fmtDate, pay } from '../utils/helpers.js'
import { useAuth } from '../hooks/useAuth.js'

const List = ({ title, items }) => (
  <section className="mt-8">
    <h2 className="font-display text-lg font-bold text-heading">{title}</h2>
    <ul className="mt-3 space-y-2.5">
      {items.map(t => (
        <li key={t} className="flex gap-2.5 text-ink">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />{t}
        </li>
      ))}
    </ul>
  </section>
)

export default function Detail({ kind, items }) {
  const { id } = useParams()
  const nav = useNavigate()
  const { user, isSaved, toggleSave, hasApplied, apply } = useAuth()
  const item = items.find(i => i.id === Number(id))

  if (!item) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <EmptyState
          icon={ArrowLeft}
          title="We couldn’t find that listing"
          description="It may have been removed, or the link is wrong."
          action={<Link to={`/${kind}`} className="btn-primary">Browse {kind}</Link>}
        />
      </div>
    )
  }

  const c = getCompany(item.companyId)
  const applied = hasApplied(kind, item.id)
  const saved = isSaved(kind, item.id)
  const need = fn => () => (user ? fn() : nav('/login', { state: { from: `/${kind}/${id}` } }))
  const meta = [
    [MapPin, item.location],
    [Banknote, pay(item)],
    [Clock, item.duration ? `${item.duration} · ${item.type}` : item.type],
    [CalendarDays, `Posted ${fmtDate(item.posted)}`],
  ]
  const noun = kind === 'jobs' ? 'job' : 'internship'

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link to={`/${kind}`} className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-primary">
        <ArrowLeft size={16} />Back to {kind}
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 sm:p-8 lg:col-span-2">
          <div className="flex items-start gap-4">
            <Logo company={c} size="h-16 w-16" />
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-extrabold text-heading sm:text-3xl">{item.title}</h1>
              <Link to={`/companies/${c.id}`} className="mt-1.5 inline-flex items-center gap-1.5 text-primary transition hover:underline">
                <Building2 size={15} />{c.name}
              </Link>
            </div>
          </div>
          <p className="mt-6 leading-relaxed text-ink">{item.desc}</p>
          <List title="Requirements" items={item.req} />
          <List title="Responsibilities" items={item.resp} />
          <section className="mt-8">
            <h2 className="font-display text-lg font-bold text-heading">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.skills.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </section>
        </div>

        <aside className="card h-fit space-y-4 p-6 lg:sticky lg:top-24">
          <div className="space-y-3">
            {meta.map(([Icon, t]) => (
              <p key={t} className="flex items-center gap-2.5 text-sm text-ink">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary">
                  <Icon size={15} />
                </span>
                {t}
              </p>
            ))}
          </div>
          <button className="btn-primary w-full" disabled={applied} onClick={need(() => apply(kind, item.id))}>
            {applied ? 'Applied' : `Apply for this ${noun}`}
          </button>
          <button className="btn-ghost w-full" onClick={need(() => toggleSave(kind, item.id))}>
            <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : `Save ${noun}`}
          </button>
          {!user && <p className="text-center text-xs text-muted">Log in to apply or save.</p>}
        </aside>
      </div>

      {/* No map for remote roles - there is nothing to point at. */}
      {item.location !== 'Remote' && (
        <MapEmbed className="mt-6" query={`${item.location}, Cambodia`} caption={`${item.location}, Cambodia`} />
      )}
    </div>
  )
}