'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function DiagonalBand({ className = '' }: { className?: string }) {
  const t = useTranslations('homex');
  const marqueeItems = t.raw('marquee') as string[];

  // Create two strings for the two tracks
  const text1 = `${marqueeItems[0]} • ${marqueeItems[1]} • ${marqueeItems[2]} • `;
  const text2 = `${marqueeItems[3]} • ${marqueeItems[4]} • ${marqueeItems[5]} • `;

  return (
    <div className={`ka-diagband ${className}`} aria-hidden="true" data-nosnippet>
      <div className="track" data-text={text1}></div>
      <div className="track reverse" data-text={text2}></div>
    </div>
  );
}
