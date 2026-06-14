## 2026-06-14T14:48:07Z
You are worker_step19_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step19_gen4`.
Your task is to implement Step 19: SEO Metadata & JSON-LD.

### Instructions:
1. Create a helper utility in `lib/seo/metadata.ts` based on the explorers' proposals. It should define `constructMetadata` or `getMetadata` to consistently construct Next.js `Metadata` objects. It should:
   - Construct canonical URLs based on the current locale and route path.
   - Construct hreflang alternates for `de`, `en`, `ar` and a fallback `x-default` pointing to the German (`de`) version.
   - Format titles as `[Page Title] · K-Aqua` using the middle dot `·`.
   - Setup OpenGraph and Twitter tags, including a fallback image to `/images/og-default.jpg` or `/images/og-default.png`.
   - Include schema helpers: `getOrganizationJsonLd`, `getProductCatalogJsonLd`, and `getGeoCityJsonLd`. Refer to the proposed structures in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_2_gen4/proposed_metadata.ts`.
2. Create the `<JsonLd>` component in `components/seo/JsonLd.tsx` to embed JSON-LD script tags. Refer to `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_2_gen4/proposed_JsonLd.tsx`.
3. Integrate the metadata helper and `<JsonLd>` component into all 18 active routes under `app/[locale]/`:
   - `app/[locale]/page.tsx` (Home page): MUST be refactored from Client Component to Server Component. Remove `'use client'`, import `getTranslations` from `next-intl/server`, export `generateMetadata` and render `JsonLd` with `Organization` and `WebSite` schemas.
   - `app/[locale]/produkte/page.tsx` (Products Overview): Export `generateMetadata` (using title/description from `pages.products`) and render `JsonLd` with `ProductCatalog` schema.
   - `app/[locale]/maerkte/[slug]/page.tsx` (Geo City page): Replace custom metadata implementation with the new `constructMetadata` helper, and render `JsonLd` with `Product` + `FAQPage` schemas based on local variables.
   - For all other 15 subpages: Export `generateMetadata` using title/description from the `pages` namespace of translations (e.g. `pages.finder`, `pages.co2`, etc. or `imprint.title`/`eyebrow` for `/impressum`) and render `<JsonLd>` with `WebPage` schema.
   - Ensure you do NOT add new translations to translation JSON files if possible (we want to reuse existing keys to avoid i18n parity check failures. For `/` we can use `home.h1a` + `home.h1b` as title, and `home.lead` as description. For `/impressum` we can use `imprint.title` and `imprint.eyebrow`).
4. Ensure the root layout `app/[locale]/layout.tsx` imports and renders `<JsonLd>` with `Organization` schema globally.
5. Create a verification test file at `tests/seo.spec.ts` (use the template from explorer 3's handoff) and verify that all 18 routes load successfully, render title with `· K-Aqua`, canonical links, hreflang alternates, and correct JSON-LD script tags.
6. Verify your implementation by running:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm i18n:check`
   - `pnpm build`
   - Run playwright test for seo: `npx playwright test tests/seo.spec.ts`. If no config exists, you can run playwright using `npx playwright test tests/seo.spec.ts` (which works with default fallback config). If a dev server must be running, make sure to start it (or check if a test command is available).
7. Report all findings, build compilation outputs, and test verification results in your handoff report at `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step19_gen4/handoff.md`.
