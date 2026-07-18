import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Shaped, ShapeVariant } from "./Shaped";

export interface MediaSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: string;
  shapeVariant?: ShapeVariant;
  src?: string;
  alt?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

const fallbackLabel = "Media Placeholder";

export function MediaSlot({
  label,
  aspectRatio = "4/3",
  shapeVariant,
  src,
  alt,
  priority,
  loading,
  className,
  style,
  ...props
}: MediaSlotProps) {
  const displayLabel = label || fallbackLabel;
  const inner = (
    <div
      className={clsx(
        "relative overflow-hidden bg-[linear-gradient(135deg,var(--primary-soft),var(--background-subtle))] flex items-center justify-center w-full h-full",
        !shapeVariant ? "rounded-xl border border-card-border" : "kq-liquid kq-ix-tilt kq-zoom",
        !src && "p-4",
        className
      )}
      style={!shapeVariant ? { aspectRatio, ...style } : { ...style }}
      {...props}
    >
      {src ? (
        src.endsWith('.mp4') ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt || displayLabel}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            loading={loading}
          />
        )
      ) : (
        <span className="text-small text-muted-foreground font-medium text-center break-words max-w-full relative z-10">
          {displayLabel}
        </span>
      )}
    </div>
  );

  if (shapeVariant) {
    return (
      <Shaped variant={shapeVariant} className="w-full h-full" style={{ aspectRatio }}>
        {inner}
      </Shaped>
    );
  }

  return inner;
}
