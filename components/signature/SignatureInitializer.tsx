'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SignatureInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-initialize the vanilla JS signature components on route changes
    const sig = typeof window !== 'undefined'
      ? (window as unknown as { KAquaSignature?: { init?: () => void } }).KAquaSignature
      : undefined;
    if (sig?.init) {
      // Add a slight delay to allow React to render the new DOM elements
      setTimeout(() => { sig.init?.(); }, 100);
    }
  }, [pathname]);

  return null;
}
