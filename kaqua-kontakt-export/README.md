# K Aqua Kontakt Suite — Export

Globales Lead-Modul in 10 Bauformen, eine Codebasis, Light/Dark, animiert.

## Inhalt
- `kaqua-tokens.css` — Design Tokens (Pflicht, beide Themes)
- `kaqua-kontakt.js` — die komplette Suite (Content Map, alle Varianten, Validierung, Animationen)
- `kaqua-theme.js` — Light/Dark Schalter mit Persistenz
- `demo-komponenten.html` — alle Bauformen live (Referenz fuer Look und Verhalten)
- `demo-positionen.html` — 60 Positionsdesigns als Entscheidungskatalog
- `nextjs/` — Referenzimplementierung fuer Next.js App Router (Server Component + Client Form + Server Action + typisierte Content Map)
- `AGENT-PROMPT.md` — fertiger Integrationsauftrag fuer Coding-Agenten

## Schnellstart (statische Seite)
```html
<link rel="stylesheet" href="kaqua-tokens.css">
<div data-kaqua-kontakt data-variant="block" data-page="rohr"></div>
<script src="kaqua-kontakt.js"></script>
<script src="kaqua-theme.js"></script>
```

## Bauformen
`block` (Pre-Footer Standard) · `band` · `hero` · `inline` · `row` · `sidebar` · `tile` · `sticky` · `fab` · Modal per `data-kaqua-open="slug"` oder `KAquaKontakt.openModal(slug)`.
Toene: `data-tone="primary|glass|inverse"`.

## API
`KAquaKontakt.mount(el)` · `setPage(el, slug)` · `openModal(slug)` · `closeModal()` · `content` (Map) · `variants`.

## Next.js
Siehe `nextjs/INTEGRATION.md`. Kernregeln: Block global im Root Layout vor dem Footer, Begleittext pro Slug aus der typisierten Content Map (einzigartig formuliert, kein Keyword-Template), Submit per Server Action mit Honeypot und Zeitschwelle.
