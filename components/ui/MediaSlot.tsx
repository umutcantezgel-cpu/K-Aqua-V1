import React from "react";
import clsx from "clsx";

export interface MediaSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: string;
}

const fallbackLabel = "Media Placeholder";

export function MediaSlot({
  label,
  aspectRatio = "4/3",
  className,
  style,
  ...props
}: MediaSlotProps) {
  const displayLabel = label || fallbackLabel;
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border border-card-border bg-[linear-gradient(135deg,var(--primary-soft),var(--background-subtle))] flex items-center justify-center p-4",
        className
      )}
      style={{
        aspectRatio,
        ...style,
      }}
      {...props}
    >
      <span className="text-small text-muted-foreground font-medium text-center break-words max-w-full">
        {displayLabel}
      </span>
    </div>
  );
}
