"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { FilterChip } from "@/components/ui/FilterChip";
import { Award } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/lib/i18n/navigation";

// TODO(content): Richtwerte — echte EPD-Daten einpflegen. Aktuell Demonstrationsfaktoren.
const K_MATERIALS = [
  { id: "kaqua", factor: 1.0, color: "var(--primary)" },
  { id: "pvc", factor: 1.6, color: "oklch(0.62 0.02 300)" },
  { id: "copper", factor: 4.4, color: "oklch(0.55 0.1 50)" },
  { id: "steel", factor: 5.2, color: "oklch(0.5 0.01 260)" },
];

function co2PerMeter(d: number, sdr: number) {
  // TODO(content): Richtwerte — echte EPD-Daten einpflegen.
  // mass ∝ ring cross-section; base PP ≈ 1.9 kg CO2e/kg, density 0.9 → demo formula
  const wall = d / sdr;
  const area = Math.PI * (d - wall) * wall; // mm²
  return (area * 0.9 * 1.9) / 1000; // kg CO2e per meter (demo)
}

const STRINGS = {
  dPrefix: "d",
  sdrChipPrefix: "SDR ",
  mSuffix: " m",
  dot: ".",
};

export default function Co2Calculator() {
  const t = useTranslations("co2");
  const locale = useLocale();

  const [d, setD] = useState<number>(110);
  const [len, setLen] = useState<number>(500);
  const [sdr, setSdr] = useState<number>(11);

  const base = co2PerMeter(d, sdr) * len;
  const results = K_MATERIALS.map((m) => ({ ...m, total: base * m.factor }));
  const worst = Math.max(...results.map((r) => r.total));
  const saved =
    Math.max(
      ...results.filter((r) => r.id !== "kaqua").map((r) => r.total)
    ) - base;

  const trees = Math.round(saved / 25); // ~25 kg CO2/Baum/Jahr
  const carKm = Math.round(saved / 0.15); // ~0,15 kg CO2e/km Pkw

  const formatCo2 = (n: number) => {
    if (n >= 1000) {
      return (
        (n / 1000).toLocaleString(locale, { maximumFractionDigits: 1 }) + " t"
      );
    }
    return Math.round(n).toLocaleString(locale) + " kg";
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <span className="inline-block px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-4">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
              {t("title1")}{" "}
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                {t("titleGrad")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
              {t("lead")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-8 items-start">
            {/* Input Column */}
            <Reveal>
              <Card className="p-6 flex flex-col gap-6 text-start">
                <h3 className="font-heading font-bold text-lg text-foreground pb-2 border-b border-card-border">
                  {t("project")}
                </h3>

                {/* Diameter Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="co2-d" className="font-semibold text-[15px] text-foreground">
                      {t("dia")}
                    </label>
                    <strong className="text-primary text-body">
                      {STRINGS.dPrefix}
                      {d.toLocaleString(locale)}
                    </strong>
                  </div>
                  <input
                    id="co2-d"
                    type="range"
                    className="k-range w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    min={20}
                    max={250}
                    step={5}
                    value={d}
                    onChange={(e) => setD(Number(e.target.value))}
                  />
                </div>

                {/* Length Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="co2-len" className="font-semibold text-[15px] text-foreground">
                      {t("length")}
                    </label>
                    <strong className="text-primary text-body">
                      {len.toLocaleString(locale)}
                      {STRINGS.mSuffix}
                    </strong>
                  </div>
                  <input
                    id="co2-len"
                    type="range"
                    className="k-range w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    min={50}
                    max={10000}
                    step={50}
                    value={len}
                    onChange={(e) => setLen(Number(e.target.value))}
                  />
                </div>

                {/* SDR Class Chips */}
                <div>
                  <span className="block font-semibold text-[15px] text-foreground mb-3">
                    {t("sdrClass")}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[6, 7.4, 9, 11].map((s) => (
                      <FilterChip
                        key={s}
                        pressed={sdr === s}
                        onClick={() => setSdr(s)}
                      >
                        {STRINGS.sdrChipPrefix}
                        {s.toLocaleString(locale)}
                      </FilterChip>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-small text-muted-foreground pt-4 border-t border-card-border">
                  {t("disclaimer")}
                </p>
              </Card>
            </Reveal>

            {/* Results Column */}
            <div className="flex flex-col gap-6">
              {/* Savings Card */}
              <Reveal delay={0.08}>
                <Card tint className="p-6 flex flex-col gap-3 text-start">
                  <span className="text-xs font-bold tracking-[0.08em] uppercase text-muted-foreground">
                    {t("savedLabel")}
                  </span>
                  <span className="text-[44px] font-heading font-extrabold text-foreground leading-none">
                    {formatCo2(saved)}
                  </span>
                  <p className="text-body text-muted-foreground leading-relaxed mt-2">
                    {t("savedBody1")}{" "}
                    <strong className="text-foreground">
                      {t("trees", { n: trees.toLocaleString(locale) })}
                    </strong>{" "}
                    {t("or")}{" "}
                    <strong className="text-foreground">
                      {t("carKm", { n: carKm.toLocaleString(locale) })}
                    </strong>
                    {STRINGS.dot}
                  </p>
                </Card>
              </Reveal>

              {/* Comparison Chart Card */}
              <Reveal delay={0.12}>
                <Card className="p-6 flex flex-col gap-6 text-start">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {t("compareTitle")}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {results.map((r) => (
                      <div key={r.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 w-full">
                        <span
                          className="w-full sm:w-[120px] text-sm shrink-0 text-start"
                          style={{
                            fontWeight: r.id === "kaqua" ? 700 : 500,
                            color:
                              r.id === "kaqua"
                                ? "var(--primary)"
                                : "var(--muted-foreground)",
                          }}
                        >
                          {t(`materials.${r.id}` as Parameters<typeof t>[0])}
                        </span>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
                          <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${Math.max(4, (r.total / worst) * 100)}%`,
                              backgroundColor: r.color,
                            }}
                          />
                        </div>
                        <span className="w-full sm:w-[80px] text-sm tabular-nums text-end sm:text-end shrink-0">
                          {formatCo2(r.total)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>

              {/* Auditor-Cockpit Link Card */}
              <Reveal delay={0.16}>
                <Card className="flex flex-row items-center gap-4 p-6 text-start">
                  <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <p className="text-body text-muted-foreground text-sm leading-relaxed">
                    <strong className="text-foreground">{t("auditor")}</strong>{" "}
                    {t("auditorBody")}{" "}
                    <Link
                      href="/trust-center"
                      className="text-primary hover:underline font-semibold"
                    >
                      {t("trustLink")}
                    </Link>
                    {STRINGS.dot}
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
