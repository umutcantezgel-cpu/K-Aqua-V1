/* K-Aqua 3D · Überbogen — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/cross-over.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_INT, SEG_VIS, bridgePath, circleLoop, createAssembly, fusionDepth, materials, mergeGeometries, polygonCap, socketOD, sweepPath,
} from '../kaqua-3d-core.mjs';

/* == _crossover/params.js ============================================== */
/* K-Aqua Überbögen — gemeinsame Parametrik.

   Zwei Produkte, eine Bahn: das Fitting mit Schweißmuffen an beiden
   Enden (AQ287) und das gebogene Rohr mit Spitzenden (AQ285). Beide
   führen ein Rohr über ein kreuzendes hinweg, beide haben ihre Enden in
   einer Flucht, beide brauchen deshalb VIER Bögen. Die Bahn selbst
   rechnet `bridgePath` im Core.

   ── H IST DIE BAUHÖHE, NICHT DIE ACHSANHEBUNG ──

   Beide Maßskizzen auf S. 91 spannen H über das GANZE Teil: von der
   Unterkante des Anschlusses bis zur Oberkante des Scheitels. Was
   `bridgePath` braucht, ist aber die Anhebung der ACHSE. Der Unterschied
   ist der halbe Anschlussdurchmesser unten plus der halbe
   Scheiteldurchmesser oben — und der ist bei den beiden Produkten
   verschieden, weil das Fitting unten eine Muffe trägt und das Rohr
   nicht.

   Diese Umrechnung steht hier und nicht in den Produkten: zweimal
   geschrieben würde sie driften (Fall 32).

   ── DIE MASSE ENTSCHEIDET, WELCHE DEUTUNG GILT ──

   Für H kamen drei Lesarten in Frage. Die Maßskizze legt die erste nahe
   (die Pfeile enden an der Unterkante der Muffe und an der Oberkante des
   Scheitels), aber diese Skizzen haben sich in diesem Katalog schon als
   maßstabslos erwiesen. Entschieden hat es die tabellierte MASSE: aus
   der Bahnlänge und den Querschnitten lässt sich das Gewicht rechnen,
   und nur eine Lesart trifft es.

       Deutung von H                d20      d25      d32
       Bauhöhe                     −7,5 %   +8,3 %   +0,8 %
       Achse bis Scheitelspitze   +15 %    +38 %    +32 %
       Achsanhebung               +43 %    +75 %    +70 %

   Die erste liegt in allen drei Zeilen innerhalb der Rundung einer auf
   zwei Nachkommastellen angegebenen Kilogrammzahl. Die beiden anderen
   sind systematisch zu schwer, und zwar zunehmend mit der Größe — das
   ist die Handschrift eines zu langen Bogens, nicht die einer Rundung.

   Die Rechnung läuft unten als P.kgGerechnet mit und steht damit in
   jedem Prüfbericht.

   ── WAS DABEI AUFFÄLLT UND NICHT AUFGELÖST IST ──

   Mit dieser Deutung bleibt unter dem Scheitel nur wenig Luft: 3,8 mm
   bei d20 bis 5,3 mm bei d32, also rund ein Fünftel der Nennweite. Ein
   kreuzendes Rohr GLEICHER Nennweite passt da nicht hindurch — dafür
   bräuchte es mehr als den halben Rohrdurchmesser.

   Naheliegend wäre gewesen, daraus auf eine andere Lesart von H zu
   schließen. Die Masse verbietet das. Der Überbogen überquert also
   entweder etwas Dünneres als ein gleich großes Rohr, oder die beiden
   Rohre liegen ohnehin schon versetzt und er überbrückt nur den Rest.
   NICHT aufgelöst; die lichte Höhe wird als P.durchlass mitgeführt,
   damit die Zahl im Bericht steht statt in einer Vermutung. */


