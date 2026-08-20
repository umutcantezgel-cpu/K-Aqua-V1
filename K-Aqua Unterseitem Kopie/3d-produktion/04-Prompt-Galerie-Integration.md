# Prompt 2 — Galerie-Seite und Website-Integration

**Einmalig auszuführen, sobald die ersten 8–10 Produkte fertig sind.** Nicht am Ende — sonst merkt ihr Integrationsprobleme erst, wenn 70 Modelle daran hängen.

**Mitgeben:** `core/PRODUKT-VERTRAG.md`, `produkt-registry.json`, `06-Nextjs-Integration.md`, ein fertiges Produktpaket, Zugriff auf das Next.js-Repo.

---

## PROMPT BEGINN

Du bist Senior Next.js-Engineer mit Erfahrung in Performance und Barrierefreiheit.

## AUSGANGSLAGE

- Website: Next.js App Router auf Vercel, i18n mit `/de/`-Prefix, Domain `k-aqua-v1.vercel.app`
- Es existiert `kaqua-3d/` — ein produktneutraler Core plus Produktpakete, die alle den Vertrag in `core/PRODUKT-VERTRAG.md` erfüllen. Jedes Produkt ist ein ES-Modul und rendert über die Web-Component `<three-d-stage>`.
- `produkt-registry.json` führt alle 71 Produkte mit Kategorie, URL, Modulname, Geometriefamilie und Baustatus.
- Produktseiten liegen als Markdown in `docs Unterseiten/` und sollen unter `/de/produkte/<kategorie>/<slug>` erscheinen.

## AUFTRAG

Drei Dinge:

1. **React-Adapter** — eine dünne Client-Komponente, die ein Produktmodul lädt und die Web-Component einbettet. Nicht mehr. Die Viewer-Logik bleibt im Core.
2. **3D-Galerie** unter `/de/produkte/3d` — alle fertigen Modelle auf einer Seite, durchsuch- und filterbar.
3. **Einbau in die Produktseiten** — jedes Produkt mit fertigem Modell bekommt den Viewer auf seiner Detailseite, oberhalb der Maßtabelle.

Halte dich an `06-Nextjs-Integration.md`. Weicht dein Entwurf davon ab, begründe es, bevor du es umsetzt.

## ARBEITSWEISE

Kein Zeit- oder Tokenbudget. Reihenfolge: Adapter → eine Produktseite → Galerie → Rest. Nach jedem Schritt fünf konkrete Schwächen benennen und beheben. Miss Performance, statt sie zu schätzen.

---

## §1 REACT-ADAPTER

```tsx
<ProductViewer
  productId="fittings/tee"     // Schlüssel in der Registry
  size={32}                    // optionale Startgröße
  variant="standard"
  height="clamp(360px, 52vh, 620px)"
  features={['size','explode','section','dims','presets']}
  priority={false}             // true nur beim Viewer above the fold
/>
```

Verhalten:

- **Kein SSR.** `next/dynamic` mit `ssr: false`. Die Web-Component registriert sich am `window`.
- **Nicht laden, bis sichtbar.** `IntersectionObserver`, `rootMargin: '200px'`. Der Import des Produktmoduls passiert erst beim Eintritt ins Blickfeld — ausgenommen `priority`.
- **three.js einmal.** Ein gemeinsamer Chunk für `three` und den Core, pro Produkt ein eigener Chunk. Zehn Viewer auf der Galerieseite laden three.js einmal, nicht zehnmal.
- **Aufräumen.** Beim Unmount: Renderer, Geometrien, Materialien, Texturen freigeben, RAF-Loop stoppen, Observer trennen.
- **Nur ein aktiver Renderer.** Auf der Galerieseite darf höchstens **ein** WebGL-Kontext gleichzeitig live sein. Browser limitieren auf 8–16 Kontexte; zehn Viewer nebeneinander reißen die Seite ab. Lösung: Kacheln zeigen das Standbild, der Viewer startet bei Klick oder Hover-Intent, ein laufender Viewer wird beim Start eines neuen abgebaut.
- **Fallback ohne WebGL:** Standbild plus vollständige Maßtabelle, gerendert aus der Registry. Kein Absturz, keine leere Fläche.
- **`prefers-reduced-motion`:** kein Auto-Rotate, verkürzte Animationen.

Ausgabe: `components/ProductViewer.tsx`, `components/ProductViewer.client.tsx`, `lib/kaqua-3d.ts` (Registry-Zugriff und Modul-Auflösung).

## §2 GALERIE `/de/produkte/3d`

Der Zweck ist nicht Vollständigkeit, sondern Eindruck: hier sieht man in dreißig Sekunden, dass das ganze System dreidimensional erfassbar ist.

**Aufbau:**

- Kopfbereich: ein großer Viewer mit einem Vorzeigeprodukt, sofort bedienbar. Standard: der Kugelhahn — das ist das reichste Modell. Daneben ein Satz, was man hier tun kann.
- Filterleiste: Kategorie (7 Buttons), Freitextsuche über Titel und Artikelnummer, Umschalter Raster/Liste. Zustand in der URL (`?kategorie=formteile&q=tee`), damit Ansichten teilbar sind.
- Raster aus Kacheln, eine je Produkt mit fertigem Modell:
  - Standbild, Titel DE, Artikelnummernbereich, Größenbereich
  - Klick startet den Viewer **in der Kachel**, nicht in einem Modal
  - zweiter Klick auf „Zur Produktseite" führt zur Detailseite
