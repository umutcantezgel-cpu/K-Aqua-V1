'use client';

import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

export interface CardSpec { label: string; value: string }

export interface EngineeredCardProps {
  overline: string;
  title: string;
  lead: string;
  specs: CardSpec[];
  cta: string;
  href?: string;
  children?: ReactNode;
}

const MONO = 'font-mono text-[11.5px] uppercase tracking-[0.12em]';

export default function EngineeredCard({
  overline, title, lead, specs, cta, href, children
}: EngineeredCardProps) {
  return (
    <article
      tabIndex={0}
      className={[
        'group relative isolate flex min-h-90 flex-col overflow-hidden rounded-xl border border-card-border bg-card p-8',
        'transition-all duration-300 outline-none hover:-translate-y-1 hover:shadow-lift hover:border-primary/50'
      ].join(' ')}
    >
      <div className="relative z-[2] flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span className={`${MONO} text-accent-strong`}>{overline}</span>
          {title && <h3 className="font-heading text-[23px] font-bold leading-tight tracking-tight">{title}</h3>}
        </div>

        {/* Lead und Datenliste */}
        <div className="relative min-h-[150px] flex-1 flex flex-col gap-6">
          <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">
            {lead}
          </p>
          <dl className="flex flex-col">
            {specs.map((s) => (
              <div key={s.label}
                className="flex items-baseline justify-between gap-3 border-b border-card-border py-2">
                <dt className={`${MONO} text-faint-foreground`}>{s.label}</dt>
                <dd className="text-right font-heading text-[15px] font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <span aria-hidden className="h-px w-full"
            style={{ background: 'repeating-linear-gradient(90deg, var(--accent-strong) 0 1px, transparent 1px 8px)' }} />
          <span className="inline-flex items-center gap-2 font-heading text-[14.5px] font-semibold text-primary">
            {cta}
            <span aria-hidden className="inline-flex transform group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight size={15} strokeWidth={2} className="rtl-flip" />
            </span>
          </span>
        </div>
        {children}
      </div>

      {href && (
        <Link href={href} className="absolute inset-0 z-[4]" aria-label={title} title={title}>
          <span className="sr-only">{title}</span>
        </Link>
      )}
    </article>
  );
}
