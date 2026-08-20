# 80 — AGENTEN UND ROLLEN

Wie du die Arbeit aufteilst. Getestet gegen den Bau der ersten 21 Produkte.

---

## 1 · Warum Rollentrennung hier zählt

Von den 19 Fehlern im Katalog wurden **sieben vom Prüfer gefunden, nicht vom
Bauer** — darunter die schwerwiegendsten: der unsichtbare Sechskant, die
stale Galerie, die kaputte Artikelnummernsuche.

Der Grund ist strukturell, nicht persönlich: wer eine Messung schreibt, prüft
sie gegen seine eigene Erwartung. Ein zweiter Blick, der die Erwartung nicht
kennt, findet andere Dinge.

**Wenn du mit Subagenten arbeitest, ist die Trennung Bauer / Prüfer die
wichtigste.** Alle anderen sind optional.

---

## 2 · Die Rollen

### 2.1 KOORDINATOR

Hält den Überblick, verteilt Aufträge, führt `BAUSTAND.md`.

**Aufgaben:**
- Reihenfolge nach `70-ARBEITSAUFTRAEGE.md` festlegen
- Familienpaare **zusammen** vergeben (siehe §3)
- Nach jeder Abgabe: Registry, Galerie, Bibliothek bauen
- Blocker sammeln und dem Menschen melden
- `BAUSTAND.md` fortschreiben

**Darf nicht:** Maße ändern, Geometrie schreiben, Prüfergebnisse
interpretieren.

**Kontextbedarf:** `00-START`, `70-ARBEITSAUFTRAEGE`, `90-PRUEFKATALOG`,
`BAUSTAND.md`.

---

### 2.2 ABLESER (Phase 1)

Liest die Screenshots. **Schreibt keinen Geometriecode.**

**Aufgaben:**
- Seitenbilder erzeugen, Composites bauen
- Tabelle vollständig ablesen, über Seitenumbrüche hinweg
- Zeichnung ablesen: Maßschlüssel, Werkstoff, Farbe wörtlich
- Gegenproben rechnen (`30-PHASENPLAN §1.5`)
- `data.js` schreiben, mit allen Befunden als Kommentar
- Abweichungsliste gegen die Markdown-Datei
- Korrigierte Fassung in `produkt-markdown/`

**Abgabe:** `data.js` + Abweichungsliste + korrigiertes Markdown.

**Muss melden statt raten**, wenn eine Spalte nicht deutbar ist. Das ist
einmal passiert und war richtig.

**Kontextbedarf:** `00-START`, `30-PHASENPLAN §1`, `40-FEHLERKATALOG
Gruppe A`, der Screenshot.

---

### 2.3 MODELLIERER (Phasen 2 und 3)

Baut die Geometrie aus `data.js`.

**Aufgaben:**
- `params.js`: jedes abgeleitete Maß gerechnet, Wächter einbauen
- `parts.js`: ausschließlich Core-Funktionen
- Das ähnlichste fertige Produkt als Vorlage **lesen**
- Formtrennnaht, Auswerfermarken, Entformung, Tonnigkeit nicht vergessen

**Darf nicht:** Maße ändern. Wenn ein Maß unmöglich erscheint, geht es zurück
an den Ableser.

**Kontextbedarf:** `data.js` des Produkts, `20-VISUELLE-REFERENZ`,
`30-PHASENPLAN §2–3`, `60-GEOMETRIE-HANDBUCH`, `parts.js` des Vorbilds.

---

### 2.4 PRÜFER (Phase 4) — die wichtigste Rolle

Prüft, was der Modellierer gebaut hat. **Kennt seine Erwartung nicht.**

**Aufgaben:**
- Maßtest über alle Größen fahren
- Silhouettenprüfung bei Schlüsselflächen, Riffelung, Rippen
- **Jede Messung gegen `40-FEHLERKATALOG` Gruppe C prüfen**
- Konsolenausgabe prüfen
- Verhältnisse gegen die Tabelle nachrechnen

**Die vier Fragen, die der Prüfer bei jeder Messung stellt:**

1. Gibt `ist()` einen `P.`-Wert zurück statt zu messen? → Fall 12
2. Welchen Fehler kann diese Messung **nicht** finden? → Fall 13
3. Vergleicht sie zwei Quellen statt Soll gegen Geometrie? → Fall 14
4. Liegt der Messpunkt am Nennmaßort? → Fall 15