export function crossoverParams(a, cfg) {
  const P = Object.assign({}, a);
  const d = a.d;

  P.len = a.L;
  P.hoehe = a.H;
  P.wallPipe = cfg.art === 'rohr' ? a.s : d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* Der Scheitel führt bei beiden Produkten das Rohrmaß. */
  P.scheitelOD = cfg.art === 'rohr' ? d : d + 2 * P.wallPipe;
  P.rScheitel = P.scheitelOD / 2;

  if (cfg.art === 'rohr') {
    /* Spitzenden: unten liegt das Rohr selbst an. */
    P.endOD = d;
    P.socket = 0;
    /* ANNAHME gerade Endstrecke. Nicht bemaßt. Angesetzt 0,27·L, aus der
       Maßskizze abgeschätzt — der Höcker nimmt dort etwa das mittlere
       Drittel ein.

       VERSUCHT UND VERWORFEN, sie aus der Masse herzuleiten. Die Idee
       war richtig, die Empfindlichkeit reicht nicht: die Bahnlänge
       wächst bei d20 von 371 mm (t = 0) auf nur 382 mm (t = 100), also
       um drei Prozent über den ganzen plausiblen Bereich. Eine auf zwei
       Nachkommastellen gerundete Kilogrammzahl kann daraus nichts
       festlegen. Die Masse bestätigt den Gesamtmaßstab — mehr nicht, und
       das steht hier, damit niemand die Rechnung für schärfer hält als
       sie ist.

       Was an der Annahme hängt, ist der Biegeradius. Er wird unten
       mitgeführt; bleibt er über dem Rohrdurchmesser, ist die Annahme
       wenigstens fertigbar. */
    P.tEnde = 0.27 * a.L;
  } else {
    P.endOD = socketOD(d);
    if (!P.endOD) throw new Error('K-Aqua Überbogen d' + d + ': kein Muffen-Außendurchmesser');
    P.socket = fusionDepth(d);
    if (!P.socket) throw new Error('K-Aqua Überbogen d' + d + ': keine Schweißtiefe');
    /* Die Tabelle führt t — die gerade Strecke am Ende. */
    P.tEnde = a.t;
  }
  P.rEnd = P.endOD / 2;

  /* Umrechnung Bauhöhe → Achsanhebung. */
  P.hAchse = a.H - P.rEnd - P.rScheitel;

  if (P.hAchse <= 1) {
    throw new Error('K-Aqua Überbogen d' + d + ': Bauhöhe ' + a.H +
      ' lässt nach Abzug der Anschlüsse nur ' + P.hAchse.toFixed(1) +
      ' mm Achsanhebung — die Deutung von H kann nicht stimmen');
  }

  /* Was bridgePath daraus macht, hier zur Probe nachgerechnet. */
  const half = a.L / 2 - P.tEnde;
  P.bogenWinkel = Math.round((2 * Math.atan2(P.hAchse, half)) / D2R * 10) / 10;
  P.bogenR = Math.round((P.hAchse / (2 * (1 - Math.cos(P.bogenWinkel * D2R)))) * 10) / 10;
  P.bogenRJeD = Math.round((P.bogenR / d) * 100) / 100;

  /* Lichte Höhe unter dem Scheitel. KEIN Wächter, nur eine Zahl: was
     dort hindurchpassen soll, sagt der Katalog nicht, und eine Schranke
     ohne Beleg wäre eine Vermutung mit Abbruchrecht. */
  P.durchlass = Math.round((P.hAchse - P.rScheitel) * 10) / 10;
  P.durchlassJeD = Math.round((P.durchlass / d) * 100) / 100;

  /* ── Massenprobe ──
     Die Bahnlänge ist 2t + 4·R·α. Mit den Querschnitten ergibt das ein
     Gewicht, das gegen die Tabelle steht. PP-R hat 0,9 g/cm³. */
  const bahnLen = 2 * P.tEnde + 4 * P.bogenR * (P.bogenWinkel * D2R);
  P.bahnLen = Math.round(bahnLen * 10) / 10;
  const aRohr = (Math.PI / 4) * (P.scheitelOD ** 2 - P.bore ** 2);
  const aMuffe = cfg.art === 'muffe'
    ? (Math.PI / 4) * (P.endOD ** 2 - d ** 2) : 0;
  const vol = 2 * P.socket * aMuffe + (bahnLen - 2 * P.socket) * aRohr;
  P.kgGerechnet = Math.round((vol * 0.9) / 1e6 * 1000) / 1000;
  P.kgAbweichung = a.kg ? Math.round((P.kgGerechnet / a.kg - 1) * 1000) / 10 : null;

  if (half <= 1) {
    throw new Error('K-Aqua Überbogen d' + d + ': die geraden Enden lassen keinen Platz für den Bogen');
  }
  /* Die Massenprobe ist die schärfste Zusicherung, die dieses Produkt
     hat — sie prüft Bahn, Querschnitte und die Deutung von H auf einmal.
     Zwanzig Prozent lassen Rundung und Formteilzugaben zu; darüber
     stimmt etwas Grundsätzliches nicht. */
  if (P.kgAbweichung != null && Math.abs(P.kgAbweichung) > 20) {
    throw new Error('K-Aqua Überbogen d' + d + ': gerechnete Masse ' +
      P.kgGerechnet + ' kg weicht um ' + P.kgAbweichung + ' % von der Tabelle (' +
      a.kg + ' kg) ab — Bahn oder Deutung von H stimmen nicht');
  }
  if (cfg.art === 'muffe' && P.socket >= P.tEnde + 2) {
    throw new Error('K-Aqua Überbogen d' + d + ': Muffentiefe ' + P.socket +
      ' passt nicht in die gerade Endstrecke ' + P.tEnde);
  }
  if (P.bogenR < 0.6 * d) {
    throw new Error('K-Aqua Überbogen d' + d + ': Bogenradius ' + P.bogenR +
      ' ist enger als 0,6·d — so eng lässt sich das nicht formen');
  }
  return P;
}


