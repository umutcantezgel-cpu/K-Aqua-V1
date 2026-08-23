# K-Aqua 3D-Produktion — Ablauf

Alles, was gebraucht wird, um die 71 K-Aqua Produkte als 3D-Modelle zu bauen und in die Website einzubauen. Stand: 15. August 2026.

---

## Der Weg in vier Schritten

```
  ①  Core-Refactor              einmalig       02-Prompt-Core-Refactor.md
      └─ Kugelhahn-Bundle wird in Core + Produktpaket zerlegt
         Ergebnis: neues Produkt = 3 kleine Dateien statt eines Viewers

  ②  Produkt bauen              70 ×           03-Prompt-Produkt.md
      └─ Kopf-Block aus der Registry ausfüllen, neue Session, ein Produkt
         Phase 1 liest die Maßtabelle aus dem Screenshot — Pflicht

  ③  Galerie + Integration      einmalig       04-Prompt-Galerie-Integration.md
      └─ startet, sobald 8–10 Produkte stehen. Nicht am Ende.

  ④  Wiederholen ab ②           bis 71
```

---

## Dateien in diesem Ordner

| Datei | Was drinsteht |
|---|---|
| **`produkt-registry.json`** | Die Steuerdatei. 71 Produkte mit Kategorie, URL, Modulname, Artikelnummern, Screenshot-Pfad, Geometriefamilie, Komplexität, Baureihenfolge und Status. Speist Roadmap, Galerie und Produktseiten. |
| `01-Datenbefund.md` | Warum die Maße aus den Markdown-Dateien nicht benutzt werden dürfen. Mit Belegen. **Vor Schritt ② lesen.** |
| `02-Prompt-Core-Refactor.md` | Prompt 0 — einmalig |
| `03-Prompt-Produkt.md` | Prompt 1 — Template, 70 × zu verwenden |
| `04-Prompt-Galerie-Integration.md` | Prompt 2 — einmalig |
| `05-Roadmap.md` | Reihenfolge in fünf Stufen, mit Begründung |
| `06-Nextjs-Integration.md` | Referenz für Prompt 2: Dateistruktur, Routen, Ladestrategie, SEO |

Dazu aus der Vorsession, eine Ebene höher:
`K-Aqua-3D-Viewer-Masterprompt.md` — der Prompt, aus dem der Kugelhahn entstanden ist. Historisch; Prompt 1 ist sein Nachfolger.

---

## Registry — die Felder, auf die es ankommt

```jsonc
{
  "id": "fittings/tee",
  "url": "/de/produkte/formteile/tee",
  "module": "kaqua-tee",
  "source_screenshot": "Fittings K-Aqua/screencapture-…-fittings-tee-….pdf",
  "md_file": "docs Unterseiten/fittings/tee.md",

  "sizes_md": 7,                     // Größen laut Markdown
  "sizes_source_ocr": 26,            // maschinell gelesen — fehleranfällig, nur Indiz
  "sizes_source_verified": 14,       // per Auge geprüft — verbindlich
  "data_status": "verifiziert-md-unvollstaendig",

  "geometry": { "family": "tee", "complexity": 2, "ref_size": 32 },
  "build":    { "tier": 1, "order": 7, "status": "offen" }
}
```

**`data_status`** steuert den Ablauf:

| Wert | Bedeutung |
|---|---|
| `verifiziert-md-unvollstaendig` | Quelle geprüft, Markdown fehlen Größen — Prompt 1 Phase 1 korrigiert sie |
| `verifiziert-md-falsch` | Artikelnummern oder Spaltenzuordnung falsch (beide Kugelhähne) |
| `pruefen-md-vermutlich-unvollstaendig` | OCR sieht mehr Zeilen als das Markdown — Verdacht, noch nicht bestätigt |
| `pruefen` | keine Aussage möglich, Phase 1 klärt es |

Nach jedem Produkt: `build.status` → `fertig`, `data_status` → `verifiziert`, `sizes_source_verified` eintragen.

Aktuell: **40 × `pruefen` · 26 × Verdacht · 3 + 2 verifiziert.**

---

## Die zwei Regeln, an denen es hängt

**1. Ein Produkt pro Session.**
Zwei Produkte in einer Session heißt, dass das zweite geschludert wird. Die Selbstkritikschleifen in Prompt 1 greifen nur, wenn der Kontext nicht schon halb voll ist.

**2. Nie Maße aus den Markdown-Dateien.**
Beim Cap fehlen dort 7 von 14 Größen. Beim Tee fehlen zusätzlich die Spalten `l`, `z` und `l1` — also genau die Werte, die ein maßhaltiges Modell braucht. Bei den Kugelhähnen sind die Artikelnummern falsch. Phase 1 jedes Produkt-Prompts liest deshalb die Tabelle direkt aus dem Screenshot. Details in `01-Datenbefund.md`.

---

## Was nebenbei entsteht

Jeder Produkt-Prompt liefert eine **korrigierte Markdown-Datei**. Nach 71 Produkten ist der Produktkatalog der Website vollständig und stimmt — mit richtigen Bestellnummern und dem kompletten Größensortiment.

Gemessen an dem, was aktuell dort steht, ist das möglicherweise wertvoller als die 3D-Modelle selbst.

---

## Woran man merkt, dass es schiefläuft

| Symptom | Ursache | Was zu tun ist |
|---|---|---|
| Ein Produkt braucht eine Core-Änderung | Der Schnitt aus Prompt 0 war falsch | Core-Funktion nachziehen, nicht ins Produkt bauen |
| Zwei Produkte derselben Familie sehen unterschiedlich aus | Qualitätsdrift | Nach jeder Stufe zwei zufällige Modelle gegen ihr Katalogfoto prüfen |
| Die Galerie ruckelt oder verliert Kontexte | Mehr als ein aktiver WebGL-Kontext | Prompt 2 §1, Ein-Kontext-Regel |
| Lighthouse Performance fällt unter 90 | three.js im initialen Bundle | Bundle-Analyse, Chunk-Trennung prüfen |
| Dieselbe `// ASSUMPTION:` taucht bei mehreren Produkten auf | Fehlende Core-Funktion | Nach jeder Stufe sammeln und in den Core heben |
