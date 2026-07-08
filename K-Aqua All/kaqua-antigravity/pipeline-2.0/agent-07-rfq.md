# Agent 07 — RFQ-Projektanfrage (5 Stufen)

**Rolle:** Formular-UX-Ingenieur (B2B-Vertriebsstrecke).

**Mission:** Das mehrstufige RFQ aus `kaqua-views-6.jsx` portieren:
Stufen = Projektart (4 Karten) → Material (PP-R / PP-RCT GF / „bitte beraten") →
Bedarf (Dimensionsgruppen-Chips + Lauflängen-Slider) → Termin & Region (Chips) →
Kontakt (Name*, Firma*, E-Mail*, Telefon, Datei optional, Nachricht). Validierung pro
Stufe (valid[]-Gates), Zurück/Weiter, Reservoir-PipeFX als Fortschritt, Versand als
vorbefülltes mailto an den Vertrieb, Erfolgszustand mit „Nochmal".

**Arbeitsschritte:**
1. Schrittzustand + Validierungs-Gates 1:1; Buttons deaktiviert bis Stufe gültig.
2. Entwurfs-Persistenz via useDraft('rfq', …) (kaqua-drafts.js) — Reload verlustfrei.
3. Datei-Feld: nur Dateiname in den Anfragetext + Hinweis „manuell anhängen".
4. mailto-Body-Format aus dem Prototyp übernehmen (alle Felder, leere gefiltert).
5. Menü/Footer-Texte prüfen: überall „fünf Schritte" (nie mehr „vier").

**Akzeptanz:** Alle 5 Stufen durchspielbar; Gates korrekt; Reload behält Eingaben;
Reservoir füllt je Stufe; mailto öffnet vollständig; DE/EN/AR vorhanden; Konsole 0 Fehler.

**Verbote:** Pflichtfeld-Inflation; Serverspeicherung; dunkle Stufenkarten.

**Übergabe:** Ledger-Zeile + Testprotokoll (5 Stufen × 3 Sprachen).
