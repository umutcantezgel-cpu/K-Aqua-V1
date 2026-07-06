## 2026-06-14T13:30:35Z
You are Step 14 Worker. Your task is to implement Step 14: Trust Center · KESSEL-Partnerschaft · Academy in the codebase `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step14`.

### Tasks:
1. **Copy/Integrate CSS Styles**:
   - Read/inspect `prototype/kaqua-fx.css` lines 189–214.
   - Append/integrate these onion concentric ring styles cleanly to the end of `app/globals.css`. Ensure they are properly defined (use standard Tailwind 4 color theme variables if needed, or normal CSS variables).

2. **Implement `/trust-center`**:
   - Create route `app/[locale]/trust-center/page.tsx` as a React Server Component. Query translations using `getTranslations("trust")` and pass needed data to `<TrustCenter />`.
   - Create client component `components/tools/TrustCenter.tsx` ('use client').
   - Render 3 certificate cards (ISO 9001, ISO 14001, ISO 50001) using `<Card>`.
     - Include DAkkS-akkreditiert badge/chip.
     - Display validity dates (`10/2025 – 10/2028`) and download buttons linking to `https://www.k-aqua.de/PDF/KWT%20Zertifikat%20Deutsch.pdf`.
     - Add `// TODO(content)` comment placeholders in the file where certificate numbers (`Q-2025-6732`, `U-2025-6733`, `E-2025-6734`) are declared.
   - Implement the GENAU-Framework accordion/filter tab system:
     - 5 buttons ('G', 'E', 'N', 'A', 'U'). On click, display the corresponding title and description from the `trust.genau` translation key array.
   - Implement the RFP-Paketbuilder:
     - Checklist of documents using checkbox inputs (options from `trust.docs`).
     - Selected documents count badge (e.g. `picked.length / trust.docs.length`).
     - Button opening mailto: `mailto:support@k-aqua.de?subject=${encodeURIComponent(t("mailSubject"))}&body=${encodeURIComponent(t("mailBody") + '\n\n- ' + picked.join('\n- '))}`.
     - If docs are selected, button text should be `t("requestBtn")` + `picked.length ? " (" + picked.length + ")" : ""`.
     - Below, render the Scope-3 emissions disclaimer message (`trust.scope3`).

3. **Implement `/partnerschaft`**:
   - Create route `app/[locale]/partnerschaft/page.tsx` as a React Server Component. Query translations using `getTranslations("partner")` and pass needed data to `<Partner />`.
   - Create component `components/sections/Partner.tsx` ('use client' or server component depending on interaction - if interactive, it must be 'use client').
   - Render the concentric rings interactive onion layout (`.k-onion` container with concentric `.k-onion-ring` button rings absolute positioned using percentages, plus a center circle with a `<Droplet size={36} />` icon).
   - Selection of a ring updates the details shown inside an adjacent `<Card>` component: ring label, title, and description.
   - Render the Material Trust Arguments grid below using `partner.whyEyebrow`, `partner.whyTitle`, and `partner.cards`. Use `<Card>` and appropriate icons (Shield, Thermometer, Droplet).

4. **Implement `/academy`**:
   - Create route `app/[locale]/academy/page.tsx` as a React Server Component. Query translations using `getTranslations("academy")` and pass needed data to `<Academy />`.
   - Create client component `components/tools/Academy.tsx` ('use client').
   - Render 4 video cards linking to YouTube with play icon overlay inside a styled gradient preview container (use `<MediaSlot>` for preview placeholders if appropriate, or styled preview rectangles):
     - Muffenschweißen von Hand: `https://www.youtube.com/watch?v=d56p048YB2o&t=20s`
     - Muffenschweißen mit Maschine: `https://www.youtube.com/watch?v=yD99teROIKc&t=59s`
     - Elektroschweißen: `https://www.youtube.com/watch?v=ob2wMFZgm0k`
     - Stumpfschweißen: `https://www.youtube.com/watch?v=Ws7-whaL-q8&t=43s`
   - Implement the 5-Question Quiz:
     - Intro step with Start button.
     - Interactive question steps. Show progress bar (such as 5 segments, highlighted for current/past steps).
     - Options are rendered as button elements. Clicking an option provides instant correct/wrong feedback (e.g. green for correct, red for incorrect) and briefly transitions to the next question.
     - Result step showing final score, title ("Schweiß-Meister" if 5/5, "Schweiß-Geselle" if >=3/5, or intro hint if <3/5), and a Retry button.
     - NO GAMIFICATION: Ensure there are no points or graphical badges. Keep it to pure score and text.

5. **Rules & Constraints**:
   - Spacing/alignment in RTL: use Tailwind classes like `text-start`, `ms-`, `pe-`, etc.
   - Zero hardcoded strings: all text must be obtained using translations. Any static characters or symbols (like `/`, `:`, `-`, mailto parts, numbers) must be stored in variables outside JSX or constructed dynamically.
   - UI primitive reuse: use `Card`, `Button`, `SectionHead`, `Eyebrow`, `IconChip`, `Chip`, `MediaSlot`, `Reveal` from `@/components/ui/...`.

6. **Verification Checks**:
   - Run compilation and code verification checks: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm i18n:check`. Ensure they all return exit code 0.
   - Document all changes and outputs in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step14/handoff.md`.
