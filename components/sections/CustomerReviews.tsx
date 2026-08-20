'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { SectionHead } from '@/components/ui/SectionHead';
import { Shield, Droplet, Factory, Award, Leaf, Zap, ShieldCheck } from 'lucide-react';

export function CustomerReviews() {
  const t = useTranslations('trustAndCases');

  const cases = [
    {
      icon: <Droplet className="w-6 h-6 sm:w-7 sm:h-7 text-primary shrink-0" />,
      title: t('case1Title'),
      desc: t('case1Desc')
    },
    {
      icon: <Factory className="w-6 h-6 sm:w-7 sm:h-7 text-primary shrink-0" />,
      title: t('case2Title'),
      desc: t('case2Desc')
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-primary shrink-0" />,
      title: t('case3Title'),
      desc: t('case3Desc')
    }
  ];

  const trustSignals = [
    { label: t('iso9001'), icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" /> },
    { label: t('iso14001'), icon: <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" /> },
    { label: t('iso50001'), icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" /> },
    { label: t('madeInGermany'), icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" /> }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-background border-t border-card-border relative">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col items-start text-start mb-10 sm:mb-14">
          <SectionHead
            eyebrow={t('eyebrow')}
            title={t('title')}
            lead={t('lead')}
            align="left"
            className="mb-6 sm:mb-8"
          />
          
          {/* Trust Signals: Clean responsive grid on mobile, flex wrap on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 bg-card/60 border border-card-border p-3 sm:p-4 rounded-2xl w-full lg:w-auto shadow-sm">
            {trustSignals.map((signal, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 font-mono font-medium text-xs sm:text-sm text-foreground bg-muted/70 border border-card-border/80 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl"
              >
                {signal.icon}
                <span>{signal.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Cases Grid: Native vertical stack on mobile, 3-column grid on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {cases.map((c, idx) => (
            <Card
              key={idx}
              className="w-full bg-card border border-card-border rounded-2xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-5 shadow-sm hover:border-primary/40 hover:shadow-diffuse transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-primary/20 flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div className="font-heading font-bold text-lg sm:text-xl text-foreground leading-snug">
                  {c.title}
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {c.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
