"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

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

export interface RevealProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
}

export const Reveal = React.forwardRef<HTMLElement, RevealProps>(
  ({ children, delay = 0, className, as = "div", ...props }, ref) => {
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

    // motion.create() ist über ein dynamisches `as` nicht präzise typisierbar;
    // ohne diese Ausnahme verengt TS die JSX-Props auf `never`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = motion.create(as as any) as any;
    return (
      <Component
        ref={ref}
        initial={{ opacity: 0, y: 22 }}
        animate={forceVisible ? { opacity: 1, y: 0 } : undefined}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
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
