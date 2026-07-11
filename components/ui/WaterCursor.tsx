"use client";

import { useEffect, useRef } from "react";
import webGLFluidEnhanced from "webgl-fluid-enhanced";

export default function WaterCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize fluid simulation
    const fluid = new webGLFluidEnhanced(canvas);
    fluid.setConfig({
      simResolution: 128,
      dyeResolution: 512,
      densityDissipation: 0.99,
      velocityDissipation: 0.99,
      pressure: 0.8,
      pressureIterations: 30,
      curl: 0,
      splatRadius: 0.5,
      splatForce: 6000,
      colorful: false,
      colorPalette: ['#ffffff'],
      backgroundColor: '#000000',
      transparent: true,
      bloom: false,
      sunrays: false,
    });
    fluid.start();

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
          touches: Array.from(e.touches),
          targetTouches: Array.from(e.targetTouches),
          changedTouches: Array.from(e.changedTouches),
          bubbles: true,
          cancelable: true,
        })
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!canvas) return;
      canvas.dispatchEvent(
        new TouchEvent("touchstart", {
          touches: Array.from(e.touches),
          targetTouches: Array.from(e.targetTouches),
          changedTouches: Array.from(e.changedTouches),
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
