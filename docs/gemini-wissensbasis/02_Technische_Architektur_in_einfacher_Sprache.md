# Dokument 2: Technische Architektur in einfacher Sprache

## Zusammenfassung
Dieses Dokument erklaert die technische Architektur der K Aqua Plattform in einer fuer die Geschaeftsfuehrung verstaendlichen Sprache. Es erlaeutert alle eingesetzten Schluesseltechnologien, uebersetzt Fachbegriffe in konkreten Geschaeftsnutzen und beschreibt die interne Struktur der Codebasis.

## 1. Uebersicht der Schluesseltechnologien und ihr Geschaeftsnutzen

1. Nextjs 15 mit App Router
Einfache Erklaerung: Nextjs ist das moderne Fundament der Webseite. Es sorgt dafuer, dass Webseiten bereits auf dem Server fertig vorbereitet werden, anstatt dass der Browser des Nutzers alle Einzelteile muehsam zusammensetzen muss.
Geschaeftsnutzen: Die Webseite laedt extrem schnell, verbraucht minimales Datenvolumen auf Mobilgeraeten und erzielt hervorragende Platzierungen bei Suchmaschinen wie Google.

2. Statische Seitengenerierung, Fachbegriff SSG fuer Static Site Generation
Einfache Erklaerung: Alle 343 Einzelseiten der Webseite werden beim Bau des Systems einmalig wie ein digitales Buch gedruckt und als fertige HTML Dokumente gespeichert. Bei einem Seitenaufruf muss keine langsame Datenbank mehr abgefragt werden.
Geschaeftsnutzen: Maximale Ausfallsicherheit und Ladezeiten im Millisekundenbereich. Selbst bei zehntausenden gleichzeitigen Besuchern bleibt die Plattform absolut stabil und bietet keine Angriffsflaeche fuer Hacker.

3. Hydration, die schrittweise Aktivierung im Browser
Einfache Erklaerung: Die fertige, blitzschnell geladene Textseite wird im Hintergrund unbemerkt mit den interaktiven Funktionen verknuepft, sobald der Besucher damit interagieren moechte.
Geschaeftsnutzen: Der Besucher sieht sofort alle Inhalte ohne jede Verzoegerung, kann aber unmittelbar danach Schieberegler bedienen, Suchfelder nutzen oder 3D Modelle drehen.

4. TypeScript
Einfache Erklaerung: Eine Programmiersprache mit strenger digitaler Qualitaetskontrolle, die jede Programmzeile vor der Veroeffentlichung auf logische Fehler und Typfehler prueft.
Geschaeftsnutzen: Verhindert technische Ausfaelle im Livebetrieb, schuetzt vor Fehlfunktionen bei Formularen und senkt die langfristigen Wartungskosten drastisch.

5. Tailwind CSS Version 4
Einfache Erklaerung: Ein zentrales Gestaltungssystem, das alle Designregeln wie Markenfarben, Schriftgroessen, Abstaende und Raster fest definiert.
Geschaeftsnutzen: Garantiert ein einheitliches und elegantes Erscheinungsbild ueber alle Endgeraete hinweg, vom kleinen Smartphone bis zum hochaufloesenden 4K Monitor.

6. Next Intl Lokalisierung
Einfache Erklaerung: Ein Uebersetzungssystem, das saemtliche sichtbaren Texte strikt vom Programmcode trennt und in zentralen Sprachdateien organisiert.
Geschaeftsnutzen: Ermoeglicht die globale Pflege von 65 Sprachen, unterstuetzt arabische Rechts nach Links Schriften und schuetzt vor fehlerhaften Sprachmischungen.

7. WebGL und Threejs fuer 3D Darstellungen
Einfache Erklaerung: Eine Technologie, die direkt auf die Grafikkarte des Computers oder Handys zugreift, um dreidimensionale Produktmodelle ohne zusaetzliche Software oder App fluessig darzustellen.
Geschaeftsnutzen: Planer, Ingenieure und Einkaeufer koennen jedes Rohr und jedes Formteil realitaetsgetreu im Raum drehen, Abmessungen pruefen und Schnittansichten betrachten.

8. Framer Motion
Einfache Erklaerung: Eine spezialisierte Animationssoftware fuer geschmeidige visuelle Uebergaenge und Bewegungseffekte.
Geschaeftsnutzen: Vermittelt Besuchern das Gefuehl von Praezision, Dynamik und technischer Exzellenz, passend zum Markenversprechen deutscher Ingenieurskunst.

## 2. Ordnerstruktur und Aufbau des Projekts

Das Projekt ist in klar abgegrenzte Bereiche unterteilt, was Wartung und Erweiterung sehr effizient macht:

1. Ordner app: Hier liegen alle sichtbaren Routen und Webseiten. Unter app/[locale] befinden sich alle mehrsprachigen Seiten wie Startseite, Produkte, Loesungen, Unternehmen, News, Kontakt, Karriere und Trust Center. Ausserdem liegen hier die API Schnittstellen fuer den Datenexport.

2. Ordner components: Beinhaltet alle wiederverwendbaren Bausteine der Benutzeroberflaeche. Dazu gehoeren Header, Navigation, Footer, interaktive Karten, Rechnerwerkzeuge, Suchmasken und die 3D Anzeigefenster.

3. Ordner content: Beherbergt 74 redaktionell und technisch gepruefte Markdown Dokumente zu allen Produkten sowie Fachartikel ueber Hochhausinstallationen, Schweissverfahren und Schallschutz.

4. Ordner lib: Enthaelt alle mathematischen und technischen Hilfsfunktionen. Hier sitzen die Berechnungen fuer Geodistanzen, CO2 Bilanzen, Suchalgorithmen, BIM Datenaufbereitung und strukturierte Suchmaschinendaten.

5. Ordner messages: Enthaelt 65 Sprachdateien im standardisierten JSON Format. Hier sind alle Texte, Beschriftungen und Hilfetexte zentral gespeichert.

6. Ordner kaqua 3d: Das Herzstueck der 3D Bibliothek. Hier sind die exakten mathematischen Geometrien, Wandstaerken, Schweissmuffen und Gewindesteigungen fuer alle 70 Kernprodukte programmiert.

7. Ordner public: Beinhaltet statische Dateien, die ohne Vorverarbeitung ausgeliefert werden, wie Firmenlogos, offizielle Zertifikatsdokumente, Bildmaterial und geographische Kartendaten.

8. Ordner tests: Enthaelt 202 automatisierte Pruefprogramme, die vor jedem Update sicherstellen, dass Maße, Berechnungen und Seitenstrukturen fehlerfrei funktionieren.
