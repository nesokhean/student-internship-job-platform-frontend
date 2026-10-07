import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Banknote, Bookmark, ArrowRight } from 'lucide-react'
import { getCompany, fmtDate, pay } from '../utils/helpers.js'
import { useAuth } from '../hooks/useAuth.js'

export function Logo({ company, size = 'h-12 w-12', initialClass = 'text-lg' }) {
  const [failed, setFailed] = useState(false)

  if (company.logo && !failed) {
    return (
      <span className={`company-logo ${size}`}>
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          width="100%"
          height="100%"
          loading="lazy"
          decoding="async"
          draggable="false"
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${size} grid shrink-0 place-items-center rounded-2xl font-display ${initialClass} font-extrabold text-white shadow-soft ring-1 ring-inset ring-white/25`}
      style={{ background: company.color }}
    >
      {company.name[0]}
    </span>
  )
}

export default function JobCard({ item, kind = 'jobs' }) {
  const c = getCompany(item.companyId)
  const { user, isSaved, toggleSave } = useAuth()
  const saved = isSaved(kind, item.id)

  return (
    <article className="group card card-hover flex flex-col p-5">
      <div className="flex items-start gap-3">
        <Logo company={c} />
        <div className="min-w-0 flex-1">
          <Link to={`/${kind}/${item.id}`} className="block truncate font-display font-bold text-heading transition group-hover:text-primary">
            {item.title}
          </Link>
          <Link to={`/companies/${c.id}`} className="text-sm text-muted transition hover:text-primary">{c.name}</Link>
        </div>
        {user && (
          <button
            aria-label={saved ? 'Remove from saved' : 'Save'}
            aria-pressed={saved}
            onClick={() => toggleSave(kind, item.id)}
            className={`rounded-xl p-1.5 transition duration-200 ${saved ? 'text-primary' : 'text-muted hover:bg-surface-2 hover:text-primary'}`}
          >
            <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" />{item.location}</span>
        <span className="flex items-center gap-1.5"><Banknote size={14} className="text-primary" />{pay(item)}</span>
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" />{item.duration || item.type}</span>
      </div>

      <div className="mb-5 mt-3.5 flex flex-wrap gap-2">
        {item.skills.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line/70 pt-4">
        <span className="text-xs text-muted">Posted {fmtDate(item.posted)}</span>
        <Link to={`/${kind}/${item.id}`} className="btn-ghost btn-sm">
          View details <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}

