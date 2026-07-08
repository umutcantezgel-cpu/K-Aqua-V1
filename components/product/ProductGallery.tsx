/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  category: string;
}

export default function ProductGallery({ category }: Props) {
  // We don't have real images yet, so we generate high-end procedural placeholders
  // using CSS gradients that look like premium studio shots.
  const placeholders = [
    'bg-gradient-to-br from-card to-background-subtle border border-card-border',
    'bg-gradient-to-tr from-primary-soft/40 to-background border border-card-border',
    'bg-gradient-to-bl from-card to-background border border-card-border'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % placeholders.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + placeholders.length) % placeholders.length);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={clsx('w-full h-full flex items-center justify-center', placeholders[currentIndex])}
          >
            {/* Placeholder graphic */}
            <div className="flex flex-col items-center justify-center opacity-30 text-foreground">
              <ImageIcon className="w-20 h-20 mb-4" />
              <span className="font-heading font-semibold text-lg">{category.toUpperCase()} Studio Shot {currentIndex + 1}</span>
              <span className="text-sm font-mono mt-2">placeholder_{currentIndex + 1}.webp</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={prevImage}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md text-foreground flex items-center justify-center border border-card-border pointer-events-auto hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md text-foreground flex items-center justify-center border border-card-border pointer-events-auto hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md text-foreground flex items-center justify-center border border-card-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background shadow-sm">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails row */}
      <div className="grid grid-cols-3 gap-4">
        {placeholders.map((bg, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={clsx(
              'relative w-full aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300',
              bg,
              currentIndex === idx ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-60 hover:opacity-100 cursor-pointer'
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <ImageIcon className="w-6 h-6" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
