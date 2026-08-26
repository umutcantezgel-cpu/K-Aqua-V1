/* Von der Parametrik zur IFC-Form.
 *
 * Das Ziel ist nicht die schoenste Geometrie, sondern die brauchbarste. Ein
 * Fachplaner setzt ein Bauteil hundertfach in ein Gebaeudemodell; entscheidend
 * sind Aussenmaß, Anschlusslage und Kollisionshuelle, nicht die Riffelung einer
 * Ueberwurfmutter. Gemessen liegt das unveraenderte Netz im Mittel bei 27 000
 * Dreiecken je Nennweite und der Kugelhahn d63 bei 192 000 — als IFC waeren
 * das 0,7 bis 4,4 MB je Datei. Ein Strang aus tausend Formstuecken waere in
 * Revit nicht mehr zu drehen.
 *
 * Deshalb drei Wege, in dieser Rangfolge:
 *
 *   1. ROHR → IfcSweptDiskSolid aus der Parametrik. Exakt, rund fuenfzehn
 *      Zeilen, und in Revit oder ArchiCAD ein echtes Rohrsegment statt eines
 *      Klumpens Dreiecke. Betrifft die groesste Artikelgruppe des Katalogs.
 *
 *   2. ROTATIONSKOERPER → IfcRevolvedAreaSolid aus einem Profil, das aus dem
 *      Netz GEMESSEN wird. Nicht nachgebaut: nachgebaute Profile laufen
 *      unweigerlich vom gezeigten Modell weg, gemessene nicht. Wird nur
 *      angewandt, wo die Rotationssymmetrie zuvor nachgewiesen ist.
 *
 *   3. ALLES UEBRIGE → IfcTriangulatedFaceSet aus dem verschweissten Netz.
 *      T-Stuecke, Armaturen, Flansche, Schellen und Saettel sind nicht
 *      rotationssymmetrisch; fuer sie gibt es keinen ehrlichen Kurzweg.
 *
 * In jedem Fall gilt: Teile mit dem Namenszusatz `_Schnitt` fliegen raus. Das
 * sind die Deckflaechen des Halbschnitts im Viewer. Wer sie mitnimmt, erhaelt
 * einen Koerper mit zusaetzlichen Waenden mitten im Bauteil. */

import type { Assembly, Object3DLike, BufferAttributeLike } from '@/lib/bim/model3d';

/** Ein Punkt der Meridiankontur: Lage auf der Achse und Abstand von ihr. */
export interface ProfilePoint {
  /** Lage entlang der Rotationsachse, in mm. */
  x: number;
  /** Abstand von der Achse, in mm. Nie negativ. */
  r: number;
}

export type BimShape =
  | {
      kind: 'sweptDisk';
      /** Aussenradius in mm. */
      radius: number;
      /** Innenradius in mm. Null bei einem Vollstab. */
      innerRadius: number;
      /** Laenge entlang der Achse in mm. */
      length: number;
      note: string;
    }
  | {
      kind: 'revolved';
      /** Geschlossene Meridiankontur, gegen den Uhrzeigersinn. */
      profile: ProfilePoint[];
      note: string;
    }
  | {
      kind: 'mesh';
      /** Eckpunkte als [x, y, z] in mm. */
      coordinates: [number, number, number][];
      /** Dreiecke als Indexpaare in `coordinates`, zaehlend ab 0. */
      triangles: [number, number, number][];
      note: string;
    }
  | {
      kind: 'none';
      note: string;
    };

/* --------------------------------------------------------------------------
 * Netz auslesen
 * ------------------------------------------------------------------------ */

/** Ein Eckpunkt in Weltkoordinaten, aus dem Netz gelesen. */
interface Vertex {
  x: number;
  y: number;
  z: number;
}

