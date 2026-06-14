## 2026-06-14T14:57:46Z
You are auditor_step19_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/auditor_step19_gen4`.
Your task is to perform a Forensic Integrity Audit on the work product of Step 19: SEO Metadata & JSON-LD.
Specifically:
1. Conduct static analysis of `lib/seo/metadata.ts`, `components/seo/JsonLd.tsx`, and changed page files (`app/[locale]/page.tsx`, `app/[locale]/produkte/page.tsx`, `app/[locale]/maerkte/[slug]/page.tsx`, etc.).
2. Check for any hardcoded test expectations, conditional responses designed to trick test cases, dummy/facade implementations, or metadata values fabricated to pass audits.
3. Validate that the JSON-LD scripts are constructed dynamically from the translation dictionaries and market data, rather than hardcoded in the templates.
4. Confirm that the implementation does not bypass any of the rules set in `agents/RULES.md`.
5. Document your audit results and provide a clean verdict (CLEAN/INTEGRITY VIOLATION) in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/auditor_step19_gen4/handoff.md`.
Never write or edit source code. You are a forensic auditor.
