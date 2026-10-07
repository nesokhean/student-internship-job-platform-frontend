# Page artwork

Files in this folder are served from the site root, so `cta-bg.png` here is
referenced from CSS simply as `/images/cta-bg.png`.

## Auth pages — left-hand panel

`auth-hero.svg` is the **placeholder** illustration shown in the left column of the
Log in / Create account pages (see `src/layouts/AuthLayout.jsx`).

### Replacing it with your own image

1. Drop your file into this folder, e.g. `public/images/auth-hero.jpg`
   (a portrait-ish, subject-centred picture around a 3:4 ratio works best —
   the panel uses `object-cover`, so it fills the column without stretching).
2. Point `HERO_IMAGE` in `src/layouts/AuthLayout.jsx` at it:

   ```js
   const HERO_IMAGE = '/images/auth-hero.jpg' // files here are served from `/`
   ```

   Or import a file bundled through Vite instead:

   ```js
   import heroArt from '../assets/images/auth-hero.jpg'
   const HERO_IMAGE = heroArt
   ```

   A hosted URL (`'https://…/photo.jpg'`) works too.

The dark purple/black gradient overlay lives in `AuthLayout.jsx`, so the headline
and perks stay readable over any image you choose — keep the subject away from the
vertical centre if you want the text to sit over a plain area.

## Home page — "Ready to apply?" panel

The closing CTA on the home page (`src/pages/Home.jsx`) paints `cta-bg.*` as a
full-bleed background behind its dark gradient overlay.

1. Save your picture here as `public/images/cta-bg.png`.
   `.jpg`, `.jpeg` and `.webp` with the same base name work too — `.cta-panel` in
   `src/index.css` lists all four and whichever file exists is used. `.png` is the
   safest choice.
2. That's it — no code change needed. The picture uses
   `background-size: cover` + `background-position: center`, so it fills the panel
   at every breakpoint without stretching or breaking the layout.

The dark wash that keeps the copy and buttons readable is the **first** layer of
`.cta-panel` in `src/index.css`. Lower its alpha (currently `0.80`–`0.90`) to reveal
more of the photo, or raise it for even stronger contrast. If no file is present the
panel just falls back to the plain dark gradient it used before.

## Brand logo

The KhmerCareer logo is drawn in code, not imported as a bitmap:

| Piece | Where |
| --- | --- |
| Mark (badge + glyph) and the two-tone wordmark | `src/components/BrandLogo.jsx` — `BrandMark` / `BrandLogo` |
| Badge gradient (indigo → violet) | `.brand-mark` in `src/index.css` |
| Standalone mark, transparent background | `logo-mark.svg` — also the site favicon (`index.html`) |
| Standalone lockup, white background | `logo.svg` |

`BrandLogo` is used by the navbar, the footer, the auth panel and the dashboard
header, so editing it updates all four lockups at once. It renders the badge and
the wordmark as two sibling nodes and leaves the flex row to its parent, which is
why each call site keeps its own `flex items-center gap-2.5` link.

Size is chosen at the call site:

```jsx
<BrandLogo />                                                     {/* h-9 w-9 + text-lg */}
<BrandLogo markClass="h-10 w-10" textClass="text-xl" tone="light" />
<BrandLogo textClass="hidden text-lg sm:block" />                  {/* hide the wordmark on small screens */}
```

* `tone="light"` gives a white wordmark for the always-dark surfaces (footer,
  auth panel). The default `tone="auto"` follows the theme via `text-heading`.
* To recolour, edit **two** places: the gradient stops in `.brand-mark`
  (`src/index.css`) and the matching stops inside both `.svg` files. The hexes are
  deliberately literal rather than theme tokens — a logo has to look identical in
  light and dark mode, and white on indigo always clears 4.5:1.
* The mark is a graduation cap drawn on a 48×48 grid: a flat mortarboard
  diamond, a shallow cap body, and a tassel ending in its knot. Every part is a
  3.6-unit round-capped stroke except the knot, which is a filled dot, so the cap
  stays crisp from a 16px favicon to a print-size export. It is centred at
  (24, 24) with 7.2 units of clearance on every side, so it never reaches the
  badge's rounded corners. Keep `BrandMark` and `logo-mark.svg` in sync if you
  redraw it.
* `logo.svg` keeps the wordmark as live text (Inter, falling back to the system
  UI font), so outline the text before using it in print or in a design tool.
  `logo-mark.svg` is pure shapes and needs no font.
