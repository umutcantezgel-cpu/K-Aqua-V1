# 00 — START HIER

**Auftrag:** 50 fehlende 3D-Produktmodelle für das K-Aqua PP-R Rohrsystem
bauen. 21 sind fertig und dienen als Vorlage.

Du arbeitest in einem bestehenden, funktionierenden System. **Du erweiterst
es, du gestaltest es nicht neu.** Jede Regel in diesen Dokumenten ist aus
einem echten Fehler entstanden, der schon einmal gemacht wurde.

---

## Das Wichtigste in zehn Sätzen

1. Ein Produkt besteht aus **vier Dateien** in `products/<slug>/`: `data.js`,
   `params.js`, `parts.js`, `index.js`. Nichts anderes.
2. **Kein Viewer-Code, kein CSS, keine UI** im Produkt. Das gehört alles dem
   Core und ist fertig.
3. Alle Maße in **Millimetern**. Immer. Die Umrechnung macht der Viewer.
4. Maße kommen **ausschließlich aus dem Screenshot** der Produktseite. Die
   Markdown-Dateien in `docs Unterseiten/` sind nachweislich unvollständig
   und teils falsch — sie sind **verboten** als Maßquelle.
5. **Kein CSG**, keine booleschen Operationen. Jede Bohrung ist Teil einer
   geschlossenen Profilkontur.
6. Farben nur über **Materialschlüssel** aus der Registry. Ein Hex-Wert im
   Produktcode ist ein Fehler.
7. Jedes Produkt bringt einen **Maßtest** mit, der Soll gegen die *gebaute
   Geometrie* prüft. Grenze ±0,3 mm.
8. Eine Messung, die zwei Annahmen vergleicht oder gegenüber dem Fehler blind
   ist, den sie finden soll, ist **keine Messung**. Siehe `40-FEHLERKATALOG.md`.
9. Jede Annahme, die nicht aus der Tabelle folgt, trägt einen
   `ASSUMPTION`-Kommentar mit Begründung und Verifikationsquelle.
10. Wenn du eine Spalte nicht deuten kannst: **nicht raten, melden.** Ein
    falsch gelesenes Maß kostet mehr als eine Rückfrage.

---

## Lesereihenfolge

| Datei | Wofür | Wann lesen |
|---|---|---|
| `00-START-HIER.md` | dieses Dokument | zuerst, ganz |
| `10-SYSTEM-ARCHITEKTUR.md` | wie Core, Produkte und Bau zusammenhängen | einmal, ganz |
| `20-VISUELLE-REFERENZ.md` | **wie die Teile aussehen müssen** | einmal ganz, dann je Produkt nachschlagen |
| `30-PHASENPLAN.md` | die fünf Phasen je Produkt | vor jedem Produkt |
| `40-FEHLERKATALOG.md` | 14 echte Fehler und ihre Ursachen | einmal ganz, dann bei jedem Maßtest |
| `50-PRODUKT-VERTRAG.md` | die Schnittstelle, formal | beim Schreiben von `index.js` |
| `60-GEOMETRIE-HANDBUCH.md` | alle Core-Funktionen mit Beispielen | beim Schreiben von `parts.js` |
| `70-ARBEITSAUFTRAEGE.md` | die 50 offenen Produkte, einzeln | je Produkt |
| `80-AGENTEN.md` | Rollenaufteilung, wenn du mit Subagenten arbeitest | vor dem Start |
| `90-PRUEFKATALOG.md` | Abnahmekriterien, die erfüllt sein müssen | vor jeder Abgabe |

---

## Was im Projekt liegt

```
kaqua-3d/
├── core/                  FERTIG. Nicht ändern außer nach 10-SYSTEM §7.
│   ├── geometry.js        Profile, Rotationskörper, Loft, Sweep, Gewinde…
│   ├── materials.js       13 Materialrezepte, EINE Farbkonstante
│   ├── assembly.js        Teile-Factory, Explosion, Schnitt, Messwerkzeuge
│   ├── overlay.js         Maßlinien und DOM-Labels
│   ├── ui.js              Bedienrahmen (HTML + CSS)
│   ├── viewer.js          Bedienlogik, mount()
│   ├── export.js          GLB, OBJ, Standbilder
│   └── stage.js           WebGL-Bühne als Web-Component
├── products/              21 fertige Produkte + 3 Familienmodule
│   ├── _pipe/             geteilte Logik der 12 Rohre
│   ├── _bend/             geteilte Logik der Winkel
│   ├── _tee/              geteilte Logik der Abzweige
│   └── <slug>/            je 4 Dateien
├── gallery/               Übersichtsseite über alle 71
├── build/                 Bauskripte und Zwischenstände
├── dist/                  fertige HTML, ES-Module, INTEGRATION.md
├── produkt-markdown/       korrigierte Produktseiten
└── pruefung/              Prüfberichte

quellen/                   Seitenbilder aus den Screenshots
K-Aqua Unterseitem Kopie/  die Originalscreenshots (PDF und PNG)
```

