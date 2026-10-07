import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const GAP = '…'

/**
 * Builds the visible page slots: always the first + last page, the current page
 * and one neighbour on each side, with `…` markers where numbers are skipped.
 */
function slots(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
  const keep = new Set([1, pages, page, page - 1, page + 1])
  const nums = [...keep].filter(p => p >= 1 && p <= pages).sort((a, b) => a - b)
  const out = []
  nums.forEach((p, i) => {
    if (i > 0 && p - nums[i - 1] > 1) out.push(`gap-${nums[i - 1]}`)
    out.push(p)
  })
  return out
}

const icon = 'h-9 w-9 shrink-0 place-items-center rounded-xl text-muted transition duration-200 hover:bg-primary-50 hover:text-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30'
const numBase = 'grid h-9 min-w-9 place-items-center rounded-xl px-2 text-sm font-semibold transition duration-200'
const num = `${numBase} text-ink hover:bg-primary-50 hover:text-primary`
const active = `${numBase} bg-gradient-to-br from-primary to-secondary text-white shadow-glow ring-1 ring-inset ring-white/25`

/**
 * Segmented page switcher. Optional `total` + `perPage` add a result-range
 * caption underneath (e.g. "Showing 1–6 of 14 results").
 */
export default function Pagination({ page, pages, onChange, total, perPage, label = 'results', className = '' }) {
  if (pages <= 1) return null

  const go = p => () => onChange(Math.min(Math.max(p, 1), pages))
  const numbered = typeof total === 'number' && perPage
  const from = numbered ? (page - 1) * perPage + 1 : 0
  const to = numbered ? Math.min(page * perPage, total) : 0

  return (
    <nav aria-label="Pagination" className={`mt-10 flex flex-col items-center gap-3 ${className}`}>
      <div className="inline-flex items-center gap-1 rounded-2xl border border-line bg-surface/80 p-1.5 shadow-soft backdrop-blur-xl">
        <button type="button" className={`${icon} hidden sm:grid`} onClick={go(1)} disabled={page === 1} aria-label="First page">
          <ChevronsLeft size={17} />
        </button>
        <button type="button" className={`${icon} grid`} onClick={go(page - 1)} disabled={page === 1} aria-label="Previous page">
          <ChevronLeft size={17} />
        </button>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line sm:block" />

        <div className="hidden items-center gap-1 sm:flex">
          {slots(page, pages).map(item =>
            typeof item === 'number' ? (
              <button
                key={item}
                type="button"
                onClick={go(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Page ${item}`}
                className={`${num} ${item === page ? `${active} animate-pop` : ''}`}
              >
                {item}
              </button>
            ) : (
              <span key={item} className="grid h-9 w-6 place-items-center text-sm font-semibold text-muted" aria-hidden="true">
                {GAP}
              </span>
            )
          )}
        </div>

        <span className="px-3 text-sm font-semibold text-heading sm:hidden">
          Page {page} <span className="font-medium text-muted">/ {pages}</span>
        </span>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line sm:block" />

        <button type="button" className={`${icon} grid`} onClick={go(page + 1)} disabled={page === pages} aria-label="Next page">
          <ChevronRight size={17} />
        </button>
        <button type="button" className={`${icon} hidden sm:grid`} onClick={go(pages)} disabled={page === pages} aria-label="Last page">
          <ChevronsRight size={17} />
        </button>
      </div>

      {numbered && (
        <p className="text-xs font-medium text-muted">
          Showing <span className="font-semibold text-heading">{from}–{to}</span> of{' '}
          <span className="font-semibold text-heading">{total}</span> {label}
        </p>
      )}
    </nav>
  )
}

