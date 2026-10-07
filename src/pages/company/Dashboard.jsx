import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Clock, Users } from 'lucide-react'
import Loading from '../../components/Loading.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Alert from '../../components/ui/Alert.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import api, { listOf, messageOf } from '../../services/api.js'
import { fmtDate, statusTone } from '../../utils/helpers.js'

export default function CompanyDashboard() {
  const { user } = useAuth()
  const [state, setState] = useState({ loading: true, error: '', jobs: [], applications: [] })

  useEffect(() => {
    let active = true
    Promise.all([api.get('/company/jobs'), api.get('/company/applications')])
      .then(([jobsRes, appsRes]) => {
        if (active) setState({ loading: false, error: '', jobs: listOf(jobsRes), applications: listOf(appsRes) })
      })
      .catch(error => { if (active) setState({ loading: false, error: messageOf(error), jobs: [], applications: [] }) })
    return () => { active = false }
  }, [])

  const pending = state.applications.filter(a => a.status === 'Pending').length
  const cards = [
    { key: 'jobs', label: 'Job postings', value: state.jobs.length, icon: Briefcase, tone: 'from-primary to-secondary' },
    { key: 'applicants', label: 'Applicants', value: state.applications.length, icon: Users, tone: 'from-accent to-primary-600' },
    { key: 'pending', label: 'Pending review', value: pending, icon: Clock, tone: 'from-amber-400 to-orange-500' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Company"
        title={user?.company_name || user?.name || 'Company'}
        description="Publish openings and review the students who apply."
      >
        <Link to="/" className="btn-ghost">View public site</Link>
        <Link to="/company/dashboard" className="btn-primary">Overview</Link>
      </PageHeader>

      {state.loading ? <Loading label="Loading your dashboard…" /> : state.error ? (
        <Alert tone="error">{state.error}</Alert>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-3">
            {cards.map(({ key, label, value, icon, tone }) => (
              <StatCard key={key} label={label} value={value} icon={icon} tone={tone} />
            ))}
          </section>

          {state.applications.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No applications yet"
              description="Once students apply to your openings they will appear here."
            />
          ) : (
            <section className="card p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold text-heading">Recent applicants</h2>
                <Link to="/company/dashboard" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2">
                  View all <ArrowRight size={15} />
                </Link>
              </div>
              <ul className="mt-3 divide-y divide-line">
                {state.applications.slice(0, 5).map(row => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-heading">{row.student?.name || row.student_name || 'Student'}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {row.job?.title || row.job_title || 'Job'}{row.created_at ? ` · ${fmtDate(row.created_at)}` : ''}
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
