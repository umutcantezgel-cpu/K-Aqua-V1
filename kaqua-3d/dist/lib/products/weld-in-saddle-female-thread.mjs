/* K-Aqua 3D · Anbohrsattel mit Innengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID weld-in-saddles/weld-in-saddle-female-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, ISO, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, revolve, socketOD, threadProfile, threadRing, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == _saddle/parts.js ================================================== */
/* K-Aqua Anbohrsättel — die gemeinsame Geometrie.

   Ein Anbohrsattel ist ein Rotationskörper um die ABZWEIGACHSE, dessen
   Unterseite vom Mantel des Hauptrohrs beschnitten ist. Genau das macht
   ihn zum Sattel: die Schnittkurve ist keine Ebene, sondern sattelförmig
   — tief an den Flanken des Rohrs, hoch auf seinem Scheitel.

   DIE SCHNITTGLEICHUNG. Hauptrohrachse auf X, Radius R. Abzweigachse
   auf Y. Ein Punkt der Sattelkontur im Abstand r von der Abzweigachse,
   unter dem Winkel θ, liegt bei

       (r·cos θ,  y,  r·sin θ)

   und trifft den Rohrmantel y² + z² = R², wenn

       y = √(R² − r²·sin²θ)

   Bei θ = 0 (längs des Rohrs) ist das y = R, der Scheitel. Bei θ = 90°
   (quer) ist es √(R² − r²), also tiefer. Der Unterschied zwischen
   beiden IST die Satteltiefe.

   Kein CSG. Der Schnitt entsteht dadurch, dass jeder Profilpunkt beim
   Abwickeln nach oben geschoben wird, wo die Gleichung es verlangt —
   also durch dieselbe Rechnung, die branchJoin im Core für die
   T-Stück-Kehle führt (Fall 19: eine Aussage, eine Quelle; hier ist es
   dieselbe Geometrie in anderer Rolle, deshalb steht sie mit Verweis
   und nicht als Kopie).

   REICHWEITE. Die Gleichung hat nur eine Lösung, solange r·|sin θ| ≤ R.
   Ein Sattelteller, der breiter ist als das Rohr, hinge seitlich über —
   das prüft der Wächter in params.js und lässt es gar nicht erst zu. */


/* Höhe der Schnittkurve über der Rohrachse, für Radius r und Winkel θ. */
export function sattelY(mainR, r, theta) {
  const q = r * Math.sin(theta);
  const w = mainR * mainR - q * q;
  return w <= 0 ? 0 : Math.sqrt(w);
}

/* Rotationskörper um Y, unten vom Rohrmantel beschnitten.

   `profile` ist eine geschlossene Kontur in (a = Höhe über der
   Rohrachse, r = Abstand von der Abzweigachse), wie bei revolve. Punkte,
   die unter der Schnittkurve liegen, werden auf sie gehoben. */
