# Navigationsstruktur


## App Shell Prototype (prototype/kaqua-app.jsx)
```javascript
// K-Aqua Redesign — App shell: nav, footer, routing, theme, tweaks
const { useState: useS, useEffect: useE } = React;

const NAV_STRUCTURE = [
  { kind: 'link', id: 'home' },
  { kind: 'dd', group: 'tools', items: ['products', 'finder', 'co2', 'rfq', 'solutions'] },
  { kind: 'dd', group: 'knowledge', items: ['academy', 'trust', 'service', 'partner'] },
  { kind: 'dd', group: 'company', items: ['markets', 'references', 'about', 'career', 'news'] },
  { kind: 'link', id: 'contact' },
];

const MEGA_LAYOUT = [
  { group: 'tools', items: ['products', 'finder', 'co2', 'rfq', 'solutions'] },
  { group: 'knowledge', items: ['academy', 'trust', 'service', 'partner'] },
  { group: 'company', items: ['markets', 'references', 'about', 'career', 'news', 'contact'] },
];

const BRAND_OPTIONS = ['#5B2D8C', '#2D5A8C', '#0E7A6E'];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "brandColor": "#5B2D8C",
  "radius": 16,
  "glove": false,
  "menuHub": true
}/*EDITMODE-END*/;

/* brand color overrides: recompute ramp from a hex via oklch relative syntax */
function applyBrand(hex) {
  const root = document.documentElement;
  if (hex === '#5B2D8C') {
    ['--brand-300','--brand-400','--brand-500','--brand-600','--brand-700'].forEach(v => root.style.removeProperty(v));
    return;
  }
  root.style.setProperty('--brand-300', `oklch(from ${hex} 0.76 calc(c * 0.7) h)`);
  root.style.setProperty('--brand-400', `oklch(from ${hex} 0.62 c h)`);
  root.style.setProperty('--brand-500', `oklch(from ${hex} 0.51 c h)`);
  root.style.setProperty('--brand-600', `oklch(from ${hex} 0.44 c h)`);
  root.style.setProperty('--brand-700', `oklch(from ${hex} 0.38 c h)`);
}

function ScrollProgress() {
  const ref = React.useRef(null);
  useE(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return <div ref={ref} className="k-progress" aria-hidden="true"></div>;
}

function MegaMenu({ page, go, onClose }) {
  const { t } = useT();
  useE(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);
  return (
    <div className="k-mega" role="dialog" aria-label={t.nav.menu}>
      <div className="k-mega-grid">
        {MEGA_LAYOUT.map((sec) => (
          <React.Fragment key={sec.group}>
            <span className="k-mega-head">{t.groups[sec.group]}</span>
            {sec.items.map((id) => {
              const meta = t.pages[id] || K_I18N.de.pages[id] || [id, ''];
              return (
                <button key={id} type="button" className={`k-mega-item ${page === id ? 'is-active' : ''}`}
                  onClick={() => { go(id); onClose(); }}>
                  <span className="t">{meta[0]}</span>
                  <span className="s">{meta[1]}</span>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function NavDropdown({ group, items, page, go, open, setOpen }) {
  const { t } = useT();
  const hoverable = React.useRef(typeof window.matchMedia === 'function' && window.matchMedia('(hover: hover)').matches);
  const timer = React.useRef(null);
  const isOpen = open === group;
  const enter = () => { if (!hoverable.current) return; clearTimeout(timer.current); setOpen(group); };
  const leave = () => {
    if (!hoverable.current) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen((o) => (o === group ? null : o)), 140);
  };
  useE(() => () => clearTimeout(timer.current), []);
  const active = items.includes(page);
  return (
    <div className="k-nav-item" onMouseEnter={enter} onMouseLeave={leave}>
      <button type="button"
        className={`k-nav-link k-nav-dd-trigger ${active ? 'is-active' : ''} ${isOpen ? 'is-open' : ''}`}
        aria-expanded={isOpen} aria-haspopup="true"
        onClick={() => setOpen(isOpen ? null : group)}>
        {t.groups[group]}
        <span className="k-dd-caret" aria-hidden="true"><Icons.ChevronDown size={14} /></span>
      </button>
      {isOpen ? (
        <div className="k-nav-dd-panel" role="menu" aria-label={t.groups[group]}>
          {items.map((id) => {
            const meta = t.pages[id] || K_I18N.de.pages[id] || [id, ''];
            return (
              <button key={id} type="button" role="menuitem"
                className={`k-mega-item ${page === id ? 'is-active' : ''}`}
                onClick={() => { go(id); setOpen(null); }}>
                <span className="t">{meta[0]}</span>
                <span className="s">{meta[1]}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function Nav({ page, go, dark, setDark, lang, setLang, menuHub }) {
  const { t } = useT();
  const [scrolled, setScrolled] = useS(false);
  const [menuOpen, setMenuOpen] = useS(false);
  const [openDd, setOpenDd] = useS(null);
  useE(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useE(() => { setMenuOpen(false); setOpenDd(null); }, [page]);
  useE(() => {
    if (!openDd) return;
    const onDown = (e) => { if (!e.target.closest('.k-nav')) setOpenDd(null); };
    const onKey = (e) => { if (e.key === 'Escape') setOpenDd(null); };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); window.removeEventListener('keydown', onKey); };
  }, [openDd]);
  return (
    <React.Fragment>
      <header className={`k-nav ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
        <div className="k-container k-nav-inner">
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }} aria-label="K-Aqua Startseite" style={{ textDecoration: 'none', display: 'inline-flex', minHeight: 44, alignItems: 'center' }}>
            <KAquaLogo height={28} />
          </a>
          <nav className="k-nav-links" aria-label="Hauptnavigation">
            {NAV_STRUCTURE.map((n) => n.kind === 'link' ? (
              <button key={n.id} type="button"
                className={`k-nav-link ${page === n.id ? 'is-active' : ''}`}
                aria-current={page === n.id ? 'page' : undefined}
                onClick={() => go(n.id)}>
                {t.nav[n.id] || (t.pages[n.id] || [n.id])[0]}
              </button>
            ) : (
              <NavDropdown key={n.group} group={n.group} items={n.items} page={page} go={go} open={openDd} setOpen={setOpenDd} />
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <LangPicker lang={lang} setLang={setLang} />
            <button type="button" className="k-icon-btn" aria-label={dark ? 'Light mode' : 'Dark mode'} onClick={() => setDark(!dark)}>
              {dark ? <Icons.Sun size={19} /> : <Icons.Moon size={19} />}
            </button>
            <span className="k-nav-cta" style={{ display: 'inline-flex' }}>
              <KButton size="sm" onClick={() => go('rfq')}>{t.nav.quote || t.nav.contact}</KButton>
            </span>
            <button type="button" className="k-icon-btn" aria-label={t.nav.menu} aria-expanded={menuOpen}
              onClick={() => { setOpenDd(null); setMenuOpen(!menuOpen); }}>
              {menuOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {menuOpen ? (menuHub
        ? <GlobeHub page={page} go={go} onClose={() => setMenuOpen(false)} />
        : <MegaMenu page={page} go={go} onClose={() => setMenuOpen(false)} />) : null}
    </React.Fragment>
  );
}

function Footer({ go }) {
  const { t } = useT();
  const col = { display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' };
  const head = { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 10 };
  return (
    <footer className="k-footer">
      <div className="k-container" style={{ position: 'relative', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1.4fr) repeat(3, minmax(140px, 1fr))', gap: 'var(--sp-8)', flexWrap: 'wrap' }} className="k-footer-grid">
          <div style={{ ...col, gap: 'var(--sp-4)' }}>
            <KAquaLogo height={26} />
            <p style={{ fontSize: 15, opacity: 0.65, maxWidth: 320 }}>{t.footer.tagline}</p>
          </div>
          <div style={col}>
            <span style={head}>{t.footer.colTools}</span>
            {['products', 'finder', 'co2', 'solutions', 'academy'].map((id) => (
              <button key={id} type="button" className="k-footer-link" onClick={() => go(id)}>{t.pages[id][0]}</button>
            ))}
          </div>
          <div style={col}>
            <span style={head}>{t.footer.colCompany}</span>
            {['about', 'markets', 'trust', 'partner', 'references', 'news', 'career'].map((id) => (
              <button key={id} type="button" className="k-footer-link" onClick={() => go(id)}>{t.pages[id][0]}</button>
            ))}
          </div>
          <div style={col}>
            <span style={head}>{t.footer.colContact}</span>
            <a className="k-footer-link" href="tel:+4960859868410">+49 (0)60 85 / 9868-410</a>
            <a className="k-footer-link" href="mailto:info@k-aqua.de">info@k-aqua.de</a>
            <button type="button" className="k-footer-link" onClick={() => go('contact')}>{t.footer.directions}</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap', marginTop: 'var(--sp-12)', paddingTop: 'var(--sp-6)', borderTop: '1px solid oklch(1 0 0 / 0.12)' }}>
          <span style={{ fontSize: 14, opacity: 0.5 }}>© 2026 KWT GmbH. {t.footer.rights}</span>
          <div style={{ display: 'flex', gap: 'var(--sp-6)' }}>
            <button type="button" className="k-footer-link" onClick={() => go('imprint')}>{t.footer.imprint}</button>
            <a className="k-footer-link" href="https://www.k-aqua.de/privacy.php" target="_blank" rel="noreferrer">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .k-footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  );
}

const VIEWS = {
  home: HomeView, products: ProductsView, solutions: SolutionsView,
  service: ServiceView, references: GlobeRefView, about: AboutView,
  news: NewsView, career: CareerToolsView, contact: ContactView, imprint: ImprintView,
  finder: FinderView, co2: CO2View, trust: TrustView, partner: PartnerView, academy: AcademyView,
  markets: MarketsView, rfq: RFQView,
};

function resolveView(page) {
  if (page.startsWith('geo/')) {
    const slug = page.slice(4);
    if (K_GEO.some((g) => g.slug === slug)) return { View: GeoCityView, slug };
  }
  return { View: VIEWS[page] || HomeView, slug: null };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLangState] = useS(() => {
    try {
      const stored = localStorage.getItem('kaqua-lang') || 'de';
      return (window.K_PAGES_I18N && window.K_PAGES_I18N[stored]) ? stored : 'de';
    } catch (e) { return 'de'; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem('kaqua-lang', l); } catch (e) {}
  };
  const langDef = K_LANGS.find((l) => l.id === lang) || K_LANGS[0];
  const dict = K_I18N[lang] || K_I18N.de;
  useE(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = langDef.dir;
  }, [lang]);
  const [page, setPage] = useS(() => {
    const h = (location.hash || '').replace('#', '');
    return (VIEWS[h] || h.startsWith('geo/')) ? h : 'home';
  });
  const [wiping, setWiping] = useS(false);
  const wipeT = React.useRef([]);
  const commit = (p) => {
    setPage(p);
    try { history.replaceState(null, '', '#' + p); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const go = (p) => {
    if (p === page) return;
    const animOk = document.documentElement.classList.contains('anim-ok') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animOk) { commit(p); return; }
    wipeT.current.forEach(clearTimeout);
    setWiping(true);
    wipeT.current = [
      setTimeout(() => commit(p), 320),
      setTimeout(() => setWiping(false), 880),
    ];
  };
  useE(() => () => wipeT.current.forEach(clearTimeout), []);

  useE(() => {
    document.documentElement.dataset.glove = t.glove ? 'on' : 'off';
  }, [t.glove]);

  useE(() => {
    document.documentElement.dataset.theme = t.dark ? 'dark' : 'light';
  }, [t.dark]);
  useE(() => {
    if (window.KAquaLoader) window.KAquaLoader.hideOverlay();
  }, []);
  useE(() => { applyBrand(t.brandColor); }, [t.brandColor]);
  useE(() => {
    const el = document.querySelector('.k-page');
    if (!el) return;
    el.classList.add('k-page-anim', 'k-page-enter');
    const t1 = setTimeout(() => el.classList.remove('k-page-enter'), 60);
    const t2 = setTimeout(() => {
      el.classList.remove('k-page-anim');
      if (el.getAnimations) el.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} });
    }, 560);
    return () => { clearTimeout(t1); clearTimeout(t2); el.classList.remove('k-page-enter', 'k-page-anim'); };
  }, [page]);
  useE(() => {
    document.documentElement.style.setProperty('--radius', t.radius + 'px');
    document.documentElement.style.setProperty('--radius-lg', Math.round(t.radius * 1.5) + 'px');
  }, [t.radius]);

  const { View, slug } = resolveView(page);
  return (
    <KLangContext.Provider value={{ lang, t: dict, dir: langDef.dir }}>
      <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: -9999, zIndex: 100 }}>Zum Inhalt springen</a>
      <ScrollProgress />
      <Nav page={page} go={go} dark={t.dark} setDark={(v) => setTweak('dark', v)} lang={lang} setLang={setLang} menuHub={t.menuHub !== false} />
      <div id="main-content" data-screen-label={`Seite: ${page}`}>
        <View key={page} go={go} slug={slug} />
      </div>
      {wiping ? (
        <div className="k-wipe" aria-hidden="true">
          <span className="drop" style={{ color: 'var(--inverse-foreground)' }}><Icons.Droplet size={56} strokeWidth={1.5} /></span>
        </div>
      ) : null}
      <Footer go={go} />
      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakToggle label="Dark Mode (OLED)" value={t.dark} onChange={(v) => setTweak('dark', v)} />
        <TweakColor label="Markenfarbe" value={t.brandColor} options={BRAND_OPTIONS} onChange={(v) => setTweak('brandColor', v)} />
        <TweakSection label="Form" />
        <TweakSlider label="Eckenradius" value={t.radius} min={0} max={28} step={2} unit="px" onChange={(v) => setTweak('radius', v)} />
        <TweakSection label="Erlebnis" />
        <TweakToggle label="Baustellen-Modus (Handschuh)" value={t.glove} onChange={(v) => setTweak('glove', v)} />
        <TweakToggle label="Globus-Hub als Menü" value={t.menuHub !== false} onChange={(v) => setTweak('menuHub', v)} />
      </TweaksPanel>
    </KLangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

```

## Current Header (components/layout/Header.tsx)
```tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Logo } from '@/components/ui/Logo';
import NavLinks from './NavLinks';
import LangPicker from './LangPicker';
import ThemeToggle from './ThemeToggle';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import MegaMenu from './MegaMenu';
import SettingsToggle from './SettingsToggle';
import GlobeHub from '@/components/globe/GlobeHub';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const shouldReduceMotion = useReducedMotion();
  const [classicMenuFallback, setClassicMenuFallback] = useState(true);

  // Sync fallback switch from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kaqua-classic-fallback');
      if (stored !== null) {
        setClassicMenuFallback(stored === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const handleToggleFallback = (val: boolean) => {
    setClassicMenuFallback(val);
    try {
      localStorage.setItem('kaqua-classic-fallback', String(val));
    } catch (e) {
      console.error(e);
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

  const isScrolledOrOpen = scrolled || menuOpen;

  const headerClass = `k-nav ${isScrolledOrOpen ? 'is-scrolled' : ''}`;

  return (
    <>
      <header className={headerClass} style={{ zIndex: menuOpen ? 80 : 40 }}>
        <div className="k-container k-nav-inner">
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-transform active:scale-[0.97]"
            aria-label={t('home')}
            style={{ textDecoration: 'none' }}
          >
            <Logo height={28} />
          </Link>

          {/* Desktop NavLinks */}
          <NavLinks onDropdownChange={(isOpen) => { if (isOpen) setMenuOpen(false); }} />

          {/* Action bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <LangPicker />
            <ThemeToggle />
            <SettingsToggle
              classicMenuFallback={classicMenuFallback}
              onToggleFallback={handleToggleFallback}
            />
          
            <span className="k-nav-cta hidden sm:inline-flex">
              <Link
                href="/projektanfrage"
                className="k-btn k-btn--sm k-btn--primary"
              >
                {t('quote')}
              </Link>
            </span>

            {/* Hamburger Button */}
            <button
              type="button"
              className="k-icon-btn"
              aria-label={t('menu')}
              aria-expanded={menuOpen}
              aria-controls="mega-menu"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence mode="wait">
        {menuOpen && classicMenuFallback && (
          <motion.div
            id="mega-menu"
            key="mega-menu-overlay"
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
      {menuOpen && !classicMenuFallback && (
        <GlobeHub onClose={closeMenu} />
      )}
    </>
  );
}

```

## Current NavDropdown (components/layout/NavDropdown.tsx)
```tsx
'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

type DropdownItem = {
  id: string;
  url: string;
};

export default function NavDropdown({ 
  group, 
  items, 
  pathname, 
  open, 
  setOpen 
}: { 
  group: string; 
  items: DropdownItem[]; 
  pathname: string;
  open: string | null;
  setOpen: (val: string | null | ((prev: string | null) => string | null)) => void;
}) {
  const tGroups = useTranslations('groups');
  const tPages = useTranslations('pages');
  
  const hoverable = useRef(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpen = open === group;
  
  const enter = () => { 
    if (!hoverable.current) return; 
    if (timer.current) clearTimeout(timer.current); 
    setOpen(group); 
  };
  
  const leave = () => {
    if (!hoverable.current) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen((o) => (o === group ? null : o)), 140);
  };
  
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  
  const active = items.some(item => pathname === item.url || pathname.startsWith(`${item.url}/`));
  
  return (
    <div className="k-nav-item" onMouseEnter={enter} onMouseLeave={leave}>
      <button 
        type="button"
        className={clsx('k-nav-link k-nav-dd-trigger', active && 'is-active', isOpen && 'is-open')}
        aria-expanded={isOpen} 
        aria-haspopup="true"
        onClick={() => setOpen(isOpen ? null : group)}
      >
        {tGroups(group as any)}
        <span className="k-dd-caret" aria-hidden="true">
          <ChevronDown size={14} />
        </span>
      </button>
      
      {isOpen ? (
        <div className="k-nav-dd-panel" role="menu" aria-label={tGroups(group as any)}>
          {items.map((item) => {
            // @ts-ignore - Dynamic key access
            const meta = tPages.raw(item.id) || [item.id, ''];
            const isActive = pathname === item.url;
            return (
              <Link 
                key={item.id} 
                href={item.url}
                role="menuitem"
                className={clsx('k-mega-item', isActive && 'is-active')}
                onClick={() => setOpen(null)}
                style={{ textDecoration: 'none' }}
              >
                <span className="t">{meta[0]}</span>
                <span className="s">{meta[1]}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

```

## Current NavLinks (components/layout/NavLinks.tsx)
```tsx
'use client';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import NavDropdown from './NavDropdown';

type NavItem = 
  | { kind: 'link'; id: string; url: string }
  | { kind: 'dd'; group: string; items: { id: string; url: string }[] };

const NAV_STRUCTURE: NavItem[] = [
  { kind: 'link', id: 'home', url: '/' },
  { kind: 'dd', group: 'tools', items: [
    { id: 'products', url: '/produkte' }, 
    { id: 'finder', url: '/produkte/finder' }, 
    { id: 'co2', url: '/co2-rechner' }, 
    { id: 'rfq', url: '/projektanfrage' }, 
    { id: 'solutions', url: '/loesungen' }
  ] },
  { kind: 'dd', group: 'knowledge', items: [
    { id: 'academy', url: '/academy' }, 
    { id: 'trust', url: '/trust-center' }, 
    { id: 'service', url: '/service' }, 
    { id: 'partner', url: '/partnerschaft' }
  ] },
  { kind: 'dd', group: 'company', items: [
    { id: 'markets', url: '/maerkte' }, 
    { id: 'references', url: '/referenzen' }, 
    { id: 'about', url: '/unternehmen' }, 
    { id: 'career', url: '/karriere' }, 
    { id: 'news', url: '/news' }
  ] },
  { kind: 'link', id: 'contact', url: '/kontakt' },
];

export default function NavLinks({ onDropdownChange }: { onDropdownChange?: (isOpen: boolean) => void }) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [openDd, setOpenDd] = useState<string | null>(null);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDd(null);
  }, [pathname]);

  // Handle outside click & escape
  useEffect(() => {
    if (!openDd) return;
    const onDown = (e: PointerEvent) => { 
      if (!(e.target as Element).closest('.k-nav')) setOpenDd(null); 
    };
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === 'Escape') setOpenDd(null); 
    };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => { 
      document.removeEventListener('pointerdown', onDown); 
      window.removeEventListener('keydown', onKey); 
    };
  }, [openDd]);

  // Notify parent (Header) when dropdown state changes if needed
  useEffect(() => {
    if (onDropdownChange) {
      onDropdownChange(openDd !== null);
    }
  }, [openDd, onDropdownChange]);

  return (
    <nav className="k-nav-links" aria-label={t('menu')}>
      {NAV_STRUCTURE.map((n) => {
        if (n.kind === 'link') {
          const isActive = pathname === n.url;
          return (
            <Link
              key={n.id}
              href={n.url}
              aria-current={isActive ? 'page' : undefined}
              className={clsx('k-nav-link', isActive && 'is-active')}
            >
              {t(n.id as any)}
            </Link>
          );
        } else {
          return (
            <NavDropdown 
              key={n.group} 
              group={n.group} 
              items={n.items} 
              pathname={pathname} 
              open={openDd} 
              setOpen={setOpenDd} 
            />
          );
        }
      })}
    </nav>
  );
}

```

