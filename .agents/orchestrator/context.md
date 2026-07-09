# Context

## Project Details
- **Project Name:** K-Aqua V2 Enterprise Platform
- **Source Prototype:** Existing K-Aqua V1 codebase
- **Target Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4, next-intl, Framer Motion, React Three Fiber (R3F), `@react-three/drei`, Three.js, `three-mesh-bvh`, GSAP, Zustand.

## Core Requirements
1. **R1. Frontend Architecture Implementation:**
   - React Server Components (RSC) as the default.
   - Suspense boundaries & Streaming for progressive rendering.
   - 4-layer caching system (Request Memoization, Data Cache, Full Route Cache, Router Cache) and On-Demand Revalidation.
   - State management: URL-first state (`searchParams`) for shared/navigational state.
   - Hierarchical Error Handling (error.tsx, global-error.tsx) and Optimistic UI.
2. **R2. 3D WebGL Pipeline Implementation:**
   - Declarative 3D Scene Graph via React Three Fiber (R3F).
   - Draco compression for geometry and KTX2 / Basis Universal for textures.
   - Custom WebGL 2.0 GLSL Shaders (Vertex & Fragment) for water flow and refraction.
   - Bounding Volume Hierarchy (BVH) via `three-mesh-bvh` for sub-millisecond raycasting.
   - Camera Rig & GSAP animations for Cinematic transitions and Exploded Views.
   - Post-Processing: SSAO, Bloom, SMAA.

## Acceptance Criteria
- Running `npm run build` (or `pnpm build`) completes successfully with exit code 0.
- Zero React hydration errors or console errors on initial render of the homepage.
- Clean verification report from the Auditor Agent.
