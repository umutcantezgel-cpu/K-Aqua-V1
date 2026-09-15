/* K-Aqua 3D · Rohrschelle — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID accessories/pipe-clamps.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, ISO, SEG_INT, SEG_VIS, applyFillets, buildProfile, capFromProfile, createAssembly, expandChamfers, materials, mergeGeometries, meshVolume, plateWithHoles, polygonCap, revolve, ringGrooves, roundedPad, threadProfile, tubeLayers,
} from '../kaqua-3d-core.mjs';

/* == _pipe/params.js =================================================== */
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

export function pipeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);

  P.sdr = opt.sdr;
  P.stockLength = opt.stockLength ?? 4;
  P.rOut = a.d / 2;
  P.rIn = a.di / 2;

  /* ── WELCHE WAND WIRD MODELLIERT ──
     Die Tabelle nennt DREI Werte, und sie sind nicht immer widerspruchsfrei:
     D, Di und „S min.". Modelliert wird die Wand aus D und Di, denn das
     sind die beiden ENDEN, die die Tabelle festlegt — die Wand ist ihre
     Differenz. „S min." ist ein Mindestmaß und liegt bei einigen Zeilen
     0,1 mm darunter; dort ergäbe D − 2·S eine um 0,2 mm zu weite Bohrung.

     Betroffen sind (Stand 24.08.2026) k-pipe-pp-r-sdr-6 bei d110 und d125
     sowie k-fiber-pipe-pp-r-sdr-6 bei d50, d110 und d125. In allen übrigen
     Zeilen aller Rohre sind beide Rechnungen gleich, dort ändert sich
     nichts. */
  P.wall = Math.round(((a.d - a.di) / 2) * 1000) / 1000;
  P.wallMin = a.s;
  P.wallDeltaToMin = Math.round((P.wall - a.s) * 100) / 100;

  /* ASSUMPTION: Darstellungslänge. Geliefert werden 4-m-Stangen; in der
     Länge ist das Rohr im Viewer ein Strich. Gezeigt wird ein Abschnitt
     von 6·D, mindestens 140 mm — lang genug, dass die Silhouette als
     Rohr lesbar bleibt, kurz genug für die Schnittkante. Die
     Lieferlänge steht in der Metaleiste und im Hotspot. */
  P.len = Math.max(140, 6 * a.d);
  P.xEnd = P.len / 2;

  /* Transkriptionsprobe: D − 2·S soll Di ergeben. Grosse Abweichungen sind
     Lesefehler und brechen ab — lieber kein Rohr als ein falsches. Kleine
     (bis 0,25 mm) sind der Mindestwand geschuldet und stehen als
     wallDeltaToMin im Pruefbericht. Diese Probe hat beim Ablesen schon
     einen echten Fehler gefunden. */
  const check = a.d - 2 * a.s;
  if (Math.abs(check - a.di) > 0.25) {
    throw new Error('K-Aqua Rohr d' + a.d + ': D − 2·S = ' + check.toFixed(1) +
      ' passt nicht zu Di = ' + a.di + ' — Tabellenwert prüfen');
  }

  /* Wandstärke: die 3-mm-Restwandregel gilt für Fittings (Wand über
     einer Bohrung), nicht für Rohre — dort bestimmt die SDR-Reihe die
     Wand, und d20 bei SDR 7,4 hat legitim 2,8 mm.

     Geprüft wird deshalb zeilenweise gegen D/S, nicht gegen den
     Reihennennwert des Produkts: K-FiberClima SDR 11 und K-Fiber PP-R
     SDR 11 führen bei d20 und d25 SDR-7,4-Maße (in der Quelle mit
     Sternchen markiert). Eine Prüfung gegen den Nennwert würde diese
     beiden Rohre zu Recht abweisen. */
  P.sdrIst = Math.round((a.d / a.s) * 100) / 100;
  P.sdrAbweichend = P.sdrIst < opt.sdr - 0.5;
  if (a.s < 1.5) {
    throw new Error('K-Aqua Rohr d' + a.d + ': Wand ' + a.s + ' mm unplausibel');
  }
  return P;
}


/* == _pipe/parts.js ==================================================== */
/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


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


/* == pipe-clamps/data.js =============================================== */
/* K-Aqua Rohrschelle — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-pipe-clamps-….png
   (quellen/w2-pipe-clamp.png, 3004 × 9734 px).

   Spaltenköpfe wie abgebildet:  Code · d · kg · Pack.
   9 Größen, d20 bis d110.

   ── WAS DAS FOTO ZEIGT ──
   Gestaltquelle ist seit dem 02.09.2026 die hoch aufgelöste Aufnahme
   `public/images/produkte/pipe-clamps/studio.jpg` (900 × 900 px). Sie lag
   unbenutzt im Repository, während die Modellarbeit gegen die kleinere
   Kopie in `Marketing/Produktbilder/` lief — und sie widerlegt drei
   Angaben, die vorher hier standen (Gummieinlage, drei Rückenrillen,
   Vierkantmutter).

   Zu sehen sind:

     1. zwei GLEICHE grüne PP-Halbschalen — kein Scharnier, keine
        Fußplatte. Beide Stöße sind gleich ausgeführt.
     2. ein BALLIGER Rücken: Scheitel in Bandmitte, zu den Kanten
        abfallend, mit ZWEI Längsnuten und drei Bändern (ein breites
        Mittelband, zwei schmalere Seitenbänder)
     3. je Stoß zwei flache STAHLLASCHEN, die in einem runden Paddel um
        die Schraubenbohrung enden
     4. je Stoß eine LINSENKOPFSCHRAUBE mit KREUZSCHLITZ und U-Scheibe —
        kein Sechskantkopf; ihr GEWINDE tritt unter der unteren Lasche
        sichtbar heraus
     5. je Stoß eine schwarze SECHSKANTMUTTER im Stoßspalt. Die frühere
        Lesart „Vierkantmutter" stammt aus dem kleinen Bild; der
        9-fach-Ausschnitt zeigt drei Facetten mit klaren Kanten.
     6. auf dem geschlossenen Rücken ein SECHSKANTSTUTZEN mit
        Anschlussgewinde für die Gewindestange
     7. deutliche FASEN an Bohrungskante und Schalenstirn
     8. KEINE Gummieinlage — die Schaleninnenflächen sind grünes PP

   Damit ist die Schelle das komplexeste Zubehörteil des Katalogs: sieben
   Teile aus drei Werkstoffen.

   ── WELCHE GRÖSSE DAS FOTO ZEIGT ──
   Der Sechskantstutzen misst 95 px gegen 574 px Ringbreite. Sein
   Verhältnis Schlüsselweite zu Außendurchmesser trifft damit d75 bis d90,
   nicht die Standardgröße d32. Wer Proportionen aus diesem Bild ableitet,
   muss sie gegen diese Zeilen halten (Fall 35).

   ── KEINE GEOMETRIEMASSE IN DER QUELLE, ABER EINE WAAGE ──
   Die Tabelle führt Nennweite und Gewicht. Jedes Formmaß ist damit
   ASSUMPTION aus dem Foto — die kg-Spalte ist die einzige Gegenprobe,
   die es gibt, und sie läuft als Maß `masse` bei jedem Aufbau mit.

   Gewichtsverlauf: 0,06 · 0,06 · 0,07 · 0,08 · 0,08 · 0,13 · 0,20 ·
   0,21 · 0,24 kg. Über das 5,5-fache des Durchmessers wächst das
   Gewicht nur auf das Vierfache — deutlich flacher als jede Geometrie,
   die linear mit d skaliert. Die Wand- und Bandgesetze sind daran
   gefittet (Herleitung und Residuen in params.js).

   Der Sprung von d50 (0,08) auf d63 (0,13) ist mit +63 % Masse bei nur
   +26 % Umfang auffällig groß; dort wechselt offenbar die
   Schraubengröße von M8 auf M10. Als ASSUMPTION in params.js
   berücksichtigt. */

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 9;

