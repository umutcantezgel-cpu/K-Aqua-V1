# K-Aqua Integrations-Paket

Zerlegtes, integrationsfertiges Material für den Einbau des realen Produktkatalogs
(71 Artikelfamilien) und der 14 Deep-Content-Bereiche in die **bestehende, produktive**
Next.js-Codebasis `umutcantezgel-cpu/K-Aqua-V1` (live unter k-aqua-v1.vercel.app).
Kein neues Fundament — dieses Paket geht ausschließlich additiv in das echte Repo ein.

## Lesereihenfolge

1. **`00-FINDINGS.md`** — was real verifiziert wurde (Repo, Stack, Live-Abgleich,
   Zahlen-Korrekturen, Komponentenbrücke, offene Fragen). **Zuerst lesen.**
2. **`INTEGRATION-PIPELINE.md`** — die Einbau-Segmente I01–I06 mit Zieldateien im echten
   Repo, Akzeptanzkriterien, Rollback.
3. **`INTEGRATION-MEMORY.md`** — lebendes Protokoll; vor jedem Segment lesen, nach jedem
   Segment einen Eintrag ergänzen (Konvention aus `docs/AGENT_LOG.md` des echten Repos
   fortgeführt, nicht neu erfunden).

## Ordnerinhalt

```
data/catalog.ts                 71 reale Artikelfamilien, typisiert  → lib/data/catalog.ts
data/deep-content.ts             SDR-Geometrie + DVS-2207-11-Werte    → lib/data/deep.ts
data/repositories.additions.ts   Neue Funktionen für die bestehende   → in lib/data/repositories.ts mergen
                                 Repository-Schicht (nicht ersetzen)
messages/deep-fragments/*.json  15 Namespaces × 3 Sprachen, geprüfte  → in messages/{locale}.json mergen
                                 Schlüsselparität (0 Abweichungen)
components/ui/*.tsx             7 generische Anzeige-Primitives       → components/ui/
components/tools/CatalogBrowser.tsx  Katalog-Browser (Client)         → components/tools/
components/sections/*Deep.tsx   14 Deep-Content-Sections              → components/sections/
```

Jede Datei trägt einen Kopfkommentar: Quelle, was 1:1 portiert wurde, was bewusst
angepasst wurde (z. B. JS→TS, `usePageL`→`useTranslations`), was unverändert bleiben muss
(echte Artikeldaten). Nichts hier ersetzt bestehenden Code — alles ist additiv.
