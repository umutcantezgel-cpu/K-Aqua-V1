'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import {
  Package, Search, Leaf, FileText, Lightbulb,
  GraduationCap, ShieldCheck, Wrench, Handshake,
  Building2, Users, Newspaper, Phone,
  ChevronDown, LucideIcon, Globe, Star
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  products: Package, finder: Search, co2: Leaf, rfq: FileText, solutions: Lightbulb,
  academy: GraduationCap, trust: ShieldCheck, service: Wrench, partner: Handshake,
  markets: Globe, references: Star, about: Building2, career: Users, news: Newspaper, contact: Phone,
};

const NAV_GROUPS = [
  {
    group: 'tools',
    items: [
      { id: 'products', href: '/produkte' },
      { id: 'finder', href: '/produkte/finder' },
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

export default function DesktopNav() {
  const pathname = usePathname();
  const t = useTranslations();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (group: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveGroup(group);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveGroup(null);
    }, 150);
  };

  const getPageMeta = (id: string): [string, string] => {
    try {
      const arr = t.raw(`pages.${id}`);
      if (Array.isArray(arr) && arr.length >= 2) return [arr[0], arr[1]];
      return [id, ''];
    } catch {
      return [id, ''];
    }
  };

  return (
    <nav className="hidden lg:flex items-center gap-2" aria-label={t('nav.menu')} onMouseLeave={handleMouseLeave}>
      {NAV_GROUPS.map((sec) => {
        const isActive = activeGroup === sec.group;
        const isChildActive = sec.items.some(item => pathname === item.href);

        return (
          <div 
            key={sec.group} 
            className="relative"
            onMouseEnter={() => handleMouseEnter(sec.group)}
          >
            <button
              className={clsx(
                "min-h-[44px] px-4 inline-flex items-center gap-1.5 hover:text-foreground font-heading font-medium hover:bg-primary-soft rounded-full transition-colors active:scale-[0.97] cursor-pointer",
                isChildActive ? "text-primary font-bold" : "text-muted-foreground",
                isActive ? "bg-primary-soft text-foreground" : ""
              )}
              aria-expanded={isActive}
            >
              {t(`groups.${sec.group}`)}
              <ChevronDown 
                size={16} 
                className={clsx("transition-transform duration-200", isActive && "rotate-180")}
              />
            </button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute top-full left-0 mt-2 w-[320px] bg-card border border-card-border rounded-xl shadow-lift overflow-hidden z-50 p-2"
                >
                  <div className="flex flex-col gap-1">
                    {sec.items.map((item) => {
                      const [title, subtitle] = getPageMeta(item.id);
                      const isItemActive = pathname === item.href;
                      const IconComp = ICON_MAP[item.id] || Package;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setActiveGroup(null)}
                          className={clsx(
                            "group flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isItemActive ? "bg-primary-soft" : ""
                          )}
                        >
                          <span className={clsx(
                            "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-colors",
                            isItemActive ? "bg-primary text-primary-foreground" : "bg-card border border-card-border text-muted-foreground group-hover:text-primary group-hover:border-primary/20"
                          )}>
                            <IconComp size={18} strokeWidth={1.8} />
                          </span>
                          <span className="flex flex-col">
                            <span className={clsx(
                              "font-heading font-semibold text-small transition-colors",
                              isItemActive ? "text-primary" : "text-foreground group-hover:text-primary"
                            )}>
                              {title}
                            </span>
                            {subtitle && (
                              <span className="text-tiny text-muted-foreground line-clamp-1">
                                {subtitle}
                              </span>
                            )}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
