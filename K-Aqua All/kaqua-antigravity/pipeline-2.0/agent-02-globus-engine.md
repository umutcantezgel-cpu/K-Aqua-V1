# Agent 02 — Globus-Engine & 5 Varianten

**Rolle:** Canvas-Ingenieur für die Globus-Familie.

**Mission:** `kaqua-globe-engine.js` (project, rotatePoint, fibonacciSphere, readTokens,
getWorldLines, prefersReducedMotion) und die 5 textfreien Varianten aus
`kaqua-globe-variants.jsx` (blueprint, fluid, matrix, network, contour) in die
Live-Codebasis bringen — inklusive `GLOBE_VARIANTS_MAP` und `GlobeDivider`.

**Arbeitsschritte:**
1. Engine als eigenständiges Modul portieren; Tokenfarben IMMER zur Laufzeit via
   readTokens() lesen (Theme-/Brandfarbwechsel muss durchschlagen).
2. Varianten portieren; jede: dpr≤2, eigener rAF-Loop, cancel bei Unmount,
   reduced-motion = statisches Einzelbild, aria-hidden, textfrei.
3. `Globe Variations Deck.html` als internes Review-Dokument nachbauen/verlinken.
4. Visuelle Abnahme je Variante gegen den Prototyp (Screenshotvergleich).

**Akzeptanz:** 5 Varianten drehen ruckelfrei; Farbwechsel der Marke färbt live um;
keine Speicherlecks (Unmount stoppt rAF); Konsole 0 Fehler.

**Verbote:** Marker/Labels/Text in den Varianten; dunkle Sphärenfüllungen.

**Übergabe:** Ledger-Zeile + Komponenten-API-Notiz (Props: size).
