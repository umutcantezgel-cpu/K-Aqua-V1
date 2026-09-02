/* Erzeugt eine IFC-4-Datei zu einer Artikelnummer.
 *
 * Aufbau der Datei, in dieser Reihenfolge:
 *
 *   Projektrahmen   IfcProject, Einheiten in MILLIMETER, Darstellungskontext
 *   Bauwerksgerüst  Site → Building → Storey. Ein Bauteil ohne raeumliche
 *                   Einordnung wird von manchen Pruefwerkzeugen beanstandet
 *                   und von Revit beim Import an den Ursprung geworfen.
 *   Werkstoff       IfcMaterial mit Dichte, Waermeleitfaehigkeit, Ausdehnung
 *                   und E-Modul aus dem Katalog
 *   Bauteil         IfcPipeSegment / IfcPipeFitting / IfcValve / Zubehoer
 *   Form            SweptDiskSolid, RevolvedAreaSolid oder TriangulatedFaceSet
 *   Anschluesse     IfcDistributionPort, ueber IfcRelNests am Bauteil
 *   Merkmale        Standard-Psets zuerst, eigene nur wo die Norm keine kennt
 *   Mengen          Qto_… mit Laenge, Gewicht, Wasserinhalt
 *
 * EINHEIT: Millimeter. Das ist dieselbe Einheit wie im Katalog und im
 * OBJ-Exportvertrag des 3D-Bestands. IFC erlaubt beides; wer Meter waehlt,
 * handelt sich bei jedem Vergleich mit dem Datenblatt eine Umrechnung ein. */

import {
  SpfBuilder,
  assembleSpf,
  ifcGuid,
  enumValue,
  real,
  reals,
  label,
  text,
  identifier,
  positiveLength,
  realMeasure,
  integerMeasure,
  typed,
  type SpfRef,
  type SpfValue,
} from '@/lib/bim/ifc/spf';
import type { BimRecord, JointType } from '@/lib/bim/product';
import type { BimShape } from '@/lib/bim/geometry';
import {
  BIM_MATERIALS,
  MASS_DENSITY_KG_M3,
  THERMAL_CONDUCTIVITY_W_MK,
  YOUNG_MODULUS_MPA,
} from '@/lib/bim/tables/material';
import { APPLICATION_CLASSES } from '@/lib/bim/tables/application-classes';
import { socketWeldingParameters } from '@/lib/bim/tables/welding';

const MANUFACTURER = 'K-Aqua KWT GmbH';
const APPLICATION_NAME = 'K-Aqua BIM Export';
const APPLICATION_ID = 'K-AQUA-BIM';
const APPLICATION_VERSION = '1.0';

/* --------------------------------------------------------------------------
 * Typzuordnung
 * ------------------------------------------------------------------------ */

interface IfcTypeMapping {
  entity: string;
  predefinedType: string;
}

/**
 * Ordnet einen Artikel der IFC-Entitaet und ihrem vordefinierten Typ zu.
 *
 * Die Zuordnung geht ueber den Produkt-Slug, nicht ueber die Kategorie allein:
 * ein „Winkel" ist ein BEND, ein „T-Stueck" eine JUNCTION, eine
 * „Reduziermuffe" eine TRANSITION — alle drei liegen in derselben Kategorie
 * `fittings`. Wer nur nach Kategorie zuordnet, meldet jedem Formstueck
 * denselben Typ, und die Auswertung im Planungswerkzeug wird wertlos.
 */
export function ifcTypeFor(record: BimRecord): IfcTypeMapping {
  const slug = record.productSlug;

  if (record.category === 'pipes') {
    return { entity: 'IFCPIPESEGMENT', predefinedType: 'RIGIDSEGMENT' };
  }

  if (record.category === 'valves') {
    if (/check|rueckschlag|rückschlag/i.test(slug)) {
      return { entity: 'IFCVALVE', predefinedType: 'CHECKVALVE' };
    }
    if (/ball|kugel/i.test(slug)) {
      return { entity: 'IFCVALVE', predefinedType: 'BALLVALVE' };
    }
    return { entity: 'IFCVALVE', predefinedType: 'ISOLATING' };
  }

  if (record.category === 'tools') {
    // Werkzeuge sind keine Bauteile. Sie erhalten ueberhaupt keine IFC-Datei;
    // die Zuordnung steht hier nur der Vollstaendigkeit halber.
    return { entity: 'IFCDISCRETEACCESSORY', predefinedType: 'NOTDEFINED' };
  }

  if (record.category === 'accessories') {
    if (/flange|flansch/i.test(slug)) {
      return { entity: 'IFCDISCRETEACCESSORY', predefinedType: 'USERDEFINED' };
    }
    if (/clamp|schelle/i.test(slug)) {
      return { entity: 'IFCDISCRETEACCESSORY', predefinedType: 'USERDEFINED' };
    }
    if (/plug|stopfen|cap|kappe/i.test(slug)) {
      return { entity: 'IFCPIPEFITTING', predefinedType: 'EXIT' };
    }
    return { entity: 'IFCDISCRETEACCESSORY', predefinedType: 'NOTDEFINED' };
  }

  // Formstuecke, Uebergangsstuecke, Einschweisssaettel
  if (/elbow|winkel|bend|bogen|cross-over|ueberbogen/i.test(slug)) {
    return { entity: 'IFCPIPEFITTING', predefinedType: 'BEND' };
  }
  if (/tee|cross|saddle|sattel|abzweig/i.test(slug)) {
    return { entity: 'IFCPIPEFITTING', predefinedType: 'JUNCTION' };
  }
  if (/cap|kappe|plug|stopfen/i.test(slug)) {
    return { entity: 'IFCPIPEFITTING', predefinedType: 'EXIT' };
  }
  if (/reduc|adaptor|adapter|union|flange|verschraubung|uebergang/i.test(slug)) {
    return { entity: 'IFCPIPEFITTING', predefinedType: 'TRANSITION' };
  }
  return { entity: 'IFCPIPEFITTING', predefinedType: 'TRANSITION' };
}

