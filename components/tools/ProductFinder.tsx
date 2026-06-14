"use client";

import React, { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { K_CATALOG, K_TYPES, K_SDRS, PipeType } from "@/lib/data/products";
import { Card } from "@/components/ui/Card";
import { FilterChip } from "@/components/ui/FilterChip";
import { Button } from "@/components/ui/Button";
import { Download, ArrowRight } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/lib/i18n/navigation";

const STRINGS = {
  spaceD: " d",
  d20: "d20",
  d630: "d630",
  sdrChipPrefix: "SDR ",
  dash: "—",
  pdfUrl: "https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf",
};

export default function ProductFinder() {
  const t = useTranslations("finder");
  const locale = useLocale();

  const [types, setTypes] = useState<PipeType[]>(["mono", "fiber"]);
  const [sdrs, setSdrs] = useState<number[]>([]);
  const [maxD, setMaxD] = useState<number>(630);

  const handleToggle = <T,>(
    arr: T[],
    set: React.Dispatch<React.SetStateAction<T[]>>,
    v: T
  ) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const rows = useMemo(() => {
    return K_CATALOG.filter((r) => {
      const typeMatch = types.length === 0 || types.includes(r.type);
      const sdrMatch =
        sdrs.length === 0 || (r.sdr !== null && sdrs.includes(r.sdr));
      const dMatch = r.d <= maxD;
      return typeMatch && sdrMatch && dMatch;
    });
  }, [types, sdrs, maxD]);

  const tableHeaders = t.raw("tableHead") as string[];

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
          <div className="grid grid-cols-1 lg:grid-cols-[0.38fr_0.62fr] gap-8 items-start">
            {/* Sticky Filters Column */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24 z-20">
              <Reveal>
                <Card className="p-6 flex flex-col gap-6 text-start">
                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground mb-3">
                      {t("type")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {K_TYPES.map((tItem) => (
                        <FilterChip
                          key={tItem.id}
                          pressed={types.includes(tItem.id)}
                          onClick={() => handleToggle(types, setTypes, tItem.id)}
                        >
                          {t(`types.${tItem.id}` as Parameters<typeof t>[0])}
                        </FilterChip>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground mb-3">
                      {t("sdr")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {K_SDRS.map((s) => (
                        <FilterChip
                          key={s}
                          pressed={sdrs.includes(s)}
                          onClick={() => handleToggle(sdrs, setSdrs, s)}
                        >
                          {STRINGS.sdrChipPrefix}
                          {s.toLocaleString(locale)}
                        </FilterChip>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground mb-3">
                      {t("maxD")}
                    </h3>
                    <input
                      type="range"
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      min={20}
                      max={630}
                      step={5}
                      value={maxD}
                      aria-label={t("maxDAria")}
                      onChange={(e) => setMaxD(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-small text-muted-foreground mt-2">
                      <span>{STRINGS.d20}</span>
                      <strong className="text-primary text-body">
                        {t("upTo")}
                        {STRINGS.spaceD}
                        {maxD.toLocaleString(locale)}
                      </strong>
                      <span>{STRINGS.d630}</span>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.08}>
                <Card tint className="p-6 flex flex-col gap-3 items-start text-start">
                  <span className="text-[44px] font-heading font-extrabold text-foreground leading-none">
                    {rows.length.toLocaleString(locale)}
                  </span>
                  <span className="text-body text-muted-foreground">
                    {t("found")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    href={STRINGS.pdfUrl}
                    icon={<Download className="w-4 h-4" />}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("catalog")}
                  </Button>
                </Card>
              </Reveal>
            </div>

            {/* Dynamic Table Column */}
            <div className="w-full">
              <Reveal delay={0.12}>
                <Card className="p-4 overflow-hidden text-start">
                  <div className="overflow-x-auto max-h-[560px] overflow-y-auto rounded-lg border border-card-border">
                    <table className="w-full border-collapse text-[15px] text-start">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b-2 border-primary">
                          {tableHeaders.map((h, idx) => (
                            <th
                              key={idx}
                              className="font-heading font-bold text-start p-3 px-4 whitespace-nowrap text-foreground bg-card"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(0, 120).map((r, i) => (
                          <tr
                            key={i}
                            className="hover:bg-primary-soft/50 transition-colors duration-fast"
                          >
                            <td className="p-3 px-4 border-b border-card-border font-semibold text-foreground text-start">
                              {r.short}
                            </td>
                            <td className="p-3 px-4 border-b border-card-border text-muted-foreground text-start">
                              {r.d.toLocaleString(locale)}
                            </td>
                            <td className="p-3 px-4 border-b border-card-border text-muted-foreground text-start">
                              {r.sdr
                                ? r.sdr.toLocaleString(locale)
                                : STRINGS.dash}
                            </td>
                            <td className="p-3 px-4 border-b border-card-border text-muted-foreground text-start">
                              {r.wall !== null
                                ? r.wall.toLocaleString(locale)
                                : STRINGS.dash}
                            </td>
                            <td className="p-3 px-4 border-b border-card-border text-muted-foreground text-start">
                              {r.di !== null
                                ? r.di.toLocaleString(locale)
                                : STRINGS.dash}
                            </td>
                            <td className="p-3 px-4 border-b border-card-border text-muted-foreground text-start">
                              {r.pn === STRINGS.dash ? STRINGS.dash : r.pn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {rows.length > 120 && (
                      <p className="text-body text-muted-foreground p-4 text-start">
                        {t("more", { n: rows.length - 120 })}
                      </p>
                    )}
                    {rows.length === 0 && (
                      <p className="text-body text-muted-foreground p-6 text-center">
                        {t("none")}
                      </p>
                    )}
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Next Section Banner */}
      <section className="py-16 bg-background-subtle border-t border-card-border">
        <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
          <Reveal>
            <span className="inline-block px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-4">
              {t("nextEyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-h2 font-heading font-extrabold tracking-tight mb-4 text-foreground">
              {t("nextTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] mb-8">
              {t("nextLead")}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link href="/co2-rechner" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5 min-h-[56px] px-8 text-lead">
                {t("nextCta")}
                <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
