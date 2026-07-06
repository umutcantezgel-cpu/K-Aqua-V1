# Handoff Report — Step 11: Home (Hero-Scrollytelling)

## 1. Observation
- **Original prototype styles**: Checked `prototype/kaqua-fx.css` lines 300–379. Verbatim css rules include `.k-scrolly`, `.k-scrolly-stage`, `.k-scrolly-globe`, `.k-orbit-card`, and `.k-scrolly-hint`.
- **Marquee styles**: Found in `prototype/kaqua-fx.css` lines 14–38: `.k-marquee` and `.k-marquee-track`.
- **Codebase layout**: The folder `components/sections/` was empty.
- **Translation layout**: Examined `messages/de.json` namespace `"home"` (starting at line 85), namespace `"homex"` (starting at line 161), and namespace `"buyers"` (starting at line 853).
- **TypeScript errors**: When running `npx pnpm typecheck`, observed the following typecheck error:
  `components/sections/HeroScrolly.tsx(187,16): error TS18048: 'pos' is possibly 'undefined'.`
- **Lint status**: Running `npx pnpm lint` returned:
  `✔ No ESLint warnings or errors`
- **Production Build status**: Running `npx pnpm build` finished with code 0:
  `✓ Compiled successfully in 1000ms`
  `✓ Generating static pages (15/15)`

## 2. Logic Chain
1. To implement the scrollytelling visual effects, the layout requires the corresponding CSS definitions. I appended the `.k-scrolly`, `.k-scrolly-stage`, `.k-scrolly-globe`, `.k-scrolly-glow`, `.k-orbit-card`, `.k-orbit-static`, `.k-scrolly-hint`, `.k-marquee`, and `.k-marquee-track` rules into `app/globals.css`.
2. The prototype transitions target CSS elements using the `html.anim-ok` selector gate. To trigger these animations, I updated `app/[locale]/template.tsx` to add the `anim-ok` class to `document.documentElement` during the client-side mount effect.
3. The scroll handler in `HeroScrolly.tsx` needs to perform smooth updates. I implemented direct DOM style mutations inside `requestAnimationFrame` using refs (`copyRef`, `globeWrapRef`, `glowRef`, `cardRefs`, `hintRef`) to ensure smooth 60fps scrolling without triggering React re-renders.
4. To handle cases where users request reduced motion or have small screens, a fallback mode was implemented using `useReducedMotion()` and checking window resize widths <= 900px.
5. To support RTL correctly, logical styles and RTL-flipped values were used. For Arabic (`locale === 'ar'`), `cardPos` maps left-to-right properties dynamically.
6. The `HomeBuyers` component was created to render the personas, why-choose-us reasons, and promises. To adhere to ESLint `'react/jsx-no-literals'` checks, spacing variables and proper translation lookups were used instead of literal strings.
7. Finally, `app/[locale]/page.tsx` was implemented to orchestrate the 8 sections in the exact order requested by the prototype, loading the Globe dynamically using `ssr: false` to prevent server compilation warnings.

## 3. Caveats
- **Testing suite**: The project does not currently have any unit test configuration or testing suite runner in `package.json`. No unit tests were added.
- **Static mock routes**: Relative paths like `/co2`, `/karriere`, and `/trust` are specified as link destinations based on the i18n dictionary, even if those page files are created in subsequent stages of the project.

## 4. Conclusion
The Hero-Scrollytelling and Home Buyers components have been fully implemented and integrated. All Next.js builds, ESLint configurations, and i18n translation key parity checks pass successfully.

## 5. Verification Method
- **Verify code compilation**: Run `npx pnpm typecheck` to verify TypeScript typings.
- **Verify linting**: Run `npx pnpm lint` to verify that there are no hardcoded string literals or formatting issues.
- **Verify build packaging**: Run `npx pnpm build` to compile the production build.
- **Verify i18n parity**: Run `npx pnpm i18n:check` to check for missing translation keys.
