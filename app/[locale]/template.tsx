'use client';

import { ReactNode, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Droplet } from '@/components/ui/icon';

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add('anim-ok');
  }, []);

  const isReduced = shouldReduceMotion === true;
  const showOverlay = mounted && isTransitioning && !isReduced;

  // Content fade-in animation variants
  const contentVariants = {
    initial: {
      opacity: 0,
      y: isReduced ? 0 : 14,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1], // ease-out-soft
      },
    },
  };

  // Wipe overlay animation variants
  const overlayVariants = {
    initial: {
      y: '100%',
      borderTopLeftRadius: '40% 8%',
      borderTopRightRadius: '40% 8%',
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
    },
    animate: {
      y: ['100%', '0%', '-100%'],
      borderTopLeftRadius: ['40% 8%', '0px', '0px'],
      borderTopRightRadius: ['40% 8%', '0px', '0px'],
      borderBottomLeftRadius: ['0px', '0px', '40% 8%'],
      borderBottomRightRadius: ['0px', '0px', '40% 8%'],
      transition: {
        duration: 0.82,
        ease: [0.76, 0, 0.24, 1], // --ease-wipe
        times: [0, 0.5, 1],
      },
    },
  };

  // Droplet icon animation variants
  const dropletVariants = {
    initial: {
      scale: 0.6,
      opacity: 0,
    },
    animate: {
      scale: [0.6, 1.0, 1.0, 1.25],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 0.82,
        ease: [0.76, 0, 0.24, 1], // --ease-wipe
        times: [0, 0.42, 0.58, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        {children}
      </motion.div>

      {showOverlay && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          onAnimationComplete={() => setIsTransitioning(false)}
          className="fixed inset-0 z-50 bg-[var(--inverse-surface)] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            variants={dropletVariants}
            initial="initial"
            animate="animate"
            className="text-[var(--inverse-foreground)]"
          >
            <Droplet size={56} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
