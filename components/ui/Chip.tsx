import React from "react";
import clsx from "clsx";

export type ChipProps = React.HTMLAttributes<HTMLSpanElement>;

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center gap-2 text-[13.5px] font-semibold px-3.5 py-1.5 rounded-full border border-card-border bg-background text-muted-foreground select-none",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Chip.displayName = "Chip";
