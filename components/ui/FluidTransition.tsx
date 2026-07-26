/* eslint-disable */
'use client';
'use client';

/**
 * FluidTransition — Wasser-Maske über dem Routenwechsel.
 *
 * Vier Phasen:
 *   idle → in     Aus dem geklickten Navigationspunkt wächst ein Tropfen,
 *                 bis er die Seite deckt. Der Akzentrand läuft voraus, der
 *                 Markenkern folgt 80 ms später — Brechungs-Eindruck ohne Shader.
 *   in → hold     router.push. Ein Halte-Frame, damit die neue Route malt,
 *                 bevor die Maske aufgeht (kein Aufblitzen der alten Seite).
 *   hold → out    Die Maske zieht sich zum NEUEN, jetzt aktiven Menüpunkt
 *                 zurück. Das Wasser fliesst dorthin, wo man jetzt steht.
 *   out → idle    Overlay unmountet, Router-Prefetch bleibt unberührt.
 *
 * Architektur: bewusst DOM (zwei transformierte Blobs, ein Draw-Layer) statt
 * WebGL. Eine Vollbild-Maske braucht keine Shader, und ein Canvas mitten im
 * Routenwechsel wäre der teuerste denkbare Moment für einen GL-Kontext.
 *
 * Einbindung — Provider EINMAL im Locale-Layout, danach FluidLink statt Link:
 *
 *   import { FluidTransitionProvider } from '@/components/ui/FluidTransition';
 *   ...
 *   <FluidTransitionProvider>{children}</FluidTransitionProvider>
 *
 *   import { FluidLink } from '@/components/ui/FluidTransition';
 *   <FluidLink href="/de/systeme">Systeme</FluidLink>
 *
 * Bei prefers-reduced-motion: reduce navigiert FluidLink sofort und ohne
 * Overlay — identisch zu next/link.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { AnchorHTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BLOB_RADII, MASK } from './motion-physics';

type Origin = { x: number; y: number };
type Phase = 'idle' | 'in' | 'hold' | 'out';

interface FluidCtx {
  navigate: (href: string, origin: Origin) => void;
  register: (href: string, el: HTMLElement | null) => void;
  busy: boolean;
}

const Ctx = createContext<FluidCtx | null>(null);

/** Programmatische Navigation mit derselben Maske (z. B. nach einem Formular). */
export function useFluidTransition() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFluidTransition muss innerhalb von <FluidTransitionProvider> stehen.');
  return ctx;
}

const centerOf = (el: HTMLElement): Origin => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

export function FluidTransitionProvider({ children, durationMs = 760 }: { children: ReactNode; durationMs?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('idle');
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });
  const [diameter, setDiameter] = useState(2400);

  const targets = useRef(new Map<string, HTMLElement>());
  const pending = useRef<string | null>(null);
  const fallback = useRef<number | null>(null);

  const register = useCallback((href: string, el: HTMLElement | null) => {
    if (el) targets.current.set(href, el);
    else targets.current.delete(href);
  }, []);

  const retract = useCallback((href: string | null) => {
    const el = href ? targets.current.get(href) : null;
    if (el) setOrigin(centerOf(el));
    setPhase('out');
    window.setTimeout(() => setPhase('idle'), durationMs + 220);
  }, [durationMs]);

  const navigate = useCallback((href: string, from: Origin) => {
    if (phase !== 'idle') return;
    if (reduce) { router.push(href); return; }
    setOrigin(from);
    setDiameter(Math.ceil(Math.max(window.innerWidth, window.innerHeight) * 3));
    pending.current = href;
    setPhase('in');
    window.setTimeout(() => {
      setPhase('hold');
      router.push(href);
      // Notausgang: sollte die Route ausbleiben (blockierte Navigation,
      // gleicher Pfad nach Normalisierung), geht die Maske trotzdem auf.
      fallback.current = window.setTimeout(() => { pending.current = null; retract(href); }, 1200);
    }, durationMs);
  }, [durationMs, phase, reduce, retract, router]);

  // Die neue Route ist gemalt → Maske zum neuen Ziel zurückziehen.
  useEffect(() => {
    if (!pending.current) return;
    const href = pending.current;
    pending.current = null;
    if (fallback.current) { window.clearTimeout(fallback.current); fallback.current = null; }
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => retract(href)));
    return () => cancelAnimationFrame(raf);
  }, [pathname, retract]);

  useEffect(() => () => { if (fallback.current) window.clearTimeout(fallback.current); }, []);

  const ctx = useMemo<FluidCtx>(() => ({ navigate, register, busy: phase !== 'idle' }), [navigate, register, phase]);

  const covering = phase === 'in' || phase === 'hold';
  const blob = {
    position: 'absolute' as const,
    left: origin.x, top: origin.y,
    width: diameter, height: diameter,
    marginLeft: -diameter / 2, marginTop: -diameter / 2
  };

  return (
    <Ctx.Provider value={ctx}>
      {children}
      <AnimatePresence>
        {phase !== 'idle' && (
          <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] overflow-hidden" style={{ contain: 'strict' }}>
            {/* Akzentrand — läuft voraus, weichgezeichnet */}
            <motion.span style={{ ...blob, background: 'var(--accent)', filter: 'blur(12px)' }}
              initial={{ scale: 0, rotate: 0, borderRadius: BLOB_RADII[0] }}
              animate={{ scale: covering ? 1 : 0, rotate: covering ? 14 : 0, borderRadius: covering ? '50%' : BLOB_RADII[1] }}
              transition={{ duration: durationMs / 1000, ease: MASK, delay: phase === 'out' ? 0.09 : 0 }} />
            {/* Markenkern — folgt 80 ms später */}
            <motion.span style={{ ...blob, background: 'var(--primary)' }}
              initial={{ scale: 0, rotate: 0, borderRadius: BLOB_RADII[0] }}
              animate={{ scale: covering ? 1 : 0, rotate: covering ? 14 : 0, borderRadius: covering ? '50%' : BLOB_RADII[1] }}
              transition={{ duration: durationMs / 1000, ease: MASK, delay: phase === 'in' ? 0.08 : 0 }} />
          </div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export interface FluidLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * Ersatz für next/link in der Hauptnavigation. Verhält sich bei
 * Mittelklick, Cmd/Ctrl-Klick, target="_blank" und externen Zielen wie ein
 * normaler Link — die Maske greift nur bei der einfachen Links-Navigation.
 */
export function FluidLink({ href, children, onClick, ...rest }: FluidLinkProps) {
  const ctx = useContext(Ctx);
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const external = /^([a-z]+:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('/pdf/');

  useEffect(() => {
    if (!ctx || external) return;
    ctx.register(href, ref.current);
    return () => ctx.register(href, null);
  }, [ctx, external, href]);

  const handle = useCallback((e: ReactMouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!ctx || external || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== '_self') return;
    if (href === pathname) { e.preventDefault(); return; }
    e.preventDefault();
    const r = e.currentTarget.getBoundingClientRect();
    ctx.navigate(href, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }, [ctx, external, href, onClick, pathname, rest.target]);

  return (
    <Link ref={ref} href={href} onClick={handle}
      aria-current={href === pathname ? 'page' : undefined} {...rest}>
      {children}
    </Link>
  );
}

export default FluidTransitionProvider;
