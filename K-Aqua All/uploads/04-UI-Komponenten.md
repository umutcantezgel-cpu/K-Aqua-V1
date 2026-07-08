# UI-Komponenten

## Button.tsx
```tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-foreground border border-card-border hover:border-primary hover:text-primary hover:bg-primary-soft",
        inverse: "bg-inverse-foreground text-inverse-surface hover:shadow-lift hover:-translate-y-0.5",
      },
      size: {
        sm: "min-h-[44px] px-4 text-small",
        md: "min-h-[48px] px-6 text-body",
        lg: "min-h-[56px] px-5 sm:px-8 text-lead",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, href, icon, iconPosition = "right", children, ...props }, ref) => {
    const isLink = !!href;
    const isLeftIcon = icon && iconPosition === "left";
    const isRightIcon = icon && iconPosition === "right";

    const content = (
      <>
        {isLeftIcon && icon}
        {children}
        {isRightIcon && icon}
      </>
    );

    const buttonClass = clsx(buttonVariants({ variant, size }), className);

    if (isLink) {
      const anchorProps = { ...props } as Record<string, unknown>;
      delete anchorProps.type;
      delete anchorProps.disabled;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={buttonClass}
          {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        className={buttonClass}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

```

## Card.tsx
```tsx
import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tint?: boolean;
  span?: number;
}

const spanClasses: Record<number, string> = {
  1: '',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tint = false, span, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "border border-card-border rounded-xl shadow-diffuse p-5 sm:p-8 transition-all duration-200 ease-out flex flex-col gap-4 hover:-translate-y-[3px] hover:shadow-lift relative",
          tint ? "bg-card-tint" : "bg-card",
          span ? spanClasses[span] : '',
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";


```

## Input.tsx
```tsx
--- FILE NOT FOUND: /Users/umurey/Downloads/kaqua-antigravity 2/components/ui/Input.tsx ---
```

## MegaMenu.tsx
```tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
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
} from 'lucide-react';

interface MegaMenuProps {
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
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
  cat_pipes: Package,
  cat_fittings: Package,
  cat_valves: Package,
  cat_tools: Wrench,
  cat_accessories: Package,
  cat_transition: Package,
  cat_saddles: Package,
};

const MEGA_LAYOUT = [
  {
    group: 'categories',
    items: [
      { id: 'cat_pipes', href: '/produkte/rohre' },
      { id: 'cat_fittings', href: '/produkte/formteile' },
      { id: 'cat_transition', href: '/produkte/uebergangsfittings' },
      { id: 'cat_valves', href: '/produkte/armaturen' },
      { id: 'cat_saddles', href: '/produkte/einschweisssattel' },
      { id: 'cat_accessories', href: '/produkte/zubehoer' },
      { id: 'cat_tools', href: '/produkte/werkzeuge' },
    ],
  },
  {
    group: 'tools',
    items: [
      { id: 'products', href: '/produkte' },
      { id: 'allProducts', href: '/produkte/alle' },
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
] as const;

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const t = useTranslations();
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
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 28,
        staggerChildren: shouldReduceMotion ? 0 : 0.025,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
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
                const [title, subtitle] = getPageMeta(item.id);
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
      </motion.div>
    </div>
  );
}

```

## ThemeToggle.tsx
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-lg border border-card-border bg-card" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="k-icon-btn"
      aria-label={t(isDark ? 'toggle_theme_light' : 'toggle_theme_dark')}
    >
      {isDark ? (
        <Sun className="w-[19px] h-[19px]" />
      ) : (
        <Moon className="w-[19px] h-[19px]" />
      )}
    </button>
  );
}

```

## SettingsToggle.tsx
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Settings } from 'lucide-react';
import clsx from 'clsx';

interface SettingsToggleProps {
  classicMenuFallback: boolean;
  onToggleFallback: (val: boolean) => void;
}

export default function SettingsToggle({
  classicMenuFallback,
  onToggleFallback,
}: SettingsToggleProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations('nav');

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  // Handle escape key to close dropdown
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        className="k-icon-btn"
        aria-label={t('settings') || 'Settings'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Settings className="w-[19px] h-[19px]" />
      </button>

      {open && (
        <div
          className={clsx(
            "absolute top-full mt-2 w-72 rounded-xl border border-card-border bg-card shadow-diffuse p-4 z-50 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-fast",
            locale === 'ar' ? "left-0 origin-top-left" : "right-0 origin-top-right"
          )}
          role="menu"
          aria-label={t('settings') || "Settings"}
        >
          <div className={clsx("flex flex-col gap-3", locale === 'ar' && "text-right")}>
            <span className="font-heading font-semibold text-small border-b border-card-border pb-2 text-foreground">
              {t('settings') || 'Settings'}
            </span>
            <label className={clsx("flex items-center gap-3 cursor-pointer justify-between min-h-[44px]", locale === 'ar' && "flex-row-reverse")}>
              <span className="text-small text-muted-foreground select-none">
                {t('classicFallback') || 'Classic Menu (Fallback)'}
              </span>
              <input
                type="checkbox"
                checked={classicMenuFallback}
                onChange={(e) => onToggleFallback(e.target.checked)}
                className="w-5 h-5 rounded border-card-border text-primary focus:ring-primary cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

```

