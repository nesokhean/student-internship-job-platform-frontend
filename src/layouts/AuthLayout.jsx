import { Outlet, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import BrandLogo from '../components/BrandLogo.jsx'


const HERO_IMAGE = '/images/auth-hero.svg'

const perks = [
  'Apply to verified Cambodian employers',
  'Track every application in one place',
  'Free for students, always',
]

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative isolate flex flex-col overflow-hidden bg-dark text-white">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-dark/85 to-[#172554]/90" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-accent/30 mix-blend-soft-light" />

        <div className="relative flex flex-1 flex-col justify-between p-7 sm:p-10 lg:p-12">
          <Link to="/" className="inline-flex items-center gap-2.5 self-start">
            <BrandLogo markClass="h-10 w-10" textClass="text-xl" tone="light" />
          </Link>
          <div className="flex flex-1 items-center py-10">
            <div className="max-w-md">
              <h2 className="font-display text-4xl font-extrabold leading-tight text-white">
                Your first career step starts here.
              </h2>
              <p className="mt-4 text-slate-200">
                Internships and graduate jobs at companies across Phnom Penh, Siem Reap and Battambang.
              </p>
              <ul className="mt-8 space-y-3">
                {perks.map(perk => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 size={18} className="shrink-0 text-primary" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-sm text-slate-300/80">© {new Date().getFullYear()} KhmerCareer</p>
        </div>
      </section>

      {/* Right: the auth card, unchanged */}
      <div className="relative flex items-center justify-center overflow-hidden bg-surface-2 p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative w-full max-w-md animate-fade-up">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