/** Anschlussart im Wortlaut, wie sie im Merkmalssatz erscheint. */
const JOINT_LABEL: Record<JointType, string> = {
  'socket-fusion': 'Muffenschweißung (DVS 2207-11)',
  'butt-fusion': 'Heizelementstumpfschweißung (DVS 2207-11)',
  electrofusion: 'Elektroschweißung (DVS 2207-11)',
  threaded: 'Gewinde (ISO 7 / EN ISO 228)',
  flanged: 'Flanschverbindung',
  compression: 'Klemmverbindung',
  none: 'ohne Rohranschluss',
};

/* --------------------------------------------------------------------------
 * Anschlusspunkte
 * ------------------------------------------------------------------------ */

export interface PortSpec {
  name: string;
  /** Lage in mm. */
  position: [number, number, number];
  /** Achsrichtung, aus dem Bauteil heraus zeigend. */
  direction: [number, number, number];
  nominalDiameterMm: number | null;
  jointType: JointType;
}

/** Erwartete Zahl der Rohranschluesse, aus der Bauform. */
export function expectedPortCount(record: BimRecord): number {
  const slug = record.productSlug;
  if (/cross\b|kreuz/i.test(slug) && !/cross-over/i.test(slug)) return 4;
  if (/tee|saddle|sattel/i.test(slug)) return 3;
  if (/cap|kappe|plug|stopfen/i.test(slug)) return 1;
  if (record.category === 'accessories' && !/plug|stopfen|cap/i.test(slug)) return 0;
  if (record.category === 'tools') return 0;
  return 2;
}

/**
 * Bestimmt die Anschlusspunkte aus der Hüllgeometrie.
 *
 * Ein offenes Rohrende hinterlaesst am Rand der Hülle einen dichten Kranz von
 * Eckpunkten; eine geschlossene Seite nicht. Fuer jede der sechs
 * Hüllflaechen wird gezaehlt, wie viele Eckpunkte in ihrer Naehe liegen; die
 * dichtesten Flaechen werden zu Anschluessen, so viele, wie die Bauform
 * erwarten laesst.
 *
 * Das ist eine Naeherung und wird auch so benannt: die Lage stimmt auf die
 * Hüllfläche genau, die Achsrichtung auf die Hauptachse. Fuer Kollisionsprüfung
 * und Verbindungslogik in Revit oder ArchiCAD genuegt das; wer Millimeter am
 * Anschluss braucht, nimmt das Maßblatt.
 */
export function derivePorts(record: BimRecord, shape: BimShape): PortSpec[] {
  const count = expectedPortCount(record);
  if (count === 0) return [];

  const dn = record.outerDiameterMm;

  if (shape.kind === 'sweptDisk') {
    // Rohr: zwei Anschluesse auf der Achse, an beiden Enden.
    const half = shape.length / 2;
    return [
      {
        name: 'Anschluss 1',
        position: [-half, 0, 0],
        direction: [-1, 0, 0],
        nominalDiameterMm: dn,
        jointType: record.jointType,
      },
      {
        name: 'Anschluss 2',
        position: [half, 0, 0],
        direction: [1, 0, 0],
        nominalDiameterMm: dn,
        jointType: record.jointType,
      },
    ];
  }

  const points = shapePoints(shape);
  if (points.length === 0) return [];

  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (const p of points) {
    for (let a = 0; a < 3; a++) {
      if (p[a]! < min[a]!) min[a] = p[a]!;
      if (p[a]! > max[a]!) max[a] = p[a]!;
    }
  }

  const faces: { axis: 0 | 1 | 2; sign: -1 | 1; plane: number; density: number }[] = [];
  const tolerance = 1.0; // mm
  for (let axis = 0; axis < 3; axis++) {
    for (const sign of [-1, 1] as const) {
      const plane = sign < 0 ? min[axis]! : max[axis]!;
      let density = 0;
      for (const p of points) {
        if (Math.abs(p[axis]! - plane) <= tolerance) density++;
      }
      faces.push({ axis: axis as 0 | 1 | 2, sign, plane, density });
    }
  }

  faces.sort((a, b) => b.density - a.density);

  return faces.slice(0, count).map((face, i) => {
    const position: [number, number, number] = [0, 0, 0];
    // Auf der Anschlussachse an der Hüllfläche, quer dazu in der Mitte.
    for (let a = 0; a < 3; a++) {
      position[a] = a === face.axis ? face.plane : (min[a]! + max[a]!) / 2;
    }
    const direction: [number, number, number] = [0, 0, 0];
    direction[face.axis] = face.sign;
    return {
      name: `Anschluss ${i + 1}`,
      position,
      direction,
      nominalDiameterMm: dn,
      jointType: record.jointType,
    };
  });
}

