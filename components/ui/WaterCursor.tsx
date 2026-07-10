"use client";

import { useEffect, useRef } from "react";
import webGLFluidEnhanced from "webgl-fluid-enhanced";

export default function WaterCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize fluid simulation
    webGLFluidEnhanced.simulation(canvas, {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.99,
      VELOCITY_DISSIPATION: 0.99,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 30,
      CURL: 0,
      SPLAT_RADIUS: 0.5,
      SPLAT_FORCE: 6000,
      COLORFUL: false,
      POINTER_COLOR: [{ r: 255, g: 255, b: 255 }],
      BACK_COLOR: { r: 0, g: 0, b: 0, a: 0 },
      TRANSPARENT: true,
      BLOOM: false,
      SUNRAYS: false,
    });

    // Proxy mouse and touch events to the canvas since it has pointer-events: none
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      canvas.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: e.clientX,
          clientY: e.clientY,
          movementX: e.movementX,
          movementY: e.movementY,
          bubbles: true,
          cancelable: true,
        })
      );
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!canvas) return;
      canvas.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
          cancelable: true,
        })
      );
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas) return;
      canvas.dispatchEvent(
        new TouchEvent("touchmove", {
          touches: e.touches,
          targetTouches: e.targetTouches,
          changedTouches: e.changedTouches,
          bubbles: true,
          cancelable: true,
        })
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!canvas) return;
      canvas.dispatchEvent(
        new TouchEvent("touchstart", {
          touches: e.touches,
          targetTouches: e.targetTouches,
          changedTouches: e.changedTouches,
          bubbles: true,
          cancelable: true,
        })
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[9999] pointer-events-none"
    />
  );
}
