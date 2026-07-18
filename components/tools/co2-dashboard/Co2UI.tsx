import React, { useState, useEffect, useRef } from 'react';

const KIcon = ({ d, size = 20, strokeWidth = 2, style, children }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }} aria-hidden="true">
    {d ? <path d={d}></path> : children}
  </svg>
);

export const Icons: any = {
  ArrowRight: (p: any) => <KIcon {...p} d="M5 12h14m-7-7 7 7-7 7" />,
  ArrowUpRight: (p: any) => <KIcon {...p} d="M7 17 17 7m-10 0h10v10" />,
  Droplet: (p: any) => <KIcon {...p} d="M12 2.7s6.5 7 6.5 12a6.5 6.5 0 1 1-13 0c0-5 6.5-12 6.5-12Z" />,
  Download: (p: any) => <KIcon {...p} d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" />,
  Play: (p: any) => <KIcon {...p}><circle cx="12" cy="12" r="10"></circle><path d="m10 8.5 5 3.5-5 3.5z"></path></KIcon>,
  Leaf: (p: any) => <KIcon {...p} d="M4 20s.5-8 6-12.5C14.5 3.8 20 4 20 4s.2 5.5-3.5 10C12 19.5 4 20 4 20Zm0 0c2-5 5-8.5 9-11" />,
  Recycle: (p: any) => <KIcon {...p} d="m7 19-2.5-4.5L7 10m-2.5 4.5H12m3-9.5h5l-2.6 4.4M17.5 5 15 9.4M9 5h6L12.4 9M9 19h7.5l2.5-4.5" />,
  Shield: (p: any) => <KIcon {...p} d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Zm-3.5-10 2.5 2.5L15.5 10" />,
  Layers: (p: any) => <KIcon {...p} d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5" />,
  Thermometer: (p: any) => <KIcon {...p} d="M14 4a2 2 0 0 0-4 0v9.5a4.5 4.5 0 1 0 4 0V4Zm-2 5v6" />,
  Globe: (p: any) => <KIcon {...p}><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2c2.7 2.7 4 6.3 4 10s-1.3 7.3-4 10c-2.7-2.7-4-6.3-4-10s1.3-7.3 4-10Z"></path></KIcon>,
  Award: (p: any) => <KIcon {...p}><circle cx="12" cy="9" r="6"></circle><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"></path></KIcon>,
  Factory: (p: any) => <KIcon {...p} d="M3 21V9l6 4V9l6 4V4h6v17H3Zm4-4h.01M11 17h.01M15 17h.01" />,
  Wrench: (p: any) => <KIcon {...p} d="M14.7 6.3a4.5 4.5 0 0 0-5.9 5.9L3 18l3 3 5.8-5.8a4.5 4.5 0 0 0 5.9-5.9L14.5 12 12 9.5l2.7-3.2Z" />,
  Phone: (p: any) => <KIcon {...p} d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  Mail: (p: any) => <KIcon {...p}><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></KIcon>,
  MapPin: (p: any) => <KIcon {...p} d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  Users: (p: any) => <KIcon {...p}><circle cx="9" cy="8" r="4"></circle><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M16 4.5a4 4 0 0 1 0 7M19 14.6c1.8 1.2 3 3.2 3 5.4"></path></KIcon>,
  FileText: (p: any) => <KIcon {...p} d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Zm0 0v5h5M9 13h6M9 17h6" />,
  Sun: (p: any) => <KIcon {...p}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></KIcon>,
  Moon: (p: any) => <KIcon {...p} d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
  Menu: (p: any) => <KIcon {...p} d="M4 6h16M4 12h16M4 18h16" />,
  ChevronDown: (p: any) => <KIcon {...p} d="m6 9 6 6 6-6" />,
  X: (p: any) => <KIcon {...p} d="M18 6 6 18M6 6l12 12" />,
  Check: (p: any) => <KIcon {...p} d="m4 12.5 5 5L20 6.5" />,
  Ruler: (p: any) => <KIcon {...p} d="M3 17 17 3l4 4L7 21l-4-4Zm5-1-1.5-1.5m4.5-1.5L9.5 11.5m4.5-1.5-1.5-1.5M17 6.5 15.5 5" />,
  Flame: (p: any) => <KIcon {...p} d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-2.5-5.5C15 8 13.5 6 13 3.5c-2.5 2-4 4.5-4 7-1-.5-1.8-1.5-2-3C5.5 9.5 5 12 5 15a7 7 0 0 0 7 7Z" />,
  Handshake: (p: any) => <KIcon {...p} d="m11 17 2 2a1.4 1.4 0 0 0 2-2m-1-3 2.5 2.5a1.4 1.4 0 0 0 2-2L14 10l-2.3 1.5c-1.5 1-3.2-1-2-2.3L13 6h3l4.5 4.5M3 7l4-2 3.5 1.5M3 16l4 2 2-1" />,
};

