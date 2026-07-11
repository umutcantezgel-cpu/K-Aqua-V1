/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export const HorizontalTimeline = ({
  items,
  title,
  description,
  className,
}: {
  items: { year: string; title: string; text: string }[];
  title: string;
  description?: string;
  className?: string;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className={cn("relative h-[300vh] bg-background border-y border-card-border", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Intro Text Block fixed to the left */}
        <div className="absolute left-6 md:left-24 z-10 w-full max-w-md bg-background/80 backdrop-blur-md p-8 rounded-2xl border border-card-border shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-4">{title}</h2>
          {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
        </div>

        {/* Scrolling items */}
        <motion.div style={{ x }} className="flex gap-16 ps-[40vw] pe-[20vw]">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative w-[400px] h-[500px] flex-shrink-0 bg-card border border-card-border rounded-3xl p-10 flex flex-col justify-end overflow-hidden group shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />
              
              {/* Massive background number */}
              <div className="absolute top-4 right-4 text-8xl font-heading font-black text-muted-foreground/10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                {"0"}{index + 1}
              </div>

              <div className="relative z-20">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold mb-6">
                  {item.year}
                </span>
                <h3 className="text-3xl font-heading font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{item.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
