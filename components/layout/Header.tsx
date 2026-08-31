'use client';

import { useCallback, useEffect, useState } from 'react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { FluidLink } from '@/components/ui/FluidTransition';
import { useTranslations, useLocale } from 'next-intl';
import clsx from 'clsx';
import { Logo } from '@/components/ui/Logo';

import ThemeToggle from './ThemeToggle';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import MegaMenu from './MegaMenu';
import SearchModal from '@/components/search/SearchModal';
import { Globe, ArrowRight } from '@/components/ui/icon';
import { ChevronDown, Map, Compass, Box, Settings, HardHat, Search } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const shouldReduceMotion = useReducedMotion();

  // Listen for global Cmd+K / Ctrl+K / '/' hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const headerClass = clsx(
    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out h-(--header-h) flex items-center text-foreground",
    menuOpen
      ? "bg-background"
      : scrolled
        ? "bg-[var(--nav-glass)] backdrop-blur-[16px] saturate-[1.4] border-b border-[var(--nav-border)] shadow-sm"
        : "bg-transparent border-b border-transparent"
  );

  // Animated hamburger line props
  const lineBase = "block absolute left-1/2 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out";
  const topLine = menuOpen
    ? `${lineBase} -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-45`
    : `${lineBase} -translate-x-1/2 top-[calc(50%-5px)]`;
  const bottomLine = menuOpen
    ? `${lineBase} -translate-x-1/2 top-1/2 -translate-y-1/2 -rotate-45`
    : `${lineBase} -translate-x-1/2 top-[calc(50%+5px)]`;
  const midLine = menuOpen
    ? `${lineBase} -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-0 scale-x-0`
    : `${lineBase} -translate-x-1/2 top-1/2 -translate-y-1/2`;

  return (
    <>
      <header className={headerClass} style={{ zIndex: menuOpen ? 80 : 40 }}>
        <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <FluidLink
            href="/"
            className="inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-transform active:scale-[0.97] shrink-0"
            aria-label={t('mega.homeSr') || "K Aqua Homepage"}
          >
            <span className="sr-only">{t('mega.homeSr')}</span>
            <Logo height={44} />
          </FluidLink>

          {/* Desktop & Tablet Navigation (Dropdowns) - Visible on Tablets / Surface Pro / Notebooks (md and up) */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-1 lg:mx-3 xl:mx-4 gap-0.5 lg:gap-1 min-w-0">
            
            {/* Group 1: Produkte & Lösungen */}
            <div className="relative group focus-within:z-50">
              <FluidLink
                href="/produkte"
                aria-haspopup="true"
                className="px-2 lg:px-3 2xl:px-4 py-1.5 lg:py-2 text-[13px] lg:text-[14px] 2xl:text-[15px] font-heading font-medium rounded-full transition-all duration-200 text-muted-foreground hover:bg-background-subtle hover:text-foreground inline-flex items-center gap-1 group-hover:text-foreground group-hover:bg-background-subtle group-focus-within:text-foreground group-focus-within:bg-background-subtle whitespace-nowrap"
              >
                {t('products')}
                <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 opacity-50 group-hover:opacity-100 group-focus-within:opacity-100 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </FluidLink>
              <div className="absolute top-[calc(100%+4px)] start-0 w-[480px] opacity-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 bg-card/95 backdrop-blur-xl border border-card-border rounded-2xl shadow-lift p-4 flex gap-4 z-50 before:absolute before:-top-6 before:start-0 before:w-full before:h-6 before:content-['']">
                <div className="flex-1 flex flex-col gap-1 border-e border-card-border pe-4">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 px-2">{t('mega.pipeSystems')}</span>
                  <div className="group/item relative px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <FluidLink href="/produkte" className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors flex items-center justify-between before:absolute before:inset-0">
                      {t('mega.allProducts')} <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 ltr:-translate-x-2 rtl:translate-x-2 group-hover/item:translate-x-0 rtl-flip transition-all" />
                    </FluidLink>
                    <span className="text-xs text-muted-foreground mt-0.5 pointer-events-none">{t('mega.allProductsDesc')}</span>
                  </div>
                  <div className="group/item relative px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <FluidLink href="/loesungen" className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors flex items-center justify-between before:absolute before:inset-0">
                      {t('solutions')} <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 ltr:-translate-x-2 rtl:translate-x-2 group-hover/item:translate-x-0 rtl-flip transition-all" />
                    </FluidLink>
                    <span className="text-xs text-muted-foreground mt-0.5 pointer-events-none">{t('mega.solutionsDesc')}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 px-2">{t('mega.digitalTools')}</span>
                  <FluidLink href="/3d" className="group/item px-3 py-2 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors flex items-center gap-2"><Box className="w-4 h-4 text-accent" /> {t('mega.cadStudio')}</span>
                    <span className="text-xs text-muted-foreground mt-0.5" aria-hidden="true">{t('mega.cadModels')}</span>
                  </FluidLink>
                  <FluidLink href="/produkte/finder" className="group/item px-3 py-2 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors flex items-center gap-2"><Search className="w-4 h-4" /> {t('finder')}</span>
                    <span className="text-xs text-muted-foreground mt-0.5" aria-hidden="true">{t('mega.finderDesc')}</span>
                  </FluidLink>
                  <FluidLink href="/co2-rechner" className="group/item px-3 py-2 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors flex items-center gap-2"><Settings className="w-4 h-4" /> {t('co2')}</span>
                    <span className="text-xs text-muted-foreground mt-0.5" aria-hidden="true">{t('mega.co2Desc')}</span>
                  </FluidLink>
                </div>
              </div>
            </div>

            {/* Group 2: Wissen & Vertrauen */}
            <div className="relative group focus-within:z-50">
              <button
                type="button"
                aria-haspopup="true"
                className="px-2 lg:px-3 2xl:px-4 py-1.5 lg:py-2 text-[13px] lg:text-[14px] 2xl:text-[15px] font-heading font-medium rounded-full transition-all duration-200 text-muted-foreground hover:bg-background-subtle hover:text-foreground cursor-pointer inline-flex items-center gap-1 group-hover:text-foreground group-hover:bg-background-subtle group-focus-within:text-foreground group-focus-within:bg-background-subtle whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t('knowledge_trust')}
                <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 opacity-50 group-hover:opacity-100 group-focus-within:opacity-100 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[320px] opacity-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 bg-card/95 backdrop-blur-xl border border-card-border rounded-2xl shadow-lift p-3 flex flex-col gap-1 z-50 before:absolute before:-top-6 before:left-0 before:w-full before:h-6 before:content-['']">
                <FluidLink href="/academy" className="group/item p-3 rounded-xl hover:bg-background-subtle transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5"><HardHat className="w-4 h-4" /></div>
                  <div className="flex flex-col"><span className="text-sm font-semibold text-foreground">{t('academy')}</span><span className="text-xs text-muted-foreground" aria-hidden="true">{t('mega.academyDesc')}</span></div>
                </FluidLink>
                <FluidLink href="/trust-center" className="group/item p-3 rounded-xl hover:bg-background-subtle transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5"><Compass className="w-4 h-4" /></div>
                  <div className="flex flex-col"><span className="text-sm font-semibold text-foreground">{t('trust')}</span><span className="text-xs text-muted-foreground" aria-hidden="true">{t('mega.trustDesc')}</span></div>
                </FluidLink>
                <FluidLink href="/service" className="group/item p-3 rounded-xl hover:bg-background-subtle transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background border border-card-border flex items-center justify-center shrink-0 mt-0.5"><Settings className="w-4 h-4 text-muted-foreground" /></div>
                  <div className="flex flex-col"><span className="text-sm font-semibold text-foreground">{t('service')}</span><span className="text-xs text-muted-foreground" aria-hidden="true">{t('mega.serviceDesc')}</span></div>
                </FluidLink>
                <FluidLink href="/partnerschaft" className="group/item p-3 rounded-xl hover:bg-background-subtle transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background border border-card-border flex items-center justify-center shrink-0 mt-0.5"><Map className="w-4 h-4 text-muted-foreground" /></div>
                  <div className="flex flex-col"><span className="text-sm font-semibold text-foreground">{t('partners')}</span><span className="text-xs text-muted-foreground" aria-hidden="true">{t('mega.partnersDesc')}</span></div>
                </FluidLink>
              </div>
            </div>

            {/* Group 3: Unternehmen */}
            <div className="relative group">
              <FluidLink href="/unternehmen" className="px-2 lg:px-3 2xl:px-4 py-1.5 lg:py-2 text-[13px] lg:text-[14px] 2xl:text-[15px] font-heading font-medium rounded-full transition-all duration-200 text-muted-foreground hover:bg-background-subtle hover:text-foreground inline-flex items-center gap-1 group-hover:text-foreground group-hover:bg-background-subtle group-focus-within:text-foreground group-focus-within:bg-background-subtle whitespace-nowrap">
                {t('about')}
                <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 opacity-50 group-hover:opacity-100 group-focus-within:opacity-100 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </FluidLink>
              <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[480px] opacity-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 bg-card/95 backdrop-blur-xl border border-card-border rounded-2xl shadow-lift p-4 flex gap-4 z-50 before:absolute before:-top-6 before:left-0 before:w-full before:h-6 before:content-['']">
                <div className="flex-1 flex flex-col gap-1 border-r border-card-border pr-4">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 px-2">{t('mega.aboutGroup')}</span>
                  <FluidLink href="/unternehmen" className="group/item px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">{t('mega.company')}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{t('mega.companyDesc')}</span>
                  </FluidLink>
                  <FluidLink href="/karriere" className="group/item px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">{t('career')}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{t('mega.careerDesc')}</span>
                  </FluidLink>
                  <FluidLink href="/news" className="group/item px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">{t('mega.newsPress')}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{t('mega.newsDesc')}</span>
                  </FluidLink>
                  <FluidLink href="/sitemap" className="group/item px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">{t('mega.sitemap')}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{t('mega.sitemapDesc')}</span>
                  </FluidLink>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 px-2">{t('mega.globalFootprint')}</span>
                  <div className="group/item relative px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <FluidLink href="/maerkte" className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors before:absolute before:inset-0">
                      {t('mega.globalMarkets')}
                    </FluidLink>
                    <span className="text-xs text-muted-foreground mt-0.5 pointer-events-none">{t('mega.marketsDesc')}</span>
                  </div>
                  <div className="group/item relative px-3 py-2.5 rounded-xl hover:bg-primary-soft transition-colors flex flex-col">
                    <FluidLink href="/referenzen" className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors before:absolute before:inset-0">
                      {t('mega.refProjects')}
                    </FluidLink>
                    <span className="text-xs text-muted-foreground mt-0.5 pointer-events-none">{t('mega.refDesc')}</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Action bar (Search, Globe, Theme, CTA, Hamburger) */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              title={t('searchShortcut')}
              aria-label={t('searchShortcut')}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] px-3 rounded-lg border border-card-border bg-card text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] transition-all duration-fast cursor-pointer group"
            >
              <Search className="w-5 h-5 shrink-0 group-hover:text-primary transition-colors" />
            </button>

            {/* Language Switcher */}
            <Link
              href="/language"
              title={t('lang') || 'Language'}
              aria-label={t('lang') || 'Language'}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] px-3 gap-2 rounded-lg border border-card-border bg-card text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] transition-all duration-fast cursor-pointer"
            >
              <Globe className="w-5 h-5 shrink-0" />
              <span className="text-small font-bold tracking-wider uppercase font-body select-none hidden sm:inline">
                {locale.toUpperCase()}
              </span>
            </Link>

            {/* Theme toggle */}
            <div className="hidden sm:flex">
              <ThemeToggle />
            </div>
          
            <span className="hidden lg:inline-flex">
              <FluidLink
                href="/projektanfrage"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5 min-h-[44px] px-3.5 lg:px-5 text-[13px] lg:text-[15px] whitespace-nowrap"
              >
                {t('quote')}
              </FluidLink>
            </span>

            {/* Mobile Hamburger Menu Button (Only for < md) */}
            <button
              type="button"
              className="md:hidden relative flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.95] transition-all duration-fast cursor-pointer group border-card-border bg-card text-foreground hover:bg-background-subtle"
              aria-label={t('menu')}
              title={t('menu')}
              aria-expanded={menuOpen}
              aria-controls="mega-menu"
              onClick={toggleMenu}
            >
              <span className="relative w-5 h-5 shrink-0" aria-hidden="true">
                <span className={topLine} />
                <span className={midLine} />
                <span className={bottomLine} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal (Command Palette) */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="mega-menu"
            key="mega-menu-overlay"
            style={{ position: 'fixed', inset: 0, zIndex: 70, willChange: 'opacity' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <MegaMenu onClose={closeMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
