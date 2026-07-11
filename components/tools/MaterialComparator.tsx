/* eslint-disable react/jsx-no-literals */
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const MATERIAL_COLORS: Record<string, string> = {
  kaqua: "hsl(var(--primary))",
  steel: "oklch(0.5 0 0)",
  copper: "oklch(0.6 0.15 45)",
  pvc: "oklch(0.65 0 0)",
};

const MATERIALS = ["kaqua", "steel", "copper", "pvc"];

const COMPARISON_DATA = {
  weight: { kaqua: 95, steel: 15, copper: 20, pvc: 80, label: "Gewicht & Handling" },
  corrosion: { kaqua: 100, steel: 40, copper: 60, pvc: 90, label: "Korrosionsresistenz" },
  speed: { kaqua: 90, steel: 30, copper: 50, pvc: 70, label: "Verlegegeschwindigkeit" },
  lifespan: { kaqua: 100, steel: 50, copper: 70, pvc: 60, label: "Lebensdauer" },
  ecology: { kaqua: 85, steel: 40, copper: 35, pvc: 20, label: "Ökobilanz" },
};

// Transform data for RadarChart
const radarData = Object.keys(COMPARISON_DATA).map((metricKey) => {
  const metric = COMPARISON_DATA[metricKey as keyof typeof COMPARISON_DATA];
  return {
    subject: metric.label,
    kaqua: metric.kaqua,
    steel: metric.steel,
    copper: metric.copper,
    pvc: metric.pvc,
    fullMark: 100,
  };
});

export function MaterialComparator() {
  const tMat = useTranslations("materials");
  const [selectedMat, setSelectedMat] = useState<string>("steel");

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 flex flex-col lg:flex-row gap-8">
      {/* LEFT: Controls & Insights */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-heading font-extrabold tracking-tight mb-2">
            {"Material-"}<span className="text-primary">{"Vergleich"}</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            {"Wähle ein Material aus, um es im direkten Leistungsvergleich gegen unser PP-RCT System (K-Aqua) antreten zu lassen."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold">{"Vergleiche K-Aqua gegen:"}</label>
          <div className="flex gap-2 flex-wrap">
            {MATERIALS.filter(m => m !== "kaqua").map(m => (
              <button
                key={m}
                onClick={() => setSelectedMat(m)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                  selectedMat === m 
                    ? "border-primary bg-primary/10 text-primary" 
                    : "border-border bg-card text-muted-foreground hover:border-border/80"
                }`}
              >
                {tMat(m)}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 border-none shadow-md bg-card">
              <h3 className="font-bold mb-3 text-lg">{"K-Aqua vs. "}{tMat(selectedMat)}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {selectedMat === "steel" && (
                  <>
                    <li><strong className="text-foreground">{"Federleicht:"}</strong> {"K-Aqua wiegt ca. 70% weniger als Stahlrohre. Das spart Kran-Zeiten und schont das Personal."}</li>
                    <li><strong className="text-foreground">{"Keine Korrosion:"}</strong> {"Stahl rostet, K-Aqua ist zu 100% korrosionsresistent."}</li>
                    <li><strong className="text-foreground">{"Schnellere Montage:"}</strong> {"Muffenschweißen ist signifikant schneller und sicherer als das aufwändige Schweißen von Stahl."}</li>
                  </>
                )}
                {selectedMat === "copper" && (
                  <>
                    <li><strong className="text-foreground">{"Diebstahlsicher:"}</strong> {"Kupfer ist teuer und wird auf Baustellen oft gestohlen. K-Aqua bietet absolute Sicherheit."}</li>
                    <li><strong className="text-foreground">{"Preisstabil:"}</strong> {"Keine wilden Kursschwankungen wie an der Kupferbörse. Besser kalkulierbar."}</li>
                    <li><strong className="text-foreground">{"Lochfraß:"}</strong> {"Kupfer neigt bei falscher Wasserqualität zu Lochfraß. K-Aqua bleibt unangreifbar."}</li>
                  </>
                )}
                {selectedMat === "pvc" && (
                  <>
                    <li><strong className="text-foreground">{"Umweltfreundlich:"}</strong> {"PP-RCT ist zu 100% recycelbar und dünstet keine Weichmacher oder Chlor aus."}</li>
                    <li><strong className="text-foreground">{"Heißwasserfest:"}</strong> {"Im Gegensatz zu PVC hält PP-RCT extrem hohen Temperaturen (bis zu 90°C) stand."}</li>
                    <li><strong className="text-foreground">{"Bruchsicher:"}</strong> {"PVC kann spröde werden, K-Aqua bleibt extrem schlagzäh."}</li>
                  </>
                )}
              </ul>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT: Radar Chart */}
      <div className="w-full lg:w-2/3 min-h-[400px] lg:min-h-[500px] bg-card rounded-2xl border border-border shadow-sm p-4 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 }} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            
            <Radar
              name="K-Aqua (PP-RCT)"
              dataKey="kaqua"
              stroke={MATERIAL_COLORS.kaqua}
              strokeWidth={3}
              fill={MATERIAL_COLORS.kaqua}
              fillOpacity={0.4}
            />
            <Radar
              name={tMat(selectedMat)}
              dataKey={selectedMat}
              stroke={MATERIAL_COLORS[selectedMat]}
              strokeWidth={2}
              fill={MATERIAL_COLORS[selectedMat]}
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
