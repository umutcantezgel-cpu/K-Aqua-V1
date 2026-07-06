# Agent 09 — Page-Transitions

## Input
`prototype/kaqua-app.jsx` (`go()`/Wipe-Logik), `prototype/kaqua-fx.css` (`.k-wipe*`-Keyframes),
`agents/RULES.md` (Motion).

## Aufgabe
- **`app/[locale]/template.tsx`** (Client; `template` re-mountet bei jedem Routenwechsel):
  - Inhalts-Einblendung: `motion.div` mit `initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
    transition={{duration:0.42, ease:[0.16,1,0.3,1]}}`.
  - **Wipe-Overlay** via `AnimatePresence`: eine `--inverse-surface`-Fläche wischt von unten hoch
    (`ease-wipe` `cubic-bezier(0.76,0,0.24,1)`, ~820ms, runde Oberkante → gerade → raus oben),
    mittig blitzt das Tropfen-Icon auf. Umsetzung mit `motion`-Varianten, nicht mit CSS-Keyframes,
    damit es SSR-sicher ist.
  - `useReducedMotion()` → nur Fade, kein Wipe, keine Transform.
- Sicherstellen, dass das Overlay nach der Transition **vollständig entfernt** wird (kein hängendes
  `pointer-events`-blockierendes Element — im Prototyp ein gelöster Bug; hier sauber via `AnimatePresence onExitComplete`).

## Definition of Done
- Navigation zwischen zwei Routen zeigt den Wipe + Tropfen; danach ist kein Overlay mehr im DOM.
- Bei `prefers-reduced-motion` nur sanftes Fade; keine Layout-Shifts (CLS≈0).