/* == _crossover/parts.js =============================================== */
/* K-Aqua Überbögen — Kontur.

   Beide Produkte sind ein Sweep über dieselbe Bahn: außen eine Haut,
   innen eine Bohrung, an beiden Stirnflächen ein Ring. Dasselbe Muster
   wie beim Winkel (_bendthread/parts.js) — der Unterschied ist die Bahn
   und der Verlauf der Radien über sie.

   Kein CSG. */


const smooth = (u) => {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
};

const RAMPE = 2.5;   // Übergang Muffe → Bogenrohr

/* Außenradius über der Bahn. sA ist die Bogenlänge ab der einen
   Stirnfläche, sB die ab der anderen. Der Überbogen ist symmetrisch,
   deshalb genügt das Minimum von beiden. */
function hautAn(P, sA, sB) {
  const s = Math.min(sA, sB);
  if (P.socket <= 0) return P.rScheitel;              // Rohr: durchgehend
  if (s <= P.socket) return P.rEnd - DRAFT * (P.socket - s) * 0.4;
  if (s <= P.socket + RAMPE) {
    return P.rEnd + (P.rScheitel - P.rEnd) * smooth((s - P.socket) / RAMPE);
  }
  return P.rScheitel;
}

/* Innenradius über der Bahn. */
function bohrungAn(P, sA, sB) {
  const s = Math.min(sA, sB);
  if (P.socket <= 0) return P.boreR;                  // Rohr: durchgehend
  if (s <= 0.001) return P.d / 2 + P.lead;
  if (s <= 2) return P.d / 2 + P.lead * (1 - s / 2);
  if (s <= P.socket) return P.d / 2 - P.sockTaper * (s - 2);
  if (s <= P.socket + RAMPE) {
    const r0 = P.d / 2 - P.sockTaper * (P.socket - 2);
    return r0 + (P.boreR - r0) * smooth((s - P.socket) / RAMPE);
  }
  return P.boreR;
}

