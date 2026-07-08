# REPAIR-RUNDE — Notfall-Wiederherstellung (vor allen weiteren Wellen)

**Lage:** Während der Integrationsläufe wurde die Live-Webseite beschädigt. Der
Produktfinder meldet ~123 Issues und rendert nichts. Diese Runde hat Vorrang vor
JEDEM anderen Segment. Es gilt `loop-protocol.md`; Agent 12 nimmt jede Stufe ab.

**Referenz (Soll-Zustand):** `kaqua-antigravity/prototype/` — dort ist alles lauffähig.
Im Zweifel gewinnt IMMER die Referenz.

## R0 — Triage & Sicherung (Orchestrator)
- Letzten grünen Stand identifizieren (Git). Wenn vorhanden: darauf zurücksetzen und
  Änderungen seither als Patches neu bewerten. Wenn nicht: Ist-Zustand einfrieren (Branch).
- Alle Build-/Konsolen-Issues in eine Liste exportieren und nach Datei gruppieren.
- KEINE neuen Features, solange der Build rot ist.

## R1 — Build stabilisieren (Agent 01)
- Issue-Liste auf 0 bringen: Importe/Exporte, fehlende Module, Syntax, Typfehler.
- Reihenfolge der Skript-/Modulladung gegen die Referenz prüfen (Engine vor Varianten
  vor FX vor Views; Drafts vor Formular-Views).
- Abnahme: Build grün, alle Routen laden ohne Konsolenfehler (leer ist ok, kaputt nicht).

## R2 — Produktfinder wiederherstellen (Agent 06)
- Den Finder NICHT flicken: komplett neu von `prototype/kaqua-views-3.jsx` portieren
  (Datenmodell + sdrsForDim + FinderView + DetailPanel).
- Abnahme: Zähler zeigt 114 ungefiltert; Tabelle sichtbar gefüllt; Suche, Sortierung,
  Karten/Tabelle-Umschalter, CSV-Export, Detailpanel mit Bild-Slot + „Anfrage stellen" → RFQ.

## R3 — Hero: Video raus, Globus rechts, Animation auf allen Endgeräten (Agent 03)
- Das Hero-Video vollständig entfernen (Element, Assets, Preloads, Poster).
- Globus + Scroll-Choreografie wieder einbauen nach `prototype/kaqua-scrolly.jsx`:
  **Globus startet RECHTS, Hero-Copy links**; beim Scrollen wandert der Globus im
  Bogen (unten herum) zur Mitte, Schwerpunkt-Karten poppen sequenziell auf.
- **Alle Endgeräte animiert:** Desktop (>900 px) = volle Scroll-Choreografie;
  kompakte Geräte (≤900 px) = drehender Globus (responsive Größe ~86 vw, max 440)
  RECHTS bzw. oben (einspaltig ≤640 px), sanfte Scroll-Parallax auf dem Globus und
  gestaffelte Karten-Reveals per IntersectionObserver. NUR bei prefers-reduced-motion
  vollständig statisch (Karten sofort sichtbar — nie opacity 0!).
- Abnahme: kein <video> mehr im DOM; Globus rechts sichtbar + dreht auf Desktop UND
  Mobil; Scroll-Sequenz flüssig; reduced-motion zeigt alles statisch sichtbar.

## R4 — Neuer Header mit Dropdowns (Agent 04, CSS-Support Agent 01)
- Desktop-Menü ersetzen durch umfassenden Header nach `prototype/kaqua-app.jsx`
  (NAV_STRUCTURE + NavDropdown) und `prototype/kaqua-components.css`
  (.k-nav-dd-trigger/.k-nav-dd-panel):
  Start · „Produkte & Tools"▾ · „Wissen"▾ · „Unternehmen"▾ · Kontakt · Sprache ·
  Theme · CTA „Angebot anfragen" · Menü-Button (öffnet Globus-Hub).
- Verhalten: Hover öffnet (nur hover-fähige Geräte, 140 ms Schließ-Verzögerung,
  Hover-Brücke), Klick/Tap toggelt, Esc + Außenklick schließen, aria-expanded/haspopup,
  aktive Gruppe markiert.
- Gerätestufen: ≥1281 px zweispaltige Panels; 981–1280 px kompakt, einspaltige Panels;
  ≤980 px keine Inline-Links — nur Menü-Button → Globus-Hub (mobil gestapelt).
- WICHTIG: Panels und Hub OHNE Entrance-Keyframes/Opacity-Transitions rendern
  (bekannter Hänger — Kommentare in den Referenz-CSS-Dateien).
- Abnahme: alle 17 Seiten über den Header erreichbar; Tastaturbedienung; kein Overflow
  an den Panel-Rändern bei 981–1440 px; Konsole 0 Fehler.

## R5 — Gesamtabnahme (Agent 12)
- Smoke-Matrix: alle Seiten × DE/EN/AR × 1440/390 px; Konsole überall 0 Fehler.
- Regressionvergleich gegen `prototype/K-Aqua Redesign.html` (Stichproben-Screenshots).
- Erst nach `REPAIR-OK` im Ledger dürfen normale Wellen (segments.md) weiterlaufen.