export const ARTICLES = [
  { code: 'AQ50020', d: 20, kg: 0.06, pack: 100 },
  { code: 'AQ50025', d: 25, kg: 0.06, pack: 100 },
  { code: 'AQ50032', d: 32, kg: 0.07, pack: 75 },
  { code: 'AQ50040', d: 40, kg: 0.08, pack: 50 },
  { code: 'AQ50050', d: 50, kg: 0.08, pack: 50 },
  { code: 'AQ50063', d: 63, kg: 0.13, pack: 50 },
  { code: 'AQ50075', d: 75, kg: 0.2, pack: 25 },
  { code: 'AQ50090', d: 90, kg: 0.21, pack: 25 },
  { code: 'AQ500110', d: 110, kg: 0.24, pack: 25 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser Schelle',
  B: 'Bandbreite',
  M: 'Anschlussgewinde',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == pipe-clamps/params.js ============================================= */
/* K-Aqua Rohrschelle — Parametrik.

   Die Quelle führt genau zwei Spalten, die etwas über die Gestalt sagen:
   die Nennweite d und das Gewicht kg. Jedes Geometriemaß hier ist damit
   ASSUMPTION aus dem Produktfoto — und die kg-Spalte ist die einzige
   Waage, die es dafür gibt. Sie läuft als Maß `masse` bei jedem Aufbau
   mit (index.js), über alle neun Größen.

   ── WARUM DIE WANDGESETZE NEU GEFITTET SIND (01.09.2026) ──
   Die erste Fassung rechnete `shellWall = 0,14·d` und `width = 0,68·d`.
   Beide wachsen linear mit d, die Masse also mit d³. Die Tabelle wächst
   aber nur um das Vierfache über das 5,5-fache des Durchmessers:

     d20 0,06 · d25 0,06 · d32 0,07 · d40 0,08 · d50 0,08
     d63 0,13 · d75 0,20 · d90 0,21 · d110 0,24 kg

   Gemessen an der alten Fassung: d20 −33 % · d32 −35 % · d63 +14 % ·
   d110 **+107 %** (0,497 kg gerechnet gegen 0,24 kg tabelliert). Eine
   Abweichung, die ihr Vorzeichen wechselt und mit der Größe davonläuft,
   ist kein Toleranzproblem, sondern ein falsches Gesetz.

   Der Grund steckt in der Bauart: der metallische Anteil (zwei Schrauben,
   vier Laschen, zwei Vierkantmuttern, ein Gewindestutzen) ist innerhalb
   einer Schraubenklasse nahezu konstant und trägt bei d20 den GRÖSSTEN
   Teil des Gewichts — 66 von 71 g. Der Kunststoffanteil darf deshalb nur
   flach wachsen. Beide Gesetze sind jetzt affin (fester Sockel + kleiner
   d-Anteil) und über alle neun Zeilen gefittet.

   Residuen nach dem Nachfit vom 02.09.2026 (der ballige Rücken und die
   zwei statt drei Nuten haben Volumen verschoben):

     d20 −1 % · d25 +4 % · d32 −2 % · d40 −6 % · d50 +6 %
     d63 +8 % · d75 −14 % · d90 −4 % · d110 +4 %

   Kein Vorzeichenlauf, größte Abweichung 14 % — dieselbe Güte wie bei den
   Ventilteilen (−17 · −10 · −6 · +20 %). Der Rest ist die Tabelle selbst:
   sie führt d20 und d25 mit demselben Gewicht und d40 und d50 ebenso, und
   zwischen d63 und d75 springt sie um 54 % bei nur 19 % Umfangszuwachs.
   Ein stetiges Gesetz kann diese drei Sprünge nicht treffen; d75 trägt
   deshalb dauerhaft den größten Rest.

   Folge: der ausgewiesene Außendurchmesser D ändert sich. Das ist
   zulässig — D steht in keiner Quelle, es ist ein abgeleiteter Wert. Die
   kg-Spalte dagegen ist Quelle. */


/* Die gefitteten Gesetze. Sie stehen als benannte Konstanten, damit der
   Fit nachvollziehbar bleibt und nicht als Ziffern im Ausdruck versickert. */
const WAND_SOCKEL = 3.25;   // mm  Grundwandstärke
const WAND_STEIG  = 0.0535; // mm/mm  Zuwachs je mm Nennweite
const WAND_MIN    = 3.2;    // mm  spritzgusstechnische Untergrenze
const BAND_SOCKEL = 17.4;   // mm  Grundbandbreite
const BAND_STEIG  = 0.23;  // mm/mm
const BAND_MIN    = 16;     // mm

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  /* Keine Gummieinlage: das Produktfoto zeigt grüne PP-Innenflächen (M11).
     Die Schale fasst das Rohr direkt, mit 0,3 mm Einbauspiel. */
  P.rInner = d / 2;
  P.rShellIn = P.rInner + 0.3;

  P.shellWall = Math.max(WAND_MIN, Math.round((WAND_SOCKEL + WAND_STEIG * d) * 10) / 10);
  P.rOut = P.rShellIn + P.shellWall;
  P.D = Math.round(2 * P.rOut * 10) / 10;

  P.width = Math.max(BAND_MIN, Math.round(BAND_SOCKEL + BAND_STEIG * d));

  /* ASSUMPTION Schraubengröße: M8 bis d50, M10 darüber. Der Gewichts-
     sprung von 0,08 auf 0,13 kg zwischen d50 und d63 ist überproportional
     zum Umfangszuwachs und deutet genau dort auf den Wechsel. */
  P.boltM = d <= 50 ? 8 : 10;
  P.boltD = P.boltM;

  /* ── DIE VERBINDUNG NACH DEM FOTO (AQ500) ──
     Kein Sechskantkopf. Das Foto zeigt je Stoß: eine Linsenkopfschraube
     mit Kreuzschlitz, darunter eine U-Scheibe, zwei flache Stahllaschen
     über den Schalenenden und dazwischen eine schwarze Vierkantmutter in
     der Tasche. Alle Maße ASSUMPTION, aus den Bildproportionen. */
  P.headD  = Math.round(P.boltM * 1.95 * 10) / 10;  // Kopfdurchmesser
  P.headH  = Math.round(P.boltM * 0.62 * 10) / 10;  // Kopfhöhe
  P.headFlat = P.headD * 0.42;                       // ebene Kuppe oben
  P.slotW  = Math.max(0.9, P.boltM * 0.17);          // Kreuzschlitzbreite
  P.slotL  = P.headD * 0.66;                         // Kreuzschlitzlänge
  P.slotT  = Math.max(0.5, P.headH * 0.42);          // Schlitztiefe
  P.washD  = Math.round(P.boltM * 2.15 * 10) / 10;   // U-Scheibe außen
  P.washT  = Math.max(0.8, P.boltM * 0.19);

  /* Sechskantmutter, im Foto schwarz und deutlich breiter als hoch.

     BERICHTIGT 02.09.2026. Bis hierher stand hier eine VIERKANTmutter —
     eine Fehldeutung des niedrig aufgelösten Marketing-PNG, die auch in
     data.js und im Mängelregister (M11) steht. Der 9-fach-Ausschnitt von
     `public/images/produkte/pipe-clamps/studio.jpg` zeigt am Stoß drei
     Facetten mit klaren Kanten: ein Sechskant. */
  P.hexAF = Math.round(P.boltM * 1.6 * 10) / 10;
  P.hexH  = Math.round(P.boltM * 0.72 * 10) / 10;

  /* Der Gewindeüberstand unter der unteren Lasche — im Foto deutlich
     sichtbar. ASSUMPTION: knapp zwei Durchmesser. Steigung ISO metrisch
     Regelgewinde. */
  P.threadPitch = P.boltM === 8 ? 1.25 : 1.5;
  P.gewindeUeberstand = Math.round(P.boltM * 1.15 * 10) / 10;

  /* Stoßspalt: im Foto ein schmaler Schlitz, kein Scharnier. Die beiden
     Schalen sind gleichwertig; es gibt ZWEI Stöße, keinen Steg auf der
     Gegenseite. (Die frühere Fassung behauptete im Kommentar eine
     Scharnierseite und baute trotzdem vier Laschen.)

     gapDeg wird aus der Spaltweite am Außendurchmesser gerechnet, nicht
     umgekehrt — ein fester Winkel liefert bei d110 einen handbreiten
     Schlitz. */
  P.gapMM = Math.min(6, Math.max(2, Math.round(d * 0.075 * 10) / 10));
  P.gapDeg = Math.asin(Math.min(0.5, P.gapMM / 2 / P.rOut)) / (Math.PI / 180);
  /* Y-Lage der Schalenstirn an der Innenfläche — dort setzt der Steg an. */
  const yStoss = P.rShellIn * Math.tan(P.gapDeg * (Math.PI / 180));

  /* ── DER RÜCKEN (berichtigt 02.09.2026 nach studio.jpg) ──
     Kein zylindrischer Rücken mit drei Nuten, sondern eine BALLIGE
     Kontur mit ZWEI Nuten und drei Bändern: ein breites Mittelband,
     zwei schmalere Seitenbänder, die Kanten rollen ab. rOut ist der
     Scheitelradius in Bandmitte; D misst damit über den Scheitel.
     Alle vier Zahlen ASSUMPTION aus den Bildproportionen. */
  P.crownDrop = Math.max(0.4, Math.round(P.shellWall * 0.16 * 100) / 100);
  P.grooveOffset = Math.round(P.width * 0.255 * 10) / 10;
  P.grooveW = Math.max(1.0, Math.round(P.width * 0.075 * 10) / 10);
  P.grooveDepth = Math.max(0.35, Math.round(P.shellWall * 0.13 * 100) / 100);

  /* Fasen. Beide sind im Foto an den Stirnflächen deutlich zu sehen und
     standen bisher nur als Nebenprodukt der Profilkonstruktion da. */
  P.boreChamfer = Math.max(0.6, Math.round(P.shellWall * 0.22 * 10) / 10);
  P.stirnFase = Math.max(0.5, Math.round(P.shellWall * 0.18 * 10) / 10);

  /* Grüner Steg am Schalenende: die verdickte Stirn, auf der die Lasche
     aufliegt. Er beginnt an der SCHALENINNENFLÄCHE und läuft nach außen —
     nie nach innen, sonst steht er im Rohrkanal (Maß `freie-bohrung`). */
  P.stegT = Math.max(3, Math.round(P.shellWall * 0.95 * 10) / 10);
  P.stegB = Math.max(10, Math.round(P.width * 0.62));
  P.stegOut = P.rOut + Math.max(1.2, P.boltM * 0.22);

  /* Stahllasche: liegt auf dem Steg und reicht über die Schale hinaus bis
     zur Schraube. Ihre Dicke bestimmt zusammen mit dem Steg die Bauhöhe
     des Stoßes. */
  P.laschT = Math.max(1.4, Math.round(P.boltM * 0.26 * 10) / 10);
  P.laschB = Math.round(P.stegB * 0.92);

  /* Radien am Stoß, alle auf die Rohrachse bezogen.

     zScrew — die Schraubenachse liegt AUSSERHALB der Schale.

     BERICHTIGT 02.09.2026. Hier stand, das Verhältnis zScrew/rOut = 1,32
     treffe „bei d32 die Bildmessung". Das war gegen die falsche Größe
     gerechnet: der Sechskantstutzen misst im Foto 95 px gegen 574 px
     Ringbreite, sein Verhältnis AF/D trifft damit d75 bis d90 — nicht
     d32. Fall 35: ein Foto sagt nichts über Maße, solange die abgebildete
     Größe nicht bestimmt ist.

     Der Faktor bleibt, seine Begründung nicht: er stellt sicher, dass der
     Schraubenkopf die Schalenaußenfläche frei überragt. Weil die
     Schrauben absolute Maße tragen und die Schale nicht, wandert das
     Verhältnis über die Reihe — und das ist richtig so: eine M8-Schraube
     wird an einer d110-Schelle nicht größer.

     laschIn — die Innenkante der Lasche wird GERECHNET, nicht geschätzt.
     Die Lasche liegt auf der Stegoberseite bei y = yStoss + stegT. Weiter
     innen als dort, wo die Schalenaußenfläche diese Höhe erreicht, würde
     sie in die Schalenwand eintauchen — Stahl im Kunststoff. Der feste
     Bruchteil 0,74·rOut tat genau das: bei d32 lag die Innenkante 4,7 mm
     zu weit innen und die Lasche steckte in der Schale. Die 0,5 mm
     Zugabe sind gewollte Überdeckung, damit kein Spalt klafft. */
  P.zScrew = P.stegOut + P.boltD * 0.62;
  const yLasch = yStoss + P.stegT;
  P.laschIn = Math.sqrt(Math.max(1, P.rOut * P.rOut - yLasch * yLasch)) - 0.5;
  P.laschOut = P.zScrew + P.boltD * 0.9;

  /* ASSUMPTION Anschlussgewinde M8 bis d63, M10 darüber. Übliche
     Deckenbefestigung; der Sechskantstutzen sitzt auf dem geschlossenen
     Schalenrücken, nicht am Stoß. */
  P.threadM = d <= 63 ? 8 : 10;
  P.M = 'M' + P.threadM;
  P.nutAF = P.threadM === 8 ? 13 : 17;
  P.nutH = P.threadM === 8 ? 12 : 15;
  /* Der Stutzen taucht um dieses Maß in die Schale ein — er sitzt auf,
     er schwebt nicht. Wird als Maß `stutzen-sitzt` geprüft. */
  P.bossOverlap = 1.2;

  if (P.shellWall < 3) {
    throw new Error('K-Aqua Rohrschelle d' + d + ': Schalenwand ' +
      P.shellWall + ' mm zu dünn');
  }
  return P;
}


/* == pipe-clamps/parts.js ============================================== */
/* K-Aqua Rohrschelle — Kontur.

   Aufbau nach dem Produktfoto AQ500. Zwei gleichwertige Halbschalen, an
   BEIDEN Enden verschraubt — es gibt kein Scharnier. Je Stoß: zwei flache
   Stahllaschen über den grünen Stegen, eine Linsenkopfschraube mit
   Kreuzschlitz und U-Scheibe, eine schwarze Vierkantmutter in der Tasche.
   Auf dem geschlossenen Rücken der unteren Schale sitzt der
   Sechskantstutzen mit dem Anschlussgewinde.

   ── DIE ACHSEN (geändert am 01.09.2026) ──
   Rohrachse ist X. Die beiden Stöße liegen bei **±Z**, die geschlossenen
   Schalenrücken bei **±Y**; der Stutzen steht bei −Y.

   Vorher lagen die Stöße bei ±Y — also genau dort, wo der Stutzen sitzt
   (beide durchdrangen sich) und genau in der Ebene z = 0, die der Viewer
   als Schnittebene benutzt. Der Halbschnitt löschte damit eine komplette
   Halbschale, statt eine Wand zu zeigen. Mit der gedrehten Stoßachse
   schneidet z = 0 beide Schalen durch die Wand, der Stoß bei −Z bleibt
   ganz stehen, der bei +Z fällt weg. Das ist die übliche
   Halbschnittdarstellung.

   ── KEIN CSG ──
     1. Halbschalen als Teilrotationskörper: revolve() nimmt eine
        thetas-Liste, ein Bogen über einen Teilwinkel ist ein gewöhnlicher
        Revolve, keine geschnittene Vollschale.
     2. Jede Bohrung ist Teil ihrer Kontur: THREE.Shape mit Außen- und
        Lochkontur, in einem Zug trianguliert — dasselbe Verfahren wie
        plateWithHoles beim Bundflansch.
     3. Der Kreuzschlitz ist ein Durchbruch in einer dünnen Deckscheibe
        über dem massiven Kopf. Ein Schlitz ist ein Abzug; als Loch in
        einer aufgesetzten Scheibe braucht er keinen. */


const FASE = 0.4;   // mm — Bevel aller Extrusionsteile

/* Teilwinkel-Abtastung: von a bis b Grad, n Schritte. */
function arcThetas(aDeg, bDeg, n) {
  const out = [];
  for (let i = 0; i <= n; i++) out.push((aDeg + (bDeg - aDeg) * (i / n)) * D2R);
  return out;
}

/* aWear und uv nachtragen — mergeGeometries erwartet beide. */
function attribute(g, wear) {
  const n = g.attributes.position.count;
  g.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(wear), 1));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  return g;
}

