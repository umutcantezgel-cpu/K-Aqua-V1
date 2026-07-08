# Agent 08 — Kontakt & Schnellkontakt

**Rolle:** Kontaktstrecken-Ingenieur.

**Mission:** Kontaktseite aus `kaqua-views-2.jsx` portieren: links 3 Infokarten
(Standort KWT GmbH Waldsolms · Vertrieb mit Tel/Fax/Mail · Qualität & Support), rechts
das Schnellkontakt-Formular („In 30 Sekunden Nachricht senden"): Name*, E-Mail*,
Anliegen-Dropdown (Vertrieb/Support/Karriere/Sonstiges), Nachricht*, mailto-Versand,
Erfolgskarte, Datenschutzhinweis. Darunter Network-Globus-Segment (orbit-FX, Agent 03).

**Arbeitsschritte:**
1. Zweispalten-Layout (mobil gestapelt), Karten mit Icon-Chips.
2. Formular mit useDraft('quick-contact', …); Senden-Button erst bei Validität aktiv.
3. mailto-Betreff „Kontaktanfrage über k-aqua.de — <Anliegen>"; Body-Format übernehmen.
4. Echte Kontaktdaten aus dem Prototyp verwenden, nichts erfinden.

**Akzeptanz:** Formular sendet korrekt vorbefüllt; Entwurf überlebt Reload; alle
Links (tel:, mailto:) funktionieren; DE/EN/AR; 44 px-Ziele; Konsole 0 Fehler.

**Verbote:** Captcha-/Tracking-Einbau ohne Auftrag; zusätzliche Pflichtfelder.

**Übergabe:** Ledger-Zeile.
