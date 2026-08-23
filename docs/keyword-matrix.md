# Keyword-Matrix & Anti-Kannibalisierung

**Stand:** 23.08.2026 · Grundlage für die Titel- und Description-Arbeit (Sequenz 2)
Alle Zahlen sind am Produktions-Build gemessen, nicht geschätzt.

---

## 1 · Warum dieses Dokument

Zwei Seiten dürfen nie auf dieselbe Suchintention zielen. Wenn sie es tun, teilen sie
sich die Signale, und Google entscheidet selbst, welche er zeigt — meist die falsche.
Diese Matrix ordnet jeder der 186 indexierbaren Routen **genau ein** Primär-Keyword und
**genau eine** Suchintention zu. Sie ist die Referenz, gegen die Titel, Description und
H1 geschrieben werden.

### Ausgangslage, gemessen

| Kennzahl | Wert |
|---|---|
| Deutsche Seiten mit Titel im statischen Build | 102 |
| Ø Titellänge | **41 Zeichen** |
| Titel unter 45 Zeichen | **63 (61 %)** |
| Titel über 60 Zeichen | 0 |
| Doppelte Titel | 0 |
| Doppelte Descriptions | 0 |

Kein Titel ist zu lang — sie sind zu **kurz**. Bei rund 600 px Anzeigebreite im
Suchergebnis (etwa 60 Zeichen) verschenken 63 Seiten im Schnitt 20 Zeichen. Das ist
die Fläche, auf der das Kaufsignal stehen müsste.

Die kürzesten Titel zeigen das Muster:

```
18  Impressum | K-Aqua
22  Produktfinder | K-Aqua
30  K-Pipe PP-RCT SDR 7.4 | K-Aqua
31  K-Pipe Rohr PP-R SDR 6 | K-Aqua
32  Märkte & Standorte | K-Aqua
```

„K-Pipe Rohr PP-R SDR 6" benennt den Artikel, aber nicht die Dimension (20–50 mm),
nicht den Druck (SDR 6 = PN 20), nicht die Anwendung und nicht den Anbieter-Typ
(Hersteller, nicht Händler). Genau danach wird gesucht.

---

## 2 · Zwei Befunde, die vor der Textarbeit geklärt werden müssen

### 2.1 · 21 Produktseiten sind per Canonical aus dem Index genommen

`app/[locale]/produkte/[category]/[slug]/page.tsx` bildet 21 Slugs auf 12 kanonische
Seiten ab. Damit sagt die Website Google: „Diese Seite ist ein Duplikat, indexiere die
andere." Die Prüfung der Quelldateien zeigt jedoch **eigenständige Produkte**:

| Seite | Artikelnummern | Zeigt auf | Artikelnummern des Ziels |
|---|---|---|---|
| `fittings/elbow-45` | `AQ04520 … AQ04575` (7) | `fittings/elbow-90` | `AQ09020 … AQ09075` (7) |
| `pipes/k-pipe-pp-r-sdr-6` | `AQ200P20 … AQ200P50` | `pipes/k-pipe-pp-r-sdr-11` | `AQ11P20 … AQ11P50` |
| `tools/pipe-cutter-2040` | `AQ97040` | `tools/pipe-cutter-50125` | `AQ975125` |
| `transition-fittings/metal-union-female-thread` | eigene IG-Reihe | `…-male-thread` | eigene AG-Reihe |

Ein 45°-Winkel ist kein 90°-Winkel. SDR 6 ist PN 20, SDR 11 ist PN 10 — verschiedene
Druckklassen. Ein Rohrabschneider d20–d40 schneidet keine d125. Die Inhalte umfassen
je 15–28 kB eigenen Text mit eigenen Maßtabellen.

**Wer „PP-R Winkel 45 Grad", „PP-R Rohr SDR 6" oder „Rohrabschneider 20-40" sucht,
findet K-Aqua derzeit nicht** — die Seiten existieren, sind aber freiwillig aus dem
Index genommen.

**Auflösung:** Die Konsolidierung war eine Notmaßnahme gegen zu ähnliche Titel und
Descriptions. Sequenz 2 beseitigt die Ursache, indem sie Dimension, Druckstufe,
Gewindeart und Artikelnummernkreis in Titel und Description hebt. Danach wird die
Canonical-Abbildung aufgehoben — **aber erst danach**, nicht vorher. Reihenfolge ist
hier wesentlich: Zuerst unterscheidbar machen, dann freigeben.

