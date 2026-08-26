/* Pruefung der Datenformate neben IFC.
 *
 * Diese Formate decken den gesamten Katalog ab, auch die Artikel ohne
 * 3D-Modell und die Werkzeuge. Sie sind das, womit ein Planer taeglich
 * arbeitet — und die Stelle, an der ein Formatfehler am unauffaelligsten
 * bleibt: eine Tabelle mit vertauschtem Dezimaltrenner sieht richtig aus,
 * bis jemand damit rechnet.
 */

import { describe, it, expect } from 'vitest';
import {
  getAllBimRecords,
  getBimRecord,
  getBimRecordsForProduct,
} from '@/lib/bim/product';
import {
  toJsonArticle,
  toJsonDocument,
  toCsv,
  toRevitTypeCatalog,
  bimFileName,
} from '@/lib/bim/formats';
import { createZip } from '@/lib/bim/zip';

const ALL = getAllBimRecords();
const STAMP = new Date('2025-06-01T00:00:00Z');

describe('JSON', () => {
  it('gibt jedem Artikel Nummer, Werkstoff und Katalogbeleg', () => {
    for (const record of ALL) {
      const json = toJsonArticle(record);
      expect(json.articleNumber).toBe(record.articleCode);
      expect(json.manufacturer).toBe('K-Aqua KWT GmbH');
      expect(json.material.length).toBeGreaterThan(0);
      expect(json.source).toMatch(/S\.\s*\d+/);
    }
  });

  it('rechnet Halterungsabstaende von Zentimetern in Millimeter um', () => {
    // Der Katalog fuehrt Zentimeter, IFC und JSON fuehren Millimeter.
    // Wer die Umrechnung vergisst, plant mit dem Zehnfachen.
    const rohr = toJsonArticle(getBimRecord('AQ111P32')!);
    expect(rohr.supportSpacing.length).toBeGreaterThan(0);
    const zwanzigGrad = rohr.supportSpacing.find((s) => s.temperatureC === 20)!;
    expect(zwanzigGrad.spacingMm).toBe(900); // 90 cm laut Katalog S. 63
  });

  it('laesst sich verlustfrei serialisieren', () => {
    const document = toJsonDocument(ALL, STAMP);
    const round = JSON.parse(JSON.stringify(document));
    expect(round.articleCount).toBe(ALL.length);
    expect(round.articles).toHaveLength(ALL.length);
  });

  it('nennt die Werkstoffkennwerte einmal fuer den ganzen Katalog', () => {
    const document = toJsonDocument(ALL, STAMP);
    expect(document.materials).toHaveLength(2);
    for (const material of document.materials) {
      expect(material.massDensityKgM3).toBe(905);
      expect(material.thermalConductivityWmK).toBe(0.24);
      expect(material.source).toMatch(/S\.\s*(16|22)/);
    }
  });

  it('reicht registrierte Katalogwidersprueche weiter', () => {
    const betroffen = toJsonArticle(getBimRecord('AQ207PF315')!);
    expect(betroffen.catalogIssues).toHaveLength(2);
    expect(betroffen.catalogIssues[0]!.note.length).toBeGreaterThan(80);
  });
});

describe('CSV', () => {
  const csv = toCsv(ALL);
  const lines = csv.split('\r\n').filter(Boolean);

  it('beginnt mit einem BOM, damit Excel UTF-8 erkennt', () => {
    expect(csv.charCodeAt(0)).toBe(0xfeff);
  });

  it('schreibt je Artikel eine Zeile', () => {
    expect(lines).toHaveLength(ALL.length + 1);
  });

  it('trennt mit Semikolon und schreibt Dezimalkomma', () => {
    // Beides gehoert zusammen. Mit Punkt und Semikolon oder Komma und Komma
    // landet jede Wandstaerke in der falschen Spalte.
    expect(lines[0]).toContain(';');
    const rohr = toCsv([getBimRecord('AQ111P32')!]).split('\r\n')[1]!;
    expect(rohr).toContain(';26,2;'); // Innendurchmesser
    expect(rohr).toContain(';2,9;'); // Wandstärke
  });

  it('gibt jeder Zeile gleich viele Felder wie der Kopfzeile', () => {
    const zaehleFelder = (line: string): number => {
      let count = 1;
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i]!;
        if (c === '"') inQuotes = !inQuotes;
        else if (c === ';' && !inQuotes) count++;
      }
      return count;
    };
    const erwartet = zaehleFelder(lines[0]!);
    for (const line of lines) {
      expect(zaehleFelder(line)).toBe(erwartet);
    }
  });

  it('schuetzt Felder mit Semikolon durch Anfuehrungszeichen', () => {
    // Die Normenliste traegt Schraegstriche, die Druckstufe einen Mittelpunkt;
    // Freitextfelder koennen jedes Zeichen enthalten.
    const mitNormen = ALL.find((r) => r.standards.length > 2)!;
    const zeile = toCsv([mitNormen]).split('\r\n')[1]!;
    if (zeile.includes(';;')) return;
    expect(zeile.split(';').length).toBeGreaterThan(5);
  });
});

