'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime error caught by boundary:', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Etwas ist schiefgelaufen / Something went wrong
      </h2>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Erneut versuchen / Try again
      </button>
    </div>
  );
}
