import React from "react";
import clsx from "clsx";

export interface LogoProps {
  height?: number;
  className?: string;
}

const logoText = "K-AQUA";

export function Logo({ height = 30, className }: LogoProps) {
  const fontSize = height * 0.74;
  return (
    <span className={clsx("inline-flex items-center gap-[9px] select-none", className)}>
      <svg
        width={height}
        height={height}
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M16 2.5C16 2.5 26 13 26 20a10 10 0 1 1-20 0C6 13 16 2.5 16 2.5Z"
          className="fill-primary"
        />
        <path
          d="M11.5 21.5a5 5 0 0 0 4 4.5"
          className="stroke-primary-foreground"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </svg>
      <span
        className="font-heading font-extrabold tracking-tight leading-none text-foreground"
        style={{ fontSize: `${fontSize}px` }}
      >
        {logoText}
      </span>
    </span>
  );
}