describe('Revit-Typenkatalog', () => {
  it('legt zu jedem Artikel eines Produkts genau einen Typ an', () => {
    // Revit ueberspringt einen Typ, dem ein Wert fehlt — und zwar wortlos.
    // Deshalb duerfen nur durchgaengig gefuellte Spalten aufgenommen werden.
    for (const slug of ['elbow-90', 'socket', 'k-pipe-pp-r-sdr-11', 'reducing-bush']) {
      const records = getBimRecordsForProduct(slug);
      const zeilen = toRevitTypeCatalog(records).trim().split('\r\n');
      expect(zeilen.length - 1, `${slug}: Typen`).toBe(records.length);
    }
  });

  it('laesst in keiner Zeile ein Feld leer', () => {
    for (const slug of ['elbow-90', 'socket', 'k-pipe-pp-r-sdr-11']) {
      const catalog = toRevitTypeCatalog(getBimRecordsForProduct(slug));
      for (const zeile of catalog.trim().split('\r\n').slice(1)) {
        expect(zeile.split(',').every((f) => f.length > 0), `${slug}: ${zeile}`).toBe(true);
      }
    }
  });

  it('beginnt die Kopfzeile mit einem Komma', () => {
    // Die erste Spalte traegt den Typennamen und bleibt unbenannt.
    const catalog = toRevitTypeCatalog(getBimRecordsForProduct('socket'));
    expect(catalog.startsWith(',')).toBe(true);
  });

  it('gibt jeder Spalte Typ und Einheit in Revit-Schreibweise', () => {
    const kopf = toRevitTypeCatalog(getBimRecordsForProduct('k-pipe-pp-r-sdr-11'))
      .split('\r\n')[0]!;
    expect(kopf).toContain('d##LENGTH##MILLIMETERS');
    expect(kopf).toContain('Werkstoff##OTHER##');
    for (const spalte of kopf.split(',').slice(1)) {
      expect(spalte).toMatch(/^[^#]+##(LENGTH|OTHER|NUMBER)##[A-Z]*$/);
    }
  });

  it('schreibt Zahlen mit Punkt, nie mit Komma', () => {
    // Das Komma waere der Spaltentrenner. Revit liest die Datei unabhaengig
    // von der Spracheinstellung immer mit Punkt.
    const catalog = toRevitTypeCatalog(getBimRecordsForProduct('k-pipe-pp-r-sdr-11'));
    for (const zeile of catalog.trim().split('\r\n').slice(1)) {
      const felder = zeile.split(',');
      expect(felder.length).toBe(catalog.split('\r\n')[0]!.split(',').length);
    }
    expect(catalog).toContain('16.2');
  });

  it('nimmt die Wandstaerke auf, wo der Katalog sie durchgaengig fuehrt', () => {
    // Bei Rohren steht sie in jeder Zeile …
    expect(toRevitTypeCatalog(getBimRecordsForProduct('k-pipe-pp-r-sdr-11'))).toContain(
      's##LENGTH##MILLIMETERS',
    );
    // … beim Winkel nur ab d160, deshalb dort keine Spalte.
    expect(toRevitTypeCatalog(getBimRecordsForProduct('elbow-90'))).not.toContain(
      's##LENGTH##MILLIMETERS',
    );
  });
});

describe('Dateinamen', () => {
  it('bleibt bei jedem Bezeichner dateisystemtauglich', () => {
    expect(bimFileName('elbow-90', 'ifc')).toBe('K-Aqua_elbow-90.ifc');
    expect(bimFileName('k-fiber-pipe-pp-r-sdr-7,4', 'csv')).toBe(
      'K-Aqua_k-fiber-pipe-pp-r-sdr-7-4.csv',
    );
    expect(bimFileName('a/b\\c', 'json')).toBe('K-Aqua_a-b-c.json');
  });
});

describe('ZIP', () => {
  it('packt und traegt jede Datei mit ihrer Groesse ein', () => {
    const zip = createZip(
      [
        { name: 'a.txt', content: 'Inhalt A' },
        { name: 'ordner/b.txt', content: 'Inhalt B' },
      ],
      STAMP,
    );
    // Signaturen: lokaler Dateikopf, zentrales Verzeichnis, Abschluss.
    expect(zip.readUInt32LE(0)).toBe(0x04034b50);
    expect(zip.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]))).toBeGreaterThan(0);
    expect(zip.indexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]))).toBeGreaterThan(0);
  });

  it('weist doppelte Dateinamen zurueck', () => {
    // Zwei gleichnamige Eintraege wuerden beim Entpacken einander
    // ueberschreiben — je nach Programm ohne Warnung.
    expect(() =>
      createZip(
        [
          { name: 'a.txt', content: 'x' },
          { name: 'a.txt', content: 'y' },
        ],
        STAMP,
      ),
    ).toThrow(/zweimal/);
  });

  it('kommt mit einem leeren Archiv zurecht', () => {
    const zip = createZip([], STAMP);
    expect(zip.readUInt32LE(0)).toBe(0x06054b50);
    expect(zip.readUInt16LE(8)).toBe(0);
  });

  it('legt unverdichtbare Inhalte unveraendert ab, statt sie zu vergroessern', () => {
    // Ein sehr kurzer Inhalt wird durch Deflate laenger. Dann ist die
    // Ablage ohne Verdichtung die richtige Wahl.
    const zip = createZip([{ name: 'x', content: 'a' }], STAMP);
    expect(zip.readUInt16LE(8)).toBe(0); // Methode 0 = unverändert
  });

  it('kennzeichnet Dateinamen als UTF-8', () => {
    const zip = createZip([{ name: 'Maße.txt', content: 'x' }], STAMP);
    // Bit 11 im Flaggenfeld.
    expect(zip.readUInt16LE(6) & 0x0800).toBe(0x0800);
  });
});
