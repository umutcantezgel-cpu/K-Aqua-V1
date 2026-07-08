# Agent 14 — Trust Center · KESSEL-Partnerschaft · Academy

## Input
`prototype/kaqua-views-4.jsx` (`TrustView`, `PartnerView`, `AcademyView`). Texte aus i18n
`trust`, `partner`, `academy`.

## Aufgabe
1. **`/trust-center`** (`components/tools/TrustCenter.tsx`, Client): Zertifikat-Karten
   (ISO 9001/14001/50001 — Nummern als `// TODO(content)`), GENAU-Akkordeon, **RFP-Paketbuilder**
   (Checkbox-Liste → „Dokumentenpaket zusammenstellen", öffnet vorausgefüllte Mail/Download-Hinweis).
2. **`/partnerschaft`** (`components/sections/Partner.tsx`): Zwiebelschalen-/Lagen-Diagramm als
   klickbares SVG (KESSEL ↔ K-Aqua, „Leading in drainage" unverändert), Material-Trust-Argumente.
3. **`/academy`** (`components/tools/Academy.tsx`, Client): Schweißvideo-Grid (4 Verfahren → YouTube),
   **5-Fragen-Quiz** mit korrekt/falsch-States + Ergebnis (Titel „Schweiß-Meister/-Geselle" — KEINE
   Punkte/Abzeichen-Gamification, die wurde bewusst entfernt).

## Regeln
- Gamification-Reste (Aqua-Punkte, Badges) NICHT wieder einführen. Quiz spricht von „Titel".
- Externe YouTube-Links erlaubt; keine Bild-Hotlinks; `MediaSlot` für Vorschauflächen.

## Definition of Done
- Akkordeon, Paketbuilder, SVG-Diagramm, Quiz funktionieren tastaturbedienbar in de/en/ar.
- `pnpm lint`/`typecheck` grün.
