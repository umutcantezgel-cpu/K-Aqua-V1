import { test, expect } from "@playwright/test";
import { haversineKm, nearestMarkets, GEO_MARKETS } from "../lib/data/geo";

test.describe("Geo Helpers Stress & Edge Case Tests", () => {
  
  test.describe("haversineKm adversarial cases", () => {
    test("antipodal points (exact opposite sides of the earth)", () => {
      const northPole = { lat: 90, lon: 0 };
      const southPole = { lat: -90, lon: 0 };
      const dist = haversineKm(northPole, southPole);
      expect(dist).toBeCloseTo(20015, 0);
      expect(Number.isNaN(dist)).toBe(false);

      const eq1 = { lat: 0, lon: 0 };
      const eq2 = { lat: 0, lon: 180 };
      const distEq = haversineKm(eq1, eq2);
      expect(distEq).toBeCloseTo(20015, 0);
      expect(Number.isNaN(distEq)).toBe(false);
    });

    test("specific coordinate pair causing floating point h > 1", () => {
      const a = { lat: -87.5, lon: 0 };
      const b = { lat: 87.5, lon: 179.9999999999991 };
      
      // Calculate h manually to see if it exceeds 1
      const rad = Math.PI / 180;
      const dLat = (b.lat - a.lat) * rad;
      const dLon = (b.lon - a.lon) * rad;
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
      console.log("Calculated h:", h); // Expect > 1 (e.g. 1.0000000000000002)

      const dist = haversineKm(a, b);
      console.log("Calculated distance:", dist);
      expect(Number.isNaN(dist)).toBe(false); // If it fails, this will be NaN!
    });

    test("all pairs of markets to ensure no NaN is returned", () => {
      for (const m1 of GEO_MARKETS) {
        for (const m2 of GEO_MARKETS) {
          const dist = haversineKm(m1, m2);
          expect(Number.isNaN(dist)).toBe(false);
          expect(dist).toBeGreaterThanOrEqual(0);
        }
      }
    });

    test("extremely close coordinates (floating point sensitivity)", () => {
      const p1 = { lat: 50.370000000001, lon: 8.510000000001 };
      const p2 = { lat: 50.37, lon: 8.51 };
      const dist = haversineKm(p1, p2);
      expect(Number.isNaN(dist)).toBe(false);
      expect(dist).toBe(0);
    });

    test("invalid inputs (NaN/Infinity) return NaN or handle gracefully", () => {
      const p1 = { lat: NaN, lon: 8.51 };
      const p2 = { lat: 50.37, lon: Infinity };
      const dist = haversineKm(p1, p2);
      expect(Number.isNaN(dist)).toBe(true);
    });
  });

  test.describe("nearestMarkets adversarial cases", () => {
    test("n = 0 should return empty list", () => {
      const results = nearestMarkets("frankfurt", 0);
      expect(results).toEqual([]);
    });

    test("negative n parameter (e.g. n = -1, n = -5)", () => {
      const results = nearestMarkets("frankfurt", -1);
      expect(results.length).toBe(GEO_MARKETS.length - 2); 
    });

    test("large n parameter (n > total markets)", () => {
      const results = nearestMarkets("frankfurt", 100);
      expect(results.length).toBe(GEO_MARKETS.length - 1);
    });

    test("empty or blank slug", () => {
      const results = nearestMarkets("");
      expect(results).toEqual([]);
    });
  });

});
