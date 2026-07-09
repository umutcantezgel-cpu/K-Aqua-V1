/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import {
  Package,
  Search,
  Leaf,
  FileText,
  Lightbulb,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Handshake,
  Globe,
  Star,
  Building2,
  Users,
  Newspaper,
  Phone,
  LucideIcon,
  MessageSquare
} from 'lucide-react';
import LangPicker from './LangPicker';
import ThemeToggle from './ThemeToggle';

interface MegaMenuProps {
  onClose: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  products: Package,
  finder: Search,
  co2: Leaf,
  rfq: FileText,
  solutions: Lightbulb,
  academy: GraduationCap,
  trust: ShieldCheck,
  service: Wrench,
  partner: Handshake,
  markets: Globe,
  references: Star,
  about: Building2,
  career: Users,
  news: Newspaper,
  contact: Phone,
};

const MEGA_LAYOUT = [
  {
    group: 'products',
    items: [
      { id: 'finder', href: '/produkte/finder' },
      { id: 'menu.pipes', href: '/produkte/finder?category=Pipes' },
      { id: 'menu.fittings', href: '/produkte/finder?category=Fittings' },
      { id: 'menu.transition', href: '/produkte/finder?category=Transition Fittings' },
      { id: 'menu.valves', href: '/produkte/finder?category=Valves' },
      { id: 'menu.tools', href: '/produkte/finder?category=Tools' },
    ],
  },
  {
    group: 'tools',
    items: [
      { id: 'co2', href: '/co2-rechner' },
      { id: 'rfq', href: '/projektanfrage' },
      { id: 'solutions', href: '/loesungen' },
    ],
  },
  {
    group: 'knowledge',
    items: [
      { id: 'academy', href: '/academy' },
      { id: 'trust', href: '/trust-center' },
      { id: 'service', href: '/service' },
      { id: 'partner', href: '/partnerschaft' },
    ],
  },
  {
    group: 'company',
    items: [
      { id: 'markets', href: '/maerkte' },
      { id: 'references', href: '/referenzen' },
      { id: 'about', href: '/unternehmen' },
      { id: 'career', href: '/karriere' },
      { id: 'news', href: '/news' },
      { id: 'contact', href: '/kontakt' },
    ],
  },
];

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Close when the route changes (but not on initial mount)
  const initialPathRef = useRef(pathname);
  useEffect(() => {
    if (initialPathRef.current !== pathname) {
      onClose();
    }
  }, [pathname, onClose]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus Restoration
  useEffect(() => {
    const activeElementBeforeOpen = document.activeElement as HTMLElement | null;
    return () => {
      if (
        activeElementBeforeOpen &&
        document.body.contains(activeElementBeforeOpen) &&
        typeof activeElementBeforeOpen.focus === 'function'
      ) {
        activeElementBeforeOpen.focus();
      }
    };
  }, []);

  // Keyboard focus trap inside the overlay
  useEffect(() => {
    if (!containerRef.current) return;

    const getFocusableElements = () => {
      if (!containerRef.current) return [];
      return Array.from(
        containerRef.current.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];
    };

    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      const activeElement = focusable.find(
        (el) =>
          el.classList.contains('is-active') ||
          el.getAttribute('aria-current') === 'page'
      ) || focusable[0];
      if (activeElement) {
        activeElement.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const elements = getFocusableElements();
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPageMeta = (id: string): [string, string] => {
    try {
      const arr = t.raw(`pages.${id}`);
      if (Array.isArray(arr) && arr.length >= 2) {
        return [arr[0], arr[1]];
      }
      return [id, ''];
    } catch {
      return [id, ''];
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 350, damping: 25 },
    },
  };

  return (
    <div
      className="k-mega"
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.menu')}
      onClick={handleBackdropClick}
      ref={containerRef}
    >
      <motion.div
        className="k-mega-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          key="home"
          className="k-mega-section"
          variants={sectionVariants}
        >
          <span className="k-mega-head">
            {t('nav.home') || 'Startseite'}
          </span>
          <div className="k-mega-group">
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className={`k-mega-item ${pathname === '/' ? 'is-active' : ''}`}
                aria-current={pathname === '/' ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="k-mega-icon" aria-hidden="true">
                  <Package size={20} strokeWidth={1.8} />
                </span>
                <span className="k-mega-text">
                  <span className="t">{t('nav.home') || 'Startseite'}</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {MEGA_LAYOUT.map((sec) => (
          <motion.section
            key={sec.group}
            className="k-mega-section"
            variants={sectionVariants}
          >
            <span className="k-mega-head">
              {t(`groups.${sec.group}`)}
            </span>
            <div className="k-mega-group">
              {sec.items.map((item) => {
                let title = '';
                let subtitle = '';
                if (item.id.startsWith('menu.')) {
                  title = t(item.id as any);
                } else {
                  const [transTitle, sub] = getPageMeta(item.id);
                  title = transTitle;
                  subtitle = sub;
                }
                const isActive = pathname === item.href;
                const IconComp = ICON_MAP[item.id] || Package;
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                  >
                    <Link
                      href={item.href}
                      className={`k-mega-item ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={onClose}
                    >
                      <span className="k-mega-icon" aria-hidden="true">
                        <IconComp size={20} strokeWidth={1.8} />
                      </span>
                      <span className="k-mega-text">
                        <span className="t">{title}</span>
                        {subtitle && <span className="s">{subtitle}</span>}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        ))}

        {/* Mobile Action Bar (Only visible on small screens where header items are hidden) */}
        <motion.div
          className="flex sm:hidden items-center justify-between gap-4 mt-4 pt-6 border-t border-card-border col-span-full"
          variants={sectionVariants}
        >
          <div className="flex items-center gap-2">
            <Link
              href="/language"
              onClick={onClose}
              className="flex items-center justify-center min-h-[44px] px-3 gap-2 rounded-lg border border-card-border bg-card text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] transition-all duration-fast cursor-pointer"
            >
              <Globe className="w-5 h-5 shrink-0" />
              <span className="text-small font-bold tracking-wider uppercase font-body select-none">
                {locale.toUpperCase()}
              </span>
            </Link>
            <ThemeToggle />
          </div>
          <Link
            href="/projektanfrage"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-fast ease-out bg-primary text-primary-foreground hover:bg-primary-hover h-11 px-4 text-sm"
          >
            <MessageSquare size={18} />
            {t('quote')}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
