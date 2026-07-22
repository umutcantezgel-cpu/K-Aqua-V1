'use client';

/* eslint-disable react/jsx-no-literals */
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export const PremiumAssetPlaceholder = ({
  className,
  label,
  image,
  video,
}: {
  className?: string;
  label?: string;
  /** Path to a real image under public/ (e.g. /images/new-k-aqua/factory.jpg). When set, renders the image instead of the abstract placeholder. */
  image?: string;
  /** Path to a real video under public/ (e.g. /videos/factory.mp4). Takes priority over `image` if both are set. */
  video?: string;
}) => {
  if (video) {
    return (
      <div className={cn(
        "w-full h-full min-h-[400px] rounded-3xl overflow-hidden relative group bg-black",
        className
      )}>
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {label && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="font-heading font-bold tracking-widest uppercase text-xs text-white/90">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (image) {
    return (
      <div className={cn(
        "w-full h-full min-h-[400px] rounded-3xl overflow-hidden relative group",
        className
      )}>
        <Image
          src={image}
          alt={label || ''}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {label && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="font-heading font-bold tracking-widest uppercase text-xs text-white/90">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full h-full min-h-[400px] flex flex-col items-center justify-center rounded-3xl overflow-hidden relative group",
      "bg-gradient-to-br from-card to-background border border-card-border/50",
      className
    )}>
      {/* Cinematic Lighting Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Geometric Wireframe or Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

      <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        </div>
        {label && (
          <span className="font-heading font-bold tracking-widest uppercase text-sm text-muted-foreground/80">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
