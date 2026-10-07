import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'


export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      aria-pressed={isDark}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition duration-200 hover:border-primary/40 hover:text-primary hover:shadow-soft ${className}`}
    >
      <Sun
        size={17}
        className={`absolute transition duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
      />
      <Moon
        size={17}
        className={`absolute transition duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
      />
    </button>
  )
}
