import { useState } from 'react'
import { Search } from 'lucide-react'
import CompanyCard from '../components/CompanyCard.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { companies } from '../data/companies.js'
export default function Companies() {
  const [q, setQ] = useState('')
  const list = companies.filter(c => (c.name + c.industry + c.location).toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <PageHeader eyebrow="Directory" title="Companies hiring students" description="Explore employers and see their open roles." />
      <div className="relative mt-6 max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input className="input pl-9" placeholder="Search by name, industry or city" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {list.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map(c => <CompanyCard key={c.id} company={c} />)}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState icon={Search} title={`No companies match “${q}”`} description="Try a different name, industry or city." />
        </div>
      )}
    </div>
  )
}
