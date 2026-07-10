'use client';

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
    // SSR placeholder to prevent hydration mismatch while still taking up the same space
    return (
      <span className="text-xs opacity-0">
        Ein Projekt der <a href="https://www.codayweb.de/">Coday Web Agency</a>
      </span>
    );
  }

  return (
    <div className="flex items-center text-xs opacity-50 hover:opacity-100 transition-opacity">
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
        className="hover:text-white transition-colors underline decoration-white/30 underline-offset-2"
      >
        {anchorText}
      </a>
    </div>
  );
}
