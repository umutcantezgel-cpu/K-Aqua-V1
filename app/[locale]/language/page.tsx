'use client';

import { LanguageGlobeHub } from '@/components/navigation/LanguageGlobeHub';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function LanguagePage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
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
