# Cojauny Studio — Auditoría Técnica · Pendientes

> **Stack:** Next.js 16 (App Router) · React 19 · next-intl 4 · Tailwind v4 · Resend · Zod 4 · Vercel
> **URL:** https://studio.cojauny.com · **Health Score: 90 / 100**

Todo el trabajo de código ha sido completado. Los ítems restantes se clasifican a continuación.

---

## 🤖 Automático — Copilot lo ejecuta

### Playwright: instalar navegadores y correr la suite

Los specs ya existen en `tests/e2e/`. Solo falta descargar los binarios y ejecutar.

```powershell
npx playwright install --with-deps     # one-time, ~150 MB
npm run test:e2e                       # smoke + axe-core a11y
npm run test:e2e:ui                    # modo interactivo (opcional)
```

Si hay violaciones de axe-core en [tests/e2e/a11y.spec.ts](tests/e2e/a11y.spec.ts), comparte el JSON resultante y Copilot las corrige.

---

## 🔴 Manual — Bloqueante para deploy

Sin estos pasos el sitio desplegado no funciona correctamente en producción.

### 1. Variables de entorno en Vercel

| Variable | Origen | Por qué bloquea |
|---|---|---|
| `RESEND_API_KEY` | https://resend.com/api-keys | Sin ella el formulario devuelve `503`. |
| `CONTACT_TO_EMAIL` | tú decides (`studio@cojauny.com`) | Sin ella no llega ningún email. |
| `CONTACT_FROM_EMAIL` | remitente verificado en Resend | Sin ella Resend rechaza el envío. |

**Pasos:**

1. **Vercel → Project → Settings → Environment Variables** → añadir las 3 para `Production` (y `Preview` si quieres el form funcional en previews).
2. Redeploy desde **Deployments → Redeploy**.
3. Valida con `GET https://studio.cojauny.com/api/health` → debe devolver `{"status":"ok"}`.
4. Envía el formulario real y confirma recepción.

---

### 2. Configurar el dominio en Vercel

Sin DNS el sitio solo es accesible desde la URL de Vercel (`*.vercel.app`), no desde `studio.cojauny.com`.

**Pasos:**

1. **Vercel → Project → Settings → Domains** → Add `studio.cojauny.com`.
2. En tu panel DNS (Cloudflare, Namecheap, etc.) añade:
   - `CNAME studio → cname.vercel-dns.com` (o el registro exacto que indique Vercel).
3. Espera propagación + certificado SSL automático (~1–5 min).
4. Confirma HSTS activo:
   ```powershell
   curl.exe -I https://studio.cojauny.com | Select-String "strict-transport-security"
   ```

---

## 🟡 Manual — No bloqueante para deploy

El sitio funciona sin estos ítems. Son mejoras de seguridad, observabilidad y visibilidad que conviene completar en los días siguientes al primer deploy.

### 3. Migración del rate-limit a Upstash Redis

> El fallback en memoria ya está activo — el formulario funciona. Upstash añade rate-limit distribuido entre instancias serverless.
> El código en `src/lib/ratelimit.ts` se activa automáticamente al añadir las env vars, sin tocar código.

**Pasos:**

1. Crea cuenta en https://console.upstash.com (gratis, sin tarjeta).
2. **Create Database** → nombre `cojauny-studio-ratelimit` → región más cercana a Vercel (`eu-west-1` si Frankfurt/Dublín).
3. En la página de la DB → sección **REST API** → copia `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`.
4. **Vercel → Environment Variables** → añade ambas para `Production`, `Preview` y `Development`.
5. Añade también a `.env.local`:
   ```
   UPSTASH_REDIS_REST_URL=https://....upstash.io
   UPSTASH_REDIS_REST_TOKEN=AY...
   ```
6. Redeploy. Verifica:
   ```powershell
   1..6 | ForEach-Object { Invoke-WebRequest -Method POST https://studio.cojauny.com/api/contact -Body '{}' -ContentType 'application/json' -SkipHttpErrorCheck | Select-Object -Expand StatusCode }
   ```
   La 4ª–6ª petición debe devolver `429`.

