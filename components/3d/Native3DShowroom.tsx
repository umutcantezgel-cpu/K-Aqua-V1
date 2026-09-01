/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-no-literals */
'use client';

import React, { useState, useMemo } from 'react';
// `resolve3DProductId` kommt jetzt aus `lib/3d/resolve` — die reine
// Zuordnungsfunktion soll kein three.js ins Bundle ziehen. Der Viewer selbst
// wird über die Lazy-Fassung nachgeladen.
import Native3DCanvas from '@/components/3d/Native3DCanvasLazy';
import { resolve3DProductId } from '@/lib/3d/resolve';
import { useTranslations } from 'next-intl';
// @ts-expect-error - registry is an untyped mjs module
import { REGISTRY } from '@/kaqua-3d/dist/lib/registry.mjs';
import { Link } from '@/lib/i18n/navigation';
import {
  Box,
  Search,
  CheckCircle,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Download,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import clsx from 'clsx';
import { PIPE_STOCK_LENGTH_M } from '@/lib/data/catalog';

interface Native3DShowroomProps {
  locale: string;
}

const CATEGORIES = [
  { id: 'all', labelDe: 'Alle Produkte', labelEn: 'All Products' },
  { id: 'pipes', labelDe: 'Rohre', labelEn: 'Pipes' },
  { id: 'fittings', labelDe: 'Formteile', labelEn: 'Fittings' },
  { id: 'valves', labelDe: 'Armaturen', labelEn: 'Valves' },
  { id: 'transition-fittings', labelDe: 'Übergänge', labelEn: 'Transitions' },
  { id: 'accessories', labelDe: 'Zubehör & Flansche', labelEn: 'Accessories' },
];

export default function Native3DShowroom({ locale }: Native3DShowroomProps) {
  const t = useTranslations('viewer3d');
  const isDe = locale === 'de';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState(REGISTRY[1]); // Default to Cap / Socket
  const [selectedSize, setSelectedSize] = useState<number>(32);
  const [productData, setProductData] = useState<any>(null);

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return REGISTRY.filter((item: any) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.titleDe.toLowerCase().includes(query) ||
        item.titleEn.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  // Current active article for dimensions table
  // Rohre sind Meterware, alle anderen Kategorien sind Stueckware.
  const istRohr = activeItem?.category === 'pipes';

  const activeArticle = useMemo(() => {
    if (!productData || !productData.articles) return null;
    return (
      productData.articles.find((a: any) => a.d === selectedSize) ||
      productData.articles[0] ||
      null
    );
  }, [productData, selectedSize]);

  // Canonical product URL on the website
  const getProductHref = (item: any) => {
    return `/produkte/${item.category}/${item.slug}`;
  };

  return (
    <div className="w-full">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 bg-background border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-mono font-bold mb-4 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>K-AQUA 3D CAD STUDIO · DIN 8077 / 8078 / ISO 15874</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground tracking-tight">
                {isDe ? 'Interaktiver 3D-Produkt-Showroom' : 'Interactive 3D Product Showroom'}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {isDe
                  ? 'Erkunden Sie das vollständige K-Aqua Rohr- und Formteilsortiment als maßhaltige, drehbare 3D-CAD-Modelle mit Halbschnitt-Analyse, Maßkontrolle und CAD-Export.'
                  : 'Explore the complete K-Aqua pipe and fitting system as true-to-scale, rotatable 3D CAD models with cross-section analysis, dimension inspection, and CAD export.'}
              </p>
            </div>

            {/* Engineering Badges */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-card-border text-xs font-medium text-foreground shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{t('accurate')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-card-border text-xs font-medium text-foreground shadow-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>{t('madeInGermany')}</span>
              </div>
            </div>
          </div>

          {/* Category Filter Pills & Search Bar */}
          <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all shrink-0 cursor-pointer',
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-card hover:bg-card-border/50 text-muted-foreground hover:text-foreground border border-card-border'
                  )}
                >
                  {isDe ? cat.labelDe : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder={isDe ? 'Produkt oder Artikel suchen...' : 'Search product or code...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-9 pe-4 py-2 rounded-xl bg-card border border-card-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN 3D STUDIO & TECHNICAL DATA SECTION */}
      <section className="py-8 sm:py-12 bg-background-subtle">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            
            {/* Left: Native 3D WebGL Canvas */}
            <div className="w-full flex flex-col gap-3">
              <Native3DCanvas
                key={activeItem.id}
                productId={activeItem.id}
                heightClass="h-[min(70dvh,560px)] sm:h-[min(85dvh,520px)] lg:h-[min(85dvh,600px)]"
                onProductChange={(p) => setProductData(p)}
                onSizeChange={(s) => setSelectedSize(s)}
                showControls={true}
                showSizeSelector={true}
                autoRotateDefault={true}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
                <span className="flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-primary" />
                  <span>{t('hint')}</span>
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground/80">
                  ID: {activeItem.id}
                </span>
              </div>
            </div>

            {/* Right: Technical Specification & Info Card */}
            <div className="flex flex-col gap-6 bg-card border border-card-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg bg-primary-soft text-primary font-bold">
                    {activeItem.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    DIN 8077/8078 · ISO 15874
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
                  {isDe ? activeItem.titleDe : activeItem.titleEn}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {isDe
                    ? 'Homogenes Polypropylen-Random-Copolymer (PP-R / PP-RCT) mit höchster chemischer Resistenz und Druckfestigkeit.'
                    : 'Homogeneous polypropylene random copolymer (PP-R / PP-RCT) with highest chemical resistance and pressure rating.'}
                </p>
              </div>

              {/* Size Selector in Info Card */}
              {productData?.sizes && productData.sizes.length > 0 && (
                <div>
                  <label className="text-xs font-heading font-bold text-foreground block mb-2 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                    <span>{isDe ? 'Verfügbare Nennweiten (d)' : 'Available Diameters (d)'}:</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {productData.sizes.map((d: number) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedSize(d)}
                        className={clsx(
                          'px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer',
                          selectedSize === d
                            ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                            : 'bg-background hover:bg-card-border/50 text-foreground border border-card-border'
                        )}
                      >
                        d{d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Technical Data Table */}
              <div className="border border-card-border rounded-2xl overflow-hidden bg-background">
                <div className="px-4 py-2.5 bg-background-subtle border-b border-card-border flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-foreground flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-primary" />
                    {isDe ? `Technische Maße für d${selectedSize}` : `Technical Dimensions for d${selectedSize}`}
                  </span>
                  {activeArticle?.code && (
                    <span className="text-[11px] font-mono font-bold text-primary">
                      Art.-Nr. {activeArticle.code}
                    </span>
                  )}
                </div>

                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[11px]">Nennmaß (d)</span>
                    <span className="text-sm font-bold text-foreground">{selectedSize} mm</span>
                  </div>
                  {activeArticle?.D && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[11px]">Außendurchmesser (D)</span>
                      <span className="text-sm font-bold text-foreground">{activeArticle.D} mm</span>
                    </div>
                  )}
                  {activeArticle?.l && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[11px]">Gesamtlänge (l)</span>
                      <span className="text-sm font-bold text-foreground">{activeArticle.l} mm</span>
                    </div>
                  )}
                  {activeArticle?.z && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[11px]">Muffenanschlag (z)</span>
                      <span className="text-sm font-bold text-foreground">{activeArticle.z} mm</span>
                    </div>
                  )}
                  {activeArticle?.s && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[11px]">Wandstärke (s)</span>
                      <span className="text-sm font-bold text-foreground">{activeArticle.s} mm</span>
                    </div>
                  )}
                  {/*
                    Rohre sind Meterware, alles andere ist Stückware.
                    Der Block darunter zeigte für JEDES Bauteil „Gewicht / Stk"
                    und „{pack} Stk." — bei Rohren ist beides falsch: sie führen
                    kein Stückgewicht (`kg` fehlt, es gibt `kgm` in kg/m), und
                    `pack` zählt keine Stücke, sondern 4-Meter-Stangen je Bund.
                    Verkauft und angefragt wird nach Metern.
                  */}
                  {istRohr ? (
                    <>
                      {activeArticle?.kgm && (
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[11px]">Gewicht</span>
                          <span className="text-sm font-bold text-foreground">{activeArticle.kgm} kg/m</span>
                        </div>
                      )}
                      {activeArticle?.lm && (
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[11px]">Wasserinhalt</span>
                          <span className="text-sm font-bold text-foreground">{activeArticle.lm} l/m</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[11px]">Lieferlänge</span>
                        <span className="text-sm font-bold text-foreground">
                          {PIPE_STOCK_LENGTH_M} m
                        </span>
                      </div>
                      {activeArticle?.pack && (
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[11px]">Bundgröße</span>
                          <span className="text-sm font-bold text-foreground">
                            {activeArticle.pack * PIPE_STOCK_LENGTH_M} m
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {activeArticle?.kg && (
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[11px]">Gewicht / Stk</span>
                          <span className="text-sm font-bold text-foreground">{activeArticle.kg} kg</span>
                        </div>
                      )}
                      {activeArticle?.pack && (
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[11px]">Verpackungseinheit</span>
                          <span className="text-sm font-bold text-foreground">{activeArticle.pack} Stk.</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {istRohr && (
                  <div className="px-4 pb-4 -mt-1">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {isDe
                        ? 'Standardlänge 4 m je Stange. Andere Längen auf Anfrage.'
                        : 'Standard length 4 m per bar. Other lengths on request.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={getProductHref(activeItem)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold text-sm shadow-diffuse transition-all"
                >
                  <span>{isDe ? 'Zur Produktdetailseite' : 'View Product Details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/projektanfrage"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card hover:bg-card-border/40 border border-card-border text-foreground font-heading font-bold text-sm transition-all"
                >
                  <span>{isDe ? 'Angebot anfragen' : 'Request Quote'}</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID (ALL 3D MODELS) */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">
                {isDe ? 'Alle 3D-CAD-Modelle im Überblick' : 'All 3D CAD Models Overview'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isDe
                  ? `${filteredProducts.length} Modelle verfügbar — Klicken Sie auf ein Produkt, um es sofort in 3D zu laden.`
                  : `${filteredProducts.length} models available — Click on any product to load it instantly in 3D.`}
              </p>
            </div>
          </div>

          {/* Grid of Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((item: any) => {
              const isSelected = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className={clsx(
                    'group relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4',
                    isSelected
                      ? 'bg-primary-soft/30 border-primary shadow-md ring-2 ring-primary/40'
                      : 'bg-card hover:bg-card/90 border-card-border hover:border-primary/50 shadow-sm hover:shadow-md'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-background border border-card-border text-muted-foreground font-semibold">
                      {item.category}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-bold">
                        <Sparkles className="w-2.5 h-2.5" /> Aktiv
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      {isDe ? item.titleDe : item.titleEn}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {item.slug}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-card-border flex items-center justify-between gap-2 text-xs">
                    <span className="text-primary font-heading font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>{t('loadIn3d')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <Link
                      href={getProductHref(item)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground p-1 hover:bg-background rounded-lg transition-colors"
                      title={t('toProductPage')}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
