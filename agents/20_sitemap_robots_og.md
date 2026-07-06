# Agent 20 — Sitemap · robots · OG-Images · Manifest

## Aufgabe
1. **`app/sitemap.ts`**: alle URLs aller freigeschalteten Locales (Kernrouten + 27 Geo-Slugs),
   jeweils mit `alternates.languages` (hreflang). `lastModified` sinnvoll setzen.
2. **`app/robots.ts`**: `allow: '/'`, `sitemap`-Verweis, `host` = `NEXT_PUBLIC_SITE_URL`.
3. **`app/manifest.ts`**: Name „K-Aqua", Theme-Color je Mode, Icons (aus `MediaSlot`/Platzhalter
   bis echte Marke vorliegt — `// TODO(content): echtes Logo/Favicon`).
4. **Dynamische OG-Images** via `ImageResponse` (`app/[locale]/opengraph-image.tsx` + Geo-Variante):
   Brand-Gradient (`--primary`→`--accent-strong`), Seitentitel (Outfit), K-AQUA-Wortmarke. Edge-Runtime.

## Definition of Done
- `/sitemap.xml` enthält alle freigeschalteten URLs mit hreflang; `/robots.txt` korrekt.
- OG-Image rendert für Home + eine Geo-Seite (per URL prüfbar). `pnpm build` grün.
