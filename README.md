# KhmerCareer – Student Internship & Job Platform (frontend only)
React + Vite + Tailwind CSS v4 + React Router. Mock data, localStorage auth.

    npm install
    npm run dev

Demo login: demo@student.kh / 123456 (or register a new account).

## Google sign-in

1. Google Cloud Console -> *APIs & Services -> Credentials* -> create an **OAuth 2.0 Web client ID**.
   Add your dev origin (e.g. `http://localhost:5173`) under **Authorised JavaScript origins**.
2. Put the client ID in `.env`:

       VITE_GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com

3. The endpoint that verifies the token defaults to `/auth/google` (override with
   `VITE_GOOGLE_AUTH_PATH`). The frontend POSTs `{ credential }` — the Google ID token (JWT),
   plus `{ role: "student" }` when coming from the register page. It must reply with the same
   `{ user, token }` shape as `/login`.

Until `VITE_GOOGLE_CLIENT_ID` is set the button is still shown but explains what is missing;
nothing else changes.

## Maps

`MapEmbed` (`src/components/MapEmbed.jsx`) drops a live Google map into any page using the
keyless *Embed* endpoint (`maps.google.com/...&output=embed`) - the same URL Google's
"Share -> Embed a map" dialog gives you. No API key, no Cloud project, no billing.

    import MapEmbed from './MapEmbed.jsx'
    <MapEmbed query="Phnom Penh, Cambodia" />        // also: caption, zoom, height, action
    <MapEmbed query="11.5564,104.9282" caption="Phnom Penh" zoom={14} />

It is already used on the company page and - for every role that is not `Remote` - on the
job and internship pages. The `query` must be something Google can resolve (a city, a
street address or `lat,lng`), which is why the demo centres on the company's city instead
of its fictional name.

`MapEmbed` also exports `mapSrc()` and `mapHref()` if you want the raw URL or link only.

Switching to the **Maps JavaScript API** (custom markers, clustering, tiles themed to the
brand) needs a key with billing enabled, e.g. `VITE_GOOGLE_MAPS_API_KEY` - only worth it
when the data carries real coordinates. A genuine dark-mode map is available by swapping
the `filter` in the `.map-embed` block at the bottom of `src/index.css` (see the comment
there).

