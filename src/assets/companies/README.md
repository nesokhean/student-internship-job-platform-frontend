# Company logos

Placeholder logo art for the Companies directory. Each file is imported by
`src/data/companies.js` and bundled by Vite, so the card component only ever
needs the `logo` field — no code change when the artwork is replaced.

| File                    | Company                | Used on                              |
| ----------------------- | ---------------------- | ------------------------------------ |
| `angkor-digital.png`    | Angkor Digital         | `/companies`, `/companies/1`, cards   |
| `mekong-finance.png`    | Mekong Finance         | `/companies`, `/companies/2`, cards   |
| `khmer-creative.png`    | Khmer Creative Studio  | `/companies`, `/companies/3`, cards   |
| `tonle-logistics.png`   | Tonle Logistics        | `/companies`, `/companies/4`, cards   |
| `bayon-tech.png`        | Bayon Tech Solutions   | `/companies`, `/companies/5`, cards   |
| `sovanna-education.png` | Sovanna Education      | `/companies`, `/companies/6`, cards   |
| `lotus-marketing.png`   | Lotus Marketing Group  | `/companies`, `/companies/7`, cards   |
| `green-cambodia.png`    | Green Cambodia Energy  | `/companies`, `/companies/8`, cards   |

## Replacing a placeholder with the real logo

1. Export the real logo as PNG (transparent background) or WebP, at least
   256px on its longest side, ideally square. Keep the file size under ~50 KB.
2. Save it over the placeholder using the exact same file name, e.g.
   `angkor-digital.png`. Nothing else has to change.
3. To use a different file name or extension, update the matching `import` at
   the top of `src/data/companies.js`, e.g.
   `import angkorDigital from '../assets/companies/angkor-digital.webp'`.
4. To add a new company, add a row to the array in `src/data/companies.js`
   (columns: name, industry, location, website, about, brand colour, logo) and
   drop its logo file here.

## Fallback behaviour

`Logo` in `src/components/JobCard.jsx` shows the company's first letter in a
coloured tile whenever `company.logo` is missing **or** the image fails to load
(`onError`), so a broken file never leaves an empty box. Remote URLs work too —
`company.logo` can be any image URL, not just a bundled asset.
