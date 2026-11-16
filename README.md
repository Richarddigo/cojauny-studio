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

Open http://localhost:3000. English uses `/`; Spanish, German and French use `/es`, `/de` and `/fr`. Locale detection is disabled. For production previews use matching bind and request hosts, e.g. `npm run start -- --hostname localhost --port 3002` and `http://localhost:3002`; mixing an IP bind with locale rewrites can create a local redirect loop.

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
└── messages/             # en.json · es.json · de.json · fr.json
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


## Studio visual identity and local review

The studio retains its original navy, blue and purple brand palette and original local logo/icon assets. A panoramic sans-serif brief leads into an index of the three existing projects, a service register and the working process. The project index uses the original Cojauny and FC Español logo assets; Cuatro Sotas is identified by its title rather than an invented mark. Development/coming-soon statuses and existing project destinations are retained; promotional counters have been removed.

The contact validation, Turnstile integration, server origin/rate limits and email API remain unchanged. `tests/e2e/studio.spec.ts` intercepts every form submission and analytics endpoint; it sends no real email or analytics. The consent store shares changes across components/tabs. Analytics loads only after acceptance, and the official `beforeSend` callback reads the current choice for each future event. Footer preferences withdraw the current choice before opening the banner. A failed write/removal keeps that tab's newer choice ahead of stale readable storage; a successful write or external storage event reconciles it. No unmount-based SDK cleanup or cancellation of already-sent requests is claimed.

Local checks:

```powershell
npm run lint
npx tsc --noEmit
npm run test:consent
npm run build
# In another terminal, after the production server above is ready:
$env:PLAYWRIGHT_BASE_URL = 'http://localhost:3002'
$env:PLAYWRIGHT_CHANNEL = 'chrome' # Optional installed official Chrome; default is Playwright Chromium.
npm run test:e2e -- --workers=1
```

Next.js, its bundle analyzer and ESLint config are aligned at the official stable 16.4.6 release. Compatible ranges were refreshed without overrides or force; remaining development audit findings must be reported separately from the production-only audit. No deployment or production configuration is established by the local preview.

Local validation on 2026-11-16: lint, TypeScript, two consent unit cases, production build (47 generated pages), and all 48 Playwright checks passed with one worker across desktop and mobile. All four localized social-image routes returned PNG/200. The complete npm audit retains seven moderate development-package findings; the production-only audit reports zero. This is local evidence, not a deployed-state or legal certification. See [the scoped receipt](docs/evidence/studio-identity-local-20261116.json).

Git-triggered Vercel deployments are explicitly disabled in `vercel.json` (`git.deploymentEnabled: false`). This repository change does not modify Vercel project settings or deploy a site.

The original brand restoration also passed lint, TypeScript, both consent unit tests, the 47-page production build and all 48 browser checks on 2026-11-16. See [the original-brand receipt](docs/evidence/studio-original-brand-local-20261116.json) for baseline color/asset comparisons and refreshed desktop/mobile captures.
