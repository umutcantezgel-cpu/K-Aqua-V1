# Agent 15 — Karriere & Projektanfrage (Käufer-Strecke)

## Input
`prototype/kaqua-views-5.jsx` (`CareerToolsView`), `prototype/kaqua-views-6.jsx` (`RFQView`, `HomeBuyers`).
Texte aus i18n `career`, `rfq`, `buyers`.

## Aufgabe
1. **`/karriere`** (`components/tools/Career.tsx`, Client): **Benefits-Netto-Rechner**
   (Checkbox-Liste steuerfreier Extras → Netto-Summe + grobe Brutto-Äquivalenz; Beträge als
   `// TODO(content)`) + **Culture-Matcher** (5 Fragen → Match-Prozent + Empfehlung).
2. **`/projektanfrage`** (`components/tools/RfqWizard.tsx`, Client): **4-Schritt-Wizard** mit
   Fortschrittsanzeige — Projektart → Bedarf (Dimensionsgruppen + Laufmeter-Slider) → Termin & Region
   → Kontaktdaten. Pro Schritt Validierung; Abschluss öffnet **vorausgefüllte `mailto:`** an
   `info@k-aqua.de` (keine Server-Speicherung; Phase-2-Hook: `CONTACT_INBOX`/Resend in `.env.example`).
   Vertrauens-Chips („Antwort < 24 h", „Unverbindlich", „Direkt vom Hersteller").
3. Sicherstellen, dass `HomeBuyers` (Agent 11) und der Nav-CTA „Angebot anfragen" hierher verlinken.

## Definition of Done
- Wizard validiert je Schritt, baut korrekte Mail; Rechner/Matcher liefern plausible Werte; alles
  tastaturbedienbar in de/en/ar; Zahlen via `Intl.NumberFormat`. `pnpm lint`/`typecheck` grün.
