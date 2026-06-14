import React from "react";
import clsx from "clsx";

export type IconChipProps = React.HTMLAttributes<HTMLDivElement>;

export const IconChip = React.forwardRef<HTMLDivElement, IconChipProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconChip.displayName = "IconChip";
