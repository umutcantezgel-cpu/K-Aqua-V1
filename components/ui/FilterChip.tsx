import React from "react";
import clsx from "clsx";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
}

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, pressed = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        className={clsx(
          "inline-flex items-center gap-2 text-[13.5px] font-semibold px-3.5 py-1.5 min-h-[44px] rounded-full border transition-all duration-fast cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] select-none",
          pressed
            ? "border-primary bg-primary-soft text-primary"
            : "border-card-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FilterChip.displayName = "FilterChip";
