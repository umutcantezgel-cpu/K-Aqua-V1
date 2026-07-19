'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function LiquidHeadline({ className = '' }: { className?: string }) {
  const t = useTranslations('homex');
  
  // E.g., "Leading in Water Supply." or "Unsere Mission."
  const claim = t('manifestTitle');

  return (
    <div className={`ka-liquidhead ${className}`}>
      <p className="line" data-fill="scroll">{claim}</p>
      {/* Sub is typically not translated if it's purely instructional, but we can leave it out or translate it if needed. The HTML snippet had "Der Pegel folgt dem Scroll-Fortschritt der Sektion." */}
      <p className="sub opacity-0 h-0 overflow-hidden">Liquid Headline</p>
    </div>
  );
}
