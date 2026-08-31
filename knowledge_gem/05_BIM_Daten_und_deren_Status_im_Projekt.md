# Dokument 5: BIM Daten und deren Status im Projekt

## Zusammenfassung
Dieses Dokument definiert den Begriff Building Information Modeling, abgekürzt BIM, und analysiert den aktuellen Implementierungsstand im Projekt K Aqua. Es dokumentiert die vorhandenen Datenstrukturen, den eigens programmierten IFC 4 Exportgenerator sowie die konkreten Schritte, die für ein vollwertiges BIM Angebot noch erforderlich sind.

## 1. Was bedeutet BIM in einfachen Worten
BIM steht für Building Information Modeling, auf Deutsch Bauwerksdatenmodellierung.
Es ist eine moderne, digitale Arbeitsmethode für Architekten, Bauingenieure und Haustechnikplaner.

Der Unterschied zur herkömmlichen Planung:
In der Vergangenheit zeichnete ein Planer ein Rohr als einfachen Strich oder zweidimensionalen Plan.
Bei BIM hingegen platziert der Planer ein intelligentes, dreidimensionales Datenmodell des K Aqua Rohrs in sein Planungsgebäude. Dieses Modell kennt nicht nur seine exakten Außen und Innenmaße, sondern trägt alle physikalischen und kaufmännischen Eigenschaften in sich:
1. Den genauen Werkstoff wie PP R oder PP RCT.
2. Das Gewicht und den Wasserinhalt pro Meter.
3. Die Wärmeausdehnung bei Temperaturanstieg.
4. Die Wärmeleitfähigkeit zur Berechnung der Dämmung.
5. Die genauen Verbindungspunkte für Schweißmuffen oder Gewinde.
6. Artikelnummern und Ausschreibungstexte für die spätere Bestellung.

Planungsprogramme wie Autodesk Revit oder Graphisoft Archicad können anhand dieser Daten automatisch Druckverluste berechnen, Kollisionen mit Lüftungsrohren erkennen und fertige Bestelllisten für die Baustelle ausgeben.

## 2. Was im Projekt K Aqua heute bereits vorhanden ist
Das Projekt K Aqua verfügt bereits über eine beachtliche technische Grundlage für BIM Daten, die weit über das Niveau üblicher Herstellerwebseiten hinausgeht:

1. Eigener nativer IFC 4 Exportgenerator:
Im Verzeichnis lib/bim/ifc/writer.ts befindet sich ein vollständig selbst programmierter Generator für das offizielle, weltweite Standardformat IFC 4 (Industry Foundation Classes, genormt nach ISO 16739).
2. Vollständige physikalische Materialdaten:
Für alle Artikel sind Dichte (905 kg pro Kubikmeter), Wärmeleitfähigkeit (0.24 W pro Meter Kelvin), Längenausdehnungskoeffizient (0.035 mm pro Meter Kelvin bei Faserrohren) und Elastizitätsmodul hinterlegt.
3. Anschlusspunkte für Leitungsnetze:
Die generierten IFC Dateien enthalten sogenannte Distribution Ports. Das sind definierte Andockpunkte, an denen die Planungssoftware Rohre und Formteile automatisch miteinander verschweißt oder verschraubt.
4. Bereitgestellte Download Formate:
Im Download Bereich der Website können Planer für Artikel individuelle IFC 4 Planungsdateien, Tabellen im CSV Format, normgerechte Ausschreibungstexte und 3D Geometrien im OBJ Format herunterladen.

## 3. Was für ein vollwertiges BIM Angebot noch fehlt
Obwohl der herstellerunabhängige Standard IFC 4 bereits erzeugt werden kann, fehlen für einen flächendeckenden Einsatz bei allen Großplanern noch zwei spezifische Bausteine:

1. Native Autodesk Revit Familien (.rfa Format):
Viele große Ingenieurbüros in Deutschland, den USA und dem Nahen Osten arbeiten mit Autodesk Revit und bevorzugen native RFA Dateien, da diese sich noch nahtloser in bestehende Rohrnetzberechnungsmodule einfügen als neutrale IFC Dateien.
2. VDI 3805 Produktdaten:
In der deutschen Gebäudetechnik ist die Richtlinie VDI 3805 (bzw. die internationale Norm ISO 16757) der Standard für TGA Berechnungsprogramme wie liNear, Trimble Nova oder Dendrit. Diese Datensätze müssen bei Bedarf über spezialisierte Konverter bereitgestellt werden.

## 4. Empfohlener nächster Schritt
Die vorhandene mathematische Geometriebibliothek und die geprüften Artikelmaßtabellen bilden das perfekte Fundament. Als nächster strategischer Schritt empfiehlt sich die automatisierte Ableitung nativer Revit Familien auf Basis der bereits geprüften IFC 4 Datenstruktur.
