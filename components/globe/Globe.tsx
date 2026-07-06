'use client';

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useReducedMotion } from 'motion/react';

export interface GlobeMarker {
  lon: number;
  lat: number;
  title: string;
  label?: string;
  // internal fields for coordinates detection
  _sx?: number | null;
  _sy?: number | null;
}

export interface GlobeProps {
  size?: number;
  markers?: GlobeMarker[];
  interactive?: boolean;
  speed?: number;
  whirl?: boolean;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onDrag?: () => void;
}

export interface GlobeRef {
  flyTo: (lon: number, lat: number) => void;
  setActive?: (title: string | null) => void;
}

interface FlyToAnimation {
  startTime: number;
  duration: number;
  startDragOffset: number;
  startTilt: number;
  targetLon: number;
  targetLatRad: number;
}

const COLOR = '#5B2D8C';
const TILT = -0.32;
const TILT_MAX = 1.45;

interface TopoJSON {
  transform?: {
    scale: [number, number];
    translate: [number, number];
  };
  arcs?: number[][][];
}

function decodeTopo(topo: TopoJSON): [number, number][][] {
  if (!topo || !topo.transform || !topo.arcs) return [];
  const tr = topo.transform;
  const sx = tr.scale[0];
  const sy = tr.scale[1];
  const tx = tr.translate[0];
  const ty = tr.translate[1];
  const lines: [number, number][][] = [];
  for (let i = 0; i < topo.arcs.length; i++) {
    const arc = topo.arcs[i];
    if (!arc) continue;
    let x = 0;
    let y = 0;
    const line: [number, number][] = [];
    for (let j = 0; j < arc.length; j++) {
      const pt = arc[j];
      if (!pt) continue;
      const pt0 = pt[0];
      const pt1 = pt[1];
      if (pt0 === undefined || pt1 === undefined) continue;
      x += pt0;
      y += pt1;
      line.push([x * sx + tx, y * sy + ty]);
    }
    if (line.length > 1) {
      lines.push(line);
    }
  }
  return lines;
}

function graticuleLines(): [number, number][][] {
  const lines: [number, number][][] = [];
  let lon: number;
  let lat: number;
  let line: [number, number][];
  for (lon = -180; lon < 180; lon += 30) {
    line = [];
    for (lat = -80; lat <= 80; lat += 5) line.push([lon, lat]);
    lines.push(line);
  }
  for (lat = -60; lat <= 60; lat += 30) {
    line = [];
    for (lon = -180; lon <= 180; lon += 5) line.push([lon, lat]);
    lines.push(line);
  }
  return lines;
}

const fallbackLines = graticuleLines();

let globalWorldLines: [number, number][][] | null = null;
let globalFetchPromise: Promise<[number, number][][]> | null = null;

function fetchWorldLines(): Promise<[number, number][][]> {
  if (globalWorldLines) return Promise.resolve(globalWorldLines);
  if (globalFetchPromise) return globalFetchPromise;
  globalFetchPromise = fetch('/data/countries-110m.json')
    .then((r) => {
      if (!r.ok) throw new Error('Failed to load map data');
      return r.json();
    })
    .then((topo) => {
      const decoded = decodeTopo(topo);
      globalWorldLines = decoded;
      return decoded;
    })
    .catch((err) => {
      console.error('Error loading world map lines:', err);
      return [];
    });
  return globalFetchPromise;
}

