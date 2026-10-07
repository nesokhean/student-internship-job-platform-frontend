import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ClipboardList, Clock, XCircle } from 'lucide-react'
import Loading from '../../components/Loading.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Alert from '../../components/ui/Alert.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import api, { listOf, messageOf } from '../../services/api.js'
import { fmtDate, statusTone } from '../../utils/helpers.js'

const cards = [
  { key: 'total', label: 'Applications', icon: ClipboardList, tone: 'from-primary to-secondary' },
  { key: 'Pending', label: 'Pending', icon: Clock, tone: 'from-amber-400 to-orange-500' },
  { key: 'Accepted', label: 'Accepted', icon: CheckCircle2, tone: 'from-emerald-400 to-teal-500' },
  { key: 'Rejected', label: 'Rejected', icon: XCircle, tone: 'from-rose-400 to-red-500' },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const [state, setState] = useState({ loading: true, error: '', applications: [] })

  useEffect(() => {
    let active = true
    api.get('/student/applications')
      .then(res => { if (active) setState({ loading: false, error: '', applications: listOf(res) }) })
      .catch(error => { if (active) setState({ loading: false, error: messageOf(error), applications: [] }) })
    return () => { active = false }
  }, [])

  const count = key => key === 'total' ? state.applications.length : state.applications.filter(a => a.status === key).length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Student"
        title={`Welcome back, ${user?.name || 'student'}`}
        description={user?.email}
      >
        <Link to="/student/jobs" className="btn-primary">Browse jobs</Link>
        <Link to="/student/profile" className="btn-ghost">Update profile</Link>
      </PageHeader>

      {state.loading ? <Loading label="Loading your dashboard…" /> : state.error ? (
        <Alert tone="error">{state.error}</Alert>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ key, label, icon, tone }) => (
              <StatCard key={key} label={label} value={count(key)} icon={icon} tone={tone} />
            ))}
          </section>

          {state.applications.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No applications yet"
              description="Browse open roles and send your first application."
              action={<Link to="/student/jobs" className="btn-primary">Find a job</Link>}
            />
          ) : (
            <section className="card p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold text-heading">Recent applications</h2>
                <Link to="/student/applications" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2">
                  View all <ArrowRight size={15} />
                </Link>
              </div>
              <ul className="mt-3 divide-y divide-line">
                {state.applications.slice(0, 5).map(row => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-heading">{row.job?.title || row.title || 'Job'}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {row.job?.company?.name || row.company || ''}{row.created_at ? ` · Applied ${fmtDate(row.created_at)}` : ''}
                      </p>
                    </div>
                    <Badge tone={statusTone(row.status)} dot>{row.status}</Badge>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  )
}
