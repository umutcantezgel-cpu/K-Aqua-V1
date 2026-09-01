 
'use client';

import React from "react";
import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "motion/react";
import { useRevealSafety } from "@/components/ui/Reveal";

export const StickyScrollReveal = ({
  content,
  items,
  contentClassName,
}: {
  content?: {
    title: string;
    description: string | React.ReactNode;
    content?: React.ReactNode;
  }[];
  items?: {
    title: string;
    description: string | React.ReactNode;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const actualContent = content || items || [];
  const forceVisible = useRevealSafety();
  // Siehe Reveal.tsx: die CSS-Regel fuer prefers-reduced-motion erreicht die
  // Inline-Styles von motion nicht, der Startwert muss hier entfallen.
  const reduced = useReducedMotion();

  if (actualContent.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 lg:gap-12 w-full py-8">
      {actualContent.map((item, index) => (
        <motion.div 
          key={index}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={forceVisible ? { opacity: 1, y: 0 } : undefined}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col md:flex-row bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group w-full"
        >
          {item.content && (
            <div className={cn("w-full md:w-1/3 lg:w-1/4 min-h-[200px] bg-background-subtle flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-card-border overflow-hidden relative shrink-0", contentClassName)}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {item.content}
            </div>
          )}
          <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-4 leading-snug">{item.title}</h3>
            <div className="text-muted-foreground text-lg leading-relaxed max-w-4xl">
              {item.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
