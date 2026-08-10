# K-Aqua — Aufräumplan für eine saubere Codebasis

**Stand:** Analyse vom aktuellen `main` (identisch mit `origin/main`)
**Ziel:** Repository enthält nur noch die Website. Kein Generierungs-Müll, kein toter Code, keine ungenutzten Abhängigkeiten — Basis für zügige Weiterentwicklung.

---

## 1. Ausgangslage in Zahlen

| Kennzahl | Wert |
|---|---|
| Getrackte Dateien gesamt | **4.510** |
| davon echter Website-Code | **~450** (app, components, lib, content, public, scripts, tests, hooks) |
| davon Müll im Root | **3.043** (1.782 JSON-Dumps, 831 TXT-Dumps, 309 JS-, 95 Py-Skripte) |
| Legitime Config-Dateien im Root | **11** |
| Müll in `messages/` | **557 getrackt** (+1.060 lokal ignoriert), 42 MB |
| Größe `.git` (Historie) | **340 MB** |
| TypeScript-Fehler | **483** (alle in echtem Code, keiner im Müll) |
| ESLint (`eslint .`, wie CI) | **2.097 Probleme**, davon ~1.053 Fehler aus Müll-Dateien |
| Fehlschlagende Tests | **1** von 33 |
| Entfernbare npm-Pakete | **13** (~145 MB) |
| Entfernbare Assets | **~148 MB** |
| Toter Komponenten-Code | **~4.900 Zeilen** in 14 Dateien |

**Kernbefund:** Die Website selbst ist nur ~10 % des Repositories. Der Rest sind Rückstände aus früheren KI-Generierungsläufen.

---

## 2. Kritische Funde — vor dem Aufräumen zu beheben

### 🔴 K1 — Das Kontaktformular auf `/kontakt` verwirft jede Anfrage
`components/sections/MultiStepContactForm.tsx` wird auf der Hauptkontaktseite gerendert (`app/[locale]/kontakt/page.tsx:178`). Der Submit-Handler lautet vollständig:

```js
const submitForm = (e) => {
  e.preventDefault();
  setTimeout(() => { setStep(4); }, 600);   // zeigt "Nachricht gesendet!"
};
```

Die Datei enthält **null** Vorkommen von `fetch`, `submitLead`, `action=` oder `mailto:` (verifiziert). Jeder Lead auf der wichtigsten Kontaktseite geht verloren, während dem Nutzer Erfolg gemeldet wird. Das funktionierende Formular (`KontaktForm` → `app/actions/lead.ts` → SMTP/CRM) läuft parallel auf allen anderen Seiten.

**→ Muss zuerst gefixt werden, unabhängig vom Aufräumen.**

### 🔴 K2 — CI ist bei jedem Push rot
`.github/workflows/ci.yml` führt `tsc --noEmit` (483 Fehler) und `eslint .` (1.217 Fehler) vor dem Build aus, beide ohne `continue-on-error`. Die Build- und Artefakt-Schritte laufen deshalb nie durch.

