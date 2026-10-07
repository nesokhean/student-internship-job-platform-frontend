import { MapPin, ExternalLink } from 'lucide-react'


export const mapSrc = (query, zoom = 13) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`

export const mapHref = query =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

/** Framed map card: place name + "Open in Google Maps", then the live map.
 *  Renders nothing without a `query`, so callers can drop it in unconditionally. */
export default function MapEmbed({ query, caption, action = 'Open in Google Maps', zoom = 13, height = 'h-64', className = '' }) {
  if (!query) return null

  return (
    <div className={`card map-embed overflow-hidden ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-heading">
          <MapPin size={16} className="text-primary" />{caption || query}
        </p>
        <a href={mapHref(query)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:underline">
          {action}<ExternalLink size={14} />
        </a>
      </div>
      <iframe
        title={`Map of ${caption || query}`}
        src={mapSrc(query, zoom)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={height}
      />
    </div>
  )
}
