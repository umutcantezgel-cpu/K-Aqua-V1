# Integrationsauftrag: K Aqua Kontakt Suite

Du arbeitest im Workspace der bestehenden K Aqua Webseite. Im Ordner `kaqua-kontakt-export/` liegt ein globales Lead-Modul (10 Bauformen, eine Codebasis, Light/Dark, animiert) samt Next.js Referenz. Integriere es vollstaendig nach diesen Regeln.

## Ziel
Jede einzelne Seite der Plattform erhaelt ausnahmslos einen Kontaktweg mit maximal drei Eingaben (Telefon, Email, Interesse-Chip). Leads landen sofort im CRM plus Vertriebs-Benachrichtigung.

## Schritte
1. Sichten: `README.md`, `nextjs/INTEGRATION.md`, dann `demo-komponenten.html` im Browser oeffnen (Verhalten, Animationen, Toene). `demo-positionen.html` ist der Katalog der Positionsklassen A-J.
2. Basis verdrahten: `kaqua-tokens.css` global laden (Tokens ggf. mit bestehenden Variablen mappen statt doppeln). CSS-String aus `kaqua-kontakt.js` als eigenstaendiges Stylesheet extrahieren und global laden.
3. Global platzieren: `KontaktBlock` (Variante block) im Root Layout direkt vor dem Footer — nicht pro Seite einbinden. Slug-Aufloesung Route→Slug zentral (Segment-Config oder Map). Feste Hoehe reservieren, kein Layout Shift.
4. Content Map fuellen: fuer JEDE bestehende Route einen Eintrag in `content/kontakt-bloecke.ts` schreiben. Pflicht: einzigartig formulierter Text, der das konkrete Problem der Seite aufgreift. Verboten: Keyword-Austausch-Templates. Der Union-Typ der Slugs muss jede Route abdecken, Fallback nur als Notnagel.
5. Zusatzformen gezielt: maximal eine pro Seite zusaetzlich zum Block. Empfehlung: `fab` global auf Inhaltsseiten, `hero` auf der Startseite, `sidebar` auf langen Fachartikeln, `modal` an bestehende Kontakt-Buttons (`data-kaqua-open` bzw. openModal). Sticky-Leiste nur auf Kampagnenseiten.
6. Leads verdrahten: in `app/actions/lead.ts` CRM-Webhook (ENV `CRM_WEBHOOK_URL`) und Sofort-Benachrichtigung an den Vertrieb (Email/Slack) mit tel: Klick-Link anschliessen. Anreicherung (Quellseite, Interesse, Sprache, Zeitstempel) beibehalten. Honeypot und Zeitschwelle nicht entfernen, kein Captcha einbauen.
7. Theme: falls die Seite noch keinen Theme-Schalter hat, `kaqua-theme.js` Logik als kleine Client-Komponente portieren (localStorage Key `kaqua-theme`, Attribut `data-theme` auf `<html>`).
8. Qualitaet sichern: Lighthouse ohne CLS-Regression, Formular funktioniert ohne JS (Server Action Fallback), alle Texte ohne Sonderzeichen-Fehler, Erfolgskarte erscheint ohne Redirect, jede Route zeigt ihren eigenen Begleittext (Stichprobe ueber mindestens 5 Routen dokumentieren).

## Harte Regeln
- Formularbasis (Felder, Labels, Button) ueberall identisch; nur der Begleittext differenziert.
- Keine weiteren Pflichtfelder, keine zusaetzlichen Schritte, kein Captcha.
- Bestehende Styles nicht umbauen; die Suite kapselt sich ueber `kqk-` Praefixe.
- Nichts loeschen, was existiert; das Modul ergaenzt.
