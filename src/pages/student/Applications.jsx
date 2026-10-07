import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Inbox } from 'lucide-react'
import Loading from '../../components/Loading.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Alert from '../../components/ui/Alert.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import api, { listOf, messageOf } from '../../services/api.js'
import { fmtDate, statusTone } from '../../utils/helpers.js'

export default function StudentApplications() {
  const [state, setState] = useState({ loading: true, error: '', rows: [] })

  useEffect(() => {
    let active = true
    api.get('/student/applications')
      .then(res => { if (active) setState({ loading: false, error: '', rows: listOf(res) }) })
      .catch(error => { if (active) setState({ loading: false, error: messageOf(error), rows: [] }) })
    return () => { active = false }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Student"
        title="My applications"
        description="Track every job and internship you have applied to."
      >
        <Link to="/student/jobs" className="btn-primary">Find a job</Link>
      </PageHeader>

      {state.loading ? <Loading label="Loading your applications…" /> : state.error ? (
        <Alert tone="error">{state.error}</Alert>
      ) : state.rows.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="You have not applied for any jobs yet"
          description="Browse open roles and send your first application."
          action={<Link to="/student/jobs" className="btn-primary">Find a job</Link>}
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-line bg-surface-2/60 text-left text-xs font-bold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3.5">Job</th>
                  <th className="px-5 py-3.5">Company</th>
                  <th className="px-5 py-3.5">Applied date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {state.rows.map(row => {
                  const jobId = row.job?.id ?? row.job_id
                  return (
                    <tr key={row.id} className="transition hover:bg-surface-2/60">
                      <td className="px-5 py-4 font-semibold text-heading">{row.job?.title || row.title || 'Job'}</td>
                      <td className="px-5 py-4 text-muted">{row.job?.company?.name || row.company || '—'}</td>
                      <td className="px-5 py-4 text-muted">{row.created_at ? fmtDate(row.created_at) : '—'}</td>
                      <td className="px-5 py-4"><Badge tone={statusTone(row.status)} dot>{row.status}</Badge></td>
                      <td className="px-5 py-4 text-right">
                        {jobId ? (
                          <Link to={`/student/jobs/${jobId}`} className="font-semibold text-primary hover:underline">View job</Link>
                        ) : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
