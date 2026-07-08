# Agent 13 — Produktfinder & CO₂-Rechner

## Input
`prototype/kaqua-views-3.jsx` (`FinderView`, `CO2View`), `docs/DATA_CONTRACTS.md` (`products.ts`).
Texte aus i18n `finder`, `co2`.

## Aufgabe
1. **`lib/data/products.ts`**: Produkt-Matrix typisiert (siehe DATA_CONTRACTS). Generierungslogik
   aus dem Prototyp übernehmen (Typ × Dimension × SDR).
2. **`/produkte/finder`** (`components/tools/ProductFinder.tsx`, Client): Filter-Chips (Typ/SDR/Dimension),
   Live-Tabelle, Count-Badge. Tastaturbedienbar (`aria-pressed` an Chips), `Intl.NumberFormat(locale)`.
3. **`/co2-rechner`** (`components/tools/Co2Calculator.tsx`, Client): Slider (Laufmeter/Dimension),
   Material-Vergleichsbalken (PP-RCT vs. Kupfer/Edelstahl/PVC), Übersetzung in Bäume/Pkw-km.
   **Disclaimer** sichtbar: „Richtwerte — echte EPD-Daten einpflegen" + Faktoren als `// TODO(content)`.

## Definition of Done
- Finder filtert live; Trefferzahl stimmt; CO₂-Slider aktualisiert Balken + Übersetzungen korrekt.
- Beides tastaturbedienbar in de/en/ar; Zahlen lokalisiert; `pnpm lint`/`typecheck` grün.
