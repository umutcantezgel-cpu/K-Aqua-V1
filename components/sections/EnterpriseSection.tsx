'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Layers, Shield, Ruler, Check } from 'lucide-react';
import { Globe } from '@/components/globe/Globe';

function useJitterE(base: number, amp: number) {
  const [v, setV] = useState(base);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setV(base + (Math.random() * 2 - 1) * amp), 1800);
    return () => clearInterval(id);
  }, [base, amp]);
  return v;
}

const BentoCard = ({ children, tint = false, style }: { children: React.ReactNode, tint?: boolean, style?: React.CSSProperties }) => (
  <div className={`ent-glass ${tint ? 'bg-card-tint' : ''}`} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', ...style }}>
    {children}
  </div>
);

export function EnterpriseTelemetry() {
  const t = useTranslations('enterprise.telemetry');
  const instant = useJitterE(1.99, 0.045);
  const telemetryMeta = t.raw('meta') as [string, string][];

  return (
    <BentoCard style={{ height: '100%', gap: 'var(--sp-6)' }}>
      <div className="k-tele-metrics">
        <div className="k-tele-metric">
          <span className="k-tele-label">{t('pressureLabel')}</span>
          <div className="k-tele-num-row"><span className="k-tele-num">2.0</span><span className="k-tele-unit">MPa</span></div>
          <span className="k-tele-live"><span className="dot"></span>{instant.toFixed(2)} {t('liveSuffix')}</span>
        </div>
        <div className="k-tele-metric">
          <span className="k-tele-label">{t('tempLabel')}</span>
          <div className="k-tele-num-row"><span className="k-tele-num">70</span><span className="k-tele-unit">°C</span></div>
          <span className="k-tele-live"><span className="dot"></span>{t('tempNote')}</span>
        </div>
      </div>
      <div className="k-flow" aria-hidden="true"></div>
      <div className="k-tele-meta">
        {telemetryMeta.map(([k, v]) => (
          <div className="k-tele-meta-row" key={k}><span className="k-tele-meta-k">{k}</span><span className="k-tele-meta-v">{v}</span></div>
        ))}
      </div>
    </BentoCard>
  );
}

export function EnterpriseLayers() {
  const t = useTranslations('enterprise.layers');
  const layers = t.raw('items') as { t: string; d: string }[];

  return (
    <BentoCard style={{ height: '100%' }}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background-subtle border border-card-border mb-2"><Layers size={24} className="text-foreground" /></div>
      <h2 className="text-h3 font-heading font-bold">{t('title')}</h2>
      <p className="text-body text-muted-foreground">{t('desc')}</p>
      <div className="k-layers mt-6 flex flex-col gap-3" tabIndex={0} role="group" aria-label={t('ariaGroup')}>
        {layers.map((layer, i) => (
          <div className="k-layer-row flex items-center gap-4 p-4 rounded-xl" data-l={i + 1} key={`${layer.t}-${i}`}>
            <span className="idx flex items-center justify-center font-bold text-white shrink-0 w-8 h-8 rounded-lg bg-black/20">{i + 1}</span>
            <div className="tt flex-1 min-w-0">
              <b className="font-heading font-bold text-white text-base leading-tight truncate">{layer.t}</b>
              <span className="text-sm text-white/80 leading-snug block mt-0.5 truncate">{layer.d}</span>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

export function EnterpriseCompliance() {
  const t = useTranslations('enterprise.comply');
  const comply = t.raw('items') as [string, string][];

  return (
    <BentoCard tint style={{ height: '100%' }}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background-subtle border border-card-border mb-2"><Shield size={24} className="text-primary" /></div>
      <h2 className="text-h3 font-heading font-bold">{t('title')}</h2>
      <div className="k-comply-list mt-6 flex flex-col gap-4">
        {comply.map(([k, v]) => (
          <div className="k-comply-row flex items-start gap-3 text-sm text-muted-foreground leading-relaxed" key={k}>
            <Check size={18} className="text-primary shrink-0 mt-0.5" />
            <span className="break-words">
              <strong className="text-foreground font-bold">{k}</strong> — {v}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

export function EnterpriseRange() {
  const t = useTranslations('enterprise');
  const sdrs = ['SDR 6', 'SDR 7,4', 'SDR 9', 'SDR 11', 'SDR 17'];
  return (
    <BentoCard style={{ height: '100%' }}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background-subtle border border-card-border mb-2"><Ruler size={24} className="text-foreground" /></div>
      <h2 className="text-h3 font-heading font-bold">{t('rangeTitle')}</h2>
      <div className="k-range-scale"></div>
      <div className="k-range-marks"><span>d20</span><span>d630</span></div>
      <div className="k-range-chips">{sdrs.map((s) => <span className="k-range-chip" key={s}>{s}</span>)}</div>
    </BentoCard>
  );
}

export function EnterpriseNetwork() {
  const t = useTranslations('enterprise.network');
  const chips = t.raw('chips') as [string, string][];
  const markers = [
    { lat: 50.49, lon: 8.51, label: 'Waldsolms HQ', title: 'hq' },
    { lat: 25.2, lon: 55.3, label: 'Dubai', title: 'dubai' },
    { lat: 1.35, lon: 103.8, label: 'Singapore', title: 'singapore' },
    { lat: 51.5, lon: -0.1, label: 'London', title: 'london' },
  ];

  return (
    <div className="k-network ent-glass p-6 sm:p-10" style={{ width: '100%' }}>
      <div className="flex flex-col gap-4">
        <h2 className="text-h2 font-heading font-bold">{t('title')}</h2>
        <p className="text-lead text-muted-foreground max-w-xl">{t('lead')}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {chips.map(([b, label]) => (
            <span className="ent-chip" key={`${b}-${label}`}><b>{b}</b> {label}</span>
          ))}
        </div>
      </div>
      <div className="k-network-globe relative h-[280px] sm:h-[340px] w-full flex items-center justify-center overflow-hidden rounded-2xl">
        <Globe size={340} interactive={true} whirl={true} markers={markers} speed={0.005} />
      </div>
    </div>
  );
}

export default function EnterpriseSection() {
  const t = useTranslations('enterprise');
  return (
    <section className="ent-page py-24 px-4 md:px-8">
      <div className="ent-bg-glow">
        <div className="ent-blob ent-blob--v1"></div>
        <div className="ent-blob ent-blob--a1"></div>
        <div className="ent-blob ent-blob--v2"></div>
      </div>
      <div className="ent-bg-grid"></div>

      <div className="ent-hero text-center mb-16">
        <span className="ent-eyebrow"><span className="ent-status-dot"></span> {t('eyebrow')}</span>
        <h2 className="ent-hero-title mx-auto">{t('heroTitle')}<em>{t('heroTitleEm')}</em></h2>
        <p className="ent-hero-lead mx-auto">{t('heroLead')}</p>
      </div>

      <div className="ent-bento">
        <div className="ent-span-4">
          <EnterpriseTelemetry />
        </div>
        <div className="ent-span-2">
          <EnterpriseLayers />
        </div>
        <div className="ent-span-2">
          <EnterpriseCompliance />
        </div>
        <div className="ent-span-4">
          <EnterpriseRange />
        </div>
        <div className="ent-span-6 w-full mt-4">
          <EnterpriseNetwork />
        </div>
      </div>
    </section>
  );
}
