# Agent 04 — Icons & Motion-Primitives

## Input
`prototype/kaqua-ui.jsx` (Objekt `Icons` + `Reveal`), `agents/RULES.md` (Motion-Abschnitt).

## Teil A — Icons
Der Prototyp nutzt inline **lucide-kompatible** SVGs. In Produktion: **`lucide-react`** direkt.
- Erstelle `components/ui/icon.tsx` mit einem schmalen Re-Export der genutzten Glyphen, damit Importe zentral bleiben:
  `Droplet, ArrowRight, ArrowUpRight, Download, Play, Leaf, Recycle, Shield, Layers, Thermometer,
   Globe, Award, Factory, Wrench, Phone, Mail, MapPin, Users, FileText, Sun, Moon, Menu, X, Check,
   Ruler, Flame, Handshake`.
- Default-Größe 20 (Buttons), 24 (Karten), 1.8–2 Stroke. In RTL: Pfeil-Glyphen mit `className="rtl-flip"`.
- **Coday-Variante (optional):** Wer strikt Phosphor-konform sein will, ersetzt das Modul durch
  `@phosphor-icons/react` (Mapping: Droplet→Drop, ArrowRight→ArrowRight, Factory→Factory, Wrench→Wrench,
  Users→Users, Award→Medal, Flame→Flame, Handshake→Handshake, …). **Eine** Bibliothek, nicht mischen.

## Teil B — Motion-Primitives (Framer Motion / `motion/react`)
- **`components/ui/Reveal.tsx`** (Client): `whileInView={{opacity:1, y:0}}`, `initial={{opacity:0, y:22}}`,
  `viewport={{ once: true, amount: 0.15 }}`, `transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay }}`.
  Bei `useReducedMotion()` → kein `y`, nur sofort sichtbar.
- **`components/ui/Stagger.tsx`** — Container, der Kindern gestaffelte `delay` gibt.
- Dünner Wrapper `components/ui/MotionConfig` mit globalem `transition`-Default, falls sinnvoll.

## Definition of Done
- `Reveal` blendet beim Scrollen ein; bei `prefers-reduced-motion` erscheint Inhalt sofort.
- Genau **eine** Icon-Bibliothek im Dependency-Tree. `pnpm typecheck` grün.
