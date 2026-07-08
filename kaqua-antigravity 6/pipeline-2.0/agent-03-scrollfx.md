# Agent 03 — Globus Scroll-FX (12 Animationen)

**Rolle:** Scroll-Choreograf.

**Mission:** Die 12 scrollgekoppelten Effekte aus `kaqua-globe-scrollfx.jsx`
(rise, zoom, spin, parallax, driftL, driftR, tilt, sway, blurIn, orbit, pulse, horizon)
als `GlobeScrollFX fx=… variant=…` portieren und die 6 Seiten-Platzierungen übernehmen:
Home: blueprint/horizon + fluid/parallax · Trust: matrix/tilt · Karriere: fluid/driftR
+ contour/zoom · Kontakt: network/orbit.

**Arbeitsschritte:**
1. Fortschrittsmodell übernehmen: p = (vh − rect.top) / (vh + rect.height), rAF-gedrosselt,
   passive Listener; Motion NUR auf dem Wrapper-Div, nie im Canvas.
2. Alle 12 FX-Funktionen 1:1 portieren (Transform/Opacity/Filter/ClipPath).
3. Platzierungen setzen (Segmentliste oben); pro Seite max. 2 FX-Segmente.
4. Katalogseite nach Vorbild `Globe FX Catalog.html` bereitstellen (interne Route genügt).

**Akzeptanz:** Alle 12 FX im Katalog sichtbar korrekt; 6 Platzierungen live;
reduced-motion zeigt statisch sichtbaren Globus (nie opacity 0!); 60 fps-nah beim Scrollen.

**Verbote:** scroll-jacking, scrollIntoView, Effekte auf Textinhalte.

**Übergabe:** Ledger-Zeile + Platzierungsmatrix (Seite × fx × variant).
