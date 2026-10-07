import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { locations, categories, salaryRanges } from '../utils/helpers.js'

export default function SearchBar({ initial = {}, types = [], onSearch, withKind = false }) {
  const [v, setV] = useState({ kind: 'jobs', q: '', location: '', category: '', type: '', salary: '', ...initial })
  const set = k => e => setV({ ...v, [k]: e.target.value })
  const dirty = v.q || v.location || v.category || v.type || v.salary

  const sel = (k, label, opts) => (
    <select key={k} aria-label={label} className="input" value={v[k]} onChange={set(k)}>
      <option value="">{label}</option>
      {opts.map(o => (Array.isArray(o) ? <option key={o[0]} value={o[0]}>{o[1]}</option> : <option key={o}>{o}</option>))}
    </select>
  )

  return (
    <form onSubmit={e => { e.preventDefault(); onSearch(v) }} className="card space-y-3 p-4 shadow-lift">
      <div className="flex flex-col gap-3 sm:flex-row">
        {withKind && (
          <select aria-label="Search in" className="input sm:w-40" value={v.kind} onChange={set('kind')}>
            <option value="jobs">Jobs</option>
            <option value="internships">Internships</option>
          </select>
        )}
        <div className="relative flex-1">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            aria-label="Search jobs or internships"
            className="input pl-10"
            placeholder="Job title, company or skill…"
            value={v.q}
            onChange={set('q')}
          />
        </div>
        <button className="btn-primary sm:w-36" type="submit"><Search size={16} />Search</button>
      </div>

      <p className="flex items-center gap-1.5 pt-1 text-xs font-semibold uppercase tracking-wider text-muted">
        <SlidersHorizontal size={14} />Filters
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sel('location', 'Location', locations)}
        {sel('category', 'Category', categories)}
        {types.length > 0 ? sel('type', 'Type', types) : <div key="type-spacer" className="hidden lg:block" />}
        {sel('salary', 'Salary', salaryRanges)}
      </div>

      {dirty && (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:underline"
          onClick={() => { const c = { ...v, q: '', location: '', category: '', type: '', salary: '' }; setV(c); onSearch(c) }}
        >
          <X size={14} />Clear all filters
        </button>
      )}
    </form>
  )
}

