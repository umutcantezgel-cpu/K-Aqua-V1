import React from "react";
import clsx from "clsx";
import { Shaped, ShapeVariant } from "./Shaped";

export interface MediaSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: string;
  shapeVariant?: ShapeVariant;
}

const fallbackLabel = "Media Placeholder";

export function MediaSlot({
  label,
  aspectRatio = "4/3",
  shapeVariant,
  className,
  style,
  ...props
}: MediaSlotProps) {
  const displayLabel = label || fallbackLabel;
  const inner = (
    <div
      className={clsx(
        "relative overflow-hidden bg-[linear-gradient(135deg,var(--primary-soft),var(--background-subtle))] flex items-center justify-center p-4 w-full h-full",
        !shapeVariant ? "rounded-xl border border-card-border" : "kq-liquid kq-ix-tilt kq-zoom",
        className
      )}
      style={!shapeVariant ? { aspectRatio, ...style } : { ...style }}
      {...props}
    >
      <span className="text-small text-muted-foreground font-medium text-center break-words max-w-full">
        {displayLabel}
      </span>
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