/** Wendet eine spaltenweise gespeicherte 4x4-Matrix auf einen Punkt an. */
function transform(x: number, y: number, z: number, e: number[]): Vertex {
  const w = (e[3]! * x + e[7]! * y + e[11]! * z + e[15]!) || 1;
  return {
    x: (e[0]! * x + e[4]! * y + e[8]! * z + e[12]!) / w,
    y: (e[1]! * x + e[5]! * y + e[9]! * z + e[13]!) / w,
    z: (e[2]! * x + e[6]! * y + e[10]! * z + e[14]!) / w,
  };
}

/**
 * Alle Dreiecke der Baugruppe in Weltkoordinaten.
 *
 * `_Schnitt`-Teile werden uebergangen — siehe Kopfkommentar. Nicht indizierte
 * Geometrie wird als Dreieckssuppe gelesen (drei aufeinanderfolgende Punkte
 * bilden ein Dreieck); indizierte ueber ihren Index.
 */
export function readTriangles(assembly: Assembly): {
  vertices: Vertex[];
  triangles: [number, number, number][];
  skippedSectionParts: number;
} {
  const vertices: Vertex[] = [];
  const triangles: [number, number, number][] = [];
  let skippedSectionParts = 0;

  assembly.root.updateMatrixWorld?.(true);

  assembly.root.traverse((object: Object3DLike) => {
    const geometry = object.geometry;
    const position = geometry?.attributes?.position as BufferAttributeLike | undefined;
    if (!position) return;

    if (/_Schnitt$/.test(object.name ?? '')) {
      skippedSectionParts++;
      return;
    }

    const matrix = object.matrixWorld?.elements;
    const base = vertices.length;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      vertices.push(matrix ? transform(x, y, z, matrix) : { x, y, z });
    }

    const index = geometry?.index;
    if (index) {
      for (let i = 0; i + 2 < index.count; i += 3) {
        triangles.push([
          base + index.getX(i),
          base + index.getX(i + 1),
          base + index.getX(i + 2),
        ]);
      }
    } else {
      for (let i = 0; i + 2 < position.count; i += 3) {
        triangles.push([base + i, base + i + 1, base + i + 2]);
      }
    }
  });

  return { vertices, triangles, skippedSectionParts };
}

/* --------------------------------------------------------------------------
 * Weg 1 — Rohr
 * ------------------------------------------------------------------------ */

/**
 * Rohrgeometrie aus der Parametrik.
 *
 * Das 3D-Modul baut das Rohr in einer Anzeigelaenge von etwa dem Sechsfachen
 * der Nennweite — gerade genug, um im Viewer als Rohr erkennbar zu sein. Fuer
 * BIM ist das die falsche Laenge: dort zaehlt die Stangenlaenge, und die steht
 * im Katalog. `params.len` wird deshalb bewusst NICHT verwendet.
 *
 * @param params        aufgeloeste Parametrik des Moduls
 * @param stockLengthM  Stangenlaenge aus dem Katalog, in Metern
 */
export function pipeShape(
  params: Record<string, unknown>,
  stockLengthM: number | null,
): BimShape {
  const rOut = params['rOut'];
  const rIn = params['rIn'];
  if (typeof rOut !== 'number' || typeof rIn !== 'number') {
    return { kind: 'none', note: 'Parametrik ohne rOut/rIn' };
  }
  if (!(rOut > 0) || rIn < 0 || rIn >= rOut) {
    return { kind: 'none', note: `unbrauchbare Radien rOut=${rOut} rIn=${rIn}` };
  }

  const lengthMm = stockLengthM !== null ? stockLengthM * 1000 : 1000;
  return {
    kind: 'sweptDisk',
    radius: rOut,
    innerRadius: rIn,
    length: lengthMm,
    note:
      stockLengthM !== null
        ? `Stangenlänge ${stockLengthM} m laut Katalog`
        : 'Katalog führt keine Stangenlänge; parametrisch auf 1 m gesetzt',
  };
}

