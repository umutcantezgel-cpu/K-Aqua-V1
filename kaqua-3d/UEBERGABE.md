# ÜBERGABE — K-Aqua 3D-Produktkatalog

Stand **24.08.2026**. Diese Datei ist der Einstieg. Sie ersetzt keine
Pipeline-Dokumente, sie sagt, in welcher Reihenfolge du sie liest und welche
Regeln über allem stehen.

> **Diese Datei ist neu geschrieben.** Die ursprüngliche `UEBERGABE.md` ging
> am 24.08.2026 mit dem Arbeitsbaum verloren (Fall 41) und war in keiner
> Kopie und keinem Bundle enthalten. Was hier steht, ist aus der Übergabe des
> Menschen, den überlebenden Pipeline-Dokumenten und dem wiederhergestellten
> Quellstand zusammengesetzt. Wo der Originaltext nicht rekonstruierbar war,
> steht das ausdrücklich dabei.

---

## 1 · Stand

| | |
|---|---|
| Produkte | **34 von 71 fertig**, 37 offen, kein Prototyp |
| Selbsttest | **34/34 geladen, größte Abweichung 0,20 mm**, keine Auffälligkeiten |
| Dreiecke gesamt | 956 348 |
| Core | 28 Geometriefunktionen + 5 Konstanten in `core/geometry.js` |
| Fehlerkatalog | 42 Nummern, 40 beschriebene Fälle |
| Zuletzt | Wiederherstellung des Arbeitsbaums; davor Welle 4.2 `elbow-90-male-thread` |

Die 0,20 mm sind der Scheitelausgleich am Gewindeprofil — beabsichtigte
Geometrie, über alle Größen konstant, kein Maßfehler.

## 2 · Lesereihenfolge

| Datei | Wofür |
|---|---|
| `pipeline/40-FEHLERKATALOG.md` | 40 Fehler mit Ursache. **Der wertvollste Teil.** |
| `pipeline/25-BILDQUELLEN.md` | Bildquellen, Rangfolge, Codesysteme. Neu 24.08. |
| `pipeline/20-VISUELLE-REFERENZ.md` | ersetzt das Sehen |
| `pipeline/70-ARBEITSAUFTRAEGE.md` | die 37 offenen nach Wellen |
| `pipeline/90-PRUEFKATALOG.md` | Abnahmeliste, Selbsttest, Bauregeln |
| `LOOP-STATUS.md` | wo der Loop steht, was offen ist |

## 3 · Bauen

**Diese Umgebung hat Node** (v24.14.1). Der frühere Umweg über
`build/sandbox-runner.js` entfällt — die Datei existiert nicht mehr (Fall 40).

```bash
node build/incremental.mjs cache        # nach jeder Quelländerung
node build/incremental.mjs products     # alle Einzelviewer
node build/incremental.mjs lib          # ES-Module, IMMER volle Liste
node build/incremental.mjs gallery      # zuletzt
```

Jeden Schritt in **einem eigenen Aufruf**, sonst sieht der nächste die frisch
geschriebenen Caches nicht. Nach jeder Core-Änderung **alle** Einzelviewer neu
bauen (Fall 22). Nach dem Bau die **Dateiliste** prüfen, nicht die Logzeile
(Fall 17) — und danach die Seite wirklich öffnen (Fall 38).

Ausliefern: `dist/lib/` → `public/kaqua-3d/lib/`, dann
`node scripts/sync-3d-registry.mjs`. Ohne das zeigt die Anwendung den alten
Stand.

## 4 · Harte Regeln

- **Nicht raten.** Eine Spalte, die du nicht deuten kannst, wird im
  Kopfkommentar benannt, nicht geschätzt (Fall 29).
- Ein angesetztes Maß heißt **ASSUMPTION** und steht mit seiner **Herleitung**
  im Kopfkommentar, nicht nur mit seinem Wert.
- Ein Produkt, dessen Maße vollständig geschätzt sind, trägt
  `status:'prototyp'`.
- Eine `ist()`-Funktion, die einen `P.`-Wert zurückgibt, misst nicht. Zwei
  Ausnahmen sind zulässig und heißen so: Wandstärken (Fall 12).
- Kein Maßpunkt in der Entformungsschräge (Fall 15).
- Neue Flächenfunktion: prüfen, ob die Dreiecke der Außenhaut nach außen
  zeigen, mit Gegenprobe an der Bohrung (Fall 39).
