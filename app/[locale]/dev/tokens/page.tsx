'use client';

import ThemeToggle from '@/components/layout/ThemeToggle';

const LABELS = {
  title: 'Design Token Reference',
  subtitle: "Visualizing K-Aqua's design tokens and system definitions.",
  
  // Section: Theme Toggle
  themeToggleTitle: 'Theme Control',
  themeToggleDesc: 'Toggle light and dark themes to verify color contrast and rendering fidelity.',

  // Section: Colors
  colorsTitle: 'Semantic Colors',
  colorsDesc: 'These tokens adapt automatically based on the active [data-theme] attribute.',
  colorClass: 'Tailwind Class',
  colorVar: 'CSS Variable',

  // Color Swatch details
  bgBackground: 'bg-background',
  bgBackgroundSubtle: 'bg-background-subtle',
  textForeground: 'text-foreground',
  textMutedForeground: 'text-muted-foreground',
  textFaintForeground: 'text-faint-foreground',
  bgCard: 'bg-card',
  borderCardBorder: 'border-card-border',
  bgCardTint: 'bg-card-tint',
  bgPrimary: 'bg-primary',
  textPrimary: 'text-primary',
  primaryHover: 'hover:bg-primary-hover',
  textPrimaryForeground: 'text-primary-foreground',
  bgPrimarySoft: 'bg-primary-soft',
  textAccent: 'text-accent',
  textAccentStrong: 'text-accent-strong',
  ringRing: 'ring-ring',
  bgInverseSurface: 'bg-inverse-surface',
  textInverseForeground: 'text-inverse-foreground',

  // Section: Typography
  typoTitle: 'Typography Scale',
  typoDesc: 'Fluid typography based on outfit (heading) and inter (body).',
  typoText: 'Water solutions for sustainable architecture and construction.',
  typoDisplay: 'text-display',
  typoH1: 'text-h1',
  typoH2: 'text-h2',
  typoH3: 'text-h3',
  typoH4: 'text-h4',
  typoLead: 'text-lead',
  typoBody: 'text-body',
  typoSmall: 'text-small',
  typoTiny: 'text-tiny',

  // Section: Radii
  radiiTitle: 'Border Radii',
  radiiDesc: 'Rounding variables for buttons, card containers, and badges.',
  roundedSm: 'rounded-sm (4px)',
  roundedMd: 'rounded-md (8px)',
  roundedLg: 'rounded-lg (16px)',
  roundedXl: 'rounded-xl (24px)',
  roundedFull: 'rounded-full (pill)',

  // Section: Shadows
  shadowsTitle: 'Elevations & Shadows',
  shadowsDesc: 'Elevation effects used for interactive UI surfaces.',
  shadowDiffuse: 'shadow-diffuse',
  shadowLift: 'shadow-lift',
  shadowGlow: 'shadow-glow',

  // Section: Motion & Transition
  motionTitle: 'Transition & Motion',
  motionDesc: 'Interactive preview blocks demonstrating duration and easing presets (hover to trigger).',
  durFast: 'duration-fast (150ms)',
  durNormal: 'duration-normal (250ms)',
  durSlow: 'duration-slow (500ms)',
  durSlower: 'duration-slower (700ms)',
  easeOut: 'ease-out',
  easeWipe: 'ease-wipe',
  easeSpring: 'ease-spring',
  hoverToTest: 'Hover to animate',
  clickToTest: 'Click to animate',
};

