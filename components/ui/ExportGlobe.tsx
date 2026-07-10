"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useSpring } from "framer-motion";

// 7 example cities from the brief
const locations = [
  { lat: 50.1109, lng: 8.6821, size: 0.1, color: [0.8, 0.5, 0.2] }, // Germany (HQ)
  { lat: 24.7136, lng: 46.6753, size: 0.08, color: [1, 1, 1] }, // Riad
  { lat: 28.0833, lng: 34.8000, size: 0.1, color: [1, 1, 1] }, // NEOM
  { lat: 25.2048, lng: 55.2708, size: 0.08, color: [1, 1, 1] }, // Dubai
  { lat: 24.4539, lng: 54.3773, size: 0.08, color: [1, 1, 1] }, // Abu Dhabi
  { lat: 25.2854, lng: 51.5310, size: 0.08, color: [1, 1, 1] }, // Doha
  { lat: 19.4326, lng: -99.1332, size: 0.06, color: [1, 1, 1] }, // Latin America Ex.
];

export function ExportGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const spring = useSpring(0, {
    stiffness: 280,
    damping: 40,
  });

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.12],
      markerColor: [0.8, 0.5, 0.2],
      glowColor: [0.05, 0.05, 0.06],
      markers: locations.map((loc) => ({
        location: [loc.lat, loc.lng] as [number, number],
        size: loc.size,
      })),
      onRender: (state: Record<string, any>) => {
        // Auto-rotate but allow manual drag
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + spring.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [spring]);

  return (
    <div
      className={`relative w-full aspect-square flex items-center justify-center ${className || ""}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            (e.clientX - pointerInteractionMovement.current) as any;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            spring.set(delta / 200);
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            spring.set(delta / 200);
          }
        }}
        className="w-full h-full cursor-grab opacity-90 transition-opacity duration-1000"
        style={{
          contain: "layout paint size",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
