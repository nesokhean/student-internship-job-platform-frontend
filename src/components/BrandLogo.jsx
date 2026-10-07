/* ------------------------------------------------------------------
   BrandLogo — the KhmerCareer logo lockup.

   `BrandMark` is the icon: a rounded badge filled with the brand's
   indigo -> violet gradient, carrying a white graduation cap — a wide, flat
   mortarboard diamond, the cap body tucked beneath it, and a tassel hanging
   from the right tip. It is the one sign every student reads instantly, and
   it keeps the mark about the people the platform serves. The gradient lives
   in the `.brand-mark` class
   (src/index.css) so every surface renders the identical mark, and it uses
   literal brand hex values so the logo keeps its colour in light *and*
   dark mode.

   `BrandLogo` is the mark plus the two-tone wordmark. It renders those two
   nodes back-to-back with no wrapper of its own, so the parent keeps owning
   the flex layout and the gap — the navbar, footer, auth and dashboard
   lockups stay structurally identical to the briefcase logo they replace.

   The parent supplies the flex row `flex items-center gap-2.5`:

       <Link to="/" className="group flex items-center gap-2.5">
         <BrandLogo markClass="h-9 w-9 shadow-glow transition group-hover:-rotate-6" />
       </Link>

   `tone="light"` is for the always-dark surfaces (footer, auth panel);
   everything else uses the default, which follows the theme through
   `text-heading`.
   ------------------------------------------------------------------ */

/* Icon only — badge + glyph. The size comes from `className`. */
export function BrandMark({ className = 'h-9 w-9' }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      {/* 48x48 grid: the glyph is optically centred and stays clear of the
          rounded corners at every size. */}
      <svg
        viewBox="0 0 48 48"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {/* mortarboard: a wide, flat diamond — how the board of a cap reads
            in perspective. Round joins soften its four points. */}
        <path d="M9 21.5 24 13.5 39 21.5 24 29.5Z" />
        {/* cap body: a shallow, wide U; its top ends sit just under the board
            (0.3 units below the board's lower edges) so the two merge. */}
        <path d="M15 25 V34.5 H33 V25" />
        {/* tassel: drops from the board's right tip, ending in its knot */}
        <path d="M38.7 21.9 V29.5" />
        <circle cx="38.7" cy="31.5" r="2.1" fill="currentColor" stroke="none" />
      </svg>
    </span>
  )
}

/* Wordmark colour per surface: theme-aware by default, white on dark. */
const TONE = {
  auto: 'text-heading',
  light: 'text-white',
}

/* Mark + wordmark. `textClass` carries the size *and* any responsive hiding. */
export default function BrandLogo({ markClass = 'h-9 w-9', textClass = 'text-lg', tone = 'auto' }) {
  return (
    <>
      <BrandMark className={markClass} />
      <span className={`font-display font-extrabold tracking-tight ${textClass} ${TONE[tone] || TONE.auto}`}>
        Khmer<span className="text-accent">Career</span>
      </span>
    </>
  )
}
