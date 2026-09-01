"use client";

import React from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "motion/react";

/**
 * Sicherheitsnetz für die Scroll-Reveals.
 *
 * Jeder Reveal startet auf `opacity: 0` — das steht so auch im
 * server-gerenderten HTML — und wird erst sichtbar, wenn
 * IntersectionObserver anschlägt. Über die Website hinweg hängen daran rund
 * 550 Inhaltsblöcke, inklusive der H1 der Startseite. Antwortet der Observer
 * nicht (fehlende API, restriktive Browser-Umgebung, ein Tab der nicht
 * gerendert wird, fehlgeschlagene Hydration), bliebe der gesamte Text
 * dauerhaft unsichtbar.
 *
 * Deshalb prüfen wir einmalig pro Seitenaufruf, ob der Observer überhaupt
 * antwortet, und schalten andernfalls alle Reveals auf sichtbar. Antwortet er
 * normal, ändert sich nichts — die Animation läuft wie zuvor. Die Animation
 * ist Beiwerk, der Inhalt ist das Produkt.
 */
let observerBroken = false;
let probeStarted = false;
const subscribers = new Set<() => void>();

function markBroken() {
  if (observerBroken) return;
  observerBroken = true;
  subscribers.forEach((notify) => notify());
  subscribers.clear();
}

function probeObserver() {
  if (probeStarted || typeof window === "undefined") return;
  probeStarted = true;

  if (typeof IntersectionObserver === "undefined") {
    markBroken();
    return;
  }

  const probe = document.createElement("div");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none";
  document.body.appendChild(probe);

  let answered = false;
  const io = new IntersectionObserver(() => {
    answered = true;
    io.disconnect();
    probe.remove();
    subscribers.clear();
  });
  io.observe(probe);

  window.setTimeout(() => {
    if (answered) return;
    io.disconnect();
    probe.remove();
    markBroken();
  }, 700);
}

/**
 * Für Komponenten mit eigenem `whileInView`, die nicht über <Reveal> laufen:
 * liefert `true`, sobald feststeht, dass der IntersectionObserver nicht
 * antwortet — dann muss der Inhalt ohne Scroll-Trigger sichtbar werden.
 */
export function useRevealSafety(): boolean {
  const [forceVisible, setForceVisible] = React.useState(false);

  React.useEffect(() => {
    if (observerBroken) {
      setForceVisible(true);
      return;
    }
    probeObserver();
    const notify = () => setForceVisible(true);
    subscribers.add(notify);
    return () => {
      subscribers.delete(notify);
    };
  }, []);

  return forceVisible;
}

/**
 * Zweites Netz, diesmal je Element statt global.
 *
 * Der Probe-Riegel oben erkennt nur einen Observer, der gar nicht antwortet.
 * Er kann den Fall nicht sehen, der uns tatsächlich getroffen hat: ein Observer,
 * der einwandfrei antwortet, dessen Schwellwert aber nie erreicht wird. Das
 * passiert, sobald ein Element höher ist als Viewport ÷ Schwellwert — der
 * maximal erreichbare Anteil ist Viewporthöhe ÷ Elementhöhe, und darüber kommt
 * er nicht. Auf Geräten mit kurzem CSS-Viewport (Surface läuft ab Werk auf
 * 200 % Skalierung) blieb dadurch der gesamte technische Teil der
 * Produktseiten dauerhaft auf `opacity: 0`.
 *
 * Der Schwellwert ist unten entschärft, aber die Fehlerklasse bleibt: jeder
 * Reveal, der aus irgendeinem Grund nicht auslöst, obwohl er im Bild steht,
 * wird hier nach kurzer Frist zwangsweise sichtbar. Vorbild ist die lokale
 * Reveal-Fassung im CO₂-Dashboard (`components/tools/co2-dashboard/Co2UI.tsx`),
 * die genau diese Rect-Prüfung schon macht.
 */
