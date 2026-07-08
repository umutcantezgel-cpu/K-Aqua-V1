'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/lib/i18n/navigation';
import { X } from 'lucide-react';
import { Globe, GlobeRef } from '@/components/globe/Globe';

const K_HUB_GEO: Record<string, [number, number]> = {
  home: [50.42, 8.62],
  produkte: [53.55, 9.99],
  'produkte/finder': [47.37, 8.54],
  'co2-rechner': [59.91, 10.75],
  projektanfrage: [48.14, 11.58],
  loesungen: [48.21, 16.37],
  academy: [50.11, 8.68],
  'trust-center': [50.85, 4.35],
  service: [51.92, 4.48],
  partnerschaft: [48.76, 11.42],
  maerkte: [1.35, 103.82],
  referenzen: [25.2, 55.27],
  unternehmen: [50.58, 8.68],
  karriere: [52.52, 13.4],
  news: [51.51, -0.13],
  kontakt: [50.94, 6.96],
};

const K_HUB_LAYOUT = [
  { group: 'tools', items: ['home', 'produkte', 'produkte/finder', 'co2-rechner', 'projektanfrage', 'loesungen'] },
  { group: 'knowledge', items: ['academy', 'trust-center', 'service', 'partnerschaft'] },
  { group: 'company', items: ['maerkte', 'referenzen', 'unternehmen', 'karriere', 'news', 'kontakt'] },
];

export default function GlobeHub({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const router = useRouter();
  const globeRef = useRef<GlobeRef>(null);
  const navT = useRef<NodeJS.Timeout | null>(null);
  const [active, setActive] = useState('home');
  const [globeSize, setGlobeSize] = useState(400);

  // Translation helpers: try to find a nice label in the existing translations
  const getLabel = (id: string) => {
    // If we have specific page translations, we use them, otherwise fallback to nav
    const safeKey = id.replace('/', '_');
    try {
      const pageLabel = t(`pages.${safeKey}`);
      if (pageLabel && pageLabel !== `pages.${safeKey}`) return pageLabel;
    } catch {}
    
    try {
      const navLabel = t(`nav.${id.split('/').pop() || id}`);
      if (navLabel && navLabel !== `nav.${id.split('/').pop() || id}`) return navLabel;
    } catch {}
    
    return id; // fallback
  };

  const getSubLabel = () => {
    // The original Globe Hub supported sub-labels, but we will leave this blank unless defined
    return '';
  };

  const getGroupLabel = (group: string) => {
    try {
      return t(`groups.${group}`);
    } catch {
      return group;
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    
    const updateSize = () => {
      const desktop = window.innerWidth > 860;
      setGlobeSize(desktop
        ? Math.round(Math.max(340, Math.min(620, window.innerWidth - 480, window.innerHeight - 150)))
        : Math.round(Math.min(340, window.innerWidth - 48)));
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', updateSize);
      document.body.style.overflow = '';
      if (navT.current) clearTimeout(navT.current);
    };
  }, [onClose]);

  const fly = (id: string) => {
    setActive(id);
    const g = K_HUB_GEO[id];
    if (globeRef.current && g) {
      globeRef.current.flyTo(g[1], g[0]);
    }
  };

  const navTo = (id: string) => {
    fly(id);
    if (navT.current) clearTimeout(navT.current);
    navT.current = setTimeout(() => {
      router.push(`/${id === 'home' ? '' : id}`);
      onClose();
    }, 420);
  };

  const markers = Object.keys(K_HUB_GEO).map((id) => ({
    lat: K_HUB_GEO[id]?.[0] ?? 0,
    lon: K_HUB_GEO[id]?.[1] ?? 0,
    title: id,
    label: getLabel(id),
  }));

  return (
    <div className="k-hub" role="dialog" aria-modal="true" aria-label="Globe Hub" data-screen-label="Globus-Hub">
      <div className="k-hub-list">
        {K_HUB_LAYOUT.map((sec) => (
          <React.Fragment key={sec.group}>
            <span className="k-mega-head">{getGroupLabel(sec.group)}</span>
            {sec.items.map((id) => {
              const label = getLabel(id);
              const sub = getSubLabel();
              return (
                <Link
                  key={id}
                  href={`/${id === 'home' ? '' : id}`}
                  className={`k-mega-item ${active === id ? 'is-active' : ''}`}
                  onMouseEnter={() => fly(id)}
                  onFocus={() => fly(id)}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    navTo(id);
                  }}
                >
                  <span className="t">{label}</span>
                  {sub ? <span className="s">{sub}</span> : null}
                </Link>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="k-hub-stage">
        <Globe
          ref={globeRef}
          size={globeSize}
          interactive={true}
          whirl={false}
          speed={0}
          markers={markers}
          onMarkerClick={(mk) => navTo(mk.title)}
        />
        <span className="k-hub-active"><i></i>{getLabel(active)}</span>
      </div>
      <button type="button" className="k-icon-btn k-hub-close" aria-label="Schließen" onClick={onClose}>
        <X size={20} />
      </button>
    </div>
  );
}
