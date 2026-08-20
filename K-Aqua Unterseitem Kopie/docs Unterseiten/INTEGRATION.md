# Integration: Markdown → k-aqua-v1.vercel.app

## Was die Website aktuell hat

- **Tech-Stack:** Next.js (App Router) auf Vercel, i18n mit `/de/`-Prefix
- **Bestehende Produkt-URLs:**
  - `/de/produkte` — generische Übersicht (4 Bausteine, 1 Tabelle — sehr dünn)
  - `/de/produkte/finder` — interaktiver Rohren-Filter (Dimension, SDR, Wandstärke)
- **Fehlend:** Alle Produkt-Detailseiten für Formteile, Armaturen, Werkzeuge, Zubehör etc.
  - `/de/produkte/fittings` → 404
  - `/de/produkte/rohre` → 404

---

## Empfohlene URL-Struktur

| Kategorie (EN slug) | Deutsche URL | Index-Seite | Produktseite (Beispiel) |
|---------------------|-------------|-------------|------------------------|
| `fittings` | `/de/produkte/formteile` | ✅ | `/de/produkte/formteile/cap` |
| `pipes` | `/de/produkte/rohre` | ✅ | `/de/produkte/rohre/k-pipe-pp-r-sdr-6` |
| `tools` | `/de/produkte/werkzeuge` | ✅ | `/de/produkte/werkzeuge/welding-tool` |
| `transition-fittings` | `/de/produkte/uebergangsfittings` | ✅ | `/de/produkte/uebergangsfittings/union` |
| `weld-in-saddles` | `/de/produkte/einschweisssattel` | ✅ | `/de/produkte/einschweisssattel/weld-in-saddle` |
| `accessories` | `/de/produkte/zubehoer` | ✅ | `/de/produkte/zubehoer/pipe-clamps` |
| `valves` | `/de/produkte/armaturen` | ✅ | `/de/produkte/armaturen/pp-r-ball-valve-ball-in-pp` |

**Gesamtübersicht (Sortierseite):** `/de/produkte/alle` oder Erweiterung von `/de/produkte`

---

## Next.js Dateistruktur (App Router)

```
src/
├── content/
│   └── products/              ← Markdown-Dateien hier ablegen
│       ├── formteile/
│       │   ├── index.md
│       │   ├── cap.md
│       │   ├── socket.md
│       │   └── …
│       ├── rohre/
│       │   ├── index.md
│       │   └── …
│       └── …
│
└── app/
    └── [locale]/
        └── produkte/
            ├── [category]/
            │   ├── page.tsx          ← Kategorie-Übersicht (rendert index.md)
            │   └── [slug]/
            │       └── page.tsx      ← Produkt-Detailseite (rendert slug.md)
            └── alle/
                └── page.tsx          ← Gesamtübersicht aller Produkte
```

---

## Schritt-für-Schritt Implementierung

### 1. Markdown-Dateien ins Repo kopieren

```
docs/ → src/content/products/
```

Die Frontmatter-Felder (`title`, `slug`, `category`, `article_codes`) sind bereits vorhanden.

### 2. Markdown-Parser einrichten

Falls nicht vorhanden:
```bash
npm install gray-matter remark remark-html
# oder: next-mdx-remote / contentlayer
```

### 3. Dynamische Route erstellen

**`src/app/[locale]/produkte/[category]/[slug]/page.tsx`:**
```tsx
import { getProductBySlug } from '@/lib/products'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.category, params.slug)
  return (
    <article>
      <h1>{product.title}</h1>
      <MDXRemote source={product.content} />
    </article>
  )
}

export async function generateStaticParams() {
  return getAllProductSlugs() // aus Markdown-Dateien generieren
}
```

### 4. Bestehenden Produktfinder erweitern

Der Finder unter `/de/produkte/finder` filtert aktuell nur Rohren-Dimensionen. Erweiterung:
- Tab "Formteile" → filtert nach Kategorie + Dimension
- Tab "Armaturen" → filtert nach Dimension
- Jede Tabellenzeile verlinkt auf die Detailseite

---

## Sortierseite `/de/produkte/alle`

Die `docs/index.md` enthält bereits alle 71 Produkte in Tabellen-Form.  
Auf der Website als interaktive Tabelle mit:
- Filter: Kategorie, Dimension, Artikelnummer-Suche
- Sort: A–Z, nach Dimension, nach Kategorie
- Jede Zeile: Link zur Detailseite

Technisch: Die `docs/index.md` kann direkt als Datenquelle dienen oder durch eine eigene Datenbankabfrage über die Markdown-Frontmatter-Felder `article_codes` ersetzt werden.

---

## Bestehende Navigation erweitern

Aktuell im Nav: `Produkte` → `/de/produkte`

Empfehlung — Dropdown hinzufügen:
```
Produkte
├── Produktsystem    → /de/produkte
├── Produktfinder    → /de/produkte/finder
├── ─────────────
├── Rohre            → /de/produkte/rohre
├── Formteile        → /de/produkte/formteile
├── Übergangsfittings→ /de/produkte/uebergangsfittings
├── Armaturen        → /de/produkte/armaturen
├── Einschweißsattel → /de/produkte/einschweisssattel
├── Werkzeuge        → /de/produkte/werkzeuge
└── Zubehör          → /de/produkte/zubehoer
```

---

## Schnellste Integrationsoption

Falls kein Zugriff auf den Next.js-Quellcode besteht:

1. **Vercel CMS / Contentlayer** — Markdown direkt aus dem Repo rendern, kein Custom-Code nötig
2. **Sanity / Notion** — Markdown-Inhalt als Datenquelle importieren
3. **Statische HTML-Seiten** — Markdown per `pandoc` in HTML konvertieren und als statische Dateien deployen

---

## Dateien in diesem Ordner

```
docs/
├── INTEGRATION.md         ← Diese Datei
├── index.md               ← Gesamtübersicht aller 71 Produkte
├── fittings/ (15 Dateien)
├── pipes/ (13 Dateien)
├── tools/ (14 Dateien)
├── transition-fittings/ (13 Dateien)
├── valves/ (9 Dateien)
├── weld-in-saddles/ (3 Dateien)
└── accessories/ (5 Dateien)
```

**Gesamt: 79 Markdown-Dateien**, jede mit Frontmatter (`title`, `slug`, `category`, `article_codes`) und strukturiertem Inhalt (Beschreibung + Artikeltabelle).
