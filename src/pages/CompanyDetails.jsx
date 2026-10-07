import { Link, useParams } from 'react-router-dom'
import { Building2, Globe, MapPin } from 'lucide-react'
import JobCard, { Logo } from '../components/JobCard.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import { getCompany } from '../utils/helpers.js'
import { jobs } from '../data/jobs.js'
import { internships } from '../data/internships.js'

const Section = ({ t, list, kind }) => list.length > 0 && (
  <section className="mt-10">
    <h2 className="mb-4 font-display text-xl font-bold text-heading">{t}</h2>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map(i => <JobCard key={i.id} item={i} kind={kind} />)}
    </div>
  </section>
)

export default function CompanyDetails() {
  const c = getCompany(useParams().id)
  if (!c) return (
    <div className="px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-heading">Company not found</h1>
      <Link to="/companies" className="btn-primary mt-6">View all companies</Link>
    </div>
  )
  const js = jobs.filter(j => j.companyId === c.id)
  const is = internships.filter(j => j.companyId === c.id)
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <section className="card relative overflow-hidden p-6">
        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <Logo company={c} size="h-20 w-20" />
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold text-heading">{c.name}</h1>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5"><Building2 size={14} />{c.industry}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{c.location}</span>
              <a href={`https://${c.website}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                <Globe size={14} />{c.website}
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="bg-primary-50 text-primary ring-primary/15">{js.length} jobs</Badge>
              <Badge tone="bg-primary-50 text-primary ring-primary/15">{is.length} internships</Badge>
            </div>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink">{c.about}</p>
          </div>
        </div>
      </section>

      {/* Our demo companies are fictional, so the map is centred on the city
          Google can actually resolve. Pass a street address (or "lat,lng")
          once the companies have real offices. */}
      <MapEmbed className="mt-6" query={`${c.location}, Cambodia`} />

      <Section t={`Jobs (${js.length})`} list={js} kind="jobs" />
      <Section t={`Internships (${is.length})`} list={is} kind="internships" />

      {!js.length && !is.length && (
        <div className="mt-10">
          <EmptyState icon={Building2} title="No open roles right now" description="Check back soon or explore other companies." />
        </div>
      )}
    </div>
  )
}
