/* eslint-disable */
/**
 * K-Aqua Motion - Physik-Vokabular (Phase 1)
 *
 * Das gesamte Bewegungssystem kennt genau drei Stimmen. Wer eine vierte
 * braucht, hat vermutlich eine der drei falsch eingesetzt.
 *
 *   FLOW   Wasser     gefedert, weich, minimales Nachschwingen.
 *                     Alles, was dem Cursor folgt oder Volumen hat.
 *   SNAP   Mechanik   kurze, satte Feder. Zustände, die einrasten
 *                     müssen (Schalter, Auswahl, Fokus).
 *   WIPE   Industrie  starrer Tween, symmetrische Beschleunigung.
 *                     Alles, was gemessen wirkt: Auslesen, Linien,
 *                     Tabellen, Masken.
 *
 * SOFT ist die Ausblend-Kurve für Deckkraft und Schatten - nie für
 * Positionen (dafür ist FLOW zuständig).
 */

export const FLOW_SPRING = { stiffness: 120, damping: 18, mass: 1.1 } as const;
export const SNAP_SPRING = { stiffness: 420, damping: 32, mass: 0.8 } as const;
/** Bewusst weicher als FLOW: der Schein soll dem Curson sichtbar nachlaufen. */
export const GLOW_SPRING = { stiffness: 90, damping: 16, mass: 1.1 } as const;

export const FLOW = { type: 'spring', ...FLOW_SPRING } as const;
export const SNAP = { type: 'spring', ...SNAP_SPRING } as const;

/** cubic-bezier(0.76, 0, 0.24, 1) - entspricht --ease-wipe in globals.css */
export const WIPE = [0.76, 0, 0.24, 1] as const;
/** cubic-bezier(0.16, 1, 0.3, 1) - entspricht --ease-out-soft in globals.css */
export const SOFT = [0.16, 1, 0.3, 1] as const;
/** Deckende Masken: symmetrisch, damit Hin- und Rückweg gleich wirken. */
export const MASK = [0.62, 0, 0.28, 1] as const;

export const clamp = (v: number, min: number, max: number) => (v < min ? min : v > max ? max : v);

/** Rasterung - die ungefederte Gegenstimme. Kein Easing, kein Nachlauf. */
export const quantize = (v: number, step: number) => Math.round(v / step) * step;

/** Organische, nicht kreisrunde Blob-Silhouetten für Flüssigkeits-Masken. */
export const BLOB_RADII = [
  '46% 54% 50% 50% / 52% 48% 54% 46%',
  '53% 47% 46% 54% / 47% 54% 46% 53%',
  '49% 51% 55% 45% / 54% 46% 52% 48%'
] as const;
