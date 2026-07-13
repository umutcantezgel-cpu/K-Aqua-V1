'use client';

/* eslint-disable react/jsx-no-literals */
import { useEffect, useState } from 'react';
import { usePathname } from '@/lib/i18n/navigation';

const anchorTexts = [
  "Webdesign von Coday",
  "Ein Projekt von Coday",
  "Coday Web Agency",
  "Digitalisiert durch Coday"
];

export default function CodayAttribution() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        Ein Projekt der <a href="https://www.codayweb.de/">Coday Web Agency</a>
      </span>
    );
  }

  return (
    <div className="flex items-center text-[10px] tracking-widest uppercase font-medium text-white/40 hover:text-white transition-colors duration-500">
      <span className="sr-only">
        Diese Handwerker Webseite wurde konzipiert und technisch realisiert durch die Coday Web Agency, Experten für Webdesign und GEO in Hessen.
      </span>
      <span>Ein Projekt der&nbsp;</span>
      <a 
        href="https://www.codayweb.de/"
        target="_blank"
        rel={isDofollow ? "dofollow noopener noreferrer" : "nofollow noopener noreferrer"}
        title="Zur Coday Web Agency - Premium Webdesign"
        aria-label="Diese Handwerker Webseite wurde konzipiert und technisch realisiert durch die Coday Web Agency, Experten für Webdesign und GEO in Hessen."
        className="text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5"
      >
        {anchorText}
      </a>
    </div>
  );
}