---

## Der Ablauf je Produkt, in Kurzform

```
1. Screenshot finden       K-Aqua Unterseitem Kopie/<Kategorie>/…
2. Seitenbilder erzeugen   PDF → JPG, siehe 30-PHASENPLAN §1.2
3. Tabelle ablesen         VOLLSTÄNDIG. Über Seitenumbrüche hinweg.
4. Zeichnung ablesen       Maßschlüssel, Werkstoff, Farbe — wörtlich
5. Gegenproben rechnen     30-PHASENPLAN §1.5
6. data.js schreiben       mit allen Befunden als Kommentar
7. params.js schreiben     jedes abgeleitete Maß gerechnet, nie hartkodiert
8. parts.js schreiben      nur Core-Funktionen
9. index.js schreiben      nach 50-PRODUKT-VERTRAG
10. Maßtest fahren         alle Größen, Grenze 0,3 mm
11. Sichtprüfung           gegen das Produktfoto, siehe 20-VISUELLE-REFERENZ
12. Prüfbericht schreiben  pruefung/<slug>-pruefbericht.md
13. Registry eintragen     status: 'fertig'
14. Bauen                  90-PRUEFKATALOG §5
```

**Reihenfolge nicht ändern.** Wer bei 7 anfängt, ohne 3 bis 5 gemacht zu
haben, baut ein Modell mit falschen Maßen — das ist zwölf Mal passiert und
jedes Mal teurer gewesen als die Ablesung.

---

## Was Erfolg bedeutet

Ein Produkt ist fertig, wenn **alle** diese Punkte erfüllt sind:

- [ ] Maßtest über **alle** Nennweiten, größte Abweichung ≤ 0,3 mm
- [ ] jede Abweichung über 0,1 mm ist im Prüfbericht **erklärt**
      (Formtrenngrat, Eckenradius, Segmentierung — nicht „ungefähr")
- [ ] Restwand ≥ 3 mm bei Fittings (bei Rohren gilt die SDR-Reihe)
- [ ] Sichtprüfung gegen das Produktfoto bestanden
- [ ] keine Konsolenausgabe
- [ ] jede Annahme trägt `ASSUMPTION` mit Begründung
- [ ] Prüfbericht liegt in `pruefung/`
- [ ] Registry-Eintrag auf `fertig`, `codes` und `alle` gefüllt
- [ ] Galerie und Bibliothek neu gebaut, Selbsttest ohne Auffälligkeit

---

## Was du NICHT tust

| | Warum |
|---|---|
| Maße aus `docs Unterseiten/*.md` übernehmen | Nachweislich falsch. Bei der Muffe fehlten 2 von 9 Größen, die Spalte `L` war eine andere als angegeben, und 6 von 7 Werten stimmten nicht. |
| Eine Spalte deuten, die du nicht verstehst | Bei der Reduzierbuchse hat eine falsch gelesene Spalte einen kompletten Modellversuch gekostet. |
| Den Core „verbessern" | Er ist gegen 21 Produkte erprobt. Änderungen nur nach `10-SYSTEM §7`. |
| Einen Farbwert ins Produkt schreiben | `PPR_GREEN` ist eine Konstante für alle 71 Produkte. |
| CSG oder boolesche Operationen | Ausdrücklich ausgeschlossen. |
| Eine Messung schreiben, die die Annahme zurückgibt, die sie prüfen soll | `40-FEHLERKATALOG` Fall 3, 8, 11. |
| Mehrere Bauschritte in einen Aufruf packen | Zeitbudget. Ein Timeout verwirft alle Schreibvorgänge, meldet aber Erfolg. |
| Die Galerie mit einer Teilliste bauen | Schrumpft die Indexdateien. |

---

## Wenn du nicht weiterkommst

Melde es **mit dieser Struktur**, statt zu raten:

```
PRODUKT:   fittings/xyz
PHASE:     1 (Datenermittlung)
PROBLEM:   Spalte `h` nicht deutbar
BEFUND:    Bei d20 steht L=70, h=52, L1=34. Die Muffenlänge derselben
           Nennweite ist 34. h=52 ist größer als L1 und kleiner als L.
           Die Zeichnungsminiatur ist in der Seite nicht auffindbar.
VERSUCHT:  Crop bei y=2140..2270 (leer), y=1700..2600 (nur Foto)
GEBRAUCHT: Zeichnung in lesbarer Auflösung ODER Bedeutung von h und L1
BLOCKIERT: transition-fittings/adaptor-socket-female-thread
```

Das ist bereits einmal passiert und war die richtige Entscheidung.
