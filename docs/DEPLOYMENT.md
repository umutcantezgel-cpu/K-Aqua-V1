# Deployment Guide (Vercel)

> **Step 25 — Agent 25**

---

## 1. Vercel Project Setup

1. Connect the Git repository to a Vercel project
2. Framework preset: **Next.js** (auto-detected)
3. Build command: `pnpm build` (default)
4. Output: Next.js App Router (SSG/ISR automatic)

## 2. Environment Variables

| Variable | Environment | Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | `https://www.k-aqua.de` |
| `NEXT_PUBLIC_SITE_URL` | Preview | `https://$VERCEL_URL` |

Additional Phase 2 variables (see `.env.example`):
- `CMS_API_URL` / `CMS_API_TOKEN` — headless CMS
- `CONTACT_INBOX` / `RESEND_API_KEY` — form delivery
- `NEXT_PUBLIC_ANALYTICS_ID` — analytics

## 3. Domain Configuration

| Domain | Type | Notes |
|---|---|---|
| `www.k-aqua.de` | Primary | CNAME to `cname.vercel-dns.com` |
| `k-aqua.de` | Apex redirect | A records → Vercel IPs, redirects to `www` |

HTTPS is enforced automatically by Vercel.

## 4. Security Headers

Configured in `next.config.ts` via `headers()`:

- **`Strict-Transport-Security`**: `max-age=63072000; includeSubDomains; preload`
- **`X-Content-Type-Options`**: `nosniff`
- **`Referrer-Policy`**: `strict-origin-when-cross-origin`
- **`X-Frame-Options`**: `DENY`
- **`Permissions-Policy`**: `camera=(), microphone=(), geolocation=()`
- **`X-DNS-Prefetch-Control`**: `on`

Static assets (`/data/*`, fonts) are cached with `immutable` / 1-year max-age.

## 5. Locale Redirect

- `/` → `/de` via `next-intl` middleware (see `middleware.ts`)
- Default locale: `de`
- Enabled locales: `de`, `en`, `ar`
- Locale prefix: `always` (every URL starts with `/de/`, `/en/`, or `/ar/`)
- 404 page: localized via `app/[locale]/not-found.tsx`

## 6. Preview Deployments

Every PR gets a preview deployment automatically on Vercel.
Optional: Add Lighthouse CI as a GitHub check.

## 7. Checklist

- [ ] Vercel project connected
- [ ] Environment variables set (Production + Preview)
- [ ] Domain DNS configured
- [ ] HTTPS + HSTS active
- [ ] `/` redirects to `/de`
- [ ] All locales render correctly
- [ ] Security headers visible in response
- [ ] Static assets cached properly
- [ ] 404 page renders localized content
