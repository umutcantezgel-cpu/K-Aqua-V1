## 2026-06-14T14:45:47Z
You are explorer_step19_2_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_2_gen4`.
Your mission is to explore the codebase for Step 19: SEO Metadata & JSON-LD.
Specifically:
1. Research how to structure JSON-LD in `components/seo/JsonLd.tsx`. It needs to support:
   - Root: Organization (KWT GmbH, K-Aqua, etc. see details in `agents/19_seo_metadata_jsonld.md`)
   - Product/ItemList for product pages.
   - FAQPage for geo-city pages (dynamic content based on local regulators/water parameters).
2. Check existing routes (e.g. `app/[locale]/maerkte/[slug]/page.tsx` and `app/[locale]/produkte/page.tsx`) to see what data is available at runtime that can be passed to JSON-LD.
3. Propose a full implementation draft of `components/seo/JsonLd.tsx` that compiles under TypeScript and avoids hardcoded strings by utilizing translations or properties passed from pages.
4. Report your findings and proposed implementation structure in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_2_gen4/handoff.md`.
Never write or edit source code files. You are a read-only explorer.
