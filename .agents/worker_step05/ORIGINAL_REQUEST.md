## 2026-06-14T12:40:13Z
Objective:
Execute the task defined in /Users/umurey/Downloads/kaqua-antigravity 2/agents/05_i18n_infrastructure.md.
Specifically:

1. Update `/Users/umurey/Downloads/kaqua-antigravity 2/lib/i18n/routing.ts` to configure next-intl routing:
   - Export routing using `defineRouting({ locales: ['de', 'en', 'ar'], defaultLocale: 'de', localePrefix: 'always' })`.
   - Comment out other languages (`fr`, `es`, etc.) with a reminder that they should only be enabled after 100% translation is complete (RULES §2).

2. Implement `/Users/umurey/Downloads/kaqua-antigravity 2/lib/i18n/request.ts` to export standard next-intl request config loading `messages/${locale}.json`.

3. Implement `/Users/umurey/Downloads/kaqua-antigravity 2/lib/i18n/navigation.ts` to export `{ Link, redirect, usePathname, useRouter } = createNavigation(routing)`.

4. Generate the translation files `messages/de.json`, `messages/en.json`, and `messages/ar.json`:
   - They must contain the complete key structures and dictionary translations.
   - Tip: To avoid manual typos, you can write a temporary node script in your folder or root to parse and extract the translations from `prototype/kaqua-i18n.jsx`, `prototype/kaqua-i18n-pages.jsx`, and `prototype/kaqua-i18n-pages-ar.jsx` (which contain the fully translated dictionaries for de, en, and ar), merge them into the required structure, and write them directly as JSON to the `messages/` folder.
   - Structure of the JSON should follow:
     - `nav`: { ... }
     - `groups`: { ... }
     - `pages`: { ... }
     - `home`: { ... }
     - `geo`: { ... }
     - `footer`: { ... }
     - Namespaces for other views as detailed in `docs/DATA_CONTRACTS.md` (e.g. `homex`, `products`, `solutions`, `service`, `about`, `news`, `career`, `contact`, `imprint`, `finder`, `co2`, `trust`, `partner`, `academy`, `refs`, `buyers`, `rfq`).
   - Double-check that there are no hardcoded string literals and all keys align perfectly.

5. Create `/Users/umurey/Downloads/kaqua-antigravity 2/components/layout/LangPicker.tsx` as a Client component:
   - Renders a language selector dropdown or button list displaying only `routing.locales` (Deutsch, English, العربية).
   - Switches the locale route-preservingly. Note that next-intl's custom `useRouter` and `usePathname` from `lib/i18n/navigation.ts` handle path locale switching automatically.
   - Sets the `NEXT_LOCALE` cookie to persist the user's choice.
   - Adheres to WCAG AA: min 44x44px touch target, hover/active scaling states, focus ring, and appropriate aria attributes.

6. Configure and test the validation script `scripts/check-locale-parity.mjs` and make sure it runs when calling `pnpm i18n:check`, outputting missing keys and exiting with code 1 if keys mismatch, or 0 if keys match.

Verify that `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm i18n:check` all pass with no warnings or errors.
Write a handoff report at `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step05/handoff.md`.
