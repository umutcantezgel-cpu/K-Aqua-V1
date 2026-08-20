"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import {
  Search,
  Leaf,
  Award,
  Globe,
  ShieldCheck,
  Coins,
  ArrowRight,
  Layers,
  Zap,
  IconProps,
} from "@/components/ui/icon";

interface ToolItemData {
  id: string;
  t: string;
  d: string;
  cta: string;
}

interface ToolConfigItem {
  href: `/${string}`;
  icon: React.ComponentType<IconProps>;
  badge: React.ReactNode;
  accentClass: string;
  bgGlow: string;
  chips?: string[];
}

const DEFAULT_CONFIG: ToolConfigItem = {
  href: "/",
  icon: Layers,
  badge: "Werkzeug",
  accentClass: "text-primary bg-primary/10 border-primary/20",
  bgGlow: "from-primary/10 via-transparent to-transparent",
  chips: [],
};

const TOOL_CONFIG: Record<string, ToolConfigItem> = {
  finder: {
    href: "/produkte/finder",
    icon: Search,
    badge: "170+ Varianten",
    accentClass: "text-primary bg-primary/10 border-primary/20",
    bgGlow: "from-primary/10 via-transparent to-transparent",
    chips: ["d20 – d630", "SDR 6 – 17.6", "PP-R / PP-RCT", "Echtzeit-Filter"],
  },
  co2: {
    href: "/co2-rechner",
    icon: Leaf,
    badge: "Ökobilanz",
    accentClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    bgGlow: "from-emerald-500/10 via-transparent to-transparent",
    chips: ["vs. Kupfer & Stahl", "Bäume-Äquivalent", "Pkw-km"],
  },
  academy: {
    href: "/academy",
    icon: Award,
    badge: "Schweißmeister",
    accentClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    bgGlow: "from-amber-500/10 via-transparent to-transparent",
    chips: ["4 Schweißverfahren", "Video-Kurse", "Zertifikat"],
  },
  references: {
    href: "/referenzen",
    icon: Globe,
    badge: "Weltweit",
    accentClass: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    bgGlow: "from-sky-500/10 via-transparent to-transparent",
    chips: ["Globaler 3D-Globus", "Waldsolms bis Asien"],
  },
  trust: {
    href: "/trust-center",
    icon: ShieldCheck,
    badge: "100% Konform",
    accentClass: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    bgGlow: "from-indigo-500/10 via-transparent to-transparent",
    chips: ["DVGW · ISO · WRAS", "RFP-Dokumentenpaket"],
  },
  career: {
    href: "/karriere",
    icon: Coins,
    badge: "Karriere & Netto",
    accentClass: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    bgGlow: "from-purple-500/10 via-transparent to-transparent",
    chips: ["Benefits-Rechner", "60s Culture Match"],
  },
};

interface Tool {
  id: string;
  t: string;
  d: string;
  cta: string;
  href: `/${string}`;
  icon: React.ComponentType<IconProps>;
  badge: React.ReactNode;
  accentClass: string;
  bgGlow: string;
  chips?: string[];
}

export function ToolsBento() {
  const t = useTranslations("homex");
  const rawTools = (t.raw("tools") || []) as ToolItemData[];

  const tools: Tool[] = rawTools.map((item) => {
    const cfg: ToolConfigItem = TOOL_CONFIG[item.id] || {
      ...DEFAULT_CONFIG,
      href: `/${item.id}`,
    };
    return {
      id: item.id,
      t: item.t,
      d: item.d,
      cta: item.cta,
      href: cfg.href,
      icon: cfg.icon,
      badge: cfg.badge,
      accentClass: cfg.accentClass,
      bgGlow: cfg.bgGlow,
      chips: cfg.chips,
    };
  });

  const featuredTool = tools.find((tool) => tool.id === "finder") || tools[0];
  const otherTools = tools.filter((tool) => tool.id !== featuredTool?.id);
  const FeaturedIcon = featuredTool?.icon || Layers;

  return (
    <div className="w-full mt-10 sm:mt-12">
      {/* Bento Grid: 1 Col on Mobile, 2 Col on Tablet, 3 Col on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 1) Featured Hero Bento Card: Produktfinder (Spans 2 cols on lg) */}
        {featuredTool && (
          <div className="md:col-span-2 relative group rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 lg:p-10 shadow-sm hover:border-primary transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                  <FeaturedIcon className="w-3.5 h-3.5" />
                  <span>{featuredTool.badge}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span>DIREKT FILTERN</span>
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                {featuredTool.t}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
                {featuredTool.d}
              </p>

              {/* Feature Chips */}
              {featuredTool.chips && featuredTool.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredTool.chips.map((chip: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-background-subtle border border-card-border text-xs font-mono font-medium text-foreground/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={featuredTool.href}
                className="inline-flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm shadow-sm hover:bg-primary-hover active:scale-[0.98] transition-all duration-200"
              >
                <span>{featuredTool.cta}</span>
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Link>
            </div>
          </div>
        )}

        {/* 2) Remaining Interactive Tool Cards */}
        {otherTools.map((tool) => {
          const ToolIcon = tool.icon;
          return (
            <div
              key={tool.id}
              className="relative group rounded-3xl border border-card-border bg-card p-6 sm:p-7 shadow-sm hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl border ${tool.accentClass}`}>
                    <ToolIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-background-subtle border border-card-border text-muted-foreground">
                    {tool.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.t}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {tool.d}
                </p>
              </div>

              {/* CTA Link */}
              <div className="pt-2 border-t border-card-border/60">
                <Link
                  href={tool.href}
                  className="flex items-center justify-between text-sm font-heading font-bold text-primary group-hover:text-primary-hover transition-colors py-1"
                >
                  <span>{tool.cta}</span>
                  <span className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                    <ArrowRight className="w-4 h-4 rtl-flip" />
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

