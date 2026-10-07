import { Link } from 'react-router-dom'
import { MapPin, Building2, ArrowRight } from 'lucide-react'
import { Logo } from './JobCard.jsx'
import { jobs } from '../data/jobs.js'
import { internships } from '../data/internships.js'

export default function CompanyCard({ company }) {
  const n = jobs.filter(j => j.companyId === company.id).length + internships.filter(j => j.companyId === company.id).length
  return (
    <article className="group card card-hover flex flex-col items-center p-6 text-center">
      {/* Logo tile: 76px (h-[4.75rem] = 76px), with the monogram fallback scaled to match */}
      <Logo company={company} size="h-[4.75rem] w-[4.75rem]" initialClass="text-2xl" />
      <h3 className="mt-3 font-display text-lg font-bold text-heading">{company.name}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><Building2 size={14} />{company.industry}</p>
      <p className="flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} />{company.location}</p>
      <span className="badge badge-neutral mt-3">{n} open {n === 1 ? 'role' : 'roles'}</span>
      <Link to={`/companies/${company.id}`} className="btn-ghost btn-sm mt-4 w-full">
        View company <ArrowRight size={14} />
      </Link>
    </article>
  )
}