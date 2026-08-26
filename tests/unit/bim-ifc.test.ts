/* Pruefung der IFC-Ausgabe.
 *
 * Geprueft wird an echten Artikeln quer durch den Katalog, nicht an
 * Beispieldaten: ein Rohr (analytischer Rohrkörper), eine Muffe
 * (Rotationskörper aus gemessener Kontur), ein Winkel und ein Kugelhahn
 * (tesselliert), dazu ein Artikel ohne Modell.
 *
 * Der strukturelle Pruefer in lib/bim/ifc/validate.ts faengt Verweise ins
 * Leere, doppelte Kennungen, falsche Zahlenschreibweise und eine falsche
 * Laengeneinheit ab. Er ersetzt KEINEN unabhaengigen Schemaprueflauf; der
 * gehoert vor die Veroeffentlichung.
 */

import { describe, it, expect } from 'vitest';
import { buildIfcForArticle } from '@/lib/bim/export';
import { validateIfc } from '@/lib/bim/ifc/validate';
import { ifcGuid, formatReal, escapeString } from '@/lib/bim/ifc/spf';
import { ifcTypeFor, expectedPortCount } from '@/lib/bim/ifc/writer';
import { getBimRecord } from '@/lib/bim/product';

/** Fester Zeitstempel — sonst waere die Ausgabe nicht wiederholbar. */
const STAMP = new Date('2026-08-25T12:00:00Z');

describe('STEP-Notation', () => {
  it('schreibt jede REAL mit Dezimalpunkt', () => {
    // `63` waere ein INTEGER. Wo das Schema REAL verlangt, beanstandet das
    // jeder Prueflauf.
    expect(formatReal(63)).toBe('63.');
    expect(formatReal(0)).toBe('0.');
    expect(formatReal(2.5)).toBe('2.5');
    expect(formatReal(-13.1)).toBe('-13.1');
  });

  it('kuerzt Gleitkommarauschen, ohne Maße zu verfaelschen', () => {
    expect(formatReal(21.333333333333332)).toBe('21.333333');
    expect(formatReal(1 / 3)).toBe('0.333333');
  });

  it('macht aus minus null null', () => {
    expect(formatReal(-0)).toBe('0.');
  });

  it('weist unschreibbare Zahlen zurueck, statt sie zu verschlucken', () => {
    // Ein NaN in einer Koordinate macht die Datei unlesbar. Besser hier
    // scheitern als beim Planer.
    expect(() => formatReal(Number.NaN)).toThrow();
    expect(() => formatReal(Number.POSITIVE_INFINITY)).toThrow();
  });

  it('maskiert Hochkomma und Backslash', () => {
    expect(escapeString("1/2''")).toBe("1/2''''");
    expect(escapeString('a\\b')).toBe('a\\\\b');
  });

  it('schreibt Umlaute und Sonderzeichen in der \\X2\\-Notation', () => {
    expect(escapeString('Muffenschweißung')).toContain('\\X2\\00DF\\X0\\');
    expect(escapeString('90°')).toContain('\\X2\\00B0\\X0\\');
    expect(escapeString('—')).toBe('\\X2\\2014\\X0\\');
  });

  it('fasst aufeinanderfolgende Sonderzeichen zu einer Sequenz zusammen', () => {
    // Die Norm sieht das so vor; einzeln geklammert waere es unnoetig lang.
    expect(escapeString('äöü')).toBe('\\X2\\00E400F600FC\\X0\\');
  });

  it('laesst reinen ASCII-Text unveraendert', () => {
    expect(escapeString('AQ09063')).toBe('AQ09063');
  });
});

describe('IFC-Kennungen', () => {
  it('vergibt 22 Zeichen aus dem IFC-Alphabet', () => {
    const guid = ifcGuid('AQ09063:element');
    expect(guid).toHaveLength(22);
    expect(guid).toMatch(/^[0-9A-Za-z_$]{22}$/);
  });

  it('vergibt zu gleicher Eingabe immer dieselbe Kennung', () => {
    // Sonst waere jede Datei bei jedem Abruf eine andere: nicht
    // zwischenspeicherbar, nicht vergleichbar, im Planungswerkzeug nicht
    // wiedererkennbar.
    expect(ifcGuid('AQ09063:element')).toBe(ifcGuid('AQ09063:element'));
  });

  it('vergibt zu verschiedenen Eingaben verschiedene Kennungen', () => {
    const seen = new Set<string>();
    for (const code of ['AQ09020', 'AQ09025', 'AQ09032', 'AQ09063', 'AQ111P32']) {
      for (const role of ['element', 'project', 'site', 'port-0', 'port-1']) {
        seen.add(ifcGuid(`${code}:${role}`));
      }
    }
    expect(seen.size).toBe(25);
  });
});

