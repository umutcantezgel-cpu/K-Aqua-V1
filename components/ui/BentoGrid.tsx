'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:gap-12 w-full max-w-full mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  colSpan = 1,
  rowSpan = 1,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl group/bento hover:shadow-2xl transition duration-500 bg-card border border-card-border overflow-hidden flex flex-col md:flex-row w-full",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 pointer-events-none z-10 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      {header && (
        <div className="w-full md:w-1/3 lg:w-1/4 relative z-0 min-h-[250px] shrink-0 border-b md:border-b-0 md:border-r border-card-border bg-background-subtle flex items-center justify-center overflow-hidden">
          {header}
        </div>
      )}
      <div className="relative z-20 p-8 lg:p-12 flex-1 flex flex-col justify-center">
        <div className="group-hover/bento:translate-x-2 transition duration-300 transform-gpu">
          {icon}
          {title && (
            <div className="font-heading font-bold text-2xl lg:text-3xl mb-4 mt-4 tracking-tight text-foreground">
              {title}
            </div>
          )}
          <div className="font-sans text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