export function sattelRevolve(profile, opt) {
  const { mainR, segments = SEG_VIS } = opt;
  const N = profile.length;
  const S = segments + 1;
  const pos = new Float32Array(N * S * 3);
  const uv = new Float32Array(N * S * 2);
  const wear = new Float32Array(N * S);

  /* v-Koordinate wie bei revolve: Bogenlänge entlang der Kontur. */
  const vArr = new Float32Array(N);
  let total = 0;
  for (let i = 1; i < N; i++) {
    const dx = profile[i].a - profile[i - 1].a;
    const dr = profile[i].r - profile[i - 1].r;
    total += Math.hypot(dx, dr);
    vArr[i] = total;
  }
  if (total > 0) for (let i = 0; i < N; i++) vArr[i] /= total;

  for (let j = 0; j < S; j++) {
    const th = (j / segments) * Math.PI * 2;
    const c = Math.cos(th), s = Math.sin(th);
    for (let i = 0; i < N; i++) {
      const p = profile[i];
      const yCut = sattelY(mainR, p.r, th);
      const y = Math.max(p.a, yCut);
      const k = j * N + i;
      pos[k * 3] = p.r * c;
      pos[k * 3 + 1] = y;
      pos[k * 3 + 2] = p.r * s;
      uv[k * 2] = th / (Math.PI * 2);
      uv[k * 2 + 1] = vArr[i];
      wear[k] = p.wear || 0;
    }
  }

  const idx = [];
  for (let j = 0; j < S - 1; j++) {
    for (let i = 0; i < N - 1; i++) {
      const A = j * N + i;
      const B = j * N + i + 1;
      const C = (j + 1) * N + i + 1;
      const D = (j + 1) * N + i;
      idx.push(A, C, B, A, D, C);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* Der Boden des Sattels: die Ringfläche zwischen Fußaußenrand und
   Spigotbohrung, beide auf die Schnittkurve gelegt. Ohne sie steht der
   Sattel unten offen. */
export function sattelBoden(rInnen, rAussen, mainR, segments = SEG_VIS) {
  const S = segments + 1;
  const pos = new Float32Array(2 * S * 3);
  const uv = new Float32Array(2 * S * 2);
  const wear = new Float32Array(2 * S);
  for (let j = 0; j < S; j++) {
    const th = (j / segments) * Math.PI * 2;
    const c = Math.cos(th), s = Math.sin(th);
    [rInnen, rAussen].forEach((r, i) => {
      const k = (j * 2 + i) * 3;
      pos[k] = r * c;
      pos[k + 1] = sattelY(mainR, r, th);
      pos[k + 2] = r * s;
      uv[(j * 2 + i) * 2] = th / (Math.PI * 2);
      uv[(j * 2 + i) * 2 + 1] = i;
    });
  }
  const idx = [];
  for (let j = 0; j < S - 1; j++) {
    const a = j * 2, b = j * 2 + 1, c = (j + 1) * 2 + 1, d = (j + 1) * 2;
    idx.push(a, b, c, a, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* Hilfe für den Prüfbericht: die Satteltiefe, also der Höhenunterschied
   der Schnittkurve zwischen Rohrlängsrichtung und Querrichtung. Sie ist
   das Maß, an dem sich zeigt, ob der Sattel überhaupt einer ist —
   bei einer ebenen Unterseite wäre sie null. */
export function satteltiefe(mainR, r) {
  return sattelY(mainR, r, 0) - sattelY(mainR, r, Math.PI / 2);
}


/* == _saddle/data-gemeinsam.js ========================================= */
/* K-Aqua Anbohrsättel — was die drei Tabellen gemeinsam haben.

   Der Katalog führt drei Sättel auf den Seiten 102 und 103:

     AQ130S   Anbohrsattel mit Schweißmuffe        11 Größen   S. 102
     AQ270S   Anbohrsattel mit Innengewinde         4 Größen   S. 102
     AQ243S   Anbohrsattel mit Außengewinde         4 Größen   S. 103

   DIE PRÄFIXE BESTÄTIGEN SICH GEGENSEITIG. 130 ist im ganzen Katalog
   das T-Stück, 270 das Innengewinde-Übergangsstück, 243 das
   Außengewinde-Übergangsstück (AQ130xx · AQ270G · AQ243G). Bei den
   Sätteln steht genau dasselbe Muster mit angehängtem S. Das ist eine
   von den Zahlenspalten unabhängige Bestätigung, welche Tabelle welches
   Gewinde führt.

   SPALTE d IST EIN BEREICH, kein Einzelmaß: „40 - 63", „75 - 125",
   „160 - 250". Gemeint ist das Hauptrohr, auf das der Sattel gesetzt
   wird. Ein Sattel hat eine gekrümmte Unterseite; welche Krümmung bei
   einem Bereich gilt, sagt der Katalog nicht. Siehe ANNAHME in
   params.js.

   SPALTE h IST EINE REINE FUNKTION VON d2, über alle elf Zeilen der
   AQ130S-Tabelle:

       d2    25    32    40    50    63
       h     29    35    38    39    45

   Das gilt auch dort, wo d1 und d2 auseinanderfallen. AQ130S406332
   führt d1 = 32, aber d2 = 25 und h = 29 — wie die Zeilen mit d1 = 20
   und d1 = 25 derselben Rohrgruppe. Wäre h vom Abzweig bestimmt, müsste
   es dort 35 lauten. Es tut es nicht.

   GEGENPROBE ÜBER DIE TABELLEN HINWEG: die Gewindesättel führen bei
   denselben d2 durchweg höhere h.

       d2    AQ130S (Muffe)   AQ270S/AQ243S (Gewinde)   Differenz
       25          29                    43                 14
       32          35                    50                 15

   Eine nahezu konstante Differenz — der eingebettete Messingteil baut
   auf, unabhängig von der Fußgröße. Das stützt beide Deutungen: h ist
   die Gesamthöhe, und d2 bestimmt den Unterbau.

   ZWEI AUFFÄLLIGKEITEN, dokumentiert statt aufgelöst:

   1. DIE SPALTE DES AUSSENGEWINDE-SATTELS HEISST „Rp". Seite 103 trägt
      die Überschrift „Weld-in saddle (Male thread)", die Spalte aber
      Rp — die Bezeichnung für ein zylindrisches INNENgewinde
      (ISO 7-1). Ein Außengewinde hieße R. Das Produktfoto zeigt
      eindeutig einen Messing-Außengewindezapfen, und das Präfix AQ243
      steht im ganzen Katalog für Außengewinde. Der Spaltenkopf ist
      offenbar aus der Innengewinde-Tabelle übernommen. Das Modell baut
      ein AUSSENgewinde R; der Widerspruch steht hier.

   2. DIE SPALTE HEISST „-d2", MIT FÜHRENDEM STRICH, auf beiden
      Gewindeseiten. Bei der Muffentabelle heißt sie schlicht d2. Ein
      Bindestrich vor einem Spaltennamen hat keine erkennbare Bedeutung;
      möglicherweise ein Satzrest. Die Werte sind in allen drei Tabellen
      dieselbe Größenreihe (25 · 32 · 40 · 50 · 63), deshalb wird die
      Spalte einheitlich als d2 geführt. */

/* ── WAS DIE ZEICHNUNG NICHT HERGIBT ──────────────────────────────────

   DIE SATTELZEICHNUNG IST EINE MASSSTABSLOSE SCHABLONE und in allen
   drei Tabellen unverändert dieselbe. Auf Vektorebene nachgemessen:

       d2-Hilfslinien   S.102 oben  295,99 / 337,83   Spannweite 41,84 pt
                        S.102 unten 573,70 / 615,54   Spannweite 41,84 pt
                        S.103       241,80 / 283,64   Spannweite 41,84 pt
       d-Hilfslinien    jeweils exakt 26,51 pt

   Nur das rechte Maß wechselt (d1 40,10 · Rp 32,43 · Rp 35,36). Aus den
   Proportionen dieser Figur darf deshalb NICHTS abgeleitet werden, und
   eine der drei Zeichnungen kann die andere nicht bestätigen — sie ist
   dieselbe Datei.

   Dazu kommt: die Zeichnung trägt ein drittes Maß, schlicht „d", dessen
   Hilfslinie auf der Durchgangsbohrung liegt (Ø rund 26 pt). In der
   Tabelle ist d aber 40–63 bis 160–250, also der Rohrbereich — das
   größte Maß der Tabelle und überhaupt kein Merkmal des Fittings. In
   der Zeichnung ist d das kleinste der drei Durchmesser, in der Tabelle
   das größte. Die Pfeilansätze kodieren also nachweislich nicht, was
   das Symbol bezeichnet.

   d2 IST KEIN AUSSENMASS. Das entscheidet die Tabelle, nicht die
   Zeichnung: in NEUN der elf Zeilen ist d2 zahlengleich mit d1. Ein
   Außendurchmesser und die von ihm umschlossene Bohrung desselben Teils
   können über eine ganze Baureihe nicht gleich sein — dazwischen liegt
   immer eine Wand. Und AQ130S406332 führt d2 = 25 bei d1 = 32, also
   kleiner als die Bohrung, die es umschließen müsste.

   d2 trägt damit dieselbe Nennweiten-Semantik wie d1: beide kommen aus
   der PP-R-Reihe 20 · 25 · 32 · 40 · 50 · 63. d2 ist die Größe des
   Stutzens am HAUPTROHR, d1 die des Abzweigs.

   h ENDET AM KUNSTSTOFF, NICHT AM MESSING. Bei den Gewindesätteln führen
   AQ270S (Innengewinde) und AQ243S (Außengewinde) durchweg DIESELBEN h
   (43 bei d2 = 25, 50 bei d2 = 32), obwohl der Außengewindezapfen rund
   15 mm weiter aufbaut. In der Zeichnung S. 103 endet die h-Hilfslinie
   an der Schulter, an der das Messing beginnt, nicht an der Gewindespitze.
   h misst also die Höhe des KUNSTSTOFFKÖRPERS über der Rohraußenfläche.
   Beim Muffensattel fällt das mit der Gesamthöhe zusammen, beim
   AG-Sattel nicht.

   OFFENER PUNKT — EIN SCHWEISSWERKZEUG FEHLT. Seite 115 führt neun
   Schweißwerkzeuge für Anbohrsättel, und über die AQ130S-Tabelle allein
   passen sie lückenlos auf die neun (d, d2)-Paare. Nimmt man die
   Gewindesättel hinzu, entsteht ein zehntes Paar: AQ270S406334 und
   AQ243S406334 führen (40–63, d2 = 32). Für den Bereich 40–63 gibt es
   auf S. 115 aber nur AQ98504006325, also 40–63 × 25. Entweder ist die
   Werkzeugliste unvollständig, oder die Gewindesättel dieser Größe
   werden anders gefügt. NICHT aufgelöst.

   ── Höhe über der Rohroberfläche, je Fußgröße — aus der AQ130S-Tabelle
   abgelesen und über alle elf Zeilen bestätigt. Steht hier, weil alle
   drei Produkte dieselbe Reihe brauchen (Fall 19). */
export const H_JE_FUSS = { 25: 29, 32: 35, 40: 38, 50: 39, 63: 45 };

/* Die drei Rohrgruppen, als Zahlenpaar statt als Zeichenkette. */
export const ROHRGRUPPEN = {
  '40-63': { min: 40, max: 63 },
  '75-125': { min: 75, max: 125 },
  '160-250': { min: 160, max: 250 },
};

export function rohrgruppe(bereich) {
  const g = ROHRGRUPPEN[bereich];
  if (!g) throw new Error('K-Aqua Anbohrsattel: unbekannte Rohrgruppe ' + bereich);
  return g;
}


/* == _saddle/params.js ================================================= */
/* K-Aqua Anbohrsättel — gemeinsame Parametrik.

   Koordinaten: Hauptrohrachse auf X, Abzweigachse auf Y (nach oben),
   Nullpunkt in der Rohrachse. Die Höhe h zählt ab der ROHROBERFLÄCHE,
   also ab y = mainR.

   ── DIE EINZIGE WIRKLICHE ANNAHME: WELCHES ROHR? ──

   Die Spalte d ist ein Bereich („40 - 63"). Ein Sattel hat eine
   gekrümmte Unterseite; der Katalog sagt nicht, auf welchen Durchmesser
   sie gekrümmt ist. Die Frage ist nicht kosmetisch — die Satteltiefe
   ändert sich über den Bereich um mehr als das Anderthalbfache.

   Angesetzt ist das GRÖSSTE Rohr der Gruppe, und das ist keine
   Geschmacksfrage, sondern folgt aus dem Spaltmaß. Legt man einen
   Sattel mit Unterseitenradius Rs auf ein Rohr mit Radius Rr, so
   beträgt der Spalt im Abstand z von der Scheitellinie

       (z² / 2) · (1/Rr − 1/Rs)

   Ist der Sattel ENGER als das Rohr (Rs < Rr), wird das negativ: er
   liegt auf seinen Rändern auf und HEBT IN DER MITTE AB — genau dort,
   wo die Bohrung sitzt und wo die Schweißnaht dicht sein muss. Ist er
   weiter (Rs > Rr), liegt er in der Mitte an, und der Spalt wandert an
   den Rand, wo ihn die Schmelze schließt.

   Rs muss also für JEDES Rohr der Gruppe mindestens so groß sein wie
   das Rohr — das ist erfüllt, wenn Rs das größte der Gruppe ist.

   Bei der Gruppe 40–63 ergibt das eine Satteltiefe von 2,6 mm statt
   4,4 mm bei der Gegenannahme. Die Zahl steht im Prüfbericht, damit
   sichtbar bleibt, was von dieser Annahme abhängt. */


export function sattelParams(a, cfg) {
  const P = Object.assign({}, a);
  const gruppe = rohrgruppe(a.bereich);
  P.rohrMin = gruppe.min;
  P.rohrMax = gruppe.max;

  /* ANNAHME, begründet im Kopfkommentar. */
  P.mainD = gruppe.max;
  P.mainR = P.mainD / 2;
  P.mainDGegen = gruppe.min;
  P.satteltiefe = Math.round(satteltiefe(P.mainR, a.d2 / 2) * 100) / 100;
  P.satteltiefeGegen = Math.round(satteltiefe(gruppe.min / 2, a.d2 / 2) * 100) / 100;

  P.rFuss = a.d2 / 2;                 // Bohrung im Hauptrohr
  P.h = a.h;
  P.yTop = P.mainR + a.h;             // Stirnfläche des Abzweigs

  /* ANNAHME Schürzenbreite. Nicht bemaßt — weder in der Tabelle noch in
     einer der drei Zeichnungen. Zwei Schranken halten sie fest:

       · sie muss die Bohrung mit Schweißfläche umgeben,
       · sie darf das Rohr seitlich nicht überragen.

     Dazwischen entscheidet das Produktfoto. Am Bild ist der Bogen FLACH:
     Sehne rund 160 px bei einer Stichhöhe von rund 18 px, das ergibt
     einen Sitzdurchmesser von etwa dem Zwei- bis Dreifachen der
     Schürzenbreite. Bei der Gruppe 40–63 mit ihrer 25-mm-Bohrung führt
     das auf eine Schürze von gut 30 mm. Ein erster Entwurf mit
     0,35·d2 Zugabe kam auf 42 mm und damit auf ein Verhältnis von 1,5 —
     das wäre ein deutlich tieferer Trog, als das Foto zeigt.

     Die obere Schranke ist der SITZRADIUS, nicht ein Bruchteil davon:
     jenseits davon verlöre die Schnittgleichung ihre Lösung, die
     Schürze liefe über den Äquator ihres eigenen Sitzzylinders hinaus.
     Ein erster Entwurf begrenzte auf 0,55·R und schlug ausgerechnet bei
     AQ270S406334 an — der Größe, für die auf S. 115 auch das
     Schweißwerkzeug fehlt (40–63 × 32). Ein 32-mm-Loch in einem 40er
     Rohr braucht eine breite Schürze; das Verhältnis fällt dort auf
     1,5 und damit unter das am Foto gemessene. Die Zahl steht im
     Prüfbericht, denn sie zeigt dieselbe Auffälligkeit von der
     geometrischen Seite. */
  P.rTeller = Math.min(P.rFuss + Math.max(4, 0.16 * a.d2), 0.80 * P.mainR);
  P.schuerzeBreite = Math.round(2 * P.rTeller * 10) / 10;
  P.sitzVerhaeltnis = Math.round((P.mainD / (2 * P.rTeller)) * 100) / 100;
  P.tellerDicke = Math.max(3, 0.14 * a.d2);

  /* Abzweigseite. Bei der Muffenversion aus der Muffentabelle des
     Katalogs (socketOD im Core), bei den Gewindeversionen aus der
     Normreihe plus Wand. */
  if (cfg.art === 'muffe') {
    P.d1 = a.d1;
    P.socket = fusionDepth(a.d1);
    if (!P.socket) throw new Error('K-Aqua Anbohrsattel ' + a.code + ': keine Schweißtiefe für d' + a.d1);
    P.bossOD = socketOD(a.d1);
    if (!P.bossOD) throw new Error('K-Aqua Anbohrsattel ' + a.code + ': kein Muffen-Außendurchmesser für d' + a.d1);
    P.boreOben = a.d1;
    P.wallPipe = a.d1 / 6;
    P.bore = a.d1 - 2 * P.wallPipe;
  } else {
    const th = threadSpec(a.gewinde);
    if (!th) throw new Error('K-Aqua Anbohrsattel ' + a.code + ': kein Normmaß für Gewinde ' + a.gewinde);
    P.gewindeArt = cfg.gewindeArt;          // 'Rp' oder 'R'
    P.threadOD = th.od;
    P.threadPitch = th.pitch;
    P.threadH = 0.640327 * th.pitch;
    P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
    P.threadRd = Math.max(0.3, 0.137 * th.pitch);
    P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;
    /* Der Messingteil sitzt im PP-Körper; der Bund darüber muss ihn
       fassen. ANNAHME: 0,32·Gewinde-Außendurchmesser Wand, wie bei der
       Übergangsmuffe mit Innengewinde. */
    P.ringOD = th.od + 2 * Math.max(2.0, 0.14 * th.od);
    P.bossOD = P.ringOD + 2 * Math.max(2.5, 0.10 * th.od);
    P.ringLen = cfg.gewindeArt === 'Rp' ? Math.min(a.h * 0.45, 18) : Math.min(a.h * 0.42, 16);
    P.turns = Math.max(3, Math.floor((P.ringLen - 1.6) / th.pitch));
    P.bore = Math.min(P.threadCore - 2, a.d2 - 6);
    P.boreOben = P.threadCore;
  }
  P.rBoss = P.bossOD / 2;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  if (P.rTeller <= P.rFuss + 3) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code + ': Fußteller r' +
      P.rTeller.toFixed(1) + ' umgibt die Bohrung r' + P.rFuss.toFixed(1) +
      ' mit weniger als 3 mm Schweißfläche');
  }
  if (P.rTeller >= P.mainR) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code +
      ': Fußteller ragt seitlich über das Rohr hinaus');
  }
  if (cfg.art === 'muffe' && P.socket + 4 >= a.h) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code + ': Muffentiefe ' +
      P.socket + ' passt nicht in die Höhe ' + a.h);
  }
  if (P.boreR >= P.rFuss) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code + ': Durchgang r' +
      P.boreR.toFixed(1) + ' ist weiter als die Bohrung r' + P.rFuss.toFixed(1));
  }
  return P;
}


