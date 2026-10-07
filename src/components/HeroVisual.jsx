import { useEffect, useState } from 'react'
import {
  Bot,
  GraduationCap,
  Laptop,
  LayoutDashboard,
  MessagesSquare,
  Search,
  Smartphone,
  User,
} from 'lucide-react'

const ART_SRC = '/images/hero-network.png'

const VIEW_W = 100
const VIEW_H = 71

const ART_NODES = [
  { id: 'i1', x: 30, y: 40, size: 15, icon: Laptop, tone: 'primary' },
  { id: 'i2', x: 53, y: 29, size: 10.5, icon: LayoutDashboard, tone: 'secondary' },
  { id: 'i3', x: 74, y: 43, size: 12, icon: Search, tone: 'accent' },
  { id: 'i4', x: 9, y: 53, size: 10, icon: Smartphone, tone: 'primary' },
  { id: 'i5', x: 23, y: 64, size: 12, icon: Bot, tone: 'secondary' },
  { id: 'i6', x: 47, y: 62, size: 14, icon: MessagesSquare, tone: 'primary' },
  { id: 'i7', x: 86, y: 19, size: 11, icon: GraduationCap, tone: 'gold' },
]

/* Small avatar hubs, mirroring the dark user discs of the artwork. */
const USER_NODES = [
  { id: 'u1', x: 50, y: 5, size: 7.5 },
  { id: 'u2', x: 8, y: 16, size: 6 },
  { id: 'u3', x: 70, y: 13, size: 6 },
  { id: 'u4', x: 13, y: 31, size: 5.5 },
  { id: 'u5', x: 89, y: 57, size: 6 },
  { id: 'u6', x: 36, y: 57, size: 5.5 },
  { id: 'u7', x: 62, y: 66, size: 5.5 },
  { id: 'u8', x: 16, y: 41, size: 5 },
]

const EDGES = [
  ['u1', 'u2'], ['u1', 'i2'], ['u1', 'u3'], ['u1', 'i1'],
  ['u2', 'u4'], ['u2', 'i4'], ['u2', 'i1'],
  ['u4', 'u8'], ['u4', 'i1'], ['u8', 'i4'],
  ['i1', 'i2'], ['i1', 'i6'], ['i1', 'i5'], ['i4', 'i5'],
  ['u3', 'i2'], ['u3', 'i7'], ['u3', 'i3'], ['i2', 'i3'],
  ['i7', 'i3'], ['i7', 'u5'], ['i3', 'u5'], ['i3', 'u7'],
  ['i3', 'i6'], ['i6', 'u7'], ['i6', 'u6'], ['i6', 'i5'], ['i5', 'u6'],
]

const NODE_AT = Object.fromEntries([...ART_NODES, ...USER_NODES].map(n => [n.id, n]))

const TONE = {
  primary: 'text-primary',
  secondary: 'text-primary-600',
  accent: 'text-accent',
  gold: 'text-gold',
}

const box = ({ x, y, size }) => ({
  left: `${(x / VIEW_W) * 100}%`,
  top: `${(y / VIEW_H) * 100}%`,
  width: `${(size / VIEW_W) * 100}%`,
  aspectRatio: '1 / 1',
})

function UserNode({ node }) {
  return (
    <span
      className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary p-[22%] text-white/85 shadow-glow ring-[3px] ring-white/10"
      style={box(node)}
    >
      <User className="h-full w-full" strokeWidth={2.2} />
    </span>
  )
}

function ArtNode({ node }) {
  const Icon = node.icon
  return (
    <span className="absolute -translate-x-1/2 -translate-y-1/2" style={box(node)}>
      <span className="absolute inset-[-14%] rounded-full bg-primary/30 blur-lg" />
      <span className="relative grid h-full w-full place-items-center rounded-full bg-white p-[24%] shadow-[0_18px_40px_-14px_rgba(2,6,23,0.9)] ring-1 ring-white/60">
        <Icon className={`h-full w-full ${TONE[node.tone]}`} strokeWidth={2} />
      </span>
    </span>
  )
}

/* Vector fallback: the same topology drawn with the brand gradient. */
function Mesh() {
  return (
    <>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="hero-mesh" x1="0" y1="0" x2={VIEW_W} y2={VIEW_H} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#hero-mesh)" strokeWidth="0.2" strokeLinecap="round">
          {EDGES.map(([a, b], i) => (
            <line
              key={`${a}-${b}`}
              x1={NODE_AT[a].x}
              y1={NODE_AT[a].y}
              x2={NODE_AT[b].x}
              y2={NODE_AT[b].y}
              opacity={i % 3 === 0 ? 0.9 : 0.45}
            />
          ))}
        </g>
        {/* junction dots sit exactly on their line midpoints */}
        <g fill="#60a5fa">
          {EDGES.filter((_, i) => i % 3 === 1).map(([a, b]) => (
            <circle
              key={`mid-${a}-${b}`}
              cx={(NODE_AT[a].x + NODE_AT[b].x) / 2}
              cy={(NODE_AT[a].y + NODE_AT[b].y) / 2}
              r="0.9"
              opacity="0.7"
            />
          ))}
        </g>
      </svg>
      {USER_NODES.map(n => <UserNode key={n.id} node={n} />)}
      {ART_NODES.map(n => <ArtNode key={n.id} node={n} />)}
    </>
  )
}

export default function HeroVisual() {
  const [hasArt, setHasArt] = useState(false)
  const [shown, setShown] = useState(false)


  useEffect(() => {
    let alive = true
    const probe = new Image()
    probe.onload = () => { if (alive) setHasArt(true) }
    probe.onerror = () => { if (alive) setHasArt(false) }
    probe.src = ART_SRC
    return () => { alive = false }
  }, [])

  return (
    <div className="relative">
      <div className="animate-float pointer-events-none absolute -left-6 -top-10 h-48 w-48 rounded-full bg-primary/35 blur-3xl" />
      <div
        className="animate-float pointer-events-none absolute -bottom-10 right-0 h-52 w-52 rounded-full bg-accent/25 blur-3xl"
        style={{ animationDelay: '-3.5s' }}
      />

      <div className="animate-breathe relative aspect-[7/5] w-full" aria-hidden="true">
        {!hasArt && <Mesh />}

        {hasArt && (
          <div className={`hero-art absolute inset-0 transition-opacity duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src={ART_SRC}
              alt=""
              draggable="false"
              onLoad={() => setShown(true)}
              className="h-full w-full select-none object-cover"
            />
            {/* sink the artwork into the hero surface… */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-transparent" />
            {/* …then re-grade it into the brand indigo / violet / cyan range */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-accent/35 mix-blend-soft-light" />
          </div>
        )}
      </div>
    </div>
  )
}
