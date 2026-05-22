# Vercel Pay / Paid Features Audit — cojauny-studio

## Current Hosting: Vercel (Next.js SSR/SSG)

The project uses `next-intl` with `generateStaticParams` for locale-based static routes.
It is already configured for Vercel deployment.

---

## Service Inventory

| Service | Plan / Tier | Monthly Cost | Vercel Hobby Compatible? | Notes |
|---|---|---|---|---|
| **Vercel Hosting** | Hobby (free) | $0 | ✅ Yes | The project is already on Vercel |
| **@vercel/analytics** | Free on Hobby | $0 | ✅ Yes | Included with all Vercel plans |
| **Resend** | Free (3,000 emails/mo) | $0 | ✅ Yes | Free tier sufficient for contact form on a landing page |
| **Upstash Redis** | Free tier | $0 | ✅ Yes | Free: 10,000 commands/day — used for rate limiting; activated only if `UPSTASH_REDIS_REST_URL` is set |
| **Upstash Rate Limit** | Free with Redis | $0 | ✅ Yes | Bundled with `@upstash/ratelimit` |
| **Google Fonts** | Free | $0 | ✅ Yes | CDN, no billing |

---

## Vercel Hobby Plan Notes

### Function Invocations
- Contact form uses a Next.js API Route Handler (`/api/contact`).
- Vercel Hobby: **100,000 function invocations/month** — ample for a studio landing page.

### Resend (Email)
- Free tier: 3,000 emails/month, 100/day.
- If contact form volume exceeds this, upgrade to Resend Pro ($20/mo).
- No configuration change needed — just upgrade the Resend plan.

### Upstash Redis (Rate Limiting)
- Rate limiting is optional (only active if `UPSTASH_REDIS_REST_URL` env var is set).
- Upstash Free tier: 10,000 commands/day — sufficient for rate-limiting a contact form.
- If `UPSTASH_REDIS_REST_URL` is not set, rate limiting is disabled gracefully.

### @vercel/analytics
- Web Analytics is free on all Vercel plans, including Hobby.
- Speed Insights is also free on Hobby (100,000 data points/month).

### Bandwidth
- Vercel Hobby: **100 GB bandwidth/month** — sufficient for a studio site.

### Custom Domain
- Vercel Hobby supports **unlimited custom domains** at no extra cost.
- `studio.cojauny.com` can be connected via CNAME.

---

## Supported Locales
- en / es / de / fr (added in this refactor session)

---

## Environment Variables Required on Vercel

```
RESEND_API_KEY=               # Resend API key for contact form email
UPSTASH_REDIS_REST_URL=       # Upstash Redis URL (optional — disables rate limiting if absent)
UPSTASH_REDIS_REST_TOKEN=     # Upstash Redis token (optional)
NEXT_PUBLIC_APP_URL=          # Public URL (e.g. https://studio.cojauny.com)
```
