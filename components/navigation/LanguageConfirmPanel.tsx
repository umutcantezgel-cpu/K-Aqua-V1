// components/navigation/LanguageConfirmPanel.tsx
// K-Aqua Language Switch Module — schwebendes Glassmorphism-Bestätigungspanel.
// Folgt dem Regions-Anker räumlich (rAF liest anchorRef, positioniert das
// Wrapper-Element imperativ — 60fps ohne React-Re-Render). Framer Motion
// animiert nur das innere Panel (Entrance/Exit), damit sich die Transforms
// nicht in die Quere kommen. Dreht die Region auf die Rückseite, dimmt das
// Panel und wird click-transparent.
'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { KAquaLanguage } from '@/lib/i18n/languages';
import { groupLabel } from '@/lib/i18n/languages';
import type { GlobeAnchor } from '@/components/globe/LanguageGlobe';
import { cssVars, faintCls, fgCls, glass, mutedCls } from './lang-ui';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export interface LanguageConfirmPanelProps {
  lang: KAquaLanguage;
  dark: boolean;
  anchorRef: React.MutableRefObject<GlobeAnchor>;
  /** Element, in dem das Panel geclampt wird (Globus-Host, position:relative) */
  hostRef: React.RefObject<HTMLElement | null>;
  onConfirm(lang: KAquaLanguage): void;
  onDismiss(): void;
}

export function LanguageConfirmPanel({
  lang, dark, anchorRef, hostRef, onConfirm, onDismiss,
}: LanguageConfirmPanelProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Spatial Tracking: Anker → Panel-Transform, geclampt in den Host */
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const el = wrapRef.current;
      const host = hostRef.current;
      const a = anchorRef.current;
      if (!el || !host || !a.ok) return;
      const hw = host.clientWidth;
      const hh = host.clientHeight;
      const w = el.offsetWidth || 256;
      const h = el.offsetHeight || 170;
      let side: 'r' | 'l' = 'r';
      let x = a.x + 30;
      if (x + w > hw - 10) { x = a.x - 30 - w; side = 'l'; }
      x = clamp(x, 8, Math.max(8, hw - w - 8));
      const y = clamp(a.y - h * 0.5, 10, Math.max(10, hh - h - 10));
      el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
      el.dataset.side = side;
      el.dataset.far = a.visible ? '' : '1';
      el.dataset.pos = '1';
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [anchorRef, hostRef, lang.id]);

  return (
    <div
      ref={wrapRef}
      className="invisible absolute left-0 top-0 z-30 w-64 max-lg:w-56 will-change-transform
                 transition-opacity duration-300
                 data-[pos=1]:visible data-[far=1]:pointer-events-none data-[far=1]:opacity-15
                 before:absolute before:top-1/2 before:h-px before:w-[22px] before:bg-current before:opacity-20
                 data-[side=r]:before:-left-[22px] data-[side=l]:before:-right-[22px]"
    >
      <motion.div
        key={lang.id}
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-label={`Sprache bestätigen: ${lang.de}`}
        className={`rounded-3xl p-4 ${glass(dark)} ${fgCls(dark)}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10.5px] font-semibold uppercase tracking-[0.12em] ${faintCls(dark)}`}>
            {groupLabel(lang.grp)}
          </span>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Abbrechen"
            className={`-m-1.5 grid size-7 place-items-center rounded-lg text-[13px] ${faintCls(dark)}
                        hover:bg-black/5 dark:hover:bg-white/10 ${dark ? 'hover:text-zinc-100' : 'hover:text-zinc-900'}`}
          >
            <X className="size-3.5"></X>
          </button>
        </div>

        <div
          ref={cssVars({ '--lc': lang.color })}
          dir={lang.rtl ? 'rtl' : 'ltr'}
          className="mt-1.5 border-l-[3px] border-(--lc) pl-3 font-semibold text-2xl leading-tight tracking-tight
                     [dir=rtl]:border-l-0 [dir=rtl]:border-r-[3px] [dir=rtl]:pl-0 [dir=rtl]:pr-3 [dir=rtl]:text-right"
        >
          {lang.nat}
        </div>
        {lang.de !== lang.nat && (
          <div className={`mt-0.5 text-[12.5px] ${mutedCls(dark)}`}>{lang.de}</div>
        )}

        <button
          type="button"
          onClick={() => onConfirm(lang)}
          ref={cssVars({ '--lc': lang.color })}
          className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-full
                     bg-linear-to-br from-[#5B2D8C] to-(--lc) font-semibold text-[15px] text-white
                     shadow-[0_8px_20px_-8px_var(--lc)]
                     transition-[transform,box-shadow,filter] duration-150
                     hover:-translate-y-px hover:brightness-108 hover:shadow-[0_12px_26px_-8px_var(--lc)]
                     active:translate-y-0"
        >
          <span dir={lang.rtl ? 'rtl' : 'ltr'}>{lang.ok}</span>
          {lang.ok !== 'Bestätigen' && (
            <span className="text-xs font-normal opacity-75">Bestätigen</span>
          )}
        </button>
        <div className={`mt-2 text-center text-[11px] ${faintCls(dark)}`}>
          Gilt für die gesamte Website
        </div>
      </motion.div>
    </div>
  );
}
