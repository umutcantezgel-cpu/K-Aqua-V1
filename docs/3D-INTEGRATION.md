# Ein neues 3D-Produkt einbauen

Die Bibliothek liegt in `public/kaqua-3d/`, die Produktionsstrecke in
`docs/3d-produktion/`. Stand: **28 von 71 Produkten** — aktuellen Stand mit
`pnpm 3d:coverage` abrufen.

---

## Der Ablauf in vier Schritten

### 1 · Modul bauen
Nach `docs/3d-produktion/03-Prompt-Produkt.md`. Ergebnis ist eine Datei
`public/kaqua-3d/lib/products/<modul>.mjs`, die ein Objekt mit mindestens
diesen Feldern exportiert:

| Feld | Bedeutung |
|---|---|
| `id` | Modul-ID im Format `kategorie/slug`, z. B. `fittings/tee` |
| `sizes` | Alle lieferbaren Nennweiten als Zahlen |
| `defaultSize` | Welche Größe beim Öffnen gezeigt wird |
| `build(size, _, clipPlane)` | Erzeugt die Geometrie; gibt `{ root }` zurück |

`build` muss für **jede** Größe aus `sizes` eine Geometrie mit Meshes und
Vertices liefern — genau das prüft der Test in Schritt 3.

### 2 · In der Registry eintragen
In `public/kaqua-3d/lib/registry.mjs` ergänzen und in `index.mjs` einen
Lazy-Loader eintragen:

```js
'fittings/tee': () => import('./products/tee.mjs'),
```

Der Loader ist bewusst faul: Bei 71 Modellen entscheidet das über 40 kB
gegenüber 1,7 MB im ersten Seitenaufruf.

### 3 · Zuordnung erzeugen und prüfen

```bash
pnpm 3d:sync        # erzeugt lib/3d/slug-map.generated.ts neu
pnpm test           # baut jedes Modell und prüft die Geometrie
pnpm 3d:coverage    # zeigt den neuen Stand
```

`lib/3d/slug-map.generated.ts` wird **nicht von Hand geändert**. Die CI prüft
mit `pnpm 3d:check`, dass sie zur Registry passt.

### 4 · Nur bei Bedarf: Ausnahme eintragen
Teilt sich eine Katalogvariante das Modell eines anderen Produkts — etwa der
Winkel 45° Innen/Außen, der sich vom Standardwinkel nur im Gewinde
unterscheidet —, kommt das nach `lib/3d/aliases.ts`. Das ist eine
redaktionelle Entscheidung und bleibt deshalb Handarbeit.

**Für ein Produkt mit eigenem Modell ist hier nichts zu tun.** Die triviale
Zuordnung entsteht in Schritt 3 von selbst.

---

## Wo die Modelle erscheinen

| Ort | Komponente |
|---|---|
| `/[locale]/3d` — Showroom | `Native3DShowroom` |
| Produktdetailseite | `Native3DCanvas` in `produkte/[category]/[slug]` |
| Produktfinder | `Native3DCanvas` in `ProductFinder` |
| Ausschreibungstexte | `Native3DCanvas` |
| Produktgalerie | `ProductGallery` |

Alle beziehen ihre Modelle über dieselbe Zuordnung. Ein neu eingetragenes
Produkt erscheint überall gleichzeitig, ohne dass eine dieser Dateien
angefasst werden muss.

---

## Was passiert, wenn ein Modell fehlt

`resolve3DProductId` gibt `null` zurück, und der Viewer zeigt „Für dieses
Produkt gibt es noch kein 3D-Modell" samt Verweis auf die Maßtabelle.

Bis August 2026 fiel die Funktion stattdessen auf `fittings/socket` zurück —
ein Produkt ohne Modell zeigte also stillschweigend eine Muffe, also ein
anderes Bauteil. Bei einem Viewer, der mit „100 % maßhaltig" wirbt, ist das
schlechter als gar keine Darstellung. Der Rückfall wurde entfernt.

---

## Sprachen

Die Bedienelemente des Viewers liegen unter `viewer3d.*` in
`messages/{de,en,ar}.json`. Neue Beschriftungen dort in **allen drei** Sprachen
ergänzen; `pnpm i18n:check` und `pnpm i18n:usage` fangen Lücken ab.

Produktnamen kommen aus der Bibliotheks-Registry (`titleDe`, `titleEn`) — für
Arabisch greift die Anzeige auf den englischen Titel zurück.

---

## Prüfliste vor dem Zusammenführen

```bash
rm -f tsconfig.tsbuildinfo && npx tsc --noEmit   # 0 Fehler
npx eslint .                                      # 0 Errors
pnpm i18n:check && pnpm i18n:usage                # beide grün
pnpm 3d:check                                     # Zuordnung aktuell
pnpm test                                         # inkl. Geometrieprüfung
rm -rf .next && npm run build                     # grün
```

Den `tsbuildinfo`-Cache vorher löschen: Er hat in dieser Codebasis schon
einmal einen echten Typfehler verdeckt, der erst im Build auffiel.
