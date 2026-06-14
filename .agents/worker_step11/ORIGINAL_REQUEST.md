## 2026-06-14T06:12:25-07:00
You are Step 11 Worker. Your task is to implement Step 11: Home (Hero-Scrollytelling) in the codebase `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step11`.

### Tasks:
1. **Copy Scrollytelling Styles**:
   - Inspect `prototype/kaqua-fx.css` lines 300–379. Append these CSS styles (with `.k-scrolly`, `.k-scrolly-stage`, `.k-scrolly-globe`, `.k-scrolly-glow`, `.k-orbit-card`, `.k-scrolly-hint`, etc.) cleanly into `app/globals.css` so they are fully integrated.
2. **Implement HeroScrolly Component in `components/sections/HeroScrolly.tsx`**:
   - Make it a Client Component ('use client').
   - Wrap the component in a scroll stage (`.k-scrolly` container with `380vh` height) and a sticky inner view (`.k-scrolly-stage` container with `100vh` height, absolute/sticky positioning).
   - Load the `Globe` component dynamically with `{ ssr: false }` from `@/components/globe/Globe`.
   - Setup a `staticMode` check: true if user prefers reduced motion (via `useReducedMotion()`) OR screen width is <= 900px.
     - **Static Mode (Fallback)**: Render a clean static layout: a two-column grid (hero copy on left, static 480px globe on right), followed by a grid of the 4 orbit cards (`.k-orbit-static` and `.k-orbit-card` styles).
     - **Scrollytelling Mode**:
       - Capture scroll events and calculate the scroll ratio `p` from `0` to `1` based on the stage wrapper's bounds relative to the viewport height (`-wrap.getBoundingClientRect().top / (wrap.offsetHeight - vh)`).
       - Throttling: use `requestAnimationFrame` to run update callbacks directly to target elements using React refs and inline styles. Do NOT trigger React state updates per frame to ensure smooth 60fps scrolling.
       - **Hero Copy Animation**: Fades out and translates upwards: `opacity = 1 - Math.min(1, p / 0.12)`, `translateY = -Math.min(1, p / 0.12) * 70 + 'px'`.
       - **Globe Travel Animation**: Moves along a circular path (from right column to center) and scales up from `0.92` to `1.42`:
         - Easing: `e = 1 - Math.pow(1 - Math.min(1, p / 0.42), 3)` (cubic ease-out).
         - Radius `R = x0 * (1 - e)` where `x0 = Math.min(window.innerWidth * 0.27, 560)`.
         - Angle `th = e * Math.PI * 1.12`.
         - Transform updates: `x = Math.cos(th) * R`, `y = Math.sin(th) * R * 0.55`, `scale = 0.92 + e * 0.5`.
         - Set inline style `transform` of globe wrapper directly: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`.
         - Set inline style `opacity` of `.k-scrolly-glow` directly: `0.25 + e * 0.75`.
       - **Focus Cards**: The 4 cards pop in sequentially (`opacity` and `transform` transition to default) when `p >= 0.45 + i * 0.125`. Toggle the `.is-in` class on card refs.
       - **Scroll Hint**: Fades in at bottom of stage when `p > 0.93`.
   - Import all copy and descriptions from local i18n dictionaries: `home` namespace.
   - Use `<MediaSlot>` where images are needed (none for the globe, but check if cards need them).
3. **Implement Home Buyers Section in `components/sections/HomeBuyers.tsx`**:
   - Read from the `buyers` namespace dictionary.
   - Persona cards (Planer, Einkauf, Installateure) linking to `/produkte`, `/projektanfrage`, and `/academy` respectively.
   - "Sechs Gründe" grid of features.
   - Vertrauens-chips (Werksdirekt, Antwort < 24 h, Unverbindlich) and CTA button starting `/projektanfrage`.
4. **Implement Main Page in `app/[locale]/page.tsx`**:
   - Arrange the sections in the exact order of the prototype:
     1. **HeroScrolly** (`components/sections/HeroScrolly.tsx`).
     2. **Marquee-Band**: infinite text loop based on `homex.marquee` key array.
     3. **4 Stat-Cards**: Bento grid showing 630mm, 5 SDR, 3x ISO, 100% recycling stats (reads from `homex.stats`). Use `<StatNumber>` and `<Card>` primitive components.
     4. **HomeBuyers** Sektion (`components/sections/HomeBuyers.tsx`).
     5. **Tools-Bento**: 6 cards linking to Product Finder, CO2-Rechner, Academy, Referenz-Globus, Trust Center, and Benefits-Rechner/Karriere (reads from `homex.tools`).
     6. **"Branche vs. K-Aqua"-Vergleich**: Two columns comparing standard vs digital (reads from `homex.vsBad` and `homex.vsGood`).
     7. **Unternehmens-Bento**: KESSEL partnership, world references, and quality cards (reads from `homex.coTitle1` etc.). Use `<MediaSlot>` for the images (like partnership logo/photo).
     8. **CTA-Band**: at the very bottom, inviting the user to start a request or download catalogs.
   - Load the Globe dynamically with `{ ssr: false }` to prevent SSR compile warnings.
   - Ensure all layouts support RTL logic (using logical properties `ms-`, `pe-`, `text-start`, etc.).
   - ABSOLUTELY NO HARDCODED STRINGS: ESLint `react/jsx-no-literals` is active. Every visible text MUST come from `useTranslations()`.
5. **Execution of build checks**:
   - Run compilation and code verification checks: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm i18n:check`. Ensure they all return exit code 0.
   - Write your detailed handoff report in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step11/handoff.md`.
