import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
        <Compass size={30} />
      </span>
      <p className="gradient-text mt-6 font-display text-6xl font-extrabold">404</p>
      <h1 className="mt-2 font-display text-2xl font-extrabold text-heading">Page not found</h1>
      <p className="mt-2 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary"><Home size={16} />Go home</Link>
        <Link to="/jobs" className="btn-ghost">Browse jobs</Link>
      </div>
    </div>
  )
}