## LangPicker.tsx
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const LANGUAGES = [
  { id: 'de', name: 'Deutsch', label: 'DE' },
  { id: 'en', name: 'English', label: 'EN' },
  { id: 'ar', name: 'العربية', label: 'AR' },
  { id: 'fr', name: 'Français', label: 'FR' },
  { id: 'es', name: 'Español', label: 'ES' },
  { id: 'it', name: 'Italiano', label: 'IT' },
  { id: 'pt', name: 'Português', label: 'PT' },
  { id: 'nl', name: 'Nederlands', label: 'NL' },
  { id: 'pl', name: 'Polski', label: 'PL' },
  { id: 'tr', name: 'Türkçe', label: 'TR' },
  { id: 'ru', name: 'Русский', label: 'RU' },
  { id: 'zh', name: '中文', label: 'ZH' }
] as const;

type SupportedLocale = typeof LANGUAGES[number]['id'];

export default function LangPicker() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav'); // 'nav' namespace has 'lang'

  // Sync localStorage with current URL locale, and auto-redirect if stored locale is different and no cookie is present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kaqua-lang');
      if (!stored) {
        localStorage.setItem('kaqua-lang', locale);
      } else if (stored !== locale && LANGUAGES.some((l) => l.id === stored)) {
        // If cookie is not present but localStorage choice is, sync cookie and redirect
        const hasLocaleCookie = document.cookie.split(';').some((item) => item.trim().startsWith('NEXT_LOCALE='));
        if (!hasLocaleCookie) {
          document.cookie = `NEXT_LOCALE=${stored}; path=/; max-age=31536000; SameSite=Lax`;
          router.replace(pathname, { locale: stored as SupportedLocale });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [locale, pathname, router]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  // Handle escape key to close dropdown
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.id === locale) || LANGUAGES[0];

  const handleLanguageChange = (nextLocale: SupportedLocale) => {
    try {
      localStorage.setItem('kaqua-lang', nextLocale);
    } catch (e) {
      console.error(e);
    }
    
    // Set cookie to persist choice
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Route-preserving navigation
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        className="k-icon-btn"
        aria-label={`${t('lang') || 'Language'}: ${currentLang.name}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
        style={{ width: 'auto', padding: '0 12px', gap: '6px' }}
      >
        <Globe className="w-[18px] h-[18px] shrink-0" />
        <span className="text-[13px] font-bold tracking-wider uppercase font-body select-none">
          {currentLang.label}
        </span>
        <ChevronDown className={clsx("w-4 h-4 text-muted-foreground transition-transform duration-fast shrink-0", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className={clsx(
            "absolute top-full mt-2 w-48 rounded-xl border border-card-border bg-card shadow-diffuse py-1 z-50 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-fast",
            locale === 'ar' ? "left-0 origin-top-left" : "right-0 origin-top-right"
          )}
          role="listbox"
          aria-label={t('lang') || "Languages"}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.id === locale;
            return (
              <button
                key={lang.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleLanguageChange(lang.id)}
                className={clsx(
                  "flex items-center w-full min-h-[44px] px-4 text-left font-body text-[14px] transition-colors focus-visible:bg-background-subtle focus-visible:text-foreground hover:bg-background-subtle hover:text-foreground active:scale-[0.98] outline-none cursor-pointer",
                  isSelected ? "font-bold text-primary bg-primary-soft/30" : "text-muted-foreground",
                  locale === 'ar' && "text-right flex-row-reverse"
                )}
              >
                <span className={clsx("uppercase font-bold tracking-wider text-[12px] min-w-[24px]", locale === 'ar' ? "ml-2" : "mr-2")}>
                  {lang.id}
                </span>
                <span className="flex-1">{lang.name}</span>
                {isSelected && (
                  <Check className={clsx("w-4 h-4 shrink-0 text-primary", locale === 'ar' ? "mr-auto" : "ml-auto")} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

```


