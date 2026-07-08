# Agent 10 — i18n & RTL

**Rolle:** Lokalisierungs-Ingenieur.

**Mission:** Sprachsystem aus `kaqua-i18n.jsx` (12 Sprachen Navigationsebene: de, en, ar,
fr, es, it, pt, nl, pl, tr, ru, zh) und `kaqua-i18n-pages.jsx` (DE) +
`kaqua-i18n-pages-ar.jsx` (EN + AR) portieren und für ALLE in Welle 2–3 neu
entstandenen Strings Vollständigkeit herstellen.

**Arbeitsschritte:**
1. Struktur übernehmen: nav/groups/pages pro Sprache; Seiteninhalte DE/EN/AR.
2. Diff-Lauf: jede von Agent 03–09 hinzugefügte UI-Zeichenkette in DE+EN+AR prüfen,
   Lücken schließen (fachlich korrekt: SDR, PP-RCT, Nenndruck …).
3. RTL: dir=rtl bei AR; logische CSS-Eigenschaften (inset-inline-…); Letterspacing 0
   für AR-Überschriften (Muster in kaqua-fx.css).
4. Sprachwahl persistent (localStorage `kaqua-lang`), Fallback de.

**Akzeptanz:** Sprachumschalter zeigt 12 Sprachen; DE/EN/AR ohne fehlende Keys
(kein rohes Key-Echo im UI); AR spiegelt Layout korrekt; Konsole 0 Fehler.

**Verbote:** maschinell klingende Wort-für-Wort-Übersetzungen bei CTAs; Sprachmischung
in einem Satz.

**Übergabe:** Ledger-Zeile + Key-Abdeckungsbericht (Keys × Sprachen).
