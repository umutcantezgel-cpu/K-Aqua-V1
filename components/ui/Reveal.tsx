"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

export interface RevealProps extends Omit<HTMLMotionProps<any>, "initial" | "whileInView" | "viewport" | "transition"> {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
}

export const Reveal = React.forwardRef<HTMLElement, RevealProps>(
  ({ children, delay = 0, className, as = "div", ...props }, ref) => {
    const Component = motion.create(as as any) as any;
    return (
      <Component
        ref={ref}
        initial={{ opacity: 0, y: 22 }}
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
