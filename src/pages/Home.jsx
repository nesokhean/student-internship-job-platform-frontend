import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  Landmark,
  Laptop,
  Megaphone,
  Palette,
  Search,
  Send,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import JobCard, { Logo } from '../components/JobCard.jsx'
import InternshipCard from '../components/InternshipCard.jsx'
import CompanyCard from '../components/CompanyCard.jsx'
import { jobs } from '../data/jobs.js'
import { internships } from '../data/internships.js'
import { companies } from '../data/companies.js'
import { getCompany, pay } from '../utils/helpers.js'

const icons = { Technology: Laptop, Marketing: Megaphone, Finance: Landmark, Design: Palette, Business: Briefcase, Education: GraduationCap, Logistics: Truck }

const steps = [
  [Search, 'Search', 'Filter by location, field and pay to find roles that fit your schedule.'],
  [FileText, 'Build your profile', 'Add your education, skills and CV once, then reuse them everywhere.'],
  [Send, 'Apply', 'Send applications in one click and follow their status.'],
]

const openRoles = jobs.length + internships.length
const tabs = [['jobs', 'Jobs'], ['internships', 'Internships']]

/* Small eyebrow + title header shared by every section on the page. */
function SectionHead({ eyebrow, title, to, cta = 'View all' }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            <Sparkles size={13} />{eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-extrabold text-heading sm:text-3xl">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2">
          {cta} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}

/* Hero artwork: the "job vacancy" announcement artwork, anchored by a live-openings card. */
function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-2xl" />
      <div className="animate-float pointer-events-none absolute -left-6 -top-8 h-24 w-24 rounded-full bg-primary/25 blur-2xl" />
      <div className="animate-float pointer-events-none absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-accent/20 blur-2xl" style={{ animationDelay: '-4s' }} />

      {/* Announcement artwork: public/images/hero-vacancy.svg */}
      <figure className="animate-fade-up relative overflow-hidden rounded-[1.75rem] border border-line bg-surface-2 shadow-lift">
        <img
          src="/images/hero-vacancy.svg"
          alt="Megaphone announcing a job vacancy sign above a city skyline"
          width="1200"
          height="800"
          draggable="false"
          className="block h-auto w-full select-none hero-duotone"
        />
      </figure>

      <div className="card relative -mt-8 animate-fade-up p-5 shadow-lift">
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live openings
          </p>
          <span className="tag">{openRoles} roles</span>
        </div>

        <ul className="mt-4 space-y-3">
          {jobs.slice(0, 2).map(j => {
            const c = getCompany(j.companyId)
            return (
              <li key={j.id} className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2/60 p-3 transition hover:border-primary/30">
                <Logo company={c} size="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-heading">{j.title}</p>
                  <p className="truncate text-xs text-muted">{c.name}</p>
                </div>
                <span className="hidden text-xs font-semibold text-primary sm:block">{pay(j)}</span>
              </li>
            )
          })}
        </ul>

        <Link to="/jobs" className="mt-4 flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-600">
          Browse all jobs <ArrowRight size={16} />
        </Link>
      </div>

      <div className="card absolute -bottom-6 -right-4 hidden items-center gap-2.5 p-3 shadow-lift sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300">
          <CheckCircle2 size={18} />
        </span>
        <div>
          <p className="text-xs font-bold text-heading">Application sent</p>
          <p className="text-[11px] text-muted">Angkor Digital · just now</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const nav = useNavigate()
  const go = v => {
    const p = new URLSearchParams()
    ;['q', 'location', 'category', 'salary'].forEach(k => v[k] && p.set(k, v[k]))
    nav(`/${v.kind}?${p}`)
  }
  const [tab, setTab] = useState('jobs')
  const list = tab === 'jobs' ? jobs.slice(0, 3) : internships.slice(0, 3)

  return (<>
    {/* ---------- Hero: light, editorial split with a live "openings" preview ---------- */}
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-48 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: 'linear-gradient(to right, color-mix(in oklab, var(--color-line) 90%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-line) 90%, transparent) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(72% 62% at 50% 34%, #000 22%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(72% 62% at 50% 34%, #000 22%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Sparkles size={14} />Internships &amp; first jobs across Cambodia
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] text-heading sm:text-5xl xl:text-[3.6rem]">
            Where students start <span className="gradient-text">real careers</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            Discover internships and entry-level roles from trusted Cambodian employers — and apply in minutes, not days.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link to="/jobs" className="btn-primary btn-lg"><Search size={17} />Browse jobs</Link>
            <Link to="/register" className="btn-ghost btn-lg">Create free profile<ArrowRight size={17} /></Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {companies.slice(0, 4).map(c => (
                  <span key={c.id} className="grid h-9 w-9 place-items-center rounded-full font-display text-xs font-extrabold text-white ring-2 ring-surface" style={{ background: c.color }}>{c.name[0]}</span>
                ))}
              </div>
              <p className="text-sm text-muted"><span className="font-bold text-heading">12,000+</span> students already joined</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex text-gold">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={15} fill="currentColor" />)}</span>
              <p className="text-sm text-muted"><span className="font-bold text-heading">4.9</span>/5 student rating</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in">
          <HeroPreview />
        </div>
      </div>
    </section>
    {/* Search overlaps the hero seam so the CTA feels lifted off the page. */}
    <div className="relative z-10 mx-auto -mt-9 max-w-7xl px-4">
      <SearchBar withKind onSearch={go} />
    </div>
    {/* ---------- Hiring-now strip: two identical tracks slide left for a seamless loop ---------- */}
    <section className="mt-20 border-y border-line bg-surface py-8">
      <p className="px-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-muted">Companies hiring students right now</p>
      <div
        className="group relative mt-6 flex overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)' }}
      >
        {[0, 1].map(track => (
          <div
            key={track}
            aria-hidden={track === 1}
            className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]"
          >
            {companies.map(c => (
              <span key={c.id} className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-line bg-surface-2 px-4 py-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-extrabold text-white" style={{ background: c.color }}>{c.name[0]}</span>
                <span className="text-sm font-semibold text-heading">{c.name}</span>
                <span className="hidden text-xs text-muted sm:inline">· {c.industry}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-20">
      {/* ---------- Categories ---------- */}
      <section>
        <SectionHead eyebrow="Explore by field" title="Popular categories" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(icons).map(([n, I]) => (
            <CategoryCard key={n} name={n} icon={I} count={jobs.filter(j => j.category === n).length + internships.filter(j => j.category === n).length} />
          ))}
        </div>
      </section>

      {/* ---------- Featured roles: switch between jobs and internships ---------- */}
      <section>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary"><Sparkles size={13} />Handpicked</p>
            <h2 className="font-display text-2xl font-extrabold text-heading sm:text-3xl">Featured roles</h2>
          </div>
          <div className="inline-flex rounded-full border border-line bg-surface p-1 shadow-soft" role="tablist" aria-label="Role type">
            {tabs.map(([k, l]) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition duration-200 ${tab === k ? 'bg-primary text-white shadow-glow' : 'text-muted hover:text-heading'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map(j => (tab === 'jobs' ? <JobCard key={j.id} item={j} /> : <InternshipCard key={j.id} item={j} />))}
        </div>
        <div className="mt-8 text-center">
          <Link to={`/${tab}`} className="btn-ghost">View all {tab}<ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section>
        <SectionHead eyebrow="Simple process" title="How it works" />
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(([I, t, d], i) => (
            <div key={t} className="group card card-hover relative overflow-hidden p-6">
              <span className="absolute right-5 top-3 font-display text-5xl font-extrabold text-line/70 transition duration-300 group-hover:text-primary/15">{i + 1}</span>
              <span className="relative inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow"><I size={22} /></span>
              <h3 className="relative mt-4 font-display text-lg font-bold text-heading">{t}</h3>
              <p className="relative mt-1.5 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Companies ---------- */}
      <section>
        <SectionHead eyebrow="Top employers" title="Popular companies" to="/companies" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.slice(0, 4).map(c => <CompanyCard key={c.id} company={c} />)}
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="cta-panel relative overflow-hidden rounded-[2rem] bg-dark px-6 py-16 text-center text-white">
        <div className="aurora pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_120%,rgb(37_99_235/0.35)_0%,transparent_70%)]" />
        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Ready to apply?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">Create a free student profile in under two minutes and start applying today.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="btn bg-white text-dark shadow-lift hover:-translate-y-0.5">Create account</Link>
            <Link to="/jobs" className="btn border border-white/40 text-white hover:bg-white/10">Browse jobs</Link>
          </div>
          <p className="mt-6 text-xs text-slate-400">Free for students, always.</p>
        </div>
      </section>
    </div>
  </>)
}
