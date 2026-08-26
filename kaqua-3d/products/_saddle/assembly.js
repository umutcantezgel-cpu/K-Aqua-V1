/* K-Aqua Anbohrsättel — gemeinsame Baugruppe für alle drei Bauarten.

   Ein Aufruf, drei Produkte: Muffe, Innengewinde, Außengewinde. Was sie
   unterscheidet, steckt in cfg; was sie teilen, ist alles andere —
   Fußteller, Sattelschnitt, Bohrung, Messsatz.

   Der Messsatz misst am gebauten NETZ, nicht mit Strahlen. Beim
   Reduzier-T-Stück und beim Flanschadapter hat sich gezeigt, dass
   Strahlen an Kreuzungen die falsche Fläche treffen und schmale Fenster
   leer sein können; hier kommt beides zusammen. */

import * as THREE from 'three';
import {
  buildProfile, capFromProfile, createAssembly, revolve,
  threadRing, D2R, SEG_VIS,
} from '../../core/index.js';
import { sattelParams } from './params.js';
import { sattelRevolve, sattelY, satteltiefe } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;
const komma = (v) => String(v).replace('.', ',');

/* Die Unterseite bekommt eigene Zwischenpunkte. Ohne sie liegt zwischen
   Bohrungsrand und Tellerrand nur eine Sehne, und der Sattel wäre dort
   nicht gekrümmt, sondern gefast. */
function bodenPunkte(rVon, rBis, yBase, n = 8) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push({ a: yBase, r: rVon + ((rBis - rVon) * i) / n, fillet: 0 });
  }
  return out;
}

