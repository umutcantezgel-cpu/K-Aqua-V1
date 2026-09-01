'use client';

import React, { Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import type { Native3DCanvasProps } from './Native3DCanvas';
import { useRevealSafety } from '@/components/ui/Reveal';

/**
 * Lädt den 3D-Viewer erst, wenn er gebraucht wird.
 *
 * Warum: `Native3DCanvas` importiert three.js samt OrbitControls, GLTFExporter
 * und OBJExporter statisch. Über sechs Aufrufstellen landete das im Erstbundle
 * jeder betroffenen Seite — gemessen 403 kB First Load JS auf
 * `/produkte/[category]/[slug]` (74 Produkte × 3 Sprachen), 402 kB auf dem
 * Produktfinder, 409 kB auf den Ausschreibungstexten und 350 kB auf `/3d`,
 * gegenüber 104 kB geteiltem Grundbundle. Der Viewer liegt auf all diesen
 * Seiten unterhalb des ersten Bildschirms; er blockierte also den kritischen
 * Pfad, ohne sichtbar zu sein.
 *
 * Kein `next/dynamic` hier, sondern `React.lazy` mit Suspense: Der Platzhalter
 * muss die `heightClass` des jeweiligen Aufrufers übernehmen, und die
 * `loading`-Komponente von `next/dynamic` bekommt keine Props. Ein
 * Platzhalter mit fester Höhe würde bei abweichender `heightClass` genau den
 * Layoutsprung erzeugen, den er verhindern soll.
 *
 * Geladen wird erst, wenn der Platzhalter in die Nähe des Bildschirms kommt.
 * Bis dahin zeigen Server und Client dieselbe Box — eine Hydrations-Abweichung
 * kann also nicht entstehen. WebGL existiert serverseitig ohnehin nicht.
 */
/* Ein fehlgeschlagener Chunk-Load (typisch: die Seite lief noch mit dem
   alten Deploy, der Chunk-Hash existiert nicht mehr) wird EINMAL nach
   kurzer Pause erneut versucht, bevor der Fehler die Boundary erreicht —
   das heilt den Standardfall nach einem Vercel-Redeploy von selbst. */
const Native3DCanvasImpl = React.lazy(() =>
  import('./Native3DCanvas').catch(
    () => new Promise((r) => setTimeout(r, 1200)).then(() => import('./Native3DCanvas'))
  )
);

/* MUSS mit `heightClass` in Native3DCanvas.tsx uebereinstimmen — weicht der
   Platzhalter ab, entsteht beim Austausch genau der Sprung, den diese Datei
   verhindern soll. */
const DEFAULT_HEIGHT = 'h-[min(70dvh,560px)] sm:h-[min(85dvh,520px)] lg:h-[min(85dvh,600px)]';

/**
 * Übernimmt Rahmen, Radius und Höhe des echten Viewers, damit der Austausch
 * ohne Sprung geschieht — die Box steht von der ersten Zeichnung an in ihrer
 * endgültigen Größe.
 */
function ViewerPlaceholder({
  heightClass,
  className,
}: {
  heightClass: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-card/90 via-background to-card border border-card-border shadow-lift flex items-center justify-center',
        heightClass,
        className
      )}
      aria-hidden="true"
    >
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}

/* Eigene Boundary um den Viewer: ohne sie eskalierte ein ChunkLoadError
   bis zur Routen-Boundary und riss die ganze Produktseite mit. Der
   Fallback bleibt im Platzhalter-Look und bietet das einzig Sinnvolle
   an: neu laden. */
class ViewerBoundary extends React.Component<
  { heightClass: string; className?: string; children: React.ReactNode },
  { kaputt: boolean }
> {
  override state = { kaputt: false };
  static getDerivedStateFromError() {
    return { kaputt: true };
  }
  override render() {
    if (!this.state.kaputt) return this.props.children;
    return (
      <div
        className={clsx(
          'relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-card/90 via-background to-card border border-card-border shadow-lift flex flex-col items-center justify-center gap-3 text-center px-6',
          this.props.heightClass,
          this.props.className
        )}
      >
        <p className="text-sm text-muted-foreground">
          Die 3D-Ansicht konnte nicht geladen werden.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
        >
          Seite neu laden
        </button>
      </div>
    );
  }
}

export default function Native3DCanvasLazy(props: Native3DCanvasProps) {
  const { heightClass = DEFAULT_HEIGHT, className } = props;
  const [sichtbar, setSichtbar] = useState(false);
  const platzhalterRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * Der Chunk wird erst geholt, wenn der Viewer in die Naehe des Bildschirms
   * kommt — nicht schon beim Mounten.
   *
   * Vorher setzte hier ein `useEffect` nur `mounted` auf true, und der Import
   * lief unmittelbar danach los. Das verschob den Chunk um einen Tick, nicht
   * bis zum Sichtbarwerden: auf jeder Produktseite wurde three.js samt
   * 3D-Bibliothek geladen, obwohl der Viewer weit unterhalb des ersten
   * Bildschirms steht. Genau das sollte diese Datei verhindern.
   *
   * 400 px Vorlauf, damit das Modell steht, bevor es ins Bild kommt. Der
   * `mounted`-Riegel steckt mit drin: vor dem ersten Effekt ist `sichtbar`
   * false, Server- und Erstclientdarstellung bleiben also identisch.
   */
  useEffect(() => {
    const el = platzhalterRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSichtbar(true);
      return;
    }
    const io = new IntersectionObserver(
      (eintraege) => {
        if (eintraege.some((e) => e.isIntersecting)) {
          setSichtbar(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Sicherheitsnetz, geliehen von den Reveals: `useRevealSafety` prueft einmal
     je Seitenaufruf mit einem 1x1-Testelement, ob der IntersectionObserver
     ueberhaupt antwortet. Tut er es nicht, bliebe der Viewer sonst dauerhaft
     im Ladezustand stehen — dieselbe Fehlerklasse, die den Text auf den
     Produktseiten unsichtbar gemacht hat. Ein blosser Zeitgeber waere hier
     falsch: der wuerde auch dann laden, wenn der Beobachter einwandfrei
     arbeitet und der Nutzer nie bis zum Viewer scrollt. */
  const beobachterDefekt = useRevealSafety();
  const laden = sichtbar || beobachterDefekt;

  const placeholder = <ViewerPlaceholder heightClass={heightClass} className={className} />;

  if (!laden) {
    // Kein `display: contents` fuer den Wrapper: ein Element ohne eigene Box
    // liefert dem IntersectionObserver kein Rechteck und wuerde nie melden.
    return (
      <div ref={platzhalterRef} className="w-full">
        {placeholder}
      </div>
    );
  }

  return (
    <ViewerBoundary heightClass={heightClass} className={className}>
      <Suspense fallback={placeholder}>
        <Native3DCanvasImpl {...props} />
      </Suspense>
    </ViewerBoundary>
  );
}
