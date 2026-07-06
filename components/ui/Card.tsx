import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tint?: boolean;
  span?: number;
}

const spanClasses: Record<number, string> = {
  1: '',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tint = false, span, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "border border-card-border rounded-xl shadow-diffuse p-5 sm:p-8 transition-all duration-200 ease-out flex flex-col gap-4 hover:-translate-y-[3px] hover:shadow-lift relative",
          tint ? "bg-card-tint" : "bg-card",
          span ? spanClasses[span] : '',
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

