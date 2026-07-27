/* eslint-disable */
'use client';
'use client';

/**
 * EngineeredCard - Bento-Karte, die auf Hover technische Daten auslegt.
 *
 * Die Karte spricht bewusst zwei Bewegungsstimmen gleichzeitig:
 *   · Schein und Neigung  GLOW-Feder, läuft dem Cursor sichtbar nach → Wasser.
 *   · Messkreuz und Auslese  ungefedert, auf ein px-Raster gerastet, starrer
 *     WIPE-Tween mit fester Staffelung → Fertigungstoleranz.
 * Genau diese Gleichzeitigkeit ist die Markenaussage.
 *
 * Fläche, Radius, Innenabstand und Hover-Lift folgen der kanonischen
 * Card-Definition des Design-Systems (.k-card in kaqua-components.css,
 * components/core/Card.jsx): padding --sp-8, gap --sp-4, radius --radius-lg,
 * Hover translateY(-3px) plus shadow-lift. Ergänzt um Schein, Messkreuz
 * und Datenauslese.
 *
 * Performance-Entscheidungen:
 *   · Beschreibung und Datenliste teilen eine reservierte Fläche. Die
 *     Kartenhöhe ändert sich beim Hover nicht - kein Layout-Thrashing.
 *   · Der Schein ist ein fixgrosser, vorgerenderter Radial-Layer, der nur
 *     per transform verschoben wird (kein Neuzeichnen eines Gradients).
 *   · Die Koordinatenanzeige wird über eine Ref direkt geschrieben, nicht
 *     über State - kein Re-Render pro Mausbewegung.
 *
 * Verwendung:
 *   <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
 *     {items.map((it) => <EngineeredCard key={it.title} {...it} />)}
 *   </div>
 */

import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { FLOW_SPRING, GLOW_SPRING, WIPE, quantize } from './motion-physics';

export interface CardSpec { label: string; value: string }

export interface EngineeredCardProps {
  overline: string;
  title: string;
  lead: string;
  specs: CardSpec[];
  cta: string;
  href?: string;
  /** Maximale Neigung in Grad. */
  tilt?: number;
  /** Durchmesser des Scheins in px. */
  glow?: number;
  /** Versatz zwischen zwei Datenzeilen in ms. */
  stagger?: number;
  /** Rasterweite des Messkreuzes in px. */
  snap?: number;
  children?: ReactNode;
}

const MONO = 'font-mono text-[11.5px] uppercase tracking-[0.12em]';

