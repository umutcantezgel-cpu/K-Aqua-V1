/* eslint-disable react/jsx-no-literals */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/navigation/LanguageCarousel.tsx
// K-Aqua Language Switch Module — horizontales Swipe-Karussell (Mobile-Hybrid).
// Tap auf eine Karte → onPick(id): der Hub lässt den Globus zur Region
// fliegen und öffnet das Bestätigungspanel. Die pending/aktive Karte wird
// automatisch in die Mitte gescrollt (scrollTo, kein scrollIntoView).
'use client';

import { useEffect, useRef } from 'react';
import { LANGUAGES } from '@/lib/i18n/languages';
import { cssVars, fgCls, glass, mutedCls } from './lang-ui';

export interface LanguageCarouselProps {
  pendingId: string | null;
  activeId: string | null;
  dark: boolean;
  onPick(id: string): void;
  className?: string;
}

export function LanguageCarousel({
  pendingId, activeId, dark, onPick, className = '',
}: LanguageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  /* pending/aktive Karte mittig einscrollen */
  useEffect(() => {
    const id = pendingId ?? activeId;
    const track = trackRef.current;
    if (!id || !track || !track.offsetParent) return;
    const card = track.querySelector<HTMLElement>(`[data-lang="${id}"]`);
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.clientWidth / 2 + card.offsetWidth / 2,
      behavior: 'smooth',
    });
  }, [pendingId, activeId]);

  return (
    <div
      ref={trackRef}
      aria-label="Sprachen-Karussell"
      className={`relative z-20 flex gap-2 overflow-x-auto px-4 pb-4 pt-2
                  snap-x snap-proximity [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {LANGUAGES.map((l) => {
        const state = l.id === pendingId ? 'pending' : l.id === activeId ? 'active' : 'idle';
        return (
          <button
            key={l.id}
            type="button"
            data-lang={l.id}
            data-state={state}
            onClick={() => onPick(l.id)}
            ref={cssVars({ '--lc': dark ? l.bright : l.color })}
            className={`flex min-h-[60px] min-w-[148px] shrink-0 snap-center flex-col items-start gap-0.5
                        rounded-2xl px-3.5 py-2.5 text-left transition-[transform,box-shadow,border-color] duration-150
                        ${glass(dark)} ${fgCls(dark)}
                        data-[state=pending]:-translate-y-0.5 data-[state=pending]:border-(--lc)
                        data-[state=pending]:shadow-[0_0_0_1px_var(--lc),0_10px_24px_-10px_var(--lc)]
                        data-[state=active]:border-(--lc)/55`}
          >
            <span className="flex items-center gap-1.5">
              <span className="size-2 shrink-0 rounded-full bg-(--lc)"></span>
              <span dir={l.rtl ? 'rtl' : 'ltr'} className="text-[14.5px] font-semibold leading-tight">
                {l.nat}
              </span>
            </span>
            <span className={`text-[11px] ${mutedCls(dark)}`}>
              {l.de}
              {state === 'active' && (
                <span className="font-semibold text-(--lc)"> · aktiv</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
