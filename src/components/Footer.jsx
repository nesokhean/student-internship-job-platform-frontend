import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Mail, MapPin } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'

/* Link groups — kept as data so the markup below stays one readable map. */
const EXPLORE = [
  { to: '/jobs', label: 'Jobs' },
  { to: '/internships', label: 'Internships' },
  { to: '/companies', label: 'Companies' },
]

const ACCOUNT = [
  { to: '/login', label: 'Log in' },
  { to: '/register', label: 'Create account' },
  { to: '/student/applications', label: 'My applications' },
]

/* Social / contact buttons. `http` links open in a new tab; `mailto:` must not. */
const SOCIAL = [
  { href: 'https://facebook.com/khmercareer', label: 'Facebook', Icon: Facebook },
  { href: 'https://linkedin.com/company/khmercareer', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:hello@khmercareer.com', label: 'Email', Icon: Mail },
]

/* One link column (Explore / Account): a real <nav> so screen readers can jump
   between the two groups, with the heading wired up via aria-labelledby. */
function LinkColumn({ id, title, links }) {
  return (
    <nav aria-labelledby={id} className="col-span-1 lg:col-span-3">
      <h2 id={id} className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="inline-block text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden text-slate-300">
      {/* Always-dark brand surface: a black -> deep-purple sweep ... */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,#0a0a0a_0%,#0b1220_45%,#132a5e_100%)]"
      />
      {/* ... plus two soft indigo/violet blooms so the black never reads as flat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(58%_58%_at_12%_8%,rgba(37,99,235,0.42),transparent_62%),radial-gradient(52%_52%_at_88%_0%,rgba(14,165,233,0.34),transparent_64%)]"
      />

      {/* 2-up on phones/tablets (brand on its own row, then the two link
          columns side by side) -> 6 / 3 / 3 on desktop. */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-16">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-6">
          <Link to="/" aria-label="KhmerCareer — home" className="group inline-flex items-center gap-2.5">
            <BrandLogo tone="light" markClass="h-9 w-9 shadow-glow transition duration-300 group-hover:-rotate-6" />
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Helping Cambodian university students find internships and first jobs with trusted local employers.
          </p>

          <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={15} aria-hidden="true" className="shrink-0 text-accent" />
            Phnom Penh, Cambodia
          </p>

          <div className="mt-5 flex items-center gap-2">
            {SOCIAL.map(({ href, label, Icon }) => {
              const isExternal = href.startsWith('http')
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-slate-300 ring-1 ring-inset ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:bg-primary/25 hover:text-white hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <LinkColumn id="footer-explore" title="Explore" links={EXPLORE} />
        <LinkColumn id="footer-account" title="Account" links={ACCOUNT} />
      </div>

      {/* Thin divider + centred copyright */}
      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} KhmerCareer. Built for Cambodian students.
        </p>
      </div>
    </footer>
  )
}
