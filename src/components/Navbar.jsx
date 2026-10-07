import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import Avatar from './ui/Avatar.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { roleHome } from '../utils/helpers.js'

const links = [['/', 'Home'], ['/jobs', 'Jobs'], ['/internships', 'Internships'], ['/companies', 'Companies']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const nav = useNavigate()

  const cls = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 ${
      isActive ? 'bg-primary-50 text-primary' : 'text-muted hover:bg-surface-2 hover:text-heading'
    }`

  const signOut = async () => {
    setOpen(false)
    await logout()
    nav('/')
  }

  return (
    <header className="glass sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <BrandLogo markClass="h-9 w-9 shadow-glow transition duration-300 group-hover:-rotate-6" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={cls}>{label}</NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Link to={roleHome(user.role)} className="btn-ghost btn-sm">
                <LayoutDashboard size={15} />Dashboard
              </Link>
              <Link
                to={user.role === 'student' ? '/student/profile' : roleHome(user.role)}
                className="flex items-center gap-2 rounded-xl border border-line bg-surface py-1 pl-1 pr-3 transition duration-200 hover:border-primary/40 hover:shadow-soft"
              >
                <Avatar name={user.name || user.email} size="h-7 w-7" />
                <span className="max-w-[9rem] truncate text-sm font-semibold text-heading">
                  {(user.name || user.email || 'Account').split(' ')[0]}
                </span>
              </Link>
              <button onClick={signOut} aria-label="Log out" title="Log out" className="btn-ghost btn-icon">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Log in</Link>
              <Link to="/register" className="btn-primary">Get started</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="btn-ghost btn-icon" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in space-y-1 border-t border-line bg-surface p-4 md:hidden">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={cls} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <div className="my-2 border-t border-line" />
          {user ? (
            <>
              <NavLink to={roleHome(user.role)} className={cls} onClick={() => setOpen(false)}>Dashboard</NavLink>
              {user.role === 'student' && (
                <>
                  <NavLink to="/student/profile" className={cls} onClick={() => setOpen(false)}>My profile</NavLink>
                  <NavLink to="/student/applications" className={cls} onClick={() => setOpen(false)}>My applications</NavLink>
                </>
              )}
              <button onClick={signOut} className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600">Log out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={cls} onClick={() => setOpen(false)}>Log in</NavLink>
              <NavLink to="/register" className={cls} onClick={() => setOpen(false)}>Create account</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  )
}