export function buildSattel(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = sattelParams(a, cfg);
  const gewinde = cfg.art !== 'muffe';

  const A = createAssembly({
    name: cfg.exportName + '_' + String(size).replace(/[^0-9a-zA-Z]/g, '_'),
    materials: gewinde ? ['pprGreen', 'brass'] : ['pprGreen'],
    seed: cfg.seed,
    clipPlane,
  });

  /* Tiefster Punkt der Schnittkurve, ein Millimeter darunter — von dort
     hebt sattelRevolve jeden Punkt auf seine eigene Höhe. */
  const yBase = sattelY(P.mainR, P.rTeller, Math.PI / 2) - 1;
  const yTeller = P.mainR + P.tellerDicke;
  const flanke = Math.max(3, 0.30 * (P.yTop - yTeller));

  const outer = [
    { a: yBase, r: P.rTeller, fillet: 0 },
    { a: yTeller, r: P.rTeller, fillet: Math.min(2.0, P.tellerDicke * 0.5) },
    /* w = 1 auf dem Bossmantel: dort sitzen die Griffrippen (M10). */
    { a: yTeller + flanke, r: P.rBoss, fillet: 1.5, w: 1 },
    { a: P.yTop - 1.4, r: P.rBoss, fillet: 0.4, w: 1 },
    { a: P.yTop, r: P.rBoss, chamfer: 1.0, w: 0 },
  ];

  let inner;
  if (cfg.art === 'muffe') {
    const rSock = (y) => P.d1 / 2 - P.sockTaper * (P.yTop - y);
    inner = [
      { a: P.yTop, r: P.d1 / 2 + P.lead, fillet: 0 },
      { a: P.yTop - 2, r: rSock(P.yTop - 2), fillet: 0.4 },
      { a: P.yTop - P.socket, r: rSock(P.yTop - P.socket), fillet: 1.0 },
      { a: P.yTop - P.socket, r: P.boreR, fillet: 1.0 },
      /* Ein Netzpunkt auf halbem Weg. buildProfile unterteilt gerade
         Strecken nicht, und ohne diesen Punkt hat der Durchgang
         zwischen Muffengrund und Bohrungsstufe ÜBERHAUPT KEINEN Punkt —
         jede Messung dort fände nur die Außenkontur vor und läse den
         Stutzendurchmesser statt des Durchgangs. Das ist heute der
         vierte Fall dieser Art; die Regel lautet: wo gemessen werden
         soll, muss ein Profilpunkt liegen. */
      { a: (P.yTop - P.socket + P.mainR + 2) / 2, r: P.boreR, fillet: 0 },
      { a: P.mainR + 2, r: P.boreR, fillet: 0.8 },
      { a: P.mainR + 2, r: P.rFuss, fillet: 0.8 },
      { a: yBase, r: P.rFuss, fillet: 0 },
    ];
  } else {
    const rRing = P.ringOD / 2;
    inner = [
      { a: P.yTop, r: rRing, chamfer: 0.5 },
      { a: P.yTop - P.ringLen, r: rRing, fillet: 0.5 },
      { a: P.yTop - P.ringLen, r: P.boreR, fillet: 0.8 },
      { a: (P.yTop - P.ringLen + P.mainR + 2) / 2, r: P.boreR, fillet: 0 },
      { a: P.mainR + 2, r: P.boreR, fillet: 0.8 },
      { a: P.mainR + 2, r: P.rFuss, fillet: 0.8 },
      { a: yBase, r: P.rFuss, fillet: 0 },
    ];
  }
  inner.push(...bodenPunkte(P.rFuss, P.rTeller, yBase));

  const profile = buildProfile([...outer, ...inner], { segs: 4 });

  /* ── Griffrippen (M10): vier PAARE schmaler Längsstege am Boss ──
     Beide Fotos (AQ130SP, AQ130GSP) zeigen sie deutlich; kein
     Tabellenmaß bemaßt sie. ASSUMPTION Steghöhe 1,2 mm, Stegbreite ~5°,
     Paarabstand ~12° — aus den Fotos abgelesen. Die Modulation wirkt
     nur auf den w=1-Punkten des Bossmantels; der Sattelschnitt rechnet
     mit dem Grundradius. */
  /* Die Rippenrücken tragen das Tabellenmaß: der Grundzylinder liegt
     eine Steghöhe darunter (dieselbe Konvention wie die Riffelung der
     Übergangsmuffen — Nennmaß auf dem Rücken, Fall 6 andersherum). */
  const ribH = Math.max(1.0, 0.028 * P.rBoss);
  const stegHalb = 2.5 * Math.PI / 180;
  const paarVersatz = 6 * Math.PI / 180;
  const paarRib = (th) => {
    const viertel = Math.PI / 2;
    let x = ((th % viertel) + viertel) % viertel;
    if (x > viertel / 2) x -= viertel;
    const naeher = Math.min(Math.abs(x - paarVersatz), Math.abs(x + paarVersatz));
    if (naeher > stegHalb) return -ribH;
    return -ribH * (1 - Math.cos((naeher / stegHalb) * Math.PI / 2));
  };
  const ribThetas = [];
  {
    const K = 4 * 36;                    // 9 Schritte je Steg-Paarzone
    for (let j = 0; j <= K; j++) ribThetas.push((j / K) * Math.PI * 2);
  }
  const geo = sattelRevolve(profile, { mainR: P.mainR, thetas: ribThetas, mod: paarRib });

  /* Schnittkappe: dieselbe Kontur, aber mit der Unterseite auf der
     Schnittebene θ = 0. Dort ist die Schnittkurve genau y = mainR —
     der Scheitel des Rohrs. */
  const capProfile = buildProfile(
    [...outer, ...inner].map((p) => ({ ...p, a: Math.max(p.a, P.mainR) })),
    { segs: 4 }
  );

  A.part('koerper', {
    name: 'Sattelkoerper', label: 'Anbohrsattel (PP-R)', mat: 'pprGreen',
    geo, cap: capFromProfile(capProfile, 'y'),
    anchor: V3(0, P.yTop + 0.22 * P.h, P.rBoss * 0.6),
  });

  let ringGeo = null;
  if (gewinde) {
    const ring = cfg.gewindeArt === 'Rp'
      ? threadRing({
          a0: P.yTop - P.ringLen, a1: P.yTop, rOuter: P.ringOD / 2,
          od: P.threadOD, pitch: P.threadPitch, turns: P.turns, axis: 'y',
        })
      : aussenGewindeZapfen(P);
    ringGeo = ring.geo;
    A.part('messing', {
      name: 'Messingteil',
      label: cfg.gewindeArt === 'Rp'
        ? 'Messingring Rp' + a.gewinde + '"'
        : 'Messingzapfen R' + a.gewinde + '"',
      mat: 'brass',
      geo: ring.geo, cap: ring.cap,
      explode: V3(0, 0.85 * P.h, 0),
      anchor: V3(0, P.yTop + 0.42 * P.h, -P.rBoss * 0.7),
    });
  }

  A.light(V3(-P.mainR * 0.8, P.mainR * 0.4, 0));
  A.light(V3(P.mainR * 0.8, P.mainR * 0.4, 0));

  A.hotspot({
    v: V3(P.rTeller * 0.82, sattelY(P.mainR, P.rTeller * 0.82, 0) + 0.6, 0),
    n: V3(0.5, 0.86, 0),
    text: 'Sattelfläche für Rohre d' + P.rohrMin + ' bis d' + P.rohrMax +
      ' — gekrümmt auf d' + P.mainD + ', Satteltiefe ' + komma(P.satteltiefe) + ' mm',
  });
  A.hotspot({
    v: V3(P.rFuss * 0.7, P.mainR + 1.2, P.rFuss * 0.7),
    n: V3(0.4, 0.82, 0.4),
    text: 'Bohrung im Hauptrohr Ø ' + a.d2 + ' mm — Bohrwerkzeug AQ986' + a.d2,
  });

  const zf = P.rBoss + 0.30 * P.h;
  A.dim({
    label: 'h', value: P.h,
    a: V3(P.rBoss + 0.5 * P.h, P.mainR, zf),
    b: V3(P.rBoss + 0.5 * P.h, P.yTop, zf),
    off: V3(0.18 * P.h, 0, 0),
  });

  /* ── Messungen am Netz ──────────────────────────────────────────── */
  const pos = geo.attributes.position.array;
  const inFenster = (y0, y1) => {
    let max = 0, min = Infinity, n = 0;
    for (let i = 0; i < pos.length; i += 3) {
      const y = pos[i + 1];
      if (y < y0 || y > y1) continue;
      const r = Math.hypot(pos[i], pos[i + 2]);
      if (r > max) max = r;
      if (r < min) min = r;
      n++;
    }
    return { max, min, n };
  };
  /* Höhe der Unterseite an einem Winkel, aus dem Netz gelesen: der
     kleinste y unter allen Punkten, deren Winkel nahe θ liegt und deren
     Radius nahe r. */
  const bodenY = (theta, rZiel) => {
    let best = Infinity;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i], z = pos[i + 2];
      const r = Math.hypot(x, z);
      if (Math.abs(r - rZiel) > 0.35) continue;
      const th = Math.atan2(z, x);
      const d = Math.abs(Math.atan2(Math.sin(th - theta), Math.cos(th - theta)));
      if (d > 0.04) continue;
      if (pos[i + 1] < best) best = pos[i + 1];
    }
    return best;
  };

  A.measures = [
    /* h zählt ab der ROHROBERFLÄCHE, also ab dem Scheitel der
       Schnittkurve — nicht ab dem tiefsten Punkt des Sattels. Genau
       deshalb wird hier nicht die Bauhöhe der Box gemessen. */
    { key: 'h', label: cfg.dimensionKey.h, soll: P.h,
      ist: () => r2(A.boxOf(['koerper']).max.y - P.mainR) },
    /* Der Sattelfuß: Durchmesser der Bohrung, die er im Rohr verlangt.
       Gemessen ÜBER DIE GANZE UNTERE HÄLFTE, nicht in einem schmalen
       Band knapp über dem Rohr: dort liegt der Verrundungsradius der
       Bohrungsstufe, und die Messung las 0,47 mm zu wenig. Unterhalb
       der Stufe ist die Bohrung der engste Punkt des ganzen Teils. */
    { key: 'd2', label: cfg.dimensionKey.d2, soll: a.d2,
      ist: () => r2(2 * inFenster(0, P.mainR + 1.0).min) },
    /* DER SATTEL SELBST. Die Unterseite muss längs des Rohrs höher
       liegen als quer dazu — sonst ist sie eben und das Teil kein
       Sattel. Gemessen am Tellerrand, an zwei Winkeln, aus dem Netz. */
    { key: 'satteltiefe', label: 'Satteltiefe am Tellerrand',
      soll: r2(satteltiefe(P.mainR, P.rTeller)),
      ist: () => {
        const laengs = bodenY(0, P.rTeller);
        const quer = bodenY(Math.PI / 2, P.rTeller);
        return isFinite(laengs) && isFinite(quer) ? r2(laengs - quer) : NaN;
      } },
    /* GEGENPROBE zur Satteltiefe: längs des Rohrs MUSS die Unterseite
       genau auf dem Rohrscheitel liegen, also auf mainR. Ein Teil, das
       hier danebenliegt, sitzt nicht auf dem Rohr. */
    { key: 'scheitel', label: 'Unterseite auf dem Rohrscheitel', soll: r2(P.mainR),
      ist: () => { const y = bodenY(0, P.rTeller); return isFinite(y) ? r2(y) : NaN; } },
    ...(gewinde ? gewindeMessungen(A, P, a, cfg, ringGeo) : []),
    ...cfg.messungen(P, a, { inFenster, bodenY, A }),
  ];

  A.setExplode(0);
  A.setSection(false, clipPlane);
  A.P = P;
  return A;
}

