import React from "react";
import clsx from "clsx";
import { Eyebrow } from "./Eyebrow";

export interface SectionHeadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export const SectionHead = React.forwardRef<HTMLDivElement, SectionHeadProps>(
  ({ className, eyebrow, title, lead, align = "left", as: Tag = "h2", ...props }, ref) => {
    const isCenter = align === "center";
    return (
      <div
        ref={ref}
        className={clsx(
          "max-w-[760px] mb-12 flex flex-col gap-3",
          isCenter ? "text-center items-center mx-auto" : "text-start items-start",
          className
        )}
        {...props}
      >
        {eyebrow && (
          <div className="mb-1">
            {typeof eyebrow === "string" ? <Eyebrow>{eyebrow}</Eyebrow> : eyebrow}
          </div>
        )}
        <Tag className={clsx(
          Tag === "h1" ? "text-h1" : "text-h2",
          "font-heading font-extrabold text-foreground tracking-tight leading-[1.08] text-wrap-balance"
        )}>
          {title}
        </Tag>
        {lead && (
          <p className="text-lead text-muted-foreground max-w-[62ch] mt-1 text-wrap-pretty">
            {lead}
          </p>
        )}
      </div>
    );
  }
);

SectionHead.displayName = "SectionHead";
