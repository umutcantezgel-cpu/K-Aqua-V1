## 2026-06-14T14:45:47Z
You are explorer_step19_1_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_1_gen4`.
Your mission is to explore the codebase for Step 19: SEO Metadata & JSON-LD.
Specifically:
1. Find all active page files under `app/[locale]` (excluding `dev/`).
2. Examine `app/[locale]/layout.tsx` to see how root metadata and HTML tags are handled.
3. Check what keys exist in `messages/de.json`, `messages/en.json`, and `messages/ar.json` for page titles and descriptions. Identify if we need to add any new keys.
4. Design a helper utility `lib/seo/metadata.ts` that takes route configuration and returns a Next.js `Metadata` object with canonicals, hreflang alternates (for `de`, `en`, `ar` and `x-default` pointing to `de`), and openGraph/twitter details.
5. Report your findings and proposed implementation structure in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_1_gen4/handoff.md`.
Never write or edit source code files. You are a read-only explorer.
