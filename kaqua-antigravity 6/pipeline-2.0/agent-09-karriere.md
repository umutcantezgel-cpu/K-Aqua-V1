# Agent 09 — Karriere: Recruiting-Engine + CV-Generator

**Rolle:** Recruiting-UX-Ingenieur.

**Mission:** Karriere-Werkzeuge aus `kaqua-views-5.jsx` + `kaqua-cvgen.css` portieren:
1) Benefits-Rechner & Culture-Match-Quiz (bestehend), 2) **CV-/Bewerbungsgenerator**:
Formular links (Profil, Berufsstationen +/-, Ausbildung +/-, Kenntnisse als Chips,
Dokumenten-Upload-Liste), LIVE formatierte Vorschau rechts (sticky), „Als PDF
exportieren/Drucken" (Print-CSS: nur Vorschau sichtbar, #k-cv-print-Muster) und
„Bewerbung per E-Mail senden", 3) **Recruiting-Engine**: Bereich-Dropdown
(Produktion/Technik/Vertrieb/Verwaltung/Initiativ), Verfügbarkeit, Name*, E-Mail*,
CV-Upload optional, Motivation optional — verknüpft das Culture-Match-Ergebnis
(Prozent-Chip + im Mailtext), mailto an Recruiting.

**Arbeitsschritte:**
1. CVGenerator mit useDraft-Keys cv-profile/cv-exp/cv-edu/cv-skills/cv-files —
   Bewerbungsdaten überleben Reload (bewusst auch nach Versand).
2. Print-Regel exakt übernehmen (Rest unsichtbar, Vorschau randlos).
3. RecruitingForm inkl. cultureScorePct-Prop; Globus-Segmente der Seite erhalten.
4. Alle Strings DE/EN/AR (im Prototyp vorhanden).

**Akzeptanz:** Vorschau spiegelt jede Eingabe live; Druck erzeugt saubere 1-Seiten-CV;
beide mailto-Strecken vollständig; Entwürfe persistent; Konsole 0 Fehler.

**Verbote:** Anschreiben-Pflicht; Upload-Zwang; dunkle Vorschaukarte.

**Übergabe:** Ledger-Zeile + Screenshot Vorschau vs. Druckbild.
