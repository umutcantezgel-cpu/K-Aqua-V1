## 2026-07-09T10:49:07Z
You are the Milestone 3 & 4 Worker. Your task is to implement the Advanced 3D WebGL Pipeline (R2) as defined in `/Users/umurey/Downloads/K-Aqua_V2_Vision_Docs/05_Advanced_3D_WebGL_Pipeline.md`.
Please perform the following steps:
1. Verify and install needed packages using pnpm: `three-mesh-bvh`, `@react-three/postprocessing`, `gsap`, `zustand` if not already present in package.json.
2. Copy the Draco decoder and Basis transcoder binaries from:
   - `node_modules/three/examples/jsm/libs/draco/gltf/` to `public/draco/`
   - `node_modules/three/examples/jsm/libs/basis/` to `public/basis/`
   You can write a simple node script or run terminal commands to perform this copy.
3. Update `components/product/Product3DViewer.tsx` to implement a world-class 3D experience. It must contain:
   - Configuration for loading Draco compressed `.glb` meshes and KTX2 textures using `useGLTF` and `KTX2Loader` mapped to the local decoders (`/draco/` and `/basis/` in `/public`). (Since no actual GLB files are present, make sure it gracefully falls back to high-poly procedural/custom geometry if loading fails, ensuring it is robust).
   - Custom WebGL 2.0 GLSL Vertex and Fragment shaders for dynamic water flow (using time uniforms, simplex noise/fBm, Fresnel refraction, environment reflection). Package these as custom R3F materials using `shaderMaterial`.
   - GPU Instancing for mass rendering: Implement an `InstancedMesh` system representing 10,000 flowing water bubbles/particles. Ensure zero garbage collection in `useFrame` by reusing object matrices and vectors (no `new THREE.Vector3()` inside `useFrame`).
   - Raycasting acceleration via `three-mesh-bvh` by computing bounds trees on load.
   - Cinematic camera control and exploded view animation using GSAP.
   - Post-Processing: Integrate `@react-three/postprocessing` with SSAO (Ambient Occlusion), Bloom (glow effects), and SMAA (Anti-aliasing).
   - Sync interactions (such as flow speed, active component selection, and water color) with a global Zustand store (`useProductCatalogStore`).
4. Ensure the type checks, linter, and tests pass:
   - Run `npm run typecheck`
   - Run `npm run lint`
   - Run `npm run test`
5. Compile your changes and verification logs in `/Users/umurey/Downloads/K-Aqua-V1-main/.agents/worker_m3_4/handoff.md`.
