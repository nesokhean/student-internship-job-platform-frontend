import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Briefcase, Building2, ClipboardList, LayoutDashboard, LogOut, Menu, User, Users, X } from 'lucide-react'
import BrandLogo from '../components/BrandLogo.jsx'
import Sidebar from '../components/Sidebar.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { roleLabel } from '../utils/helpers.js'

const NAV = {
  student: [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/student/profile', label: 'My profile', icon: User },
    { to: '/student/jobs', label: 'Browse jobs', icon: Briefcase },
    { to: '/student/applications', label: 'Applications', icon: ClipboardList },
    { to: '/student/cv', label: 'Upload CV', icon: ClipboardList, soon: true },
  ],
  company: [
    { to: '/company/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/company/profile', label: 'Company profile', icon: Building2, soon: true },
    { to: '/company/jobs', label: 'Job postings', icon: Briefcase, soon: true },
    { to: '/company/applicants', label: 'Applicants', icon: Users, soon: true },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/students', label: 'Students', icon: Users, soon: true },
    { to: '/admin/companies', label: 'Companies', icon: Building2, soon: true },
    { to: '/admin/jobs', label: 'Jobs', icon: Briefcase, soon: true },
    { to: '/admin/applications', label: 'Applications', icon: ClipboardList, soon: true },
  ],
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const items = NAV[user?.role] || []

  const signOut = async () => {
    await logout()
    nav('/')
  }

  return (
    <div className="min-h-screen bg-surface-2">
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <button className="btn-ghost btn-icon lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
            <Link to="/" aria-label="KhmerCareer" className="flex items-center gap-2.5">
              <BrandLogo markClass="h-9 w-9 shadow-glow" textClass="hidden text-lg sm:block" />
            </Link>
            {user?.role && (
              <span className="hidden rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20 sm:inline">
                {roleLabel(user.role)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden items-center gap-2 rounded-xl border border-line bg-surface py-1 pl-1 pr-3 sm:flex">
              <Avatar name={user?.name || user?.email} size="h-7 w-7" />
              <span className="max-w-[10rem] truncate text-sm font-semibold text-heading">{user?.name || user?.email}</span>
            </span>
            <button className="btn-ghost btn-icon" onClick={signOut} aria-label="Log out" title="Log out">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:py-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-card border border-line bg-surface p-3 shadow-soft">
            <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Menu</p>
            <Sidebar items={items} />
          </div>
        </aside>
        <main className="min-w-0 flex-1 animate-fade-in">
          <Outlet />
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72 max-w-full animate-fade-in border-r border-line bg-surface p-4 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display font-extrabold text-heading">Menu</span>
              <button className="btn-ghost btn-icon" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <Sidebar items={items} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
