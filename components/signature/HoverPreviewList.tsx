'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export default function HoverPreviewList({ className = '' }: { className?: string }) {
  const t = useTranslations('refs');
  const projects = t.raw('projects') as { id: string; title: string; d: string }[];

  return (
    <div className={`ka-previewlist min-h-[300px] ${className}`}>
      {projects.map((proj, idx) => {
        // Generating an img tag as string for the data-label, which will be injected as innerHTML
        // In a real production scenario with actual photos, this path should map to the real image.
        const imgTag = `<img src="/images/geo/${proj.id}.jpg" alt="${proj.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1541888052115-4127027b4097?auto=format&fit=crop&q=80&w=400'" />`;
        
        return (
          <Link key={idx} className="row" href={`/referenzen#${proj.id}`} data-label={imgTag}>
            <b>{proj.title}</b>
            <span>{proj.d}</span>
          </Link>
        );
      })}
      <div className="preview" aria-hidden="true"><span className="ph-label"></span></div>
    </div>
  );
}
