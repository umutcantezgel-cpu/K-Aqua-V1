'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { Factory, Ruler, Award, Globe as GlobeIcon, Droplet } from 'lucide-react';
import { ArrowRight } from '@/components/ui/icon';
import { Button } from '@/components/ui/Button';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';

import { IconChip } from '@/components/ui/IconChip';
import { Reveal } from '@/components/ui/Reveal';

// Dynamic load of Globe to prevent SSR issues
const Globe = dynamic(
  () => import('@/components/globe/Globe').then((mod) => mod.Globe),
  { ssr: false }
);




const cardIcons = [Factory, Ruler, Award, GlobeIcon];

const cardPosList = [
  { left: 'max(3vw, 16px)', top: '16%' },
  { right: 'max(3vw, 16px)', top: '22%' },
  { left: 'max(5vw, 20px)', bottom: '16%' },
  { right: 'max(5vw, 20px)', bottom: '13%' },
];

export default function HeroScrolly() {
  const t = useTranslations('home');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const wrapRef = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const staticMode = !mounted || !!prefersReduced || isMobile;

  // Scroll choreography (direct DOM writes, rAF-throttled)
  useEffect(() => {
    if (staticMode) return;

    let ticking = false;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    const update = () => {
      ticking = false;
      const wrap = wrapRef.current;
      const gw = globeWrapRef.current;
      if (!wrap || !gw) return;

      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      const p = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / total));

      // 1) Hero copy fades up and out
      const fade = Math.min(1, p / 0.12);
      const copy = copyRef.current;
      if (copy) {
        copy.style.opacity = String(1 - fade);
        copy.style.transform = `translateY(${-fade * 70}px)`;
        copy.style.pointerEvents = fade > 0.4 ? 'none' : '';
      }

      // 2) Globe arcs from hero-right (or left in RTL) to center on a circular path + grows
      const e = ease(Math.min(1, p / 0.42));
      const x0 = Math.min(window.innerWidth * 0.27, 560);
      const th = e * Math.PI * 1.12; // Circular arc
      const R = x0 * (1 - e);
      const direction = isRtl ? -1 : 1;
      const x = Math.cos(th) * R * direction;
      const y = Math.sin(th) * R * 0.55;
      const s = 0.92 + e * 0.5;

      gw.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`;
      if (glowRef.current) {
        glowRef.current.style.opacity = String(0.25 + e * 0.75);
      }

      // 3) Focus cards pop in sequentially
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle('is-in', p >= 0.45 + i * 0.125);
      });

      if (hintRef.current) {
        hintRef.current.style.opacity = p > 0.93 ? '1' : '0';
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [staticMode, isRtl]);

  // Fallback markers for static mode
  const testMarkers = [
    { lat: 50.49, lon: 8.51, title: 'Waldsolms', label: 'Waldsolms' },
    { lat: 25.2, lon: 55.3, title: 'Dubai', label: 'Dubai' },
    { lat: 1.35, lon: 103.8, title: 'Singapore', label: 'Singapore' },
    { lat: 51.5, lon: -0.1, title: 'London', label: 'London' },
  ];

  const cardsList = [
    { t: t('scrolly.0.t'), d: t('scrolly.0.d') },
    { t: t('scrolly.1.t'), d: t('scrolly.1.d') },
    { t: t('scrolly.2.t'), d: t('scrolly.2.d') },
    { t: t('scrolly.3.t'), d: t('scrolly.3.d') },
  ];

  const heroCopy = (
    <div ref={copyRef} className="relative z-10 w-full max-w-md lg:max-w-lg flex flex-col gap-4 sm:gap-5 text-start">
      <Reveal delay={0.08}>
        <h1 className="text-3xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.08]">
          {t('h1a')}{' '}
          <span className="text-primary">{t('h1b')}</span>
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t('lead')}
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-1 sm:mt-2">
          <ButtonPrimary href="/produkte" className="w-full sm:w-auto">
            {t('ctaProducts')}
          </ButtonPrimary>
          <Button variant="ghost" size="lg" href="/projektanfrage" className="w-full sm:w-auto">
            {t('ctaContact')}
          </Button>
        </div>
      </Reveal>
    </div>
  );

  const staticCardEls = cardsList.map((c, i) => {
    const Ic = cardIcons[i] || Droplet;
    return (
      <div
        key={i}
        className="k-orbit-card is-in"
      >
        <IconChip className="mb-2">
          <Ic className="w-5 h-5" />
        </IconChip>
        <strong className="font-heading text-lg font-bold">{c.t}</strong>
        <span className="text-small text-muted-foreground">{c.d}</span>
      </div>
    );
  });

  const scrollyCardEls = cardsList.map((c, i) => {
    const Ic = cardIcons[i] || Droplet;
    const pos = cardPosList[i] || { left: '0px', top: '0px', right: undefined, bottom: undefined };
    // Map left/right for RTL support
    const style: React.CSSProperties = {
      position: 'absolute',
      top: pos.top,
      bottom: pos.bottom,
      left: isRtl ? (pos.right ? pos.right : undefined) : (pos.left ? pos.left : undefined),
      right: isRtl ? (pos.left ? pos.left : undefined) : (pos.right ? pos.right : undefined),
    };

    return (
      <div
        key={i}
        ref={(el) => {
          cardRefs.current[i] = el;
        }}
        className="k-orbit-card"
        style={style}
      >
        <IconChip className="mb-2">
          <Ic className="w-5 h-5" />
        </IconChip>
        <strong className="font-heading text-lg font-bold">{c.t}</strong>
        <span className="text-small text-muted-foreground">{c.d}</span>
      </div>
    );
  });

  const showReducedDesktop = mounted && prefersReduced;

  return (
    <>
      {/* Static Mode container: visible on mobile / tablet or prefers-reduced-motion */}
      <div className={`block lg:hidden ${showReducedDesktop ? '!block' : ''}`}>
        <section className="relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--primary-soft)_0%,transparent_100%)] opacity-30 pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-14 md:py-28 relative z-10">
            {heroCopy}
            <div className="flex justify-center items-center w-full">
              <div className="w-full max-w-[580px] aspect-square relative">
                {mounted && <Globe size={580} interactive={true} speed={0.004} markers={testMarkers} />}
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-[1400px] px-6 k-orbit-static">
            {staticCardEls}
          </div>
        </section>
      </div>

      {/* Scrollytelling container: visible only on desktop */}
      <div className={`hidden lg:block ${showReducedDesktop ? '!hidden' : ''}`}>
        <div ref={wrapRef} className="k-scrolly">
          <div className="k-scrolly-stage">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--primary-soft)_0%,transparent_100%)] opacity-30 pointer-events-none" />
            <div ref={glowRef} className="k-scrolly-glow" aria-hidden="true" />
            <div className="mx-auto max-w-[1400px] px-6 h-full flex items-center relative z-10">
              {heroCopy}
            </div>
            <div ref={globeWrapRef} className="k-scrolly-globe">
              {mounted && !showStatic && (
                <Globe size={800} interactive={false} speed={0.02} markers={testMarkers} />
              )}
            </div>
            {scrollyCardEls}
            <div ref={hintRef} className="k-scrolly-hint" aria-hidden="true">
              <ArrowRight className="w-5 h-5 rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