/* == _saddle/assembly.js =============================================== */
/* K-Aqua Anbohrsättel — gemeinsame Baugruppe für alle drei Bauarten.

   Ein Aufruf, drei Produkte: Muffe, Innengewinde, Außengewinde. Was sie
   unterscheidet, steckt in cfg; was sie teilen, ist alles andere —
   Fußteller, Sattelschnitt, Bohrung, Messsatz.

   Der Messsatz misst am gebauten NETZ, nicht mit Strahlen. Beim
   Reduzier-T-Stück und beim Flanschadapter hat sich gezeigt, dass
   Strahlen an Kreuzungen die falsche Fläche treffen und schmale Fenster
   leer sein können; hier kommt beides zusammen. */


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
    { a: yTeller + flanke, r: P.rBoss, fillet: 1.5 },
    { a: P.yTop, r: P.rBoss, chamfer: 1.0 },
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
  const geo = sattelRevolve(profile, { mainR: P.mainR, segments: SEG_VIS });

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


/* == weld-in-saddle-female-thread/data.js ============================== */
/* K-Aqua Anbohrsattel mit Innengewinde — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 102, untere Tabelle,
   Tabelle „Weld-in saddle (Female thread)". 4 Größen.

   Spalten wie abgebildet: Code · d · Rp · -d2 · h · Pack.
   Die gemeinsame Deutung steht in _saddle/data-gemeinsam.js, dort auch
   die beiden Auffälligkeiten der Spaltenköpfe.

   DIESE TABELLE UND DIE DES AQ270-GEGENSTÜCKS SIND ZAHLENGLEICH.
   AQ270S und AQ243S führen dieselben vier Rohrgruppen, dieselben
   Gewindegrößen, dieselben d2 und dieselben h. Nur die Codes und das
   Gewinde unterscheiden sie. Das ist kein Zufall: es ist derselbe
   Grundkörper mit verschiedenem Messingteil, und es bestätigt beide
   Transkriptionen gegenseitig.

   GEGENPROBE ZUR MUFFENVERSION: bei gleichem d2 liegt h hier höher.

       d2    Muffe (AQ130S)   Gewinde   Differenz
       25          29            43        14
       32          35            50        15

   Nahezu konstant — der eingebettete Messingteil baut auf, unabhängig
   von der Fußgröße. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 4;

export const ARTICLES = [
  { code: 'AQ270S406312',  bereich: '40-63',  gewinde: '1/2', d2: 25, h: 43, pack: 150 },
  { code: 'AQ270S406334',  bereich: '40-63',  gewinde: '3/4', d2: 32, h: 50, pack: 90 },
  { code: 'AQ270S7512512', bereich: '75-125', gewinde: '1/2', d2: 25, h: 43, pack: 90 },
  { code: 'AQ270S7512534', bereich: '75-125', gewinde: '3/4', d2: 32, h: 50, pack: 60 },
].map((a) => ({ ...a, key: a.bereich + 'x' + a.gewinde.replace('/', '_') }));

export const SIZES = ARTICLES.map((a) => a.key);

export const GEWINDEART = 'Rp';

export const DIMENSION_KEY = {
  bereich: 'Rohrgruppe Hauptrohr',
  gewinde: 'Innengewinde in Zoll',
  d2: 'Durchmesser Sattelfuß / Bohrung',
  h: 'Höhe über der Rohroberfläche',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == weld-in-saddle-female-thread/params.js ============================ */
