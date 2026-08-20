'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { SectionHead } from '@/components/ui/SectionHead';
import { CheckCircle2, PenTool, Briefcase, Wrench, ChevronDown } from 'lucide-react';
import { ArrowRight } from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeBuyers() {
  const t = useTranslations('buyers');
  const [activePersona, setActivePersona] = useState<number | null>(0);

  const personas = [
    {
      t: t('personas.0.t'),
      d: t('personas.0.d'),
      cta: t('personas.0.cta'),
      href: '/produkte',
      icon: PenTool,
    },
    {
      t: t('personas.1.t'),
      d: t('personas.1.d'),
      cta: t('personas.1.cta'),
      href: '/projektanfrage',
      icon: Briefcase,
    },
    {
      t: t('personas.2.t'),
      d: t('personas.2.d'),
      cta: t('personas.2.cta'),
      href: '/academy',
      icon: Wrench,
    },
  ];

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
    <section className="py-20 bg-background text-foreground border-t border-card-border overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
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

        {/* MOBILE VIEW: Premium Interactive Accordion */}
        <div className="md:hidden mt-12 flex flex-col gap-3">
          {personas.map((persona, i) => {
            const isActive = activePersona === i;
            const Icon = persona.icon;
            return (
              <div 
                key={i}
                className={`flex flex-col border rounded-2xl overflow-hidden transition-[border-color,background-color] duration-300 ease-out ${
                  isActive 
                    ? 'border-primary/40 bg-card/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
                    : 'border-card-border bg-card/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActivePersona(isActive ? null : i)}
                  className="flex items-center justify-between w-full p-5 text-left active:scale-[0.98] transition-transform duration-200 ease-out"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center size-10 rounded-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`font-heading font-bold text-[17px] transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {persona.t}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground/50'}`} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
                    >
                      <div className="px-5 pb-6 pt-1 border-t border-border/40">
                        <p className="text-body text-muted-foreground leading-relaxed mb-6">
                          {persona.d}
                        </p>
                        <Button
                          variant="ghost"
                          href={persona.href}
                          className="w-full justify-between bg-secondary/50 hover:bg-secondary"
                          icon={<ArrowRight className="w-4 h-4" />}
                          iconPosition="right"
                        >
                          {persona.cta}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW: Grid Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-12 pb-8">
          {personas.map((persona, i) => {
            const Icon = persona.icon;
            return (
              <Card key={i} className="flex flex-col h-full justify-between p-8 hover:shadow-diffuse transition-all duration-300 group">
                <div>
                  <div className="size-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-heading font-bold text-xl mb-4 text-foreground">
                    {persona.t}
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed mb-6">
                    {persona.d}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  href={persona.href}
                  className="w-full justify-between mt-auto group-hover:bg-secondary/50"
                  icon={<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                  iconPosition="right"
                >
                  {persona.cta}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Why Choose K-Aqua Section */}
        <div className="mt-24">
          <div className="mb-10 text-start md:text-center">
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {t('whyTitle')}
            </h2>
          </div>
          
          {/* Mobile Why Cards - Bento Style */}
          <div className="md:hidden flex flex-col gap-4">
            {whyReasons.map((reason, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-card-border bg-card shadow-sm"
              >
                <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-bold text-[16px] text-foreground mb-1.5">
                    {reason.t}
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed text-sm">
                    {reason.d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Why Cards Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 pb-8">
            {whyReasons.map((reason, i) => (
              <div
                key={i}
                className="flex gap-5 p-8 rounded-2xl border border-card-border bg-card hover:shadow-diffuse transition-all duration-300 group"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-bold text-lg text-foreground mb-2">
                    {reason.t}
                  </div>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {reason.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertrauens-chips and CTA */}
        <div className="mt-20 flex flex-col items-center gap-8 text-center px-4">
          <div className="flex flex-wrap justify-center gap-2.5">
            {promises.map((promise, i) => (
              <Chip key={i} className="bg-primary-soft text-primary border-primary-soft font-mono font-medium text-sm md:text-base px-4 py-1.5">
                {promise}
              </Chip>
            ))}
          </div>
          <Button variant="primary" size="lg" href="/projektanfrage" className="w-full sm:w-auto shadow-sm active:scale-[0.98] transition-transform duration-200">
            {t('ctaAll')}
          </Button>
        </div>
      </div>
    </section>
  );
}

