/* Struktureller Selbsttest einer erzeugten IFC-Datei.
 *
 * WAS DAS IST UND WAS NICHT: Dies prueft den Dateiaufbau, nicht die
 * Schemakonformitaet. Ein selbstgeschriebener Pruefer, der einen
 * selbstgeschriebenen Schreiber prueft, kann nicht bestaetigen, dass eine
 * Datei dem IFC-4-Schema in jeder Hinsicht genuegt — dafuer braucht es einen
 * unabhaengigen Prueflauf (buildingSMART Validation Service oder
 * ifcopenshell), und der gehoert vor die Veroeffentlichung.
 *
 * Was er sehr wohl leistet: er faengt genau die Fehlerklassen ab, an denen
 * selbstgebaute Schreiber tatsaechlich scheitern, und er tut das bei jedem
 * Testlauf, nicht einmalig:
 *
 *   - Verweise ins Leere. Ein `#42`, zu dem es keine Zeile `#42=` gibt, ist
 *     der haeufigste Fehler ueberhaupt und macht die Datei unlesbar.
 *   - Doppelte oder unvollstaendige Kennungen. IFC-GUIDs sind 22 Zeichen aus
 *     einem festen Alphabet; zwei Objekte mit derselben Kennung fuehren beim
 *     Import zu stillem Datenverlust.
 *   - Ganzzahlen, wo das Schema REAL verlangt. `63` statt `63.` wird von
 *     Pruefwerkzeugen beanstandet.
 *   - Fehlende Pflichtbestandteile: Projekt, Einheiten, Bauteil.
 *   - Falsche Laengeneinheit. Millimeter oder Meter zu verwechseln ist der
 *     Fehler mit den groessten Folgen und dem kleinsten Anlass.
 */

export interface IfcValidationIssue {
  severity: 'fehler' | 'hinweis';
  message: string;
  /** Zeilennummer in der Datei, wo feststellbar. */
  line?: number;
}

export interface IfcValidationReport {
  ok: boolean;
  entityCount: number;
  issues: IfcValidationIssue[];
  /** Die Laengeneinheit, wie die Datei sie erklaert. */
  lengthUnit: string | null;
  /** Kennungen aller Objekte, die eine tragen. */
  guids: string[];
  /** Entitaetstypen und ihre Haeufigkeit. */
  entityTypes: Record<string, number>;
}

const GUID_PATTERN = /^[0-9A-Za-z_$]{22}$/;

/** Entitaeten, ohne die keine IFC-Datei brauchbar ist. */
const REQUIRED_ENTITIES = [
  'IFCPROJECT',
  'IFCUNITASSIGNMENT',
  'IFCOWNERHISTORY',
  'IFCGEOMETRICREPRESENTATIONCONTEXT',
];

/**
 * Attributwerte einer Entitaetszeile auf oberster Ebene zerlegen.
 * Klammern innerhalb von Listen und Hochkommas werden dabei uebersprungen.
 */
