# Antigravity 2.0 – Master-Prompt: K-Aqua Website-Erweiterung & Konsistenz

> **So nutzt du diesen Prompt:** Lege den gesamten Ordner `K-Aqua Erweiterung und Implemention/` (Inhaltsdateien, Bilder, Video, `Asset-Manifest_K-Aqua.md`) in deinen Antigravity-Workspace **neben** den bestehenden Website-Codebase. Füge dann den kompletten Text unten als Aufgabe ein.

---

## ROLLE

Du bist ein Senior-Full-Stack-Entwickler und Content-Engineer. Du erweiterst die **bestehende** Website von **K-Aqua** (Marke der *Kessel Wassertechnologie GmbH*), aktuell in Entwicklung unter `project-301.webtm.ru`. Du arbeitest präzise, nicht-destruktiv und stellst über alle Seiten hinweg **eine einzige, widerspruchsfreie Informationsbasis** her.

## ZIEL

1. Sämtliche Inhalte aus dem mitgelieferten Workspace in die bestehende Website **einarbeiten**.
2. **Bestehende Seiten maximal erweitern** statt neu zu bauen; nur fehlende Seiten/Beiträge neu anlegen.
3. **Alle Platzhalter-Bilder entfernen** und durch die kuratierten Workspace-Assets ersetzen (gemäß `Asset-Manifest_K-Aqua.md`).
4. **Alle Informationen abgleichen** → konsistente, korrekte, identische Fakten auf allen Seiten (Single Source of Truth, siehe Abschnitt B).
5. Platzhalter, Lorem-Ipsum, falsche und fremdsprachige Inhalte beseitigen.

---

## A. ARBEITSWEISE (verbindlich)