/* Eine Shape aus der (u, v)-Ebene zu einem flachen Teil extrudieren:
   u wird X, v wird Z, die DICKE zeigt in Y — und das Ergebnis liegt
   MITTIG auf y = 0.

   Die Mittigkeit ist der Punkt. roundedPad und ExtrudeGeometry liefern
   eine Kontur, die von 0 bis h läuft; eine solche Kontur spiegelt sich
   beim Verschieben um ±off NICHT, sie verschiebt sich nur. Genau daran
   waren die vier Laschen der ersten Fassung asymmetrisch: die eine Seite
   lag bei z 3,11…7,11, die andere bei −3,11…0,89 und ragte über die
   Teilungsebene. Die Mittigkeit steckt jetzt in dieser Funktion, nicht in
   jeder Aufrufstelle.

   rotateX(+90°) bildet (u, v, w) auf (u, −w, v) ab: v wird Welt-Z OHNE
   Vorzeichenwechsel, die Extrusionsrichtung w wird −Y. */
function flachteil(shape, h, bevel, wear) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.05, h - bevel * 2),
    bevelEnabled: bevel > 0,
    /* bevelSegments 1 und curveSegments 16: die Fase eines 2-mm-Blechs
       braucht keine zwei Ringe, und 16 Segmente tragen jede Bohrung
       dieser Größenordnung. Siehe rechteck() — die Ecken sind Fasen,
       curveSegments wirkt deshalb nur noch auf Bohrung und Paddel. */
    bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, curveSegments: 16,
  });
  g.rotateX(Math.PI / 2);
  g.translate(0, h / 2 - bevel, 0);
  return attribute(g, wear);
}

