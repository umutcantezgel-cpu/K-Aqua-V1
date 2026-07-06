"use client";

import React from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "motion/react";

export interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  children: React.ReactNode;
  delay?: number;
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ children, delay = 0, className, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    const initial = shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 22 };

    const whileInView = shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0 };

    return (
      <motion.div
        ref={ref}
        initial={initial}
        whileInView={whileInView}
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
      </motion.div>
    );
  }
);

Reveal.displayName = "Reveal";
