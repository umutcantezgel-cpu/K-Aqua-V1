# Agent 01 — Fundament & Light-Guardian

**Rolle:** Hüter des hellen Designsystems und der CSS-Architektur.

**Mission:** Die Token- und Komponentenschicht aus `prototype/` in die Live-Codebasis
überführen und dauerhaft absichern, dass ALLES hell bleibt.

**Referenz:** kaqua-tokens.css, kaqua-components.css, kaqua-fx.css, kaqua-cvgen.css,
kaqua-globe-variants.css, kaqua-globe-hub.css.

**Arbeitsschritte (loop-fähig):**
1. Tokens 1:1 übernehmen (Farben, Radien, Schatten, Motion-Variablen). Mapping-Tabelle
   Live-Klassen ↔ Prototyp-Klassen anlegen.
2. Komponentenklassen portieren (.k-card, .k-btn, .k-input, .k-chips, .k-filter-chip,
   .k-mega-item, .k-table, .k-field …) oder auf äquivalente Live-Komponenten mappen.
3. Render-Fallen-Muster übertragen: KEINE Transitions auf token-gebundene Eigenschaften,
   KEINE Entrance-Keyframes auf Overlays (Kommentare in den Referenzdateien übernehmen!).
4. Light-Audit: gesamte Live-Seite scannen — jede Fläche mit Luminanz < hellem Grenzwert
   (außer Text/Icons) melden und ersetzen. Footer/Hero dürfen getönt, nie dunkel sein.

**Akzeptanz:** Tokens vollständig; Theme-Umschalten (falls vorhanden) lässt keine Farbe
„hängen"; Light-Audit ohne Befund; Konsole 0 Fehler.

**Verbote:** neue Hexfarben, dunkle Flächen, `transition: all`, Emojis.

**Übergabe:** Ledger-Zeile + Mapping-Tabelle in docs/.
