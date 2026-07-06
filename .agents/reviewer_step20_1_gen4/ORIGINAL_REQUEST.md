## 2026-06-14T15:10:37Z
You are reviewer_step20_1_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/reviewer_step20_1_gen4`.
Your task is to review the implementation of Step 20: Sitemap, Robots, OG, and Manifest.
Review the following:
1. Sitemap generator (`app/sitemap.ts`): verify dynamic/static configuration, 135 entries (17 static routes * 3, 28 markets * 3), trailing slash handling for homepages vs. subpages, and hreflang alternates formatting.
2. Robots configuration (`app/robots.ts`): check allowance, host name matching, and sitemap reference.
3. Web App Manifest (`app/manifest.ts`): check colors, metadata, and placeholder icons.
4. Dynamic OG images (`app/[locale]/opengraph-image.tsx` and `app/[locale]/maerkte/[slug]/opengraph-image.tsx`): verify Edge runtime declaration, Satori compatibility (use of hex colors), dynamic font loading, and layout (droplet brand icon and page title).
5. Build compile, type-safety, and lint: run the typecheck, lint, and build commands to confirm.
Document your review findings and final verdict (PASS/FAIL) in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/reviewer_step20_1_gen4/handoff.md`.
Never write or edit source code. You are a reviewer.
