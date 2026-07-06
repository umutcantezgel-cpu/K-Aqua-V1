import { describe, it, expect } from 'vitest';

/**
 * CO₂ per meter formula extracted from Co2Calculator.tsx.
 * d = outer diameter in mm, sdr = Standard Dimension Ratio.
 * Returns kg CO₂e per meter (demonstration values).
 */
function co2PerMeter(d: number, sdr: number): number {
  const wall = d / sdr;
  const area = Math.PI * (d - wall) * wall; // mm²
  return (area * 0.9 * 1.9) / 1000; // kg CO₂e per meter (demo)
}

describe('co2PerMeter', () => {
  it('returns a positive number for d=110, sdr=11', () => {
    const result = co2PerMeter(110, 11);
    expect(result).toBeGreaterThan(0);
  });

  it('returns 0 for d=0', () => {
    const result = co2PerMeter(0, 11);
    expect(result).toBe(0);
  });

  it('higher diameter produces more CO₂', () => {
    const small = co2PerMeter(50, 11);
    const large = co2PerMeter(200, 11);
    expect(large).toBeGreaterThan(small);
  });

  it('lower SDR (thicker wall) produces more CO₂', () => {
    const thinWall = co2PerMeter(110, 17); // SDR 17 → thinner wall
    const thickWall = co2PerMeter(110, 7.4); // SDR 7.4 → thicker wall
    expect(thickWall).toBeGreaterThan(thinWall);
  });

  it('result scales roughly with pipe cross-section area', () => {
    // For d=110, sdr=11: wall = 10mm, area = π × 100 × 10 = ~3141.6 mm²
    // CO₂ = 3141.6 × 0.9 × 1.9 / 1000 ≈ 5.37 kg/m
    const result = co2PerMeter(110, 11);
    expect(result).toBeCloseTo(5.37, 0);
  });

  it('returns finite numbers for all valid inputs', () => {
    const result = co2PerMeter(315, 11);
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(0);
  });
});
