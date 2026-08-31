# Übersetzungsauftrag K-Aqua — 20 parallele Agenten, je Agent eine Sprache

**Ziel:** In `messages/<locale>.json` stehen 32.457 Werte, die noch deutsch
oder englisch sind oder ganz fehlen. Sie sollen in 59 Sprachen übersetzt
werden. Wenn `node scripts/i18n-worklist.mjs --alle` am Ende `0 offene
Einträge` meldet, ist der Auftrag erledigt.

Dieses Dokument ist die vollständige Arbeitsanweisung. Es setzt keinerlei
Vorwissen über das Projekt voraus.

---

## 1. Worum es geht

K-Aqua (Hersteller: KWT GmbH) verkauft PP-R- und PP-RCT-Rohrleitungssysteme —
Rohre, Fittings, Armaturen, Schweißwerkzeuge — an Fachbetriebe aus Sanitär,
Heizung und Tiefbau. Die Website ist mehrsprachig; die Texte liegen als JSON
unter `messages/`.

`lib/i18n/request.ts` mischt die Sprachdateien in der Reihenfolge
**de → en → Zielsprache**. Daraus folgt das Entscheidende für diese Arbeit:

> Ein Wert, der in `messages/tr.json` zeichengleich so dasteht wie im
> Deutschen oder Englischen, ist **kein fertiger Eintrag**. Er ist genau das,
> was der Fallback ohnehin geliefert hätte — ein deutscher Satz auf einer
> türkischen Seite. Ein fehlender Schlüssel ist derselbe Befund.

Beides steht deshalb auf der Arbeitsliste.

---

## 2. Die beiden Werkzeuge

Alles läuft über zwei Skripte im Repo. **Schreibe niemals direkt in eine
`messages/*.json`** — das Einspiel-Skript prüft Dinge, die von Hand
zuverlässig übersehen werden.

### Arbeitsliste holen

```bash
node scripts/i18n-worklist.mjs <locale> --out /tmp/kaqua-i18n/<locale>-runde.json --limit 200
```

Schreibt eine Datei:

```json
{
  "locale": "tr",
  "gesamt": 2385,
  "geliefert": 200,
  "eintraege": [
    { "key": "academy.qLabel", "art": "gleich", "quelle": "Frage", "en": "Question" },
    { "key": "nav.bimTitle",   "art": "fehlt",  "quelle": "BIM-Daten", "en": "BIM data" }
  ]
}
```

* `quelle` ist der **deutsche Originaltext und maßgeblich**.
* `en` ist die englische Fassung — nutze sie als Verständnishilfe, wenn das
  Deutsche mehrdeutig ist.
* `art` ist nur Information: `gleich` = steht noch deutsch/englisch da,
  `fehlt` = Schlüssel fehlt ganz. Beide werden gleich behandelt.

Die Liste wird bei **jedem** Aufruf frisch aus den Dateien errechnet. Was
bereits eingespielt ist, taucht nicht mehr auf. Ein Abbruch mitten im Lauf
kann darum nichts kaputt machen.

### Übersetzung einspielen

Schreibe eine Datei in **exakt** diesem Format:

```json
{
  "locale": "tr",
  "uebersetzungen": {
    "academy.qLabel": "Soru",
    "nav.bimTitle": "BIM verileri"
  }
}
```

Dann:

```bash
node scripts/i18n-apply.mjs /tmp/kaqua-i18n/<locale>-fertig.json
```

Das Skript weist ab und meldet einzeln:

| Abweisung | Bedeutung |
|---|---|
| `steht nicht auf der Arbeitsliste` | Schlüssel erfunden oder verschrieben |
| `Platzhalter weichen ab` | `{count}`, `{name}`, `<b>` fehlt oder wurde mitübersetzt |
| `leer` | leerer String |
| `unverändert gegenüber de/en` | nichts übersetzt — siehe Abschnitt 4 |

Exitcode `0` = alles sauber, `3` = teilweise (Bericht lesen und im nächsten
Durchgang korrigieren), `2` = Eingabedatei unbrauchbar.

---

## 3. Die Schleife

