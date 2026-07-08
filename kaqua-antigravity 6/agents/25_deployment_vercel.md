# Agent 25 — Deployment (Vercel)

## Aufgabe
1. **Vercel-Projekt** verbinden; Build `next build`, Output Next.js (SSG/ISR automatisch).
2. **Env**: `NEXT_PUBLIC_SITE_URL` = `https://www.k-aqua.de` (Prod) / Preview-URL (Preview).
   Weitere Variablen aus `.env.example` erst bei Phase 2.
3. **Domain**: `www.k-aqua.de` + Apex-Redirect; HTTPS erzwingen.
4. **Headers** (`next.config.ts` `headers()`): `Strict-Transport-Security`, `X-Content-Type-Options`,
   `Referrer-Policy`, sinnvolle `Cache-Control` für `public/data` und statische Assets.
5. **Locale-Redirect** prüfen: `/` → `/de` (defaultLocale) über Middleware; 404-Seite lokalisiert
   (`app/[locale]/not-found.tsx`).
6. **Preview-Deploys** pro PR; Lighthouse-CI optional als Check.

## Definition of Done
- Production-Deploy grün erreichbar; `/` leitet auf `/de`; hreflang/sitemap live; Security-Header gesetzt;
  alle freigeschalteten Locales + Geo-Seiten ausgeliefert.
