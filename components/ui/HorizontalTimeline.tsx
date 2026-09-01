/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils/cn';

export const HorizontalTimeline = ({
  items,
  events,
  title,
  description,
  className,
}: {
  items?: { year: string; title: string; text: string }[];
  events?: { year: string; title: string; description: string }[];
  title: string;
  description?: string;
  className?: string;
}) => {
  const finalItems = items || (events ? events.map(e => ({ year: e.year, title: e.title, text: e.description })) : []);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const CardContent = ({ item, index }: { item: { year: string; title: string; text: string }, index: number }) => (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10 pointer-events-none" />
      
      {/* Symmetrical, Golden-Ratio inspired number placement */}
      <div className="absolute top-8 right-8 flex items-center justify-center w-16 h-16 rounded-full bg-background-subtle border border-card-border shadow-sm z-20 group-hover:scale-105 transition-transform duration-500">
        <span className="font-heading font-bold text-xl text-primary">
          0{index + 1}
        </span>
      </div>

      <div className="relative z-20 h-full flex flex-col justify-end">
        <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold tracking-widest uppercase mb-6 w-max border border-primary/20">
          {item.year}
        </span>
        <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4 text-foreground balance-text">
          {item.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-[90%]">
          {item.text}
        </p>
      </div>
    </>
  );

  return (
    <section className={cn("bg-background border-y border-card-border relative", className)}>
      
      {/* Mobile Layout (Vertical Stack, no scroll-jacking) */}
      <div className="md:hidden py-20 px-6">
        <div className="mb-16">
          {title && <h2 className="text-4xl font-heading font-extrabold tracking-tight mb-6 text-foreground">{title}</h2>}
          {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
        </div>
        <div className="flex flex-col gap-8">
          {finalItems.map((item, index) => (
            <div
              key={index}
              className="relative w-full aspect-[1/1.618] max-h-[500px] bg-card border border-card-border rounded-3xl p-8 overflow-hidden group shadow-lg"
            >
              <CardContent item={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (Horizontal Scroll-jacking) */}
      <div ref={targetRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          
          {/* Intro Text Block fixed to the left */}
          <div className="absolute left-12 lg:left-24 z-30 w-full max-w-[400px] bg-background/90 backdrop-blur-xl p-10 rounded-[32px] border border-card-border shadow-2xl">
            {title && <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight mb-6 text-foreground">{title}</h2>}
            {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
          </div>

          {/* Scrolling items */}
          <motion.div style={{ x }} className="flex gap-12 ps-[500px] lg:ps-[600px] pe-[20vw]">
            {finalItems.map((item, index) => (
              <div
                key={index}
                className="relative w-[420px] aspect-[1/1.4] flex-shrink-0 bg-card border border-card-border rounded-[32px] p-10 overflow-hidden group shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <CardContent item={item} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};
