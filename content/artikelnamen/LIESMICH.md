# Artikeltexte des Herstellers

## Was hier liegt

`artikeltexte-2026-08.tsv` — 820 Artikelnummern mit dem offiziellen Namen des
Herstellers in Deutsch, Englisch und Französisch.

**Herkunft:** `Marketing 2/Übersetzungen/Gesamtuebersicht_Artikeltexte_DEU_ENU_FRA_.xlsx`,
Blatt „Gesamtübersicht", eingegangen im August 2026.

Der Marketing-Ordner ist nicht versioniert (`.gitignore`), die Arbeitsmappe
selbst also nicht Teil des Repositories. Diese TSV ist ihr **wortwörtliches
Abbild** — einschließlich der bekannten Fehler, siehe unten.

## Warum TSV und nicht CSV

**326 der Zeilen enthalten ein doppeltes Anführungszeichen** (`Winkel 90° IG
d20-1/2"`). In CSV ist das Anführungszeichen das Maskierungszeichen; jede Zeile
müsste gequotet und jedes innere Zeichen verdoppelt werden, und ein einziger
Fehler beim nächsten Export verschiebt still alle Spalten.

Ein Tabulator kommt in keinem der 3280 Felder vor, ebenso wenig ein
Zeilenumbruch — beides beim Erzeugen geprüft, nicht angenommen. TSV braucht
deshalb überhaupt keine Maskierung.

## Was hier NICHT passiert

**Diese Datei wird nicht korrigiert.** Sie ist der Beleg, nicht die
Arbeitsfassung. Sobald jemand sie von Hand richtigstellt, bringt die nächste
Lieferung des Herstellers den Fehler still zurück — der Diff sähe aus wie eine
normale Aktualisierung.

Korrekturen stehen getrennt in `korrekturen.tsv`, und der Generator sichert zu,
dass jede Korrekturzeile in der Quelle existiert **und** tatsächlich einen
Prüfer verletzt. Eine Korrektur, die der Hersteller inzwischen behoben hat,
bricht damit den Bau und wird gelöscht statt zu verrotten.

## Bekannte Fehler in dieser Lieferung

Gemessen, nicht geschätzt:

| Was | Betroffen |
|---|---|
| Französisch trägt eine **fremde** Maßangabe (`d20 mm` aus einer anderen Zeile) | `AQ045P125`, `CU045P75`, `MO045P40`, `MO045P50`, `MO045P63` |
| Englisch fehlt ganz | `UV537P63` |
| Deutsches Feld enthält englischen Text | `MO854P25` |
| Überzählige Leerzeichen | 36 Zeilen |

Leere Felder: 0 Deutsch, 1 Englisch, 0 Französisch. Zellen ohne jeden
Buchstaben: 0.

`MO854P25` und `UV537P63` sind Farbvarianten — sie steuern nur eine
Nummernauflösung bei und liefern nie einen angezeigten Namen. Für sie genügt
die Diagnose.

## Verwendung

`npm run names:sync` erzeugt daraus `lib/article-names.generated.ts`,
`npm run names:check` bewacht die Aktualität in der CI. Die Anwendung liest
ausschließlich die erzeugte Datei — diese TSV wird zur Laufzeit nie geöffnet,
und es gibt bewusst keinen xlsx-Leser im Projekt.