export function buildCrossover(P) {
  const path = bridgePath(P.len, P.hAchse, P.tEnde, 16, P.socket > 0 ? 8 : 20);
  let bahnLen = 0;
  for (let i = 1; i < path.length; i++) bahnLen += path[i].c.distanceTo(path[i - 1].c);

  const outer = sweepPath((t) => {
    const sA = t * bahnLen;
    return circleLoop(hautAn(P, sA, bahnLen - sA), SEG_VIS, 0.12);
  }, path);

  const inner = sweepPath((t) => {
    const sA = t * bahnLen;
    return circleLoop(bohrungAn(P, sA, bahnLen - sA), SEG_INT, 0.3);
  }, path, { flip: true });

  /* Ringflächen an beiden Stirnflächen — ohne sie ist der Bogen eine
     offene Schale und der Schnitt zeigt Löcher. */
  const geos = [outer, inner];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const sA = idx === 0 ? 0 : bahnLen;
    const ring = new THREE.RingGeometry(
      bohrungAn(P, sA, bahnLen - sA), hautAn(P, sA, bahnLen - sA), SEG_VIS, 1
    );
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize()
    );
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n), 1));
    geos.push(ring);
  }

  /* Schnittkappe. Die Ebene z = 0 enthält die ganze Bahn, schneidet den
     Schlauch also der Länge nach auf — und zwar auf BEIDEN Seiten der
     Bahn. Die Kappe besteht deshalb aus zwei Bändern, nicht aus einem:
     je eines zwischen Haut und Bohrung links und rechts der Mittellinie.
     Mit nur einem Band bliebe die halbe Wand im Schnitt offen. */
  const bandA = [], bohrA = [], bandB = [], bohrB = [];
  path.forEach((st, i) => {
    const sA = (i / (path.length - 1)) * bahnLen;
    const rH = hautAn(P, sA, bahnLen - sA);
    const rB = bohrungAn(P, sA, bahnLen - sA);
    const nx = -st.t.y, ny = st.t.x;          // Normale in der Bahnebene
    bandA.push([st.c.x + nx * rH, st.c.y + ny * rH]);
    bohrA.push([st.c.x + nx * rB, st.c.y + ny * rB]);
    bandB.push([st.c.x - nx * rH, st.c.y - ny * rH]);
    bohrB.push([st.c.x - nx * rB, st.c.y - ny * rB]);
  });
  const cap = mergeGeometries([
    polygonCap([...bandA, ...bohrA.slice().reverse()]),
    polygonCap([...bandB, ...bohrB.slice().reverse()]),
  ]);

  return { geo: mergeGeometries(geos), cap, bahn: path, bahnLen };
}


/* == _crossover/assembly.js ============================================ */
/* K-Aqua Überbögen — gemeinsame Baugruppe.

   Zwei Produkte, ein Aufbau. Was sie unterscheidet, steckt in cfg. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;
const komma = (v) => String(v).replace('.', ',');

/* Rauminhalt eines geschlossenen Netzes über den Satz von Gauß: die
   Summe der vorzeichenbehafteten Tetraeder (0, v0, v1, v2). Die
   Innenfläche ist umgekehrt gewickelt und zieht ihren Hohlraum von
   selbst ab — genau deshalb ist das Ergebnis der WERKSTOFF und nicht der
   umschlossene Raum.

   Das ist die schärfste Probe, die dieses Produkt kennt: sie prüft Bahn,
   Wandstärken, Muffen und die Deutung von H auf einmal, und ihr
   Sollwert steht als Kilogramm in der Katalogtabelle. */
function netzVolumen(geo) {
  const p = geo.attributes.position.array;
  const idx = geo.index ? geo.index.array : null;
  const n = idx ? idx.length : p.length / 3;
  let v = 0;
  for (let i = 0; i < n; i += 3) {
    const a = (idx ? idx[i] : i) * 3;
    const b = (idx ? idx[i + 1] : i + 1) * 3;
    const c = (idx ? idx[i + 2] : i + 2) * 3;
    v += (
      p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
      - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
      + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c])
    ) / 6;
  }
  return Math.abs(v);
}

