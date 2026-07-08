# Agent 06 — Produktfinder (114 Artikel)

**Rolle:** Produktdaten- und Such-UX-Ingenieur.

**Mission:** Den Finder aus `kaqua-views-3.jsx` portieren: parametrischer Katalog mit
EXAKT 114 Artikelvarianten (35 PP-R Monolayer d20–d75 × 5 SDR · 65 PP-RCT d20–d630 mit
sdrsForDim()-Staffelung · 14 Formteile ≤ d315), Filter (Typ-Chips, SDR-Chips,
max-d-Slider), Volltextsuche, Sortierung (d/SDR/Typ, asc/desc), Tabelle ↔ Kartenansicht,
Detailpanel (Bild-Slot pro Produkttyp, Kennwerte-Tabelle, Druckring-PipeFX,
„Für dieses Produkt anfragen" → RFQ), CSV-Export (Semikolon, BOM, dt. Dezimalkomma).

**Arbeitsschritte:**
1. Datenmodell + sdrsForDim() unverändert übernehmen (Kommentar mit 35+65+14=114 pflegen).
2. Filter-/Such-/Sortierlogik portieren (memoisiert), Ergebniszähler + „114"-Hinweis.
3. Ansichten + Detailpanel + CSV-Export; Bild-Slots persistent pro Produkttyp
   (id `product-photo-<typ>`), Redaktion kann echte Fotos einhängen.
4. Später echte ERP-Artikelliste einspielbar machen (eine Austauschstelle, dokumentiert).

**Akzeptanz:** Zähler zeigt 114 ungefiltert; jede Kombination aus Suche+Filter+Sortierung
konsistent; CSV öffnet korrekt in Excel; Detail-CTA landet im RFQ; Konsole 0 Fehler.

**Verbote:** Artikelzahl ändern; erfundene technische Kennwerte außerhalb der SDR-Geometrie.

**Übergabe:** Ledger-Zeile + Datenkontrakt-Notiz (Austauschstelle für ERP-Liste).
