## 2026-07-09T10:41:33Z
You are the Milestone 2 Worker. Your task is to implement the Frontend Architecture Migration (R1) as specified in "/Users/umurey/Downloads/K-Aqua_V2_Vision_Docs/02_Frontend_Architecture_Nextjs15.md".
Please perform the following steps:
1. Review the existing `/Users/umurey/Downloads/K-Aqua-V1-main` codebase, especially `/app` and components.
2. Refactor app layout and routing:
   - Ensure all layout and route pages use Next.js 15 RSC by default where possible.
   - Set up granular Suspense boundaries around client components and slow data fetching. E.g., check `ProductDetailPage` at `app/[locale]/produkte/[category]/[slug]/page.tsx` and ensure that the interactive product viewer or other slow-loading sections are wrapped in `<Suspense>` with skeleton fallbacks.
   - Refactor client components to use the 'Leaves of the Tree' pattern, keeping interactivity deep in the tree.
3. Caching & Data Fetching:
   - Configure data fetching calls with cache keys/tags (e.g. `tags: ['product-data']`) where applicable.
   - If there are Server Actions or API routes that mutate data, implement tag-based On-Demand Revalidation using `revalidateTag` or `revalidatePath`.
4. State Management:
   - Identify any client state (like active tabs, filters, sorting) that should be in the URL and refactor them to use `searchParams` via Next.js navigation hooks (`useSearchParams`, `usePathname`, `useRouter`).
5. Security & CSP:
   - Configure strict Content Security Policy (CSP) headers and cryptographic nonces in `middleware.ts` (refer to section 10.2 of `02_Frontend_Architecture_Nextjs15.md` for inspiration).
6. Verify your implementation by running the compiler/lint checks:
   - Run `npm run typecheck` or `pnpm typecheck` to check for type errors.
   - Run `npm run lint` or `pnpm lint` to check for lints.
   - Document your changes and verification commands/results in `/Users/umurey/Downloads/K-Aqua-V1-main/.agents/worker_m2/handoff.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please update your `progress.md` periodically as a heartbeat.
When complete, write your handoff report and send a message back to me (the orchestrator, conversation ID: 52f52575-716f-493f-8ae5-31771f432b25) with the path to your handoff report.
