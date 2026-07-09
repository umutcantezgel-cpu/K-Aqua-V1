"use client";

import React, { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export interface AnimatedCounterProps {
  /**
   * The numeric value to animate to.
   */
  value: number;
  /**
   * Formatting function to convert the numeric value to a display string.
   */
  formatFn: (val: number) => string;
  /**
   * Optional CSS class.
   */
  className?: string;
}

export function AnimatedCounter({ value, formatFn, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Initialize with the true value so that initial render matches SSR
  // and we don't get hydration mismatch warnings.
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 150,
  });

  useEffect(() => {
    // When the 'value' prop changes (e.g. from a slider), update the target
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    // Listen to spring changes and update the DOM node directly for maximum performance
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatFn(latest);
      }
    });
  }, [springValue, formatFn]);

  // Initial SSR / Client render
  return (
    <span ref={ref} className={className}>
      {formatFn(value)}
    </span>
  );
}
