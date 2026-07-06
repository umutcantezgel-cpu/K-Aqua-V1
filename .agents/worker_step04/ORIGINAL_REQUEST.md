## 2026-06-14T12:36:19Z

Execute the task defined in /Users/umurey/Downloads/kaqua-antigravity 2/agents/04_icons_and_motion_primitives.md.
Specifically:

1. Create `/Users/umurey/Downloads/kaqua-antigravity 2/components/ui/icon.tsx` which centralizes the used icons from the `lucide-react` package:
   - Expose the following icons: `Droplet, ArrowRight, ArrowUpRight, Download, Play, Leaf, Recycle, Shield, Layers, Thermometer, Globe, Award, Factory, Wrench, Phone, Mail, MapPin, Users, FileText, Sun, Moon, Menu, X, Check, Ruler, Flame, Handshake`.
   - Ensure these exported icons wrap the Lucide icons to set default props (e.g., `size={20}` for buttons or `size={24}` for cards, and `strokeWidth={2}`).
   - Arrow icons (`ArrowRight`, `ArrowUpRight`) must automatically receive the class `rtl-flip` or `rtl:-scale-x-100` to mirror their layout direction when the site is loaded in RTL.

2. Create `/Users/umurey/Downloads/kaqua-antigravity 2/components/ui/Reveal.tsx` as a Client component:
   - Uses the `motion` animation library (import from `'motion/react'` or `'motion'`).
   - Animates content when it scrolls into view:
     - `initial={{ opacity: 0, y: 22 }}`
     - `whileInView={{ opacity: 1, y: 0 }}`
     - `viewport={{ once: true, amount: 0.15 }}`
     - `transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}` where `delay` is passed as a prop (default 0).
   - Integrates `useReducedMotion` hook from the animation library. If reduced motion is preferred by the user, bypass the `y` vertical offset animation completely and only fade in or show immediately.

3. Create `/Users/umurey/Downloads/kaqua-antigravity 2/components/ui/Stagger.tsx` as a container component:
   - Staggers animation timing for its children. You can use a Framer Motion container element with `staggerChildren` or simple index mapping to increment child delays.

4. Verify that `pnpm build`, `pnpm typecheck`, `pnpm lint`, and `pnpm i18n:check` all pass with no warnings or errors.

Write a handoff report at `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step04/handoff.md`.
