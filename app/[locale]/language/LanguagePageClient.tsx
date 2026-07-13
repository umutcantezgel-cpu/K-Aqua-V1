'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const LanguageGlobeHub = dynamic(
  () => import('@/components/navigation/LanguageGlobeHub').then(mod => mod.LanguageGlobeHub),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-muted rounded-xl" /> }
);

export function LanguagePageClient() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[calc(100dvh-72px)] bg-background relative"></div>;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="w-full h-[calc(100dvh-72px)] bg-background overflow-hidden overscroll-none relative">
      <LanguageGlobeHub dark={isDark} />
    </div>
  );
}
