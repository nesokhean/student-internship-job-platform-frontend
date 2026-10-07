import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function CategoryCard({ name, icon: Icon, count }) {
  return (
    <Link to={`/jobs?category=${name}`} className="group card card-hover flex items-center gap-3.5 p-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 text-primary ring-1 ring-inset ring-primary/15 transition duration-300 group-hover:from-primary group-hover:to-secondary group-hover:text-white">
        <Icon size={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display font-bold text-heading">{name}</span>
        <span className="text-sm text-muted">{count} openings</span>
      </span>
      <ArrowUpRight
        size={18}
        className="shrink-0 text-muted opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
      />
    </Link>
  )
}