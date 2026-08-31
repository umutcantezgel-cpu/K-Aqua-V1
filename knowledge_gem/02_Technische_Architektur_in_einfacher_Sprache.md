# Dokument 2: Technische Architektur in einfacher Sprache

## Zusammenfassung
Dieses Dokument erklärt den vollständigen technischen Aufbau der K Aqua Plattform in einer für die Geschäftsführung leicht verständlichen Sprache. Es erläutert die eingesetzten Kerntechnologien, deren geschäftlichen Nutzen, die interne Ordnerstruktur sowie die technischen Schutzmechanismen gegen Ausfälle und Qualitätsverluste.

## 1. Verwendete Kerntechnologien und deren geschäftlicher Nutzen

1. Next.js Version 15 App Router
Erklärung: Next.js ist das moderne Grundgerüst der gesamten Webanwendung.
Geschäftlicher Nutzen: Es ermöglicht sogenannte statische Seitengenerierung, im Englischen Static Site Generation oder kurz SSG genannt. Dabei werden alle über 335 Unterseiten bereits vorab als fertige HTML Seiten berechnet. Für Kunden und Google bedeutet das blitzschnelle Ladezeiten unter einer Sekunde und ein hervorragendes Ranking in Suchmaschinen.

2. TypeScript
Erklärung: TypeScript ist eine strenge Programmiersprache mit automatischer Typenprüfung.
Geschäftlicher Nutzen: Sie verhindert Tippfehler und Logikfehler bereits beim Schreiben des Codes, noch bevor eine Seite veröffentlicht wird. Dies garantiert höchste Stabilität und verhindert teure Systemabstürze im Livebetrieb.

3. Tailwind CSS Version 4
Erklärung: Tailwind ist ein hochmodernes Baukastensystem für die optische Gestaltung.
Geschäftlicher Nutzen: Es sorgt für ein einheitliches Erscheinungsbild über alle Geräte hinweg und erzeugt extrem kleine Dateigrößen. Dadurch lädt die Seite auch auf Smartphones bei schwacher Internetverbindung ohne Verzögerung.

4. next intl
Erklärung: next intl ist das zentrale Steuerungssystem für weltweite Mehrsprachigkeit.
Geschäftlicher Nutzen: Es verwaltet 65 Sprachen und stellt sicher, dass Besucher weltweit automatisch die richtige Sprache sehen, inklusive spezieller Schreibrichtungen wie von rechts nach links im Arabischen.

5. Three.js und WebGL
Erklärung: WebGL ist die im Webbrowser eingebaute Schnittstelle zur Grafikkarte des Computers oder Smartphones. Three.js ist die mathematische Softwarebibliothek, die diese Schnittstelle ansteuert.
Geschäftlicher Nutzen: Kunden können dreidimensionale Modelle der Rohre und Formstücke direkt im Browser in 360 Grad drehen, schneiden und vermessen, ohne eine App oder ein Zusatzprogramm installieren zu müssen.

6. Framer Motion
Erklärung: Framer Motion ist ein Animationswerkzeug für flüssige Bewegungsabläufe auf der Website.
Geschäftlicher Nutzen: Es sorgt für sanfte Übergänge beim Aufklappen von Menüs oder Wechseln von Ansichten, was dem Nutzer ein hochwertiges und vertrauenserweckendes Markenerlebnis vermittelt.

## 2. Erklärung wichtiger Fachbegriffe für Laien

1. SSG oder Static Site Generation: Vorberechnung der Webseiten auf dem Server. Anstatt dass der Server bei jedem Besucheraufruf die Seite neu zusammenbauen muss, liegt sie fertig abrufbereit vor. Das spart Serverkosten und sorgt für maximale Geschwindigkeit.
2. Hydration: Der Moment, in dem eine statisch geladene Webseite im Browser interaktiv wird. Zuerst sieht der Nutzer sofort den Text, danach schaltet die Software im Hintergrund die Klickfunktionen und 3D Animationen scharf.
3. WebGL: Eine Technik, mit der der Internetbrowser auf den Grafikprozessor des Geräts zugreift, um komplexe 3D Bilder flüssig und scharf darzustellen.
4. CLS oder Cumulative Layout Shift: Ein Qualitätsmaß für die visuelle Stabilität einer Webseite. Wenn Texte oder Bilder beim Laden plötzlich springen, ist der CLS schlecht. Bei K Aqua wurde sichergestellt, dass alle Elemente feste Plätze haben und nichts springt.
5. Canonical Tags: Ein unsichtbarer digitaler Vermerk im Kopfbereich jeder Seite, der Suchmaschinen wie Google mitteilt, welche Seite das Original ist. Das verhindert Strafabzüge wegen doppelter Inhalte.
6. Consent Gate oder Einwilligungssperre: Ein Schutzmechanismus, der garantiert, dass keinerlei Benutzerdaten ohne ausdrückliche Erlaubnis des Nutzers gespeichert oder geladen werden.

## 3. Die Ordnerstruktur des Projekts im Überblick

1. Ordner app: Enthält alle sichtbaren Seiten, Unterseiten und Schnittstellen. Hier liegen unter anderem die Routen für Produkte, Branchen, Kontakt, Karriere, Downloads und das Trust Center.
2. Ordner components: Enthält alle wiederverwendbaren Bausteine der Benutzeroberfläche wie Navigationsleisten, Fußzeilen, Auswahldialoge, Knöpfe und den 3D Anzeigebereich.
3. Ordner lib: Das logische Rechenzentrum. Hier liegen die Programme für die Suche, die Metadaten für Google, die Sprachauswahl und die Module zur Erzeugung von Planungsdaten.
4. Ordner content: Hier sind die reinen Text und Produktdaten abgelegt, sauber getrennt vom Programmiercode.
5. Ordner public/kaqua 3d: Hier liegen die mathematischen Geometriedateien und Bemaßungsvorgaben aller 70 dreidimensionalen Produktmodelle.
6. Ordner messages: Die Wörterbücher aller 65 Sprachen mit jeweils über 5300 übersetzten Textelementen.
7. Ordner Marketing: Das verbindliche Originalarchiv mit Druckkatalogen, hochauflösenden Produktfotos und Schulungsvideos.
8. Ordner tests und scripts: Automatische Prüfprogramme, die vor jeder Veröffentlichung sicherstellen, dass alle Maße, Links und Übersetzungen fehlerfrei funktionieren.
