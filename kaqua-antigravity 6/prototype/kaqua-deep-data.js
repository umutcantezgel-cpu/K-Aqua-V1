// K-Aqua Deep-Content — sprachneutrale Datenbasis.
// Rechenwerte aus der SDR-Geometrie (SDR = d/s, DIN 8077-Reihen) und
// Richtwerte nach DVS 2207-11. Verbindlich bleiben Katalog & Gerätehersteller.
(function () {
  const DIMS = [20, 25, 32, 40, 50, 63, 75, 90, 110, 125, 160, 200, 250, 315, 400, 500, 630];
  const SDRS = [6, 7.4, 9, 11, 17];

  // Verfügbarkeitsregel identisch zum Produktfinder (kaqua-views-3.jsx)
  function sdrsForDim(d) {
    if (d <= 63) return SDRS;
    if (d <= 160) return [7.4, 9, 11, 17];
    if (d <= 315) return [9, 11, 17];
    return [11, 17];
  }

  const PN = { 6: 20, 7.4: 16, 9: 12.5, 11: 10, 17: 6 };

  function round1(n) { return Math.round(n * 10) / 10; }
  function round2(n) { return Math.round(n * 100) / 100; }

  // Geometrie: s = d/SDR (min. 1,9 mm), di = d − 2s.
  // Wasserinhalt [l/m] = π·(di/2)²/1000 · Gewicht [kg/m] = π·(d−s)·s·0,905/1000 (Dichte PP 0,905 g/cm³)
  function row(d, sdr) {
    const s = Math.max(1.9, round1(d / sdr));
    const di = round1(d - 2 * s);
    const water = round2(Math.PI * Math.pow(di / 2, 2) / 1000);
    const weight = round2(Math.PI * (d - s) * s * 0.905 / 1000);
    return { d: d, sdr: sdr, s: s, di: di, pn: PN[sdr], water: water, weight: weight };
  }

  function tableForSdr(sdr) {
    return DIMS.filter(function (d) { return sdrsForDim(d).indexOf(sdr) !== -1; })
      .map(function (d) { return row(d, sdr); });
  }

  // Muffenschweißen (Socket Fusion) — Richtwerte nach DVS 2207-11, Heizelement 250–270 °C:
  // [d, Schweißtiefe mm, Anwärmzeit s, max. Umstellzeit s, Abkühlzeit min]
  const WELD = [
    [20, 14, 5, 4, 2],
    [25, 15, 7, 4, 2],
    [32, 16.5, 8, 6, 4],
    [40, 18, 12, 6, 4],
    [50, 20, 18, 6, 4],
    [63, 24, 24, 8, 6],
    [75, 26, 30, 8, 6],
    [90, 29, 40, 8, 6],
    [110, 32.5, 50, 10, 8],
    [125, 36, 60, 10, 8],
  ];

  // Zahlformat: dezimal je Sprache, Tausender via toLocaleString
  function fmtN(n, lang) {
    if (typeof n !== 'number') return n;
    return n.toLocaleString(lang === 'de' ? 'de-DE' : lang === 'ar' ? 'en-US' : 'en-US');
  }
  function fmtPn(pn, lang) {
    return 'PN ' + fmtN(pn, lang);
  }

  window.K_DEEP = {
    DIMS: DIMS, SDRS: SDRS, PN: PN,
    sdrsForDim: sdrsForDim, row: row, tableForSdr: tableForSdr,
    WELD: WELD, fmtN: fmtN, fmtPn: fmtPn,
  };
})();
