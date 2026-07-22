'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/lib/i18n/navigation';

export default function CodayAttribution() {
  const t = useTranslations('footer.attribution');
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const anchorTexts = t.raw('texts') as string[];

  // Determine dofollow or nofollow
  // usePathname from next-intl usually strips the locale prefix (e.g. returns '/' or '/impressum')
  const isDofollow = pathname === '/' || pathname === '/impressum';

  // Path-based deterministic variation to avoid hydration mismatch
  const pathLength = pathname ? pathname.length : 0;
  const textIndex = pathLength % anchorTexts.length;
  const anchorText = anchorTexts[textIndex];

  if (!mounted) {
    return (
      <span className="text-[10px] tracking-widest uppercase opacity-0 font-medium">
        <a href="https://www.codayweb.de/">{anchorTexts[1]}</a>
      </span>
    );
  }

  return (
    <div className="flex items-center text-[10px] tracking-widest uppercase font-medium text-white/40 hover:text-white transition-colors duration-500">
      <span className="sr-only">
        {t('srDesc')}
      </span>
      <a
        href="https://www.codayweb.de/"
        target="_blank"
        rel={isDofollow ? "dofollow noopener noreferrer" : "nofollow noopener noreferrer"}
        title={t('linkTitle')}
        aria-label={t('srDesc')}
        className="text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5"
      >
        {anchorText}
      </a>
    </div>
  );
}
