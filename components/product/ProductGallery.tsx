/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Box, Layers, Sparkles, ExternalLink, Camera } from 'lucide-react';
import clsx from 'clsx';
import { Link } from '@/lib/i18n/navigation';
import Native3DCanvas from '@/components/3d/Native3DCanvasLazy';
import { CATALOG_TOTAL } from '@/lib/3d/slug-map.generated';

interface Props {
  category: string;
  slug?: string;
  title?: string;
  /**
   * Produktfotos aus `images:` der Frontmatter, in gepflegter Reihenfolge:
   * erst die Leitaufnahme, dann die weiteren Ansichten.
   *
   * Der zweite Reiter war eine vorgebaute Naht ohne Inhalt — ein Verlauf mit
   * Box-Symbol, weil es keine freigegebenen Aufnahmen gab. Aus dem
   * Marketing-Archiv sind jetzt für 35 Produkte Fotos abgeleitet.
   *
   * Fehlen sie, bleibt der bisherige Platzhalter stehen: Für Werkzeuge und
   * Zubehör existieren im Archiv keine Aufnahmen, und ein leerer Bildrahmen
   * wäre schlechter als der erklärende Hinweis auf das 3D-Modell.
   */
  photos?: string[];
}

export default function ProductGallery({ category, slug, title, photos = [] }: Props) {
  const hasPhotos = photos.length > 0;
  const [viewMode, setViewMode] = useState<'3d' | 'studio1'>('3d');
  const [selectedSize, setSelectedSize] = useState<number>(32);
  const [activePhoto, setActivePhoto] = useState<number>(0);

  const cleanSlug = slug || category;

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
            <Box className="w-4 h-4" />
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
            {hasPhotos ? <Camera className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            <span>
              {hasPhotos
                ? `Produktfotos (${photos.length})`
                : 'Technische Übersicht'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/3d"
            className="text-xs font-semibold text-primary hover:text-primary-strong flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alle {CATALOG_TOTAL} Produkte im 3D Studio</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>
        </div>
      </div>

      {/* Main Display Box */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {viewMode === '3d' ? (
            <motion.div
              key="3d-viewer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <Native3DCanvas
                slug={cleanSlug}
                category={category}
                initialSize={selectedSize}
                onSizeChange={(s) => setSelectedSize(s)}
                heightClass="h-[380px] sm:h-[460px] lg:h-[520px]"
                showControls={true}
                showSizeSelector={true}
                autoRotateDefault={true}
              />
            </motion.div>
          ) : (
            <motion.div
              key="studio-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {hasPhotos ? (
                <div className="flex flex-col gap-3">
                  {/* Leitaufnahme. `sizes` deckelt die ausgelieferte Breite —
                      die Quelldateien sind 900 px, ohne Angabe lieferte Next
                      die volle Viewportbreite aus. */}
                  <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-2xl sm:rounded-3xl border border-card-border overflow-hidden bg-background-subtle">
                    <Image
                      src={photos[activePhoto] ?? photos[0] ?? ''}
                      alt={title || cleanSlug}
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="object-contain p-4"
                      priority={false}
                    />
                  </div>

                  {photos.length > 1 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {photos.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActivePhoto(i)}
                          aria-label={`Ansicht ${i + 1} von ${photos.length}`}
                          aria-current={i === activePhoto}
                          className={clsx(
                            'relative w-16 h-16 rounded-xl overflow-hidden border transition-all cursor-pointer bg-background-subtle',
                            i === activePhoto
                              ? 'border-primary ring-2 ring-primary/30'
                              : 'border-card-border hover:border-primary/50'
                          )}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-2xl sm:rounded-3xl border border-card-border flex flex-col items-center justify-center bg-gradient-to-br from-card via-background to-primary-soft/20 p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-inner">
                    <Box className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-foreground mb-1">
                    {title || cleanSlug.toUpperCase()}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mb-4 max-w-sm">
                    K-Aqua DIN 8077/8078 &amp; DIN EN ISO 15874 CAD-Präzisionsgeometrie · 100% maßhaltig
                  </p>
                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-diffuse hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <Box className="w-4 h-4" />
                    <span>Interaktives 3D-Modell öffnen</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