export function Reveal({ children, delay = 0, as = 'div', style, className = '' }: any) {
  const ref = useRef<any>(null);
  const [vis, setVis] = useState(false);
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!vis) return;
    const t = setTimeout(() => {
      setSettled(true);
      const el = ref.current;
      if (el && el.getAnimations) {
        el.getAnimations().forEach((a: any) => { try { a.finish(); } catch (e) {} });
      }
    }, 700 + delay);
    return () => clearTimeout(t);
  }, [vis, delay]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.95 && r.bottom > 0;
    };
    if (inView()) { setVis(true); return; }
    let io: any = null;
    const onScroll = () => { if (inView()) { setVis(true); cleanup(); } };
    const cleanup = () => {
      if (io) io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setVis(true); cleanup(); }
      }, { threshold: 0.1 });
      io.observe(el);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return cleanup;
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${vis ? '' : 'reveal-pre'} ${settled ? 'reveal-settled' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

export function KButton({ children, variant = 'primary', icon, href, onClick, size = 'md', disabled = false }: any) {
  const cls = `k-btn k-btn--${variant} k-btn--${size}`;
  const inner = (<React.Fragment>{children}{icon ? icon : null}</React.Fragment>);
  if (href) {
    if (disabled) return <span className={cls} aria-disabled="true" role="link" tabIndex={-1}>{inner}</span>;
    return <a className={cls} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>;
  }
  return <button type="button" className={cls} onClick={onClick} disabled={disabled} aria-disabled={disabled}>{inner}</button>;
}

export function Eyebrow({ children }: any) {
  return <p className="k-eyebrow">{children}</p>;
}

export function SectionHead({ eyebrow, title, lead, align = 'left' }: any) {
  return (
    <div className="k-section-head" style={{ textAlign: align, marginInline: align === 'center' ? 'auto' : 0 }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="k-h2">{title}</h2>
      {lead ? <p className="k-lead">{lead}</p> : null}
    </div>
  );
}

export function BentoCard({ children, span = 1, tint = false, className = '', style }: any) {
  return (
    <div className={`k-card ${tint ? 'k-card--tint' : ''} ${className}`}
      style={{ gridColumn: `span ${span}`, ...style }}>
      {children}
    </div>
  );
}

export function Photo({ src, alt, ratio = '4 / 3', radius = 'var(--radius)', style, slotId }: any) {
  const id = slotId || ('photo-' + (src ? String(src).split('/').pop()?.split('.')[0] : 'misc'));
  return (
    <div style={{
      aspectRatio: ratio, borderRadius: radius, overflow: 'hidden', position: 'relative',
      background: 'linear-gradient(135deg, var(--primary-soft), var(--background-subtle))',
      border: '1px solid var(--card-border)', ...style
    }}>
      {src ? (
        <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export function KAquaLogo({ height = 30 }: any) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <svg width={height} height={height} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2.5C16 2.5 26 13 26 20a10 10 0 1 1-20 0C6 13 16 2.5 16 2.5Z" fill="var(--primary)"></path>
        <path d="M11.5 21.5a5 5 0 0 0 4 4.5" stroke="var(--primary-foreground)" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9"></path>
      </svg>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: height * 0.74, letterSpacing: '-0.02em', lineHeight: 1 }}>
        K-AQUA
      </span>
    </span>
  );
}
