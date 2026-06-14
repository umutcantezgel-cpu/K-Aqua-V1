export type PipeType = "mono" | "fiber" | "fitting" | "valve" | "tool";

export interface ProductRow {
  type: PipeType;
  typeLabel: string;
  short: string;
  d: number;
  sdr: number | null;
  wall: number | null;
  di: number | null;
  pn: string;
}

export const K_DIMS = [20, 25, 32, 40, 50, 63, 75, 90, 110, 125, 160, 200, 250, 315, 400, 500, 630];
export const K_SDRS = [6, 7.4, 9, 11, 17];
export const K_TYPES: { id: PipeType; label: string; short: string }[] = [
  { id: "mono", label: "PP-R Monolayer", short: "PP-R" },
  { id: "fiber", label: "PP-RCT Faserverbund (GF)", short: "K-Fiber" },
  { id: "fitting", label: "Formteile", short: "Fitting" },
];

export function buildCatalog(): ProductRow[] {
  const rows: ProductRow[] = [];
  K_TYPES.forEach((t) => {
    K_DIMS.forEach((d) => {
      if (t.id === "fitting" && d > 315) return;
      const sdrs = t.id === "fitting" ? [null] : K_SDRS;
      sdrs.forEach((sdr) => {
        const wall = sdr ? Math.max(1.9, Math.round((d / sdr) * 10) / 10) : null;
        rows.push({
          type: t.id,
          typeLabel: t.label,
          short: t.short,
          d,
          sdr,
          wall,
          di: wall ? Math.round((d - 2 * wall) * 10) / 10 : null,
          pn: sdr
            ? (({ 6: "PN 20", 7.4: "PN 16", 9: "PN 12,5", 11: "PN 10", 17: "PN 6" } as Record<number, string>)[sdr] || "—")
            : "—",
        });
      });
    });
  });
  return rows;
}

export const K_CATALOG: ProductRow[] = buildCatalog();
