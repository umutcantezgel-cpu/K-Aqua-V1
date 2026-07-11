/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Cookie, Check, Settings2, ShieldCheck, BarChart3, Target, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Link from 'next/link';

type ViewMode = 'banner' | 'preferences';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('banner');
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false,
  });

  const t = useTranslations('cookieConsent');

  useEffect(() => {
    try {
      const consent = localStorage.getItem('k-aqua-cookie-consent');
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors in strict privacy browsers
    }
  }, []);

  const saveConsent = (type: 'all' | 'none' | 'custom') => {
    try {
      if (type === 'all') {
        localStorage.setItem('k-aqua-cookie-consent', 'all');
        localStorage.setItem('cookie_essential', 'true');
        localStorage.setItem('cookie_analytics', 'true');
        localStorage.setItem('cookie_marketing', 'true');
      } else if (type === 'none') {
        localStorage.setItem('k-aqua-cookie-consent', 'none');
        localStorage.setItem('cookie_essential', 'true');
        localStorage.setItem('cookie_analytics', 'false');
        localStorage.setItem('cookie_marketing', 'false');
      } else {
        localStorage.setItem('k-aqua-cookie-consent', 'custom');
        localStorage.setItem('cookie_essential', 'true');
        localStorage.setItem('cookie_analytics', String(preferences.analytics));
        localStorage.setItem('cookie_marketing', String(preferences.marketing));
      }
    } catch {
      // Ignore localStorage errors
    }
    
    setIsVisible(false);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookiesUpdated'));
    }
  };

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-6 pointer-events-none">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-md pointer-events-auto"
            onClick={() => viewMode === 'preferences' ? setViewMode('banner') : null}
          />

          <motion.div
            layout
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.8 }}
            className={clsx(
              "bg-card/95 backdrop-blur-2xl sm:border border-card-border/60 shadow-2xl pointer-events-auto flex flex-col overflow-hidden relative z-10 w-full sm:rounded-3xl",
              viewMode === 'banner' ? "max-w-4xl" : "max-w-4xl h-[90vh] sm:h-auto sm:max-h-[85vh]"
            )}
          >
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[80px] pointer-events-none rounded-full" />

            {viewMode === 'banner' ? (
              <div className="p-6 md:p-10 flex flex-col gap-8 relative z-10">
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shrink-0 hidden sm:flex items-center justify-center border border-primary/10 shadow-inner">
                    <Cookie className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex flex-col gap-3 pt-1">
                    <h3 className="font-heading font-extrabold text-foreground text-2xl tracking-tight">
                      {t('title')}
                    </h3>
                    <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[65ch]">
                      {t('description')}
                    </p>
                    <div className="flex gap-4 mt-1">
                      <Link href="/datenschutz" className="text-sm font-medium text-primary hover:text-primary-strong flex items-center gap-1 group">
                        Datenschutzerklärung <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link href="/impressum" className="text-sm font-medium text-primary hover:text-primary-strong flex items-center gap-1 group">
                        Impressum <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-card-border/50">
                  <button
                    onClick={() => setViewMode('preferences')}
                    className="px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 bg-background-subtle hover:bg-card-border/50 text-foreground text-[15px] font-semibold transition-colors w-full sm:w-auto border border-transparent hover:border-card-border"
                  >
                    <Settings2 className="w-4 h-4" />
                    {t('customize')}
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => saveConsent('none')}
                    className="px-6 py-3.5 rounded-xl border border-card-border hover:bg-background-subtle text-foreground text-[15px] font-semibold transition-colors w-full sm:w-auto"
                  >
                    {t('declineAll')}
                  </button>
                  <button
                    onClick={() => saveConsent('all')}
                    className="px-8 py-3.5 rounded-xl bg-primary text-white hover:bg-primary-strong text-[15px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-lg shadow-primary/25"
                  >
                    {t('acceptAll')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full relative z-10">
                <div className="p-6 md:px-10 md:pt-10 md:pb-6 border-b border-card-border/50 flex items-center justify-between sticky top-0 bg-card/80 backdrop-blur-xl z-20">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => setViewMode('banner')}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background-subtle transition-colors"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div>
                      <h3 className="font-heading font-extrabold text-foreground text-xl">
                        {t('title')}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">Detaillierte Einstellungen</p>
                    </div>
                  </div>
                  <button
                    onClick={() => saveConsent('all')}
                    className="text-[13px] font-bold uppercase tracking-wider text-primary hover:text-primary-strong transition-colors bg-primary/10 px-4 py-2 rounded-full hidden sm:block"
                  >
                    Alle Akzeptieren
                  </button>
                </div>

                <div className="p-6 md:p-10 flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-1">
                  {/* Essential */}
                  <div className="flex flex-col sm:flex-row gap-5 items-start p-6 rounded-2xl bg-background-subtle/50 border border-card-border/50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
                    <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0 mt-1">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-lg text-foreground">{t('essentialTitle')}</h4>
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                          Immer Aktiv
                        </span>
                      </div>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{t('essentialDesc')}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">Session ID</span>
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">Consent State</span>
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">CSRF Token</span>
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div 
                    className={clsx(
                      "flex flex-col sm:flex-row gap-5 items-start p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden",
                      preferences.analytics ? "border-blue-500/30 bg-blue-500/5 shadow-[0_0_30px_-15px_rgba(59,130,246,0.3)]" : "border-card-border hover:border-foreground/20"
                    )}
                    onClick={() => togglePreference('analytics')}
                  >
                    <div className={clsx(
                      "p-3 rounded-xl shrink-0 mt-1 transition-colors",
                      preferences.analytics ? "bg-blue-500/20" : "bg-foreground/5"
                    )}>
                      <BarChart3 className={clsx("w-6 h-6 transition-colors", preferences.analytics ? "text-blue-500" : "text-muted-foreground")} />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-lg text-foreground">{t('analyticsTitle')}</h4>
                        <button
                          className={clsx(
                            "relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                            preferences.analytics ? "bg-blue-500" : "bg-card-border"
                          )}
                        >
                          <span
                            className={clsx(
                              "inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm",
                              preferences.analytics ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{t('analyticsDesc')}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">Google Analytics 4</span>
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">Matomo</span>
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">Vercel Web Vitals</span>
                      </div>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div 
                    className={clsx(
                      "flex flex-col sm:flex-row gap-5 items-start p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden",
                      preferences.marketing ? "border-purple-500/30 bg-purple-500/5 shadow-[0_0_30px_-15px_rgba(168,85,247,0.3)]" : "border-card-border hover:border-foreground/20"
                    )}
                    onClick={() => togglePreference('marketing')}
                  >
                    <div className={clsx(
                      "p-3 rounded-xl shrink-0 mt-1 transition-colors",
                      preferences.marketing ? "bg-purple-500/20" : "bg-foreground/5"
                    )}>
                      <Target className={clsx("w-6 h-6 transition-colors", preferences.marketing ? "text-purple-500" : "text-muted-foreground")} />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-lg text-foreground">{t('marketingTitle')}</h4>
                        <button
                          className={clsx(
                            "relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                            preferences.marketing ? "bg-purple-500" : "bg-card-border"
                          )}
                        >
                          <span
                            className={clsx(
                              "inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm",
                              preferences.marketing ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{t('marketingDesc')}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">Meta Pixel</span>
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">LinkedIn Insights</span>
                        <span className="text-[11px] font-medium px-2 py-1 bg-card rounded-md border border-card-border text-foreground/70">Google Ads</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:px-10 md:py-6 border-t border-card-border/50 bg-card/80 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-0 z-20">
                  <button
                    onClick={() => setViewMode('banner')}
                    className="text-sm text-muted-foreground hover:text-foreground font-semibold transition-colors flex items-center gap-1 group w-full sm:w-auto justify-center"
                  >
                    Zurück zur Übersicht
                  </button>
                  <button
                    onClick={() => saveConsent('custom')}
                    className="px-8 py-3.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-[15px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-lg flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {t('acceptSelected')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
