# Dokument 4: Die 3D Produktbibliothek im Detail

## Zusammenfassung
Dieses Dokument beschreibt die native 3D Produktbibliothek von K Aqua. Es dokumentiert die technische Funktionsweise der mathematischen Geometriegenerierung in Three.js, den aktuellen Umsetzungsgrad von 70 Modellen, die durchgeführten Qualitätssicherungsmaßnahmen sowie die Beseitigung historischer Darstellungsfehler.

## 1. Umfang und Modellabdeckung
Die 3D Produktbibliothek umfasst 70 fertiggestellte, maßhaltige 3D Modelle von insgesamt 71 Katalogpositionen. Das entspricht einer Gesamtabdeckung von 98,6 Prozent.

Die Modelle decken alle Kategorien ab:
1. Rohre: 13 Modelle
2. Formteile: 14 Modelle
3. Übergangsfittings: 12 Modelle
4. Ventile und Hähne: 9 Modelle
5. Einschweißsättel: 3 Modelle
6. Zubehör: 5 Modelle
7. Werkzeuge und Maschinen: 14 Modelle

Das verbleibende 71. Modell für den Artikel AQ840WZ (Wasserzählerverschraubung) ist als herstellerseitig offener Punkt hinterlegt, da im Druckkatalog die Maße für die Überwurfmutter und Einlegeteilgeometrie fehlen.

## 2. Technischer Aufbau des 3D Systems
Im Gegensatz zu herkömmlichen Webseiten setzt K Aqua nicht auf träge externe 3D Dienste oder statische 360 Grad Fotoserien, sondern auf eine eigens entwickelte, browsernative 3D Berechnungsengine:

1. Native Three.js Integration in Millimetergenauigkeit:
Jedes Bauteil wird mathematisch aus echten Tabellenwerten generiert. Es verwendet Rotationskörper, Rohrprofile, Abrundungen und Anschweißstutzen im Maßstab eins zu eins in Millimetern.
2. Parametrische Nennweitenanpassung:
Wenn ein Nutzer eine andere Nennweite wählt, zum Beispiel von d20 auf d110, wird das 3D Modell nicht einfach skaliert, sondern die Wandstärken, Einstecktiefen, Flanschdicken und Gewindegrößen werden aus der Datenbank komplett neu berechnet und gerendert.
3. Funktionsumfang für den Nutzer:
Nutzer können das Bauteil frei drehen, den automatischen Drehteller aktivieren, einen Halbschnitt einschalten, technische Maßhilfslinien einblenden, in den Drahtgittermodus schalten und das 3D Modell als GLTF oder OBJ Datei für eigene CAD Programme herunterladen.

## 3. Qualitätssicherung und das Mängelregister Spur A
Um sicherzustellen, dass die 3D Geometrien exakt den real produzierten Teilen entsprechen, wurde ein forensischer Bildabgleich gegen alle Originalfotos und Katalogrenderings durchgeführt (Spur A):

Zwölf identifizierte und behobene Mängel:
1. Überwurfmuttern bei Verschraubungen wurden exakt mittig positioniert.
2. Die Griffzone bei Übergangsfittings wurde dem grünen Kunststoff zugeordnet und der Sechskant auf genormte Schlüsselweiten korrigiert.
3. Kugelhahnhebel wurden nach den Werksfotos mit roter Schutzbeschichtung, Befestigungsschraube und grüner K Aqua Einlage modelliert.
4. Anbohrsättel erhielten die charakteristischen Versteifungsrippen an den Flanken.
5. Rohrschellen wurden mit dem echten Scharnier und Gummiprofil ausgestattet.
6. Elektroschweißmuffen erhielten die typischen Prüfkontakte und Indikatoren.
7. Bogengeometrien bei Überbogenrohren wurden auf die exakte lichte Höhe korrigiert.

## 4. Behebung des Halbschnitt Fehlers
Ein wichtiger Meilenstein war die Behebung des Halbschnitt Fehlers im Webbrowser.
Früher reagierte der Knopf für den Halbschnitt nicht, weil die Schnittfunktion nach dem Laden des Bauteils nicht dauerhaft mit der Schnittebene verbunden blieb.
Dies wurde korrigiert: Bei Aktivierung des Halbschnitts wird eine mathematische Schnittebene durch das Modell gelegt, die Materialien schalten auf doppelseitige Sichtbarkeit um und farbige Schnittkappen werden sichtbar, sodass Planer die innere Wandstärke und den Wasserkanal direkt inspizieren können.

## 5. Zukünftige Erweiterungsmöglichkeiten
Als nächster Schritt nach Fertigstellung der Modellgeometrien kann die Übergabe der 3D Daten in gängige BIM Planungsformate weiter vertieft werden.
