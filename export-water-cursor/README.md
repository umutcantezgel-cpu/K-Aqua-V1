# K-Aqua — Water Cursor (WebGL Custom Cursor)

Ersetzt den System-Mauszeiger durch einen soliden Punkt in Marken-Violett
mit einem elastischen Ribbon-Schweif: EIN glattes, flaches Band folgt der
Maus mit Feder-Physik, konstante Dicke, spitz zulaufende Enden, deckende
flache Farbe. Dazu Klick-Spritzer ("Stein im Teich") und magnetisches
Andocken an Buttons/Links.

Design direkt am React-Bits-`<Ribbons/>`-Background ausgerichtet
(Referenz-Konfiguration: 1 Farbe, baseSpring 0.03, baseFriction 0.9,
baseThickness 10, maxAge 500, pointCount 50, speedMultiplier 0.6,
enableFade false, enableShaderEffect false) — gleiche Update-Schleife
(Feder+Reibung am Kopf, Kettenpunkte lerpen mit maxAge-Timing nach) und
gleicher Längs-Taper. Rendering hier ohne ogl als Fullscreen-SDF-Shader
(Kapsel-Kette mit hartem min — kein Metaball-Verklumpen beim Anhalten).

Referenz und visuelle Abnahmegrundlage ist die Katalogseite
**„K-Aqua Water Cursor Studio.html"** im Design-Projekt (Tweaks-Panel für
Farbton, Banddicke, Nachzieh-Dauer, Spritzer-Intensität,
Magnet-Stärke, Hell/Dunkel).

## Warum kein React Three Fiber / Three.js / ogl

Bewusste Entscheidung, aus demselben Grund, aus dem `export-trade-globe`
bereits auf Canvas2D statt R3F setzt (siehe dessen README): **Farbklassen
von Three.js/ogl verstehen `oklch(...)`-Strings nicht** — `getComputedStyle`
liefert sie in modernen Browsern unverändert als `oklch(...)` zurück, was zu
verfälschten/grauen Farben führt, sobald man Marken-Tokens direkt einliest.

Dieses Modul braucht dafür keine 3D-Bibliothek: ein einzelner Fullscreen-
Fragment-Shader (WebGL2, ~70 Zeilen GLSL, `gl_VertexID`-Dreieck ohne
Vertex-Buffer) rendert Band (SDF über die Segmente) und
Spritzer-Streaks. Farben werden
separat über **Canvas2D-`fillStyle`** aus den echten CSS-Custom-Properties
gelesen (`WaterCursor.tsx` → `parseColor`) — das versteht
`oklch()`/`hsl()`/alles nativ, der Browser macht die Konvertierung selbst,
ganz ohne Farbbibliothek.

## Architektur

```
WaterCursor.tsx   Ein einziges, self-contained Client-Component-Modul:
                  Shader-Quellen (Band-SDF), Simulation (Ribbons-Physik,
                  50 Kettenpunkte, Partikel-Pool für Spritzer),
                  Pointer-/Magnet-/Klick-Logik, DOM (Canvas, Punkt) —
                  alles in einer Datei.
```

Kein zweites Engine-File, keine Zusatzpakete. Die Katalogseite im
Design-Projekt (`K-Aqua Water Cursor Studio.html` + `kaqua-water-cursor.js`)
verwendet denselben Algorithmus als eigenständige Vanilla-JS-Fassung — falls
sich beide Fassungen einmal weiterentwickeln, ist `WaterCursor.tsx` die für
die Live-Website maßgebliche.

## Einbau

```tsx
// app/[locale]/layout.tsx
import WaterCursor from '@/components/WaterCursor';

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <WaterCursor />
        {children}
      </body>
    </html>
  );
}
```

Einmal mounten, egal wo im Baum — die Komponente rendert nur ein
`pointer-events: none`-Overlay (Canvas + Punkt) und
verdrahtet ihre Listener global (`window`/`document`). Klicks auf echten
Seiteninhalt lösen den Spritzer-Burst zuverlässig aus, weil `pointerdown`
am `window` erfasst wird statt am (unklickbaren) Canvas selbst.

### Props

| Prop | Typ | Standard | Wirkung |
|---|---|---|---|
| `tint` | `'violet' \| 'aqua' \| 'mono'` | `'violet'` | Bandfarbe aus den Projekt-Tokens |
| `colors` | `string[]` (erster Eintrag zählt) | – | Überschreibt `tint` |
| `trailScale` | `number` | `1` | Banddicke (Basis ≙ Ribbons baseThickness 10) |
| `trailMs` | `number` | `500` | Ribbons maxAge: wie lang das Band nachzieht (ms) |
| `speed` | `number` | `0.6` | Ribbons speedMultiplier |
| `spring` | `number` | `0.03` | Ribbons baseSpring |
| `friction` | `number` | `0.9` | Ribbons baseFriction |
| `splashScale` | `number` | `1` | Intensität des Klick-Spritzers |
| `magnetStrength` | `number` (0–1) | `0.6` | Stärke des Magnet-Andockens |
| `magneticSelector` | `string` | `a, button, input, select, textarea, [role="button"], [data-cursor-magnetic]` | Hover-Ziele |
| `enabled` | `boolean` | `true` | Kompletter Schalter, z. B. routenabhängig |

