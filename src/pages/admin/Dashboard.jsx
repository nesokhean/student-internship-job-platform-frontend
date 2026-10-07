import { useEffect, useState } from 'react'
import { Briefcase, Building2, ClipboardList, Users } from 'lucide-react'
import Loading from '../../components/Loading.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import Alert from '../../components/ui/Alert.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import api, { messageOf, recordOf } from '../../services/api.js'

const cards = [
  { key: 'students', label: 'Total students', icon: Users, tone: 'from-primary to-secondary' },
  { key: 'companies', label: 'Total companies', icon: Building2, tone: 'from-accent to-primary-600' },
  { key: 'jobs', label: 'Total jobs', icon: Briefcase, tone: 'from-slate-700 to-slate-900' },
  { key: 'applications', label: 'Total applications', icon: ClipboardList, tone: 'from-primary-600 to-accent' },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const [state, setState] = useState({ loading: true, error: '', stats: {} })

  useEffect(() => {
    let active = true
    api.get('/admin/dashboard')
      .then(res => { if (active) setState({ loading: false, error: '', stats: recordOf(res) || {} }) })
      .catch(error => { if (active) setState({ loading: false, error: messageOf(error), stats: {} }) })
    return () => { active = false }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="Administration"
        description={`Signed in as ${user?.name || user?.email}.`}
      />

      {state.loading ? <Loading label="Loading statistics…" /> : state.error ? (
        <Alert tone="error">{state.error}</Alert>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ key, label, icon, tone }) => (
            <StatCard key={key} label={label} value={state.stats[key] ?? 0} icon={icon} tone={tone} />
          ))}
        </section>
      )}
    </div>
  )
}