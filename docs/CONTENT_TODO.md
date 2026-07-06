# Content TODO — Items Requiring Real Data

> All items below are marked with `// TODO(content)` in the codebase.
> They must **not** be filled with invented/placeholder data.
> Each item requires real company data before production launch.

---

## 1. CO₂ / EPD Factors (Material Comparison)

- **File:** [`components/tools/Co2Calculator.tsx`](../components/tools/Co2Calculator.tsx)
- **Lines:** 11, 20
- **Current state:** Demonstration factors (`K_MATERIALS` array + `co2PerMeter()` formula)
- **Action required:** Replace with real EPD (Environmental Product Declaration) / LCA data from manufacturer datasheets
- **Owner:** // TODO — Engineering / Sustainability team

---

## 2. Certificate Numbers (ISO 9001 / 14001 / 50001)

- **File:** [`components/tools/TrustCenter.tsx`](../components/tools/TrustCenter.tsx)
- **Line:** 11
- **Current state:** Placeholder IDs (`Q-2025-6732`, `U-2025-6733`, `E-2025-6734`)
- **Action required:** Replace with real certificate numbers + upload PDFs; add validity dates
- **Owner:** // TODO — Quality Management

---

## 3. Reference Projects (Globe Markers)

- **Status:** No reference data module yet; prototype used example projects
- **Action required:** Create real reference project entries with:
  - Project name, location (lat/lon), description
  - Photos (replace `<MediaSlot>` with real images)
  - Products used
- **Owner:** // TODO — Sales / Marketing

---

## 4. Norms / Regulations per Market

- **File:** [`lib/data/geo.ts`](../lib/data/geo.ts)
- **Lines:** 16–17 (type definition comments), then throughout `GEO_MARKETS` array
- **Current state:** Researched-plausible norm references per market
- **Action required:** Validate with legal/technical experts per region:
  - DVGW/TrinkwV (DACH)
  - WRAS (UK), ACS (FR), DM 174 (IT)
  - DEWA/Kahramaa/SASO (Middle East)
  - PUB/SPAN/BIS (Asia-Pacific)
  - SABS/KEBS (Africa)
- **Owner:** // TODO — Technical / Regulatory team

---

## 5. Career Benefits (EUR Amounts)

- **File:** [`components/tools/Career.tsx`](../components/tools/Career.tsx)
- **Line:** 10
- **Current state:** Typical benchmark values in `K_BENEFITS` (Sachbezug €50, Lunch €108, etc.)
- **Action required:** Align with actual company benefits and payroll
- **Owner:** // TODO — HR / Payroll

---

## 6. PWA Icons (manifest.ts)

- **File:** [`app/manifest.ts`](../app/manifest.ts)
- **Lines:** 14, 19
- **Current state:** References to `/icon-192.png` and `/icon-512.png` (files don't exist yet)
- **Action required:** Create and place actual icon files in `public/`
- **Owner:** // TODO — Brand / Design

---

## Summary Table

| # | Item | File | Severity | Owner |
|---|---|---|---|---|
| 1 | CO₂/EPD factors | `Co2Calculator.tsx` | High — affects calculator accuracy | Engineering |
| 2 | Certificate IDs + PDFs | `TrustCenter.tsx` | High — legal requirement | Quality Mgmt |
| 3 | Reference projects + photos | (new module needed) | Medium — marketing content | Sales |
| 4 | Norms per market | `geo.ts` | High — regulatory accuracy | Technical |
| 5 | Benefit amounts | `Career.tsx` | Low — employer branding | HR |
| 6 | PWA icons | `manifest.ts` | Low — progressive web app | Design |
