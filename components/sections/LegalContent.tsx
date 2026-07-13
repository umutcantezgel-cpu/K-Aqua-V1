/* eslint-disable react/jsx-no-literals */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import * as Icons from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id?: string;
  title: string;
  icon?: string;
  tldr?: string;
  content: string;
}

interface Props {
  sections: Section[];
  title?: string;
}

export function LegalContent({ sections, title = "Inhalt" }: Props) {
  // Use index fallback if id is not present
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || 'section-0');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-12 lg:gap-24 items-start w-full">
      {/* Sticky Table of Contents */}
      <aside className="hidden lg:block sticky top-32">
        <Reveal>
          <div className="relative border-s border-card-border/50 ps-6">
            <h3 className="font-heading font-semibold text-foreground/50 text-xs uppercase tracking-widest mb-6">
              {title}
            </h3>
            <div className="flex flex-col gap-1 relative">
              {sections.map((section, idx) => {
                const id = section.id || `section-${idx}`;
                const isActive = activeId === id;
                // @ts-expect-error: Icons index signature is missing
                const IconComponent = section.icon && Icons[section.icon] ? Icons[section.icon] : Icons.ChevronRight;

                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleClick(e, id)}
                    className={clsx(
                      "group flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-300 relative",
                      isActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-[-25px] w-0.5 h-6 bg-primary rounded-r-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <IconComponent className={clsx("w-4 h-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground")} />
                    <span className="text-[13.5px] font-medium leading-tight">
                      {section.title.replace(/^[0-9]+\.\s*/, '')}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </aside>

      {/* Content Cards */}
      <div className="flex flex-col gap-12 w-full max-w-4xl">
        {sections.map((section, idx) => {
          const id = section.id || `section-${idx}`;
          // @ts-expect-error: Icons index signature is missing
          const IconComponent = section.icon && Icons[section.icon] ? Icons[section.icon] : Icons.Info;

          return (
            <Reveal key={id} delay={idx * 0.03}>
              <section 
                id={id} 
                ref={(el) => {
                  sectionRefs.current[id] = el;
                }}
                className="scroll-mt-32 group"
              >
                <div className="relative">
                  {/* Decorative background glow for active section */}
                  <AnimatePresence>
                    {activeId === id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -inset-4 bg-primary/3 rounded-[32px] -z-10 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-start gap-5 mb-8">
                    <div className={clsx(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm",
                      activeId === id 
                        ? "bg-primary text-white shadow-primary/20 scale-110" 
                        : "bg-background-subtle border border-card-border text-foreground/70 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20"
                    )}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="pt-2">
                      <h2 className="text-2xl font-heading font-bold text-foreground tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {section.tldr && (
                    <div className="mb-8 p-5 rounded-2xl bg-card border border-card-border/50 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/60" />
                      <div className="flex gap-3">
                        <Icons.Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-bold uppercase tracking-widest text-primary/80 mb-1">TL;DR</span>
                          <p className="text-foreground/90 font-medium text-[15px] leading-relaxed">
                            {section.tldr}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="prose prose-neutral dark:prose-invert max-w-none 
                                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[15px] 
                                prose-headings:font-heading prose-headings:text-foreground
                                prose-li:text-muted-foreground prose-li:text-[15px]
                                prose-strong:text-foreground prose-strong:font-semibold
                                marker:text-primary/50">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 whitespace-pre-wrap">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                {idx < sections.length - 1 && (
                  <hr className="mt-12 border-t border-card-border/50" />
                )}
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
