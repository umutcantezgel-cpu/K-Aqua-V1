/* eslint-disable */
'use client';
'use client';

/**
 * LiquidMagneticButton - CTA mit Magnet-Andockung und Flüssigkeits-Füllung.
 *
 * Zwei Bewegungsstimmen auf einem Element:
 *   · Magnetik  FLOW-Feder. Der Knopf zieht zum Cursor, das Label folgt mit
 *               halber Amplitude - dadurch entsteht Tiefe statt Verschiebung.
 *   · Presse    dieselbe Feder auf einem dritten Kanal. Ein Kanalbündel heisst:
 *               Andocken und Stauchen laufen nie gegeneinander.
 *
 * Die Rect-Messung passiert einmal beim Betreten, nicht pro Bewegung -
 * die Magnetik kostet damit keinen Reflow. Bewegt werden ausschliesslich
 * transform und opacity.
 *
 * Geometrie, Typografie und Zustände folgen exakt der kanonischen
 * Button-Definition des Design-Systems (.k-btn in kaqua-components.css,
 * components/core/Button.jsx): variant primary | ghost | inverse,
 * size sm | md | lg, 48 px Mindesthöhe in md, letter-spacing 0.01em,
 * disabled mit opacity 0.5 und ohne Interaktion.
 *
 * Kein globales CSS, keine Keyframes, keine neuen Pakete: Farben und Radien
 * kommen aus den semantischen Tailwind-Tokens (bg-primary, bg-accent,
 * rounded-lg, shadow-lift, font-heading), das Pfeil-Icon aus lucide-react.
 *
 * Verwendung:
 *   <LiquidMagneticButton fill="flood">Systemanfrage senden</LiquidMagneticButton>
 *   <LiquidMagneticButton variant="ghost" size="lg" fill="droplet">Datenblatt laden</LiquidMagneticButton>
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BLOB_RADII, FLOW_SPRING, SOFT, clamp } from './motion-physics';
import { FluidLink } from './FluidTransition';

export type LiquidFill = 'flood' | 'crest' | 'droplet';

export interface LiquidMagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  /** Art des Einlaufens. flood = steigt, crest = läuft quer, droplet = wächst aus dem Cursorpunkt. */
  fill?: LiquidFill;
  /** Maximaler Magnetweg in px (horizontal; vertikal 0,7-fach). */
  pull?: number;
  /** Dauer der Füllung in ms. */
  fillMs?: number;
  /** Wie .k-btn--*: gefüllte Markenfläche, Umriss oder invertiert. */
  variant?: 'primary' | 'ghost' | 'inverse';
  /** Wie .k-btn--*: 44 / 48 / 56 px Mindesthöhe. */
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

type Ripple = { id: number; x: number; y: number; scale: number };

const LIQUID = 'pointer-events-none absolute z-[1] bg-linear-175 from-accent-strong to-accent';

/* Geometrie exakt nach .k-btn (min-height / padding / font-size). */
const SIZES = {
  sm: 'min-h-11 px-4 text-[15px]',
  md: 'min-h-12 px-6 text-base',
  lg: 'min-h-14 px-8 text-[17px]'
} as const;

/* Farben werden NICHT transitioniert - dieselbe Regel wie im Design-System
   (Token-gebundene Farben blieben über einen [data-theme]-Wechsel hängen). */
const VARIANTS = {
  primary: 'border-0 bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift',
  ghost: 'border border-card-border bg-transparent text-foreground hover:border-primary hover:bg-primary-soft hover:text-primary',
  inverse: 'border-0 bg-inverse-foreground text-inverse-surface hover:shadow-lift'
} as const;