Jeder Agent arbeitet seine Sprachen **nacheinander** ab, jede Sprache in
Runden zu 200 Einträgen:

```
für jede zugeteilte Sprache L:
    wiederhole:
        1. node scripts/i18n-worklist.mjs L --out /tmp/kaqua-i18n/L-runde.json --limit 200
           → meldet das Skript Exitcode 0 (also "0 offene Einträge"):
             Sprache L ist fertig, weiter mit der nächsten Sprache.
        2. Lies die Datei. Übersetze JEDEN Eintrag der Liste.
        3. Schreibe /tmp/kaqua-i18n/L-fertig.json im Format aus Abschnitt 2.
        4. node scripts/i18n-apply.mjs /tmp/kaqua-i18n/L-fertig.json
        5. Lies den Bericht. Abgewiesene Einträge im nächsten Durchgang
           richtig machen — nicht unverändert erneut schicken.
```

Die Schleife endet für eine Sprache **nur** dann, wenn Schritt 1 null offene
Einträge meldet. Nicht nach einer festen Rundenzahl, nicht „ungefähr fertig".

Läuft eine Runde ins Leere (0 übernommen, alles abgewiesen), liegt es an der
Rückgabe, nicht am Skript — Bericht lesen, Format prüfen, Platzhalter prüfen.

---

## 4. Übersetzungsregeln

**Ton.** Professionelles B2B-Deutsch der SHK-Branche, in die Zielsprache
übertragen. Adressat ist ein Fachbetrieb, kein Endverbraucher. Sachlich,
knapp, kein Marketing-Überschwang, den das Original nicht hat.

**Unverändert bleiben:**

* Markennamen: K-Aqua, KWT, Coday
* Werkstoff- und Normbezeichnungen: PP-R, PP-RCT, SDR, DIN, ISO, EN, DVGW,
  SKZ, KIWA, DIN 8077 / 8078, EN ISO 15874
* Artikelnummern (AQ50020), Nennweiten (d20, d20–d315), Maße und Zahlen
* Dateiformate: PDF, GLB, GLTF, OBJ, IFC, BIM, CAD
* URLs, E-Mail-Adressen, Telefonnummern

**Platzhalter zeichengenau erhalten.** `{count}`, `{name}`, `{date}`,
`{count, plural, one {…} other {…}}`, `<b>…</b>`. Der Text drumherum wird
übersetzt, die geschweiften Klammern und ihr Inhalt nicht. Bei Plural-Formen
die Regeln der Zielsprache anwenden, aber die ICU-Syntax beibehalten.

**Leerzeichen am Rand.** Manche Werte beginnen oder enden bewusst mit einem
Leerzeichen, weil zwei Schlüssel zu einer Überschrift zusammengesetzt werden
(`"GENAU"` + `" Management System"`). Du musst dich darum **nicht** kümmern —
das Einspiel-Skript übernimmt die Randleerzeichen der Quelle automatisch.