Alle Props sind live reaktiv (kein Remount nötig) — bis auf `enabled`, das
den WebGL-Kontext bewusst komplett auf-/abbaut.

`magneticSelector` per Default bewusst generisch (kein `.k-btn` o. Ä.) — die
echte Codebase nutzt vermutlich eigene Komponentenklassen. Erweitern z. B.:

```tsx
<WaterCursor magneticSelector="a, button, [role='button'], .btn, .nav-link, [data-cursor-magnetic]" />
```

oder pragmatischer: `data-cursor-magnetic` als Attribut direkt an die
gewünschten Komponenten hängen.

### Farb-Tokens anpassen

`tint="violet"`/`"aqua"` liest mehrere Var-Namen der Reihe nach
(`--primary`, `--color-primary`, …), falls euer Tailwind-4 `@theme` die
Tokens anders benennt als der Prototyp. Im Zweifel: `colors` explizit
setzen, das ist immer eindeutig:

```tsx
<WaterCursor colors={['oklch(0.35 0.12 300)']} />
```

## Performance & Speicher

- Interne Canvas-Auflösung bewusst auf **80 % der CSS-Pixel** gedeckelt
  (unabhängig von `devicePixelRatio`) — weicher Pinsel-Look und deckelt die
  Pixel-Kosten auch auf Retina-/4K-Displays.
- Ein Draw-Call pro Frame (Fullscreen-Dreieck ohne Vertex-Buffer), feste
  Uniform-Arrays (50 Bandpunkte, 40 Spritzer-Partikel) — keine
  Texturen, keine Allokationen pro Frame. Partikel laufen über einen
  Ringpuffer fester Größe (kein Array-Push/GC-Druck bei schnellem Klicken).
- `requestAnimationFrame` pausiert bei `document.hidden`
  (`visibilitychange`), `dt` ist auf 48 ms gedeckelt (kein Sprung nach
  Tab-Wechsel).
- Cleanup (Unmount) entfernt alle Listener, hebt den WebGL-Kontext bewusst
  auf (`WEBGL_lose_context`) und entfernt die `kq-water-on`-Klasse — keine
  Leaks bei Routenwechseln in Next.js.
- Nächster Optimierungsschritt, falls auf sehr schwacher Hardware nötig:
  `gl.scissor` auf die Bounding-Box von Band + aktiven Partikeln statt
  Vollbild-Shading — aktuell bewusst weggelassen, um die Komplexität dieser
  Fassung gering zu halten; die 80-%-Auflösung allein hält die Kosten schon
  deutlich unter dem 60-fps-Budget.

## Deaktiviert sich automatisch

- Grober Zeiger / Touch (kein `(hover: hover) and (pointer: fine)`) —
  auf einem Custom-Cursor-Konzept ergibt Touch ohnehin keinen Sinn.
- `prefers-reduced-motion: reduce`.
- Fehlendes WebGL2 (sehr alte Browser / deaktivierte GPU).
- `enabled={false}`.

In all diesen Fällen bleibt die native Maus vollständig sichtbar und
funktional, es wird kein DOM erzeugt und keine GL-Ressource angefasst.

## Bekannte Einschränkungen

- `cursor: none` wird global auf `<html> *` gesetzt (Text-Inputs bleiben
  ausgenommen, siehe oben). Falls einzelne Bereiche (z. B. eingebettete
  Drittanbieter-Widgets, Canvas-Editoren) einen sichtbaren Zeiger brauchen,
  dort gezielt `cursor: auto !important` zurücksetzen.
- Kein Intro-/Onboarding-Hinweis auf den Effekt eingebaut — falls Nutzer:innen
  auf das versteckte System-Cursor-Verhalten hingewiesen werden sollen
  (Accessibility-Empfehlung), das separat lösen (z. B. kurzer Tooltip beim
  ersten Laden).

## Offene Punkte / bewusste Annahmen

- `magneticSelector` ist generisch gehalten (s. o.) — an die echten
  Komponentenklassen der Live-Codebase anpassen.
- Kein `nextjs-segment-NN/PROMPT.txt`-Handoff-Paket in dieser ersten Fassung
  (anders als z. B. `export-rundungen`) — bei Bedarf ergänzen, sobald der
  Ziel-Branch/-Zustand für dieses Segment feststeht.
