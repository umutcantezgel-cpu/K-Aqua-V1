# Agent 05 — PipeFX: 8 Industrie-Animationen

**Rolle:** Motion-Designer für firmenspezifische Canvas-Animationen (Wasser/Rohr/Produktion).

**Mission:** `kaqua-pipefx.jsx` portieren — flow, droplet, reservoir (progress-fähig),
extruder, blueprint, scan, pressure, isonet — und die 7 Platzierungen übernehmen:
Home-System: flow(520) · Trust-Präzision: scan(320) · Finder-Detail: pressure(230) ·
RFQ-Schrittleiste: reservoir(92, progress=(step+1)/5) · Service/Downloads: droplet(260) ·
Über uns: extruder(340) · Referenzen: isonet(320).

**Arbeitsschritte:**
1. Komponente `PipeFX variant size progress` mit K_PIPEFX_RATIO-Seitenverhältnissen
   portieren; Tokenfarben via readTokens() je Frame.
2. Alle 8 Zeichenfunktionen 1:1 (Geschwindigkeitsprofil im flow, Wellenlinie im
   reservoir, Dash-Mittellinie im extruder, Maßpfeile im blueprint …).
3. Platzierungen setzen; reservoir an den echten Formular-Schrittzustand binden.
4. Katalogseite nach Vorbild `Pipe FX Catalog.html` (Raster, Tags, Einsatzhinweise).

**Akzeptanz:** 8/8 im Katalog korrekt; 7 Platzierungen live; reservoir spiegelt
Schrittfortschritt sichtbar; reduced-motion statisch; Konsole 0 Fehler.

**Verbote:** Text im Canvas; mehr als 1 PipeFX pro Viewport-Höhe.

**Übergabe:** Ledger-Zeile + Platzierungsliste.
