/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { FilterChip } from "@/components/ui/FilterChip";
import { Award, Download, TrendingDown, Factory, Truck, Waves, Shield, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateCo2, Co2Input, TransportMode, EnergyMix, InstallationMethod, InsulationClass } from "@/lib/co2-engine";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

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

const PHASE_COLORS = {
  a13: "oklch(0.5 0.15 250)",   // Production (Blue/Primary)
  a45: "oklch(0.6 0.15 40)",    // Transport & Install (Orange)
  b: "oklch(0.4 0.05 280)",     // Operation (Dark Navy)
  c: "oklch(0.7 0.05 320)",     // EoL (Purple/Pink)
  d: "oklch(0.65 0.15 150)",    // Recycling Credit (Green)
};

const CustomTooltip = ({ active, payload, label, t }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground border border-border p-3 rounded-lg shadow-xl text-sm min-w-[200px]">
        <p className="font-bold mb-2 border-b border-border pb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-1 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
            <span className="font-mono font-medium">
              {Math.round(entry.value).toLocaleString()} kg
            </span>
          </div>
        ))}
        {payload[0]?.payload?.d < 0 && (
          <div className="flex justify-between items-center py-1 gap-4 mt-1 pt-1 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PHASE_COLORS.d }} />
              <span className="text-muted-foreground">{t("moduleD")}</span>
            </div>
            <span className="font-mono font-medium text-green-500">
              {Math.round(payload[0].payload.d).toLocaleString()} kg
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function Co2Calculator() {
  const t = useTranslations("co2");
  const locale = useLocale();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<"geometry" | "flow" | "environment" | "logistics">("geometry");

  // === INPUTS ===
  const [d, setD] = useState<number>(110);
  const [len, setLen] = useState<number>(1000);
  const [sdr, setSdr] = useState<number>(11);
  const [velocity, setVelocity] = useState<number>(1.5);
  const [fluidTemp, setFluidTemp] = useState<number>(60);
  const [ambientTemp, setAmbientTemp] = useState<number>(20);
  const [insulation, setInsulation] = useState<InsulationClass>('basic');
  const [installMethod, setInstallMethod] = useState<InstallationMethod>('building');
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

  const chartData = results.map(r => ({
    name: t(`materials.${r.id}`),
    id: r.id,
    a13: r.phases.a13,
    a45: r.phases.a45,
    b: r.phases.b,
    c: r.phases.c > 0 ? r.phases.c : 0,
    d: r.phases.d,
    total: r.phases.total
  }));

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
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

  // Reusable Input Slider Component
  const InputSlider = ({ label, value, suffix, min, max, step, onChange, desc }: any) => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        <span className="font-mono text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
          {typeof value === 'number' ? value.toLocaleString(locale) : value}{suffix}
        </span>
      </div>
      <input
        type="range"
        className="k-range w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
        min={min} max={max} step={step} value={value} onChange={onChange}
      />
      {desc && <p className="text-[11px] text-muted-foreground leading-tight mt-1">{desc}</p>}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-70px)] bg-background overflow-hidden border-t border-border">
      
      {/* SIDEBAR - INPUTS (Scrollable independently) */}
      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 border-r border-border bg-card flex flex-col h-auto lg:h-[calc(100vh-70px)]">
        
        {/* Header / Intro */}
        <div className="p-6 pb-4 border-b border-border bg-background">
          <h1 className="text-2xl font-heading font-extrabold tracking-tight mb-2">
            {t("title1")} <span className="text-primary">{t("titleGrad")}</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-snug">
            {t("lead")}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex w-full overflow-x-auto hide-scrollbar border-b border-border bg-background/50 sticky top-0 z-20 backdrop-blur-md">
          {[
            { id: "geometry", icon: Factory, label: t("tabGeometry") },
            { id: "flow", icon: Waves, label: t("tabFlow") },
            { id: "environment", icon: Shield, label: t("tabEnvironment") },
            { id: "logistics", icon: Truck, label: t("tabLogistics") },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-2 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === tab.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline-block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Tab Content */}
        <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-8"
            >
              {activeTab === "geometry" && (
                <>
                  <InputSlider label={t("dia")} value={d} min={20} max={630} step={5} onChange={(e:any) => setD(Number(e.target.value))} />
                  <InputSlider label={t("length")} value={len} suffix={STRINGS.mSuffix} min={10} max={25000} step={10} onChange={(e:any) => setLen(Number(e.target.value))} />
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-foreground">{t("sdrClass")}</label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      {[6, 7.4, 9, 11].map((s) => (
                        <FilterChip key={s} pressed={sdr === s} onClick={() => setSdr(s)}>
                          {STRINGS.sdrChipPrefix}{s.toLocaleString(locale)}
                        </FilterChip>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "flow" && (
                <>
                  <InputSlider label={t("velocity")} value={velocity} suffix={STRINGS.velocitySuffix} min={0.1} max={5.0} step={0.1} desc={t("velocityDesc")} onChange={(e:any) => setVelocity(Number(e.target.value))} />
                  <InputSlider label={t("fluidTemp")} value={fluidTemp} suffix={STRINGS.tempSuffix} min={0} max={95} step={1} onChange={(e:any) => setFluidTemp(Number(e.target.value))} />
                </>
              )}

              {activeTab === "environment" && (
                <>
                  <InputSlider label={t("ambientTemp")} value={ambientTemp} suffix={STRINGS.tempSuffix} min={-20} max={40} step={1} onChange={(e:any) => setAmbientTemp(Number(e.target.value))} />
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-foreground">{t("insulation")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <FilterChip pressed={insulation === 'none'} onClick={() => setInsulation('none')}>{t("insulationNone")}</FilterChip>
                      <FilterChip pressed={insulation === 'basic'} onClick={() => setInsulation('basic')}>{t("insulationBasic")}</FilterChip>
                      <FilterChip pressed={insulation === 'standard'} onClick={() => setInsulation('standard')}>{t("insulationStandard")}</FilterChip>
                      <FilterChip pressed={insulation === 'premium'} onClick={() => setInsulation('premium')}>{t("insulationPremium")}</FilterChip>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-foreground">{t("installMethod")}</label>
                    <div className="flex flex-col gap-2">
                      <FilterChip pressed={installMethod === 'building'} onClick={() => setInstallMethod('building')}>{t("installBuilding")}</FilterChip>
                      <FilterChip pressed={installMethod === 'trench'} onClick={() => setInstallMethod('trench')}>{t("installTrench")}</FilterChip>
                      <FilterChip pressed={installMethod === 'trenchless'} onClick={() => setInstallMethod('trenchless')}>{t("installTrenchless")}</FilterChip>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "logistics" && (
                <>
                  <InputSlider label={t("lifespan")} value={lifespan} suffix={STRINGS.yrsSuffix} min={10} max={100} step={5} desc={t("lifespanDesc")} onChange={(e:any) => setLifespan(Number(e.target.value))} />
                  <InputSlider label={t("transportKm")} value={transportKm} suffix={STRINGS.kmSuffix} min={50} max={20000} step={50} onChange={(e:any) => setTransportKm(Number(e.target.value))} />
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-foreground">{t("energyMixLabel")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <FilterChip pressed={energyMix === 'green'} onClick={() => setEnergyMix('green')}>{t("energyGreen")}</FilterChip>
                      <FilterChip pressed={energyMix === 'de'} onClick={() => setEnergyMix('de')}>{t("energyDe")}</FilterChip>
                      <FilterChip pressed={energyMix === 'eu'} onClick={() => setEnergyMix('eu')}>{t("energyEu")}</FilterChip>
                      <FilterChip pressed={energyMix === 'global'} onClick={() => setEnergyMix('global')}>{t("energyGlobal")}</FilterChip>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MAIN AREA - RESULTS (Live updating) */}
      <div className="flex-1 bg-background-subtle relative h-[calc(100vh-70px)] overflow-y-auto" ref={reportRef}>
        
        {/* Export Button Overlay (Desktop) */}
        <div className="hidden lg:flex absolute top-6 right-8 z-30">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground font-semibold text-sm rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            {isExporting ? t("generating") : "Export Report"}
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 max-w-[1200px] mx-auto pb-24 lg:pb-8">
          
          {/* KPI ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <Card tint className="p-6 flex flex-col relative overflow-hidden group border-none shadow-md">
              <div className="absolute top-0 end-0 p-4 opacity-10">
                <Award className="w-20 h-20 text-primary" />
              </div>
              <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary/80 mb-1">
                {t("co2Savings")}
              </span>
              <motion.div key={saved} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl lg:text-5xl font-heading font-extrabold text-foreground leading-none my-2">
                {formatCo2(saved)}
              </motion.div>
              <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">
                {t("co2SavingsDesc", { n: trees.toLocaleString(locale) })}
              </p>
            </Card>

            <Card className="p-6 flex flex-col relative overflow-hidden border-none shadow-md">
              <div className="absolute top-0 end-0 p-4 opacity-5">
                <TrendingDown className="w-20 h-20 text-foreground" />
              </div>
              <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-muted-foreground mb-1">
                {t("costSavings")}
              </span>
              <motion.div key={costSaved} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl lg:text-5xl font-heading font-extrabold text-primary leading-none my-2">
                {formatEuro(costSaved)}
              </motion.div>
              <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">
                {t("costSavingsDesc", { n: lifespan })}
              </p>
            </Card>
          </div>

          {/* RECHARTS - LCA CHART */}
          <Card className="p-6 flex flex-col gap-4 border-none shadow-sm bg-card">
            <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
              <Factory className="w-5 h-5 text-primary" /> {t("lcaPhases")}
            </h3>
            
            <div className="w-full h-[350px] lg:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `${(value/1000).toFixed(0)}t`}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    dx={-5}
                  />
                  <Tooltip 
                    content={<CustomTooltip t={t} />}
                    cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                    iconType="circle"
                  />
                  
                  <Bar dataKey="a13" name={t("phaseA13")} stackId="a" fill={PHASE_COLORS.a13} radius={[0,0,4,4]}>
                     {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PHASE_COLORS.a13} />
                      ))}
                  </Bar>
                  <Bar dataKey="a45" name={t("phaseA45")} stackId="a" fill={PHASE_COLORS.a45} />
                  <Bar dataKey="b" name={t("phaseB")} stackId="a" fill={PHASE_COLORS.b} />
                  <Bar dataKey="c" name={t("phaseC")} stackId="a" fill={PHASE_COLORS.c} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* FINANCIAL BREAKDOWN */}
          <Card className="p-6 flex flex-col gap-4 border-none shadow-sm bg-card">
            <h3 className="font-heading font-bold text-lg text-foreground pb-2 border-b border-border">
              {t("costAnalysis", { n: lifespan })}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {results.map((r) => (
                <div key={r.id} className="flex flex-col gap-2 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors">
                  <strong className="text-foreground text-[15px]">{t(`materials.${r.id}`)}</strong>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-muted-foreground">{t("costMaterial")}</span>
                    <span className="font-mono">{formatEuro(r.financial.materialCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("costInstall")}</span>
                    <span className="font-mono">{formatEuro(r.financial.installationCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("costOperation")}</span>
                    <span className="font-mono">{formatEuro(r.financial.operationalCost)}</span>
                  </div>
                  {r.financial.maintenanceCost > 0 && (
                    <div className="flex justify-between text-sm text-destructive">
                      <span className="text-muted-foreground">{t("costMaintenance")}</span>
                      <span className="font-mono">{formatEuro(r.financial.maintenanceCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 mt-1 border-t border-border">
                    <span className="font-bold text-foreground text-sm">{t("costTotal")}</span>
                    <span className="font-mono font-bold text-primary">{formatEuro(r.financial.totalCost)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Mobile Export Button */}
          <div className="lg:hidden flex mt-4">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex w-full items-center justify-center gap-2 px-6 py-4 bg-foreground text-background font-semibold rounded-xl hover:bg-primary transition-all"
            >
              <Download className="w-5 h-5" />
              {isExporting ? t("generating") : t("certBtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

