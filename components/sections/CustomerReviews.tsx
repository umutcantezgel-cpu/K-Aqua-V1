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
      icon: <Droplet className="w-8 h-8 text-primary" />,
      title: t('case1Title'),
      desc: t('case1Desc')
    },
    {
      icon: <Factory className="w-8 h-8 text-primary" />,
      title: t('case2Title'),
      desc: t('case2Desc')
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: t('case3Title'),
      desc: t('case3Desc')
    }
  ];

  const trustSignals = [
    { label: t('iso9001'), icon: <ShieldCheck className="w-5 h-5 text-accent" /> },
    { label: t('iso14001'), icon: <Leaf className="w-5 h-5 text-accent" /> },
    { label: t('iso50001'), icon: <Zap className="w-5 h-5 text-accent" /> },
    { label: t('madeInGermany'), icon: <Award className="w-5 h-5 text-accent" /> }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background kq-band kq-band--slant-b relative">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionHead
            eyebrow={t('eyebrow')}
            title={t('title')}
            lead={t('lead')}
            align="center"
          />
          
          {/* Trust Signals Row - Horizontal Scroll on Mobile */}
          <div className="mt-8 flex w-full md:w-auto overflow-x-auto hide-scrollbar snap-x snap-mandatory md:flex-wrap justify-start md:justify-center items-center gap-4 bg-card border border-card-border px-6 py-4 rounded-2xl shadow-sm -mx-6 px-6 md:mx-0">
            {trustSignals.map((signal, idx) => (
              <div key={idx} className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground bg-muted px-4 py-2 rounded-full snap-center shrink-0">
                {signal.icon}
                {signal.label}
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Cases Grid - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0">
          {cases.map((c, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center shrink-0 flex">
              <Card className="w-full bg-card border border-card-border rounded-xl p-8 flex flex-col gap-6 shadow-sm hover:shadow-diffuse transition-shadow duration-300">
                <div className="mb-2 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                  {c.icon}
                </div>
                <div className="font-heading font-bold text-xl text-foreground">
                  {c.title}
                </div>
                <p className="text-body text-muted-foreground leading-relaxed mt-auto">
                  {c.desc}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
