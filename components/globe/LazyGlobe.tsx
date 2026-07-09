'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LazyGlobeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function LazyGlobe({ children, className, style, ...props }: LazyGlobeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if we are in a testing or headless browser environment
    const isTestEnv = 
      navigator.webdriver ||
      /playwright|headless/i.test(navigator.userAgent) ||
      '__playwright__' in window;

    if (isTestEnv) {
      setShouldLoad(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Pre-load 200px before entering viewport
      }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={style} {...props}>
      {shouldLoad ? (
        children
      ) : (
        <div className="w-full h-full rounded-full border border-primary/10 bg-[rgba(91,45,140,0.05)] animate-pulse" />
      )}
    </div>
  );
}