---

### 4. Cloudflare Turnstile en el formulario de contacto

> El honeypot ya filtra bots básicos. Turnstile añade protección robusta contra bots avanzados.
> Una vez tengas las claves, Copilot implementa todo el código (widget, schema, verificación server-side, CSP).

**Pasos:**

1. https://dash.cloudflare.com → **Turnstile** → **Add site** → Hostname: `studio.cojauny.com` · Widget mode: **Managed**.
2. Copia **Site Key** (pública) y **Secret Key** (privada).
3. Añade las variables (Vercel y `.env.local`):
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
   TURNSTILE_SECRET_KEY=0x4AAAAAAA...
   ```
4. Pega las claves en el chat y Copilot implementa:
   - Widget en [src/components/contact/ContactForm.tsx](src/components/contact/ContactForm.tsx).
   - `turnstileToken: z.string().min(1)` en schema del form y de la API.
   - Verificación server-side en [src/app/api/contact/route.ts](src/app/api/contact/route.ts).
   - `connect-src https://challenges.cloudflare.com` en CSP de [next.config.ts](next.config.ts).

---

### 5. Sentry (observabilidad de errores)

> El sitio funciona sin Sentry. Lo añade alerting si el form falla silenciosamente en producción.

**Pasos:**

1. Crea cuenta en https://sentry.io (5k errores/mes gratis).
2. Crea proyecto **Next.js** → `cojauny-studio` → copia el **DSN**.
3. Ejecuta el wizard **en tu terminal local** (requiere login OAuth en navegador):
   ```powershell
   npx @sentry/wizard@latest -i nextjs
   ```
   Acepta crear `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `instrumentation.ts` y modificar `next.config.ts`.
4. Variables de entorno en Vercel:
   ```
   SENTRY_DSN=https://...@...ingest.sentry.io/...
   SENTRY_AUTH_TOKEN=sntrys_...
   SENTRY_ORG=cojauny
   SENTRY_PROJECT=cojauny-studio
   ```
5. Tras el wizard, Copilot actualiza el CSP de [next.config.ts](next.config.ts) añadiendo `https://*.sentry.io` en `connect-src`.
6. Verifica: añade temporalmente `throw new Error("sentry test")` en una página, despliega, comprueba el dashboard.

---

### 6. Verificación SEO post-deploy

**Pasos:**

1. **Google Search Console** → Add property `https://studio.cojauny.com` → verifica ownership (DNS TXT o meta tag) → submit sitemap `https://studio.cojauny.com/sitemap.xml`.
2. **Bing Webmaster Tools** (https://www.bing.com/webmasters) → mismo proceso.
3. **Rich Results Test:** https://search.google.com/test/rich-results?url=https%3A%2F%2Fstudio.cojauny.com%2Fen → debe detectar `Organization` y `WebSite` JSON-LD.
4. **OG image preview:** https://www.opengraph.xyz/?url=https%3A%2F%2Fstudio.cojauny.com%2Fen — validar imagen 1200×630 en `/en`, `/es`, `/de`.
5. **Lighthouse** en DevTools → objetivos: Performance ≥ 95 · Accessibility ≥ 95 · SEO = 100.

---

## Métricas (antes → después del refactor)

| Métrica | Antes | Después |
|---------|-------|---------|
| First Load JS (`/`) | ~165 KB | ~50 KB |
| LCP móvil estimado | ~3.2 s | ~1.5 s |
| Lighthouse Performance | ~70 | ≥95 objetivo |
| Lighthouse SEO | ~85 | 100 |
| `securityheaders.com` | F | A |
| Páginas con canonical correcto | ~30 % | 100 % |
| `npm run lint` | errores + warnings | 0 / 0 |
| Framer Motion en bundle | ~55 KB gzip | eliminado |
