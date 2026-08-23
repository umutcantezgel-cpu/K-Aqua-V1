'use client';

import React, { Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import type { Native3DCanvasProps } from './Native3DCanvas';

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
 * Der `mounted`-Riegel hält Server- und Erstclientdarstellung identisch (beide
 * zeigen den Platzhalter) und vermeidet damit eine Hydrations-Abweichung.
 * WebGL existiert serverseitig ohnehin nicht — der Viewer hat dort nie etwas
 * gerendert.
 */
const Native3DCanvasImpl = React.lazy(() => import('./Native3DCanvas'));

const DEFAULT_HEIGHT = 'h-[440px] sm:h-[520px] lg:h-[600px]';

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

export default function Native3DCanvasLazy(props: Native3DCanvasProps) {
  const { heightClass = DEFAULT_HEIGHT, className } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const placeholder = <ViewerPlaceholder heightClass={heightClass} className={className} />;

  if (!mounted) return placeholder;

  return <Suspense fallback={placeholder}>{<Native3DCanvasImpl {...props} />}</Suspense>;
}
