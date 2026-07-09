'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const LANGUAGES = [
  { id: 'de', name: 'Deutsch', label: 'DE' },
  { id: 'en', name: 'English', label: 'EN' },
  { id: 'ar', name: 'العربية', label: 'AR' }
] as const;

export default function LangPicker() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav'); // 'nav' namespace has 'lang'

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

  const handleLanguageChange = (nextLocale: 'de' | 'en' | 'ar') => {
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
        className="flex items-center justify-center min-h-[44px] min-w-[44px] px-3 gap-2 rounded-lg border border-card-border bg-card text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] transition-all duration-fast cursor-pointer"
        aria-label={`${t('lang') || 'Language'}: ${currentLang.name}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
      >
        <Globe className="w-5 h-5 shrink-0" />
        <span className="text-small font-bold tracking-wider uppercase font-body select-none">
          {currentLang.label}
        </span>
        <ChevronDown className={clsx("w-4 h-4 text-muted-foreground transition-transform duration-fast shrink-0", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className={clsx(
            "absolute bottom-full mb-2 w-48 rounded-xl border border-card-border bg-card shadow-diffuse py-1 z-50 focus:outline-none animate-in fade-in slide-in-from-bottom-2 duration-fast end-0 origin-bottom"
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
                  "flex items-center w-full min-h-[44px] px-4 text-start font-body text-[14px] transition-colors focus-visible:bg-background-subtle focus-visible:text-foreground hover:bg-background-subtle hover:text-foreground active:scale-[0.98] outline-none cursor-pointer",
                  isSelected ? "font-bold text-primary bg-primary-soft/30" : "text-muted-foreground"
                )}
              >
                <span className="uppercase font-bold tracking-wider text-[12px] min-w-[24px] me-2">
                  {lang.id}
                </span>
                <span className="flex-1">{lang.name}</span>
                {isSelected && (
                  <Check className="w-4 h-4 shrink-0 text-primary ms-auto" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
