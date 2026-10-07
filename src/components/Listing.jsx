import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import JobCard from './JobCard.jsx'
import Pagination from './Pagination.jsx'
import EmptyState from './ui/EmptyState.jsx'
import { SkeletonCards } from './ui/Skeleton.jsx'
import { filterItems, sortItems } from '../utils/helpers.js'

const PAGE = 6

export default function Listing({ kind, title, subtitle, items, types }) {
  const [sp, setSp] = useSearchParams()
  const f = Object.fromEntries(sp)
  const [sort, setSort] = useState('new')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [sp.toString()])

  const res = sortItems(filterItems(items, f), sort)
  const shown = res.slice((page - 1) * PAGE, page * PAGE)

  const search = v => {
    const p = {}
    ;['q', 'location', 'category', 'type', 'salary'].forEach(k => v[k] && (p[k] = v[k]))
    setSp(p)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-heading sm:text-4xl">{title}</h1>
        <p className="mt-2 text-muted">{subtitle}</p>
      </header>

      <SearchBar key={sp.toString()} initial={f} types={types} onSearch={search} />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">
          {loading ? 'Searching…' : `${res.length} result${res.length === 1 ? '' : 's'}`}
        </p>
        <select aria-label="Sort" className="input w-auto" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="new">Newest first</option>
          <option value="salary">Highest pay</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      <div className="mt-4">
        {loading ? (
          <SkeletonCards count={6} />
        ) : res.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No matches found"
            description="Try a different keyword or clear some filters to see more roles."
            action={<button className="btn-primary" onClick={() => search({})}>Clear filters</button>}
          />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {shown.map(i => <JobCard key={i.id} item={i} kind={kind} />)}
            </div>
            <Pagination
              page={page}
              pages={Math.ceil(res.length / PAGE)}
              onChange={setPage}
              total={res.length}
              perPage={PAGE}
              label={kind}
            />
          </>
        )}
      </div>
    </div>
  )
}

