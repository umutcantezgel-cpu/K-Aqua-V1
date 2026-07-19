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
        "grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto",
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
        "rounded-2xl group/bento hover:shadow-2xl transition duration-500 bg-card border border-card-border overflow-hidden flex flex-col justify-between relative",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none z-10" />
      <div className="h-full w-full relative z-0">
        {header}
      </div>
      <div className="relative z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-background via-background/90 to-transparent">
        <div className="group-hover/bento:translate-x-2 transition duration-300 transform-gpu">
          {icon}
          <h3 className="font-heading font-bold text-2xl mb-2 mt-2 tracking-tight">
            {title}
          </h3>
          <div className="font-sans text-muted-foreground leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
