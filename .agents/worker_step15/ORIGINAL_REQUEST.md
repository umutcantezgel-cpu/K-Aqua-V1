## 2026-06-14T13:44:02Z

You are Step 15 Worker. Your task is to implement Step 15: Karriere & Projektanfrage (Käufer-Strecke) in the codebase `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step15`.

### Tasks:
1. **Implement `/karriere`**:
   - Create route `app/[locale]/karriere/page.tsx` as a React Server Component. Query translations using `getTranslations("career")` and pass needed data to `<Career />`.
   - Create client component `components/tools/Career.tsx` ('use client').
   - **Benefits-Netto-Rechner**:
     - Render checklist of tax-free extras (`K_BENEFITS`): Sachbezugskarte (50 €), Essenszuschuss (108 €), Internetpauschale (50 €), JobRad-Leasing (45 €), Kita-Zuschuss (100 €), Vermögenswirksame Leistungen (40 €).
     - Add `// TODO(content)` comment placeholders in the file where these benefit Euro values are declared.
     - Calculate Netto-Summe (sum of selected items) and Brutto-Äquivalenz (`Math.round(net / 0.55 / 10) * 10`).
     - Display all numbers formatted according to the locale.
     - Add CTA button linking to `mailto:andrea.nickel@k-aqua.de?subject=Bewerbung%20bei%20K-Aqua` and a phone link.
   - **Culture-Matcher**:
     - 5-question matcher (questions from translation array `career.cmQ`).
     - Calculate match percentage (`Math.round((score / 5) * 100)`).
     - Display match message based on percentage: `career.resHigh` (>=80), `career.resMid` (>=50), or `career.resLow` (<50), and a Retry button.
     - Ensure no points/badges graphical gamification is present.

2. **Implement `/projektanfrage`**:
   - Create route `app/[locale]/projektanfrage/page.tsx` as a React Server Component. Query translations using `getTranslations` for both namespaces `rfq` and `buyers`, and pass needed data to `<RfqWizard />`.
   - Create client component `components/tools/RfqWizard.tsx` ('use client').
   - **4-Schritt-Wizard**:
     - Render step progress indicator (`k-steps`).
     - Step 0 (Project Type): Button cards with icons (Factory, MapPin, Layers, Handshake) to select project type.
     - Step 1 (Bedarf): Checklist of SDR diameter groups (`d20 – d63`, `d75 – d160`, `d200 – d315`, `d355 – d630`) and slider input for meters (range 100 to 50000 m, step 100).
     - Step 2 (Termin & Region): Filter chips for timeline and region.
     - Step 3 (Kontakt): Input fields for Name, Company, Email, Phone, Message, and privacy disclaimer text.
     - Validation: validate each step (e.g. require type in step 0, >=1 dim group in step 1, timeline/region in step 2, name/company/valid email format in step 3) before enabling "Next" or "Send".
     - Form Submission: Clicking "Send" on Step 3 should compile a body of all inputs, open a mailto link `mailto:info@k-aqua.de?subject=${encodeURIComponent(t("mailSubject") + " — " + company)}&body=${encodeURIComponent(body)}` in a new tab, and transition the wizard to a "sent" success state.
     - Sent state: display a check icon, a phone button CTA for "+49 (0)60 85 / 9868-410", and a button linking back to home.
     - Vertrauens-Chips: render chips at the bottom of the card on the wizard.

3. **Verify/Refine Linkages**:
   - Ensure the Nav-CTA "Angebot anfragen" in `Header.tsx` and links in `HomeBuyers.tsx` correctly lead to `/projektanfrage`.

4. **Rules & Constraints**:
   - Spacing/alignment in RTL: use Tailwind classes like `text-start`, `ms-`, `pe-`, etc.
   - Zero hardcoded strings: all text must be obtained using translations. Any static characters or symbols (like `/`, `%`, `€`, `m`, colons, etc.) must be stored in variables outside JSX or constructed dynamically.
   - UI primitive reuse: use `Card`, `Button`, `SectionHead`, `Eyebrow`, `IconChip`, `Chip`, `Reveal` from `@/components/ui/...`.

5. **Verification Checks**:
   - Run compilation and code verification checks: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm i18n:check`. Ensure they all return exit code 0.
   - Document all changes and outputs in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step15/handoff.md`.