/** Die Eckpunkte einer Form, unabhaengig von ihrer Bauart. */
function shapePoints(shape: BimShape): [number, number, number][] {
  if (shape.kind === 'mesh') return shape.coordinates;
  if (shape.kind === 'revolved') {
    // Die Meridiankontur, einmal in +Y und einmal in −Y gespiegelt, umreisst
    // die Hülle des gedrehten Koerpers.
    return shape.profile.flatMap(
      (p) => [[p.x, p.r, 0], [p.x, -p.r, 0]] as [number, number, number][],
    );
  }
  return [];
}

/* --------------------------------------------------------------------------
 * Schreiben
 * ------------------------------------------------------------------------ */

export interface IfcWriteOptions {
  record: BimRecord;
  shape: BimShape;
  /** Zeitstempel im Dateikopf. Fuer wiederholbare Ausgaben festlegbar. */
  timestamp?: Date;
  /** Fundstelle der Website, damit die Datei auf ihre Quelle zurueckweist. */
  sourceUrl?: string;
}

export interface IfcWriteResult {
  /** Die vollstaendige IFC-Datei. */
  content: string;
  /** Vorgeschlagener Dateiname. */
  fileName: string;
  /** Zahl der geschriebenen Entitaeten — grober Maßstab fuer die Groesse. */
  entityCount: number;
  /** Welche Form geschrieben wurde und warum. */
  shapeNote: string;
  /** Zahl der geschriebenen Anschlusspunkte. */
  portCount: number;
}