1. **Erst analysieren, dann ändern.** Inspiziere zuerst den vorhandenen Codebase und bestimme den Tech-Stack selbst (z. B. Laravel/Blade, statisches HTML, Next.js, WordPress …). Die URL-Struktur (`/de/product_and_services`, `/storage/uploads/...`) und Asset-Pfade deuten auf eine **Laravel/Blade-Anwendung** hin – **verifiziere das**, bevor du Annahmen triffst. Passe alle folgenden Schritte an den real vorgefundenen Stack an (Templates/Partials, Routing, CMS-Datenmodell, Übersetzungsdateien, Medien-/Upload-Verzeichnis).
2. **Sprache: ausschließlich Deutsch.** Es wird nur die DE-Version bearbeitet. Wenn du eine EN-Struktur (`/en`) vorfindest, lasse sie unangetastet, aber sorge dafür, dass deine DE-Änderungen die EN-Version nicht brechen.
3. **Nicht-destruktiv & nachvollziehbar.** Arbeite auf einem Branch, committe in logischen Schritten mit klaren Messages. Lösche keine funktionalen Dateien (PDFs, Skripte, Logo, Favicons, Zertifikate) ungefragt.
4. **Inhaltsquelle = der Workspace.** Die Inhaltsdateien (`project-301.webtm.ru:de*.md` u. a.) sind HTML-Exporte der aktuellen Seiten (im Backslash-Escape-Format `\<tag\>`). Nutze sie als Bestandsaufnahme der vorhandenen Texte. Übernimm gute Inhalte, korrigiere fehlerhafte.
5. **Fehlende Texte schreibst du selbst** – fachlich korrekt, im bestehenden Marken-Ton (sachlich, technisch, „Made in Germany"), und konsistent mit den Stammdaten in Abschnitt B. Das betrifft v. a. 3 Blogbeiträge und die Datenschutzseite (Abschnitt D).
6. **Bilder** strikt nach `Asset-Manifest_K-Aqua.md` austauschen und platzieren.
7. **Verifiziere am Ende** anhand der Checkliste (Abschnitt F). Liste alle geänderten/erstellten/gelöschten Dateien auf.

---

## B. STAMMDATEN – SINGLE SOURCE OF TRUTH

Diese Werte sind **überall identisch** zu verwenden (Header, Footer, Impressum, Kontakt, About, Meta-Tags). Wo die Bestandsseiten abweichen, gilt diese Tabelle:

| Feld | Verbindlicher Wert |
|---|---|
| Marke (Schreibweise) | **K-Aqua** (mit Bindestrich, einheitlich – NICHT „K Aqua") |
| Rechtsträger | Kessel Wassertechnologie GmbH (KWT) |
| Adresse | Auweg 3, 35647 Waldsolms-Brandoberndorf, Deutschland |
| Telefon | +49 (0)60 85 / 9868-410 |
| Fax | +49 (0)60 85 / 9868-420 |
| E-Mail allgemein/Vertrieb | info@k-aqua.de |
| E-Mail Technik/Qualität | support@k-aqua.de |
| E-Mail Karriere/Bewerbung | andrea.nickel@k-aqua.de |
| Öffnungszeiten | Werktags 07:00 – 16:00 Uhr |
| Gegründet | 2014 |
| Produkt | PP-R / PP-RCT Rohre und Fittings für trinkbares Warm- und Kaltwasser |
| Kennzahlen | 20+ Spritzgussmaschinen · 3 Extrusionslinien · 25+ Mitarbeiter · 35+ Exportländer · 140+ Formen |
| Zertifizierungen | ISO 9001, ISO 14001, ISO 50001 · DVGW System-Zulassung · KIWA Hygienic Test |
| Managementsystem | „GENAU"-Managementsystem (nach DIN EN ISO 14001 und 50001) |
| Copyright-Zeile | © 2026 Kessel Wassertechnologie GmbH (Jahr dynamisch/aktuell, **nicht** „2026 © 2023") |
| Social Media | Instagram, LinkedIn, Facebook, YouTube (vorhandene Links beibehalten) |

**Wichtige Faktenkorrektur:** Die Exportländer-Zahl widerspricht sich in den Bestandstexten („über 30 Länder" im About-Fließtext vs. „35+ Export Countries" im Kennzahlenblock). **Vereinheitliche auf 35+ Exportländer** überall.

**Navigation (Header & Footer), DE:** Startseite · Produkte · Über uns · News · Karriere · Kontakt · Herunterladen · (Footer zusätzlich: Datenschutzerklärung). Sprachumschalter DE/EN beibehalten.

---

## C. BEKANNTE INKONSISTENZEN & PLATZHALTER – ZU BEHEBEN

Behebe **mindestens** folgende, im Bestand gefundene Probleme:

1. **Platzhalter-Seitentitel & Meta-Tags** ersetzen durch echte, SEO-taugliche deutsche Titel/Descriptions:
   - Startseite-`<title>` „titlesdfg sdf" + Meta-Description „Descriptionsdf gsdfg"
   - About „titkle about Deutsch" · Kontakt „Contact Title De" · Produkte „Prod Title De" · Blog „Blog Title De"
   - Setze pro Seite einen sprechenden Title (Muster: „K-Aqua – <Seitenthema> | PPR-Rohre Made in Germany") und eine passende Meta-Description sowie OG-Tags (og:title/description/image/url) konsistent.
2. **Lorem-Ipsum auf der Startseite** entfernen: die Textfragmente „Velit enim voluptate", „Ex odio quaerat culp", „Suscipit eum et dolo" durch echte deutsche Inhalte ersetzen (z. B. Kurz-Claims zu den Produktvorteilen) oder den Block entfernen, falls funktionslos.
3. **Fremdsprachige Inhalte auf der deutschen About-Seite** übersetzen/ersetzen: „ABOUT US", „Applying new strategies", „our experience is your advantage", „K-Aqua – Leading in Water Supply" sowie die **komplett englische „Company policy / GENAU"-Sektion** ins Deutsche übertragen (fachlich, flüssig).
4. **Markenschreibweise vereinheitlichen:** überall „K-Aqua" (siehe B).
5. **Maschinenübersetzungs-Murks auf der Produktseite** im Abschnitt „Ausstattung"/Eigenschaften (z. B. „da Propylen und Ethylen einfach verbrannt wurden, weil sie waren nutzlos", „abkürzungen, feststellend …") durch sauberes Deutsch ersetzen. Die **bessere, bereits korrekte Variante derselben Inhalte steht auf der Startseite** (Abschnitte „Umweltfreundlich / Recycelbar / Ausgezeichnete Eigenschaften / Langlebigkeit") – nutze diese als Vorlage und halte beide Seiten konsistent.
6. **Copyright-Zeile** „2026 © 2023" korrigieren (siehe B).
7. **Datenschutzseite** enthält komplett falschen Platzhaltertext (über einen „YouTube-Channel"/„content creator") – komplett ersetzen (Abschnitt D).

---

## D. SEITEN-SPEZIFISCHE AUFGABEN

> Bestehende Seiten **erweitern**, nicht ersetzen. Vorhandene gute Texte beibehalten, fehlende ergänzen, fehlerhafte korrigieren.

### Startseite (`/de`)
- Hero-Hintergrundvideo durch `home-hero.mp4` ersetzen (`muted loop`, siehe Manifest).
- Lösungen-/Kennzahlen-Claims gemäß Stammdaten; Lorem-Ipsum entfernen (C2).
- Produktkategorie-Kacheln (7) mit den neuen Profilbildern (Manifest Abschnitt 2).
- News-Teaser zeigen die aktuellsten Blogbeiträge mit neuen Titelbildern.
- Zertifikat-Sektion (ISO/DVGW/KIWA) beibehalten.

### Produkte (`/de/product_and_services`)
- 7 Produktkategorien mit Profilbildern (Manifest). Kategorienamen konsistent zur Startseite.
- Abschnitt „Über die Produktion"/Installation mit `produktion-messing.jpg` (und optional `karriere-team.webp`) bebildern; Platzhalter (`future/`, `installation/`) ersetzen/entfernen.
- Eigenschaften-Texte säubern (C5).
- Funktionale PDFs (Produktpalette, Qualitätssicherung, Produkteigenschaften) als Downloads **behalten**.

### Über uns (`/de/about`)
- Hero mit `about-werk.webp`.
- Englische Inhalte ins Deutsche übertragen (C3); Kennzahlen exakt nach B (35+ Exportländer).
- GENAU-Managementsystem-Abschnitt auf Deutsch, sachlich.

### News / Blog (`/de/blog`)
Es existieren **6 Beiträge** (die Bestands-Exporte zeigen nur 3 vollständig). Stelle sicher, dass alle 6 vorhanden, datiert, kategorisiert (Filter: Alle · Innovationen · Ausstellungen · Neue Produkte · Produktion) und korrekt bebildert sind (Manifest Abschnitt 3):
1. „K Aqua Einblick – Warum PPR-Rohre die beste Lösung für moderne Installationen sind" (14.04.2025) – **Volltext vorhanden** (Teaser im Export), bei Bedarf zum vollständigen Artikel ausbauen.
2. „K-Aqua Messingfittings: Hochwertige Messingeinsätze treffen auf German PPR" (27.03.2025) – Volltext vorhanden/ausbauen.
3. „K-Aqua setzt neue Maßstäbe in der Flexibilität bei deutschen PPR-Rohren" (27.03.2025) – Volltext vorhanden/ausbauen.
4. „K-Aqua Einblicke: Was ist Polypropylen-Random-Copolymer (PPR)?" (23.03.2025) – **Volltext fehlt → selbst schreiben.** Erkläre PPR (PP-R/PP-RCT): Materialdefinition, Eigenschaften (Temperatur-/Druck-/Chemikalienbeständigkeit, Trinkwassereignung, Langlebigkeit, Recyclebarkeit, Harzcode „5"), typische Einsatzgebiete. Kategorie: Innovationen/Neue Produkte.
5. „Treffen Sie K-Aqua auf der Big 5 Messe in Saudi-Arabien!" (23.03.2025) – **Volltext fehlt → selbst schreiben.** Messe-Ankündigung/-Rückblick (Big 5 Global, Saudi-Arabien): Standpräsenz, vorgestellte Produkte, Exportfokus. Kategorie: Ausstellungen.
6. „Spannende Neuigkeiten: K-Aqua startet seine neue Webseite!" (23.03.2025) – **Volltext fehlt → selbst schreiben.** Launch-Ankündigung der neuen Website. Kein neues Bild geliefert → Bestandsgrafik („Built to Last"-Laptop) behalten oder neu gestalten.

Schreibe fehlende Beiträge auf Deutsch, je 3–6 Absätze, faktenkonsistent mit Abschnitt B, ohne erfundene Detailzahlen.

### Karriere (`/de/career`)
- Banner mit `karriere-team.webp`.
- Bestehende Stellenanzeigen (Produktionsmitarbeiter Tag-/Nachtschicht) beibehalten; Bewerbungs-E-Mail einheitlich **andrea.nickel@k-aqua.de**, Telefon nach B.

### Kontakt (`/de/contacts`)
- Kontaktdaten exakt nach B (Vertrieb, Technik/Qualität getrennt).
- Google-Maps-Einbettung auf den Standort Auweg 3, Waldsolms-Brandoberndorf beibehalten.
- Kontaktformular (Name/Telefon/E-Mail) funktional belassen.

### Herunterladen (`/de/download`)
- Bestehende Download-Struktur prüfen; vorhandene PDFs (Produktpalette, Qualitätssicherung, Produkteigenschaften, Test/Zertifikate) verlinken. Keine funktionalen Dateien löschen.

### Datenschutzerklärung (`/de` Datenschutz)
- **Kompletten Platzhaltertext entfernen** (der irrtümliche „YouTube-Channel"-Text).
- Eine **GDPR/DSGVO-konforme Datenschutzerklärung** für die Kessel Wassertechnologie GmbH erstellen (Verantwortlicher mit Adresse aus B, Kontakt; übliche Abschnitte: erhobene Daten, Server-Logs, Cookies inkl. der vorhandenen Cookie-Kategorien Essenziell/Analyse/Marketing, Kontaktformular, Auskunfts-/Lösch-/Widerspruchsrechte, Aufsichtsbehörde).
- **Rechtlicher Hinweis im Output:** Markiere diesen Text klar als prüfungsbedürftigen Entwurf – die finale Datenschutzerklärung muss vom Unternehmen/Rechtsberatung freigegeben werden. Erfinde keine Verarbeitungs-Tätigkeiten, die nicht real stattfinden.

---

## E. BILDAUSTAUSCH (gemäß `Asset-Manifest_K-Aqua.md`)

1. Importiere alle neuen Assets ins Medien-/Upload-Verzeichnis des Codebase und benenne sie web-freundlich um (Manifest, Spalte „Zielname").
2. **Entferne alle Platzhalter-/Stockbilder** unter den im Manifest Abschnitt 5 gelisteten Pfaden und ersetze die Referenzen.
3. **Erhalte** Logo, Favicons, `certificate_bg.webp` und die Zertifikat-Badges (Manifest Abschnitt 6) – kein Ersatz vorhanden.
4. Setze für jedes Bild ein deutsches `alt`-Attribut (Vorschläge im Manifest).
5. Optimiere Bildgrößen/Formate wo sinnvoll (responsive, WebP), ohne Qualität zu zerstören.
6. `Bhj4iO12M8ajYOlPLpNX86n2xHqkZ2hj9eYTtE7P.png` ist bereits online vorhanden → nicht doppeln.

---

## F. VERIFIZIERUNG (vor Abschluss abarbeiten)

- [ ] Kein Lorem-Ipsum, keine Platzhalter-Titel/Meta-Tags mehr auffindbar (Projektweite Suche nach: „lorem", „sdfg", „titlesdfg", „Prod Title", „titkle", „Description sdf").
- [ ] Keine englischen Textblöcke mehr auf DE-Seiten (außer Eigennamen/Zertifikatsbezeichnungen).
- [ ] Markenname projektweit nur noch „K-Aqua".
- [ ] Stammdaten (Adresse, Telefon, Fax, E-Mails, Kennzahlen, Öffnungszeiten) auf **allen** Seiten identisch; Exportländer überall „35+".
- [ ] Copyright-Zeile korrekt (kein „2026 © 2023").
- [ ] Alle 7 Produktkategorien + alle 6 Blogbeiträge mit korrektem neuen Bild; alte Platzhalterbilder entfernt.
- [ ] Hero-Video ausgetauscht; Zertifikate/Logo/Favicon erhalten.
- [ ] Datenschutzseite enthält echten DSGVO-Entwurf (als prüfungsbedürftig markiert), kein YouTube-Text.
- [ ] Interne Links, Navigation (Header/Footer) und Sprachumschalter funktionieren; keine 404 auf ersetzte Assets.
- [ ] Build/Lint läuft fehlerfrei; Seiten rendern lokal.
- [ ] Abschlussbericht: Liste aller geänderten, neu erstellten und gelöschten Dateien + offene Punkte für den Nutzer (z. B. Freigabe Datenschutz, evtl. EN-Spiegelung).

---

## G. CONSTRAINTS / DON'TS

- Keine erfundenen Fakten, Zahlen, Zitate oder Auszeichnungen.
- Keine funktionalen Dateien (PDFs, Logo, Favicons, Zertifikate, Skripte, Konfigurationsdateien) ohne expliziten Grund löschen.
- Keine Design-/Layout-Grundstruktur zerstören – Marken-Look (blau/violett, clean, „Made in Germany") beibehalten; nur Inhalte/Bilder erweitern und vereinheitlichen.
- Bei Unklarheit über den Stack oder fehlenden Inhalten: konservativ vorgehen, Annahme dokumentieren, im Abschlussbericht als Frage an den Nutzer ausgeben.
- Englische Version (`/en`) nicht inhaltlich anfassen (Scope = nur Deutsch), aber nicht beschädigen.