export function buildUeberbogen(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = crossoverParams(a, cfg);

  const A = createAssembly({
    name: cfg.exportName + '_d' + size,
    materials: ['pprGreen'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildCrossover(P);

  A.part('koerper', {
    name: cfg.teilName, label: cfg.teilLabel, mat: 'pprGreen',
    geo: body.geo, cap: body.cap,
    anchor: V3(-P.len * 0.34, P.hAchse + P.rScheitel + 0.22 * P.hoehe, 0),
  });

  A.light(V3(-P.len * 0.35, P.hAchse * 0.5, 0));
  A.light(V3(P.len * 0.35, P.hAchse * 0.5, 0));

  A.hotspot({
    v: V3(0, P.hAchse + P.rScheitel * 0.6, P.rScheitel * 0.8),
    n: V3(0, 0.6, 0.8),
    text: 'Scheitel — die Achse liegt hier ' + komma(r2(P.hAchse)) +
      ' mm höher als an den Enden, darunter bleiben ' +
      komma(P.durchlass) + ' mm lichte Höhe',
  });
  A.hotspot(cfg.art === 'muffe' ? {
    v: V3(-P.len / 2 + Math.max(2, 0.2 * P.socket), P.rEnd * 0.45, P.rEnd * 0.85),
    n: V3(0, 0.45, 0.89),
    text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
      komma(P.socket) + ' mm nach DVS 2207-11',
  } : {
    v: V3(-P.len / 2 + 8, P.rScheitel * 0.45, P.rScheitel * 0.85),
    n: V3(0, 0.45, 0.89),
    text: 'Spitzende zum Einschweißen, Wandstärke ' + komma(a.s) +
      ' mm — das ist SDR 6 wie bei jedem K-Aqua-Fitting',
  });

  const zf = P.rScheitel + 0.18 * P.hoehe;
  A.dim({
    label: 'L', value: P.len,
    a: V3(-P.len / 2, -P.rEnd - 0.30 * P.hoehe, zf),
    b: V3(P.len / 2, -P.rEnd - 0.30 * P.hoehe, zf),
    off: V3(0, -0.10 * P.hoehe, 0),
  });
  A.dim({
    label: 'H', value: P.hoehe,
    a: V3(-P.len / 2 - 0.12 * P.len, -P.rEnd, zf),
    b: V3(-P.len / 2 - 0.12 * P.len, P.hAchse + P.rScheitel, zf),
    off: V3(-0.06 * P.len, 0, 0),
  });

  const pos = body.geo.attributes.position.array;
  const imBand = (x0, x1) => {
    let max = 0, min = Infinity, n = 0;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      if (x < x0 || x > x1) continue;
      const r = Math.hypot(pos[i + 1], pos[i + 2]);
      if (r > max) max = r;
      if (r < min) min = r;
      n++;
    }
    return { max, min, n };
  };

  A.measures = [
    { key: 'L', label: cfg.dimensionKey.L, soll: P.len,
      ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
    /* H ist die BAUHÖHE — Unterkante Anschluss bis Oberkante Scheitel.
       Genau deshalb ist es hier die Ausdehnung der Box in Y und nicht
       die Anhebung der Achse. Welche der beiden Lesarten gilt, hat die
       Massenprobe entschieden (params.js). */
    { key: 'H', label: cfg.dimensionKey.H, soll: P.hoehe,
      ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.y - b.min.y); } },
    /* DIE ENDEN LIEGEN IN EINER FLUCHT — das unterscheidet den Überbogen
       vom Winkel, wo die Bahn abgelenkt wird. Gemessen wird der
       Höhenversatz der beiden Stirnflächen: die mittlere Höhe der
       Netzpunkte am linken gegen die am rechten Ende. Ein Bogen, der
       hier danebenliegt, hat einen Vorzeichenfehler in einer der vier
       Krümmungen — und der fiele sonst nur als „sieht schief aus" auf. */
    { key: 'flucht', label: 'Höhenversatz der beiden Enden', soll: 0,
      ist: () => {
        const mitteY = (x0, x1) => {
          let s = 0, n = 0;
          for (let i = 0; i < pos.length; i += 3) {
            if (pos[i] < x0 || pos[i] > x1) continue;
            s += pos[i + 1]; n++;
          }
          return n ? s / n : NaN;
        };
        const l = mitteY(-P.len / 2, -P.len / 2 + 0.6);
        const r = mitteY(P.len / 2 - 0.6, P.len / 2);
        return r2(Math.abs(l - r));
      } },
    /* Die Achsanhebung am Scheitel: höchster Netzpunkt minus dem
       Scheitelradius. */
    { key: 'scheitel', label: 'Achsanhebung am Scheitel', soll: r2(P.hAchse),
      ist: () => r2(A.boxOf(['koerper']).max.y - P.rScheitel) },
    /* DIE MASSENPROBE, am Netz. Der Rauminhalt des gebauten Körpers mal
       0,9 g/cm³ gegen die Kilogrammangabe der Tabelle. Sie prüft Bahn,
       Wandstärken und Muffen auf einmal — und sie ist der Grund, warum
       die Deutung von H feststeht. */
    { key: 'masse', label: 'Masse aus dem Volumen (0,9 g/cm³)', soll: a.kg,
      ist: () => r2(Math.round((netzVolumen(body.geo) * 0.9) / 1e6 * 1000) / 1000) },
    ...cfg.messungen(P, a, { imBand, A }),
  ];

  A.setExplode(0);
  A.setSection(false, clipPlane);
  A.P = P;
  return A;
}


/* == cross-over/data.js ================================================ */
/* K-Aqua Überbogen — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 91, obere
   Tabelle „Cross over". Drei Größen.

   Ein Überbogen führt ein Rohr über ein kreuzendes hinweg. Seine beiden
   Enden liegen in einer Flucht und zeigen in dieselbe Richtung — anders
   als beim Winkel, wo die Bahn abgelenkt wird. Das erzwingt vier Bögen:
   hoch, wieder waagerecht, hinunter, wieder waagerecht.

   MASSSCHLÜSSEL (Maßskizze S. 91 oben):
     d   Nennmaß = Muffenbohrung
     L   Baulänge, Stirnfläche zu Stirnfläche
     H   BAUHÖHE, von der Unterkante der Muffe bis zur Oberkante des
         Scheitels — nicht die Achsanhebung
     t   gerade Strecke am Ende, vor dem ersten Bogen
     z   siehe OFFENER PUNKT

   H IST DIE BAUHÖHE. Die Skizze spannt H über das ganze Teil. Für die
   Bahn wird die ACHSANHEBUNG gebraucht; die Umrechnung steht in
   _crossover/params.js und ist gegen den Zweck des Bauteils geprüft:
   unter dem Scheitel muss ein Rohr gleicher Nennweite hindurchpassen.
   Läge H an der Achse, käme dort ein negativer Durchlass heraus.

   OFFENER PUNKT — die Spalte z ist nicht gedeutet.
   Geprüft und verworfen:
     z = L − 2t          ergäbe 62 · 72 · 80, tabelliert sind 63 · 80 · 98
     z = L − 2·Muffentiefe  ergäbe 61 · 72 · 90
   Die Differenz L − z beträgt 27 · 24 · 28 und wächst nicht mit der
   Nennweite — bei einer Einbaulänge müsste sie das. Eine Deutung, die
   über die Zeilen nicht trägt, ist keine (Fall 28). Für die Geometrie
   wird z nicht gebraucht: L, H und t bestimmen die Bahn vollständig.
   Der Wert steht hier, wird aber NICHT modelliert und NICHT gemessen
   (Fall 29). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 3;

export const ARTICLES = [
  { code: 'AQ28720', d: 20, L: 90,  z: 63, H: 45, t: 14, kg: 0.04, pack: 140 },
  { code: 'AQ28725', d: 25, L: 104, z: 80, H: 55, t: 16, kg: 0.06, pack: 90 },
  { code: 'AQ28732', d: 32, L: 126, z: 98, H: 70, t: 23, kg: 0.13, pack: 65 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  L: 'Baulänge',
  H: 'Bauhöhe',
  t: 'gerade Endstrecke',
  z: 'z (Bedeutung offen)',
};

export function article(dNom) {
  const a = ARTICLES.find((x) => x.d === dNom);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + dNom);
  return a;
}


/* == cross-over/params.js ============================================== */
/* K-Aqua Überbogen — Parametrik.

   Die Rechnung steht in ../_crossover/params.js: beide Überbögen teilen
   die Bahn, die Umrechnung der Bauhöhe und die Massenprobe. Zweimal
   geschrieben würde sie driften (Fall 32). */


/* == cross-over/parts.js =============================================== */
/* K-Aqua Überbogen — Kontur.

   Der Sweep steht in ../_crossover/parts.js, die Bahn selbst als
   bridgePath im Core. Beide Überbögen bauen denselben Körper; sie
   unterscheiden sich nur darin, was an den Enden sitzt — Schweißmuffe
   oder Spitzende. */


/* == cross-over/index.js =============================================== */
/* K-Aqua Überbogen — Produktpaket.

   Die Deutung der Spalte H hat die MASSE entschieden, nicht die
   Maßskizze: von drei möglichen Lesarten trifft nur „Bauhöhe" das
   tabellierte Gewicht, die beiden anderen liegen 15 bis 75 Prozent
   daneben. Begründung in _crossover/params.js.

   Deshalb führt der Messsatz die Masse als eigene Zeile — sie prüft
   Bahn, Wandstärken und die Deutung von H auf einmal, am gebauten Netz
   gegen eine Katalogzahl. */


const product = {
  id: 'fittings/cross-over',
  module: 'kaqua-cross-over',
  titleDe: 'Überbogen',
  titleEn: 'Cross over',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'd',
  sizeLabel: (k) => 'd' + k,
  sizeTitle: 'Nennweite',
  defaultSize: 25,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'L', 'H', 'kg'],
  dimensions: ['L', 'H'],
  ariaFields: ['d', 'L', 'H'],

  variants: [],
  states: null,

  tile: 'Führt ein Rohr über ein kreuzendes hinweg — vier Bögen, ' +
        'beide Enden in einer Flucht.',

  build(size, variant, clipPlane) {
    return buildUeberbogen({
      art: 'muffe',
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Ueberbogen',
      teilName: 'Ueberbogen',
      teilLabel: 'Überbogen (PP-R)',
      seed: 163,
      messungen: (P, a, { imBand }) => [
        /* Das Anschlussmaß, an der STIRNFLÄCHE gemessen. Die Muffe ist um
           0,6° konisch; misst man weiter innen, liegt die Bohrung
           planmäßig enger, und der Betrag hängt davon ab, wo genau eine
           Sweep-Station liegt. An der Stirnfläche liegt immer eine, und
           dort trägt die Bohrung das Nennmaß plus die Einführfase — ein
           erklärter Betrag, der in den Sollwert gehört (Fall 23). */
        { key: 'd', label: DIMENSION_KEY.d,
          soll: 'muffe' === 'rohr' ? a.d
            : Math.round((a.d + 2 * P.lead) * 100) / 100,
          ist: () => {
            const g = imBand(-P.len / 2 - 0.1, -P.len / 2 + 0.1);
            return g.n ? Math.round(('muffe' === 'rohr' ? 2 * g.max : 2 * g.min) * 100) / 100 : NaN;
          } },
      ],
    }, size, variant, clipPlane);
  },
};

export { product as default };
