'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export const ParallaxHero = ({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-card-border bg-background",
        className
      )}
    >
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,var(--primary-soft)_0%,transparent_100%)] opacity-30 pointer-events-none"
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Abstract shapes / grids could go here */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)]" />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-[1400px] mx-auto w-full px-6 flex flex-col items-center text-center gap-6"
      >
        {eyebrow && (
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading font-bold text-sm tracking-widest uppercase text-primary"
          >
            {eyebrow}
          </motion.span>
        )}
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl lg:text-8xl font-heading font-extrabold tracking-tight leading-[1.05]"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mt-4 max-w-3xl"
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
