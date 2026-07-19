# Next.js Integration

## Dateien
- `content/kontakt-bloecke.ts` — typisierte Content Map (Union-Typ der Slugs = Pflege wird vom Build erzwungen)
- `components/kontakt/KontaktBlock.tsx` — Server Component (Kontext, indexierbar)
- `components/kontakt/KontaktForm.tsx` — Client-Insel (Formular, Zustaende)
- `app/actions/lead.ts` — Server Action (Validierung, Honeypot, Zeitschwelle, CRM-Hook)

## Schritte
1. CSS: `kaqua-tokens.css` global importieren. Aus `kaqua-kontakt.js` den CSS-String (Konstante `CSS`) als `kontakt.css` extrahieren und ebenfalls global laden — die Klassen (`kqk-*`, `v-*`, `t-*`) sind identisch zur Referenz.
2. Ordner `nextjs/*` in den Workspace mappen (`@/content`, `@/components`, `@/app/actions`).
3. Root Layout: `<KontaktBlock slug={...} />` direkt vor dem Footer rendern. Slug kommt pro Route aus einem Route-Segment-Config oder einer Map Pfad→Slug. Damit existiert der Block ausnahmslos auf jeder Seite.
4. Pro bestehender Seite einen Eintrag in `kontakt-bloecke.ts` anlegen: einzigartiger Text, der das konkrete Problem der Seite aufgreift (Dimensionierung, Verlustrechnung, Modellpruefung, ...). Kein Keyword-Austausch-Template.
5. `lead.ts`: CRM-Webhook und Vertriebs-Benachrichtigung (tel: Link) anschliessen. Ziel Rueckruf in Minuten.
6. Zusatzformen (sticky, fab, modal, band, ...) aus der Referenz `kaqua-kontakt.js` nur dort einsetzen, wo die Seite es rechtfertigt — maximal eine Zusatzform pro Seite neben dem Block.

## Regeln
- Feste Blockhoehe reservieren (kein CLS).
- Formularbasis identisch lassen, nur Begleittext differenziert (Double-Content-Schutz).
- Kein Captcha, keine Pflichtfelder ausser Telefon + Email.