/* --------------------------------------------------------------------------
 * Weg 2 — Rotationskoerper
 * ------------------------------------------------------------------------ */

/** Toleranz, innerhalb derer zwei Radien als derselbe Kreis gelten, in mm. */
const RADIUS_TOLERANCE_MM = 0.15;

/** Breite eines Abtastbands entlang der Achse, in mm. */
const STATION_WIDTH_MM = 0.25;

/** Mehr Konturpunkte bringt kein Planungswerkzeug zur Geltung. */
const MAX_PROFILE_POINTS = 160;

/**
 * Prueft, ob der Koerper um die X-Achse rotationssymmetrisch ist.
 *
 * Verfahren: die Eckpunkte werden in schmale Baender entlang der Achse
 * einsortiert. Bei einem Rotationskoerper liegen die Radien in jedem Band auf
 * wenigen Kreisen — bei einem Rohrstueck auf zweien, bei einer Muffe mit Fasen
 * und Anschlag auf einigen mehr. Ein T-Stueck, ein Flansch mit Bohrbild oder
 * eine Schelle streuen dagegen ueber das ganze Band.
 *
 * Die Schwelle von acht Kreisen je Band ist bewusst grosszuegig: sie soll
 * Entformschraegen und Auswerfermarken durchlassen, aber jede echte
 * Abzweigung abweisen. Im Zweifel wird abgewiesen — ein faelschlich als
 * rotationssymmetrisch behandeltes T-Stueck verlöre seinen Abgang, und das
 * fiele erst im Gebaeudemodell auf.
 */
export function isRotationallySymmetric(vertices: Vertex[]): boolean {
  if (vertices.length < 12) return false;

  const bands = new Map<number, number[]>();
  for (const v of vertices) {
    const band = Math.round(v.x / STATION_WIDTH_MM);
    const radius = Math.hypot(v.y, v.z);
    const list = bands.get(band);
    if (list) list.push(radius);
    else bands.set(band, [radius]);
  }

  for (const radii of bands.values()) {
    radii.sort((a, b) => a - b);
    let circles = 1;
    for (let i = 1; i < radii.length; i++) {
      if (radii[i]! - radii[i - 1]! > RADIUS_TOLERANCE_MM) circles++;
      if (circles > 8) return false;
    }
  }
  return true;
}

/**
 * Misst die Meridiankontur eines Rotationskoerpers aus seinem Netz.
 *
 * Je Abtastband werden groesster und kleinster Radius genommen. Daraus
 * entsteht eine geschlossene Kontur: aussen von einem Ende zum anderen, innen
 * wieder zurueck. Der Koerper, den IFC daraus dreht, ist die Huelle des
 * Originals — Rillen und Riffelungen an der Oberflaeche verschwinden, alle
 * Anschlussmaße bleiben.
 *
 * Warum gemessen und nicht aus der Parametrik nachgebaut: die Konturen stehen
 * in den `parts.js` der einzelnen Produkte, jede mit eigenen Fasen, Radien und
 * Entformschraegen. Sie nachzubauen hiesse, fuenfzig Konstruktionen ein
 * zweites Mal zu schreiben und von da an synchron zu halten. Gemessen bleibt
 * die Form dagegen an das gebundenen, was der Kunde im Viewer sieht.
 */