export default function LiquidMagneticButton({
  fill = 'flood',
  pull = 12,
  fillMs = 620,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  href,
  children,
  ...rest
}: LiquidMagneticButtonProps) {
  const reduce = useReducedMotion();
  const btn = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const box = useRef<DOMRect | null>(null);
  const submerge = useRef<number | null>(null);
  const [hot, setHot] = useState(false);
  const [wet, setWet] = useState(false);
  const [seed, setSeed] = useState({ x: 0, y: 0, d: 160, dir: -1 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useSpring(0, FLOW_SPRING);
  const y = useSpring(0, FLOW_SPRING);
  const press = useSpring(0, FLOW_SPRING);
  const scaleX = useTransform(press, (p) => 1 + p * 0.03);
  const scaleY = useTransform(press, (p) => 1 - p * 0.045);
  const labelX = useTransform(x, (v) => v * 0.5);
  const labelY = useTransform(y, (v) => v * 0.5);

  const onEnter = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    const r = btn.current?.getBoundingClientRect();
    if (!r || disabled) return;
    box.current = r;
    const px = e.clientX - r.left;
    setSeed({
      x: px,
      y: e.clientY - r.top,
      d: Math.ceil(Math.hypot(r.width, r.height) * 1.15),
      dir: px < r.width / 2 ? -1 : 1
    });
    setHot(true);
    // Der Text taucht ein, sobald die Füllung ihn erreicht - ein gesetzter
    // Zeitpunkt statt einer Farb-Transition (Design-System-Regel).
    if (submerge.current) window.clearTimeout(submerge.current);
    submerge.current = window.setTimeout(() => setWet(true), reduce ? 0 : fillMs * 0.45);
  }, [disabled, fillMs, reduce]);

  const onMove = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    const r = box.current;
    if (!r || reduce || disabled) return;
    x.set(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1) * pull);
    y.set(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1) * pull * 0.7);
  }, [disabled, pull, reduce, x, y]);

  const onLeave = useCallback(() => {
    if (submerge.current) window.clearTimeout(submerge.current);
    setHot(false);
    setWet(false);
    x.set(0);
    y.set(0);
    press.set(0);
  }, [press, x, y]);

  const onDown = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    press.set(1);
    const r = btn.current?.getBoundingClientRect();
    if (!r || reduce) return;
    const id = performance.now();
    setRipples((rs) => [...rs, {
      id,
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      scale: Math.ceil((Math.hypot(r.width, r.height) * 2) / 14)
    }]);
    window.setTimeout(() => setRipples((rs) => rs.filter((p) => p.id !== id)), fillMs + 160);
  }, [disabled, fillMs, press, reduce]);

  useEffect(() => () => { if (submerge.current) window.clearTimeout(submerge.current); }, []);

  const fillT = { duration: reduce ? 0.001 : fillMs / 1000, ease: SOFT };
  const wave = { repeat: Infinity, duration: 3.4, ease: 'linear' as const };

  const MotionComponent = href ? motion.a : motion.button;
  const commonProps = {
    ref: btn as any,
    type: href ? undefined : "button",
    href: href,
    style: { x, y, scaleX, scaleY },
    onPointerEnter: onEnter,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    onPointerDown: onDown,
    onPointerUp: () => press.set(0),
    disabled: disabled,
    className: [
      'group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden',
      'rounded-lg font-heading font-semibold tracking-[0.01em] transition-shadow duration-250',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
      SIZES[size], VARIANTS[variant], className
    ].join(' '),
    ...rest
  };

  const content = (
    <>
      {fill === 'flood' && (
        <motion.span aria-hidden className={`${LIQUID} inset-0`} initial={false}
          animate={{ y: hot ? '0%' : 'calc(101% + 22px)' }} transition={fillT}>
          <motion.span className="absolute -inset-x-[30%] -top-3 h-7 rounded-[50%] bg-accent-strong"
            animate={reduce ? undefined : { x: ['-6%', '6%', '-6%'], scaleY: [1, 0.82, 1] }} transition={wave} />
          <motion.span className="absolute -inset-x-[30%] -top-2 h-7 rounded-[50%] bg-accent opacity-55"
            animate={reduce ? undefined : { x: ['7%', '-7%', '7%'], scaleY: [0.9, 1.05, 0.9] }}
            transition={{ ...wave, duration: 2.3 }} />
        </motion.span>
      )}

      {fill === 'crest' && (
        <motion.span aria-hidden className={`${LIQUID} inset-0`} initial={false}
          animate={{ x: hot ? '0%' : `calc(${seed.dir * 101}% + ${seed.dir * 34}px)` }} transition={fillT}>
          <motion.span className="absolute -inset-y-[30%] -right-3.5 w-8 rounded-[50%] bg-accent"
            animate={reduce ? undefined : { y: ['-4%', '4%', '-4%'], scaleX: [1, 0.85, 1] }}
            transition={{ ...wave, duration: 2.8 }} />
        </motion.span>
      )}

      {fill === 'droplet' && (
        <motion.span aria-hidden className={LIQUID} initial={false}
          style={{ left: seed.x, top: seed.y, width: seed.d, height: seed.d, marginLeft: -seed.d / 2, marginTop: -seed.d / 2 }}
          animate={hot
            ? { scale: 1, borderRadius: [...BLOB_RADII, BLOB_RADII[0]] }
            : { scale: 0, borderRadius: BLOB_RADII[0] }}
          transition={{ scale: fillT, borderRadius: reduce ? { duration: 0 } : { repeat: Infinity, duration: 4.2, ease: 'easeInOut' } }} />
      )}

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span key={r.id} aria-hidden
            className="pointer-events-none absolute z-[2] -ml-[7px] -mt-[7px] h-3.5 w-3.5 rounded-full bg-inverse-surface"
            style={{ left: r.x, top: r.y }}
            initial={{ scale: 0, opacity: 0.34 }}
            animate={{ scale: r.scale, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fillMs / 1000, ease: SOFT }} />
        ))}
      </AnimatePresence>

      <motion.span
        style={{ x: labelX, y: labelY }}
        className={`relative z-[2] inline-flex items-center gap-2 ${wet ? 'text-inverse-foreground' : ''}`}
      >
        {children}
        <ArrowRight size={16} strokeWidth={2} aria-hidden className="rtl-flip" />
      </motion.span>
    </>
  );

  if (href) {
    return (
      <FluidLink href={href} passHref legacyBehavior>
        <MotionComponent {...commonProps as any}>{content}</MotionComponent>
      </FluidLink>
    );
  }

  return <MotionComponent {...commonProps as any}>{content}</MotionComponent>;
}
