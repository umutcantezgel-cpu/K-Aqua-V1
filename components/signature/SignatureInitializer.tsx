'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SignatureInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-initialize the vanilla JS signature components on route changes
    if (typeof window !== 'undefined' && (window as any).KAquaSignature) {
      // Add a slight delay to allow React to render the new DOM elements
      setTimeout(() => {
        (window as any).KAquaSignature.init();
      }, 100);
    }
  }, [pathname]);

  return null;
}
