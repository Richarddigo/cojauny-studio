# Cojauny Studio

Studio site for [Cojauny](https://cojauny.com) — software engineering, web development and consulting. Built with the Next.js App Router and `next-intl`, deployed on Vercel.

**Live:** https://studio.cojauny.com

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict
- next-intl 4 (locales: `en`, `es`, `de`, `localePrefix: "always"`)
- Tailwind v4 + design tokens in `src/app/globals.css`
- Resend for transactional email · Zod 4 · React Hook Form
- Vercel Analytics

## Development

```powershell
npm install
npm run dev
```

Open http://localhost:3000 — the middleware redirects `/` to the negotiated locale.

### Environment variables

Create `.env.local` with:

```
RESEND_API_KEY=re_...
# Optional — distributed rate limit (falls back to in-memory when missing)
UPSTASH_REDIS_REST_URL=https://....upstash.io
UPSTASH_REDIS_REST_TOKEN=AY...
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build (typecheck + lint included) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (strict: `unused-imports`, `jsx-a11y`) |
| `npm run analyze` | Build with `@next/bundle-analyzer` enabled |
| `npm run test:e2e` | Playwright smoke + axe-core a11y suites |
| `npm run test:e2e:ui` | Playwright in interactive UI mode |

## Testing

End-to-end tests live in `tests/e2e/`:

- `smoke.spec.ts` — locale routing (`/en`, `/es`, `/de`), nav, hreflang, key pages, 404, `/api/health`.
- `a11y.spec.ts` — axe-core scan of every locale's main routes (WCAG 2 A/AA), fails on `critical` or `serious` violations.

One-time setup downloads browser binaries (~150 MB):

```powershell
npx playwright install --with-deps
```

Then run:

```powershell
npm run test:e2e        # headless run
npm run test:e2e:ui     # interactive UI mode
```

`playwright.config.ts` boots `npm run build && npm run start` against `http://localhost:3000` automatically. Override with `PLAYWRIGHT_BASE_URL=https://...` to run against a deployed environment.

## Project layout

```
src/
├── app/
│   ├── [locale]/         # localised routes (force-static)
│   ├── api/
│   │   ├── contact/      # form endpoint (Resend + rate limit)
│   │   └── health/       # GET /api/health (edge runtime)
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── contact/          # ContactForm (RHF + Zod, honeypot)
│   ├── layout/           # Header, Footer, LanguageSwitcher
│   ├── legal/            # LegalLayout + content blocks
│   ├── sections/         # Hero, Services, Projects, CTA, Sponsors…
│   ├── seo/              # JsonLd (Organization + WebSite schemas)
│   └── ui/               # Button, Icon, AnimateIn, logos
├── i18n/                 # next-intl routing + request config
├── lib/                  # seo, email, ratelimit helpers
├── locales/
└── messages/             # en.json · es.json · de.json
tests/e2e/                # Playwright specs
```

## Deployment

Vercel auto-builds on push to `main`. Required environment variables in **Project → Settings → Environment Variables**: `RESEND_API_KEY` (and optionally the `UPSTASH_REDIS_REST_*` pair).

Post-deploy smoke:

```powershell
curl.exe https://studio.cojauny.com/api/health
```

Should return `200 OK` with `{"status":"ok",...}`.

See [AUDIT.md](AUDIT.md) for the architectural audit and [AUDIT2.md](AUDIT2.md) for the remaining backlog (split between automatable and manual actions).