export default function EngineeredCard({
  overline, title, lead, specs, cta, href,
  tilt = 3.5, glow = 380, stagger = 34, snap = 8, children
}: EngineeredCardProps) {
  const reduce = useReducedMotion();
  const card = useRef<HTMLElement>(null);
  const box = useRef<DOMRect | null>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const [hot, setHot] = useState(false);

  const gx = useSpring(0, GLOW_SPRING);
  const gy = useSpring(0, GLOW_SPRING);
  const rx = useSpring(0, FLOW_SPRING);
  const ry = useSpring(0, FLOW_SPRING);
  const ty = useSpring(0, FLOW_SPRING);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);

  const onEnter = useCallback(() => {
    const r = card.current?.getBoundingClientRect();
    if (!r) return;
    box.current = r;
    gx.jump(r.width / 2);
    gy.jump(r.height / 2);
    ty.set(-3);
    setHot(true);
  }, [gx, gy, ty]);

  const onMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const r = box.current;
    if (!r) return;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    if (!reduce) {
      gx.set(px);
      gy.set(py);
      rx.set(-(py / r.height - 0.5) * 2 * tilt);
      ry.set((px / r.width - 0.5) * 2 * tilt);
    }
    const qx = quantize(px, snap);
    const qy = quantize(py, snap);
    cx.set(qx);
    cy.set(qy);
    if (readout.current) {
      readout.current.textContent =
        `X ${String(Math.max(0, qx)).padStart(3, '0')} · Y ${String(Math.max(0, qy)).padStart(3, '0')}`;
    }
  }, [cx, cy, gx, gy, reduce, rx, ry, snap, tilt]);

  const onLeave = useCallback(() => {
    setHot(false);
    rx.set(0);
    ry.set(0);
    ty.set(0);
  }, [rx, ry, ty]);

  const specT = { duration: reduce ? 0.001 : 0.42, ease: WIPE };

  return (
    <motion.article
      ref={card}
      tabIndex={0}
      style={{ y: ty, rotateX: rx, rotateY: ry, transformPerspective: 900,
        boxShadow: hot ? 'var(--elev-lift), var(--elev-glow)' : 'var(--elev-diffuse)' }}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={[
        'relative isolate flex min-h-90 flex-col overflow-hidden rounded-xl border border-card-border bg-card p-8',
        'transition-shadow duration-250 outline-none'
      ].join(' ')}
    >
      {/* Schein - vorgerendert, nur per transform bewegt */}
      <motion.span aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 rounded-full"
        style={{
          x: gx, y: gy, width: glow, height: glow, marginLeft: -glow / 2, marginTop: -glow / 2,
          background: 'radial-gradient(circle, color-mix(in oklab, var(--primary) 44%, transparent) 0%, color-mix(in oklab, var(--accent) 20%, transparent) 42%, transparent 68%)'
        }}
        animate={{ opacity: hot ? 0.9 : 0 }} transition={{ duration: 0.48 }} />

      {/* Blaupausen-Raster */}
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
        animate={{ opacity: hot ? 0.5 : 0 }} transition={{ duration: 0.52 }} />

      {/* Messkreuz - ungefedert, gerastert */}
      <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-px bg-accent-strong/65"
        style={{ x: cx }} animate={{ opacity: hot ? 1 : 0 }} transition={{ duration: 0.18 }} />
      <motion.span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-accent-strong/65"
        style={{ y: cy }} animate={{ opacity: hot ? 1 : 0 }} transition={{ duration: 0.18 }} />

      <div className="pointer-events-none relative z-[2] flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span className={`${MONO} text-accent-strong`}>{overline}</span>
          <h3 className="font-heading text-[23px] font-bold leading-tight tracking-tight">{title}</h3>
        </div>

        {/* Reservierte Fläche: Lead und Datenliste liegen übereinander */}
        <div className="relative min-h-[150px] flex-1">
          <motion.p className="text-[15px] leading-relaxed text-muted-foreground text-pretty"
            animate={hot ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.001 : 0.34, ease: WIPE }}>
            {lead}
          </motion.p>
          <motion.dl className="absolute inset-0 flex flex-col"
            initial={false}
            animate={hot ? 'hot' : 'rest'}
            variants={{ hot: { transition: { staggerChildren: stagger / 1000 } }, rest: {} }}>
            {specs.map((s) => (
              <motion.div key={s.label}
                className="flex items-baseline justify-between gap-3 border-b border-card-border py-2"
                variants={{
                  rest: { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 10 },
                  hot: { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }
                }}
                transition={specT}>
                <dt className={`${MONO} text-faint-foreground`}>{s.label}</dt>
                <dd className="text-right font-heading text-[15px] font-semibold text-foreground">{s.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div className="flex flex-col gap-3">
          <motion.span aria-hidden className="h-px origin-left"
            style={{ background: 'repeating-linear-gradient(90deg, var(--accent-strong) 0 1px, transparent 1px 8px)' }}
            animate={{ scaleX: hot ? 1 : 0 }} transition={{ duration: reduce ? 0.001 : 0.7, ease: WIPE }} />
          <span className="inline-flex items-center gap-2 font-heading text-[14.5px] font-semibold text-primary">
            {cta}
            <motion.span aria-hidden className="inline-flex" animate={{ x: hot ? 5 : 0 }} transition={{ duration: 0.38 }}>
              <ArrowRight size={15} strokeWidth={2} className="rtl-flip" />
            </motion.span>
          </span>
        </div>
        {children}
      </div>

      <motion.span ref={readout} aria-hidden
        className="pointer-events-none absolute bottom-3 right-3.5 z-[3] font-mono text-[10.5px] tracking-[0.08em] text-faint-foreground"
        animate={{ opacity: hot ? 1 : 0 }} transition={{ duration: 0.32 }}>
        X 000 · Y 000
      </motion.span>

      {href && <Link href={href} className="absolute inset-0 z-[4]" aria-label={`${title} - ${cta}`} />}
    </motion.article>
  );
}