**Wenn die Übersetzung wirklich identisch ist.** In manchen Sprachen ist das
richtige Wort dasselbe wie im Englischen („Question" → französisch
„Question"). Solche Einträge weist das Skript zunächst ab, weil eine
unveränderte Rückgabe sonst in der nächsten Runde wieder auf der Liste stünde
und die Schleife nie endete. Ist der Wert **tatsächlich** korrekt und
identisch, schreibe ihn einmalig fest:

```bash
node scripts/i18n-apply.mjs /tmp/kaqua-i18n/fr-fertig.json --identisch academy.qLabel --identisch nav.cad
```

Das legt `messages/.i18n-identisch/<locale>.json` an. Diese Dateien gehören
zum Ergebnis und dürfen nicht gelöscht werden. **Nutze das sparsam** — es ist
für echte Gleichheit gedacht, nicht als Weg, unübersetzte Einträge
loszuwerden. Im Zweifel übersetzen.

**Rechts-nach-links-Sprachen** (ar, fa, he, ur): normaler Text, keine
Steuerzeichen, keine manuelle Richtungsmarkierung. Das Layout macht die
Website.

---

## 5. Zuteilung der 20 Agenten

Nach Arbeitsmenge ausbalanciert, damit alle etwa gleichzeitig fertig werden.
Die Zahl in Klammern ist der Stand bei Auftragserteilung.

| Agent | Sprachen (offene Einträge) | Summe |
|---|---|---|
| 1 | pl (2399) | 2399 |
| 2 | tr (2385) | 2385 |
| 3 | ru (2380) | 2380 |
| 4 | pt-PT (2357) | 2357 |
| 5 | pt-BR (2220) | 2220 |
| 6 | sr (1401) | 1401 |
| 7 | uk (1200), es-419 (194) | 1394 |
| 8 | vi (689), fi (312), bn (285) | 1286 |
| 9 | uz (612), kk (313), ja (288), ar (23) | 1236 |
| 10 | si (593), is (315), my (291), it (262) | 1461 |
| 11 | ko (581), lv (317), lt (292), am (265) | 1455 |
| 12 | sv (530), hy (319), bg (292), es-ES (269) | 1410 |
| 13 | ur (466), et (323), el (305), mk (280) | 1374 |
| 14 | sl (452), nl (328), hu (309), pt-AO (285) | 1374 |
| 15 | fil (446), ro (346), id (303), fa (278) | 1373 |
| 16 | sk (439), hr (382), hi (296), km (276) | 1393 |
| 17 | th (425), cs (394), ka (297), he (277) | 1393 |
| 18 | sq (423), da (398), lo (296), fr (272) | 1389 |
| 19 | sw (420), no (401), ms (294), fr-SN (277) | 1392 |
| 20 | zh-Hans (405), zh-Hant (404), az (298), mn (278) | 1385 |

Regionalvarianten sind eigenständig und werden **nicht** voneinander kopiert:
`pt-PT` ist europäisches Portugiesisch, `pt-BR` brasilianisches, `pt-AO`
angolanisches; `es-ES` gegen `es-419` (Lateinamerika); `fr` gegen `fr-SN`
(Senegal). Übersetze jede Variante eigenständig in ihrer regionalen Norm.

---

## 6. Leitplanken

* **Alle Agenten arbeiten in derselben Arbeitskopie des Repos.** Das ist
  gewollt und konfliktfrei: jeder Agent schreibt ausschließlich die Datei
  seiner eigenen Sprache.
* **Niemals anfassen:** `messages/de.json`, `messages/en.json`,
  `messages/en-*.json` — das sind die Quellen der Merge-Kette. Ebenso wenig
  die Sprachdatei eines anderen Agenten.
* **Keine Git-Befehle.** Kein `commit`, kein `push`, kein `checkout`, kein
  `stash`. Das Zusammenführen macht der Auftraggeber.
* **Kein `npm run build`, kein `npm run dev`.** In dieser Arbeitskopie läuft
  bereits ein Entwicklungsserver; ein zweiter Build zerstört den
  `.next`-Ordner (ist in diesem Projekt schon zweimal passiert).
* **Keine Änderung an `scripts/i18n-*.mjs`.** Wenn ein Skript falsch
  erscheint, melden statt umschreiben.
* **Keine Struktur- oder Reihenfolgeänderung** in den JSON-Dateien. Das
  Einspiel-Skript kümmert sich darum.

---

## 7. Fertig und Abschlussbericht

Eine Sprache ist fertig, wenn

```bash
node scripts/i18n-worklist.mjs <locale>
```

`0 offene Einträge` meldet. Der Gesamtauftrag ist fertig, wenn

```bash
node scripts/i18n-worklist.mjs --alle
```

für alle 59 Sprachen `0` zeigt.

Danach zur Kontrolle laufen lassen — beide müssen ohne Beanstandung
durchlaufen:

```bash
node scripts/check-locale-placeholders.mjs
node scripts/check-locale-parity.mjs
```

**Jeder Agent meldet am Ende:** seine Sprachen, je Sprache die Zahl der
übersetzten Einträge, die Zahl der als identisch festgeschriebenen Einträge
mit Begründung, und alles, was er nicht auflösen konnte — mit Schlüssel und
Grund. Lieber ein offener Punkt im Bericht als eine geratene Übersetzung in
einem Fachbegriff.
