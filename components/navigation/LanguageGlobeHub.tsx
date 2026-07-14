/* eslint-disable react/jsx-no-literals */
// components/navigation/LanguageGlobeHub.tsx
// K-Aqua Language Switch Module — Hauptmodul ("Drop-In").
//
//   import { LanguageGlobeHub } from '@/components/navigation/LanguageGlobeHub';
//   <div className="h-dvh"><LanguageGlobeHub /></div>
//
// Verantwortlich für: State-Maschine (hover → pending → confirm), next-intl-
// Sprachwechsel via router.replace(pathname, { locale }), Desktop-Hover-
// Tooltip, Mobile-Hybrid (Karussell ↔ Globus-Sync), Suche, Toast.
// Der eigentliche 3D-Globus lebt in components/globe/LanguageGlobe.tsx.
'use client';

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import {
  LANGUAGES, LANGUAGES_BY_ID, type KAquaLanguage,
} from '@/lib/i18n/languages';
import {
  LanguageGlobe, type GlobeAnchor, type GlobeHandle,
} from '@/components/globe/LanguageGlobe';
import { LanguageConfirmPanel } from './LanguageConfirmPanel';
import { LanguageCarousel } from './LanguageCarousel';
import { LanguageSearch } from './LanguageSearch';
import { LangDot, faintCls, fgCls, glass, mutedCls } from './lang-ui';

export interface LanguageGlobeHubProps {
  /** Dark-Theme (an euer Theme-System anbinden) */
  dark?: boolean;
  /** Grundtönung der Regionen im Ruhezustand (0–0.35) */
  tint?: number;
  /** Glow-Intensität der aktiven Region (0–1) */
  glow?: number;
  autorotate?: boolean;
  /** Autorotation in Grad/Sekunde */
  speed?: number;
  /** Pfad zur TopoJSON-Datei in public/ */
  dataUrl?: string;
  className?: string;
}

