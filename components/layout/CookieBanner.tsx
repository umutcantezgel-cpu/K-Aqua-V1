'use client';

// Einwilligungsdialog.
//
// Die Website setzt keine Cookies und bindet keine Drittanbieter ein. Der Dialog
// bildet deshalb ab, was tatsächlich gespeichert wird, statt nach Kategorien zu
// fragen, die es nicht gibt. Kategorien ohne angemeldeten Dienst bleiben
// ausgeblendet — siehe lib/consent/gate.ts.

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Cookie, ShieldCheck, Sparkles, BarChart3, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Link } from '@/lib/i18n/navigation';
import {
  CONSENT_OPEN_EVENT,
  CONSENT_POLICY_VERSION,
  getActiveCategories,
  getConsentRecord,
  getServices,
  type ConsentCategory,
} from '@/lib/consent';
import { useConsent } from '@/lib/consent/useConsent';

/** Was tatsächlich im Browser abgelegt wird — speist das Verzeichnis im Dialog. */
const STORAGE_INVENTORY: { key: string; entry: string; category: ConsentCategory }[] = [
  { key: 'k-aqua-consent-v2', entry: 'consent', category: 'necessary' },
  { key: 'theme', entry: 'theme', category: 'comfort' },
  { key: 'kaqua-co2-*', entry: 'co2', category: 'comfort' },
  { key: 'kaqua_recent_searches', entry: 'search', category: 'comfort' },
];

const CATEGORY_ICON: Record<ConsentCategory, React.ComponentType<{ className?: string }>> = {
  necessary: ShieldCheck,
  comfort: Sparkles,
  analytics: BarChart3,
};

