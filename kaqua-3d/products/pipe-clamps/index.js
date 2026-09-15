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

import * as THREE from 'three';
import { createAssembly, meshVolume } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import {
  buildSchale, buildLaschen, buildSchrauben, buildMuttern, buildStutzen, stossY,
} from './parts.js';

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

export default product;