Ausgenommen bleiben die zwei echten Dubletten, bei denen dieselbe Ware unter zwei
Slugs liegt: `tools/pipe-cutter-50125-1` („Alternative Pipe Cutter 1") und
`accessories/flat-gasket-for-unions-pp-r`.

### 2.2 · Neun deutsche Seiten tragen englische Titel

Im deutschen Build gemessen:

| Route | Titel heute | richtig wäre |
|---|---|---|
| `pipes/k-fiber-pipe-pp-r-sdr-74` | K-Fiber **Pipe** PP-R SDR 7.4 | K-Fiber **Rohr** |
| `pipes/k-fiber-pipe-pp-rct-sdr-74` | K-Fiber **Pipe** PP-RCT SDR 7.4 | K-Fiber **Rohr** |
| `pipes/k-fiber-uv-pipe-pp-r-sdr-74` | K-Fiber UV **Pipe** … | K-Fiber UV **Rohr** |
| `pipes/k-fiber-uv-pipe-pp-rct-sdr-74` | K-Fiber UV **Pipe** … | K-Fiber UV **Rohr** |
| `fittings/elbow-45-femalemale` | PP-R **Elbow** 45° **Female/Male** | PP-R Winkel 45° IG/AG |
| `fittings/reducing-tee-large-sizes` | PP-R **Reducing Tee** (Large) | PP-R T-Stück reduziert (groß) |
| `accessories/flat-gasket-for-unions-pp-r` | **Flat Gasket for Unions** PP-R | PP-R Flachdichtung für Verschraubungen |
| `tools/pipe-cutter-2040` | **Ratchet Pipe Cutter** d20-d40 | Ratschen-Rohrabschneider d20–d40 |
| `tools/pipe-cutter-50125-1` | **Alternative Pipe Cutter 1** 1/4&quot; (d50-d125) | Rohrabschneider 1¼″ (d50–d125) |

Zwei Nebenbefunde in derselben Zeile: `pipe-cutter-50125-1` trägt einen internen
Arbeitsnamen („Alternative … 1") nach außen, und das Zollzeichen steht als rohes
`&quot;` im Titel statt als `″`.

Zusätzlich wird `fittings/stub-end` von der Kürzungslogik abgeschnitten
(„PP-R Vorschweißbund (Stub End) für…"), weil die Quelle über 60 Zeichen liegt.

---

## 3 · Die Tier-Architektur

Acht Ebenen, jede mit eigener Intention. Die Trennung der Intention ist das, was
Kannibalisierung verhindert — nicht die Wortwahl allein.

| Tier | Routen | Suchintention | Wer sucht so | Primärmuster |
|---|---|---|---|---|
| **1 Marke** | 1 | Entität, Herstellernachweis | Einkauf prüft Lieferant | Hersteller + Werkstoff + Land |
| **2 Hub** | 3 | Navigation, Sortimentsbreite | Planer verschafft Überblick | Oberbegriff + Sortiment |
| **3 Kategorie** | 7 | kommerziell, Sortenwahl | Planer wählt Bauteilgattung | Bauteilgattung + PP-R + Auswahlkriterium |
| **4 Produkt** | 74 | transaktional, Artikelsuche | Einkauf sucht Artikel | Bauteil + Dimension + Druck + Artikelnummernkreis |
| **5 Land** | 24 | Export, Marktzugang | Exporteur prüft Zulassung | Land + Zulassungsregime |
| **6 Stadt** | 28 | lokal, Projektvergabe | Bauleiter sucht Lieferant | Stadt + Regulierer + Lieferzusage |
| **7 Wissen** | 50 | informationell | Fachmann klärt Frage | Fachfrage, Vergleich, Verfahren |
| **8 Werkzeug** | 3 | Recherche, Bindung | Planer rechnet/prüft | Werkzeugnutzen + Gegenstand |

**Zeichenkorridore, verbindlich:**

| Element | Ziel | hart |
|---|---|---|
| Titel (inkl. „ | K-Aqua") | **52–60** | ≤ 65 |
| Description | **140–155** | ≤ 158 |

Der Suffix „ | K-Aqua" kostet 9 Zeichen. Das Muster muss also 43–51 Zeichen liefern.

---

## 4 · Das eigentliche Konfliktfeld: Land ↔ Stadt

24 Länderseiten und 28 Städteseiten zielen heute auf dasselbe:

```
geo.hubMetaTitle  = "PP-R Rohrsysteme für {country}"   → 24 Seiten, ~37 Zeichen
geo.cityMetaTitle = "PP-R Rohrsysteme in {city}"       → 28 Seiten, ~35 Zeichen
```

„PP-R Rohrsysteme für Deutschland" und „PP-R Rohrsysteme in Frankfurt" konkurrieren
um dieselbe Anfrage. Beide sind zu kurz, und beide sagen dasselbe.

**Die Auflösung liegt bereits in den Daten** (`lib/data/geo.ts`) und wird nur nicht
genutzt. Jede Stadt trägt `regulator`, `norms[]`, `water`, `focus[]` und `note`;
jedes Land zusätzlich `crisisContext`.

| Ebene | Intention | Was in den Titel gehört | Was in die Description gehört |
|---|---|---|---|
| **Land** | „Darf ich dort verkaufen?" | Zulassungsregime des Landes | Normenrahmen, Exportweg, Marktkontext |
| **Stadt** | „Wer liefert mir hier?" | Regulierer **oder** Lieferzusage | Wasserprofil, Projekttypen, Lieferzeit ab Werk |

Das Land beantwortet die Zulassungsfrage, die Stadt die Beschaffungsfrage. Zwei
verschiedene Menschen zu zwei verschiedenen Zeitpunkten im Projekt.

### 4.1 · Länder (Tier 5) — 24 Routen

Das Zulassungsregime je Land wird aus der ersten zugehörigen Stadt abgeleitet; es ist
innerhalb eines Landes einheitlich. Zwei Länder haben keine Stadtseite und bekommen
den Wert direkt.

| Slug | Land | Zulassungsregime → Titelbaustein | Kontext für die Description |
|---|---|---|---|
| `deutschland` | Deutschland | DVGW / TrinkwV | Sanierungsstau, 4 Städte |
| `oesterreich` | Österreich | ÖVGW | ÖNORM-Rahmen |
| `schweiz` | Schweiz | SVGW | SN/SIA-Rahmen |
| `uk` | Vereinigtes Königreich | WRAS | Infrastruktur-Erneuerung |
| `frankreich` | Frankreich | ACS | Grand Paris |
| `italien` | Italien | DM 174/2004 | UNI-Rahmen |
| `polen` | Polen | PZH-Atest | Neubauwelle |
| `tschechien` | Tschechien | SZÚ | Altbausanierung |
| `uae` | VAE | DEWA / Estidama | Wasserknappheit, Hochhausbau |
| `ksa` | Saudi-Arabien | SASO / SBC 701 | Vision 2030 |
| `katar` | Katar | Kahramaa / QCS | Lusail |
| `kuwait` | Kuwait | MEW | Silk City |
| `oman` | Oman | Nama Water Services | Duqm |
| `bahrain` | Bahrain | EWA | Bahrain Bay |
| `jordanien` | Jordanien | WAJ / Miyahuna | Disi-Pipeline |
| `aegypten` | Ägypten | HCWW / EOS | New Administrative Capital |
| `tuerkei` | Türkei | TSE / İSKİ | Erdbebensicherheit |
| `singapur` | Singapur | PUB / SS 636 | HDB |
| `malaysia` | Malaysia | SPAN / MS | TRX |
| `indien` | Indien | BIS / IS 15801 | Wasserknappheit |
| `suedafrika` | Südafrika | SABS / SANS | Wasserknappheit |
| `kenia` | Kenia | KEBS Diamond Mark | Affordable Housing |
| `chile` | Chile | ISO 15874 (kein nationales Sonderregime hinterlegt) | El Niño |
| `japan` | Japan | ISO 15874 (kein nationales Sonderregime hinterlegt) | Tsunami-Resilienz |

**Titelmuster Tier 5** — Ziel 52–60 Zeichen inkl. Suffix:

```
PP-R Rohrsysteme {country} — Hersteller mit {approval} | K-Aqua
```

Beispiel: `PP-R Rohrsysteme Ägypten — Hersteller mit HCWW | K-Aqua` (54)

Bei langen Ländernamen greift die Kurzform ohne „Hersteller mit":
`PP-R Rohrsysteme Vereinigtes Königreich — WRAS | K-Aqua` (55)

**Descriptionmuster Tier 5** — Ziel 140–155 Zeichen:

```
PP-R und PP-RCT Rohrsysteme für {country}: {approval}-konform, Fertigung in
Deutschland, Export ab Waldsolms. {crisisLine} Datenblätter und Angebot direkt.
```

### 4.2 · Städte (Tier 6) — 28 Routen

Jede Stadt hat einen eigenen Regulierer. Das ist der Unterscheidungsschlüssel — er
ist je Stadt einmalig und wird bereits in `generateMetadata` geladen
(`localizedRegulator`), aber nur in die Description geschrieben, nicht in den Titel.

| Slug | Stadt | Regulierer → Titelbaustein | Projekttyp für die Description |
|---|---|---|---|
| `frankfurt` | Frankfurt am Main | DVGW / TrinkwV | Hochhaus-Steigleitungen Bankenviertel |
| `berlin` | Berlin | Berliner Wasserbetriebe | Wohnquartier-Neubau |
| `muenchen` | München | SWM | Premium-Wohnbau |
| `hamburg` | Hamburg | Hamburg Wasser | HafenCity-Neubau |
| `wien` | Wien | ÖVGW | Gemeindebau-Sanierung |
| `zuerich` | Zürich | SVGW / SIA 385 | Hochpreis-Wohnbau |
| `london` | London | WRAS | High-Rise Residential |
| `paris` | Paris | ACS | Grand-Paris-Wohnquartiere |
| `mailand` | Mailand | DM 174/2004 | Porta Nuova |
| `warschau` | Warschau | PZH-Atest | Wohnquartier-Neubau |
| `prag` | Prag | SZÚ | Altbau-Strangsanierung |
| `dubai` | Dubai | DEWA | Super-High-Rise |
| `abudhabi` | Abu Dhabi | Estidama | Regierungs- & Kulturbauten |
| `doha` | Doha | Kahramaa | Lusail |
| `riad` | Riad | SASO | Vision-2030-Giga-Projekte |
| `dschidda` | Dschidda | SASO / SWCC | Jeddah Central |
| `neom` | NEOM / The Line | NEOM Authority | Linearstadt-Infrastruktur |
| `kuwait` | Kuwait-Stadt | MEW | Silk City |
| `maskat` | Maskat | Nama Water Services | Duqm |
| `manama` | Manama | EWA | Bahrain Bay |
| `amman` | Amman | WAJ / Miyahuna | Disi-Subnetze |
| `kairo` | Kairo | HCWW | New Administrative Capital |
| `istanbul` | Istanbul | İSKİ / TSE | Hotelkomplexe |
| `singapur` | Singapur | PUB | HDB |
| `kualalumpur` | Kuala Lumpur | SPAN | TRX-Finanzdistrikt |
| `mumbai` | Mumbai | BIS | High-Rise Redevelopment |
| `kapstadt` | Kapstadt | SABS / SANS | Krankenhaus- & Hotelbau |
| `nairobi` | Nairobi | KEBS | Affordable Housing |

**Titelmuster Tier 6** — Ziel 52–60 Zeichen inkl. Suffix:

```
PP-R Rohrsysteme {city} — {regulator}-konform liefern | K-Aqua
```

Beispiel: `PP-R Rohrsysteme Frankfurt — DVGW-konform liefern | K-Aqua` (57)

Für Städte mit langem Reguliererkürzel greift die Lieferzusage statt des Regulierers:
`PP-R Rohrsysteme Kuwait-Stadt — Lieferung ab Werk | K-Aqua` (57)

Der Regulierer ist je Stadt **einmalig** und trennt den Stadt-Titel damit sauber vom
Land-Titel, der auf das nationale Zulassungsregime zeigt. Beispiel Deutschland:
Land = „DVGW / TrinkwV" (Zulassung), Stadt Berlin = „Berliner Wasserbetriebe"
(örtlicher Versorger). Verschiedene Begriffe, verschiedene Anfragen.

**Descriptionmuster Tier 6** — Ziel 140–155 Zeichen, Wasserprofil zuerst
(es ist der einmaligste Textbestandteil und verhindert Dubletten-Warnungen):

```
{city}: {water} {regulator}. PP-R/PP-RCT aus deutscher Fertigung, {note} — {focus}.
```

---

## 5 · Tier 1–3 und 8: die 14 Kernrouten

| Route | Primär-Keyword | Intention | Titelmuster (Zeichen) |
|---|---|---|---|
| `/` | PP-R Rohrsysteme Hersteller Deutschland | Entität | `PP-R Rohrsysteme vom Hersteller aus Deutschland` (56) |
| `/produkte` | PP-R Rohre und Fittings Sortiment | Navigation | `PP-R Rohre & Fittings — 74 Artikel im Programm` (54) |
| `/loesungen` | PP-R Anwendungen Trinkwasser Heizung Industrie | Navigation | `PP-R Lösungen: Trinkwasser, Heizung, Industrie` (54) |
| `/maerkte` | PP-R Rohrsysteme Export Märkte | Navigation | `PP-R Rohrsysteme: 24 Exportmärkte weltweit` (51) |
| `/produkte/pipes` | PP-R Rohr kaufen SDR Druckstufen | kommerziell | `PP-R Rohre: SDR 6 bis 17, d20–d630` (43) |
| `/produkte/fittings` | PP-R Fittings Winkel T-Stück Muffe | kommerziell | `PP-R Fittings: Winkel, T-Stücke, Muffen` (48) |
| `/produkte/valves` | PP-R Armaturen Kugelhahn Ventil | kommerziell | `PP-R Armaturen: Kugelhähne & Ventile` (45) |
| `/produkte/tools` | PP-R Schweißgerät Werkzeug | kommerziell | `PP-R Werkzeuge: Schweißgeräte & Zubehör` (48) |
| `/produkte/transition-fittings` | PP-R Übergangsfitting Gewinde Messing | kommerziell | `PP-R Übergangsfittings: Gewinde & Messing` (50) |
| `/produkte/accessories` | PP-R Zubehör Dichtung Rohrschelle | kommerziell | `PP-R Zubehör: Dichtungen & Rohrschellen` (48) |
| `/produkte/weld-in-saddles` | PP-R Einschweißsattel Abzweig | kommerziell | `PP-R Einschweißsättel für nachträgliche Abzweige` (56) |
| `/produkte/finder` | PP-R Rohr Fitting finden Auswahlhilfe | Werkzeug | `Produktfinder: PP-R Rohr & Fitting bestimmen` (53) |
| `/co2-rechner` | CO2 Rohrleitung berechnen PP-R vs Metall | Werkzeug | `CO₂-Rechner: PP-R gegen Kupfer und Stahl` (49) |
| `/3d` | PP-R Rohr 3D CAD Modell ansehen | Werkzeug | `3D-CAD-Studio: PP-R Bauteile ansehen & exportieren` (58) |

Die Kategorieseiten tragen die Auswahldimension im Titel (SDR, Bauteilart, Werkstoff)
— das trennt sie von der Hub-Seite `/produkte`, die die Breite benennt, und von den
Produktseiten, die den einzelnen Artikel benennen.

---

## 6 · Tier 4: die 74 Produktseiten

**Deterministische Regel — kein Einzelfall-Texten:**

```
Titel        = {Bauteil} {Werkstoff} {Unterscheidungsmerkmal} {Dimensionsbereich}
Merkmal      = Rohre        → SDR-Stufe + PN
               Fittings     → Winkelgrad / Anschlussart (IG/AG/Muffe)
               Armaturen    → Kugelwerkstoff / Bauform
               Übergänge    → Gewindeart (IG/AG) + Metallwerkstoff
               Werkzeuge    → Schneid-/Schweißbereich in mm
               Zubehör      → Einsatzort
Dimension    = aus article_codes abgeleiteter Bereich, z. B. d20–d75
```

Beispiele, gegen den Zeichenkorridor gerechnet:

| Slug | heute (Zeichen) | künftig (Zeichen) |
|---|---|---|
| `pipes/k-pipe-pp-r-sdr-6` | K-Pipe Rohr PP-R SDR 6 (31) | K-Pipe PP-R Rohr SDR 6, PN 20, d20–d50 (48) |
| `pipes/k-pipe-pp-r-sdr-11` | K-Pipe Rohr PP-R SDR 11 (32) | K-Pipe PP-R Rohr SDR 11, PN 10, d20–d50 (49) |
| `fittings/elbow-45` | PP-R Standard-Winkel 45° (34) | PP-R Winkel 45° zum Schweißen, d20–d75 (48) |
| `fittings/elbow-90` | PP-R Standard-Winkel 90° (34) | PP-R Winkel 90° zum Schweißen, d20–d75 (48) |
| `tools/pipe-cutter-2040` | Ratchet Pipe Cutter d20-d40 (37) | Ratschen-Rohrabschneider PP-R d20–d40 (46) |
| `tools/pipe-cutter-50125` | Rohrabschneider d50-d125 (33) | Rohrabschneider PP-R d50–d125, 1¼″ (44) |

Das Muster löst zugleich Befund 2.1: „SDR 6, PN 20" gegen „SDR 11, PN 10" und
„Winkel 45°" gegen „Winkel 90°" sind eindeutig verschiedene Titel für eindeutig
verschiedene Anfragen. Damit entfällt der Grund für die Canonical-Konsolidierung.

**Descriptionmuster Tier 4** — Ziel 140–155 Zeichen:

```
{Bauteil} aus {Werkstoff} in {Dimensionsbereich}. {Anwendungssatz}
Artikelnummern {codeFrom}–{codeTo}. Datenblatt, 3D-Modell und Angebot bei K-Aqua.
```

Die Artikelnummern gehören in die Description, weil im B2B-Einkauf nach ihnen gesucht
wird und sie je Seite garantiert einmalig sind.

---

## 7 · Tier 7: die 50 Wissensartikel

Die Slugs sind bereits keyword-getrieben und long-tail-fähig — hier besteht der
geringste Handlungsbedarf. Beispiele:

```
waermeausdehnung-kunststoffrohre-berechnen-kompensieren-ppr
schweissverfahren-vergleich-heizelementmuffenschweissung-heizwendel-ppr
lebensdauer-berechnung-kunststoffrohre-arrhenius-gleichung-ppr
```

**Regel:** Der Titel übernimmt die Fachfrage wörtlich in der Formulierung, in der sie
gestellt wird, und ergänzt den Werkstoffbezug.

| Artikeltyp | Muster | Beispiel |
|---|---|---|
| Berechnung | `{Größe} berechnen: {Verfahren} bei PP-R` | Wärmeausdehnung berechnen: Formel für PP-R |
| Vergleich | `{A} oder {B}? {Entscheidungskriterium}` | PP-R oder Mehrschichtverbundrohr? Der Vergleich |
| Verfahren | `{Verfahren}: {Schritt/Norm}` | Heizelementmuffenschweißen: Ablauf nach DVS 2207 |
| Anwendungsfall | `PP-R in {Umgebung}: {Anforderung}` | PP-R im Rechenzentrum: Kühlung ohne Ausfall |

**Descriptionmuster Tier 7:** Die Antwort in einem Satz vorwegnehmen, dann die Tiefe
ankündigen. Wer die Antwort im Snippet sieht, klickt für die Herleitung — wer sie
nicht sieht, klickt gar nicht.

**Abgrenzung zu Tier 3/4:** Wissensartikel dürfen **kein** Produkt-Keyword als
Primärbegriff führen. „PP-R Winkel 45°" gehört der Produktseite; ein Artikel über
Richtungsänderungen führt „Druckverlust im Bogen" — Frage statt Ware.

---

## 8 · Kannibalisierungs-Regeln, verbindlich

1. **Ein Primär-Keyword, eine Route.** Kein Begriff aus dieser Matrix darf auf zwei
   Routen als Primärbegriff stehen.
2. **Land nennt Zulassung, Stadt nennt Versorger.** Nie umgekehrt, nie beides auf
   derselben Ebene.
3. **Kategorie nennt die Auswahldimension, Produkt den Artikel.** Die Kategorieseite
   „PP-R Rohre" darf keine einzelne SDR-Stufe im Titel führen — das ist Produktrevier.
4. **Wissen fragt, Produkt liefert.** Artikel führen Fragen und Verfahren, nie
   Bauteilnamen als Primärbegriff.
5. **Werkzeugseiten führen den Nutzen, nicht das Sortiment.** „CO₂ berechnen", nicht
   „PP-R Rohre".
6. **Der Zeichenkorridor ist keine Empfehlung.** Unter 45 Zeichen bleibt Fläche
   ungenutzt; über 65 wird abgeschnitten.

---

## 9 · Was Sequenz 2 daraus umsetzt

| Stellschraube | Datei | Wirkung |
|---|---|---|
| `geo.hubMetaTitle` | `messages/{de,en,ar}.json` | 24 Seiten |
| `geo.cityMetaTitle` + Regulierer-Variable | `messages/*` + `maerkte/[hubSlug]/[citySlug]/page.tsx` | 28 Seiten |
| `products.narrative.intro` | `messages/*` | 74 Seiten |
| `seoArticle.*.seoTitle` | `messages/*` | 7 Seiten |
| Englische Resttitel | `productNames.*` in `messages/de.json` | 9 Seiten |
| Canonical-Konsolidierung aufheben | `produkte/[category]/[slug]/page.tsx` | 21 Seiten zurück in den Index |

**Zielgröße nach Sequenz 2:** Anteil der Titel unter 45 Zeichen von **61 % auf
unter 10 %**, keine Dublette, kein Titel über 65 Zeichen, kein englischer Rest im
deutschen Build.
