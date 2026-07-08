> ⚠️ Fortsetzung dieser Segment-Map: **S13–S18 stehen in `../PIPELINE-3.0-MASTER.md`**
> (Echt-Katalog, Deep-Content, Produkt-Detailseiten, pSEO, Vercel-Deploy, Handover).
> Diese Datei (S01–S12) bleibt unverändert als Phase-2.0-Referenz gültig.

# SEGMENT-MAP (Antigravity 2.0)

Alle Pfade relativ zu `kaqua-antigravity/prototype/`. „Ziel" = Live-Codebasis.

| Seg | Feature | Referenzdateien | Agent |
|-----|---------|-----------------|-------|
| S01 | Design-Fundament hell: Tokens, Komponenten-CSS, Render-Fallen-Muster | kaqua-tokens.css, kaqua-components.css, kaqua-fx.css, kaqua-cvgen.css, kaqua-globe-variants.css, kaqua-globe-hub.css | 01 |
| S02 | Globus-Engine + 5 textfreie Varianten (blueprint, fluid, matrix, network, contour) + Review-Deck | kaqua-globe-engine.js, kaqua-globe-variants.jsx, Globe Variations Deck.html | 02 |
| S03 | 12 Scroll-FX (rise, zoom, spin, parallax, driftL/R, tilt, sway, blurIn, orbit, pulse, horizon) + 6 Seitensegment-Platzierungen + Katalog | kaqua-globe-scrollfx.jsx, Globe FX Catalog.html, Platzierungen in kaqua-views-1/2/4/5.jsx | 03 |
| S04 | Globus-Hub: Vollbild-Navigation, 16 Seiten geo-verankert, Hover=Anflug, Klick=Navigation, Tweak-Fallback klassisches Menü | kaqua-globe-hub.jsx, kaqua-globe-hub.css, kaqua-app.jsx (Nav/Tweaks) | 04 |
| S05 | PipeFX: 8 Industrie-Canvas-Animationen (flow, droplet, reservoir, extruder, blueprint, scan, pressure, isonet) + 7 Platzierungen + Katalog | kaqua-pipefx.jsx, Pipe FX Catalog.html, Platzierungen in views-1/2/3/4/5/6 | 05 |
| S06 | Produktfinder: exakt 114 Artikel (35 PP-R + 65 PP-RCT + 14 Formteile), Suche, Sortierung, Tabelle/Karten, Detailpanel mit Bild-Slot + Druckring + RFQ-CTA, CSV-Export | kaqua-views-3.jsx, image-slot.js | 06 |
| S07 | RFQ 5 Stufen (Projektart→Material→Bedarf→Termin/Region→Kontakt), Datei-Feld, Entwurfs-Persistenz, Reservoir-Fortschritt, mailto-Übergabe | kaqua-views-6.jsx, kaqua-drafts.js | 07 |
| S08 | Kontaktseite: 3 Infokarten + Schnellkontakt-Formular (30-Sek.-mailto, Entwurfs-Persistenz) + Network-Globus-Segment | kaqua-views-2.jsx (ContactView, QuickContactForm) | 08 |
| S09 | Karriere: Benefits-Rechner, Culture-Match, Recruiting-Engine-Formular (verknüpft Culture-Score), CV-/Bewerbungsgenerator mit Live-Vorschau + Druck-Export + Dokumentliste | kaqua-views-5.jsx, kaqua-cvgen.css, kaqua-drafts.js | 09 |
| S10 | i18n: 12 Sprachen Navigationsebene, DE/EN/AR Seitenebene inkl. RTL; Erweiterungsregeln für neue Strings | kaqua-i18n.jsx, kaqua-i18n-pages.jsx, kaqua-i18n-pages-ar.jsx | 10 |
| S11 | Performance & A11y: Canvas-Budget (dpr≤2, rAF-Stop bei Unmount), reduced-motion, 44 px, Fokus, Kontrast AA hell | alle FX-Dateien, kaqua-app.jsx | 11 |
| S12 | QA-Gesamtabnahme: Smoke-Matrix über alle 17 Seiten × 3 Sprachen × mobil/desktop, Konsole = 0 Fehler | prototype/K-Aqua Redesign.html als Referenzlauf | 12 |

## Verbindliche Datenkontrakte
- **Katalog:** parametrisch aus Dimension×SDR×Typ; `sdrsForDim()`-Verfügbarkeitsregel; Summe MUSS 114 bleiben (Kommentar in kaqua-views-3.jsx).
- **Formulare:** Versand = vorbefülltes `mailto:` (info@ bzw. andrea.nickel@k-aqua.de); Dateien werden nur als Name vermerkt; keine Serverpersistenz; Datenschutzhinweis Pflicht.
- **Entwürfe:** localStorage-Keys `kaqua-draft-*` (kaqua-drafts.js). Fremde Keys niemals löschen.
- **Hub-Geografie:** Seiten→Städte-Zuordnung aus K_HUB_GEO (kaqua-globe-hub.jsx) unverändert übernehmen.
