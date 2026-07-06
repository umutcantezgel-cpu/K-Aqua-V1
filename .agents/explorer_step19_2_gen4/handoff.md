# Handoff Report: Step 19 — SEO Metadata & JSON-LD Explorer

## 1. Observation
- **JSON-LD Schema Requirements**:
  In `agents/19_seo_metadata_jsonld.md` (lines 10-13), the rich result specifications are:
  > "Root: Organization (KWT GmbH, Marke K-Aqua, Auweg 3, 35647 Waldsolms-Brandoberndorf, +49 6085 9868-410, info@k-aqua.de, sameAs falls vorhanden).
  > Produkte: Product/ItemList. Geo-Seiten: Product + FAQPage (aus Regulatorik/Wasser-Q&A)."

- **Data Available on Geo-City Pages**:
  In `app/[locale]/maerkte/[slug]/page.tsx` (lines 82-88), the page resolves:
  > ```typescript
  >   const localizedData = {
  >     regulator: geoContentTrans[slug]?.regulator || market.regulator,
  >     water: geoContentTrans[slug]?.water || market.water,
  >     focus: geoContentTrans[slug]?.focus || market.focus,
  >     note: geoContentTrans[slug]?.note || market.note,
  >     focusHeading: geoContentTrans[slug]?.focusHeading || tGeo("typical", { city: market.city })
  >   };
  > ```

- **Data Available on Products Page**:
  In `app/[locale]/produkte/page.tsx` (lines 30), the page resolves:
  > ```typescript
  >   const range = t.raw("range") as RangeItem[];
  > ```

- **TypeScript baseline check**:
  Running `npx tsc --noEmit` in the project root succeeded with exit code 0.

## 2. Logic Chain
- **Custom Types**: Since `schema-dts` is not present in `package.json` dependencies, we define structural inline typescript types for Schema.org structures (`Organization`, `Product`, `ItemList`, `FAQPage`) to ensure `pnpm typecheck` compiles cleanly without installing additional dependencies.
- **Dynamic FAQPage Creation**: On geo-city pages, the FAQPage must answer questions about:
  1. Local water regulators (`localizedData.regulator`)
  2. Local water profile and material response (`localizedData.water`)
  3. Typical project applications (`localizedData.focus`)
  4. Logistics & delivery terms (`localizedData.note`)
  These questions must be translated per locale (`de`, `en`, `ar`) to avoid untranslated fallbacks.
- **Localized Catalog ItemList**: The products page lists four core system components. These should be exposed as an `ItemList` using translated titles and descriptions from the `products` namespace (`t.raw("range")`).
- **Global Organization JSON-LD**: The `Organization` schema should be defined in `lib/seo/metadata.ts` and rendered in the root layout (`app/[locale]/layout.tsx`) so it is indexed globally.

## 3. Caveats
- The canonical host name defaults to `https://k-aqua.de` if `process.env.NEXT_PUBLIC_SITE_URL` is not set.
- We assumed standard international schema formats for phone numbers and email.

## 4. Conclusion
We have created the full typescript blueprints for the JSON-LD component and the central SEO helpers. They should be written to the source tree in the implementation phase:
1. `components/seo/JsonLd.tsx` (using `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_2_gen4/proposed_JsonLd.tsx`)
2. `lib/seo/metadata.ts` (using `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_2_gen4/proposed_metadata.ts`)

### Integration Plan
- **Root Layout (`app/[locale]/layout.tsx`)**:
  ```tsx
  import JsonLd from '@/components/seo/JsonLd';
  import { getOrganizationJsonLd } from '@/lib/seo/metadata';
  
  // Inside LocaleLayout component:
  const orgSchema = await getOrganizationJsonLd(locale);
  // Render:
  <JsonLd schema={orgSchema} />
  ```
- **Products Page (`app/[locale]/produkte/page.tsx`)**:
  ```tsx
  import JsonLd from '@/components/seo/JsonLd';
  import { getProductCatalogJsonLd } from '@/lib/seo/metadata';
  
  // Inside ProduktePage component:
  const catalogSchema = await getProductCatalogJsonLd(locale);
  // Render:
  <JsonLd schema={catalogSchema} />
  ```
- **Geo-City Page (`app/[locale]/maerkte/[slug]/page.tsx`)**:
  ```tsx
  import JsonLd from '@/components/seo/JsonLd';
  import { getGeoCityJsonLd } from '@/lib/seo/metadata';
  
  // Inside GeoCityPage component:
  const geoSchemas = await getGeoCityJsonLd(locale, market, localizedData);
  // Render:
  <JsonLd schema={geoSchemas} />
  ```

## 5. Verification Method
- Execute `npx tsc --noEmit` to confirm typescript compilation.
- Inspect the SSR page outputs to verify that the structured JSON-LD scripts are embedded in the `<head>` or body.
