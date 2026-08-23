/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-no-literals */
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import {
  RotateCw,
  Scissors,
  Ruler,
  Maximize2,
  Minimize2,
  Download,
  RotateCcw,
  Box,
  Layers,
  Sparkles,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { GENERATED_SLUG_MAP } from '@/lib/3d/slug-map.generated';
import { SLUG_ALIASES } from '@/lib/3d/aliases';

// Die triviale Zuordnung entsteht aus der Registry (erzeugt), die
// redaktionellen Ausnahmen stehen daneben. Ein neues Produkt braucht damit
// keine Codeänderung mehr — es genügt, die Bibliothek zu aktualisieren und
// `node scripts/sync-3d-registry.mjs` laufen zu lassen.
const SLUG_TO_3D_ID: Record<string, string> = { ...GENERATED_SLUG_MAP, ...SLUG_ALIASES };

export interface Native3DCanvasProps {
  productId?: string; // e.g. "fittings/socket", "pipes/k-pipe-pp-r-sdr-6", "valves/pp-r-ball-valve-ball-in-pp"
  slug?: string;
  category?: string;
  initialSize?: number;
  onSizeChange?: (size: number) => void;
  onProductChange?: (product: any) => void;
  className?: string;
  heightClass?: string;
  showControls?: boolean;
  showSizeSelector?: boolean;
  autoRotateDefault?: boolean;
  basePath?: string;
}


/**
 * Ordnet einen Katalog-Slug einer 3D-Modul-ID zu.
 *
 * Gibt null zurück, wenn es für das Produkt (noch) kein Modell gibt. Vorher
 * fiel die Funktion auf 'fittings/socket' zurück — ein Produkt ohne Modell
 * zeigte damit stillschweigend eine Muffe, also ein anderes Bauteil. Für einen
 * maßhaltigen CAD-Viewer ist das schlechter als gar keine Darstellung.
 */
export function resolve3DProductId(slugOrId?: string): string | null {
  if (!slugOrId) return null;
  const clean = slugOrId.replace(/^.*\//, '').toLowerCase().trim();
  return SLUG_TO_3D_ID[clean] ?? SLUG_TO_3D_ID[slugOrId] ?? null;
}

export default function Native3DCanvas({
  productId,
  slug,
  category,
  initialSize,
  onSizeChange,
  onProductChange,
  className,
  heightClass = 'h-[440px] sm:h-[520px] lg:h-[600px]',
  showControls = true,
  showSizeSelector = true,
  autoRotateDefault = true,
  basePath = '/kaqua-3d',
}: Native3DCanvasProps) {
  const t = useTranslations('viewer3d');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const clipPlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 0, -1), 0));
  const activeProductModuleRef = useRef<any>(null);

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<number>(initialSize || 32);
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);
  const [isAutoRotate, setIsAutoRotate] = useState(autoRotateDefault);
  const [isSection, setIsSection] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [dimensionsList, setDimensionsList] = useState<Array<{ label: string; value: number }>>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Effective product ID to load
  const effectiveId = productId || resolve3DProductId(slug || category);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (35deg FOV for realistic isometric CAD inspection)
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.01, 100);
    camera.position.set(0.2, 0.18, 0.28);
    cameraRef.current = camera;

    // 3. Renderer with ACES Filmic Tone Mapping and Local Clipping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;

    // 4. OrbitControls with smooth damping
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 0.04;
    controls.maxDistance = 2.0;
    controls.autoRotate = autoRotateDefault;
    controls.autoRotateSpeed = 1.2;
    controls.enablePan = true;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup (Neutral Studio Rig)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.2);
    hemiLight.position.set(0, 5, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(1.5, 2.5, 2.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.75);
    fillLight.position.set(-2.0, -0.5, -1.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.1);
    rimLight.position.set(0, 2.0, -3.0);
    scene.add(rimLight);

    // 6. CAD Floor Grid
    const grid = new THREE.GridHelper(0.5, 20, 0x0284c7, 0x334155);
    grid.position.y = -0.05;
    (grid.material as THREE.Material).opacity = 0.18;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);

    // Animation Loop
    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;
      controls.update();
      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [autoRotateDefault]);

  // Load Product Geometry from Library
  const buildCurrentModel = useCallback(
    (product: any, size: number, sectionActive: boolean) => {
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!scene || !product || typeof product.build !== 'function') return;

      // Dispose existing model group
      if (currentGroupRef.current) {
        scene.remove(currentGroupRef.current);
        currentGroupRef.current.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m: any) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        currentGroupRef.current = null;
      }

      try {
        const clip = sectionActive ? clipPlaneRef.current : null;
        const assembly = product.build(size, null, clip);

        // mm to meters scaling
        const holder = new THREE.Group();
        holder.name = `k_aqua_${product.id}_d${size}`;
        holder.scale.setScalar(0.001);
        holder.add(assembly.root);

        // Center geometry
        const box = new THREE.Box3().setFromObject(holder);
        const center = box.getCenter(new THREE.Vector3());
        const sizeVec = box.getSize(new THREE.Vector3());
        holder.position.sub(center);

        scene.add(holder);
        currentGroupRef.current = holder;

        // Auto-frame camera based on bounding radius
        const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
        const distance = Math.max(0.12, maxDim * 2.8);
        if (camera && controls) {
          camera.position.set(distance * 0.7, distance * 0.55, distance * 0.85);
          controls.target.set(0, 0, 0);
          controls.minDistance = maxDim * 0.5;
          controls.maxDistance = maxDim * 8.0;
          controls.update();
        }

        // Extract dimension lines
        if (assembly.dims && Array.isArray(assembly.dims)) {
          setDimensionsList(
            assembly.dims.map((d: any) => ({
              label: d.label,
              value: typeof d.value === 'number' ? Math.round(d.value * 10) / 10 : d.value,
            }))
          );
        }
      } catch (err: any) {
        console.error('Error building 3D model:', err);
      }
    },
    []
  );

  // Fetch and Mount Product Module
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    if (!effectiveId) {
      // Kein Modell hinterlegt — das ist kein Fehler, sondern ein noch offener
      // Produktionsschritt. Wird als eigener Zustand angezeigt, nicht als Panne.
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const mod = await import(/* webpackIgnore: true */ `${basePath}/lib/index.mjs`);
        if (cancelled) return;

        const product = await mod.loadProduct(effectiveId);
        if (cancelled) return;

        activeProductModuleRef.current = product;
        setProductData(product);

        const sizes = product.sizes || [20, 25, 32, 40, 50, 63];
        setAvailableSizes(sizes);

        const initialD = sizes.includes(selectedSize) ? selectedSize : product.defaultSize || sizes[0];
        setSelectedSize(initialD);

        if (onProductChange) onProductChange(product);
        if (onSizeChange) onSizeChange(initialD);

        buildCurrentModel(product, initialD, isSection);
        setLoading(false);
      } catch (err: any) {
        if (!cancelled) {
          // "wird vorbereitet" las sich wie ein normaler Zwischenzustand und
          // verdeckte damit echte Ladefehler. Die Modul-ID und der Pfad gehören
          // in die Konsole, sonst ist im Betrieb nicht feststellbar, welches
          // Modell fehlt.
          console.error(
            `[3D] Produktmodul "${effectiveId}" konnte nicht geladen werden (Basis: ${basePath}).`,
            err
          );
          setError(effectiveId);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [effectiveId, basePath, buildCurrentModel, onProductChange, onSizeChange]);

  // Handle Size Switch
  const handleSelectSize = (d: number) => {
    setSelectedSize(d);
    if (onSizeChange) onSizeChange(d);
    if (activeProductModuleRef.current) {
      buildCurrentModel(activeProductModuleRef.current, d, isSection);
    }
  };

  // Handle Section Cut Toggle
  const handleToggleSection = () => {
    const next = !isSection;
    setIsSection(next);
    if (activeProductModuleRef.current) {
      buildCurrentModel(activeProductModuleRef.current, selectedSize, next);
    }
  };

  // Handle Wireframe Toggle
  const handleToggleWireframe = () => {
    const next = !isWireframe;
    setIsWireframe(next);
    if (currentGroupRef.current) {
      currentGroupRef.current.traverse((child: any) => {
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m: any) => (m.wireframe = next));
          } else {
            child.material.wireframe = next;
          }
        }
      });
    }
  };

  // Handle Auto Rotate Toggle
  const handleToggleAutoRotate = () => {
    const next = !isAutoRotate;
    setIsAutoRotate(next);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = next;
    }
  };

  // Reset Camera View
  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current && currentGroupRef.current) {
      const box = new THREE.Box3().setFromObject(currentGroupRef.current);
      const sizeVec = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
      const distance = Math.max(0.12, maxDim * 2.8);
      cameraRef.current.position.set(distance * 0.7, distance * 0.55, distance * 0.85);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Download GLTF/GLB or OBJ CAD file
  const handleExportCAD = (format: 'glb' | 'obj') => {
    if (!currentGroupRef.current || exporting) return;
    setExporting(true);

    const name = `K-Aqua_${productData?.titleEn || 'Product'}_d${selectedSize}`;

    if (format === 'glb') {
      const exporter = new GLTFExporter();
      exporter.parse(
        currentGroupRef.current,
        (gltf) => {
          const blob = new Blob([gltf as ArrayBuffer], { type: 'model/gltf-binary' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${name}.glb`;
          link.click();
          URL.revokeObjectURL(link.href);
          setExporting(false);
        },
        (err) => {
          console.error('GLTF export error:', err);
          setExporting(false);
        },
        { binary: true }
      );
    } else {
      const exporter = new OBJExporter();
      const result = exporter.parse(currentGroupRef.current);
      const blob = new Blob([result], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${name}.obj`;
      link.click();
      URL.revokeObjectURL(link.href);
      setExporting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-card/90 via-background to-card border border-card-border shadow-lift select-none flex flex-col',
        heightClass,
        className,
        isFullscreen && '!fixed !inset-0 !z-[9999] !h-screen !w-screen !rounded-none !border-0'
      )}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full flex-1 block touch-none cursor-grab active:cursor-grabbing outline-none"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/80 backdrop-blur-md gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-xs font-heading font-bold text-foreground">
            Lade maßhaltige 3D-CAD-Geometrie...
          </span>
        </div>
      )}

      {/* Error Fallback */}
      {!effectiveId && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 p-6 text-center">
          <Box className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <h4 className="text-sm font-heading font-bold text-foreground mb-1">{t('noModelTitle')}</h4>
          <p className="text-xs text-muted-foreground max-w-xs">{t('noModelHint')}</p>
        </div>
      )}

      {error && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 p-6 text-center">
          <Box className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <h4 className="text-sm font-heading font-bold text-foreground mb-1">{t('errorTitle')}</h4>
          <p className="text-xs text-muted-foreground max-w-xs">{t('errorHint')}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-2 font-mono">
            {t('errorModule', { id: error })}
          </p>
        </div>
      )}

      {/* Top Header Badge */}
      <div className="absolute top-3 start-3 sm:top-4 sm:start-4 pointer-events-none z-10 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-card-border text-foreground shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] sm:text-xs font-heading font-bold tracking-wide">
            {productData?.titleDe || '3D CAD Studio'}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-soft text-primary font-bold">
            d{selectedSize}
          </span>
        </div>
      </div>

      {/* Top Right Floating Toolbar */}
      {showControls && !loading && (
        <div className="absolute top-3 end-3 sm:top-4 sm:end-4 z-10 flex items-center gap-1.5 sm:gap-2">
          {/* Section Cut Toggle */}
          <button
            type="button"
            onClick={handleToggleSection}
            title={isSection ? t('sectionOff') : t('sectionOn')}
            aria-label={t('section')}
            className={clsx(
              'p-2 sm:p-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1.5',
              isSection
                ? 'bg-primary text-primary-foreground border-primary shadow-diffuse'
                : 'bg-background/80 hover:bg-card border-card-border text-foreground'
            )}
          >
            <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline text-[11px]">Halbschnitt</span>
          </button>

          {/* Dimension Lines Toggle */}
          <button
            type="button"
            onClick={() => setShowDimensions(!showDimensions)}
            title={t('dimensions')}
            aria-label={t('dimensions')}
            className={clsx(
              'p-2 sm:p-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1.5',
              showDimensions
                ? 'bg-primary text-primary-foreground border-primary shadow-diffuse'
                : 'bg-background/80 hover:bg-card border-card-border text-foreground'
            )}
          >
            <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline text-[11px]">Bemaßung</span>
          </button>

          {/* Auto-Rotate Turntable Toggle */}
          <button
            type="button"
            onClick={handleToggleAutoRotate}
            title={isAutoRotate ? t('rotateStop') : t('rotateStart')}
            aria-label={t('rotate')}
            className={clsx(
              'p-2 sm:p-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1.5',
              isAutoRotate
                ? 'bg-secondary text-secondary-foreground border-secondary shadow-sm'
                : 'bg-background/80 hover:bg-card border-card-border text-foreground'
            )}
          >
            <RotateCw className={clsx('w-3.5 h-3.5 sm:w-4 sm:h-4', isAutoRotate && 'animate-spin-slow')} />
          </button>

          {/* Wireframe Toggle */}
          <button
            type="button"
            onClick={handleToggleWireframe}
            title={t('wireframeToggle')}
            aria-label={t('wireframe')}
            className={clsx(
              'p-2 sm:p-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md hidden sm:flex items-center gap-1.5',
              isWireframe
                ? 'bg-card text-primary border-primary'
                : 'bg-background/80 hover:bg-card border-card-border text-foreground'
            )}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={handleResetCamera}
            title={t('center')}
            aria-label={t('center')}
            className="p-2 sm:p-2.5 rounded-xl bg-background/80 hover:bg-card border border-card-border text-foreground text-xs shadow-sm cursor-pointer backdrop-blur-md transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* CAD Export Dropdown */}
          <div className="relative group">
            <button
              type="button"
              title={t('exportCad')}
              aria-label={t('exportCad')}
              className="p-2 sm:p-2.5 rounded-xl bg-background/80 hover:bg-card border border-card-border text-foreground text-xs font-bold shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="hidden lg:inline text-[11px]">CAD</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
            <div className="absolute end-0 top-full mt-1.5 w-36 bg-card border border-card-border rounded-xl shadow-xl p-1.5 hidden group-hover:flex flex-col gap-1 z-30">
              <button
                type="button"
                onClick={() => handleExportCAD('glb')}
                className="w-full text-start px-2.5 py-1.5 rounded-lg hover:bg-primary-soft hover:text-primary text-xs font-semibold text-foreground transition-colors cursor-pointer"
              >
                GLTF / GLB (.glb)
              </button>
              <button
                type="button"
                onClick={() => handleExportCAD('obj')}
                className="w-full text-start px-2.5 py-1.5 rounded-lg hover:bg-primary-soft hover:text-primary text-xs font-semibold text-foreground transition-colors cursor-pointer"
              >
                Wavefront (.obj)
              </button>
            </div>
          </div>

          {/* Fullscreen Expand Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? t('fullscreenExit') : t('fullscreen')}
            aria-label={t('fullscreen')}
            className="p-2 sm:p-2.5 rounded-xl bg-background/80 hover:bg-card border border-card-border text-foreground text-xs shadow-sm cursor-pointer backdrop-blur-md transition-all"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      )}

      {/* Dimensions Overlay Tag Box */}
      {showDimensions && dimensionsList.length > 0 && (
        <div className="absolute top-14 start-3 sm:top-16 sm:start-4 z-10 p-3 rounded-2xl bg-card/90 backdrop-blur-md border border-card-border shadow-lg max-w-xs animate-reveal">
          <div className="text-[10px] font-mono uppercase text-primary font-bold mb-1.5 flex items-center gap-1">
            <Ruler className="w-3 h-3" /> CAD-Bemaßung (mm)
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
            {dimensionsList.map((dim, idx) => (
              <div key={idx} className="flex items-center justify-between font-mono">
                <span className="text-muted-foreground">{dim.label}:</span>
                <span className="font-bold text-foreground">{dim.value} mm</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Size Switcher Strip (Unified Native Controls) */}
      {showSizeSelector && availableSizes.length > 1 && (
        <div className="absolute bottom-3 start-3 end-3 sm:bottom-4 sm:start-4 sm:end-4 z-10 flex items-center justify-between gap-2 p-2 rounded-2xl bg-background/85 backdrop-blur-md border border-card-border shadow-sm overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-heading font-bold text-foreground pe-2 border-e border-card-border">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>{t('nominalSize')}</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {availableSizes.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleSelectSize(d)}
                className={clsx(
                  'px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer',
                  selectedSize === d
                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                    : 'bg-card hover:bg-card-border/50 text-foreground border border-card-border'
                )}
              >
                d{d}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground shrink-0 ps-2 border-s border-card-border">
            <span>360° Touch / Maus</span>
          </div>
        </div>
      )}
    </div>
  );
}