/* K-Aqua Anbohrsattel mit Innengewinde — Parametrik.

   Die Rechnung steht in ../_saddle/params.js: drei Produkte teilen den
   Sattelschnitt, die Schürzenbreite und die Krümmungsannahme. Dreimal
   dieselbe Rechnung würde driften (Fall 32).

   Was dieses Produkt daran festlegt, steht in index.js im cfg-Objekt —
   die Bauart und, bei den Gewindesätteln, die Gewindeart. */


/* == weld-in-saddle-female-thread/parts.js ============================= */
/* K-Aqua Anbohrsattel mit Innengewinde — Konturen.

   Alles kommt aus ../_saddle/. Der Sattelschnitt selbst steht in
   parts.js, die Baugruppe in assembly.js.

   Der Unterschied zwischen den drei Sätteln ist genau einer: was oben
   auf dem Sattelkörper sitzt — eine Schweißmuffe, ein Messingring mit
   Innengewinde oder ein Messingzapfen mit Außengewinde. Der Körper
   darunter ist bei allen dreien derselbe. */


/* == weld-in-saddle-female-thread/index.js ============================= */
/* K-Aqua Anbohrsattel mit Innengewinde — Produktpaket.

   Derselbe Grundkörper wie der Muffensattel, mit eingebettetem
   Messingteil. Die Gegenprobe `ueberstand` hält fest, was der Katalog
   an dieser Stelle unterscheidet: h endet am Kunststoff, und beim
   Außengewinde ragt das Messing darüber hinaus (siehe
   _saddle/data-gemeinsam.js). */