function project(
  lon: number,
  lat: number,
  rotDeg: number,
  cT: number,
  sT: number
) {
  const lam = ((lon + rotDeg) * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const cp = Math.cos(phi);
  const x = cp * Math.sin(lam);
  const y = Math.sin(phi);
  const z = cp * Math.cos(lam);
  return { x: x, y: y * cT - z * sT, z: y * sT + z * cT };
}

function normDeg(a: number): number {
  return (((a + 180) % 360) + 360) % 360 - 180;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const Globe = forwardRef<GlobeRef, GlobeProps>(
  (
    {
      size = 200,
      markers = [],
      interactive = false,
      speed = 0.028,
      whirl = false,
      onMarkerClick,
      onDrag,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const motionPreference = useReducedMotion();
    const shouldReduceMotion = motionPreference === true;

    // Use refs for dynamic props to keep requestAnimationFrame clean and avoid stale closures
    const markersRef = useRef(markers);
    const interactiveRef = useRef(interactive);
    const speedRef = useRef(speed);
    const whirlRef = useRef(whirl);
    const onMarkerClickRef = useRef(onMarkerClick);
    const onDragRef = useRef(onDrag);
    const shouldReduceMotionRef = useRef(shouldReduceMotion);

    // Keep state of offsets/tilts to make it editable across frames
    const dragOffsetRef = useRef(0);
    const tiltRef = useRef(TILT);
    const runningRef = useRef(true);
    const currentSizeRef = useRef(size);
    const loopRunningRef = useRef(false);

    // Animation transition refs
    const flyToAnimRef = useRef<FlyToAnimation | null>(null);
    const immediateTargetRef = useRef<{ lon: number; latRad: number } | null>(null);

    // Track active hover marker
    const activeMarkerRef = useRef<GlobeMarker | null>(null);

    // Sync refs
    useEffect(() => {
      markersRef.current = markers;
    }, [markers]);

    useEffect(() => {
      interactiveRef.current = interactive;
    }, [interactive]);

    useEffect(() => {
      speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
      whirlRef.current = whirl;
    }, [whirl]);

    useEffect(() => {
      onMarkerClickRef.current = onMarkerClick;
    }, [onMarkerClick]);

    useEffect(() => {
      onDragRef.current = onDrag;
    }, [onDrag]);

    useEffect(() => {
      shouldReduceMotionRef.current = shouldReduceMotion;
    }, [shouldReduceMotion]);

    // Expose flyTo method
    useImperativeHandle(ref, () => ({
      flyTo: (lon: number, lat: number) => {
        const targetLatRad = Math.max(-TILT_MAX, Math.min(TILT_MAX, (lat * Math.PI) / 180));
        if (shouldReduceMotionRef.current) {
          flyToAnimRef.current = null;
          immediateTargetRef.current = { lon, latRad: targetLatRad };
        } else {
          flyToAnimRef.current = {
            startTime: -1,
            duration: 900,
            startDragOffset: dragOffsetRef.current,
            startTilt: tiltRef.current,
            targetLon: lon,
            targetLatRad,
          };
        }
      },
      setActive: (title: string | null) => {
        const found = markersRef.current.find((m) => m.title === title);
        activeMarkerRef.current = found || null;
      },
    }));

    // Main Canvas effect
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      runningRef.current = true;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Interaction variables
      let dragging = false;
      let dragStartX = 0;
      let dragStartY = 0;
      let dragStartOffset = 0;
      let dragStartTilt = 0;
      let prevX = 0;
      let prevY = 0;
      let velX = 0;
      let velY = 0;

      function clampTilt(v: number) {
        return Math.max(-TILT_MAX, Math.min(TILT_MAX, v));
      }

      function drawWhirl(t: number) {
        if (!ctx) return;
        const currentSize = currentSizeRef.current;
        const cx = currentSize / 2;
        const cy = currentSize / 2;
        const R = Math.round(currentSize * 0.31);
        const trails = [
          { r: R + R * 0.21, speed: 0.0016, span: 1.9, width: 2.0, phase: 0 },
          { r: R + R * 0.34, speed: -0.0011, span: 1.4, width: 1.5, phase: 2.4 },
          { r: R + R * 0.47, speed: 0.0007, span: 2.3, width: 1.0, phase: 4.2 },
        ];
        trails.forEach((tr) => {
          const head = tr.phase + t * tr.speed;
          const steps = 26;
          for (let i = 0; i < steps; i++) {
            const a0 = head - (i / steps) * tr.span;
            const a1 = head - ((i + 1) / steps) * tr.span;
            ctx.beginPath();
            ctx.arc(cx, cy, tr.r, a1, a0);
            ctx.strokeStyle = COLOR;
            ctx.globalAlpha = 0.55 * (1 - i / steps);
            ctx.lineWidth = tr.width * (1 - 0.6 * (i / steps));
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      }

      function drawGlobe(t: number) {
        if (!ctx) return;
        const currentSize = currentSizeRef.current;
        const cx = currentSize / 2;
        const cy = currentSize / 2;
        const R = Math.round(currentSize * 0.31);
        const currentSpeed = shouldReduceMotionRef.current ? 0 : speedRef.current;
        const rot = t * currentSpeed + dragOffsetRef.current;
        const cT = Math.cos(tiltRef.current);
        const sT = Math.sin(tiltRef.current);

        // sphere fill + rim
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(91, 45, 140, 0.05)';
        ctx.fill();
        ctx.strokeStyle = COLOR;
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.globalAlpha = 1;

        const lines = globalWorldLines || fallbackLines;
        ctx.strokeStyle = COLOR;
        ctx.lineWidth = Math.max(0.65, (R / 95) * 0.65);
        ctx.globalAlpha = 0.85;
        ctx.lineJoin = 'round';

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (!line) continue;
          let started = false;
          ctx.beginPath();
          for (let j = 0; j < line.length; j++) {
            const pt = line[j];
            if (!pt) continue;
            const pt0 = pt[0];
            const pt1 = pt[1];
            if (pt0 === undefined || pt1 === undefined) continue;
            const p = project(pt0, pt1, rot, cT, sT);
            if (p.z > 0.02) {
              const px = cx + p.x * R;
              const py = cy - p.y * R;
              if (started) ctx.lineTo(px, py);
              else {
                ctx.moveTo(px, py);
                started = true;
              }
            } else {
              started = false;
            }
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // markers
        const activeMarker = activeMarkerRef.current;
        const currentMarkers = markersRef.current;
        for (let m = 0; m < currentMarkers.length; m++) {
          const mk = currentMarkers[m];
          if (!mk) continue;
          const mp = project(mk.lon, mk.lat, rot, cT, sT);
          if (mp.z <= 0.05) {
            mk._sx = null;
            continue;
          }
          const mx = cx + mp.x * R;
          const my = cy - mp.y * R;
          mk._sx = mx;
          mk._sy = my;

          const isHovered = activeMarker && activeMarker.title === mk.title;
          ctx.beginPath();
          ctx.arc(mx, my, isHovered ? 7 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = COLOR;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(mx, my, isHovered ? 12 : 9, 0, Math.PI * 2);
          ctx.strokeStyle = COLOR;
          ctx.globalAlpha = 0.4;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;

          if (isHovered && mk.label) {
            ctx.font = '600 13px Inter, sans-serif';
            const tw = ctx.measureText(mk.label).width;
            const lx = Math.min(Math.max(mx + 16, 8), currentSize - tw - 16);
            const ly = my - 14;
            ctx.fillStyle = 'rgba(10, 10, 15, 0.78)';
            ctx.beginPath();
            ctx.roundRect(lx - 7, ly - 14, tw + 14, 22, 6);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillText(mk.label, lx, ly + 2);
          }
        }
      }

      function loop(t: number) {
        if (!runningRef.current || !ctx || !loopRunningRef.current) return;

        const currentSpeed = shouldReduceMotionRef.current ? 0 : speedRef.current;

        if (!dragging) {
          if (flyToAnimRef.current) {
            const anim = flyToAnimRef.current;
            if (anim.startTime === -1) {
              anim.startTime = t;
            }
            const elapsed = t - anim.startTime;
            if (elapsed >= anim.duration) {
              dragOffsetRef.current = -anim.targetLon - t * currentSpeed;
              tiltRef.current = anim.targetLatRad;
              flyToAnimRef.current = null;
            } else {
              const p = elapsed / anim.duration;
              const e = easeInOutCubic(p);
              const targetDragOffsetStart = -anim.targetLon - anim.startTime * currentSpeed;
              const diff = normDeg(targetDragOffsetStart - anim.startDragOffset);
              dragOffsetRef.current = anim.startDragOffset + diff * e - (t - anim.startTime) * currentSpeed;
              tiltRef.current = anim.startTilt + (anim.targetLatRad - anim.startTilt) * e;
            }
          } else if (immediateTargetRef.current) {
            const target = immediateTargetRef.current;
            dragOffsetRef.current = -target.lon - t * currentSpeed;
            tiltRef.current = target.latRad;
            immediateTargetRef.current = null;
          }

          // inertia after release (disable if reduced motion)
          const decay = shouldReduceMotionRef.current ? 0 : 0.95;
          if (!flyToAnimRef.current) {
            if (Math.abs(velX) > 0.01) {
              dragOffsetRef.current += velX;
              velX *= decay;
            }
            if (Math.abs(velY) > 0.0004) {
              tiltRef.current = clampTilt(tiltRef.current + velY);
              velY *= decay;
            }
          }
        }

        const currentSize = currentSizeRef.current;
        ctx.clearRect(0, 0, currentSize, currentSize);
        if (whirlRef.current) {
          drawWhirl(t);
        }
        drawGlobe(t);

        requestAnimationFrame(loop);
      }

      // ResizeObserver setup
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const rect = entry.contentRect;
        const width = rect.width || entry.target.getBoundingClientRect().width;
        currentSizeRef.current = width;

        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        canvas.width = width * dpr;
        canvas.height = width * dpr;

        const context = canvas.getContext('2d');
        if (context) {
          context.scale(dpr, dpr);
        }
      });
      resizeObserver.observe(canvas);

      // IntersectionObserver setup
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        const isIntersecting = entry ? entry.isIntersecting : false;
        if (isIntersecting) {
          fetchWorldLines().then(() => {
            if (!loopRunningRef.current && runningRef.current) {
              loopRunningRef.current = true;
              requestAnimationFrame(loop);
            }
          });
        } else {
          loopRunningRef.current = false;
        }
      }, { threshold: 0 });
      intersectionObserver.observe(canvas);

      // Event Listeners for drag interaction
      const handlePointerDown = (e: PointerEvent) => {
        if (!interactiveRef.current) return;
        dragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragStartOffset = dragOffsetRef.current;
        dragStartTilt = tiltRef.current;
        prevX = e.clientX;
        prevY = e.clientY;
        velX = 0;
        velY = 0;
        // Cancel ongoing flyTo
        flyToAnimRef.current = null;
        immediateTargetRef.current = null;

        if (canvas) {
          canvas.style.cursor = 'grabbing';
          try {
            canvas.setPointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!interactiveRef.current) return;
        const rect = canvas.getBoundingClientRect();
        if (dragging) {
          dragOffsetRef.current = dragStartOffset + (e.clientX - dragStartX) * 0.45;
          tiltRef.current = clampTilt(dragStartTilt + (e.clientY - dragStartY) * 0.008);
          // Only calculate momentum if not using reduced motion
          if (!shouldReduceMotionRef.current) {
            velX = (e.clientX - prevX) * 0.45 * 0.55;
            velY = (e.clientY - prevY) * 0.008 * 0.55;
          } else {
            velX = 0;
            velY = 0;
          }
          prevX = e.clientX;
          prevY = e.clientY;

          if (onDragRef.current) {
            onDragRef.current();
          }
          return;
        }

        // Hover detection
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        let hit: GlobeMarker | null = null;
        const currentMarkers = markersRef.current;
        for (let i = 0; i < currentMarkers.length; i++) {
          const mk = currentMarkers[i];
          if (mk && mk._sx != null && mk._sy != null && Math.hypot(px - mk._sx, py - mk._sy) < 14) {
            hit = mk;
            break;
          }
        }

        if (hit !== activeMarkerRef.current) {
          activeMarkerRef.current = hit;
        }
        canvas.style.cursor = hit ? 'pointer' : 'grab';
      };

      const handlePointerUp = (e: PointerEvent) => {
        if (!interactiveRef.current) return;
        const moved = Math.abs(e.clientX - dragStartX) > 6 || Math.abs(e.clientY - dragStartY) > 6;
        dragging = false;
        if (canvas) {
          canvas.style.cursor = 'grab';
          try {
            canvas.releasePointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
        if (moved) return;

        // Reset velocity on click
        velX = 0;
        velY = 0;

        const rect = canvas.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const currentMarkers = markersRef.current;
        for (let i = 0; i < currentMarkers.length; i++) {
          const mk = currentMarkers[i];
          if (mk && mk._sx != null && mk._sy != null && Math.hypot(px - mk._sx, py - mk._sy) < 14) {
            if (onMarkerClickRef.current) {
              onMarkerClickRef.current(mk);
            }
            break;
          }
        }
      };

      if (interactive) {
        canvas.style.touchAction = 'none';
        canvas.style.cursor = 'grab';
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerUp);
      }

      return () => {
        runningRef.current = false;
        loopRunningRef.current = false;
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerup', handlePointerUp);
      };
    }, [interactive]);

    return (
      <canvas
        ref={canvasRef}
        className="block select-none max-w-full max-h-full w-full h-full"
      />
    );
  }
);

Globe.displayName = 'Globe';
