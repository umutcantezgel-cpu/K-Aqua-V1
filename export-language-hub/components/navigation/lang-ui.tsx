// components/navigation/lang-ui.tsx
// K-Aqua Language Switch Module — geteilte UI-Bausteine & Klassen-Presets.
//
// Dynamische Werte (65 Sprach-Leitfarben, 60fps-Panel-Position) laufen über
// CSS-Custom-Properties bzw. imperative Transforms auf Refs — die von
// Tailwind dokumentierte Methode für Laufzeitwerte. Alle sichtbaren Styles
// bleiben Utility-Klassen (z. B. `bg-(--lc)`).
'use client';

import type { RefCallback } from 'react';

/** Ref-Callback, der CSS-Variablen auf ein Element setzt (statt style-Prop). */
export function cssVars<T extends HTMLElement>(vars: Record<string, string>): RefCallback<T> {
  return (el) => {
    if (!el) return;
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  };
}

/** Glassmorphism-Fläche im K-Aqua-Look */
export function glass(dark: boolean): string {
  return dark
    ? 'bg-[#12121a]/65 border border-white/10 shadow-[0_1px_2px_rgb(0_0_0/0.5),0_8px_24px_-8px_rgb(0_0_0/0.6)] backdrop-blur-xl backdrop-saturate-150'
    : 'bg-white/70 border border-black/10 shadow-[0_1px_2px_rgb(76_29_149/0.06),0_8px_24px_-8px_rgb(76_29_149/0.14)] backdrop-blur-xl backdrop-saturate-150';
}

export function fgCls(dark: boolean): string {
  return dark ? 'text-zinc-100' : 'text-zinc-900';
}
export function mutedCls(dark: boolean): string {
  return dark ? 'text-zinc-400' : 'text-zinc-500';
}
export function faintCls(dark: boolean): string {
  return dark ? 'text-zinc-500' : 'text-zinc-400';
}

/** Farb-Punkt einer Sprache (Leitfarbe via --lc) */
export function LangDot({ color, className = '' }: { color: string; className?: string }) {
  return (
    <span
      ref={cssVars({ '--lc': color })}
      className={`inline-block size-2.5 shrink-0 rounded-full bg-(--lc) ${className}`}
    ></span>
  );
}
