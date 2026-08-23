'use client';

 
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

/**
 * Lädt die Videodatei erst, wenn sie in die Nähe des Sichtbereichs kommt.
 *
 * `/ressourcen/support` bindet zwei dieser Kacheln ein: socket-welding-hand.mp4
 * (10,2 MB) und factory.mp4 (28,4 MB). Beide standen mit `autoPlay` und ohne
 * `preload` im Markup — zusammen 38,6 MB, die der Browser beim Seitenaufbau zu
 * laden begann, während sie weit unterhalb des ersten Bildschirms lagen.
 *
 * Der Trick ist, `src` erst zu setzen, wenn der Beobachter anschlägt: Ein
 * `<video>` ohne `src` fordert nichts an, unabhängig von `preload`. 400 px
 * Vorlauf reichen, damit das Bild steht, bevor die Kachel den Sichtbereich
 * erreicht.
 */
function LazyVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Ohne IntersectionObserver (sehr alte Browser) sofort laden — lieber die
    // alte Last als eine leere Kachel.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      {...(visible ? { src } : {})}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export const PremiumAssetPlaceholder = ({
  className,
  label,
  image,
  video,
  poster,
}: {
  className?: string;
  label?: string;
  /** Path to a real image under public/ (e.g. /images/new-k-aqua/factory.jpg). When set, renders the image instead of the abstract placeholder. */
  image?: string;
  /** Path to a real video under public/ (e.g. /videos/factory.mp4). Takes priority over `image` if both are set. */
  video?: string;
  /** Standbild für das Video. Ohne Standbild bleibt die Kachel schwarz, bis das erste Bild steht. */
  poster?: string;
}) => {
  if (video) {
    return (
      <div className={cn(
        "w-full h-full min-h-[400px] rounded-3xl overflow-hidden relative group bg-black",
        className
      )}>
        <LazyVideo src={video} poster={poster} />
        {label && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="font-heading font-bold tracking-widest uppercase text-xs text-white/90">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (image) {
    return (
      <div className={cn(
        "w-full h-full min-h-[400px] rounded-3xl overflow-hidden relative group",
        className
      )}>
        <Image
          src={image}
          alt={label || ''}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {label && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="font-heading font-bold tracking-widest uppercase text-xs text-white/90">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full h-full min-h-[400px] flex flex-col items-center justify-center rounded-3xl overflow-hidden relative group",
      "bg-gradient-to-br from-card to-background border border-card-border/50",
      className
    )}>
      {/* Cinematic Lighting Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Geometric Wireframe or Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

      <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        </div>
        {label && (
          <span className="font-heading font-bold tracking-widest uppercase text-sm text-muted-foreground/80">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
