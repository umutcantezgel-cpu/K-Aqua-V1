/* eslint-disable react/jsx-no-literals */
'use client';

import React from "react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

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

  if (actualContent.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full py-8">
      {actualContent.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
        >
          {item.content && (
            <div className={cn("h-48 w-full bg-background-subtle flex items-center justify-center p-6 border-b border-card-border overflow-hidden relative", contentClassName)}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {item.content}
            </div>
          )}
          <div className="p-6 lg:p-8 flex-1 flex flex-col">
            <h3 className="text-xl font-bold font-heading text-foreground mb-4 leading-snug">{item.title}</h3>
            <div className="text-muted-foreground text-base leading-relaxed">
              {item.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
