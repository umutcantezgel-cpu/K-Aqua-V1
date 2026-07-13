import React from 'react';

interface SectionDividerProps {
  variant?: 1 | 2 | 3;
  flipped?: boolean;
  className?: string;
  fill?: string;
}

export function SectionDivider({ variant = 1, flipped = false, className = '', fill }: SectionDividerProps) {
  const transform = flipped ? 'scaleY(-1)' : 'none';

  let pathData = '';
  let defaultFill = '';

  if (variant === 1) {
    pathData = 'M0,32 C240,52 480,12 720,32 C960,52 1200,12 1440,32 L1440,60 L0,60 Z';
    defaultFill = 'var(--background-subtle, #F3F0F6)';
  } else if (variant === 2) {
    pathData = 'M0,26 C180,48 360,10 540,28 C720,46 900,14 1080,32 C1260,50 1380,26 1440,30 L1440,60 L0,60 Z';
    defaultFill = 'var(--primary-soft, #F1E9F8)';
  } else if (variant === 3) {
    pathData = 'M0,38 Q360,10 720,38 Q1080,66 1440,38 L1440,60 L0,60 Z';
    defaultFill = 'var(--inverse-surface, #231D2E)';
  }

  return (
    <div className={`ka-wave ${className}`} style={{ transform }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
        <path d={pathData} fill={fill || defaultFill}></path>
      </svg>
    </div>
  );
}
