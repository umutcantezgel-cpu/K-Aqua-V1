/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Maximize2, RotateCw, Layers, Sparkles, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { Link } from '@/lib/i18n/navigation';

interface Props {
  category: string;
  slug?: string;
  title?: string;
}

export default function ProductGallery({ category, slug, title }: Props) {
  const [viewMode, setViewMode] = useState<'3d' | 'studio1' | 'studio2'>('3d');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const cleanSlug = slug || category;
  const viewerUrl = `/api/3d-view/${cleanSlug}`;

  return (
    <div className="w-full flex flex-col gap-4 select-none">
      {/* View Mode Switcher */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 p-1 bg-background-subtle rounded-xl border border-card-border">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={clsx(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer',
              viewMode === '3d'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Box className="w-4 h-4 animate-spin-slow" />
            <span>3D CAD Modell (360°)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('studio1')}
            className={clsx(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer',
              viewMode === 'studio1'
                ? 'bg-card text-foreground shadow-sm border border-card-border'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Layers className="w-4 h-4" />
            <span>Studio Ansicht</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/3d"
            className="text-xs font-semibold text-primary hover:text-primary-strong flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alle 70 Produkte in 3D</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>
        </div>
      </div>

      {/* Main Display Box */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-card-border shadow-lift bg-card group">
        <AnimatePresence mode="wait">
          {viewMode === '3d' ? (
            <motion.div
              key="3d-viewer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              {/* Interactive 3D Iframe */}
              <iframe
                src={viewerUrl}
                title={`${title || cleanSlug} 3D CAD Modell`}
                className="w-full h-full border-0 bg-card"
                loading="eager"
                allow="fullscreen"
              />

              {/* Interaction Hint Overlay */}
              <div className="absolute top-4 start-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-card-border text-[11px] font-heading font-bold text-foreground shadow-sm">
                <RotateCw className="w-3.5 h-3.5 text-primary animate-spin-slow" />
                <span>360° Drehen · Scrollen zum Zoomen</span>
              </div>

              {/* Expand to Fullscreen button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                title="Vollbild 3D-Inspektion"
                aria-label="Vollbild 3D-Inspektion"
                className="absolute top-4 end-4 p-2.5 rounded-xl bg-background/80 backdrop-blur-md hover:bg-card border border-card-border text-foreground shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="studio-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card via-background to-primary-soft/20 p-8 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-inner">
                <Box className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                {title || cleanSlug.toUpperCase()}
              </h3>
              <p className="text-xs font-mono text-muted-foreground mb-4">
                K-Aqua DIN 8077/8078 &amp; ISO 15874 CAD Geometrie
              </p>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary-hover transition-all cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Interaktives 3D-Modell starten</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen 3D Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-background/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl h-[85vh] bg-card border-2 border-card-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 px-6 border-b border-card-border flex items-center justify-between bg-card/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-base">
                      {title || cleanSlug} — 3D CAD Studio
                    </h3>
                    <p className="text-xs text-muted-foreground">Maßhaltige 3D-Vorschau mit Nennweiten &amp; Querschnitt</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="px-4 py-2 rounded-xl bg-background-subtle hover:bg-card-border/50 text-foreground text-xs font-bold border border-card-border transition-colors cursor-pointer"
                >
                  Schließen (Esc)
                </button>
              </div>

              <div className="flex-1 w-full h-full relative">
                <iframe
                  src={viewerUrl}
                  title={`${title || cleanSlug} 3D CAD Vollbild`}
                  className="w-full h-full border-0 bg-card"
                  allow="fullscreen"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