export function revolvedProfileFromMesh(vertices: Vertex[]): ProfilePoint[] | null {
  if (vertices.length === 0) return null;

  const bands = new Map<number, { min: number; max: number }>();
  for (const v of vertices) {
    const band = Math.round(v.x / STATION_WIDTH_MM);
    const radius = Math.hypot(v.y, v.z);
    const entry = bands.get(band);
    if (entry) {
      if (radius < entry.min) entry.min = radius;
      if (radius > entry.max) entry.max = radius;
    } else {
      bands.set(band, { min: radius, max: radius });
    }
  }

  const stations = [...bands.entries()]
    .map(([band, r]) => ({ x: band * STATION_WIDTH_MM, min: r.min, max: r.max }))
    .sort((a, b) => a.x - b.x);

  if (stations.length < 2) return null;

  const thinned = thinStations(stations, MAX_PROFILE_POINTS / 2);

  // Aussenkontur hin, Innenkontur zurueck — eine geschlossene Schleife.
  const outer: ProfilePoint[] = thinned.map((s) => ({ x: s.x, r: s.max }));
  const inner: ProfilePoint[] = thinned
    .slice()
    .reverse()
    .map((s) => ({ x: s.x, r: s.min }));

  const profile = [...outer, ...inner];

  // Eine Kontur, deren Innen- und Aussenradius ueberall zusammenfallen, ist
  // keine Flaeche, sondern eine Linie. Das waere ein Koerper ohne Volumen.
  const hasArea = thinned.some((s) => s.max - s.min > 0.05);
  if (!hasArea) return null;

  return dedupeProfile(profile);
}

interface Station {
  x: number;
  min: number;
  max: number;
}

/**
 * Duennt die Abtastung aus, ohne Kanten zu verlieren.
 *
 * Zuerst bleiben alle Stationen erhalten, an denen sich ein Radius sprunghaft
 * aendert — das sind die Absaetze, Fasen und Anschlaege, also genau die
 * Maße, auf die es ankommt. Erst danach wird die verbleibende Zahl
 * gleichmaessig auf das Budget gebracht.
 */
function thinStations(stations: Station[], budget: number): Station[] {
  if (stations.length <= budget) return stations;

  const keep = new Set<number>([0, stations.length - 1]);

  // Kanten: wo sich der Radius zwischen zwei Stationen deutlich aendert.
  for (let i = 1; i < stations.length; i++) {
    const a = stations[i - 1]!;
    const b = stations[i]!;
    if (Math.abs(b.max - a.max) > 0.2 || Math.abs(b.min - a.min) > 0.2) {
      keep.add(i - 1);
      keep.add(i);
    }
  }

  // Auffuellen, bis das Budget erreicht ist — gleichmaessig verteilt.
  const step = Math.max(1, Math.floor(stations.length / budget));
  for (let i = 0; i < stations.length && keep.size < budget; i += step) {
    keep.add(i);
  }

  return [...keep].sort((a, b) => a - b).map((i) => stations[i]!);
}

/** Entfernt aufeinanderfolgende Punkte, die praktisch aufeinanderliegen. */
function dedupeProfile(points: ProfilePoint[]): ProfilePoint[] {
  const out: ProfilePoint[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (last && Math.abs(last.x - p.x) < 1e-4 && Math.abs(last.r - p.r) < 1e-4) continue;
    out.push({ x: p.x, r: Math.max(0, p.r) });
  }
  return out;
}

/* --------------------------------------------------------------------------
 * Weg 3 — Netz
 * ------------------------------------------------------------------------ */

/** Raster, auf das Eckpunkte beim Verschweissen gerundet werden, in mm. */
const WELD_GRID_MM = 0.01;

/**
 * Verschweisst gleiche Eckpunkte und wirft entartete Dreiecke weg.
 *
 * Die Module liefern nicht indizierte Geometrie: drei Eckpunkte je Dreieck,
 * auch wenn benachbarte Dreiecke sich Punkte teilen. Gemessen sind das im
 * Mittel 50 837 Eckpunkte fuer 27 095 Dreiecke; nach dem Verschweissen bleiben
 * 12 671 — drei Viertel weniger, ohne dass sich an der Form etwas aendert.
 *
 * Das Raster von einem Hundertstel Millimeter liegt weit unterhalb jeder
 * Katalogangabe und weit oberhalb des Gleitkommarauschens.
 */