export function writeIfc(options: IfcWriteOptions): IfcWriteResult {
  const { record, shape } = options;
  const timestamp = options.timestamp ?? new Date();
  const b = new SpfBuilder();
  const guid = (role: string) => ifcGuid(`${record.articleCode}:${role}`);

  /* --- Urheberangaben --- */
  const person = b.add('IFCPERSON', null, MANUFACTURER, null, null, null, null, null, null);
  const organization = b.add(
    'IFCORGANIZATION',
    null,
    MANUFACTURER,
    'Hersteller von PP-R-Rohrleitungssystemen',
    null,
    null,
  );
  const personAndOrg = b.add('IFCPERSONANDORGANIZATION', person, organization, null);
  const application = b.add(
    'IFCAPPLICATION',
    organization,
    APPLICATION_VERSION,
    APPLICATION_NAME,
    APPLICATION_ID,
  );
  const seconds = Math.floor(timestamp.getTime() / 1000);
  const ownerHistory = b.add(
    'IFCOWNERHISTORY',
    personAndOrg,
    application,
    null,
    enumValue('ADDED'),
    seconds,
    personAndOrg,
    application,
    seconds,
  );

  /* --- Einheiten: Millimeter, Kilogramm, Radiant, Kelvin --- */
  const units = [
    b.add('IFCSIUNIT', null, enumValue('LENGTHUNIT'), enumValue('MILLI'), enumValue('METRE')),
    b.add('IFCSIUNIT', null, enumValue('AREAUNIT'), null, enumValue('SQUARE_METRE')),
    b.add('IFCSIUNIT', null, enumValue('VOLUMEUNIT'), null, enumValue('CUBIC_METRE')),
    b.add('IFCSIUNIT', null, enumValue('MASSUNIT'), enumValue('KILO'), enumValue('GRAM')),
    b.add('IFCSIUNIT', null, enumValue('PLANEANGLEUNIT'), null, enumValue('RADIAN')),
    b.add('IFCSIUNIT', null, enumValue('TIMEUNIT'), null, enumValue('SECOND')),
    b.add(
      'IFCSIUNIT',
      null,
      enumValue('THERMODYNAMICTEMPERATUREUNIT'),
      null,
      enumValue('KELVIN'),
    ),
  ];
  const unitAssignment = b.add('IFCUNITASSIGNMENT', units);

  /* --- Ursprung und Kontext --- */
  const origin = b.add('IFCCARTESIANPOINT', reals(0, 0, 0));
  const axisZ = b.add('IFCDIRECTION', reals(0, 0, 1));
  const axisX = b.add('IFCDIRECTION', reals(1, 0, 0));
  const worldPlacement = b.add('IFCAXIS2PLACEMENT3D', origin, axisZ, axisX);
  const trueNorth = b.add('IFCDIRECTION', reals(0, 1));
  const context = b.add(
    'IFCGEOMETRICREPRESENTATIONCONTEXT',
    null,
    'Model',
    3,
    real(1e-5),
    worldPlacement,
    trueNorth,
  );

  /* --- Projekt --- */
  const project = b.add(
    'IFCPROJECT',
    guid('project'),
    ownerHistory,
    `${MANUFACTURER} — ${record.articleCode}`,
    `BIM-Datensatz zu Artikel ${record.articleCode}, ${record.title}. Quelle: ${record.source}.`,
    null,
    null,
    null,
    [context],
    unitAssignment,
  );

  /* --- Raeumliches Geruest --- */
  const sitePlacement = b.add('IFCLOCALPLACEMENT', null, worldPlacement);
  const site = b.add(
    'IFCSITE',
    guid('site'),
    ownerHistory,
    'Produktbibliothek',
    null,
    null,
    sitePlacement,
    null,
    null,
    enumValue('ELEMENT'),
    null,
    null,
    null,
    null,
    null,
  );
  const buildingPlacement = b.add('IFCLOCALPLACEMENT', sitePlacement, worldPlacement);
  const building = b.add(
    'IFCBUILDING',
    guid('building'),
    ownerHistory,
    MANUFACTURER,
    null,
    null,
    buildingPlacement,
    null,
    null,
    enumValue('ELEMENT'),
    null,
    null,
    null,
  );
  const storeyPlacement = b.add('IFCLOCALPLACEMENT', buildingPlacement, worldPlacement);
  const storey = b.add(
    'IFCBUILDINGSTOREY',
    guid('storey'),
    ownerHistory,
    'Bauteilebene',
    null,
    null,
    storeyPlacement,
    null,
    null,
    enumValue('ELEMENT'),
    real(0),
  );

  b.add('IFCRELAGGREGATES', guid('agg-project'), ownerHistory, null, null, project, [site]);
  b.add('IFCRELAGGREGATES', guid('agg-site'), ownerHistory, null, null, site, [building]);
  b.add('IFCRELAGGREGATES', guid('agg-building'), ownerHistory, null, null, building, [
    storey,
  ]);

  /* --- Form --- */
  const shapeItems = writeShape(b, shape, worldPlacement);
  const representationType =
    shape.kind === 'mesh'
      ? 'Tessellation'
      : shape.kind === 'sweptDisk'
        ? 'AdvancedSweptSolid'
        : shape.kind === 'revolved'
          ? 'SweptSolid'
          : null;

  let productShape: SpfRef | null = null;
  if (shapeItems.length > 0 && representationType) {
    const representation = b.add(
      'IFCSHAPEREPRESENTATION',
      context,
      'Body',
      representationType,
      shapeItems,
    );
    productShape = b.add('IFCPRODUCTDEFINITIONSHAPE', null, null, [representation]);
  }

  /* --- Bauteil --- */
  const { entity, predefinedType } = ifcTypeFor(record);
  const elementPlacement = b.add('IFCLOCALPLACEMENT', storeyPlacement, worldPlacement);
  const element = b.add(
    entity,
    guid('element'),
    ownerHistory,
    /* Der Bauteilname im Modellbaum. Bisher stand hier der PRODUKTname, und
       der ist auf allen Nennweiten einer Familie derselbe: Ein Planer sah in
       der Baumansicht 14-mal „PP-R Standard Elbow 45°" und musste die
       Nennweite aus den Massen zurueckrechnen. Wo der Hersteller einen
       Artikelnamen fuehrt, steht jetzt der. Wo nicht — 284 von 546 Nummern,
       darunter alle Rohre — bleibt es beim Produktnamen. */
    `${record.articleName ?? record.title} ${record.articleCode}`,
    `${record.title}. Nennweite ${record.outerDiameterMm ?? '—'} mm. ${record.source}.`,
    null,
    elementPlacement,
    productShape,
    record.articleCode,
    enumValue(predefinedType),
  );

  b.add(
    'IFCRELCONTAINEDINSPATIALSTRUCTURE',
    guid('contained'),
    ownerHistory,
    null,
    null,
    [element],
    storey,
  );

  /* --- Werkstoff --- */
  const material = b.add('IFCMATERIAL', record.material, null, 'Kunststoff');
  b.add(
    'IFCRELASSOCIATESMATERIAL',
    guid('material'),
    ownerHistory,
    null,
    null,
    [element],
    material,
  );
  writeMaterialProperties(b, material, record);

  /* --- Anschlusspunkte --- */
  const ports = derivePorts(record, shape);
  const portRefs: SpfRef[] = [];
  for (const [i, port] of ports.entries()) {
    const location = b.add('IFCCARTESIANPOINT', reals(...port.position));
    const direction = b.add('IFCDIRECTION', reals(...port.direction));
    const placementAxes = b.add('IFCAXIS2PLACEMENT3D', location, direction, null);
    const portPlacement = b.add('IFCLOCALPLACEMENT', elementPlacement, placementAxes);
    const portRef = b.add(
      'IFCDISTRIBUTIONPORT',
      guid(`port-${i}`),
      ownerHistory,
      port.name,
      `${JOINT_LABEL[port.jointType]}${
        port.nominalDiameterMm !== null ? `, d${port.nominalDiameterMm}` : ''
      }`,
      null,
      portPlacement,
      null,
      enumValue('SOURCEANDSINK'),
      enumValue('PIPE'),
      enumValue('DOMESTICCOLDWATER'),
    );
    portRefs.push(portRef);

    const portProps: SpfRef[] = [
      b.add('IFCPROPERTYSINGLEVALUE', 'Verbindungsart', null, label(JOINT_LABEL[port.jointType]), null),
    ];
    if (port.nominalDiameterMm !== null) {
      portProps.push(
        b.add(
          'IFCPROPERTYSINGLEVALUE',
          'NominalDiameter',
          null,
          positiveLength(port.nominalDiameterMm),
          null,
        ),
      );

      /* Einschweisstiefe und Schweisszeiten, sofern der Katalog sie fuehrt.
       *
       * Die Werte stammen aus Table A auf S. 41 — also aus der
       * Schweissanweisung des Herstellers selbst. Der 3D-Bestand rechnet
       * stattdessen mit den generischen Werten aus DVS 2207-11
       * (`FUSION_DEPTH` im Core), und die liegen durchgaengig darueber: bei
       * d20 um einen halben, bei d125 um fuenf Millimeter. Wo beide
       * auseinandergehen, gilt hier der Katalog. Alles andere hiesse, dem
       * Planer eine andere Einstecktiefe zu nennen, als in der
       * Verarbeitungsanleitung seines Lieferanten steht.
       */
      const welding = socketWeldingParameters(port.nominalDiameterMm);
      if (welding && port.jointType === 'socket-fusion') {
        portProps.push(
          b.add(
            'IFCPROPERTYSINGLEVALUE',
            'Einschweisstiefe',
            'Schweißtiefe laut Katalog S. 41, Table A',
            positiveLength(welding.weldingDepthMm),
            null,
          ),
          b.add(
            'IFCPROPERTYSINGLEVALUE',
            'Anwaermzeit',
            'Anwärmzeit in Sekunden bei 260 °C ± 10 °C, Katalog S. 41',
            typed('IFCTIMEMEASURE', real(welding.heatingTimeS)),
            null,
          ),
          b.add(
            'IFCPROPERTYSINGLEVALUE',
            'Abkuehlzeit',
            'Abkühlzeit in Sekunden, Katalog S. 41',
            typed('IFCTIMEMEASURE', real(welding.coolingTimeMin * 60)),
            null,
          ),
        );
      }
    }
    const portSet = b.add(
      'IFCPROPERTYSET',
      guid(`port-pset-${i}`),
      ownerHistory,
      'Pset_KAqua_Port',
      'Anschlussdaten laut Herstellerkatalog',
      portProps,
    );
    b.add(
      'IFCRELDEFINESBYPROPERTIES',
      guid(`port-rel-${i}`),
      ownerHistory,
      null,
      null,
      [portRef],
      portSet,
    );
  }

  if (portRefs.length > 0) {
    b.add('IFCRELNESTS', guid('nests'), ownerHistory, null, null, element, portRefs);
  }

  /* --- Merkmale und Mengen --- */
  writePropertySets(b, element, ownerHistory, record, guid, options.sourceUrl);
  writeQuantities(b, element, ownerHistory, record, shape, guid);

  const fileName = `K-Aqua_${record.productSlug}_${record.articleCode}.ifc`;
  return {
    content: assembleSpf(b, {
      fileName,
      description: 'ViewDefinition [ReferenceView_V1.2]',
      timestamp,
      author: MANUFACTURER,
      organization: MANUFACTURER,
      originatingSystem: `${APPLICATION_NAME} ${APPLICATION_VERSION}`,
      preprocessorVersion: `Katalog ${record.catalogEdition}`,
    }),
    fileName,
    entityCount: b.count,
    shapeNote: shape.note,
    portCount: ports.length,
  };
}

