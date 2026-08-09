import React from "react";
import clsx from "clsx";

export interface CTABandProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

export const CTABand = React.forwardRef<HTMLDivElement, CTABandProps>(
  ({ className, fullWidth, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-inverse-surface text-inverse-foreground rounded-xl px-6 py-10 md:p-16 relative overflow-hidden flex flex-col md:block",
          "after:content-[''] after:absolute after:w-[640px] after:h-[640px] after:-right-[200px] after:-top-[320px] md:after:-top-[320px] after:-top-[150px] after:bg-[radial-gradient(circle,oklch(0.6_0.16_302_/_0.35),transparent_65%)] after:pointer-events-none",
          className
        )}
        {...props}
      >
        <div className={clsx(
          "relative z-10 w-full", 
          fullWidth ? "" : "flex flex-col items-center text-center md:items-start md:text-left gap-6 md:max-w-[620px] mx-auto md:mx-0"
        )}>
          {children}
        </div>
      </div>
    );
  }
);

CTABand.displayName = "CTABand";
