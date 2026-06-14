## 2026-06-14T15:10:37Z
You are auditor_step20_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/auditor_step20_gen4`.
Your task is to perform a Forensic Integrity Audit on the work product of Step 20: Sitemap, Robots, OG, and Manifest.
Specifically:
1. Conduct static analysis of `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/[locale]/opengraph-image.tsx`, and `app/[locale]/maerkte/[slug]/opengraph-image.tsx`.
2. Check for any hardcoded test expectations, conditional responses designed to trick test cases, dummy/facade implementations, or fabricated entries in the sitemap or manifest.
3. Validate that sitemap entries are generated programmatically and mapped dynamically.
4. Check that the font loading replacement did not introduce any integrity issues or unauthorized external fetches.
5. Document your audit results and provide a clean verdict (CLEAN/INTEGRITY VIOLATION) in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/auditor_step20_gen4/handoff.md`.
Never write or edit source code. You are a forensic auditor.
