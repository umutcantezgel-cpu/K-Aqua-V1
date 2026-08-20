# Next.js Integrationsspezifikation

Referenzdokument für Prompt 2. Beschreibt, wie die 3D-Modelle in `k-aqua-v1.vercel.app` eingebaut werden.

---

## Ausgangslage

- Next.js App Router auf Vercel, i18n mit `/de/`-Prefix
- Vorhanden: `/de/produkte` (dünn), `/de/produkte/finder` (Rohr-Filter)
- Fehlend: alle Produktdetailseiten — `/de/produkte/fittings` liefert 404
- 71 Produkte liegen als Markdown in `docs Unterseiten/`

Die Produktseiten müssen also ohnehin gebaut werden. Der 3D-Viewer kommt gleich mit.

---

## Dateistruktur

```
src/
├── content/products/                    ← korrigierte Markdowns aus Phase 1
│   ├── formteile/  tee.md · socket.md · …
│   ├── rohre/      k-pipe-pp-r-sdr-6.md · …
│   └── …
│
├── data/
│   └── produkt-registry.json            ← einzige Quelle für Produktliste und Modellstatus
│
├── lib/
│   ├── products.ts                      ← Markdown lesen, Frontmatter parsen
│   └── kaqua-3d.ts                      ← Registry lesen, Produktmodul auflösen
│
├── components/
│   ├── ProductViewer.tsx                ← Server-Hülle, rendert Fallback + dynamischen Client
│   ├── ProductViewer.client.tsx         ← 'use client', Web-Component + Lazy-Import
│   ├── ProductTable.tsx                 ← Maßtabelle, Zeilenklick setzt Viewer-Größe
│   └── gallery/  FilterBar · ProductTile · GalleryGrid
│
├── vendor/kaqua-3d/                     ← Build-Ausgabe aus dem Core-Refactor
│   ├── core.mjs
│   └── products/  ball-valve-pp.mjs · tee.mjs · …
│
└── app/[locale]/produkte/
    ├── page.tsx                         ← Übersicht
    ├── 3d/page.tsx                      ← 3D-Galerie
    ├── finder/page.tsx                  ← bestehend
    └── [category]/
        ├── page.tsx                     ← Kategorieübersicht
        └── [slug]/page.tsx              ← Produktdetail mit Viewer
```

**Warum `vendor/`:** Der 3D-Core ist ein eigenständiges Artefakt mit eigenem Build. Er wird als fertiges ESM eingecheckt, nicht in den Next.js-Build gezogen. So bleibt der Website-Build schnell und der Core unabhängig testbar.

---

## URL-Schema

| Kategorie (Registry) | Deutsche URL |
|---|---|
| `fittings` | `/de/produkte/formteile` |
| `pipes` | `/de/produkte/rohre` |
| `transition-fittings` | `/de/produkte/uebergangsfittings` |
| `valves` | `/de/produkte/armaturen` |
| `weld-in-saddles` | `/de/produkte/einschweisssattel` |
| `accessories` | `/de/produkte/zubehoer` |
| `tools` | `/de/produkte/werkzeuge` |

Galerie: `/de/produkte/3d` · Produktdetail: `/de/produkte/<kategorie-de>/<slug>`

Die Zuordnung steht im Feld `url` jedes Registry-Eintrags. Nicht im Code duplizieren.

---

## Ladestrategie

Der wichtigste Punkt der ganzen Integration: **three.js darf niemals im initialen Bundle liegen.**

```
Initial (SSR + Hydration)
├── Seitengerüst, Text, Maßtabelle, Produktbild        ~180 kB gzip
└── kein 3D

Bei Sichtbarkeit des Viewer-Containers (IntersectionObserver, 200 px Vorlauf)
├── chunk: three + core.mjs                            ~620 kB gzip   ← einmal pro Session
└── chunk: products/<slug>.mjs                          ~40 kB gzip   ← pro Produkt
```

- `next/dynamic` mit `ssr: false` — die Web-Component registriert sich am `window`
- Der Core-Chunk wird geteilt. Zehn Viewer laden three.js einmal.
- Auf der Galerieseite läuft **höchstens ein WebGL-Kontext gleichzeitig.** Browser limitieren auf 8–16; darüber verwirft der Treiber die ältesten Kontexte und die Seite bricht zusammen. Kacheln zeigen das Standbild, der Viewer startet auf Interaktion, der vorherige wird abgebaut.
- `priority`-Viewer (oberhalb der Falz auf der Produktseite) darf vorgeladen werden — aber erst nach `load`, nie davor.

---

## Der Adapter