/* Messungen am Messingteil. Sie stehen HIER und nicht in den
   Produktdateien, weil nur hier die Ringgeometrie in Reichweite ist —
   und weil beide Gewindesättel dieselben zwei Fragen beantworten
   müssen. */
function gewindeMessungen(A, P, a, cfg, ringGeo) {
  const rp = cfg.gewindeArt === 'Rp';
  const pos = ringGeo.attributes.position.array;
  const imBand = (y0, y1) => {
    let max = 0, min = Infinity, n = 0;
    for (let i = 0; i < pos.length; i += 3) {
      const y = pos[i + 1];
      if (y < y0 || y > y1) continue;
      const r = Math.hypot(pos[i], pos[i + 2]);
      if (r > max) max = r;
      if (r < min) min = r;
      n++;
    }
    return { max, min, n };
  };
  const yGew0 = P.yTop - P.ringLen + (rp ? 1.0 : P.ringLen * 0.35);
  const band = imBand(yGew0 + P.threadPitch * 0.6, yGew0 + P.threadPitch * 2.4);

  return [
    /* DIE GEGENPROBE ZU h. Der Katalog führt für Innen- und
       Außengewindesattel DIESELBEN h (43 bei d2 = 25, 50 bei d2 = 32),
       obwohl der Außengewindezapfen rund 15 mm weiter aufbaut. h misst
       also den KUNSTSTOFFKÖRPER, nicht das ganze Teil. Diese Messung
       hält den Unterschied fest: beim Innengewinde schließt das Messing
       bündig ab, beim Außengewinde steht es über. Ein Modell, bei dem
       beide dasselbe melden, hätte den Befund nicht verstanden. */
    { key: 'ueberstand', label: 'Überstand des Messings über den Kunststoff',
      soll: rp ? 0 : r2(P.ringLen * 0.9),
      ist: () => r2(Math.max(0, A.boxOf(['messing']).max.y - P.yTop)) },
    /* Der Gewindedurchmesser am Netz: beim Innengewinde ist die Kuppe
       der ENGSTE Punkt (Kerndurchmesser), beim Außengewinde der
       WEITESTE (Nenndurchmesser). Dass es dieselbe Messung mit
       verschiedenem Vorzeichen ist, ist der Punkt. */
    rp
      ? { key: 'kern', label: 'Innengewinde-Kerndurchmesser', soll: P.threadCore,
          ist: () => (band.n ? r2(2 * band.min) : NaN) }
      : { key: 'gewinde', label: 'Gewinde-Außendurchmesser R' + a.gewinde + '"',
          soll: r2(P.threadOD), ist: () => (band.n ? r2(2 * band.max) : NaN) },
  ];
}

