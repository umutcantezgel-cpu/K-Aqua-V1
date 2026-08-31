# Dokument 5: BIM Daten und deren Status im Projekt

## Zusammenfassung
Dieses Dokument erklaert den Begriff BIM fuer Entscheidungstraeger, analysiert den tatsaechlichen Stand der BIM Faehigkeit im K Aqua Projekt und zeigt auf, welche soliden Grundlagen bereits vorhanden sind und welche Schritte fuer ein vollstaendiges, marktfuehrendes BIM Angebot noch erforderlich sind.

## 1. Was BIM bedeutet und warum es fuer K Aqua geschaeftskritisch ist

BIM steht fuer Building Information Modeling, auf Deutsch Bauwerksdatenmodellierung.

Einfache Erklaerung fuer Nichttechniker:
BIM ist der weltweite Standard fuer die moderne Bauplanung. Architekten, Planer und Grossbauunternehmer zeichnen heute keine zweidimensionalen Plaene mehr, sondern bauen das gesamte Gebaeude vorab als digitalen Zwilling am Computer.

Ein Rohr, ein Knie oder ein Ventil in einem BIM Modell ist kein einfaches Bild, sondern ein intelligentes digitales Bauteil. Wenn ein Planer ein K Aqua Rohr in seine Planungssoftware einfuegt, enthaelt dieses Bauteil automatisch alle relevanten technischen Daten: den exakten Aussendurchmesser, die Muffentiefe fuer Schweissungen, den Werkstoff PP R oder PP RCT, die Druckstufe SDR, das Gewicht mit und ohne Wasserfuellung, die Dammstaerken, den Zeta Druckverlustbeiwert, die Brandschutzklasse und die Herstellerartikelnummer.

Geschaeftliche Bedeutung fuer K Aqua:
Internationale Grossausschreibungen fuer Krankenhaeuser, Flughaefen, Hochhaeuser und Rechenzentren fordern heute zwingend BIM Daten. Hersteller, die keine BIM Daten bereitstellen koennen, werden von fuehrenden Planungsbueros bereits in der Vorentwurfsphase ausgeschlossen. Hersteller mit perfekten BIM Daten werden dagegen automatisch in die Massenauszuege und Bestelllisten der Generalunternehmer uebernommen.

## 2. Der tatsaechliche Status im K Aqua Projekt

Im Projekt K Aqua wurden bereits herausragende, praezise Grundlagen geschaffen, die ueber 32 automatisierte Tests in der Testsuite tests/unit/bim ifc.test.ts abgesichert sind.

Bereits im Projekt vorhandene BIM Grundlagen:

1. Strukturierte Artikel und Masstabellen:
Fuer alle 74 Produktfamilien liegen die vollstaendigen geometrischen Bemaßungen strukturiert im Code vor. Dazu gehoeren Aussendurchmesser, Nennweiten DN, Rohrinnenmaße Di, Muffentiefen, Einbaumaße und Wanddicken.

2. Hydraulische und physikalische Kennwerte:
In der Datei lib/bim sind wichtige Berechnungsdaten wie die absolute Wandrauhigkeit von k gleich 0 Komma 007 Millimeter fuer Polypropylen sowie praezise Zeta Beiwerte fuer Formteile hinterlegt, die fuer hydraulische Rohrnetzberechnungen erforderlich sind.

3. Automatisierte IFC Datenstruktur Generatoren:
Im System existiert ein Generator, der standardisierte Datenstrukturen nach dem internationalen IFC4 und IFC2x3 Standard erzeugt. Das System ordnet Produkte automatisch den richtigen Klassen wie IfcPipeSegment fuer Rohre, IfcPipeFitting fuer Formteile und IfcFlowController fuer Armaturen zu und befuellt die geforderten Eigenschaftssaetze wie Pset PipeSegmentTypeCommon.

4. Digitale Schnittstellen fuer Datenabruf:
Ueber die Programmierschnittstellen unter api/bim/katalog, api/bim/produkt und api/bim/artikel koennen externe Systeme alle Produktdaten im strukturierten JSON Format maschinell abrufen.

## 3. Was noch fehlt, um vollwertige BIM Daten anzubieten

Trotz der starken mathematischen und datenseitigen Basis fehlen aktuell noch die fertigen Dateiformate fuer die gaengigen CAD Planungsprogramme:

1. Native Autodesk Revit Familiendateien mit der Dateiendung RFA:
Planer benoetigen native Revit Familien mit definierten Anschlusspunkten, sogenannten MEP Connectors. Diese Anschlusspunkte definieren, wo das Rohr ansetzt, welche Fliessrichtung vorliegt und welche Dimension angeschlossen wird.

2. Vorkompilierte IFC Dateien zum Direkt Download:
Auf den Produktseiten existiert noch kein direkter Download Button fuer fertige IFC Modelldateien, die ein Planer ohne Programmieraufwand direkt in Graphisoft Archicad oder Trimble Nova importieren kann.

3. VDI 3805 und ISO 16757 Datensaetze:
Fuer den deutschen und europaeischen TGA Markt wird fuer Berechnungsprogramme wie Solar Computer oder Linear haeufig das VDI 3805 Format gefordert.

## 4. Strategische Handlungsempfehlung fuer den Auftraggeber

K Aqua hat 90 Prozent der aufwaendigen Vorarbeit bereits erledigt, da alle Geometrien, Masstabellen und physikalischen Eigenschaften sauber und geprueft digital vorliegen.

Empfohlener naechster Schritt:
Auf Basis der vorhandenen JSON und IFC Datenstrukturen sollte ein automatisierter Batch Konverter aufgesetzt werden, der fuer alle 70 Produkte die nativen RFA Dateien fuer Revit und STEP Dateien fuer den Maschinenbau erzeugt. Diese Dateien koennen anschliessend im Downloadbereich der Plattform fuer registrierte Planer bereitgestellt werden, was K Aqua sofort an die Spitze der digitalen Anbieter im Rohrleitungsbau katapultiert.