```tsx
<ProductViewer
  productId="fittings/tee"
  size={32}
  height="clamp(360px, 52vh, 620px)"
  features={['size','explode','section','dims','presets']}
  priority
/>
```

Er tut drei Dinge und sonst nichts:

1. Container mit **fester Höhe** rendern (verhindert Layout-Sprung → CLS)
2. Produktmodul lazy importieren und an `<three-d-stage>` übergeben
3. Beim Unmount aufräumen: Renderer, Geometrien, Materialien, Texturen, RAF-Loop, Observer

Alles andere — Kamera, Explosion, Schnitt, Bemaßung, Tastatur — gehört dem Core. **Keine Viewer-Logik in React nachbauen.** Sobald React anfängt, Kamerapositionen zu verwalten, gibt es zwei Zustandsquellen und der Viewer fängt an zu ruckeln.

---

## Kopplung Tabelle ↔ Viewer

Das ist der eigentliche Mehrwert gegenüber einem Standbild:

- Klick auf eine Tabellenzeile → Viewer wechselt auf diese Nennweite, Zeile wird hervorgehoben
- Größenwechsel im Viewer → zugehörige Zeile wird hervorgehoben und ins Bild gescrollt
- `?d=63` in der URL setzt beides beim Laden
- Größenwechsel schreibt die URL fort (`replaceState`, kein History-Eintrag) → Ansicht ist teilbar

Ein Installateur, der wissen will, wie der d63 aussieht, klickt die Zeile an und sieht ihn. Das ist der Moment, für den das ganze Projekt gebaut wird.

---

## SEO

Der Viewer ist **progressive Enhancement**. Ohne JavaScript zeigt die Seite Titel, Beschreibung, vollständige Maßtabelle und Artikelnummern — serverseitig gerendert.

- `generateStaticParams` über die Registry → alle Produktseiten statisch
- `Product`-Schema je Seite: `name`, `sku` je Größe, `category`, `additionalProperty` für die Maße, `image` (3D-Standbild)
- `ItemList`-Schema auf der Galerieseite
- Das 3D-Standbild ist zugleich `og:image` — 1200 × 900, transparent, 3/4-Ansicht
- Canonical-URLs, `hreflang` für `de`/`en`

---

## Barrierefreiheit

- Canvas mit `role="img"` und beschreibendem `aria-label` inklusive der Maße
- Alle Bedienelemente sind echte Buttons mit sichtbarem Fokusring
- Tastatur: Pfeiltasten drehen, `+`/`−` zoomen, `O` schaltet auf/zu, `R` setzt zurück
- `prefers-reduced-motion`: kein Auto-Rotate, Animationen auf 120 ms
- Ohne WebGL: Standbild plus vollständige Maßtabelle, keine Fehlermeldung
- Die Maßtabelle ist immer im DOM, nicht nur im Viewer — für Screenreader ist sie die eigentliche Produktinformation

---

## Performance-Budget

| Metrik | Ziel |
|---|---|
| LCP Produktseite (Mobil, gedrosselt) | < 2,0 s |
| LCP Galerie | < 2,5 s |
| CLS | < 0,05 |
| JS bis Interaktivität, ohne 3D | < 180 kB gzip |
| three + Core, eigener Chunk | < 620 kB gzip |
| Produktmodul | < 40 kB gzip |
| Time to First Frame nach Klick | < 900 ms |
| Lighthouse Performance / A11y / SEO | ≥ 90 / ≥ 95 / 100 |

Vor und nach der Integration eine Bundle-Analyse laufen lassen und beide beilegen.

---

## Ein neues Modell hinzufügen

```
1. products/<slug>.mjs nach src/vendor/kaqua-3d/products/ kopieren
2. Standbild nach public/3d/<slug>.png
3. In produkt-registry.json: build.status = "fertig"
4. Deploy
```

Vier Schritte, kein Seitencode. Braucht es mehr, ist die Integration falsch gebaut — das ist Abnahmekriterium 12 in Prompt 2.

---

## Was bewusst nicht gemacht wird

- **Kein AR/QuickLook.** Klingt gut, ist aber ein eigenes Projekt: USDZ-Export, iOS-Tests, Dateigrößen. Später, wenn die Modelle stehen.
- **Kein Modell-Download für Endnutzer.** Der Export im Viewer ist ein Entwicklerwerkzeug. Ob K-Aqua STEP-Dateien herausgeben will, ist eine Geschäftsentscheidung, keine technische.
- **Keine Animation im Scroll.** Sieht auf Messeständen gut aus, kostet auf Mobilgeräten Akku und Punkte bei Core Web Vitals.
- **Kein Viewer auf der Kategorieübersicht.** Zwölf Kacheln mit Standbild laden schnell. Zwölf Viewer nicht.