/* Rechteck mit gefasten Ecken als Shape. Bevel-Kompensation wie in
   plateWithHoles: ExtrudeGeometry addiert nach außen, also Außenkontur
   um die Fase kleiner anlegen.

   ── WARUM FASEN UND KEINE BOGEN ──
   `curveSegments` gilt in ExtrudeGeometry für JEDE Kurve der Shape, nicht
   nur für die Bohrung. Vier gerundete Ecken kosten damit so viel wie vier
   weitere Bohrungen — an einem 10 mm breiten Stahlblech, wo sie niemand
   sieht. Gemessen an einer Lasche: 2364 Dreiecke mit Bogenecken gegen 252
   mit Fasenecken, bei gleichem Bild. Fall 47.

   ── DIE UMLAUFRICHTUNG IST NICHT BELIEBIG ──
   Die Kontur läuft GEGEN den Uhrzeigersinn. ExtrudeGeometry richtet Löcher
   nur aus, wenn es die Außenkontur umdreht — und das tut es nur bei einer
   Kontur gegen den Uhrzeigersinn:

       const reverse = !ShapeUtils.isClockWise(vertices);
       if (reverse) { … Löcher, die im Uhrzeigersinn laufen, umdrehen … }

   Läuft die Außenkontur schon im Uhrzeigersinn, behalten die Löcher ihre
   Richtung, die Lochwand kehrt sich um, und das Volumen ADDIERT das Loch
   statt es abzuziehen: die Mutter M8 maß so 1173 statt 713 mm³. Fall 45. */
function rechteck(sx, sz, fase, bevel) {
  const ax = Math.max(0.3, sx / 2 - bevel);
  const av = Math.max(0.3, sz / 2 - bevel);
  const f = Math.max(0.1, Math.min(fase, ax * 0.7, av * 0.7));
  const s = new THREE.Shape();
  s.moveTo(ax, -av + f);
  s.lineTo(ax, av - f);
  s.lineTo(ax - f, av);
  s.lineTo(-ax + f, av);
  s.lineTo(-ax, av - f);
  s.lineTo(-ax, -av + f);
  s.lineTo(-ax + f, -av);
  s.lineTo(ax - f, -av);
  s.closePath();
  return s;
}

/* Lasche nach dem Foto: Flachstab, der in einem runden Paddel um die
   Schraubenachse endet. Die Kontur läuft von der Schaleninnenseite (v0)
   nach außen bis zur Paddelmitte (vBohr) und schließt dort mit einem
   Halbkreis vom Radius sx/2.

   NICHT gebaut ist die Stufe, mit der die Lasche im Foto auf das
   Schalenende absetzt: ExtrudeGeometry trägt nur konstante Dicke, und der
   Versatz beträgt rund eine Laschendicke. Bewusst weggelassen, nicht
   übersehen. */
function paddel(sx, v0, vBohr, fase, bevel) {
  const ax = Math.max(0.3, sx / 2 - bevel);
  const r = ax;
  const f = Math.max(0.1, Math.min(fase, ax * 0.7));
  const s = new THREE.Shape();
  s.moveTo(ax, v0 + f);
  s.lineTo(ax, vBohr);
  s.absarc(0, vBohr, r, 0, Math.PI, false);   // rundes Paddelende
  s.lineTo(-ax, v0 + f);
  s.lineTo(-ax + f, v0);
  s.lineTo(ax - f, v0);
  s.closePath();
  return s;
}

