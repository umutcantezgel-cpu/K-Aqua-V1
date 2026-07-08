# Agent 23 — Testing & CI

## Aufgabe
1. **Unit/Component** (Vitest + Testing Library): Button-Varianten/States, FilterChip `aria-pressed`,
   `haversineKm`/`nearestMarkets`, RFQ-Wizard-Validierung, CO₂-Rechenfunktion.
2. **i18n-Schema-Test**: `pnpm i18n:check` als CI-Gate (identische Schlüsselmengen) + Test, dass
   `routing.locales` ⊆ vollständig übersetzte Locales (Sprach-Reinheit, RULES §2).
3. **E2E** (Playwright, optional aber empfohlen): Sprachwechsel de↔ar (dir-Wechsel), Mega-Menü
   Tastatur, Geo-Hover→flyTo→Klick→Detailseite, Theme-Toggle ohne Flash.
4. **CI-Pipeline** (`.github/workflows/ci.yml`): `install → lint → typecheck → i18n:check → build → test`.
   Lint enthält den `jsx-no-literals`-Guard (RULES §1).

## Definition of Done
- `pnpm test` grün; CI-Workflow läuft durch; ein absichtlich hartkodierter String lässt Lint
  (und damit CI) rot werden — Beweis, dass der i18n-Guard greift.