describe('Typzuordnung', () => {
  it('macht aus einem Rohr ein IfcPipeSegment', () => {
    expect(ifcTypeFor(getBimRecord('AQ111P32')!)).toEqual({
      entity: 'IFCPIPESEGMENT',
      predefinedType: 'RIGIDSEGMENT',
    });
  });

  it('unterscheidet Winkel, T-Stueck und Uebergang innerhalb derselben Kategorie', () => {
    // Alle drei liegen in `fittings`. Wer nur nach Kategorie zuordnet, meldet
    // allen denselben Typ und macht die Auswertung im Modell wertlos.
    expect(ifcTypeFor(getBimRecord('AQ09063')!).predefinedType).toBe('BEND');
    expect(ifcTypeFor(getBimRecord('AQ13020')!).predefinedType).toBe('JUNCTION');
    expect(ifcTypeFor(getBimRecord('AQ2432520')!).predefinedType).toBe('TRANSITION');
  });

  it('macht aus einem Kugelhahn ein IfcValve', () => {
    const t = ifcTypeFor(getBimRecord('AQ85232')!);
    expect(t.entity).toBe('IFCVALVE');
    expect(t.predefinedType).toBe('BALLVALVE');
  });

  it('zaehlt die Anschluesse nach der Bauform', () => {
    expect(expectedPortCount(getBimRecord('AQ111P32')!)).toBe(2); // Rohr
    expect(expectedPortCount(getBimRecord('AQ09063')!)).toBe(2); // Winkel
    expect(expectedPortCount(getBimRecord('AQ13020')!)).toBe(3); // T-Stück
    expect(expectedPortCount(getBimRecord('AQ18025')!)).toBe(4); // Kreuz
    expect(expectedPortCount(getBimRecord('AQ30120')!)).toBe(1); // Kappe
  });
});

describe('Erzeugte Dateien', () => {
  const FAELLE = [
    { code: 'AQ111P32', form: 'sweptDisk', name: 'Rohr d32' },
    { code: 'AQ27032', form: 'revolved', name: 'Muffe d32' },
    { code: 'AQ09063', form: 'mesh', name: 'Winkel 90° d63' },
  ] as const;

  for (const fall of FAELLE) {
    it(`besteht die Strukturpruefung: ${fall.name}`, async () => {
      const result = await buildIfcForArticle(fall.code, { timestamp: STAMP });
      expect(result).not.toBeNull();

      const report = validateIfc(result!.content);
      const fehler = report.issues.filter((i) => i.severity === 'fehler');
      expect(fehler.map((f) => `Z${f.line ?? '?'}: ${f.message}`)).toEqual([]);
      expect(report.ok).toBe(true);
      expect(report.lengthUnit).toBe('MILLI METRE');
      expect(result!.shape.kind).toBe(fall.form);
    }, 120000);
  }

  it('schreibt die Katalogmaße unveraendert in den Rohrkoerper', async () => {
    // d32, di 26,2 laut Katalog S. 77 → Aussenradius 16, Innenradius 13,1.
    const result = await buildIfcForArticle('AQ111P32', { timestamp: STAMP });
    expect(result!.content).toContain('IFCSWEPTDISKSOLID(#32,16.,13.1,$,$)');
  }, 120000);

  it('gibt jedem Bauteil die Artikelnummer als Tag mit', async () => {
    const result = await buildIfcForArticle('AQ111P32', { timestamp: STAMP });
    expect(result!.content).toMatch(/IFCPIPESEGMENT\([^)]*,'AQ111P32',\.RIGIDSEGMENT\.\)/);
  }, 120000);

  it('haengt die Anschlusspunkte ueber IfcRelNests an das Bauteil', async () => {
    const result = await buildIfcForArticle('AQ111P32', { timestamp: STAMP });
    expect(result!.portCount).toBe(2);
    expect(result!.content).toContain('IFCDISTRIBUTIONPORT');
    expect(result!.content).toContain('IFCRELNESTS');
    expect(result!.content).toContain('.SOURCEANDSINK.');
  }, 120000);

  it('schreibt Werkstoffkennwerte und Katalogbeleg mit', async () => {
    const result = await buildIfcForArticle('AQ111P32', { timestamp: STAMP });
    const c = result!.content;
    expect(c).toContain('IFCMASSDENSITYMEASURE(905.)');
    expect(c).toContain('IFCTHERMALCONDUCTIVITYMEASURE(0.24)');
    expect(c).toContain('Pset_MaterialThermal');
    expect(c).toContain('Pset_KAqua_Article');
    expect(c).toContain('S. 77');
  }, 120000);

  it('gibt K-Fiber-Rohren ihren eigenen Ausdehnungskoeffizienten', async () => {
    // Der Unterschied zum Grundwerkstoff ist der Faktor vier. Stuende hier
    // der Wert des Monoschichtrohres, waere jeder Dehnungsschenkel falsch.
    const fiber = await buildIfcForArticle('AQ111PF32', { timestamp: STAMP });
    expect(fiber!.content).toContain('IFCTHERMALEXPANSIONCOEFFICIENTMEASURE(0.000035)');
    const mono = await buildIfcForArticle('AQ111P32', { timestamp: STAMP });
    expect(mono!.content).toContain('IFCTHERMALEXPANSIONCOEFFICIENTMEASURE(0.00015)');
  }, 120000);

  it('erzeugt zu gleicher Eingabe eine byteweise gleiche Datei', async () => {
    // Voraussetzung fuers Zwischenspeichern und fuer jeden Vergleich.
    const a = await buildIfcForArticle('AQ27032', { timestamp: STAMP });
    const b = await buildIfcForArticle('AQ27032', { timestamp: STAMP });
    expect(a!.content).toBe(b!.content);
  }, 120000);

  it('liefert zu Werkzeugen keine Modelldatei', async () => {
    const werkzeug = getBimRecord('AQ974');
    if (werkzeug) {
      expect(werkzeug.isTool).toBe(true);
      expect(await buildIfcForArticle(werkzeug.articleCode)).toBeNull();
    }
  }, 60000);

  it('liefert zu einer unbekannten Nummer nichts', async () => {
    expect(await buildIfcForArticle('AQ000000')).toBeNull();
  });

  it('liefert auf Wunsch eine Datei ohne Geometrie', async () => {
    // Fuer Massenermittlung und Ausschreibung zaehlen Merkmale, nicht Form.
    const ohne = await buildIfcForArticle('AQ09063', {
      geometry: 'ohne',
      timestamp: STAMP,
    });
    expect(ohne!.shape.kind).toBe('none');
    expect(ohne!.content).not.toContain('IFCTRIANGULATEDFACESET');
    // Die Sachdaten bleiben vollstaendig.
    expect(ohne!.content).toContain('Pset_KAqua_Article');
    expect(ohne!.content).toContain('AQ09063');
    expect(validateIfc(ohne!.content).ok).toBe(true);
    // Und sie ist um Groessenordnungen kleiner.
    const mit = await buildIfcForArticle('AQ09063', { timestamp: STAMP });
    expect(ohne!.content.length).toBeLessThan(mit!.content.length / 10);
  }, 120000);

  it('schreibt registrierte Katalogwidersprueche in die Datei', async () => {
    // Wer die Zahl im Modell gegen den Katalog haelt, soll den Grund
    // gleich mitlesen koennen.
    const result = await buildIfcForArticle('AQ207PF315', {
      geometry: 'ohne',
      timestamp: STAMP,
    });
    expect(result!.content).toContain('Kataloghinweis_1');
    expect(result!.content).toContain('229.8');
  }, 120000);
});