function useRevealWatchdog(
  ref: React.RefObject<HTMLElement | null>,
  alreadyVisible: boolean
): boolean {
  const [rescued, setRescued] = React.useState(false);

  React.useEffect(() => {
    if (alreadyVisible || rescued) return;
    /* Die Prüfung lief bis hierher genau einmal, 1500 ms nach dem
       Einhängen. Damit schützte das Netz nur, was beim Laden ohnehin schon
       im Bild stand — auf einer Produktseite ist das die Überschrift, und
       der gesamte technische Teil darunter fiel heraus. Genau der Teil war
       auf dem Surface unsichtbar geblieben.

       Jetzt prüft es auch beim Scrollen und bei Größenänderungen. Es bleibt
       dabei ein NETZ und wird nicht zum Auslöser: gemessen wird erst nach
       einer Frist, und gerettet wird nur, wenn das Element dann immer noch
       durchsichtig ist. Hat `whileInView` normal ausgelöst, steht die
       Deckkraft nach 1200 ms längst auf 1 und hier passiert nichts. */
    let frist = 0;
    let geplant = false;

    const messen = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Oberkante bereits im Bild und Unterkante noch nicht vorbei: das Element
      // ist sichtbar und hätte längst eingeblendet sein müssen.
      if (r.top >= window.innerHeight || r.bottom <= 0) return;
      if (parseFloat(window.getComputedStyle(el).opacity) > 0.9) return;
      setRescued(true);
    };

    const fristSetzen = () => {
      if (frist) return;
      frist = window.setTimeout(() => {
        frist = 0;
        messen();
      }, 1200);
    };

    // Auf einen rAF gebündelt, damit ein Scroll nicht je Ereignis misst.
    const anstossen = () => {
      if (geplant) return;
      geplant = true;
      window.requestAnimationFrame(() => {
        geplant = false;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) fristSetzen();
      });
    };

    const id = window.setTimeout(messen, 1500);
    window.addEventListener("scroll", anstossen, { passive: true });
    window.addEventListener("resize", anstossen, { passive: true });
    return () => {
      window.clearTimeout(id);
      if (frist) window.clearTimeout(frist);
      window.removeEventListener("scroll", anstossen);
      window.removeEventListener("resize", anstossen);
    };
  }, [ref, alreadyVisible, rescued]);

  return rescued;
}

export interface RevealProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
}

export const Reveal = React.forwardRef<HTMLElement, RevealProps>(
  ({ children, delay = 0, className, as = "div", ...props }, ref) => {
    const observerBrokenNow = useRevealSafety();

    /* Wer weniger Bewegung eingestellt hat, bekommt den Inhalt sofort und ohne
       Beobachter. Die Regel in app/globals.css greift hier nicht: motion
       animiert über Inline-Styles, und `opacity: 0` als Startwert ist keine
       Animationsdauer, die sich auf 0,01 ms kürzen ließe. */
    const reduced = useReducedMotion();

    const innerRef = React.useRef<HTMLElement | null>(null);
    const rescued = useRevealWatchdog(innerRef, observerBrokenNow || !!reduced);
    const forceVisible = observerBrokenNow || rescued;

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      [ref]
    );

    // motion.create() ist über ein dynamisches `as` nicht präzise typisierbar;
    // ohne diese Ausnahme verengt TS die JSX-Props auf `never`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = motion.create(as as any) as any;
    return (
      <Component
        ref={setRefs}
        initial={reduced ? false : { opacity: 0, y: 22 }}
        animate={forceVisible ? { opacity: 1, y: 0 } : undefined}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        /* `amount` ist hier bewusst NICHT gesetzt.
           Ein numerischer Wert wird unverändert als IntersectionObserver-
           `threshold` durchgereicht, und der misst den Anteil an der
           ELEMENTHÖHE. Bei `amount: 0.15` konnte jedes Element, das höher als
           das 6,67-fache des Viewports ist, den Schwellwert rechnerisch nie
           erreichen — der Inhalt blieb dauerhaft unsichtbar. `margin`
           verkleinert stattdessen die Wurzelbox, unabhängig von der
           Elementhöhe: der Effekt bleibt, die Falle ist weg. */
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Reveal.displayName = "Reveal";