- WebGL-Screenshots lassen sich hier nicht auslesen. Ein eigener Renderer mit
  `preserveDrawingBuffer` und `toDataURL` in ein `<img>` macht das Bild
  sichtbar.
- **Widersprüche werden dokumentiert, nicht durch Nachgeben aufgelöst.**
- **Ein Produkt fertig heißt: committen.** Ein Arbeitsstand außerhalb von git
  ist nicht gesichert (Fall 41).

## 5 · Die vier Prüffragen

Vor jeder Abgabe. Sie haben mehr Fehler gefunden als jede Sichtprüfung — in
den letzten zwei Sitzungen sechs Messfehler, bevor sie durchgehen konnten.

> Der Originaltext dieses Abschnitts ist verloren. Die vier Fragen sind aus
> den sieben Prüferfragen in `pipeline/90-PRUEFKATALOG.md` §6 verdichtet,
> die ihr Vorläufer sind. Dort stehen alle sieben; hier die vier, die tragen.

**1 · Misst diese Messung überhaupt?**
Gibt eine `ist()`-Funktion einen `P.`-Wert zurück, bestätigt sie eine Annahme
und tastet nichts ab (Fall 12). Kommt ein Katalogmaß aus einer Core-Funktion,
muss mindestens ein Produkt es wirklich abtasten (Fall 20).

**2 · Welchen Fehler kann keine meiner Messungen finden?**
Enthält die Antwort einen realistischen Fehler, fehlt eine Messung (Fall 13).
Genau so blieb die verkehrt gewickelte Außenhaut monatelang unsichtbar: jeder
`Box3`-Test war grün (Fall 39).

**3 · Liefert die Gegenprobe einen ANDEREN Wert?**
Zu jeder neuen Messung gehört eine zweite an einer Stelle, die einen anderen
Wert liefern **muss**. Eine Prüfung, die überall dasselbe liefert, prüft
nichts (Fall 25). Ein `NaN` ist ein Ausfall, kein Bestehen (Fall 26).

**4 · Trägt die Tabelle meine Deutung über ALLE Zeilen?**
Jede gedeutete Spaltenbeziehung über sämtliche Zeilen durchrechnen, Vorzeichen
prüfen (Fall 28). Wächst eine Abweichung mit der Größe, ist es keine Fase,
sondern die Segmentierung (Fall 27). Ist die Abweichung ein exaktes Vielfaches
eines Fasenmaßes, ist es die Fase (Fall 23).

Danach: Ist jede Abweichung über 0,1 mm **erklärt**? „Ungefähr richtig" ist
keine Erklärung.

## 6 · Der Loop

Ein Produkt **vollständig**, bevor das nächste beginnt.

1. Alle Bilder des Produkts aufziehen — Katalogseite (Rang 1, mit
   Vektorzeichnung), Website-Aufnahme, ALH-Render, Produktfoto. Welches was
   beweisen darf: `pipeline/25-BILDQUELLEN.md`.
2. Tabelle bis zum ORDER-Knopf lesen, jede Spalte deuten, jede Deutung über
   **alle** Zeilen gegenrechnen (Fall 2, Fall 28).
3. Bei Fotoableitung zuerst die abgebildete **Größe** bestimmen (Fall 35).
   Bei ALH-Rendern entfällt das — der Ordnername nennt sie.
4. Modellieren.
5. Maßtest über **alle** Größen.
6. Die vier Prüffragen aus §5 wirklich stellen.
7. Zu jeder neuen Messung eine Gegenprobe mit anderem Wert (Fall 25).
8. Prüfbericht in `pruefung/`.
9. Registry in **beiden** Dateien: `produkt-registry.json` und
   `gallery/registry.js`.
10. Bauen, Schritt für Schritt, jeder in einem eigenen Aufruf.
11. Eine gebaute Seite **öffnen** und `kaqua.ok`,
    `kaqua.built.triangleCount()`, `kaqua.measureAll()` abfragen (Fall 38).
12. Selbsttest `dist/lib-selbsttest.html`, ohne Auffälligkeit.
13. `LOOP-STATUS.md` fortschreiben, **committen**, dann das nächste Produkt.

## 7 · Was der Mensch entscheidet

Sammle solche Punkte in `LOOP-STATUS.md` und arbeite weiter. Frage nur, wenn
ein Punkt den Loop wirklich anhält.

Offen → siehe `LOOP-STATUS.md` §3.
