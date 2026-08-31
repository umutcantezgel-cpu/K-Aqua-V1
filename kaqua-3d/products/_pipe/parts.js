/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */

import { buildProfile, revolve, tubeLayers, D2R } from '../../core/index.js';

/* ── Farbvarianten der Rohrserien ──

   Die Serien sind neben dem Standardgrün auch in Blau, Curry und Mocca
   lieferbar (Marketing/Produktbilder/, RAL-Nummer im Ordnernamen). Der
   Produktvertrag sieht dafür `variants` und den zweiten Parameter von
   `build(size, variant, clipPlane)` vor — beides war bisher bei allen 71
   Produkten leer.

   Warum die Umfärbung über den Materialschlüssel läuft und nicht über die
   Materialregistry: Bei den Faserrohren tragen Außen- UND Innenlage denselben
   Schlüssel `pprGreen`, `createAssembly` dedupliziert per Set und legt für
   beide EINE Materialinstanz an. Wer die Instanz umfärbt, färbt zwangsläufig
   auch die Innenlage mit. Nur ein eigener Schlüssel je Lage trennt das. */
export const ROHR_VARIANTEN = ['gruen', 'blau', 'curry', 'mocca'];

const VARIANTEN_MATERIAL = {
  gruen: 'pprGreen',
  blau: 'pprBlue',
  curry: 'pprCurry',
  mocca: 'pprMocca',
};

/**
 * Gibt die Lagenliste mit eingefärbter AUSSENLAGE zurück.
 *
 * Nur Lage 0 wechselt die Farbe. Innenlagen und der Faserkern bleiben, was sie
 * sind — die Variante betrifft die Coextrusion außen, nicht den Wandaufbau.
 * Kennstreifen bleiben ebenfalls unberührt: sie kodieren die Baureihe.
 */
/**
 * Aufdruckband entlang der Rohrachse.
 *
 * Bauform wie der Kennstreifen, aber flach: Ein Aufdruck traegt nicht auf.
 * Die 0,04 mm Abstand zur Mantelflaeche sind kein Relief, sondern der
 * Mindestabstand, damit die beiden Flaechen nicht um denselben Tiefenwert
 * streiten.
 *
 * Bewusst ein eigenes Bauteil und nicht Teil des Rohrkoerpers: So bleibt die
 * Druckfarbe hell, egal welche Farbvariante das Rohr traegt — genau wie am
 * echten Produkt. Kostet rund 500 Vertices je Rohr; das Budget in
 * tests/unit/kaqua3d-geometry.test.ts hat davon reichlich.
 */
/**
 * Die Kennzeichnungszeile, wie sie am realen Rohr steht.
 *
 * Sie wird aus `brandLine` des Produkts gebaut — dort steht Werkstoff, Reihe
 * und SDR bereits in der Katalogschreibweise. Zwei Fassungen desselben Textes
 * zu pflegen waere die sichere Art, sie auseinanderlaufen zu lassen.
 *
 * Die Mittelpunkte werden zu Leerraum: Auf einem Rohr steht kein
 * typografischer Trenner, sondern schlicht Abstand.
 */
export function druckzeile(brandLine, size) {
  return `${String(brandLine).replace(/\s*·\s*/g, '   ').toUpperCase()}   d${size}   MADE IN GERMANY`;
}

export function buildPrintBand(P, opt = {}) {
  const lift = 0.04;
  const widthDeg = opt.widthDeg ?? 26;
  const half = (widthDeg / 2) * D2R;
  const c = (opt.angleDeg ?? 150) * D2R;
  const n = 12;
  const thetas = [];
  for (let i = 0; i <= n; i++) thetas.push(c - half + (2 * half * i) / n);

  /* Offenes Profil: nur die Aussenhaut des Bandes. Ein geschlossenes haette
     eine Rueckseite, die niemand sieht und die nur Dreiecke kostet. */
  const profile = buildProfile(
    [
      { a: -P.xEnd * 0.94, r: P.rOut + lift, fillet: 0 },
      { a: P.xEnd * 0.94, r: P.rOut + lift, fillet: 0 },
    ],
    { segs: 1, closed: false }
  );

  return { geo: revolve(profile, { axis: 'x', thetas }), cap: null, profile };
}

export function mitFarbvariante(layers, variant) {
  const key = VARIANTEN_MATERIAL[variant];
  if (!key || !layers.length || layers[0].key !== 'pprGreen') return layers;
  return layers.map((l, i) => (i === 0 ? Object.assign({}, l, { key }) : l));
}

export function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

export function buildStripe(P, stripe) {
  const rise = 0.25;
  const half = (stripe.widthDeg / 2) * D2R;
  const c = (stripe.angleDeg || 0) * D2R;
  const n = 16;
  const thetas = [];
  for (let i = 0; i <= n; i++) thetas.push(c - half + (2 * half * i) / n);

  /* ── ZWEI FEHLER, DIE SICH GEGENSEITIG VERSTECKT HABEN ──

     1. Die Modulationsfunktion unten lief ins Leere. `revolve` rechnet
        `r = p.r + m * (p.w || 0)` (core/geometry.js), und `buildProfile`
        setzt jedem Punkt `w: 0`, sofern keiner mitgegeben wird. Hier wurde
        keiner mitgegeben — `mod` war also seit jeher tote Rechnung, und der
        Streifen stand als hart abgesetztes Baendchen auf dem Rohr statt an
        den Raendern in den Mantel einzulaufen. Genau das Gegenteil dessen,
        was der Kommentar oben beschreibt.

        Die beiden AEUSSEREN Punkte bekommen deshalb `w: 1`: nur sie sollen
        sich radial bewegen. Die inneren bleiben bei `w: 0` und damit stehen.
        `expandChamfers` und `applyFillets` reichen `w` durch, der Wert
        ueberlebt die Profilaufbereitung.

     2. Der Rueckweg des geschlossenen Profils lag exakt auf `rOut` — also
        koplanar mit der Rohrmantelflaeche darunter. Zwei Flaechen auf
        derselben Ebene ergeben Z-Fighting: je nach Blickwinkel und
        Tiefenpuffer flackert mal die eine, mal die andere durch. Die
        Unterseite liegt jetzt knapp UNTER der Mantelflaeche und ist damit
        sauber verdeckt. */
  const sink = 0.05;

  const profile = buildProfile([
    { a: -P.xEnd, r: P.rOut - sink, fillet: 0 },
    { a: -P.xEnd, r: P.rOut + rise, chamfer: 0.2, w: 1 },
    { a: P.xEnd, r: P.rOut + rise, chamfer: 0.2, w: 1 },
    { a: P.xEnd, r: P.rOut - sink, fillet: 0 },
  ], { segs: 2 });

  const mod = (th) => {
    const u = Math.abs((th - c) / half);
    return u >= 1 ? -rise : -rise * (1 - Math.pow(Math.min(1, u), 6));
  };
  return { geo: revolve(profile, { axis: 'x', thetas, mod }), cap: null, profile };
}