**Abgabe:** Befund mit Belegen. Bei Mängeln: Ursache benennen, nicht nur
Symptom.

**Kontextbedarf:** `40-FEHLERKATALOG` **ganz**, `90-PRUEFKATALOG`,
`20-VISUELLE-REFERENZ §5`, das gebaute Produkt.

---

### 2.5 INTEGRATOR (Phase 5)

Trägt fertige Produkte ins System ein.

**Aufgaben:**
- Registry: `status`, `codes`, `alle`, `n`
- Caches erneuern (nur die betroffenen)
- Galerie bauen, Bibliothek bauen — **einzeln**
- Selbsttest fahren
- Prüfbericht ablegen

**Kontextbedarf:** `90-PRUEFKATALOG`, `build/`-Skripte.

---

## 3 · Die Paarungsregel

**Neue Geometriefunktionen immer an zwei verschiedenen Parametern testen.**

Fehlerkatalog Fall 10: In `bendPath` steckte ein Vorzeichenfehler, der bei 90°
**arithmetisch unsichtbar** war (`cos 90° = 0`). Erst der 45°-Winkel deckte ihn
auf. Wäre nur der 90°-Winkel gebaut worden, hätte der Fehler im Core gelegen
und jeden künftigen Bogen still falsch gemacht.

**Diese Paare zusammen vergeben:**

| Paar | Warum |
|---|---|
| Winkel 45° + 90° mit Gewinde | zwei Winkel derselben Bahn |
| Übergangsmuffe Innen- + Außengewinde | zwei Gewinderichtungen |
| T-Stück Innen- + Außengewinde | dito |
| Metallverschraubung alle vier | zwei Gewinderichtungen × zwei Werkstoffe |
| Anbohrsattel alle drei | glatt, Innen-, Außengewinde |
| Kreuzung + Kreuzungsrohr | zwei Längen derselben Bahn |
| Unterputzventil schwer + leicht | zwei Hälften eines Systems |
| Batterie fest + verstellbar | zwei Kinematiken |

---

## 4 · Übergabeformat zwischen Rollen

Knapp und prüfbar. Kein Prosabericht.

```
VON:      ABLESER
AN:       MODELLIERER
PRODUKT:  fittings/plug
DATEIEN:  products/plug/data.js
GRÖSSEN:  8 (d20–d110)
SPALTEN:  Code · d · D · l · z · kg · Pack.
LEER:     keine
GEGENPROBEN:
  D > d              ✓ alle Zeilen
  (l−z) gegen Norm   Δ max 1,5 mm → Normreihe verwenden
ASSUMPTIONS: 1 (Wölbung der Stirnseite, 0,08·d, gegen Zeichnung zu prüfen)
ABWEICHUNGEN gegen Markdown: 2 Größen fehlten, Spalte D fehlte
BLOCKER:  keine
```

```
VON:      PRÜFER
AN:       MODELLIERER
PRODUKT:  transition-fittings/adaptor-socket-male-thread
VERDIKT:  needs_work
BEFUND:   Sechskant unsichtbar. Silhouettenradius in allen 72 Buckets
          exakt 25,00 mm — Spanne 0,000. Die Außenform ist ein Kreis.
URSACHE:  Revolve-Bund auf rOut = D/2 = Umkreisradius des Sechskants.
          Der Zylinder umhüllt ihn.
BLIND:    Die D-Messung nutzt boxOf().max.z − min.z. Für runden Bund
          (2×25) und Sechskant über Ecke (2×25) identisch → Fall 13.
BEHEBUNG: Bund auf Inkreis af/2 = 21,65. Zweite Messung af einführen.
```

---

## 5 · Wenn du allein arbeitest

Die Rollen bleiben, als **Phasen mit Kontextwechsel**:

1. Ablesen und `data.js` schreiben. Dann die Screenshot-Bilder aus dem
   Kontext nehmen.
2. Modellieren. Dabei die Tabelle als Text nutzen, nicht die Bilder.
3. **Kontext wechseln:** Prüfliste aus `40-FEHLERKATALOG` öffnen und die vier
   Prüferfragen an den eigenen Code stellen — als hätte jemand anderes ihn
   geschrieben.
4. Integrieren.

Schritt 3 ist der, den man weglässt und der die Fehler kostet.
