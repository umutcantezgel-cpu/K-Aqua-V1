'use client';

import { useEffect } from 'react';
import { usePathname } from '@/lib/i18n/navigation';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    KAquaElemente: any;
  }
}

export function KAquaElementeInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // Wenn die Seite (Soft-Navigation) wechselt, müssen die Effekte neu initialisiert werden.
    if (typeof window !== 'undefined' && window.KAquaElemente?.init) {
      // Verzögerung, um sicherzustellen, dass React den DOM gerendert hat
      setTimeout(() => {
        window.KAquaElemente.init();
      }, 50);
    }
  }, [pathname]);

  return null;
}
