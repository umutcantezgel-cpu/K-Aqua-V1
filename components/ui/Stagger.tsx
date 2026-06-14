"use client";

import React from "react";

export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
}

export const Stagger = React.forwardRef<HTMLDivElement, StaggerProps>(
  ({ children, staggerDelay = 0.1, initialDelay = 0, className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div ref={ref} className={className} {...props}>
        {childrenArray.map((child, index) => {
          if (React.isValidElement(child)) {
            const delay = initialDelay + index * staggerDelay;
            const typedChild = child as React.ReactElement<{ delay?: number }>;
            const existingDelay = typedChild.props.delay;
            return React.cloneElement(typedChild, {
              delay: existingDelay !== undefined ? existingDelay : delay,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

Stagger.displayName = "Stagger";
