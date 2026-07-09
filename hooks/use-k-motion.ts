import { useReducedMotion } from 'framer-motion';

/**
 * A hook that returns true if animations should be skipped (A11y).
 */
export function useKMotion() {
  const shouldReduceMotion = useReducedMotion();
  return { shouldReduceMotion };
}

export const kMotionVariants = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};
