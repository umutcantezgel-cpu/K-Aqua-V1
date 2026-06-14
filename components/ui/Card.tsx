import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tint?: boolean;
  span?: number;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tint = false, span, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "border border-card-border rounded-xl shadow-diffuse p-8 transition-all duration-200 ease-out flex flex-col gap-4 hover:-translate-y-[3px] hover:shadow-lift relative",
          tint ? "bg-card-tint" : "bg-card",
          className
        )}
        style={{
          gridColumn: span ? `span ${span}` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