/* Sechskantkontur, gegen den Uhrzeigersinn (siehe oben). */
function sechskant(af, bevel) {
  const R = af / Math.sqrt(3) - bevel;
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = R * Math.cos(t), y = R * Math.sin(t);
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

/* Kreisloch in eine Shape. Innenkonturen SCHRUMPFEN durch den Bevel,
   deshalb um die Fase größer anlegen — die Gegenrichtung zur Außenkontur. */
function lochen(shape, rBore, u, v, bevel) {
  const p = new THREE.Path();
  p.absarc(u, v, rBore + bevel, 0, Math.PI * 2, true);
  shape.holes.push(p);
  return shape;
}

/* ─────────────────────── Schalen ─────────────────────── */

/* Die Wölbung des Rückens. Das Studiofoto zeigt keinen zylindrischen
   Rücken, sondern eine BALLIGE Kontur: der Scheitel liegt in Bandmitte,
   zu beiden Kanten fällt sie ab. rOut ist der Scheitelradius. */
function woelbung(P, a) {
  const u = (2 * a) / P.width;
  return P.rOut - P.crownDrop * u * u;
}

/* Außenkontur des Rückens: drei Bänder, zwei Nuten.

   BERICHTIGT 02.09.2026 nach `public/images/produkte/pipe-clamps/studio.jpg`
   (900 px). Die Vorfassung setzte DREI Nuten auf einen zylindrischen
   Rücken — beides falsch. Das Foto zeigt ein breites Mittelband, zwei
   schmalere Seitenbänder, dazwischen zwei Nuten, und die Kanten rollen ab.

   `ringGrooves` aus dem Core passt hier nicht mehr: es setzt Nuten auf
   KONSTANTEM Radius. Auf einer balligen Kontur muss der Nutgrund der
   Wölbung folgen, sonst wandert die Nuttiefe über das Band. */
function ruecken(P) {
  const B = P.width, x0 = -B / 2, x1 = B / 2;
  const gP = P.grooveOffset, gW = P.grooveW, gD = P.grooveDepth;
  const wand = Math.min(0.35, gW * 0.28);
  const out = [];
  /* Die Stützstellen der Wölbung tragen KEINEN Fillet: sie liegen bereits
     auf einer glatten Kurve, und jeder Fillet macht aus einem Punkt vier.
     Über die drei Bänder waren das 51 Punkte für nichts — bei 47
     Winkelschritten rund 4 800 Dreiecke je Schale. Fillets bekommen nur
     die vier Nutkanten, wo die Kontur wirklich knickt. */
  const band = (a0, a1, n) => {
    for (let k = 0; k <= n; k++) {
      const a = a0 + (a1 - a0) * (k / n);
      out.push({ a, r: woelbung(P, a), fillet: 0, w: 0.3 });
    }
  };
  const nut = (c) => {
    out.push({ a: c - gW / 2 + wand, r: woelbung(P, c) - gD, fillet: 0.22, segs: 2, w: 0.3 });
    out.push({ a: c + gW / 2 - wand, r: woelbung(P, c) - gD, fillet: 0.22, segs: 2, w: 0.3 });
  };
  band(x0 + P.stirnFase, -gP - gW / 2, 4);
  nut(-gP);
  /* GERADE Zahl von Abschnitten: nur so liegt eine Stützstelle exakt auf
     der Bandmitte a = 0, und nur dort liegt der Scheitel der Wölbung. Mit
     einer ungeraden lag D um 0,01 mm daneben — die Sehne statt des
     Scheitels, dieselbe Familie wie Fall 27. */
  band(-gP + gW / 2, gP - gW / 2, 8);
  nut(gP);
  band(gP + gW / 2, x1 - P.stirnFase, 4);
  return out;
}

/* Profil einer Halbschale in der Schnittebene (a = Rohrachse, r = Radius).
   Umlauf: Bohrungskante links → Stirn links → Rücken → Stirn rechts →
   Bohrungskante rechts, geschlossen über die Bohrungsfläche. */
export function shellProfile(P) {
  const B = P.width, x0 = -B / 2, x1 = B / 2;
  const f = P.stirnFase, bf = P.boreChamfer;
  const rKante = woelbung(P, x0);
  return buildProfile([
    { a: x0 + bf, r: P.rShellIn, w: 0.3 },
    { a: x0, r: P.rShellIn + bf, w: 0.3 },
    { a: x0, r: rKante - f, w: 0.3 },
    ...ruecken(P),
    { a: x1, r: rKante - f, w: 0.3 },
    { a: x1, r: P.rShellIn + bf, w: 0.3 },
    { a: x1 - bf, r: P.rShellIn, w: 0.3 },
  ], { segs: 3 });
}

/* Y-Lage der Schalenstirn am Stoß, an der Schaleninnenfläche gemessen.
   Die Stirn ist eine Radialebene im Winkel gapDeg zur Z-Achse; bei
   Radius rShellIn liegt sie am tiefsten. Der grüne Steg setzt dort an,
   damit zwischen Schale und Steg kein Spalt klafft. */
export function stossY(P) {
  return P.rShellIn * Math.tan(P.gapDeg * D2R);
}

/* Wicklung aller Dreiecke umkehren (nicht indizierte Geometrie). */
function wicklungDrehen(g) {
  const a = g.attributes.position.array;
  for (let i = 0; i < a.length; i += 9) {
    for (let k = 0; k < 3; k++) {
      const t = a[i + 3 + k]; a[i + 3 + k] = a[i + 6 + k]; a[i + 6 + k] = t;
    }
  }
  g.computeVertexNormals();
  return g;
}

/* Eine STIRNFLÄCHE des Teilwinkel-Revolves, um die Rohrachse auf ihren
   Winkel gedreht.

   Warum es sie gibt: `revolve` verbindet aufeinanderfolgende Winkel zu
   Vierecken und schließt einen Teilbogen NICHT — die Schale stand an
   allen vier Stoßenden offen, 136 Randkanten je Bogen. Sichtbar als
   Blick ins Schaleninnere neben den Stegen, und im OBJ/GLB-Export als
   Hülle statt Körper. Keine Prüfung konnte es finden: die Stirnebenen
   gehen durch die Rohrachse und tragen zum Volumenintegral exakt 0 bei,
   die Massenprobe stimmte also weiter. Fall 46; das Maß `dicht` zählt
   jetzt die Randkanten.

   Die Umlaufrichtung wird GEMESSEN, nicht geraten: zeigt die
   Flächennormale in den Bogen hinein, wird die Wicklung gedreht. */
function stirnflaeche(prof, theta, ausY, ausZ) {
  const g = capFromProfile(prof, 'x', 1);
  g.rotateX(theta);
  g.computeVertexNormals();
  const n = g.attributes.normal;
  let sy = 0, sz = 0;
  for (let i = 0; i < n.count; i++) { sy += n.getY(i); sz += n.getZ(i); }
  if (sy * ausY + sz * ausZ < 0) wicklungDrehen(g);
  return attribute(g, 0.3);
}

/* EINE Halbschale samt ihren beiden grünen Stegen und beiden
   Stirnflächen. schale = +1 obere (über θ = 0°/360°, +Y),
   −1 untere (über θ = 180°, −Y). Die Lücken liegen bei ±Z.

   Getrennt gebaut, weil die Schelle sich öffnet: als EIN Teil konnte die
   Explosionsansicht genau das nicht zeigen, was das Produkt ausmacht. */
export function buildSchale(P, schale) {
  const prof = shellProfile(P);
  /* Bogenauflösung nach dem Core-Standard SEG_VIS, aber auf eine GERADE
     Zahl gebracht: die Bogenmitte (θ = off + 90°, der Schalenrücken) ist
     dann immer eine Stützstelle. Dort misst die Bohrungssonde — auf einer
     Sehne läse sie systematisch zu klein. */
  const roh = Math.max(24, Math.ceil(((180 - 2 * P.gapDeg) / 360) * SEG_VIS));
  const n = roh + (roh % 2);
  const off = schale > 0 ? 270 : 90;
  const th = arcThetas(off + P.gapDeg, off + 180 - P.gapDeg, n);
  /* Die Winkel der Stirnflächen kommen aus DERSELBEN Liste wie der Bogen,
     nicht aus einer zweiten Rechnung. `arcThetas` bildet den letzten Wert
     als a + (b − a)·1, und das ist in Gleitkomma nicht bitgleich mit b.
     Der Unterschied liegt bei 1e-14 — genug, damit die Stirnfläche neben
     dem Bogenrand landet statt darauf: bei d50 waren 24 Kanten offen,
     bei allen anderen Größen zufällig keine. Ein Fehler, der von der
     Rundung einer Prüfung abhängt, ist keiner, den man tolerieren darf. */
  const t0 = th[0], t1 = th[th.length - 1];

  const geos = [
    revolve(prof, { axis: 'x', thetas: th }),
    /* Nach außen heißt: aus dem Bogen heraus. Der Tangentenvektor bei θ
       ist (0, −sin θ, cos θ); am Anfang zeigt außen dagegen, am Ende mit. */
    stirnflaeche(prof, t0, Math.sin(t0), -Math.cos(t0)),
    stirnflaeche(prof, t1, -Math.sin(t1), Math.cos(t1)),
  ];

  /* Zwei grüne Stege: an jedem Schalenende ein verdickter Klotz, auf dem
     die Stahllasche aufliegt. Er beginnt an der SCHALENINNENFLÄCHE
     (rShellIn) und läuft nach außen — nie in den Rohrkanal hinein.
     Geprüft von `freie-bohrung`. */
  const yIn = stossY(P);
  const stegL = P.stegOut - P.rShellIn;
  const zC = (P.rShellIn + P.stegOut) / 2;
  for (const stoss of [1, -1]) {
    const pad = flachteil(rechteck(P.stegB, stegL, Math.min(2.2, P.stegT * 0.32), FASE),
      P.stegT, FASE, 0.3);
    pad.translate(0, schale * (yIn + P.stegT / 2), stoss * zC);
    geos.push(pad);
  }
  return { geo: mergeGeometries(geos), cap: capFromProfile(prof, 'x', schale) };
}

/* ─────────────────────── Stahllaschen ─────────────────────── */

/* Die zwei Laschen EINER Schale (schale = +1 oben, −1 unten), je eine
   an jedem Stoß. Sie liegen auf dem grünen Steg und reichen über die
   Schale hinaus bis zur Schraubenachse.

   Getrennt nach oben und unten, weil sie in der Explosionsansicht in
   entgegengesetzte Richtungen abheben — ein gemeinsamer Versatzvektor
   könnte nur eine der beiden richtig führen. */
export function buildLaschen(P, schale) {
  const geos = [];
  const yC = schale * (stossY(P) + P.stegT + P.laschT / 2);
  for (const stoss of [1, -1]) {
    /* Die Kontur wird in Weltlage gebaut: v ist eins zu eins die
       Welt-Z-Achse (siehe flachteil). Der Stoß trägt sein Vorzeichen
       deshalb in v — eine gespiegelte Platte entsteht durch die
       gespiegelte KONTUR, nicht durch ein Vorzeichen im translate. */
    const v0 = stoss * P.laschIn, vB = stoss * P.zScrew;
    const s = paddel(P.laschB, v0, vB, P.laschB * 0.22, FASE);
    lochen(s, P.boltD / 2 + 0.2, 0, vB, FASE);
    const g = flachteil(s, P.laschT, FASE, 0.25);
    g.translate(0, yC, 0);
    geos.push(g);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* ─────────────────────── Schrauben ─────────────────────── */

/* Zwei Linsenkopfschrauben mit U-Scheibe, Achse in Y, je eine Schraube
   auf jedem Stoß bei z = ±zScrew.

   Beide zeigen in DIESELBE Richtung — im Foto liegen beide Köpfe auf
   derselben Schale. Damit gibt es keine Seitenlogik und keine Spiegelung:
   eine Geometrie, zweimal gesetzt. (Die Vorfassung baute je Seite eine
   eigene Drehung, setzte aber beide Schrauben auf denselben Stoß und
   schob sie dabei aus den Laschen heraus ins Leere.) */
export function buildSchrauben(P) {
  const geos = [];
  const yLasche = stossY(P) + P.stegT + P.laschT;    // Oberkante obere Lasche
  const aTop = yLasche + P.washT + P.headH;          // Kuppe der Schraube
  const aSitz = yLasche;                             // Auflage der U-Scheibe
  const aGewinde = -yLasche;                         // Unterkante der unteren Lasche
  const aSpitze = aGewinde - P.gewindeUeberstand;    // Schaftende, frei sichtbar
  const fase = Math.min(0.7, P.boltD * 0.12);

  /* Kopf und Schaft in einem Rotationskörper um Y. Die ebene Kuppe endet
     eine Schlitztiefe unter aTop; darauf sitzt die Kreuzscheibe. */
  const kopfOben = aTop - P.slotT;
  const koerper = revolve(buildProfile([
    { a: kopfOben, r: 0 },
    { a: kopfOben, r: P.headFlat / 2, fillet: P.headH * 0.45, segs: 5 },
    { a: aTop - P.headH * 0.78, r: P.headD / 2, fillet: P.headH * 0.2, segs: 3 },
    { a: aTop - P.headH, r: P.headD / 2 },
    { a: aTop - P.headH, r: P.boltD / 2 },
    { a: aGewinde, r: P.boltD / 2 },
    { a: aGewinde, r: 0 },
  ], { segs: 3 }), { axis: 'y', segments: 26 });

  /* Der Gewindeüberstand. Im Foto tritt das Gewinde unter der unteren
     Lasche deutlich heraus; der eingebaute Teil des Schafts bleibt glatt,
     weil er verdeckt ist und jede Windung dort nur Dreiecke kostet.

     ASSUMPTION Profil: `threadProfile` erzeugt ein Whitworth-Gewinde
     (Flankenwinkel 55°, Tiefe 0,640·P). Metrisch wären 60° und 0,613·P —
     bei M8 rund 0,03 mm Unterschied an der Flanke. Für die Ansicht ohne
     Belang, hier benannt statt verschwiegen. Der Core bleibt unberührt. */
  const gaenge = Math.max(2, Math.floor((aGewinde - aSpitze) / P.threadPitch));
  const gewinde = threadProfile(P.boltD, P.threadPitch, gaenge, 'R')
    .map((q) => ({ a: aGewinde - q.a, r: q.r, fillet: q.fillet }));
  const schaft = revolve(buildProfile([
    { a: aGewinde, r: 0 },
    ...gewinde,
    { a: aGewinde - gaenge * P.threadPitch - fase, r: P.boltD / 2 - fase },
    { a: aGewinde - gaenge * P.threadPitch - fase, r: 0 },
    /* 20 Segmente und ein Fillet-Segment: der Überstand ist ein
       Ø8-mm-Zylinder, 18°-Schritte hinterlassen 0,10 mm Sehnenfehler, und
       eine Gewindekuppe von 0,17 mm Radius braucht keine zwei Stützpunkte.
       Mit SEG_INT und segs 2 kostete allein das Gewinde beider Schrauben
       13 900 Dreiecke — mehr als der gesamte Rest des Teils. */
  ], { segs: 1 }), { axis: 'y', segments: 20 });

  /* U-Scheibe: geschlossener Ring, eigenes Teilstück — so bleibt die
     Kante zwischen Kopf und Scheibe sichtbar. */
  const scheibe = revolve(buildProfile([
    { a: aSitz + P.washT, r: P.boltD / 2 + 0.25 },
    { a: aSitz + P.washT, r: P.washD / 2, chamfer: 0.3 },
    { a: aSitz, r: P.washD / 2, chamfer: 0.3 },
    { a: aSitz, r: P.boltD / 2 + 0.25 },
  ], { segs: 2 }), { axis: 'y', segments: 28 });

  /* Kreuzschlitz: dünne Deckscheibe mit kreuzförmigem Durchbruch. Der
     massive Kopf darunter bildet den Schlitzgrund. */
  const deck = new THREE.Shape();
  deck.absarc(0, 0, P.headFlat / 2 - 0.05, 0, Math.PI * 2, false);
  const a2 = P.slotW / 2, b2 = P.slotL / 2;
  const kreuz = new THREE.Path();
  kreuz.moveTo(-a2, -b2); kreuz.lineTo(a2, -b2); kreuz.lineTo(a2, -a2);
  kreuz.lineTo(b2, -a2);  kreuz.lineTo(b2, a2);  kreuz.lineTo(a2, a2);
  kreuz.lineTo(a2, b2);   kreuz.lineTo(-a2, b2); kreuz.lineTo(-a2, a2);
  kreuz.lineTo(-b2, a2);  kreuz.lineTo(-b2, -a2); kreuz.lineTo(-a2, -a2);
  kreuz.closePath();
  deck.holes.push(kreuz);

  for (const stoss of [1, -1]) {
    const kreuzScheibe = flachteil(deck, P.slotT, 0, 0.2);
    kreuzScheibe.translate(0, aTop - P.slotT / 2, 0);
    const g = mergeGeometries([koerper.clone(), scheibe.clone(), schaft.clone(), kreuzScheibe]);
    g.translate(0, 0, stoss * P.zScrew);
    geos.push(g);
  }
  koerper.dispose();
  scheibe.dispose();
  schaft.dispose();
  return { geo: mergeGeometries(geos), cap: null };
}

/* ─────────────────────── Vierkantmuttern ─────────────────────── */

/* Zwei schwarze Vierkantmuttern, im Foto in seitlichen Taschen unter der
   oberen Lasche. Quadratische Außenkontur mit Kreisloch in einem Shape. */
export function buildMuttern(P) {
  const geos = [];
  const yTop = stossY(P) + P.stegT;          // Unterkante der oberen Lasche
  for (const stoss of [1, -1]) {
    const s = sechskant(P.hexAF, FASE);
    lochen(s, P.boltD / 2, 0, 0, FASE);
    const g = flachteil(s, P.hexH, FASE, 0.2);
    g.translate(0, yTop - P.hexH / 2, stoss * P.zScrew);
    geos.push(g);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* ─────────────────────── Gewindestutzen ─────────────────────── */

/* Sechskantstutzen mit DURCHGEHENDER Gewindebohrung, auf dem
   geschlossenen Rücken der unteren Schale.

   Zwei Fehler der Vorfassung sind hier behoben:

     1. Die Lage. `translate(0, top - h + bevel, 0)` rechnete mit einer
        Kontur, die bei y = 0 beginnt — nach rotateX(π/2) lag sie aber
        schon bei y ∈ [−h+bevel, +bevel]. Der Block hing dadurch um
        h − 2·bevel (bei M8: 11,2 mm) UNTER der Schale in der Luft,
        während die Funktion selbst `top` als Oberkante zurückgab. Kein
        Maß hat das gemerkt, weil keines die Lage prüfte.
     2. Der Ort. Der Stutzen stand am unteren Stoß und durchdrang das
        dortige Laschenpaar. Mit der gedrehten Stoßachse steht er auf
        geschlossenem Rücken.

   `top` und `bottom` beschreiben jetzt die tatsächliche Netzlage. */
export function buildStutzen(P) {
  const h = P.nutH;
  const R = P.nutAF / Math.sqrt(3);               // Umkreis des Sechskants
  const rBore = P.threadM / 2;

  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const rr = R - FASE;
    const x = rr * Math.cos(t), yy = rr * Math.sin(t);
    if (i === 0) shape.moveTo(x, yy); else shape.lineTo(x, yy);
  }
  shape.closePath();
  lochen(shape, rBore, 0, 0, FASE);

  const geo = flachteil(shape, h, FASE, 0.4);
  /* Der Stutzen taucht um bossOverlap in die Schale ein — er sitzt auf. */
  const top = -(P.rOut - P.bossOverlap);
  geo.translate(0, top - h / 2, 0);

  /* Schnittfläche für den Halbschnitt: die Ebene z = 0 legt den Stutzen
     der Länge nach frei. Übrig bleiben links und rechts der Bohrung zwei
     Rechtecke — die Sechskantflanke liegt bei z = 0 genau auf der
     Schlüsselweite/2. */
  const w = P.nutAF / 2, y0 = top - h, y1 = top;
  const cap = mergeGeometries([
    polygonCap([[rBore, y0], [w, y0], [w, y1], [rBore, y1]]),
    polygonCap([[-w, y0], [-rBore, y0], [-rBore, y1], [-w, y1]]),
  ]);
  return { geo, cap, rBore, top, bottom: top - h };
}


/* == pipe-clamps/index.js ============================================== */
/* K-Aqua Rohrschelle — Produktpaket nach PRODUKT-VERTRAG.md.

   Sechs Teile aus drei Werkstoffen — das komplexeste Zubehörteil des
   Katalogs. Die Explosionsansicht zeigt die Bewegung, mit der man die
   Schelle wirklich öffnet: die Schrauben nach oben heraus, die
   Vierkantmuttern und der Gewindestutzen nach unten weg.

   ── WARUM DER MASSSATZ SO LANG IST ──
   Die Vorfassung hatte fünf Prüfungen und meldete über alle Größen
   0,00 mm — während drei von vier Teilen falsch im Raum standen: beide
   Schrauben am selben Stoß, keine davon in einer Lasche, der
   Gewindestutzen 11,8 mm unter der Schale in der Luft, die Laschen
   6,4 mm tief im Rohrkanal.

   Der Grund: alle fünf Prüfungen maßen GRÖSSEN (Durchmesser, Breite,
   Bohrungsradius). Keine maß eine LAGE. Ein Teil darf danach an
   beliebiger Stelle stehen, solange es die richtigen Maße hat. Die
   sechs Prüfungen, die jetzt dazugekommen sind, messen Lagebeziehungen
   und die Masse — jede davon hätte einen der Fehler benannt. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

/* Alle Netzpunkte einer Teilegruppe in Weltkoordinaten durchgehen.
   Grundlage der Lageprüfungen: eine Box sagt nur, wie weit ein Teil
   reicht — nicht, wo sein Material liegt. */
function jederPunkt(gruppe, fn) {
  if (!gruppe) return;
  gruppe.updateMatrixWorld(true);
  const v = new THREE.Vector3();
  gruppe.traverse((o) => {
    if (!o.isMesh || /_Schnitt$/.test(o.name)) return;
    const pos = o.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld);
      fn(v);
    }
  });
}

/* Dasselbe über mehrere Teilegruppen. */
function jederPunkt2(A, ids, fn) {
  for (const id of ids) jederPunkt(A.groups[id], fn);
}

/* Offene Randkanten: Kanten, die nur EIN Dreieck benutzt. Bei einem
   geschlossenen Körper gibt es keine.

   Die Punkte müssen dafür VERSCHWEISST werden, und zwar über den Abstand,
   nicht über gerundete Koordinaten. Eine erste Fassung baute den Schlüssel
   aus `toFixed(3)` und meldete bei d50 24 offene Kanten, bei allen anderen
   acht Größen null. Nachgerechnet: die Stirnfläche kam auf z = −25,2515…,
   der Bogenrand auf denselben Wert — aber die beiden Rechenwege legen die
   letzten Bits verschieden, und genau dort lag eine Rundungsgrenze. Eine
   Prüfung, deren Ergebnis von der eigenen Rundung abhängt, prüft nichts.

   Jetzt ein Raster von 0,1 µm mit Nachbarschaftssuche: das liegt vier
   Zehnerpotenzen unter dem kleinsten echten Merkmal (Nutwand 0,35 mm) und
   zehn Zehnerpotenzen über dem Gleitkommarauschen. */
function randkanten(A, ids) {
  const TOL = 1e-4;
  const zellen = new Map();
  const punkte = [];
  const idVon = (x, y, z) => {
    const cx = Math.floor(x / TOL), cy = Math.floor(y / TOL), cz = Math.floor(z / TOL);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const treffer = zellen.get((cx + dx) + ':' + (cy + dy) + ':' + (cz + dz));
          if (treffer === undefined) continue;
          const q = punkte[treffer];
          if (Math.abs(q[0] - x) <= TOL && Math.abs(q[1] - y) <= TOL && Math.abs(q[2] - z) <= TOL) {
            return treffer;
          }
        }
      }
    }
    const id = punkte.length;
    punkte.push([x, y, z]);
    zellen.set(cx + ':' + cy + ':' + cz, id);
    return id;
  };

  const kanten = new Map();
  const v = new THREE.Vector3();
  for (const id of ids) {
    const g = A.groups[id];
    if (!g) continue;
    g.updateMatrixWorld(true);
    g.traverse((o) => {
      if (!o.isMesh || /_Schnitt$/.test(o.name)) return;
      const pos = o.geometry.attributes.position;
      const idx = o.geometry.index;
      const n = idx ? idx.count : pos.count;
      const ecke = [];
      for (let i = 0; i < n; i++) {
        const k = idx ? idx.getX(i) : i;
        v.fromBufferAttribute(pos, k).applyMatrix4(o.matrixWorld);
        ecke.push(idVon(v.x, v.y, v.z));
      }
      for (let i = 0; i + 2 < ecke.length; i += 3) {
        for (let e = 0; e < 3; e++) {
          const a = ecke[i + e], b = ecke[i + ((e + 1) % 3)];
          if (a === b) continue;                    // entartetes Dreieck
          const key = a < b ? a + '|' + b : b + '|' + a;
          kanten.set(key, (kanten.get(key) || 0) + 1);
        }
      }
    });
  }
  let offen = 0;
  for (const anzahl of kanten.values()) if (anzahl === 1) offen++;
  return offen;
}

