'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { SectionHead } from '@/components/ui/SectionHead';
import { CheckCircle2 } from 'lucide-react';
import { ArrowRight } from '@/components/ui/icon';

export default function HomeBuyers() {
  const t = useTranslations('buyers');

  const personas = [
    {
      t: t('personas.0.t'),
      d: t('personas.0.d'),
      cta: t('personas.0.cta'),
      href: '/produkte',
    },
    {
      t: t('personas.1.t'),
      d: t('personas.1.d'),
      cta: t('personas.1.cta'),
      href: '/projektanfrage',
    },
    {
      t: t('personas.2.t'),
      d: t('personas.2.d'),
      cta: t('personas.2.cta'),
      href: '/academy',
    },
  ];

  // Map the reasons from translations dynamically
  const whyReasons = [
    { t: t('why.0.t'), d: t('why.0.d') },
    { t: t('why.1.t'), d: t('why.1.d') },
    { t: t('why.2.t'), d: t('why.2.d') },
    { t: t('why.3.t'), d: t('why.3.d') },
  ];

  const promises = [
    t('promise.0'),
    t('promise.1'),
    t('promise.2'),
  ];

  return (
    <section className="py-20 bg-background text-foreground border-t border-card-border">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Section Head */}
        <SectionHead
          eyebrow={t('eyebrow')}
          title={
            <>
              {t('title1')}
              <br />
              <span className="text-primary">{t('titleGrad')}</span>
            </>
          }
          lead={t('lead')}
          align="left"
        />

        {/* Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {personas.map((persona, i) => (
            <Card key={i} className="flex flex-col h-full justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl mb-4 text-foreground">
                  {persona.t}
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed mb-6">
                  {persona.d}
                </p>
              </div>
              <Button
                variant="ghost"
                href={persona.href}
                className="w-full justify-between mt-auto"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {persona.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Why Choose K-Aqua Section */}
        <div className="mt-24">
          <div className="mb-10 text-start">
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {t('whyTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyReasons.map((reason, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 rounded-xl border border-card-border bg-card hover:shadow-diffuse transition-all duration-200"
              >
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {reason.t}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {reason.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertrauens-chips and CTA */}
        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {promises.map((promise, i) => (
              <Chip key={i} className="bg-primary-soft text-primary border-primary-soft font-semibold">
                {promise}
              </Chip>
            ))}
          </div>
          <Button variant="primary" size="lg" href="/projektanfrage" className="mt-2">
            {t('ctaAll')}
          </Button>
        </div>
      </div>
    </section>
  );
}