const colorSwatches = [
  {
    label: LABELS.bgBackground,
    bgClass: 'bg-background',
    textClass: 'text-foreground',
    borderClass: 'border border-card-border',
    variable: '--background',
  },
  {
    label: LABELS.bgBackgroundSubtle,
    bgClass: 'bg-background-subtle',
    textClass: 'text-foreground',
    borderClass: 'border border-card-border',
    variable: '--background-subtle',
  },
  {
    label: LABELS.textForeground,
    bgClass: 'bg-card',
    textClass: 'text-foreground',
    borderClass: 'border border-card-border',
    variable: '--foreground',
  },
  {
    label: LABELS.textMutedForeground,
    bgClass: 'bg-card',
    textClass: 'text-muted-foreground',
    borderClass: 'border border-card-border',
    variable: '--muted-foreground',
  },
  {
    label: LABELS.textFaintForeground,
    bgClass: 'bg-card',
    textClass: 'text-faint-foreground',
    borderClass: 'border border-card-border',
    variable: '--faint-foreground',
  },
  {
    label: LABELS.bgCard,
    bgClass: 'bg-card',
    textClass: 'text-foreground',
    borderClass: 'border border-card-border',
    variable: '--card',
  },
  {
    label: LABELS.borderCardBorder,
    bgClass: 'bg-card',
    textClass: 'text-foreground',
    borderClass: 'border border-card-border',
    variable: '--card-border',
  },
  {
    label: LABELS.bgCardTint,
    bgClass: 'bg-card-tint',
    textClass: 'text-foreground',
    borderClass: 'border border-card-border',
    variable: '--card-tint',
  },
  {
    label: LABELS.bgPrimary,
    bgClass: 'bg-primary',
    textClass: 'text-primary-foreground',
    borderClass: '',
    variable: '--primary',
  },
  {
    label: LABELS.textPrimary,
    bgClass: 'bg-card',
    textClass: 'text-primary',
    borderClass: 'border border-card-border',
    variable: '--primary',
  },
  {
    label: LABELS.primaryHover,
    bgClass: 'bg-primary-hover',
    textClass: 'text-primary-foreground',
    borderClass: '',
    variable: '--primary-hover',
  },
  {
    label: LABELS.textPrimaryForeground,
    bgClass: 'bg-primary',
    textClass: 'text-primary-foreground',
    borderClass: '',
    variable: '--primary-foreground',
  },
  {
    label: LABELS.bgPrimarySoft,
    bgClass: 'bg-primary-soft',
    textClass: 'text-primary',
    borderClass: '',
    variable: '--primary-soft',
  },
  {
    label: LABELS.textAccent,
    bgClass: 'bg-card',
    textClass: 'text-accent',
    borderClass: 'border border-card-border',
    variable: '--accent',
  },
  {
    label: LABELS.textAccentStrong,
    bgClass: 'bg-card',
    textClass: 'text-accent-strong',
    borderClass: 'border border-card-border',
    variable: '--accent-strong',
  },
  {
    label: LABELS.ringRing,
    bgClass: 'bg-card ring-2 ring-ring',
    textClass: 'text-foreground',
    borderClass: '',
    variable: '--ring',
  },
  {
    label: LABELS.bgInverseSurface,
    bgClass: 'bg-inverse-surface',
    textClass: 'text-inverse-foreground',
    borderClass: '',
    variable: '--inverse-surface',
  },
];

const typographyLevels = [
  {
    label: LABELS.typoDisplay,
    classVal: 'text-display font-heading',
    variable: '--fs-display',
  },
  {
    label: LABELS.typoH1,
    classVal: 'text-h1 font-heading',
    variable: '--fs-h1',
  },
  {
    label: LABELS.typoH2,
    classVal: 'text-h2 font-heading',
    variable: '--fs-h2',
  },
  {
    label: LABELS.typoH3,
    classVal: 'text-h3 font-heading',
    variable: '--fs-h3',
  },
  {
    label: LABELS.typoH4,
    classVal: 'text-h4 font-heading',
    variable: '--fs-h4',
  },
  {
    label: LABELS.typoLead,
    classVal: 'text-lead font-body',
    variable: '--fs-lead',
  },
  {
    label: LABELS.typoBody,
    classVal: 'text-body font-body',
    variable: '--fs-body',
  },
  {
    label: LABELS.typoSmall,
    classVal: 'text-small font-body',
    variable: '--fs-small',
  },
  {
    label: LABELS.typoTiny,
    classVal: 'text-tiny font-body',
    variable: '--fs-tiny',
  },
];

const radiiLevels = [
  {
    label: LABELS.roundedSm,
    classVal: 'rounded-sm',
  },
  {
    label: LABELS.roundedMd,
    classVal: 'rounded-md',
  },
  {
    label: LABELS.roundedLg,
    classVal: 'rounded-lg',
  },
  {
    label: LABELS.roundedXl,
    classVal: 'rounded-xl',
  },
  {
    label: LABELS.roundedFull,
    classVal: 'rounded-full w-24 h-10 flex items-center justify-center',
  },
];

const shadowsLevels = [
  {
    label: LABELS.shadowDiffuse,
    classVal: 'shadow-diffuse',
  },
  {
    label: LABELS.shadowLift,
    classVal: 'shadow-lift',
  },
  {
    label: LABELS.shadowGlow,
    classVal: 'shadow-glow bg-primary text-primary-foreground border-none',
  },
];

const motionLevels = [
  {
    label: LABELS.durFast,
    classVal: 'transition-all duration-fast hover:scale-105 hover:bg-primary hover:text-primary-foreground',
  },
  {
    label: LABELS.durNormal,
    classVal: 'transition-all duration-normal hover:scale-105 hover:bg-primary hover:text-primary-foreground',
  },
  {
    label: LABELS.durSlow,
    classVal: 'transition-all duration-slow hover:scale-105 hover:bg-primary hover:text-primary-foreground',
  },
  {
    label: LABELS.durSlower,
    classVal: 'transition-all duration-slower hover:scale-105 hover:bg-primary hover:text-primary-foreground',
  },
  {
    label: LABELS.easeOut,
    classVal: 'transition-all duration-slow ease-out hover:translate-x-6 hover:bg-primary hover:text-primary-foreground',
  },
  {
    label: LABELS.easeWipe,
    classVal: 'transition-all duration-slow ease-wipe hover:translate-x-6 hover:bg-primary hover:text-primary-foreground',
  },
  {
    label: LABELS.easeSpring,
    classVal: 'transition-all duration-slow ease-spring hover:translate-x-6 hover:bg-primary hover:text-primary-foreground',
  },
];

