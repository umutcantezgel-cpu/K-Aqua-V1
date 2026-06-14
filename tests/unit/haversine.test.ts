import { describe, it, expect } from 'vitest';
import { haversineKm, WALDSOLMS } from '@/lib/data/geo';

describe('haversineKm', () => {
  it('returns 0 for the same point', () => {
    const p = { lat: 50.11, lon: 8.68 };
    expect(haversineKm(p, p)).toBe(0);
  });

  it('calculates Frankfurt → Berlin ≈ 423 km (±30)', () => {
    const frankfurt = { lat: 50.11, lon: 8.68 };
    const berlin = { lat: 52.52, lon: 13.4 };
    const d = haversineKm(frankfurt, berlin);
    expect(d).toBeGreaterThan(390);
    expect(d).toBeLessThan(460);
  });

  it('calculates Frankfurt → Dubai is > 4000 km', () => {
    const frankfurt = { lat: 50.11, lon: 8.68 };
    const dubai = { lat: 25.2, lon: 55.27 };
    const d = haversineKm(frankfurt, dubai);
    expect(d).toBeGreaterThan(4000);
  });

  it('calculates Waldsolms → Frankfurt < 50 km', () => {
    const frankfurt = { lat: 50.11, lon: 8.68 };
    const d = haversineKm(WALDSOLMS, frankfurt);
    expect(d).toBeLessThan(50);
    expect(d).toBeGreaterThan(0);
  });

  it('is symmetric (a→b = b→a)', () => {
    const a = { lat: 48.14, lon: 11.58 }; // Munich
    const b = { lat: 47.37, lon: 8.54 };  // Zurich
    expect(haversineKm(a, b)).toBe(haversineKm(b, a));
  });

  it('returns a positive integer (result is rounded)', () => {
    const a = { lat: 50.11, lon: 8.68 };
    const b = { lat: 51.51, lon: -0.13 }; // London
    const d = haversineKm(a, b);
    expect(d).toBeGreaterThan(0);
    expect(Number.isInteger(d)).toBe(true);
  });
});
