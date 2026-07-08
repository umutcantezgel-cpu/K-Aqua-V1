/* eslint-disable react/jsx-no-literals */

// components/navigation/LanguageSearch.tsx
// K-Aqua Language Switch Module — Sprachsuche als Glass-Overlay.
// Filtert nach deutschem Label und Eigennamen, gruppiert nach Kontinent.
// Pick → onPick(id): Globus fliegt zur Region, Panel öffnet sich.
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { LANGUAGES, LANGUAGE_GROUPS } from '@/lib/i18n/languages';
import { LangDot, faintCls, fgCls, glass, mutedCls } from './lang-ui';

export interface LanguageSearchProps {
  open: boolean;
  dark: boolean;
  activeId: string;
  onClose(): void;
  onPick(id: string): void;
}

export function LanguageSearch({ open, dark, activeId, onClose, onPick }: LanguageSearchProps) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (open) {
      setQ('');
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return LANGUAGE_GROUPS.map((g) => ({
      g,
      items: LANGUAGES.filter(
        (l) => l.grp === g.id &&
          (!needle || l.de.toLowerCase().includes(needle) || l.nat.toLowerCase().includes(needle)),
      ),
    })).filter((x) => x.items.length > 0);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 z-40 bg-black/25"
          onClick={onClose}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Sprache suchen"
            onClick={(e) => e.stopPropagation()}
            className={`absolute right-6 top-[74px] flex max-h-[min(560px,calc(100%-110px))]
                        w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl
                        max-lg:right-4 max-lg:top-[66px] ${glass(dark)} ${fgCls(dark)}`}
          >
            <div className={`flex items-center gap-2.5 border-b px-4 py-3
                             ${dark ? 'border-white/10' : 'border-black/10'} ${faintCls(dark)}`}>
              <Search className="size-4 shrink-0"></Search>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Sprache suchen …"
                className={`w-full bg-transparent text-[15px] font-medium outline-none
                            placeholder:opacity-60 ${fgCls(dark)}`}
              ></input>
              <button
                type="button"
                onClick={onClose}
                aria-label="Schließen"
                className={`grid size-7 shrink-0 place-items-center rounded-lg
                            hover:bg-black/5 dark:hover:bg-white/10 ${faintCls(dark)}`}
              >
                <X className="size-3.5"></X>
              </button>
            </div>

            <div className="overflow-y-auto p-2 pb-3">
              {groups.map(({ g, items }) => (
                <div key={g.id}>
                  <div className={`px-3 pb-1 pt-2.5 text-[10.5px] font-bold uppercase tracking-[0.12em] ${faintCls(dark)}`}>
                    {g.label}
                  </div>
                  {items.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => onPick(l.id)}
                      className={`flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-left
                                  ${dark ? 'hover:bg-white/8' : 'hover:bg-[#5B2D8C]/8'}`}
                    >
                      <LangDot color={dark ? l.bright : l.color}></LangDot>
                      <span className={`text-sm font-medium ${l.id === activeId ? 'text-[#a476d4]' : ''}`}>
                        {l.de}
                      </span>
                      <span dir={l.rtl ? 'rtl' : 'ltr'} className={`ml-auto text-[12.5px] ${mutedCls(dark)}`}>
                        {l.nat}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
              {groups.length === 0 && (
                <div className={`p-6 text-center text-[13.5px] ${mutedCls(dark)}`}>
                  Keine Sprache gefunden.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