const product = {
  id: 'weld-in-saddles/weld-in-saddle-female-thread',
  module: 'kaqua-weld-in-saddle-female-thread',
  titleDe: 'Anbohrsattel mit Innengewinde',
  titleEn: 'Weld-in saddle (Female thread)',
  category: 'weld-in-saddles',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [b, g] = String(k).split('x');
    return 'd' + b.replace('-', '–') + ' · Rp' + g.replace('_', '/') + '"';
  },
  sizeTitle: 'Rohrgruppe · Gewinde',
  defaultSize: '40-63x3_4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['bereich', 'gewinde', 'd2', 'h'],
  dimensions: ['h'],
  ariaFields: ['bereich', 'gewinde', 'd2', 'h'],

  variants: [],
  states: null,

  tile: 'Abzweig aus einem laufenden Rohr auf Innengewinde — Sattelfläche ' +
        'und Messingteil im Schnitt sichtbar.',

  build(size, variant, clipPlane) {
    return buildSattel({
      art: 'gewinde',
      gewindeArt: GEWINDEART,
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Anbohrsattel_IG',
      seed: 153,
      /* Die beiden Gewindemessungen stehen in der Familie — nur dort
         ist die Ringgeometrie in Reichweite. */
      messungen: () => [
      ],
    }, size, variant, clipPlane);
  },
};

export { product as default };
