/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { FilterChip } from "@/components/ui/FilterChip";
import { Award, ChevronDown, Download, TrendingDown, Factory, Truck, Waves, Thermometer, Shield } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/lib/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { calculateCo2, Co2Input, TransportMode, EnergyMix, MATERIALS, MaterialId, InstallationMethod, InsulationClass } from "@/lib/co2-engine";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const STRINGS = {
  dPrefix: "d",
  sdrChipPrefix: "SDR ",
  mSuffix: " m",
  kmSuffix: " km",
  yrsSuffix: " Jahre",
  velocitySuffix: " m/s",
  tempSuffix: " °C",
  dot: ".",
};

// Colors for advanced LCA phases
const PHASE_COLORS = {
  a13: "oklch(0.5 0.15 250)",   // Production (Blue/Primary)
  a45: "oklch(0.6 0.15 40)",    // Transport & Install (Orange)
  b: "oklch(0.4 0.05 280)",     // Operation (Dark Navy)
  c: "oklch(0.7 0.05 320)",     // EoL (Purple/Pink)
  d: "oklch(0.65 0.15 150)",    // Recycling Credit (Green)
};

export default function Co2Calculator() {
  const t = useTranslations("co2");
  const locale = useLocale();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // === UI STATE ===
  const [activeTab, setActiveTab] = useState<"geometry" | "flow" | "environment" | "logistics">("geometry");

  // === INPUTS ===
  // Geometry
  const [d, setD] = useState<number>(110);
  const [len, setLen] = useState<number>(1000);
  const [sdr, setSdr] = useState<number>(11);
  
  // Flow Dynamics
  const [velocity, setVelocity] = useState<number>(1.5);
  const [fluidTemp, setFluidTemp] = useState<number>(60);
  const [ambientTemp, setAmbientTemp] = useState<number>(20);
  
  // Environment & Install
  const [insulation, setInsulation] = useState<InsulationClass>('basic');
  const [installMethod, setInstallMethod] = useState<InstallationMethod>('building');
  
  // Logistics & Lifespan
  const [transportKm, setTransportKm] = useState<number>(500);
  const [transportMode, setTransportMode] = useState<TransportMode>('truck');
  const [energyMix, setEnergyMix] = useState<EnergyMix>('de');
  const [lifespan, setLifespan] = useState<number>(50);
  const [recycleEol, setRecycleEol] = useState<boolean>(true);

  // Engine Calculation
  const input: Co2Input = { 
    d, sdr, len, velocity, fluidTemp, ambientTemp, insulation, installMethod,
    transportKm, transportMode, energyMix, lifespanYears: lifespan, recycleEol 
  };
  const results = calculateCo2(input);
  
  // Savings vs Worst
  const kaquaTotal = results.find(r => r.id === 'kaqua')?.phases.total || 0;
  const kaquaCost = results.find(r => r.id === 'kaqua')?.financial.totalCost || 0;

  const alternatives = results.filter(r => r.id !== 'kaqua').map(r => r.phases.total);
  const worstAlternative = Math.max(...alternatives); 
  const saved = Math.max(0, worstAlternative - kaquaTotal);

  const costAlternatives = results.filter(r => r.id !== 'kaqua').map(r => r.financial.totalCost);
  const worstCost = Math.max(...costAlternatives);
  const costSaved = Math.max(0, worstCost - kaquaCost);

  const trees = Math.round(saved / 25); // ~25 kg CO2/Baum/Jahr

  const formatCo2 = (n: number) => {
    const abs = Math.abs(n);
    if (abs >= 1000) {
      return (n / 1000).toLocaleString(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + " t";
    }
    return Math.round(n).toLocaleString(locale) + " kg";
  };

  const formatEuro = (n: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`LCA-Report-K-Aqua-${d}mm.pdf`);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
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

      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-8 items-start">
            
            {/* INPUT COLUMN */}
            <Reveal>
              <Card className="flex flex-col text-start overflow-hidden">
                <div className="flex items-center overflow-x-auto border-b border-card-border bg-background-subtle hide-scrollbar">
                  {[
                    { id: "geometry", icon: Factory, label: t("tabGeometry") },
                    { id: "flow", icon: Waves, label: t("tabFlow") },
                    { id: "environment", icon: Shield, label: t("tabEnvironment") },
                    { id: "logistics", icon: Truck, label: t("tabLogistics") },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id ? 'border-primary text-primary bg-card' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50'}`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6 flex flex-col gap-8 bg-card">
                  {/* GEOMETRY TAB */}
                  {activeTab === "geometry" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-semibold text-[15px] text-foreground">{t("dia")}</label>
                          <strong className="text-primary text-body">{STRINGS.dPrefix}{d.toLocaleString(locale)}</strong>
                        </div>
                        <input
                          type="range"
                          className="k-range w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          min={20} max={630} step={5} value={d} onChange={(e) => setD(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-semibold text-[15px] text-foreground">{t("length")}</label>
                          <strong className="text-primary text-body">{len.toLocaleString(locale)}{STRINGS.mSuffix}</strong>
                        </div>
                        <input
                          type="range"
                          className="k-range w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          min={10} max={25000} step={10} value={len} onChange={(e) => setLen(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <span className="block font-semibold text-[15px] text-foreground mb-3">{t("sdrClass")}</span>
                        <div className="flex flex-wrap gap-2">
                          {[6, 7.4, 9, 11].map((s) => (
                            <FilterChip key={s} pressed={sdr === s} onClick={() => setSdr(s)}>
                              {STRINGS.sdrChipPrefix}{s.toLocaleString(locale)}
                            </FilterChip>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* FLOW TAB */}
                  {activeTab === "flow" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-semibold text-[15px] text-foreground">{t("velocity")}</label>
                          <strong className="text-primary text-body">{velocity.toLocaleString(locale)}{STRINGS.velocitySuffix}</strong>
                        </div>
                        <input
                          type="range"
                          className="k-range w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          min={0.1} max={5.0} step={0.1} value={velocity} onChange={(e) => setVelocity(Number(e.target.value))}
                        />
                        <p className="text-xs text-muted-foreground mt-2">{t("velocityDesc")}</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-semibold text-[15px] text-foreground">{t("fluidTemp")}</label>
                          <strong className="text-primary text-body">{fluidTemp.toLocaleString(locale)}{STRINGS.tempSuffix}</strong>
                        </div>
                        <input
                          type="range"
                          className="k-range w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          min={0} max={95} step={1} value={fluidTemp} onChange={(e) => setFluidTemp(Number(e.target.value))}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ENVIRONMENT TAB */}
                  {activeTab === "environment" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-semibold text-[15px] text-foreground">{t("ambientTemp")}</label>
                          <strong className="text-primary text-body">{ambientTemp.toLocaleString(locale)}{STRINGS.tempSuffix}</strong>
                        </div>
                        <input
                          type="range"
                          className="k-range w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          min={-20} max={40} step={1} value={ambientTemp} onChange={(e) => setAmbientTemp(Number(e.target.value))}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[15px] text-foreground">{t("insulation")}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <FilterChip pressed={insulation === 'none'} onClick={() => setInsulation('none')}>{t("insulationNone")}</FilterChip>
                          <FilterChip pressed={insulation === 'basic'} onClick={() => setInsulation('basic')}>{t("insulationBasic")}</FilterChip>
                          <FilterChip pressed={insulation === 'standard'} onClick={() => setInsulation('standard')}>{t("insulationStandard")}</FilterChip>
                          <FilterChip pressed={insulation === 'premium'} onClick={() => setInsulation('premium')}>{t("insulationPremium")}</FilterChip>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[15px] text-foreground">{t("installMethod")}</label>
                        <div className="grid grid-cols-1 gap-2">
                          <FilterChip pressed={installMethod === 'building'} onClick={() => setInstallMethod('building')}>{t("installBuilding")}</FilterChip>
                          <FilterChip pressed={installMethod === 'trench'} onClick={() => setInstallMethod('trench')}>{t("installTrench")}</FilterChip>
                          <FilterChip pressed={installMethod === 'trenchless'} onClick={() => setInstallMethod('trenchless')}>{t("installTrenchless")}</FilterChip>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{t("installDesc")}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* LOGISTICS & LIFESPAN TAB */}
                  {activeTab === "logistics" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-semibold text-[15px] text-foreground">{t("lifespan")}</label>
                          <span className="text-primary font-bold">{lifespan}</span>
                        </div>
                        <input type="range" className="k-range w-full h-2 bg-muted rounded-lg accent-primary" min={10} max={100} step={5} value={lifespan} onChange={(e) => setLifespan(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground mt-2">{t("lifespanDesc")}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[15px] text-foreground">{t("energyMixLabel")}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <FilterChip pressed={energyMix === 'green'} onClick={() => setEnergyMix('green')}>{t("energyGreen")}</FilterChip>
                          <FilterChip pressed={energyMix === 'de'} onClick={() => setEnergyMix('de')}>{t("energyDe")}</FilterChip>
                          <FilterChip pressed={energyMix === 'eu'} onClick={() => setEnergyMix('eu')}>{t("energyEu")}</FilterChip>
                          <FilterChip pressed={energyMix === 'global'} onClick={() => setEnergyMix('global')}>{t("energyGlobal")}</FilterChip>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-semibold text-[15px] text-foreground">{t("transportKm")}</label>
                          <span className="text-primary font-bold">{transportKm.toLocaleString(locale)}</span>
                        </div>
                        <input type="range" className="k-range w-full h-2 bg-muted rounded-lg accent-primary" min={50} max={20000} step={50} value={transportKm} onChange={(e) => setTransportKm(Number(e.target.value))} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </Reveal>

            {/* RESULTS COLUMN */}
            <div className="flex flex-col gap-6" ref={reportRef}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* CO2 Savings Card */}
                <Reveal delay={0.08}>
                  <Card tint className="p-8 flex flex-col h-full text-start relative overflow-hidden group">
                    <div className="absolute top-0 end-0 p-6 opacity-10">
                      <Award className="w-24 h-24 text-primary" />
                    </div>
                    <div className="relative z-10 flex-1 flex flex-col">
                      <span className="text-xs font-bold tracking-[0.08em] uppercase text-muted-foreground mb-2">
                        {t("co2Savings")}
                      </span>
                      <motion.div key={saved} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[48px] font-heading font-extrabold text-foreground leading-none">
                        {formatCo2(saved)}
                      </motion.div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-auto pt-6">
                        {t("co2SavingsDesc", { n: trees.toLocaleString(locale) })}
                      </p>
                    </div>
                  </Card>
                </Reveal>

                {/* Financial ROI Card */}
                <Reveal delay={0.10}>
                  <Card className="p-8 flex flex-col h-full text-start relative overflow-hidden">
                    <div className="absolute top-0 end-0 p-6 opacity-5">
                      <TrendingDown className="w-24 h-24 text-foreground" />
                    </div>
                    <div className="relative z-10 flex-1 flex flex-col">
                      <span className="text-xs font-bold tracking-[0.08em] uppercase text-muted-foreground mb-2">
                        {t("costSavings")}
                      </span>
                      <motion.div key={costSaved} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[48px] font-heading font-extrabold text-primary leading-none">
                        {formatEuro(costSaved)}
                      </motion.div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-auto pt-6">
                        {t("costSavingsDesc", { n: lifespan })}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              </div>

              {/* CO2 LCA Chart Card */}
              <Reveal delay={0.12}>
                <Card className="p-8 flex flex-col gap-6 text-start">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {t("lcaPhases")}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground">
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: PHASE_COLORS.a13}}/> {t("phaseA13")}</div>
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: PHASE_COLORS.a45}}/> {t("phaseA45")}</div>
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: PHASE_COLORS.b}}/> {t("phaseB")}</div>
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: PHASE_COLORS.c}}/> {t("phaseC")}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 pt-2">
                    {results.map((r) => {
                      const maxScale = Math.max(...results.map(res => res.phases.a13 + res.phases.a45 + res.phases.b + (res.phases.c > 0 ? res.phases.c : 0)));
                      const pA13 = (r.phases.a13 / maxScale) * 100;
                      const pA45 = (r.phases.a45 / maxScale) * 100;
                      const pB = (r.phases.b / maxScale) * 100;
                      const pC = r.phases.c > 0 ? (r.phases.c / maxScale) * 100 : 0;
                      
                      const matName = t(`materials.${r.id}`);

                      return (
                        <div key={r.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
                          <span className="w-full sm:w-[140px] text-[14px] shrink-0 text-start" style={{ fontWeight: r.id === "kaqua" ? 800 : 500, color: r.id === "kaqua" ? "var(--primary)" : "var(--foreground)" }}>
                            {matName}
                          </span>
                          
                          <div className="flex-1 w-full h-6 bg-muted/50 rounded-md overflow-hidden relative flex">
                            {pA13 > 0 && <motion.div className="h-full border-e border-background/20" initial={{ width: 0 }} animate={{ width: `${pA13}%` }} transition={{ duration: 0.8 }} style={{ backgroundColor: PHASE_COLORS.a13 }} />}
                            {pA45 > 0 && <motion.div className="h-full border-e border-background/20" initial={{ width: 0 }} animate={{ width: `${pA45}%` }} transition={{ duration: 0.8, delay: 0.1 }} style={{ backgroundColor: PHASE_COLORS.a45 }} />}
                            {pB > 0 && <motion.div className="h-full border-e border-background/20" initial={{ width: 0 }} animate={{ width: `${pB}%` }} transition={{ duration: 0.8, delay: 0.2 }} style={{ backgroundColor: PHASE_COLORS.b }} />}
                            {pC > 0 && <motion.div className="h-full border-e border-background/20" initial={{ width: 0 }} animate={{ width: `${pC}%` }} transition={{ duration: 0.8, delay: 0.3 }} style={{ backgroundColor: PHASE_COLORS.c }} />}
                          </div>

                          <div className="w-full sm:w-[120px] flex flex-col items-end shrink-0">
                            <span className="text-[14px] tabular-nums font-bold text-foreground">
                              {formatCo2(r.phases.total)}
                            </span>
                            {r.phases.d < 0 && (
                              <span className="text-[11px] text-green-500 font-semibold">
                                {t("moduleD")} {formatCo2(r.phases.d)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Reveal>

              {/* TCO Breakdown Chart */}
              <Reveal delay={0.14}>
                <Card className="p-8 flex flex-col gap-6 text-start">
                  <h3 className="font-heading font-bold text-xl text-foreground border-b border-card-border pb-4">
                    {t("costAnalysis", { n: lifespan })}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {results.map((r) => (
                      <div key={r.id} className="flex flex-col gap-2 p-4 rounded-xl border border-card-border bg-background-subtle">
                        <strong className="text-foreground">{t(`materials.${r.id}`)}</strong>
                        <div className="flex justify-between mt-2">
                          <span className="text-muted-foreground">{t("costMaterial")}</span>
                          <span className="font-mono">{formatEuro(r.financial.materialCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("costInstall")}</span>
                          <span className="font-mono">{formatEuro(r.financial.installationCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("costOperation")}</span>
                          <span className="font-mono">{formatEuro(r.financial.operationalCost)}</span>
                        </div>
                        {r.financial.maintenanceCost > 0 && (
                          <div className="flex justify-between text-destructive">
                            <span className="text-muted-foreground">{t("costMaintenance")}</span>
                            <span className="font-mono">{formatEuro(r.financial.maintenanceCost)}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-card-border">
                          <span className="font-bold text-foreground">{t("costTotal")}</span>
                          <span className="font-mono font-bold text-primary">{formatEuro(r.financial.totalCost)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>

              {/* Export Bar */}
              <Reveal delay={0.16}>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                  <Card className="flex flex-row items-center gap-4 p-5 text-start flex-1">
                    <div className="w-10 h-10 rounded-[12px] grid place-items-center bg-muted text-muted-foreground shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">{t("certTitle")}</strong>{" "}
                      {t("certDesc")}
                    </p>
                  </Card>
                  
                  <button 
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="flex items-center justify-center gap-2 px-6 py-5 bg-foreground text-background font-semibold rounded-2xl hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    {isExporting ? t("generating") : t("certBtn")}
                  </button>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