function splitTopLevel(args: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let inString = false;
  let current = '';
  for (let i = 0; i < args.length; i++) {
    const c = args[i]!;
    if (inString) {
      current += c;
      if (c === "'") {
        // Ein verdoppeltes Hochkomma steht fuer ein Hochkomma im Text.
        if (args[i + 1] === "'") {
          current += "'";
          i++;
        } else {
          inString = false;
        }
      }
      continue;
    }
    if (c === "'") {
      inString = true;
      current += c;
      continue;
    }
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (c === ',' && depth === 0) {
      out.push(current.trim());
      current = '';
      continue;
    }
    current += c;
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

/** Entfernt alle Zeichenkettenliterale, damit Muster nicht im Text anschlagen. */
function stripStrings(line: string): string {
  return line.replace(/'(?:[^']|'')*'/g, "''");
}

export function validateIfc(content: string): IfcValidationReport {
  const issues: IfcValidationIssue[] = [];
  const lines = content.split('\n');

  /* --- Rahmen --- */
  if (!lines[0]?.startsWith('ISO-10303-21;')) {
    issues.push({ severity: 'fehler', message: 'Datei beginnt nicht mit ISO-10303-21;', line: 1 });
  }
  if (!content.includes("FILE_SCHEMA(('IFC4'))")) {
    issues.push({ severity: 'fehler', message: 'FILE_SCHEMA nennt nicht IFC4' });
  }
  if (!content.trimEnd().endsWith('END-ISO-10303-21;')) {
    issues.push({ severity: 'fehler', message: 'Datei endet nicht mit END-ISO-10303-21;' });
  }
  for (const marker of ['HEADER;', 'DATA;', 'ENDSEC;']) {
    if (!content.includes(marker)) {
      issues.push({ severity: 'fehler', message: `Abschnitt ${marker} fehlt` });
    }
  }

  /* --- Entitaeten einlesen --- */
  const defined = new Set<number>();
  const referenced = new Map<number, number>(); // id -> erste Zeilennummer
  const entityTypes: Record<string, number> = {};
  const guids: string[] = [];
  const guidLines = new Map<string, number>();
  let entityCount = 0;
  let previousId = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const match = line.match(/^#(\d+)=([A-Z0-9_]+)\((.*)\);$/);
    if (!match) continue;

    const id = Number(match[1]);
    const type = match[2]!;
    const args = match[3]!;
    entityCount++;

    if (defined.has(id)) {
      issues.push({ severity: 'fehler', message: `Zeilennummer #${id} zweimal vergeben`, line: i + 1 });
    }
    defined.add(id);

    if (id !== previousId + 1) {
      issues.push({
        severity: 'hinweis',
        message: `Zeilennummern nicht lückenlos: nach #${previousId} folgt #${id}`,
        line: i + 1,
      });
    }
    previousId = id;

    entityTypes[type] = (entityTypes[type] ?? 0) + 1;

    // Verweise einsammeln — Zeichenketten vorher entfernen, damit ein `#`
    // in einem Text nicht als Verweis gelesen wird.
    const bare = stripStrings(args);
    for (const refMatch of bare.matchAll(/#(\d+)/g)) {
      const target = Number(refMatch[1]);
      if (!referenced.has(target)) referenced.set(target, i + 1);
    }

    // Kennung: erstes Attribut der IfcRoot-Nachfahren.
    if (/^IFC(PROJECT|SITE|BUILDING|BUILDINGSTOREY|REL|PIPE|VALVE|DISCRETE|DISTRIBUTION|PROPERTYSET|ELEMENTQUANTITY)/.test(type)) {
      const first = splitTopLevel(args)[0];
      if (first?.startsWith("'") && first.endsWith("'")) {
        const guid = first.slice(1, -1);
        if (!GUID_PATTERN.test(guid)) {
          issues.push({
            severity: 'fehler',
            message: `${type}: Kennung „${guid}“ ist keine gültige IFC-GUID (22 Zeichen aus 0-9A-Za-z_$)`,
            line: i + 1,
          });
        } else if (guidLines.has(guid)) {
          issues.push({
            severity: 'fehler',
            message: `Kennung ${guid} zweimal vergeben (auch in Zeile ${guidLines.get(guid)})`,
            line: i + 1,
          });
        } else {
          guidLines.set(guid, i + 1);
          guids.push(guid);
        }
      }
    }
  }

  /* --- Verweise ins Leere --- */
  for (const [id, line] of referenced) {
    if (!defined.has(id)) {
      issues.push({ severity: 'fehler', message: `Verweis auf #${id}, das nirgends definiert ist`, line });
    }
  }

  /* --- Pflichtbestandteile --- */
  for (const required of REQUIRED_ENTITIES) {
    if (!entityTypes[required]) {
      issues.push({ severity: 'fehler', message: `${required} fehlt` });
    }
  }
  if ((entityTypes['IFCPROJECT'] ?? 0) > 1) {
    issues.push({ severity: 'fehler', message: 'Mehr als ein IFCPROJECT in der Datei' });
  }

  /* --- Laengeneinheit --- */
  let lengthUnit: string | null = null;
  // Das Praefix steht als `.MILLI.` oder, wenn es keines gibt, als `$`.
  // Beide Schreibweisen muessen erkannt werden — sonst laeuft ausgerechnet
  // der Fall „Meter statt Millimeter" durch die Pruefung hindurch.
  const unitMatch = content.match(
    /IFCSIUNIT\(\$,\.LENGTHUNIT\.,(?:\.([A-Z]+)\.|\$),\.([A-Z_]+)\.\)/,
  );
  if (unitMatch) {
    const prefix = unitMatch[1] ?? '';
    lengthUnit = prefix ? `${prefix} ${unitMatch[2]}` : unitMatch[2]!;
    if (prefix !== 'MILLI') {
      issues.push({
        severity: 'fehler',
        message: `Längeneinheit ist ${lengthUnit}, erwartet MILLI METRE — der Katalog führt Millimeter`,
      });
    }
  } else {
    issues.push({ severity: 'fehler', message: 'Keine Längeneinheit erklärt' });
  }

  /* --- REAL-Schreibweise --- */
  // Koordinaten und Radien muessen einen Dezimalpunkt tragen. Geprueft wird
  // an den Stellen, wo das Schema REAL zwingend verlangt.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const point = line.match(/^#\d+=IFCCARTESIANPOINT\(\((.*)\)\);$/);
    if (point) {
      for (const value of point[1]!.split(',')) {
        if (value.trim() && !value.includes('.')) {
          issues.push({
            severity: 'fehler',
            message: `IFCCARTESIANPOINT mit Ganzzahl „${value.trim()}“ — REAL verlangt einen Dezimalpunkt`,
            line: i + 1,
          });
        }
      }
    }
    const disk = line.match(/^#\d+=IFCSWEPTDISKSOLID\(#\d+,([^,]+),([^,]+),/);
    if (disk) {
      for (const value of [disk[1]!, disk[2]!]) {
        if (value !== '$' && !value.includes('.')) {
          issues.push({
            severity: 'fehler',
            message: `IFCSWEPTDISKSOLID mit Ganzzahl „${value}“ als Radius`,
            line: i + 1,
          });
        }
      }
    }
  }

  return {
    ok: issues.every((i) => i.severity !== 'fehler'),
    entityCount,
    issues,
    lengthUnit,
    guids,
    entityTypes,
  };
}