/* --------------------------------------------------------------------------
 * Formen
 * ------------------------------------------------------------------------ */

function writeShape(
  b: SpfBuilder,
  shape: BimShape,
  worldPlacement: SpfRef,
): SpfRef[] {
  if (shape.kind === 'sweptDisk') {
    // Ein gerades Rohr: eine Leitlinie auf der X-Achse, darum eine Kreisscheibe
    // mit Aussen- und Innenradius. Das ist die Entitaet, fuer die IFC gemacht
    // ist — ein Rohr bleibt damit in Revit ein Rohr und wird kein Netz.
    const start = b.add('IFCCARTESIANPOINT', reals(-shape.length / 2, 0, 0));
    const end = b.add('IFCCARTESIANPOINT', reals(shape.length / 2, 0, 0));
    const directrix = b.add('IFCPOLYLINE', [start, end]);
    return [
      b.add(
        'IFCSWEPTDISKSOLID',
        directrix,
        real(shape.radius),
        shape.innerRadius > 0 ? real(shape.innerRadius) : null,
        null,
        null,
      ),
    ];
  }

  if (shape.kind === 'revolved') {
    // Die Meridiankontur liegt in der XY-Ebene: X ist die Achsrichtung,
    // Y der Abstand von der Achse. Gedreht wird um die X-Achse.
    const points = shape.profile.map((p) =>
      b.add('IFCCARTESIANPOINT', reals(p.x, p.r)),
    );
    // Der Polygonzug muss geschlossen sein: letzter Punkt gleich erstem.
    const closed = [...points, points[0]!];
    const polyline = b.add('IFCPOLYLINE', closed);
    const profile = b.add(
      'IFCARBITRARYCLOSEDPROFILEDEF',
      enumValue('AREA'),
      'Meridiankontur',
      polyline,
    );
    const position = b.add(
      'IFCAXIS2PLACEMENT3D',
      b.add('IFCCARTESIANPOINT', reals(0, 0, 0)),
      b.add('IFCDIRECTION', reals(0, 0, 1)),
      b.add('IFCDIRECTION', reals(1, 0, 0)),
    );
    const axis = b.add(
      'IFCAXIS1PLACEMENT',
      b.add('IFCCARTESIANPOINT', reals(0, 0, 0)),
      b.add('IFCDIRECTION', reals(1, 0, 0)),
    );
    return [
      b.add('IFCREVOLVEDAREASOLID', profile, position, axis, real(2 * Math.PI)),
    ];
  }

  if (shape.kind === 'mesh') {
    const coordList = b.add(
      'IFCCARTESIANPOINTLIST3D',
      shape.coordinates.map((c) => reals(...c)),
      null,
    );
    // CoordIndex zaehlt in IFC ab eins, nicht ab null.
    const coordIndex: SpfValue = shape.triangles.map((t) => [
      t[0] + 1,
      t[1] + 1,
      t[2] + 1,
    ]);
    return [
      b.add('IFCTRIANGULATEDFACESET', coordList, null, true, coordIndex, null),
    ];
  }

  void worldPlacement;
  return [];
}

