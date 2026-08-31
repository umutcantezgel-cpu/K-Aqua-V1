# Dokument 8: Qualitätssicherung, Stabilität und technische Testabdeckung

## Zusammenfassung
Dieses Dokument beschreibt das mehrstufige Qualitätssicherungssystem des K Aqua Projekts. Es listet alle automatisierten Prüfwerkzeuge auf, dokumentiert die Unit Tests und Build Validierungen und fasst die in der Vergangenheit behobenen kritischen Fehler sowie deren nachhaltige Lösung zusammen.

## 1. Die automatisierten Prüfmechanismen im Überblick
Um menschliche Fehler im Vorfeld auszuschließen, verfügt das Projekt über eine lückenlose Kette automatisierter Kontrollprogramme:

1. Strikter TypeScript Typecheck (npm run typecheck):
Prüft den gesamten Programmcode auf Typenfehler, fehlerhafte Funktionsaufrufe und unvollständige Datenobjekte. Erst wenn null Fehler vorliegen, darf Code gebaut werden.
2. Sprachschlüssel Paritätsprüfung (node scripts/check locale parity.mjs):
Vergleicht alle 5338 Textschlüssel zwischen Deutsch, Englisch und Arabisch und schlägt sofort Alarm, falls eine Übersetzung fehlt oder abweicht.
3. Übersetzungsschlüssel Verwendungsprüfung (node scripts/check message usage.mjs):
Prüft über 84 Programmdateien und mehr als 7000 Schlüssel, ob im Code Texte aufgerufen werden, die in den Sprachdateien gar nicht existieren.
4. 3D Modell Abdeckungsprüfung (node scripts/check 3d coverage.mjs):
Überwacht die 71 Katalogpositionen und stellt sicher, dass für jede Nennweite das passende mathematische Geometriemodell geladen werden kann.
5. Vollständiger Next.js Produktionsbuild (npm run build):
Kompiliert alle 335 Seiten vorab. Wenn eine einzige Seite einen Darstellungs oder Berechnungsfehler aufweist, bricht der gesamte Vorgang ab, sodass niemals fehlerhafter Code auf Vercel veröffentlicht werden kann.

## 2. Automatisierte Unit Tests in der Testsuite
Im Verzeichnis tests/unit befinden sich spezialisierte Testskripte:

1. BIM Produkt Rechenproben (bim product.test.ts):
Prüft mathematisch nach, ob Innendurchmesser, Außendurchmesser und Wandstärken über den gesamten Katalog konsistent sind, und stellt sicher, dass ausschließlich die bekannten Satzfehler des Druckkatalogs als Ausnahme deklariert sind.
2. IFC Dateisyntaxprüfung (bim ifc.test.ts):
Validiert, dass die erzeugten IFC 4 BIM Dateien exakt den Vorgaben der internationalen ISO 16739 Norm entsprechen und in Planungssoftware wie Revit fehlerfrei importiert werden können.
3. Formattests (bim formats.test.ts):
Prüft, ob alle Downloadformate wie CSV Tabellen und Ausschreibungstexte korrekt mit den offiziellen Artikelnummern befüllt werden.

## 3. Kritische Fehler der Vergangenheit und deren Behebung

1. Behebung des 500er Serverfehlers bei Produktweiterleitungen:
Früher führten direkte Links auf bestimmte Rohrkategorien zu einem Absturz. Die Ursache lag in veralteten Weiterleitungsregeln, die auf neue Kategorienamen korrigiert wurden.
2. Beseitigung des doppelten 3D Fensters auf Produktseiten:
Auf den Detailseiten waren zuvor zwei rechenintensive 3D Fenster gleichzeitig aktiv, was zu visueller Überladung und Ruckeln auf Mobilgeräten führte. Das obere Fenster wurde durch eine edle Qualitätsübersichtskarte mit Originalfoto und DIN Normen ersetzt, während das untere Fenster als zentraler 3D Arbeitsplatz in voller Größe fungiert.
3. Behebung der Buttonüberlagerung auf Smartphones:
Auf kleinen Bildschirmen unter 640 Pixeln Breite überlappten sich zuvor Titeltext und Werkzeugleiste. Durch kompakte Symbolabstände und automatische Textkürzung wurde eine perfekte, berührungsfreundliche Bedienung geschaffen.
4. Reparatur des Halbschnitts in Three.js:
Die Schnittebene wurde fest an das 3D Bauteil gekoppelt, sodass der Halbschnitt nun in jedem Browser sofort und stabil die Wandstärken öffnet.
5. Optimierung der Ladezeit (LCP):
Eingangsüberschriften wurden von verzögernden Einblendeffekten befreit, wodurch die Seite sofort für den Nutzer sichtbar ist und Spitzenwerte bei Google Core Web Vitals erzielt.