export default function TokenTestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-normal p-container">
      {/* Header */}
      <header className="mb-12 border-b border-card-border pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-h1 font-heading font-extrabold tracking-tight mb-2">
            {LABELS.title}
          </h1>
          <p className="text-lead text-muted-foreground font-body">
            {LABELS.subtitle}
          </p>
        </div>
        
        {/* Theme toggle widget */}
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-4 shadow-diffuse max-w-sm">
          <ThemeToggle />
          <div>
            <h4 className="text-small font-heading font-bold">
              {LABELS.themeToggleTitle}
            </h4>
            <p className="text-tiny text-muted-foreground leading-normal">
              {LABELS.themeToggleDesc}
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-16">
        {/* Colors Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-h2 font-heading font-bold mb-2">
              {LABELS.colorsTitle}
            </h2>
            <p className="text-body text-muted-foreground">
              {LABELS.colorsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {colorSwatches.map((swatch, index) => (
              <div
                key={index}
                className="bg-card border border-card-border rounded-xl p-4 shadow-diffuse flex flex-col justify-between h-48"
              >
                <div className={`h-20 w-full rounded-lg ${swatch.bgClass} ${swatch.borderClass} ${swatch.textClass} flex items-center justify-center p-2 text-center text-tiny font-mono`}>
                  {swatch.label}
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-tiny font-heading font-bold text-foreground">
                    {swatch.label}
                  </div>
                  <div className="text-tiny font-mono text-muted-foreground">
                    {swatch.variable}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-h2 font-heading font-bold mb-2">
              {LABELS.typoTitle}
            </h2>
            <p className="text-body text-muted-foreground">
              {LABELS.typoDesc}
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-xl shadow-diffuse divide-y divide-card-border overflow-hidden">
            {typographyLevels.map((level, index) => (
              <div key={index} className="p-6 flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="lg:w-1/4">
                  <div className="text-small font-heading font-bold text-foreground">
                    {level.label}
                  </div>
                  <div className="text-tiny font-mono text-muted-foreground mt-1">
                    {level.variable}
                  </div>
                </div>
                <div className="lg:w-3/4">
                  <p className={`${level.classVal} text-foreground leading-normal`}>
                    {LABELS.typoText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Radii & Shadows grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Radii */}
          <section className="space-y-6">
            <div>
              <h2 className="text-h2 font-heading font-bold mb-2">
                {LABELS.radiiTitle}
              </h2>
              <p className="text-body text-muted-foreground">
                {LABELS.radiiDesc}
              </p>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-6 shadow-diffuse space-y-4">
              {radiiLevels.map((radius, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <span className="text-small font-heading font-bold text-foreground">
                    {radius.label}
                  </span>
                  <div className={`w-32 h-12 bg-primary text-primary-foreground flex items-center justify-center text-tiny font-mono ${radius.classVal}`}>
                    {radius.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shadows */}
          <section className="space-y-6">
            <div>
              <h2 className="text-h2 font-heading font-bold mb-2">
                {LABELS.shadowsTitle}
              </h2>
              <p className="text-body text-muted-foreground">
                {LABELS.shadowsDesc}
              </p>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-6 shadow-diffuse space-y-6">
              {shadowsLevels.map((shadow, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl bg-card border border-card-border text-foreground flex items-center justify-between gap-4 transition-all duration-normal ${shadow.classVal}`}
                >
                  <span className="text-small font-heading font-bold">
                    {shadow.label}
                  </span>
                  <span className="text-tiny font-mono opacity-80">
                    {shadow.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Motion & Transition Section */}
        <section className="space-y-6 pb-12">
          <div>
            <h2 className="text-h2 font-heading font-bold mb-2">
              {LABELS.motionTitle}
            </h2>
            <p className="text-body text-muted-foreground">
              {LABELS.motionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {motionLevels.map((motion, index) => (
              <div
                key={index}
                className={`bg-card border border-card-border rounded-xl p-6 shadow-diffuse flex flex-col justify-between h-36 cursor-pointer ${motion.classVal}`}
              >
                <div className="text-small font-heading font-bold">
                  {motion.label}
                </div>
                <div className="text-tiny font-mono opacity-70">
                  {LABELS.hoverToTest}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