/* --------------------------------------------------------------------------
 * Werkstoffkennwerte
 * ------------------------------------------------------------------------ */

function writeMaterialProperties(
  b: SpfBuilder,
  material: SpfRef,
  record: BimRecord,
): void {
  const definition = BIM_MATERIALS[record.material];

  b.add(
    'IFCMATERIALPROPERTIES',
    'Pset_MaterialCommon',
    `Werkstoffkennwerte laut ${definition.source}`,
    [
      b.add(
        'IFCPROPERTYSINGLEVALUE',
        'MassDensity',
        null,
        typed('IFCMASSDENSITYMEASURE', real(MASS_DENSITY_KG_M3)),
        null,
      ),
      b.add('IFCPROPERTYSINGLEVALUE', 'MaterialName', null, label(definition.nameDe), null),
    ],
    material,
  );

  b.add(
    'IFCMATERIALPROPERTIES',
    'Pset_MaterialThermal',
    `Thermische Kennwerte laut ${definition.source}`,
    [
      b.add(
        'IFCPROPERTYSINGLEVALUE',
        'ThermalConductivity',
        null,
        typed('IFCTHERMALCONDUCTIVITYMEASURE', real(THERMAL_CONDUCTIVITY_W_MK)),
        null,
      ),
      b.add(
        'IFCPROPERTYSINGLEVALUE',
        'ThermalExpansionCoefficient',
        null,
        typed('IFCTHERMALEXPANSIONCOEFFICIENTMEASURE', real(record.expansionCoefficientPerK)),
        null,
      ),
    ],
    material,
  );

  b.add(
    'IFCMATERIALPROPERTIES',
    'Pset_MaterialMechanical',
    `Mechanische Kennwerte laut ${definition.source}`,
    [
      b.add(
        'IFCPROPERTYSINGLEVALUE',
        'YoungModulus',
        null,
        typed('IFCMODULUSOFELASTICITYMEASURE', real(YOUNG_MODULUS_MPA * 1e6)),
        null,
      ),
    ],
    material,
  );
}

