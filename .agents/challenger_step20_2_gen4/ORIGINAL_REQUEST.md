## 2026-06-14T15:10:37Z
You are challenger_step20_2_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/challenger_step20_2_gen4`.
Your task is to empirically challenge and verify the Sitemap, Robots, OG, and Manifest implementation (Step 20).
Specifically:
1. Review the tests in `tests/step20.spec.ts` and run them.
2. Write additional adversarial verification tests (e.g., fetch `/sitemap.xml` and verify it is valid XML and has exactly 135 loc elements, check `/robots.txt` headers, check `/manifest.webmanifest` content headers, verify that dynamic OG image URLs actually render dynamic images for multiple different locales and cities without falling back or returning 500 errors).
3. Verify that the entire Playwright test suite `npx playwright test` passes clean.
4. Report your test results and challenge outcome in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/challenger_step20_2_gen4/handoff.md`.
Never write or edit source code. You are a challenger.