export function weldMesh(
  vertices: Vertex[],
  triangles: [number, number, number][],
): {
  coordinates: [number, number, number][];
  triangles: [number, number, number][];
  degenerateDropped: number;
} {
  const lookup = new Map<string, number>();
  const coordinates: [number, number, number][] = [];
  const remap = new Int32Array(vertices.length);

  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i]!;
    const x = Math.round(v.x / WELD_GRID_MM);
    const y = Math.round(v.y / WELD_GRID_MM);
    const z = Math.round(v.z / WELD_GRID_MM);
    const key = `${x},${y},${z}`;
    const existing = lookup.get(key);
    if (existing !== undefined) {
      remap[i] = existing;
    } else {
      const id = coordinates.length;
      lookup.set(key, id);
      coordinates.push([x * WELD_GRID_MM, y * WELD_GRID_MM, z * WELD_GRID_MM]);
      remap[i] = id;
    }
  }

  const out: [number, number, number][] = [];
  let degenerateDropped = 0;
  for (const [a, b, c] of triangles) {
    const ia = remap[a]!;
    const ib = remap[b]!;
    const ic = remap[c]!;
    // Nach dem Verschweissen fallen Dreiecke zusammen, deren Ecken vorher nur
    // durch Rundungsrauschen getrennt waren. Sie haben keine Flaeche mehr und
    // wuerden von Pruefwerkzeugen beanstandet.
    if (ia === ib || ib === ic || ia === ic) {
      degenerateDropped++;
      continue;
    }
    out.push([ia, ib, ic]);
  }

  return { coordinates, triangles: out, degenerateDropped };
}

/* --------------------------------------------------------------------------
 * Auswahl
 * ------------------------------------------------------------------------ */

export interface ShapeOptions {
  /** true, wenn das Produkt ein Rohr ist. */
  isPipe: boolean;
  /** Stangenlaenge aus dem Katalog, in Metern. */
  stockLengthM: number | null;
  /** Aufgeloeste Parametrik, sofern das Modul sie bereitstellt. */
  params: Record<string, unknown> | null;
  /** Gebaute Baugruppe, sofern der Netzweg gegangen wurde. */
  assembly: Assembly | null;
}

/**
 * Waehlt die guenstigste Form, die sich belegen laesst.
 *
 * Die Rangfolge ist absichtlich streng: es wird erst dann tesselliert, wenn
 * kein analytischer Weg nachweisbar traegt. Und die Rotationssymmetrie wird
 * geprueft, nicht vermutet.
 */
export function deriveShape(options: ShapeOptions): BimShape {
  if (options.isPipe && options.params) {
    const shape = pipeShape(options.params, options.stockLengthM);
    if (shape.kind !== 'none') return shape;
  }

  if (!options.assembly) {
    return { kind: 'none', note: 'kein 3D-Modell für dieses Produkt' };
  }

  const { vertices, triangles, skippedSectionParts } = readTriangles(options.assembly);
  if (vertices.length === 0 || triangles.length === 0) {
    return { kind: 'none', note: 'Modell ohne auswertbare Geometrie' };
  }

  const sectionNote =
    skippedSectionParts > 0
      ? ` ${skippedSectionParts} Halbschnitt-Deckflächen ausgeschlossen.`
      : '';

  if (isRotationallySymmetric(vertices)) {
    const profile = revolvedProfileFromMesh(vertices);
    if (profile && profile.length >= 4) {
      return {
        kind: 'revolved',
        profile,
        note:
          `Rotationskörper, Meridiankontur aus dem Modell gemessen ` +
          `(${profile.length} Punkte, Abtastung ${STATION_WIDTH_MM} mm).` +
          sectionNote,
      };
    }
  }

  const welded = weldMesh(vertices, triangles);
  return {
    kind: 'mesh',
    coordinates: welded.coordinates,
    triangles: welded.triangles,
    note:
      `Tesselliert: ${welded.triangles.length} Dreiecke, ` +
      `${welded.coordinates.length} Eckpunkte nach dem Verschweißen.` +
      sectionNote,
  };
}
