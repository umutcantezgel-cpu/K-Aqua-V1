'use client';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

const NAV_ITEMS = [
  { id: 'home', url: '/' },
  { id: 'products', url: '/produkte' },
  { id: 'finder', url: '/produkte/finder' },
  { id: 'co2', url: '/co2-rechner' },
  { id: 'markets', url: '/maerkte' },
  { id: 'trust', url: '/trust-center' },
] as const;

export default function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="hidden md:flex items-center gap-1" aria-label={t('menu')}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.url;
        return (
          <Link
            key={item.id}
            href={item.url}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
              "min-h-[44px] px-4 inline-flex items-center hover:text-foreground font-heading font-medium hover:bg-primary-soft rounded-full transition-colors active:scale-[0.97]",
              isActive
                ? "text-primary font-bold"
                : "text-muted-foreground"
            )}
          >
            {t(item.id)}
          </Link>
        );
      })}
    </nav>
  );
}
