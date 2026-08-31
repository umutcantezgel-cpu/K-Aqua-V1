# Dokument 4: Die 3D Produktbibliothek im Detail

## Zusammenfassung
Dieses Dokument beschreibt die interaktive 3D Produktbibliothek von K Aqua. Es erklaert die mathematische Funktionsweise im Webbrowser, den aktuellen Stand von 70 vollstaendig modellierten Produkten, die implementierten Pruefmechanismen fuer Ladezeiten und Speichernutzung sowie die Historie behobener 3D Darstellungsfehler.

## 1. Technische Funktionsweise und Kernfunktionen

Die 3D Produktbibliothek von K Aqua basiert auf moderner WebGL Technologie unter Einsatz von Threejs und React. Anstatt riesige, langsame 3D Dateien ueber das Internet herunterzuladen, generiert die K Aqua Engine die 3D Modelle in Echtzeit direkt im Webbrowser aus mathematischen Parametern und geprueften Masstabellen.

Planern und Kunden stehen fuenf interaktive Kernfunktionen zur Verfuegung:

1. Freie dreidimensionale Bewegung: Vollstaendige 360 Grad Rotation, stufenloser Zoom und Verschiebung ueber Maus oder Touchscreen.
2. Dynamische Bemaßungslinien: Anzeige exakter Masstoleranzen wie Aussendurchmesser, Muffentiefe, Einbaulaenge und Wandstaerken in Millimetern. Die Beschriftungen richten sich beim Drehen automatisch zum Betrachter aus.
3. Halbschnitt Funktion fuer Schnittansichten: Auf Knopfdruck wird das Bauteil laengs aufgeschnitten. Dadurch wird der dreischichtige Aufbau der Faserverbundrohre mit glasfaserverstaerkter Mittelschicht sowie der innere Rohranschlag fuer Schweissungen sichtbar.
4. Explosionsansicht: Mehrteilige Baugruppen wie Kugelhaehne, Uebergangsverschraubungen und Wandscheiben lassen sich in ihre Einzelteile wie Dichtungen, Messingkerne und Ueberwurfmuttern zerlegen.
5. Drahtgitter Modus: Ermoeglicht TGA Ingenieuren die Pruefung der geometrischen Netztopologie fuer CAD Anwendungen.

## 2. Umfang und Qualitaetssicherung der 3D Bibliothek

In der zentralen Produkt Registry sind 70 von 71 Kernprodukten des K Aqua Katalogs als parametrische 3D Modelle hinterlegt und ueber automatisierte Tests verifiziert:

1. Pruefstand der 3D Abdeckung:
Rohre, Kategorie Pipes: 13 von 13 Modellen vollstaendig.
Formteile, Kategorie Fittings: 14 von 14 Modellen vollstaendig.
Uebergangsverbinder, Kategorie Transition Fittings: 12 von 13 Modellen verifiziert.
Absperrarmaturen, Kategorie Valves: 9 von 9 Modellen vollstaendig.
Schweisssaettel, Kategorie Weld In Saddles: 3 von 3 Modellen vollstaendig.
Montagezubehoer, Kategorie Accessories: 5 von 5 Modellen vollstaendig.
Werkzeuge, Kategorie Tools: 14 von 14 Modellen als Huellkoerper verfuegbar.
Gesamtstand: 70 von 71 Produkten live im interaktiven Showroom.

2. Geometriebudget und Speichersicherheit:
Um auch auf Smartphones und aelteren Buerorechnern ohne Absturz fluessig zu laufen, unterliegt die 3D Engine einem strengen Geometriebudget. Alle 70 Modelle zusammen belegen exakt 3 Millionen 641 Tausend 522 Knotenpunkte, im Fachjargon Vertices genannt. Das entspricht einem sparsamen Durchschnitt von rund 50 Tausend Vertices pro Bauteil. Bei jedem Modellwechsel werden Geometrien und Texturen ueber automatische Entladebefehle sauber aus dem Grafikkartenspeicher geloescht.

## 3. Historie behobener 3D Probleme

Im Verlauf der Entwicklung wurden mehrere kritische Huerden identifiziert und bereinigt:

Erstens, Behebung falscher Produktzuordnungen:
Urspruenglich fuehrten ungenaue Webadressen dazu, dass der 3D Betrachter bei Sonderformen auf falsche Formteile zurueckgriff. Dies wurde durch eine strikte, automatisierte Zuordnungslogik behoben.

Zweitens, Nachlieferung komplexer Uebergangsfittings:
Fuer Bauteile mit integriertem Messinggewinde wie Wandscheiben und Uebergangswinkel fehlten urspruenglich die praezisen ISO 7 1 Gewindesteigungen. Diese wurden in den Entwicklungswellen 4 Komma 5 und 4 Komma 6 mit exakten Gewindegaengen und DZR Messingmaterialien nachgeruestet.

Drittens, Stabilisierung der Bemaßungslinien:
Am 25. August 2026 wurde ein Darstellungsfehler behoben, bei dem Maßpfeile beim Drehen des Bauteils hinter der Geometrie verschwanden oder spiegelverkehrt dargestellt wurden.

## 4. Aktueller Ausblick und offener Bedarf

1. Das Modell fuer den Artikel AQ332, die Wasserzaehlerverschraubung, ist als Verweis auf die Standardverschraubung hinterlegt, da der Herstellerkatalog auf Seite 100 fehlerhafte Schluesselweiten nennt.
2. Die 14 Werkzeugmodelle in der Kategorie Tools sind aktuell als funktionale Huellkoerper modelliert. Fuer eine werbliche Praesentation der Schweissgeraete koennten kuenftig noch detailliertere fotorealistische Geometrien ergaenzt werden.
