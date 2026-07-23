'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { SectionHead } from '@/components/ui/SectionHead';
import { Shield, Droplet, Factory, Award, CheckCircle } from 'lucide-react';

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
    { label: t('iso9001'), icon: <CheckCircle className="w-5 h-5 text-accent" /> },
    { label: t('iso14001'), icon: <CheckCircle className="w-5 h-5 text-accent" /> },
    { label: t('iso50001'), icon: <CheckCircle className="w-5 h-5 text-accent" /> },
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
          
          {/* Trust Signals Row */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 bg-card border border-card-border px-6 py-4 rounded-2xl shadow-sm">
            {trustSignals.map((signal, idx) => (
              <div key={idx} className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground bg-muted px-4 py-2 rounded-full">
                {signal.icon}
                {signal.label}
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <Card key={idx} className="flex flex-col h-full bg-card border border-card-border p-8 shadow-diffuse hover:shadow-lift transition-shadow duration-300">
              <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                {c.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                {c.title}
              </h3>
              <p className="text-body text-muted-foreground leading-relaxed">
                {c.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