/* Außengewindezapfen für den AG-Sattel. Der IG-Sattel nimmt threadRing
   aus dem Core; ein Außengewinde ist dort nicht vorgesehen, weil es
   keinen Ring, sondern einen Zapfen braucht. */
function aussenGewindeZapfen(P) {
  const rThread = P.threadOD / 2;
  const y0 = P.yTop - P.ringLen;
  const y1 = P.yTop + P.ringLen * 0.9;
  const gewinde = threadProfilLokal(P, y0 + P.ringLen * 0.35, y1);
  const outer = [
    { a: y0, r: P.ringOD / 2 - 0.15, chamfer: 0.5 },
    { a: y0 + P.ringLen * 0.3, r: P.ringOD / 2 - 0.15, fillet: 0.5 },
    { a: y0 + P.ringLen * 0.35, r: Math.min(P.ringOD / 2 - 0.15, rThread + 0.4), chamfer: 0.5 },
    ...gewinde,
    { a: y1, r: rThread * 0.93, chamfer: 0.8 },
  ];
  const inner = [
    { a: y1, r: P.boreR + 0.4, fillet: 0.5 },
    { a: y0, r: P.boreR, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'y'),
  };
}

/* Kegeliges R-Gewinde auf der Y-Achse. threadProfile im Core baut auf
   einer 0-Basis; hier wird es nur verschoben und beschnitten. */
function threadProfilLokal(P, yVon, yBis) {
  const h = 0.640327 * P.threadPitch;
  const rd = Math.max(0.3, 0.137 * P.threadPitch);
  const setback = rd * (1 / Math.sin(27.5 * D2R) - 1);
  const rMaj = P.threadOD / 2;
  const out = [];
  for (let i = 0; i <= P.turns; i++) {
    const a0 = yVon + i * P.threadPitch;
    if (a0 > yBis) break;
    const shrink = (a0 - yVon) / 32;
    out.push({ a: a0, r: rMaj - shrink + setback, fillet: rd });
    const aM = a0 + P.threadPitch * 0.5;
    if (i < P.turns && aM <= yBis) {
      out.push({ a: aM, r: rMaj - shrink - h, fillet: rd });
    }
  }
  return out;
}

