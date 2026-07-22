/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export const StickyScrollReveal = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string | React.ReactNode;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc]!)) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      ref={ref}
      className="relative flex flex-col lg:flex-row gap-10 lg:gap-16 rounded-2xl p-6 lg:p-10 bg-background border border-card-border"
    >
      <div className="relative flex items-start px-2 lg:px-4">
        <div className="max-w-xl w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="min-h-[70vh] flex flex-col justify-center py-10">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-3xl font-heading font-bold text-foreground"
              >
                {item.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-lg text-muted-foreground mt-6 max-w-sm leading-relaxed"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block w-[40rem] shrink-0">
        <div
          className={cn(
            "h-[30rem] rounded-2xl bg-card border border-card-border sticky top-(--header-h) overflow-hidden shadow-2xl",
            contentClassName
          )}
        >
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            {content[activeCard]!.content ?? (
              <div className="text-muted-foreground/50 font-heading tracking-widest uppercase">
                {"Visual Asset Placeholder "}{activeCard + 1}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
