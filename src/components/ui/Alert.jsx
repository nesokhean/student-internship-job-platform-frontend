import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'

const tones = {
  error: { cls: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/30', Icon: XCircle },
  success: { cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30', Icon: CheckCircle2 },
  warning: { cls: 'bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30', Icon: AlertTriangle },
  info: { cls: 'bg-primary-50 text-primary ring-primary/20', Icon: Info },
}

/** Inline feedback message. `error` gets role="alert" for accessibility. */
export default function Alert({ tone = 'error', children, className = '' }) {
  const { cls, Icon } = tones[tone] || tones.error
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium ring-1 ring-inset ${cls} ${className}`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <span className="min-w-0 flex-1-">{children}</span>
    </div>
  )
}
