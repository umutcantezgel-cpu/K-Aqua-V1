# K-Aqua — Language Switch Module (3D-Globus)

Drop-in-Integration des Sprachen-Hubs in die K-Aqua-Codebase
(Next.js 15 App Router · TypeScript · Tailwind CSS 4 · Framer Motion ·
next-intl · @react-three/fiber · lucide-react).

## 1 · Ordnerstruktur

```
├── lib/
│   └── i18n/
│       └── languages.ts              ← Sprachdatenbank (65 Sprachen, Farben, Anker, Locales)
├── components/
│   ├── globe/
│   │   ├── geo.ts                    ← Geo-Kern: TopoJSON-Loader, Hit-Test, MapPainter (Textur)
│   │   └── LanguageGlobe.tsx         ← R3F-Globus (Drag, Trägheit, flyTo, Hover, Anker-Projektion)
│   └── navigation/
│       ├── LanguageGlobeHub.tsx      ← Hauptmodul (Drop-In) — State, next-intl, Layout
│       ├── LanguageConfirmPanel.tsx  ← Glassmorphism-Panel, folgt der Region räumlich
│       ├── LanguageCarousel.tsx      ← Mobile-Hybrid: Swipe-Karussell ↔ Globus-Sync
│       ├── LanguageSearch.tsx        ← Sprachsuche (Overlay)
│       └── lang-ui.tsx               ← geteilte Glass-/Farb-Utilities (cssVars, LangDot)
└── public/
    └── data/
        └── countries-110m.json       ← Weltkarten-TopoJSON (siehe „3 · Assets“)
```

`lib/i18n/navigation.ts` existiert bei euch bereits (next-intl-Exporte) und wird
unverändert importiert: `import { useRouter, usePathname } from '@/lib/i18n/navigation';`

## 2 · Einbau

```tsx
// app/[locale]/language/page.tsx (Beispiel)
import { LanguageGlobeHub } from '@/components/navigation/LanguageGlobeHub';

export default function LanguagePage() {
  return (
    <main className="h-dvh">
      <LanguageGlobeHub />
    </main>
  );
}
```

- Das Modul füllt seinen Container (`h-full w-full`) — dem Parent eine Höhe geben (`h-dvh`).
- `LanguageGlobeHub` ist eine Client-Komponente; der WebGL-Canvas rendert erst nach Mount
  (SSR-sicher). Optionaler zusätzlicher Schutz: `next/dynamic` mit `ssr: false`.
- Props: `dark` (Theme), `tint` (Ruhetönung 0–0.35), `glow` (0–1),
  `autorotate`, `speed` (°/s), `dataUrl`, `className`.

### Sprachwechsel-Logik

`LanguageGlobeHub.confirm()` macht exakt:

```ts
router.replace(pathname, { locale: lang.locale });
```

Die aktive Sprache wird aus `useLocale()` abgeleitet — kein eigener Persistenz-Layer nötig,
next-intl (Cookie/Routing) ist die Source of Truth.

**Wichtig:** Alle 65 Locale-Codes müssen in eurer next-intl-Routing-Config stehen.
`languages.ts` exportiert sie fertig:

```ts
import { ALL_LOCALE_CODES } from '@/lib/i18n/languages';
// in routing.ts:  locales: ALL_LOCALE_CODES
```

Regionale Varianten nutzen BCP-47 (`en-GB`, `es-419`, `pt-BR`, `zh-Hans`, `fr-SN`, …).
Wenn ihr andere Codes verwendet, nur das `locale`-Feld in `languages.ts` anpassen.

## 3 · Assets / Daten

Ländergeometrie ist **world-atlas 110m** (TopoJSON, ~108 KB, abgeleitet aus Natural
Earth, public domain). Einmalig ins Repo holen:

```bash
mkdir -p public/data
curl -o public/data/countries-110m.json https://unpkg.com/world-atlas@2.0.2/countries-110m.json
```

Geladen wird zur Laufzeit via `fetch('/data/countries-110m.json')` (ein Request,
danach gecacht). Länder→Sprache-Zuordnung läuft über ISO-3166-numerische IDs in
`languages.ts`.

## 4 · NPM-Pakete

Zusätzlich zum bestehenden Stack:

```bash
npm install d3-geo topojson-client
npm install -D @types/d3-geo @types/topojson-client @types/geojson
```

(`three`, `@react-three/fiber`, `framer-motion`, `next-intl`, `lucide-react` sind bereits vorhanden.)

## Architektur-Notizen

- **Rendering:** Der Globus ist eine R3F-Kugel mit dynamischer `CanvasTexture`.
  `MapPainter` (geo.ts) malt die äquirektangulare Karte im „physischen Atlas“-Look
  (Pergament-Landmassen mit deterministischem Jitter, Papierkorn, Gradnetz) und
  legt Sprach-Tönungen als Heat-Layer darüber. Statische Ebenen sind als
  Offscreen-Canvas/Path2D gecacht → Repaints nur während Hover/Auswahl-Animationen,
  wenige ms bei 2048×1024.
- **Hit-Test:** Raycast auf die Kugel → lat/lon → Bounds-Prefilter + `geoContains`.
  Klick-Toleranz: nächster sichtbarer Sprach-Anker < 22 px (Kleinstaaten).
- **Panel-Tracking:** Die Szene schreibt die projizierte Anker-Position jeden Frame
  in eine Ref (`anchorOut`), das Panel positioniert sich in einem eigenen rAF-Loop
  imperativ — 60 fps ohne React-Re-Render. Framer Motion animiert nur Entrance/Exit.
  Rotiert die Region auf die Rückseite, dimmt das Panel auf 15 % und wird
  click-transparent.
- **Mobile-Hybrid:** `< lg` erscheint das Karussell. Tap → `globeRef.flyTo(id)`
  (kürzester Rotationsweg, ease-in-out, 0.7–1.5 s) + Pending-State → Panel.
  Pending/aktive Karte wird per `scrollTo` mittig eingescrollt.
- **Tailwind-only Styling:** Dynamische Laufzeitwerte (65 Leitfarben, Panel-/Tooltip-
  Transforms) laufen über CSS-Custom-Properties (`bg-(--lc)`, gesetzt per Ref-Callback
  `cssVars()`) bzw. imperative Transforms — die von Tailwind vorgesehene Methode;
  JSX enthält keine `style`-Props.
- **Farben:** Leitfarben deterministisch über den Goldenen Winkel (gleiche
  Chroma/Helligkeit, oklch). Reihenfolge in `languages.ts` nicht ändern.
- **A11y / Motion:** `prefers-reduced-motion` deaktiviert Autorotation & Flüge
  (Sprung statt Animation), Framer-Entrances via `useReducedMotion`. Hit-Targets ≥ 44 px,
  RTL-Sprachen mit `dir="rtl"`. Escape schließt Panel/Suche.
- **Dark Mode:** über die `dark`-Prop (Map-Textur + UI wechseln gemeinsam) — an euer
  Theme-System anbinden, z. B. `dark={resolvedTheme === 'dark'}`.
