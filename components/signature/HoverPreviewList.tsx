'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HoverPreviewList({ className = '' }: { className?: string }) {
  const t = useTranslations('refs');
  const projects = t.raw('projects') as { id: string; title: string; d: string }[];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {projects.map((proj, idx) => (
        <div key={proj.id || idx} id={proj.id} className="scroll-mt-28 h-full">
          <Link href={`/referenzen#${proj.id}`} className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
            <Card className="h-full flex flex-col p-0 overflow-hidden shadow-sm hover:shadow-diffuse transition-all duration-500 border-card-border hover:border-primary/50 relative">
              {/* Gebrandetes Motiv statt Projektfoto: für diese Standorte gibt es
                  keine freigegebenen Aufnahmen. Der Farbton wird deterministisch
                  aus dem Index abgeleitet, damit die Kacheln unterscheidbar sind. */}
              <div
                className="relative h-64 w-full overflow-hidden bg-muted"
                style={{ ['--tile-hue' as string]: `${(idx * 47) % 360}` }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[2s] ease-out group-hover:scale-105"
                  style={{
                    backgroundImage:
                      'radial-gradient(120% 90% at 20% 0%, hsl(var(--tile-hue) 55% 34%) 0%, hsl(var(--tile-hue) 60% 18%) 55%, hsl(var(--tile-hue) 65% 10%) 100%)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 opacity-[0.18]"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,.55) 14px 15px)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-5 start-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white font-heading font-bold text-xl tracking-wide">{proj.title}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between bg-card relative z-10">
                <p className="text-muted-foreground text-body leading-relaxed mb-8">
                  {proj.d}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 group-hover:rtl:-translate-x-2 transition-transform duration-300">
                  {t('viewProject')} <ArrowRight className="w-4 h-4 rtl-flip" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
