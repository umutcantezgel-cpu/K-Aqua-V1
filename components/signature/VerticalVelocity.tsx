'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function VerticalVelocity({ className = '' }: { className?: string }) {
  const t = useTranslations('homex');
  const marqueeItems = t.raw('marquee') as string[];

  // Split items across 3 columns
  const col1 = [marqueeItems[0], marqueeItems[1], marqueeItems[2]].join('|');
  const col2 = [marqueeItems[3], marqueeItems[4], marqueeItems[5]].join('|');
  const col3 = [marqueeItems[1], marqueeItems[3], marqueeItems[0]].join('|');

  return (
    <div className={`ka-vvelocity h-full min-h-[480px] ${className}`}>
      <div className="col" data-dir="up" data-dur="26" data-items={col1}>
        <div className="track"></div>
      </div>
      <div className="col mid" data-dir="down" data-dur="34" data-items={col2}>
        <div className="track"></div>
      </div>
      <div className="col" data-dir="up" data-dur="30" data-items={col3}>
        <div className="track"></div>
      </div>
    </div>
  );
}