/* --------------------------------------------------------------------------
 * Merkmale
 * ------------------------------------------------------------------------ */

type GuidFn = (role: string) => string;

function property(
  b: SpfBuilder,
  name: string,
  value: SpfValue,
  description?: string,
): SpfRef {
  return b.add('IFCPROPERTYSINGLEVALUE', name, description ?? null, value, null);
}

function attachPropertySet(
  b: SpfBuilder,
  element: SpfRef,
  ownerHistory: SpfRef,
  guid: GuidFn,
  key: string,
  name: string,
  description: string,
  properties: SpfRef[],
): void {
  if (properties.length === 0) return;
  const set = b.add('IFCPROPERTYSET', guid(key), ownerHistory, name, description, properties);
  b.add(
    'IFCRELDEFINESBYPROPERTIES',
    guid(`${key}-rel`),
    ownerHistory,
    null,
    null,
    [element],
    set,
  );
}

function writePropertySets(
  b: SpfBuilder,
  element: SpfRef,
  ownerHistory: SpfRef,
  record: BimRecord,
  guid: GuidFn,
  sourceUrl?: string,
): void {
  /* Standard-Pset zur Bauart. IFC kennt eigene Merkmalssaetze je Bauteilart;
     sie werden zuerst bedient, damit Planungswerkzeuge die Werte am
     erwarteten Ort finden. */
  const common: SpfRef[] = [];
  if (record.outerDiameterMm !== null) {
    common.push(property(b, 'NominalDiameter', positiveLength(record.outerDiameterMm)));
    common.push(property(b, 'OuterDiameter', positiveLength(record.outerDiameterMm)));
  }
  if (record.innerDiameterMm !== null) {
    common.push(property(b, 'InnerDiameter', positiveLength(record.innerDiameterMm)));
  }
  if (record.wallThicknessMm !== null) {
    common.push(property(b, 'WallThickness', positiveLength(record.wallThicknessMm)));
  }
  if (record.pressure !== null) {
    common.push(
      property(b, 'PressureRating', label(record.pressure), 'Betriebsdruck laut Katalog'),
    );
  }
  common.push(property(b, 'Reference', identifier(record.articleCode)));
  common.push(property(b, 'Status', label('Neu')));

  const commonSetName =
    record.category === 'pipes'
      ? 'Pset_PipeSegmentTypeCommon'
      : record.category === 'valves'
        ? 'Pset_ValveTypeCommon'
        : 'Pset_PipeFittingTypeCommon';

  attachPropertySet(
    b,
    element,
    ownerHistory,
    guid,
    'pset-common',
    commonSetName,
    `Kenndaten laut ${record.source}`,
    common,
  );

  /* Herstellerangaben — der Standardsatz dafuer. */
  attachPropertySet(
    b,
    element,
    ownerHistory,
    guid,
    'pset-manufacturer',
    'Pset_ManufacturerTypeInformation',
    'Herstellerangaben',
    [
      property(b, 'Manufacturer', label(MANUFACTURER)),
      property(b, 'ModelReference', label(record.articleCode)),
      property(b, 'ModelLabel', label(record.title)),
      property(b, 'ArticleNumber', identifier(record.articleCode)),
    ],
  );

  /* Artikelangaben, fuer die IFC keinen Standardsatz kennt. */
  const article: SpfRef[] = [
    property(b, 'Artikelnummer', identifier(record.articleCode)),
    property(b, 'Werkstoff', label(record.material)),
    property(b, 'Verbindungsart', label(JOINT_LABEL[record.jointType])),
    property(b, 'Katalogausgabe', label(record.catalogEdition)),
    property(b, 'Katalogfundstelle', label(record.source), 'Seitenbeleg im Herstellerkatalog'),
  ];
  if (record.articleName !== null) {
    article.push(
      property(
        b,
        'Artikelbezeichnung',
        label(record.articleName),
        'Offizielle Bezeichnung des Herstellers zu genau dieser Artikelnummer',
      ),
    );
  }
  if (record.sdr !== null) article.push(property(b, 'SDR', realMeasure(record.sdr)));
  if (record.series !== null) article.push(property(b, 'Reihe', label(record.series)));
  if (record.colour !== null) article.push(property(b, 'Farbkennzeichnung', label(record.colour)));
  if (record.packUnit !== null) {
    article.push(property(b, 'Verpackungseinheit', integerMeasure(record.packUnit)));
  }
  if (record.standards.length > 0) {
    article.push(property(b, 'Normen', label(record.standards.join(', '))));
  }
  if (record.deviatingSeries !== null) {
    article.push(
      property(
        b,
        'AbweichendeReihe',
        label(record.deviatingSeries),
        'Diese Nennweite ist laut Katalog in einer anderen Reihe gefertigt als das Produkt im Namen führt',
      ),
    );
  }
  if (record.note !== null) article.push(property(b, 'Hinweis', text(record.note)));
  if (sourceUrl) article.push(property(b, 'Datenblatt', label(sourceUrl)));

  // Registrierte Widersprueche wandern mit in die Datei. Wer die Zahl im
  // Modell gegen den Katalog haelt, soll den Grund gleich mitlesen koennen.
  for (const [i, issue] of record.issues.entries()) {
    article.push(
      property(
        b,
        `Kataloghinweis_${i + 1}`,
        text(
          `${issue.field}: gedruckt ${issue.printed}, rechnerisch ${issue.consistent}. ${issue.explanationDe}`,
        ),
        issue.source,
      ),
    );
  }

  attachPropertySet(
    b,
    element,
    ownerHistory,
    guid,
    'pset-article',
    'Pset_KAqua_Article',
    `Artikelangaben laut ${record.source}`,
    article,
  );

  /* Anwendungsklassen nach DIN EN ISO 15874-1. */
  const application: SpfRef[] = [];
  for (const cls of APPLICATION_CLASSES) {
    const pressure =
      record.material === 'PP-RCT' && record.sdr === 7.4
        ? cls.pressurePpRctSdr74Bar
        : record.material === 'PP-R' && record.sdr === 6
          ? cls.pressurePpRSdr6Bar
          : null;
    if (pressure === null) continue;
    application.push(
      property(
        b,
        `Klasse_${cls.id}_Betriebsdruck`,
        typed('IFCPRESSUREMEASURE', real(pressure * 100000)),
        `${cls.applicationDe}, T_D ${cls.designTemperatureC} °C`,
      ),
    );
  }
  if (application.length > 0) {
    attachPropertySet(
      b,
      element,
      ownerHistory,
      guid,
      'pset-application',
      'Pset_KAqua_Application',
      'Anwendungsklassen nach DIN EN ISO 15874-1, Katalog S. 51',
      application,
    );
  }

  /* Verlegung: Halterungsabstaende und Waermeausdehnung. */
  const installation: SpfRef[] = [
    property(
      b,
      'Laengenausdehnungskoeffizient',
      typed('IFCTHERMALEXPANSIONCOEFFICIENTMEASURE', real(record.expansionCoefficientPerK)),
      'Katalog S. 67',
    ),
  ];
  for (const spacing of record.supportSpacingCm) {
    installation.push(
      property(
        b,
        `Halterungsabstand_${spacing.temperatureC}C`,
        positiveLength(spacing.spacingCm * 10),
        'Katalog S. 63–64',
      ),
    );
  }
  attachPropertySet(
    b,
    element,
    ownerHistory,
    guid,
    'pset-installation',
    'Pset_KAqua_Installation',
    'Verlegehinweise laut Herstellerkatalog',
    installation,
  );
}