- Produkte ohne Modell erscheinen als flache Kachel mit Foto und dem Hinweis „3D-Modell in Vorbereitung" — nicht ausblenden. Der Katalog bleibt vollständig, und der Fortschritt wird sichtbar.
- Zähler: „38 von 71 Produkten als 3D-Modell verfügbar", direkt aus der Registry.

**Regeln:** höchstens ein aktiver WebGL-Kontext. Kacheln sind `<article>` mit echter Überschriftenhierarchie. Tastaturbedienung durch das Raster.

## §3 PRODUKTSEITEN

Jede Detailseite `/de/produkte/<kategorie>/<slug>`:

```
H1 Produkttitel
Kurzbeschreibung
┌──────────────────────────────┐
│  ProductViewer  (priority)   │   ← neu
└──────────────────────────────┘
Maßtabelle (vollständig, aus der korrigierten Markdown-Datei)
Anwendungshinweise
Verwandte Produkte
```

- Der Viewer ersetzt das Produktfoto **nicht**. Foto zuerst laden, Viewer erscheint daneben oder darunter. Ein Produktbild, das sofort da ist, schlägt einen Viewer, der zwei Sekunden braucht.
- Ist die Größe per URL vorgegeben (`?d=63`), startet der Viewer damit und die Tabellenzeile wird hervorgehoben.
- Umgekehrt: Klick auf eine Tabellenzeile setzt die Größe im Viewer. Diese Verbindung ist der eigentliche Nutzen — der Anwender sieht, was er bestellt.
- Produkte ohne Modell zeigen die Seite unverändert. Kein Platzhalter, kein Leerraum.

## §4 SEO UND STRUKTURIERTE DATEN

- Der Viewer ist **progressive Enhancement**. Alle Produktinformationen stehen serverseitig im HTML: Titel, Beschreibung, vollständige Maßtabelle, Artikelnummern. Ein Crawler ohne JavaScript sieht das komplette Produkt.
- `Product`-Schema je Seite mit `name`, `sku` je Größe, `category`, `additionalProperty` für die Maße, `image` (Standbild aus dem Modell).
- `ItemList`-Schema auf der Galerieseite.
- `generateStaticParams` über die Registry, damit alle Produktseiten statisch vorgerendert werden.
- Canonical-URLs, `hreflang` für `de`/`en`.
- Das 3D-Standbild ist zugleich `og:image`.

## §5 PERFORMANCE-BUDGET

| Metrik | Ziel | Messen mit |
|---|---|---|
| LCP Produktseite | < 2,0 s | Lighthouse, Mobil-Drosselung |
| LCP Galerie | < 2,5 s | dito |
| CLS | < 0,05 | Viewer-Container braucht feste Höhe |
| JS bis Interaktivität, ohne 3D | < 180 kB gzip | Bundle-Analyse |
| three.js + Core, eigener Chunk | < 620 kB gzip | dito |
| Produktmodul | < 40 kB gzip | dito |
| Time to First Frame nach Klick | < 900 ms | Performance-Panel |

Der 3D-Code darf **niemals** im initialen Bundle liegen. Prüfe das mit dem Bundle-Analyzer und lege das Ergebnis bei.

## §6 ABNAHME

1. Produktseite ohne JavaScript zeigt Titel, Beschreibung und vollständige Maßtabelle
2. Viewer lädt erst beim Scrollen in Sichtweite
3. Zehn Kacheln auf der Galerieseite, nacheinander gestartet — kein Kontextverlust, kein Speicherzuwachs
4. Größenwahl im Viewer und Klick auf die Tabellenzeile sind synchron
5. `?d=63` startet den Viewer in der richtigen Größe
6. Alle Performance-Ziele aus §5 gemessen und eingehalten
7. Lighthouse: Performance ≥ 90, Barrierefreiheit ≥ 95, SEO = 100
8. Vollständige Tastaturbedienung über Filter, Kacheln, Viewer
9. Rich-Results-Test besteht für Produkt- und Galerieseite
10. Kein Layout-Sprung beim Laden des Viewers
11. Ohne WebGL: Standbild plus Tabelle, keine Fehlermeldung
12. Ein neues Produkt hinzufügen bedeutet: Registry-Eintrag und Modul ablegen. Kein Seitencode wird angefasst. **Das ist der Test, ob die Integration richtig gebaut ist.**

## §7 VERBOTEN

- 3D-Code im initialen Bundle
- Mehr als ein aktiver WebGL-Kontext
- Produktseite, die ohne JavaScript leer ist
- Fester Pixelwert für die Viewer-Höhe (CLS)
- `localStorage` / `sessionStorage`
- Produkte hartkodieren statt aus der Registry lesen
- Viewer-Logik in React nachbauen — sie gehört dem Core

## §8 ABGABE

1. `components/ProductViewer.tsx` und der zugehörige Client-Teil
2. `app/[locale]/produkte/3d/page.tsx` plus Filter- und Kachelkomponenten
3. Erweiterte `app/[locale]/produkte/[category]/[slug]/page.tsx`
4. `lib/kaqua-3d.ts` — Registry-Zugriff und Modulauflösung
5. Bundle-Analyse vor und nach der Integration
6. Lighthouse-Berichte für eine Produktseite und die Galerie
7. Ausgefüllte Abnahmeliste §6
8. Kurze Anleitung: „So fügst du ein neues 3D-Modell hinzu" — maximal zehn Zeilen. Wird sie länger, ist die Integration zu kompliziert geraten.

Beginne mit dem Adapter und zeige mir die Bundle-Analyse, bevor du die Galerie baust.

## PROMPT ENDE
