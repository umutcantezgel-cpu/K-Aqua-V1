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
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`} id="projekte">
      {projects.map((proj, idx) => (
        <Link key={idx} href={`/referenzen#${proj.id}`} className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
          <Card className="h-full flex flex-col p-0 overflow-hidden shadow-sm hover:shadow-diffuse transition-all duration-500 border-card-border hover:border-primary/50 relative">
            <div className="relative h-64 w-full overflow-hidden bg-muted">
              <img 
                src={`/images/geo/${proj.id}.jpg`} 
                alt={proj.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1541888052115-4127027b4097?auto=format&fit=crop&q=80&w=600' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-5 left-6 flex items-center gap-2">
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
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                Projekt Ansehen <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
