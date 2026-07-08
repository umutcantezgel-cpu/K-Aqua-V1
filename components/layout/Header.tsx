/* eslint-disable react/jsx-no-literals */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Logo } from '@/components/ui/Logo';

import ThemeToggle from './ThemeToggle';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';
import MegaMenu from './MegaMenu';
import { Globe } from '@/components/ui/icon';
import GlobeHub from '@/components/navigation/GlobeHub';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [globeHubOpen, setGlobeHubOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tPages = useTranslations('pages');
  const shouldReduceMotion = useReducedMotion();

  const getPageTitle = (id: string) => {
    try {
      const arr = tPages.raw(id);
      return Array.isArray(arr) ? arr[0] : id;
    } catch {
      return id;
    }
  };

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
    setGlobeHubOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen || globeHubOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [menuOpen, globeHubOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const isScrolledOrOpen = scrolled || menuOpen;

  const headerClass = clsx(
    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out h-[72px] flex items-center text-foreground",
    isScrolledOrOpen
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
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-transform active:scale-[0.97] shrink-0"
            aria-label={t('home')}
          >
            <Logo height={28} />
          </Link>

          {/* Desktop Navigation (Dropdowns) */}
          <nav className="hidden xl:flex items-center justify-center flex-1 mx-2 lg:mx-4 gap-1 min-w-0">
            
            {/* Group 1: Produkte & Tools */}
            <div className="relative group">
              <Link href="/produkte" className="px-3 2xl:px-4 py-2 text-[14px] 2xl:text-[15px] font-heading font-medium rounded-full transition-all duration-200 text-muted-foreground hover:bg-background-subtle hover:text-foreground inline-flex items-center gap-1 group-hover:text-foreground group-hover:bg-background-subtle">
                {getPageTitle('products')}
                <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 bg-card border border-card-border rounded-xl shadow-lg p-2 flex flex-col gap-1 z-50 before:absolute before:-top-6 before:left-0 before:w-full before:h-6 before:content-['']">
                <Link href="/produkte" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">{getPageTitle('products')}</Link>
                <Link href="/produkte/finder" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">Produktfinder</Link>
                <Link href="/co2-rechner" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">CO₂-Rechner</Link>
                <Link href="/loesungen" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">Lösungen</Link>
              </div>
            </div>

            {/* Group 2: Wissen & Vertrauen */}
            <div className="relative group">
              <span className="px-3 2xl:px-4 py-2 text-[14px] 2xl:text-[15px] font-heading font-medium rounded-full transition-all duration-200 text-muted-foreground hover:bg-background-subtle hover:text-foreground cursor-pointer inline-flex items-center gap-1 group-hover:text-foreground group-hover:bg-background-subtle">
                Wissen & Vertrauen
                <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-transform group-hover:rotate-180" />
              </span>
              <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 bg-card border border-card-border rounded-xl shadow-lg p-2 flex flex-col gap-1 z-50 before:absolute before:-top-6 before:left-0 before:w-full before:h-6 before:content-['']">
                <Link href="/academy" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">{getPageTitle('academy')}</Link>
                <Link href="/trust-center" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">Trust Center</Link>
                <Link href="/service" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">{getPageTitle('service')}</Link>
                <Link href="/partnerschaft" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">Partnerschaft</Link>
              </div>
            </div>

            {/* Group 3: Unternehmen */}
            <div className="relative group">
              <Link href="/unternehmen" className="px-3 2xl:px-4 py-2 text-[14px] 2xl:text-[15px] font-heading font-medium rounded-full transition-all duration-200 text-muted-foreground hover:bg-background-subtle hover:text-foreground inline-flex items-center gap-1 group-hover:text-foreground group-hover:bg-background-subtle">
                {getPageTitle('about')}
                <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 bg-card border border-card-border rounded-xl shadow-lg p-2 flex flex-col gap-1 z-50 before:absolute before:-top-6 before:left-0 before:w-full before:h-6 before:content-['']">
                <Link href="/unternehmen" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">{getPageTitle('about')}</Link>
                <Link href="/maerkte" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">{getPageTitle('markets')}</Link>
                <Link href="/referenzen" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">Referenzen</Link>
                <Link href="/karriere" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">Karriere</Link>
                <Link href="/news" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-soft hover:text-primary transition-colors text-foreground">News</Link>
              </div>
            </div>
          </nav>

          {/* Action bar (Unified Menu & Globe) */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
            {/* Language Switcher — always visible */}
            <Link href="/language" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-3 gap-2 rounded-lg border border-card-border bg-card text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] transition-all duration-fast cursor-pointer">
              <Globe className="w-5 h-5 shrink-0" />
              <span className="text-small font-bold tracking-wider uppercase font-body select-none hidden sm:inline">
                {locale.toUpperCase()}
              </span>
            </Link>
            {/* Theme toggle — desktop only */}
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>
          
            <span className="hidden sm:inline-flex">
              <Link
                href="/projektanfrage"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5 min-h-[44px] px-4 lg:px-5 text-[14px] lg:text-[15px] whitespace-nowrap"
              >
                {t('quote')}
              </Link>
            </span>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              className="xl:hidden relative flex items-center justify-center h-11 w-11 rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.95] transition-all duration-fast cursor-pointer group border-card-border bg-card text-foreground hover:bg-background-subtle"
              aria-label={t('menu')}
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

      {/* SEO Navigation (Always rendered in DOM, visually hidden) */}
      <nav className="sr-only" aria-label="Sitemap">
        <ul>
          <li><Link href="/">Start</Link></li>
          <li><Link href="/produkte">Produkte</Link></li>
          <li><Link href="/produkte/finder">Produktfinder</Link></li>
          <li><Link href="/co2-rechner">CO2-Rechner</Link></li>
          <li><Link href="/projektanfrage">Projektanfrage</Link></li>
          <li><Link href="/loesungen">Lösungen</Link></li>
          <li><Link href="/academy">Academy</Link></li>
          <li><Link href="/trust-center">Trust Center</Link></li>
          <li><Link href="/service">Service</Link></li>
          <li><Link href="/partnerschaft">Partnerschaft</Link></li>
          <li><Link href="/maerkte">Märkte</Link></li>
          <li><Link href="/referenzen">Referenzen</Link></li>
          <li><Link href="/unternehmen">Unternehmen</Link></li>
          <li><Link href="/karriere">Karriere</Link></li>
          <li><Link href="/news">News</Link></li>
          <li><Link href="/kontakt">Kontakt</Link></li>
        </ul>
      </nav>
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="mega-menu"
            key="mega-menu-overlay"
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
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
      <AnimatePresence mode="wait">
        {globeHubOpen && (
          <motion.div
            key="globe-hub-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <GlobeHub onClose={() => setGlobeHubOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
