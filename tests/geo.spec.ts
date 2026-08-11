import { test, expect } from "@playwright/test";
import { haversineKm, nearestMarkets, GEO_MARKETS, WALDSOLMS } from "../lib/data/geo";

test.describe("Geo Helpers Unit Tests", () => {

  test.describe("haversineKm distance calculation", () => {
    test("should return 0 for identical coordinates", () => {
      const p = { lat: 50.37, lon: 8.51 };
      expect(haversineKm(p, p)).toBe(0);
      expect(haversineKm(WALDSOLMS, WALDSOLMS)).toBe(0);
    });

    test("should compute correct distance from Waldsolms to Frankfurt", () => {
      // Frankfurt coordinates: lat: 50.11, lon: 8.68
      const frankfurt = { lat: 50.11, lon: 8.68 };
      // Waldsolms coordinates: lat: 50.37, lon: 8.51
      // Spherical distance is approx 31.33 km, rounded should be 31 km
      expect(haversineKm(WALDSOLMS, frankfurt)).toBe(31);
    });

    test("should compute correct distance from Waldsolms to London", () => {
      // London coordinates: lat: 51.51, lon: -0.13
      const london = { lat: 51.51, lon: -0.13 };
      // Spherical distance is approx 617.7 km, rounded should be 618 km
      expect(haversineKm(WALDSOLMS, london)).toBe(618);
    });

    test("should be symmetric (commutative)", () => {
      for (let i = 0; i < Math.min(GEO_MARKETS.length, 10); i++) {
        const m = GEO_MARKETS[i];
        if (!m) continue;
        const d1 = haversineKm(WALDSOLMS, m);
        const d2 = haversineKm(m, WALDSOLMS);
        expect(d1).toBe(d2);
      }
    });

    test("should handle negative coordinates correctly (e.g. South/West)", () => {
      const p1 = { lat: -33.92, lon: 18.42 }; // Cape Town
      const p2 = { lat: -34.60, lon: -58.38 }; // Buenos Aires
      // Cape Town to Buenos Aires distance is ~6900 km
      const dist = haversineKm(p1, p2);
      expect(dist).toBeGreaterThan(6800);
      expect(dist).toBeLessThan(7000);
    });
  });

  test.describe("nearestMarkets lookup", () => {
    test("should return exactly 3 closest markets by default", () => {
      const slug = "frankfurt";
      const results = nearestMarkets(slug);
      expect(results).toHaveLength(3);
    });

    test("should exclude the origin market from the results", () => {
      const slug = "frankfurt";
      const results = nearestMarkets(slug);
      const containsOrigin = results.some(m => m.slug === slug);
      expect(containsOrigin).toBe(false);
    });

    test("should sort results by distance in ascending order", () => {
      const slug = "london";
      const origin = GEO_MARKETS.find(m => m.slug === slug);
      expect(origin).toBeDefined();
      if (!origin) return;

      const results = nearestMarkets(slug, 5);
      expect(results).toHaveLength(5);

      // Verify each subsequent market is further or equal distance
      let prevDist = -1;
      for (const market of results) {
        const dist = haversineKm(origin, market);
        expect(dist).toBeGreaterThanOrEqual(prevDist);
        prevDist = dist;
      }
    });

    test("should support custom count (n) parameter", () => {
      const slug = "dubai";
      expect(nearestMarkets(slug, 1)).toHaveLength(1);
      expect(nearestMarkets(slug, 5)).toHaveLength(5);
      expect(nearestMarkets(slug, 10)).toHaveLength(10);
    });

    test("should return empty array for non-existent market slug", () => {
      const results = nearestMarkets("invalid-slug-12345");
      expect(results).toEqual([]);
    });

    test("should find the closest actual markets to Frankfurt", () => {
      // Frankfurt am Main
      const originSlug = "frankfurt";
      const origin = GEO_MARKETS.find(m => m.slug === originSlug);
      expect(origin).toBeDefined();
      if (!origin) return;

      const results = nearestMarkets(originSlug, 3);
      
      const allOtherMarketsSorted = GEO_MARKETS
        .filter(m => m.slug !== originSlug)
        .map(m => ({ market: m, dist: haversineKm(origin, m) }))
        .sort((a, b) => a.dist - b.dist);

      expect(results[0]?.slug).toBe(allOtherMarketsSorted[0]?.market.slug);
      expect(results[1]?.slug).toBe(allOtherMarketsSorted[1]?.market.slug);
      expect(results[2]?.slug).toBe(allOtherMarketsSorted[2]?.market.slug);
    });
  });

});