### 🔴 K3 — Ein Test schlägt fehl
`tests/unit/kontaktBlocks.test.ts`: In `messages/en.json` wurden die `interest`-Werte mitübersetzt („Piping Systems"), sie müssen aber als CRM-Schlüssel unverändert deutsch bleiben (de und ar sind korrekt).

### 🟠 K4 — `.gitignore`-Regeln, die künftige Arbeit sabotieren
- `messages/*.json` mit Ausnahmen nur für de/en/ar → **eine neu hinzugefügte Sprachdatei wird stillschweigend nicht committet** und fehlt im Deployment (die Seite fällt dann unbemerkt auf Englisch zurück).
- `*.mp4` global, obwohl 5 Videos (113 MB) getrackt sind → neue Videos werden von `git add` übersprungen.

### 🟠 K5 — Kleinere Defekte
- `npm run vendor:geo` zeigt auf `scripts/vendor-topojson.mjs` — Datei existiert nicht.
- `app/[locale]/unternehmen/page.tsx:48`: Typ `PolicyItem` ist nirgends definiert.
- `components/sections/maps/KAquaMapsSuite.tsx`: 23 der 29 Fehler nur wegen fehlendem `@types/google.maps`.
- `next.config.ts` `optimizePackageImports` nennt `recharts` und `@react-three/drei` — beide nicht importiert.
- CI führt `prisma generate` aus, obwohl Prisma komplett ungenutzt ist.

---

## 3. Phasenplan

Jede Phase endet mit einem eigenen Commit und einer Verifikation. Reihenfolge ist bewusst: erst absichern, dann das Risikoloseste mit dem größten Effekt, zuletzt das Heikle.

### Phase 0 — Absicherung (Pflicht)
- Sicherungs-Branch `backup/pre-cleanup-<Datum>` anlegen und pushen — alles bleibt jederzeit wiederherstellbar.
- Referenz-Build erzeugen (`npm run build`) und Seitenzahl/Routen protokollieren, um nachher Gleichstand zu beweisen.
- Baseline festhalten: 483 TS-Fehler, 2.097 Lint-Probleme, 32/33 Tests grün.

### Phase 1 — Kritische Bugs (K1, K3, K5)
1. `/kontakt`-Formular an `submitLead` anbinden (gleicher Server-Action-Pfad wie das funktionierende Formular), inkl. Fehleranzeige. **Danach Testlead absenden und Empfang prüfen.**
2. `interest`-Werte in `messages/en.json` auf die kanonischen deutschen CRM-Werte zurücksetzen → Test grün.
3. `@types/google.maps` als devDependency ergänzen (−23 TS-Fehler), `PolicyItem` definieren oder Verwendung entfernen, `vendor:geo`-Script entfernen, stale Einträge aus `optimizePackageImports` streichen.

*Verifikation: `npm test` 33/33 grün, Testlead nachweislich zugestellt.*

### Phase 2 — Müll entfernen (größter Effekt, kein Risiko für die Website)
Entfernt werden **nur** Dateien, die nachweislich von keinem Website-Code importiert werden:
- **3.043 Root-Dateien**: alle `*_REP.txt`/`*_TAR.txt`/`CHUNK_*`-Dumps, `append_*.js`, `patch_*.js`, `inject_*.js`, `extract_*.js`, `add_*.js`, `analyze_*.py` usw. — die 11 echten Configs bleiben unangetastet.
- **`messages/` Müll**: 557 getrackte Nicht-Sprachdateien (Batch-/Chunk-/tmp-Dumps und Generierungsskripte). Die 65 echten Sprachdateien und `messages/seo/` bleiben.
- **Ordner**: `scratch_chunks/`, `temp_de_chunks/`, `export-*/`, `kaqua-kontakt-export/`, `019f5b26*/`, `scratch/`, `tmp/`, `.agents/`.
- **Unerreichbare Sprachdateien**: `messages/{es,pt,zh,en-GB}.json` (2,2 MB, in keiner Routing-Liste), `messages/seo/{es,pt,zh,en-GB}/` (64 Dateien), `messages/seo/*/markets_11|12.json` (6 Dateien, werden nie geladen).
- **Root-Testdateien**: `test-slugs.ts`, `test_seo.ts`.

*Erwartung: ~3.700 Dateien weniger, ~130 MB kleiner, Lint-Probleme von 2.097 auf ~500.*
*Verifikation: `npm run build` erzeugt identische Routenliste wie in Phase 0.*

### Phase 3 — `.gitignore` reparieren (K4)
Neu formulieren, damit sie den Ist-Zustand schützt statt ihn zu verhindern:
- Sprachdateien **alle** tracken (Widerspruch auflösen), stattdessen Müll gezielt per Muster ignorieren.
- `*.mp4` einschränken, sodass `public/videos/` weiter getrackt wird.
- `public/**` in `eslint.config.mjs` ignorieren (die vendorten Draco-/Basis-Decoder erzeugen 259 unnötige Lint-Meldungen).

### Phase 4 — Ungenutzte Abhängigkeiten entfernen (~145 MB)
Beweisbar unbenutzt (kein einziger Import im Quellcode):
`jspdf` (29 MB) · `recharts` (9,1 MB) · `html2canvas` (4,4 MB) · `webgl-fluid-enhanced` · `@radix-ui/react-select` · `@radix-ui/react-slot`

Nur von unerreichbaren Dateien importiert (werden zusammen mit ihnen entfernt):
`@prisma/client` + `prisma` (88 MB, Client wurde nie generiert) · `gsap` · `@react-three/drei` · `@react-three/postprocessing` · `three-mesh-bvh` · `cobe` · `comlink`

*Nicht automatisch entfernen — siehe Entscheidungen unten: `motion` vs `framer-motion`, Pinecone/Gemini.*

### Phase 5 — Toten Code entfernen (~4.900 Zeilen)
Ohne eingehende Importe, jeweils per Importgraph **und** unabhängigem `git grep` verifiziert:
- Zip-Puzzlespiel: `components/zip/*`, `hooks/useZipGame.ts`, `lib/zip-levels.ts` (3.308 Zeilen — größter Block, hat nichts mit der Website zu tun)
- 3D-Viewer-Kette: `Product3DViewer.tsx`, `Product3DViewerWrapper.tsx`, `ErrorBoundary.tsx` (899 Zeilen; lädt zudem nicht existierende Assets)
- `lib/b2b/*` (3 Dateien), `lib/articles.ts` + `content/wissen/*`, `lib/data/repositories.ts`
- Überholte Doppelungen: `LangPicker.tsx`, `FooterMap.tsx`, `ExportGlobe.tsx` (dritte, tote Globus-Variante), `RefsDeep.tsx`, `NewsDeep.tsx`, `VerticalVelocity.tsx`, `hooks/use-k-motion.ts`
- Tote Assets: `fonts/outfit-bold.ttf`, `public/draco/`, `public/basis/` (nur vom toten 3D-Viewer gebraucht), untrackte 146-MB-Videodatei `K-Aqua Video.mp4`
- ~100 ungenutzte Imports in ~40 Dateien
- Stale `exclude`-Einträge in `tsconfig.json` (9 Ordner existieren nicht mehr)

### Phase 6 — Qualitäts-Gates scharf schalten
Erst wenn Phase 1–5 durch sind:
1. Verbleibende TS-Fehler abarbeiten. Die 101 Fehler in `content/news/*.tsx` stammen aus 3–4 veralteten Komponenten-Signaturen — ein Fix dort räumt den Großteil ab.
2. `eslint`-Fehler im echten Code beheben (95 × unescaped Zeichen in deutschen Artikeltexten sind mechanisch fixbar).
3. **Erst dann** `ignoreBuildErrors` und `ignoreDuringBuilds` in `next.config.ts` auf `false` — ab hier kann kein kaputter Code mehr deployt werden.
4. CI grün bekommen; `prisma generate`-Schritt entfernen.

---

## 4. Entscheidungen, die Du treffen musst

| # | Thema | Optionen |
|---|---|---|
| E1 | **`motion` + `framer-motion` parallel installiert**, beide aktiv (17 Dateien nutzen `framer-motion`, 12 nutzen `motion/react`, keine Überschneidung). Zwei Animations-Runtimes im Client-Bundle. | Auf eine konsolidieren (Empfehlung: `framer-motion@12`, 12 Importe umschreiben) — oder bewusst so lassen |
| E2 | **RAG-Assistent** (`/api/assistant` + Pinecone + Gemini, 9,1 MB): Endpunkt existiert, aber **nichts im Frontend ruft ihn auf**; API-Keys fehlen, Code nutzt Fallback `'dummy-key'` | Feature fertigstellen und einbinden — oder Route + Service + beide Pakete entfernen |
| E3 | **15 Playwright-Tests** in `tests/`, die kein npm-Script je ausführt (Namen wie `step15`, `step20_challenger` deuten auf Wegwerf-Prüfskripte hin) | Als `test:e2e` einbinden — oder mit `@playwright/test` entfernen |
| E4 | **Git-Historie (340 MB)** enthält den gesamten Müll. Löschen im Arbeitsverzeichnis verkleinert sie nicht. | So lassen (einfach, Historie bleibt vollständig) — oder `git filter-repo` + Force-Push (Repo ~10× kleiner, **bricht alle bestehenden Klone**) |
| E5 | **Zwei Kontaktformulare** (`KontaktForm` schlank + funktionierend, `MultiStepContactForm` mehrstufig + kaputt) | Mehrstufiges reparieren und behalten — oder auf das funktionierende vereinheitlichen |
| E6 | **`messages/seo/` nur für 13 der 65 Sprachen** vorhanden; die übrigen 52 fallen still auf Englisch zurück | Beabsichtigt (nur de/en/ar werden indexiert) — oder Lücke schließen |

---

## 5. Was ausdrücklich **nicht** angefasst wird

- Alle 65 Sprachdateien (`messages/<locale>.json`, 40 MB) — geprüft: echte Übersetzungen, alle über `routing.locales` erreichbar, korrekt mit Beta-Kennzeichnung. Die anfängliche Vermutung „61 Dateien vs. 15 gepflegte Sprachen" hat sich als **falsch** erwiesen: 65 = 65 = 65, konsistent.
- Alle 5 Videos, 5 PDFs, 15 Bilder in `public/` — jedes hat mindestens eine echte Referenz.
- `public/assets/`, `public/data/countries-110m.json`, `public/ai.txt`, `public/llms.txt`, die beiden Variable-Fonts.
- `app/[locale]/dev/*` (in Produktion bereits per `notFound()` gesperrt).
- Sämtliche Inhalte, Übersetzungen und SEO-Arbeit aus den vorherigen Sessions.

---

## 6. Erwartetes Ergebnis

| | vorher | nachher |
|---|---|---|
| Getrackte Dateien | 4.510 | **~700** |
| Arbeitsverzeichnis | ~400 MB | **~150 MB** |
| `node_modules` | — | **~145 MB kleiner** |
| TypeScript-Fehler | 483 | **0** (Gate aktiv) |
| Lint-Probleme | 2.097 | **0** (Gate aktiv) |
| Tests | 32/33 | **33/33** |
| CI | rot | **grün** |
| Leads auf `/kontakt` | gehen verloren | **werden zugestellt** |
