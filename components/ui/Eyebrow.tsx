import React from "react";
import clsx from "clsx";

export type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

export const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(
          "flex items-center gap-2 text-tiny font-bold tracking-wider uppercase text-primary font-body",
          "before:content-[''] before:w-6 before:h-[2px] before:bg-accent before:rounded-sm",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Eyebrow.displayName = "Eyebrow";