export function LanguageGlobeHub({
  dark = false,
  tint = 0.1,
  glow = 0.55,
  autorotate = true,
  speed = 2,
  dataUrl = '/data/countries-110m.json',
  className = '',
}: LanguageGlobeHubProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  /* R3F-Canvas erst nach Mount rendern (kein SSR für WebGL) */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<KAquaLanguage | null>(null);

  const globeRef = useRef<GlobeHandle>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<GlobeAnchor>({ x: 0, y: 0, visible: false, ok: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Aktive Sprache aus der aktuellen next-intl-Locale ableiten */
  const active = useMemo(
    () => LANGUAGES.find((l) => l.locale === locale) ?? LANGUAGES[0]!,
    [locale],
  );

  const pending = pendingId ? LANGUAGES_BY_ID[pendingId] : null;

  /* Auswahl: fly = true bei Karussell/Suche (Globus dreht zur Region) */
  const select = useCallback((id: string, fly: boolean) => {
    setPendingId(id);
    setSearchOpen(false);
    if (fly) globeRef.current?.flyTo(id);
  }, []);

  const dismiss = useCallback(() => setPendingId(null), []);

  /* Bestätigen → Sprachwechsel für die gesamte Website via next-intl */
  const confirm = useCallback((lang: KAquaLanguage) => {
    setPendingId(null);
    setToast(lang);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
    router.replace(pathname, { locale: lang.locale });
  }, [router, pathname]);

  /* Hover-Tooltip imperativ (60fps, ohne Re-Render) */
  const onHover = useCallback((id: string | null, x: number, y: number) => {
    const tip = tipRef.current;
    if (!tip) return;
    if (id) {
      const l = LANGUAGES_BY_ID[id];
      if (l) {
        tip.dataset.on = '1';
        tip.style.transform = `translate(${Math.round(x + 16)}px, ${Math.round(y + 18)}px)`;
        tip.style.setProperty('--lc', dark ? l.bright : l.color);
        const de = tip.querySelector('[data-tip-de]');
        const nat = tip.querySelector('[data-tip-nat]');
        if (de) de.textContent = l.de;
        if (nat) nat.textContent = l.nat;
      }
    } else {
      delete tip.dataset.on;
    }
  }, [dark]);

  /* Escape schließt Panel + Suche */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setPendingId(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden
                  ${dark ? 'bg-[#0A0A0F]' : 'bg-[oklch(0.985_0.004_300)]'} ${fgCls(dark)} ${className}`}
    >
      {/* Hintergrund-Wash im K-Aqua-Look */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0
                    ${dark
                      ? 'bg-[radial-gradient(1100px_520px_at_78%_-10%,oklch(0.3_0.08_302/0.55),transparent_65%),radial-gradient(900px_480px_at_12%_110%,oklch(0.3_0.06_220/0.4),transparent_60%)]'
                      : 'bg-[radial-gradient(1100px_520px_at_78%_-10%,oklch(0.93_0.05_305/0.85),transparent_65%),radial-gradient(900px_480px_at_12%_110%,oklch(0.93_0.05_215/0.7),transparent_60%)]'}`}
      ></div>



      {/* Header Area — buttons + title */}
      <div className="relative z-20 px-4 pt-16 lg:pt-6 lg:px-6">
        {/* Action buttons row */}
        <div className="absolute top-4 right-4 flex items-center justify-end gap-2 lg:top-6 lg:right-6">
          <button
            type="button"
            title="Aktive Sprache anzeigen"
            onClick={() => globeRef.current?.flyTo(active.id)}
            className={`flex min-h-11 items-center gap-2 rounded-full px-4 transition
                        hover:-translate-y-px ${glass(dark)}`}
          >
            <LangDot color={dark ? active.bright : active.color}></LangDot>
            <span className={`text-[11px] font-semibold uppercase tracking-widest hidden lg:inline ${faintCls(dark)}`}>
              Aktiv
            </span>
            <span dir={active.rtl ? 'rtl' : 'ltr'} className="text-sm font-semibold">{active.nat}</span>
          </button>
          <button
            type="button"
            aria-label="Sprache suchen"
            onClick={() => setSearchOpen(true)}
            className={`flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-4
                        transition hover:-translate-y-px ${glass(dark)} ${mutedCls(dark)}`}
          >
            <Search className="size-4"></Search>
            <span className={`text-[11px] font-semibold uppercase tracking-widest hidden lg:inline ${faintCls(dark)}`}>
              Suchen
            </span>
          </button>
        </div>

        {/* Title */}
        <div className="pointer-events-none text-center w-full mt-2 lg:mt-0">
          <h2 className="text-[clamp(22px,3.4vw,44px)] font-bold leading-[1.1] tracking-tight">
            Wähle deine Sprache
          </h2>
          <p className={`mt-1 text-sm max-lg:text-[12px] ${mutedCls(dark)}`}>
            {LANGUAGES.length} Sprachen · Globus drehen, Region antippen, bestätigen.
          </p>
        </div>
      </div>

      {/* Globus */}
      <div ref={hostRef} className="relative z-10 min-h-0 flex-1">
        {mounted && (
          <LanguageGlobe
            ref={globeRef}
            dark={dark}
            tint={tint}
            glow={glow}
            autorotate={autorotate}
            speed={speed}
            dataUrl={dataUrl}
            pendingId={pendingId}
            activeId={active.id}
            anchorOut={anchorRef}
            onSelect={(id) => (id ? select(id, false) : dismiss())}
            onHover={onHover}
            onReady={() => setReady(true)}
            onError={() => setError(true)}
          ></LanguageGlobe>
        )}

        {(!ready || error) && (
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl px-6 py-4
                        text-center text-sm leading-relaxed ${glass(dark)} ${mutedCls(dark)}`}
          >
            {error
              ? <>Kartendaten konnten nicht geladen werden.<br></br>Liegt <code>countries-110m.json</code> in <code>public/data/</code>?</>
              : 'Weltkarte wird geladen …'}
          </div>
        )}

        {/* Bestätigungs-Panel */}
        <AnimatePresence>
          {pending && (
            <LanguageConfirmPanel
              key={pending.id}
              lang={pending}
              dark={dark}
              anchorRef={anchorRef}
              hostRef={hostRef}
              onConfirm={confirm}
              onDismiss={dismiss}
            ></LanguageConfirmPanel>
          )}
        </AnimatePresence>

        {/* Hover-Tooltip (Desktop) */}
        <div
          ref={tipRef}
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-40 flex items-stretch gap-2.5 rounded-[10px]
                      py-2 ps-2.5 pe-3 opacity-0 transition-opacity duration-150
                      data-[on=1]:opacity-100 max-lg:hidden ${glass(dark)}`}
        >
          <span className="w-[3px] rounded-sm bg-(--lc)"></span>
          <span className="flex flex-col">
            <span data-tip-de="" className="text-[13.5px] font-semibold leading-tight"></span>
            <span data-tip-nat="" className={`text-[11.5px] ${mutedCls(dark)}`}></span>
          </span>
        </div>

        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs tracking-wide max-lg:hidden ${faintCls(dark)}`}>
          Ziehen zum Drehen · Klicken zum Auswählen
        </div>

        {/* Suche (im Globus-Host geankert) */}
        <LanguageSearch
          open={searchOpen}
          dark={dark}
          activeId={active.id}
          onClose={() => setSearchOpen(false)}
          onPick={(id) => select(id, true)}
        ></LanguageSearch>
      </div>

      {/* Mobile-Hybrid: Swipe-Karussell */}
      <LanguageCarousel
        pendingId={pendingId}
        activeId={active.id}
        dark={dark}
        onPick={(id) => select(id, true)}
        className="lg:hidden"
      ></LanguageCarousel>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 14, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 8, x: '-50%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-32px)] items-center gap-2.5
                        whitespace-nowrap rounded-full px-4.5 py-3 text-[13.5px]
                        max-lg:bottom-[128px] max-lg:text-[12.5px] ${glass(dark)} ${fgCls(dark)}`}
          >
            <LangDot color={dark ? toast.bright : toast.color}></LangDot>
            <span>
              <strong className="font-semibold">{toast.de}</strong> ist jetzt für die gesamte Website aktiv.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageGlobeHub;
