import { companies } from '../data/companies.js'

export const roleHome = role => ({ student: '/student/dashboard', company: '/company/dashboard', admin: '/admin/dashboard' }[role] || '/')
export const roleLabel = role => ({ student: 'Student', company: 'Company', admin: 'Administrator' }[role] || 'Account')

/* Badge tones: soft tint + inset ring, with a dark-mode counterpart so the
   same string works in both themes (see components/ui/Badge.jsx). */
const amber = 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/25'
const emerald = 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/25'
const red = 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/25'

const tones = {
  Pending: amber,
  'Under Review': amber,
  pending: amber,
  Accepted: emerald,
  approved: emerald,
  active: emerald,
  Rejected: red,
  blocked: red,
  removed: red,
}

export const statusTone = value => tones[value] || 'bg-surface-2 text-muted ring-line'

export const locations = ['Phnom Penh', 'Siem Reap', 'Battambang', 'Remote']

export const categories = ['Technology', 'Marketing', 'Finance', 'Design', 'Business', 'Education', 'Logistics']
export const salaryRanges = [['0-500', 'Up to $500'], ['500-1000', '$500 – $1,000'], ['1000-99999', '$1,000+']]

export const getCompany = id => companies.find(c => c.id === Number(id))
export const fmtDate = d => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
export const daysAgo = n => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10)
export const pay = i => (i.max ? `$${i.min.toLocaleString()} – $${i.max.toLocaleString()}/mo` : 'Unpaid')

export function details(title, skills, internship) {
  return {
    desc: `We are looking for a motivated ${title.toLowerCase()} to join our team in Cambodia. ${internship ? 'You will learn from experienced mentors and work on real projects from week one.' : 'You will own meaningful work and grow alongside a supportive team.'}`,
    req: ['Final-year student or recent graduate in a related field', `Working knowledge of ${skills.slice(0, 2).join(' and ')}`, 'Good communication in Khmer and English', 'Eager to learn and take feedback'],
    resp: ['Support the team with day-to-day tasks and projects', `Apply ${skills[0]} in real work`, 'Join planning meetings and share progress updates', 'Document your work and suggest improvements'],
  }
}

export function filterItems(items, { q = '', location = '', category = '', type = '', salary = '' }) {
  const s = q.trim().toLowerCase()
  const [lo, hi] = salary ? salary.split('-').map(Number) : [0, Infinity]
  return items.filter(i => {
    const c = getCompany(i.companyId)
    return (!s || [i.title, c.name, ...i.skills].join(' ').toLowerCase().includes(s))
      && (!location || i.location === location) && (!category || i.category === category)
      && (!type || i.type === type) && i.max >= lo && i.min <= hi
  })
}

export function sortItems(items, sort) {
  const a = [...items]
  if (sort === 'salary') return a.sort((x, y) => y.max - x.max)
  if (sort === 'title') return a.sort((x, y) => x.title.localeCompare(y.title))
  return a.sort((x, y) => new Date(y.posted) - new Date(x.posted))
}