const product = {
  id: 'accessories/pipe-clamps',
  module: 'kaqua-pipe-clamps',
  titleDe: 'Rohrschelle',
  titleEn: 'Pipe clamps',
  category: 'accessories',
  brandLine: 'K-Aqua PP · Stahl',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'kg'],
  dimensions: ['D'],
  ariaFields: ['d'],

  variants: [],
  states: null,

  tile: 'Befestigt das Rohr an Wand oder Decke — zwei PP-Halbschalen, an ' +
        'beiden Stößen verschraubt, Sechskantstutzen für die Gewindestange.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const SCHALEN = ['schaleOben', 'schaleUnten'];
    const A = createAssembly({
      name: 'K-Aqua_Rohrschelle_d' + size,
      materials: ['pprGreen', 'steel', 'toolBlack'],
      seed: 151,
      clipPlane,
    });

    const schaleOben = buildSchale(P, 1);
    const schaleUnten = buildSchale(P, -1);
    const laschenOben = buildLaschen(P, 1);
    const laschenUnten = buildLaschen(P, -1);
    const schrauben = buildSchrauben(P);
    const muttern = buildMuttern(P);
    const stutzen = buildStutzen(P);

    const yLasche = stossY(P) + P.stegT + P.laschT;
    const ex = P.D;   // Bezugsmaß der Explosionswege

    /* Zwei Halbschalen, zwei Teile. Als eine Gruppe konnte die
       Explosionsansicht nicht zeigen, was das Produkt ausmacht: dass die
       Schelle sich öffnet. Die Wege sind kleiner als die der Laschen,
       damit die Reihenfolge des Zerlegens lesbar bleibt. */
    A.part('schaleOben', {
      name: 'Schale oben', label: 'Halbschale oben (PP)', mat: 'pprGreen',
      geo: schaleOben.geo, cap: schaleOben.cap,
      explode: V3(0, 0.14 * P.D, 0),
      anchor: V3(0, P.rOut + 0.20 * P.D, 0),
    });
    A.part('schaleUnten', {
      name: 'Schale unten', label: 'Halbschale unten (PP)', mat: 'pprGreen',
      geo: schaleUnten.geo, cap: schaleUnten.cap,
      explode: V3(0, -0.14 * P.D, 0),
      anchor: V3(0, -(P.rOut + 0.20 * P.D), 0),
    });
    A.part('laschenOben', {
      name: 'Laschen oben', label: 'Laschen oben (Stahl)', mat: 'steel',
      geo: laschenOben.geo, cap: null,
      explode: V3(0, 0.30 * ex, 0),
      anchor: V3(0, yLasche + 0.10 * ex, P.zScrew),
    });
    A.part('laschenUnten', {
      name: 'Laschen unten', label: 'Laschen unten (Stahl)', mat: 'steel',
      geo: laschenUnten.geo, cap: null,
      explode: V3(0, -0.30 * ex, 0),
      anchor: V3(0, -(yLasche + 0.10 * ex), P.zScrew),
    });
    A.part('schrauben', {
      name: 'Schrauben', label: 'Linsenkopfschrauben M' + P.boltM + ' (Stahl)', mat: 'steel',
      geo: schrauben.geo, cap: null,
      explode: V3(0, 0.66 * ex, 0),
      anchor: V3(0, yLasche + P.washT + P.headH, -P.zScrew),
    });
    A.part('muttern', {
      name: 'Sechskantmuttern', label: 'Sechskantmuttern M' + P.boltM, mat: 'toolBlack',
      geo: muttern.geo, cap: null,
      explode: V3(0, -0.66 * ex, 0),
      anchor: V3(0, stossY(P) + P.stegT - P.hexH, -P.zScrew),
    });
    A.part('stutzen', {
      name: 'Gewindestutzen', label: 'Gewindestutzen ' + P.M + ' (Stahl)', mat: 'steel',
      geo: stutzen.geo, cap: stutzen.cap,
      explode: V3(0, -1.0 * ex, 0),
      anchor: V3(0, stutzen.bottom - 0.12 * ex, 0),
    });

    A.light(V3(0, 0, 0));

    A.hotspot({
      v: V3(0, P.rOut, 0),
      n: V3(0, 1, 0),
      text: 'Balliger Rücken mit zwei Längsnuten und drei Bändern — wie im ' +
        'Studiofoto; die Schale fasst das Rohr direkt, ohne Einlage',
    });
    A.hotspot({
      v: V3(0, stutzen.top - P.nutH * 0.5, 0),
      n: V3(0, -1, 0),
      text: 'Anschluss ' + P.M + ' für die Gewindestange der Deckenbefestigung — ' +
        'auf dem geschlossenen Rücken, nicht am Stoß. Die Bohrung ist glatt ' +
        'dargestellt; die Gewindegänge liegen unter der Auflösung dieser Ansicht',
    });
    A.hotspot({
      v: V3(0, yLasche, -P.zScrew),
      n: V3(0, 0.55, -0.84),
      text: 'Beide Stöße sind gleich verschraubt: Stahllasche mit rundem ' +
        'Paddelende, Linsenkopfschraube M' + P.boltM + ', schwarze Sechskantmutter — die Schelle ' +
        'öffnet ganz, das Rohr muss nicht eingeschoben werden',
    });

    /* Die Maßlinien liegen in der Schnittebene z = 0 und seitlich neben
       dem Bauteil. Bei z = rOut + Zuschlag stünden sie mitten in den
       Laschen — dort liefen sie durch Material. */
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.width * 1.4, -P.rOut, 0), b: V3(-P.width * 1.4, P.rOut, 0),
      off: V3(P.width, 0, 0) });
    A.dim({ label: 'd', value: P.d,
      a: V3(P.width * 1.4, -P.rInner, 0), b: V3(P.width * 1.4, P.rInner, 0),
      off: V3(-P.width, 0, 0) });

    A.measures = [
      /* ── GRÖSSEN ── */
      /* Außendurchmesser: über Y gemessen, wo die Schale geschlossen ist.
         Die Z-Ausdehnung wäre falsch — dort stehen Stege und Laschen über. */
      { key: 'D', label: DIMENSION_KEY.D + ' (abgeleitet)', soll: P.D,
        ist: () => { const b = A.boxOf(SCHALEN); return r2(b.max.y - b.min.y); } },
      /* Lichte Weite: von der Achse radial gegen die Schaleninnenfläche.
         Sie MUSS das Rohr aufnehmen — kleiner als d hieße klemmen. */
      { key: 'd', label: 'lichte Weite (Rohr-Ø + Spiel)', soll: r2(P.d + 0.6),
        ist: () => {
          const hit = A.probeAxial('schaleOben', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? r2(2 * hit.y) : NaN;
        } },
      { key: 'breite', label: 'Bandbreite (abgeleitet)', soll: P.width,
        ist: () => { const b = A.boxOf(SCHALEN); return r2(b.max.x - b.min.x); } },
      /* Gewindebohrung im Stutzen: gemessen wird ihr RADIUS. Der kleinste
         Abstand aller Stutzenpunkte von der Bohrungsachse ist bei
         durchgehender Bohrung der Bohrungsradius, bei massivem Block 0. */
      { key: 'bohrung', label: 'Bohrungsradius Stutzen', soll: stutzen.rBore,
        ist: () => {
          let min = Infinity;
          jederPunkt(A.groups.stutzen, (v) => {
            const r = Math.hypot(v.x, v.z);
            if (r < min) min = r;
          });
          return Number.isFinite(min) ? r2(min) : NaN;
        } },

      /* ── LAGEN. Die sechs Prüfungen, die gefehlt haben. ── */

      /* 1 · Nichts ragt in den Rohrkanal. Der kleinste Abstand ALLER
         Schalenpunkte von der Rohrachse ist die engste Stelle, durch die
         das Rohr muss. Die Vorfassung las hier 10,14 statt 16,30: die
         Laschen standen 6,4 mm tief im Kanal. */
      { key: 'freie-bohrung', label: 'engste Stelle im Rohrkanal', soll: r2(P.rShellIn),
        ist: () => {
          let min = Infinity;
          jederPunkt2(A, SCHALEN, (v) => {
            const r = Math.hypot(v.y, v.z);
            if (r < min) min = r;
          });
          return Number.isFinite(min) ? r2(min) : NaN;
        } },

      /* 2 · Die vier Stege liegen spiegelbildlich zur Teilungsebene.
         Gemessen wird nur Material AUSSERHALB der Schale — dort steht
         nichts als Steg. Liegen die Stege richtig, hebt sich ihre obere
         gegen ihre untere Y-Grenze auf. Die Vorfassung las 2,22: eine
         Seite ragte über die Teilungsebene in die Gegenschale. */
      { key: 'stege-spiegel', label: 'Stege spiegelbildlich (0 = ja)', soll: 0,
        ist: () => {
          let lo = Infinity, hi = -Infinity;
          jederPunkt2(A, SCHALEN, (v) => {
            if (Math.abs(v.z) < P.rOut * 1.02) return;
            if (v.y < lo) lo = v.y;
            if (v.y > hi) hi = v.y;
          });
          return Number.isFinite(lo) && Number.isFinite(hi) ? r2(Math.abs(hi + lo)) : NaN;
        } },

      /* 3 · Jeder Stoß trägt genau eine Schraube. Getrennt nach dem
         Vorzeichen von z gemittelt; steht ein Stoß leer, gibt es dort
         keinen einzigen Punkt. Die Vorfassung hatte beide Schrauben am
         selben Stoß — und blieb grün, weil die alte Symmetrieprüfung nur
         die Box-Ränder verglich, die auch dann spiegelbildlich sind. */
      { key: 'stoss-besetzt', label: 'Schraubenmitte je Stoß (0 = beide richtig)', soll: 0,
        ist: () => {
          let np = 0, nn = 0, sp = 0, sn = 0;
          jederPunkt(A.groups.schrauben, (v) => {
            if (v.z > 0) { np++; sp += v.z; } else { nn++; sn += v.z; }
          });
          if (!np || !nn) return 999;      // ein Stoß ohne Schraube
          return r2(Math.abs(sp / np - P.zScrew) + Math.abs(-sn / nn - P.zScrew));
        } },

      /* 4 · Die Schraube fasst das Laschenpaar über seine ganze Höhe.
         Gemessen wird die Überdeckung der Schaftstrecke mit der Strecke
         von der Unterkante der unteren bis zur Oberkante der oberen
         Lasche. Die Vorfassung las 0: die Schrauben lagen vollständig
         neben den Laschen. */
      { key: 'schraubenfassung', label: 'Überdeckung Schaft ↔ Laschenpaar', soll: r2(2 * yLasche),
        ist: () => {
          const s = A.boxOf(['schrauben']);
          const u = A.boxOf(['laschenUnten']), o = A.boxOf(['laschenOben']);
          return r2(Math.max(0, Math.min(s.max.y, o.max.y) - Math.max(s.min.y, u.min.y)));
        } },

      /* 5 · Der Gewindestutzen sitzt auf der Schale, er schwebt nicht.
         Eintauchtiefe = Oberkante Stutzen über der Schalenaußenfläche.
         Die Vorfassung las −11,80: so weit hing der Block in der Luft. */
      { key: 'stutzen-sitzt', label: 'Eintauchtiefe Stutzen in die Schale', soll: P.bossOverlap,
        ist: () => { const b = A.boxOf(['stutzen']); return r2(b.max.y + P.rOut); } },

      /* 6 · DICHTHEIT. Zahl der Kanten, die nur ein Dreieck benutzt.
         Bei einem geschlossenen Körper ist sie 0.

         `revolve` verbindet aufeinanderfolgende Winkel zu Vierecken und
         schließt einen TEILBOGEN nicht. Die Schalen standen dadurch an
         allen vier Stoßenden offen — 136 Randkanten je Bogen, 272 in der
         Baugruppe. Neben den Stegen sah man in die Schale hinein, und der
         OBJ/GLB-Export lieferte eine Hülle statt eines Körpers.

         Warum es keine der zehn anderen Prüfungen fand: die Stirnebenen
         gehen durch die Rohrachse, ihr Beitrag zum Volumenintegral ist
         exakt 0 — die Massenprobe stimmte weiter. Fall 46. */
      { key: 'dicht', label: 'offene Randkanten der Schalen (0 = dicht)', soll: 0,
        ist: () => randkanten(A, SCHALEN) },

      /* 7 · DIE WAAGE. Netzvolumen × Dichte gegen die kg-Spalte — die
         einzige Größenangabe der Quelle außer der Nennweite. Sie fängt
         jede Gestalt, die zwar maßhaltig, aber unplausibel massiv ist:
         die Vorfassung lag bei d110 um +107 % daneben. */
      { key: 'masse', label: 'Masse aus dem Volumen (PP 0,9 · Stahl 7,85)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            const dichte = t.id.startsWith('schale') ? 0.9 : 7.85;
            let v = 0;
            t.obj.traverse((o) => { if (o.isMesh && !/_Schnitt$/.test(o.name)) v += meshVolume(o.geometry); });
            g += (v * dichte) / 1e6;
          }
          return Math.round(g * 1000) / 1000;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