/* --------------------------------------------------------------------------
 * Mengen
 * ------------------------------------------------------------------------ */

function writeQuantities(
  b: SpfBuilder,
  element: SpfRef,
  ownerHistory: SpfRef,
  record: BimRecord,
  shape: BimShape,
  guid: GuidFn,
): void {
  const quantities: SpfRef[] = [];

  if (shape.kind === 'sweptDisk') {
    quantities.push(
      b.add('IFCQUANTITYLENGTH', 'Length', 'Lieferlänge laut Katalog', null, real(shape.length), null),
    );
    if (record.massPerMetreKg !== null) {
      quantities.push(
        b.add(
          'IFCQUANTITYWEIGHT',
          'GrossWeight',
          'Gewicht der Stange, aus kg/m und Länge',
          null,
          real(record.massPerMetreKg * (shape.length / 1000)),
          null,
        ),
      );
    }
    if (record.waterCapacityLitrePerMetre !== null) {
      quantities.push(
        b.add(
          'IFCQUANTITYVOLUME',
          'Wasserinhalt',
          'Wasserinhalt der Stange laut Katalog',
          null,
          real((record.waterCapacityLitrePerMetre * (shape.length / 1000)) / 1000),
          null,
        ),
      );
    }
  } else if (record.massKg !== null) {
    quantities.push(
      b.add('IFCQUANTITYWEIGHT', 'GrossWeight', 'Stückgewicht laut Katalog', null, real(record.massKg), null),
    );
  }

  if (quantities.length === 0) return;

  const set = b.add(
    'IFCELEMENTQUANTITY',
    guid('quantities'),
    ownerHistory,
    record.category === 'pipes' ? 'Qto_PipeSegmentBaseQuantities' : 'Qto_KAqua_BaseQuantities',
    `Mengen laut ${record.source}`,
    'Herstellerkatalog',
    quantities,
  );
  b.add(
    'IFCRELDEFINESBYPROPERTIES',
    guid('quantities-rel'),
    ownerHistory,
    null,
    null,
    [element],
    set,
  );
}