export function CookieBanner() {
  const t = useTranslations('cookieConsent');
  const locale = useLocale();
  const { decisions, decided, save, revoke } = useConsent();

  const [open, setOpen] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [draft, setDraft] = useState({ comfort: false, analytics: false });

  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  // Kategorien ohne angemeldeten Dienst werden nicht angezeigt. Nach etwas zu
  // fragen, das es nicht gibt, wäre irreführend.
  const activeCategories = useMemo(() => {
    const active = getActiveCategories();
    active.add('comfort'); // Komfortspeicher existiert immer
    return active;
  }, []);

  const services = useMemo(() => getServices(), []);

  // Erstbesuch: Dialog zeigen, sobald feststeht, dass keine gültige Entscheidung vorliegt.
  useEffect(() => {
    if (decided) return;
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, [decided]);

  // Aufruf aus Footer, Datenschutzseite oder jedem Element mit data-consent-open.
  useEffect(() => {
    const openHandler = () => {
      openerRef.current = (document.activeElement as HTMLElement) ?? null;
      setDraft({ comfort: decisions.comfort, analytics: decisions.analytics });
      setDetailed(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, openHandler);

    const clickHandler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest?.('[data-consent-open]');
      if (target) {
        event.preventDefault();
        event.stopPropagation();
        openerRef.current = target as HTMLElement;
        openHandler();
      }
    };
    // Capture-Phase: Next's Link fängt den Klick sonst zuerst ab und navigiert,
    // bevor preventDefault greift. Ohne JavaScript bleibt der Eintrag ein
    // gewöhnlicher Link auf die Datenschutzerklärung.
    document.addEventListener('click', clickHandler, true);

    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, openHandler);
      document.removeEventListener('click', clickHandler, true);
    };
  }, [decisions]);

  const close = useCallback(() => {
    setOpen(false);
    setDetailed(false);
    setShowInventory(false);
    openerRef.current?.focus?.();
  }, []);

  // Escape schließt, Tab bleibt im Dialog. Ohne Fokus-Fang bindet ein modaler
  // Überlagerer nur sehende Nutzer.
  useEffect(() => {
    if (!open) return;
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && decided) {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !node) return;
      const focusable = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, decided, close, detailed]);

  const decide = (next: { comfort: boolean; analytics: boolean }) => {
    save(next, detailed ? 'settings' : 'banner');
    close();
  };

  const record = getConsentRecord();
  const decidedOn = record
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(record.ts))
    : null;

  const categoryList = (['necessary', 'comfort', 'analytics'] as ConsentCategory[]).filter((c) =>
    activeCategories.has(c)
  );

  return (
    <AnimatePresence>
      {open && (
        <div
          data-nosnippet="true"
          className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/25 backdrop-blur-sm"
            onClick={decided ? close : undefined}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-card border border-card-border rounded-t-3xl sm:rounded-3xl shadow-2xl"
          >
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-11 h-11 rounded-2xl bg-primary-soft text-primary grid place-items-center">
                  <Cookie className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="flex-1 min-w-0">
                  <h2 id={titleId} className="font-heading font-extrabold text-xl text-foreground">
                    {t('title')}
                  </h2>
                  <p className="text-[13px] text-primary font-semibold mt-1">{t('noCookiesNote')}</p>
                </div>
                {decided && (
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t('a11y.closeLabel')}
                    className="shrink-0 w-9 h-9 grid place-items-center rounded-full hover:bg-background-subtle text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <p id={descId} className="text-[15px] text-muted-foreground leading-relaxed">
                {t('intro')}
              </p>

              {detailed && (
                <div className="flex flex-col gap-3">
                  {categoryList.map((category) => {
                    const Icon = CATEGORY_ICON[category];
                    const locked = category === 'necessary';
                    const checked = locked ? true : draft[category as 'comfort' | 'analytics'];
                    const empty = category === 'analytics' && services.length === 0;
                    return (
                      <div
                        key={category}
                        className="flex gap-4 items-start p-5 rounded-2xl bg-background-subtle/60 border border-card-border/60"
                      >
                        <span className="shrink-0 w-9 h-9 rounded-xl bg-card text-primary grid place-items-center border border-card-border/60">
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-heading font-bold text-[15px] text-foreground">
                              {t(`categories.${category}.title`)}
                            </h3>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={checked}
                              aria-label={`${t(`categories.${category}.title`)} — ${checked ? t('a11y.switchOn') : t('a11y.switchOff')}`}
                              disabled={locked}
                              onClick={() =>
                                !locked &&
                                setDraft((prev) => ({
                                  ...prev,
                                  [category]: !prev[category as 'comfort' | 'analytics'],
                                }))
                              }
                              className={clsx(
                                'shrink-0 w-12 h-7 rounded-full relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                checked ? 'bg-primary' : 'bg-card-border',
                                locked && 'opacity-60 cursor-not-allowed'
                              )}
                            >
                              <span
                                className={clsx(
                                  'absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all',
                                  checked ? 'start-6' : 'start-1'
                                )}
                              />
                            </button>
                          </div>
                          <p className="text-[13.5px] text-muted-foreground leading-relaxed mt-1.5">
                            {t(`categories.${category}.desc`)}
                          </p>
                          {empty && (
                            <p className="text-[13px] text-muted-foreground/80 italic mt-2">
                              {t('categories.analytics.emptyNote')}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setShowInventory((v) => !v)}
                    aria-expanded={showInventory}
                    className="self-start inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    <ChevronDown
                      className={clsx('w-4 h-4 transition-transform', showInventory && 'rotate-180')}
                      aria-hidden="true"
                    />
                    {t('inventory.toggle')}
                  </button>

                  {showInventory && (
                    <div className="rounded-2xl border border-card-border/60 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-[13px]">
                          <caption className="sr-only">{t('inventory.heading')}</caption>
                          <thead>
                            <tr className="bg-background-subtle/80 text-muted-foreground">
                              <th scope="col" className="text-start font-semibold px-4 py-2.5">{t('inventory.colName')}</th>
                              <th scope="col" className="text-start font-semibold px-4 py-2.5">{t('inventory.colPurpose')}</th>
                              <th scope="col" className="text-start font-semibold px-4 py-2.5">{t('inventory.colRetention')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {STORAGE_INVENTORY.map((item) => (
                              <tr key={item.key} className="border-t border-card-border/50">
                                <td className="px-4 py-2.5 text-foreground font-medium">
                                  {t(`entries.${item.entry}.name`)}
                                  <span className="block text-[11.5px] text-muted-foreground font-mono mt-0.5">{item.key}</span>
                                </td>
                                <td className="px-4 py-2.5 text-muted-foreground">{t(`entries.${item.entry}.purpose`)}</td>
                                <td className="px-4 py-2.5 text-muted-foreground">{t(`entries.${item.entry}.retention`)}</td>
                              </tr>
                            ))}
                            {services.map((service) => (
                              <tr key={service.id} className="border-t border-card-border/50">
                                <td className="px-4 py-2.5 text-foreground font-medium">
                                  {service.name}
                                  <span className="block text-[11.5px] text-muted-foreground mt-0.5">{service.provider}</span>
                                </td>
                                <td className="px-4 py-2.5 text-muted-foreground">{service.purpose}</td>
                                <td className="px-4 py-2.5 text-muted-foreground">{service.retention}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[12.5px] text-muted-foreground leading-relaxed px-4 py-3 bg-background-subtle/40 border-t border-card-border/50">
                        {t('inventory.note')}
                      </p>
                    </div>
                  )}

                  {decidedOn && (
                    <p className="text-[12.5px] text-muted-foreground">
                      {t('record.decidedOn', { date: decidedOn })} ·{' '}
                      {t('record.policyVersion', { version: String(CONSENT_POLICY_VERSION) })}
                    </p>
                  )}
                </div>
              )}

              {/* Beide Entscheidungen gleich prominent: gleiche Größe, gleiches Gewicht,
                  gleiche Form. Eine hervorgehobene Zustimmung neben einer zurückhaltenden
                  Ablehnung gilt als Dark Pattern (EDSA-Leitlinien 03/2022). */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => decide({ comfort: false, analytics: false })}
                  className="flex-1 px-5 py-3.5 rounded-xl border border-card-border bg-card text-foreground text-[15px] font-semibold hover:bg-background-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t('btnNecessaryOnly')}
                </button>
                {detailed ? (
                  <button
                    type="button"
                    onClick={() => decide(draft)}
                    className="flex-1 px-5 py-3.5 rounded-xl border border-card-border bg-card text-foreground text-[15px] font-semibold hover:bg-background-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t('btnSaveSelection')}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setDraft({ comfort: decisions.comfort, analytics: decisions.analytics });
                      setDetailed(true);
                    }}
                    className="flex-1 px-5 py-3.5 rounded-xl border border-card-border bg-card text-foreground text-[15px] font-semibold hover:bg-background-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t('btnCustomize')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => decide({ comfort: true, analytics: true })}
                  className="flex-1 px-5 py-3.5 rounded-xl border border-card-border bg-card text-foreground text-[15px] font-semibold hover:bg-background-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t('btnAcceptAll')}
                </button>
              </div>

              {detailed && decided && (
                <button
                  type="button"
                  onClick={() => {
                    revoke();
                    setDraft({ comfort: false, analytics: false });
                  }}
                  className="self-start text-[13px] font-semibold text-muted-foreground hover:text-foreground underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {t('withdraw.button')}
                </button>
              )}

              <p className="text-[12.5px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/datenschutz" className="hover:text-foreground underline underline-offset-2">
                  {t('privacyLink')}
                </Link>
                <Link href="/impressum" className="hover:text-foreground underline underline-offset-2">
                  {t('imprintLink')}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