describe('Der Strukturpruefer selbst', () => {
  it('erkennt einen Verweis ins Leere', () => {
    const kaputt = [
      'ISO-10303-21;',
      'HEADER;',
      "FILE_SCHEMA(('IFC4'));",
      'ENDSEC;',
      'DATA;',
      '#1=IFCCARTESIANPOINT((0.,0.,0.));',
      '#2=IFCAXIS2PLACEMENT3D(#1,#99,$);',
      'ENDSEC;',
      'END-ISO-10303-21;',
    ].join('\n');
    const report = validateIfc(kaputt);
    expect(report.ok).toBe(false);
    expect(report.issues.some((i) => i.message.includes('#99'))).toBe(true);
  });

  it('erkennt eine Ganzzahl, wo REAL verlangt ist', () => {
    const kaputt = [
      'ISO-10303-21;',
      'HEADER;',
      "FILE_SCHEMA(('IFC4'));",
      'ENDSEC;',
      'DATA;',
      '#1=IFCCARTESIANPOINT((0,0,0));',
      'ENDSEC;',
      'END-ISO-10303-21;',
    ].join('\n');
    expect(validateIfc(kaputt).ok).toBe(false);
  });

  it('erkennt eine falsche Laengeneinheit', () => {
    const meter = [
      'ISO-10303-21;',
      'HEADER;',
      "FILE_SCHEMA(('IFC4'));",
      'ENDSEC;',
      'DATA;',
      '#1=IFCSIUNIT($,.LENGTHUNIT.,$,.METRE.);',
      'ENDSEC;',
      'END-ISO-10303-21;',
    ].join('\n');
    const report = validateIfc(meter);
    expect(report.ok).toBe(false);
    expect(report.issues.some((i) => i.message.includes('MILLI METRE'))).toBe(true);
  });

  it('laesst ein Doppelhochkomma im Text nicht als Verweis durchgehen', () => {
    // Gewindegroessen wie 1/2" stehen im Text. Ein `#` daneben darf nicht als
    // Zeilenverweis gelesen werden.
    const datei = [
      'ISO-10303-21;',
      'HEADER;',
      "FILE_SCHEMA(('IFC4'));",
      'ENDSEC;',
      'DATA;',
      "#1=IFCPROPERTYSINGLEVALUE('Gewinde',$,IFCLABEL('1/2'''' #999'),$);",
      'ENDSEC;',
      'END-ISO-10303-21;',
    ].join('\n');
    const report = validateIfc(datei);
    expect(report.issues.some((i) => i.message.includes('#999'))).toBe(false);
  });
});
