import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-foreground border border-card-border hover:border-primary hover:text-primary hover:bg-primary-soft",
        inverse: "bg-inverse-foreground text-inverse-surface hover:shadow-lift hover:-translate-y-0.5",
      },
      size: {
        sm: "min-h-[44px] px-4 text-small",
        md: "min-h-[48px] px-6 text-body",
        lg: "min-h-[56px] px-5 sm:px-8 text-lead",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, href, icon, iconPosition = "right", children, ...props }, ref) => {
    const isLink = !!href;
    const isLeftIcon = icon && iconPosition === "left";
    const isRightIcon = icon && iconPosition === "right";

    const content = (
      <>
        {isLeftIcon && icon}
        {children}
        {isRightIcon && icon}
      </>
    );

    const buttonClass = clsx(buttonVariants({ variant, size }), className);

    if (isLink) {
      const anchorProps = { ...props } as Record<string, unknown>;
      delete anchorProps.type;
      delete anchorProps.disabled;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={buttonClass}
          {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        className={buttonClass}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
