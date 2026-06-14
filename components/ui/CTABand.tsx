import React from "react";
import clsx from "clsx";

export type CTABandProps = React.HTMLAttributes<HTMLDivElement>;

export const CTABand = React.forwardRef<HTMLDivElement, CTABandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-inverse-surface text-inverse-foreground rounded-xl p-8 md:p-16 relative overflow-hidden",
          "after:content-[''] after:absolute after:w-[640px] after:h-[640px] after:-right-[200px] after:-top-[320px] after:bg-[radial-gradient(circle,oklch(0.6_0.16_302_/_0.35),transparent_65%)] after:pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="relative z-10 flex flex-col gap-6 max-w-[620px]">
          {children}
        </div>
      </div>
    );
  }
);

CTABand.displayName = "CTABand";
