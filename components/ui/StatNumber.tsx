import React from "react";
import clsx from "clsx";

export interface StatNumberProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: React.ReactNode;
}

export const StatNumber = React.forwardRef<HTMLDivElement, StatNumberProps>(
  ({ className, value, label, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("flex flex-col", className)} {...props}>
        <span className="font-heading font-extrabold text-h1 text-primary leading-none tracking-tighter">
          {value}
        </span>
        <span className="text-small text-muted-foreground mt-2 font-medium">
          {label}
        </span>
      </div>
    );
  }
);

StatNumber.displayName = "StatNumber";
