/* Ein ZIP-Archiv aus mehreren Dateien.
 *
 * Gebraucht fuer das BIM-Paket: ein Produkt mit vierzehn Nennweiten sind
 * vierzehn IFC-Dateien plus Datenblatt und Typenkatalog, und die will niemand
 * einzeln herunterladen. Die Seite verspricht dieses Paket seit jeher
 * („Laden Sie das K Aqua BIM-Paket herunter"), ohne dass es eines gab.
 *
 * Keine Fremdbibliothek: das ZIP-Format ist an dieser Stelle ueberschaubar,
 * und die Verdichtung uebernimmt `node:zlib`, das ohnehin zur Laufzeit da ist.
 * Geschrieben wird die einfachste Form, die jedes Entpackprogramm liest —
 * lokale Dateikoepfe, danach das zentrale Verzeichnis. Ohne ZIP64: die
 * Grenzen dort (65 535 Dateien, 4 GB) liegen weit ausserhalb dessen, was ein
 * Produktkatalog erreicht, und werden vor dem Schreiben geprueft. */

import { deflateRawSync, crc32 } from 'node:zlib';

export interface ZipEntry {
  /** Pfad im Archiv, mit Schraegstrich als Trenner. */
  name: string;
  content: string | Buffer;
}

/** Grenzen des ZIP-Formats ohne die ZIP64-Erweiterung. */
const MAX_ENTRIES = 0xffff;
const MAX_SIZE = 0xffffffff;

/**
 * Rechnet ein Datum in die MS-DOS-Schreibweise um, die ZIP verlangt.
 *
 * Das Format stammt von 1980 und kennt Sekunden nur in Zweierschritten; das
 * Jahr zaehlt ab 1980. Vor 1980 gibt es keine darstellbare Zeit — dann wird
 * auf den 1. Januar 1980 gesetzt, statt eine unsinnige Zahl zu schreiben.
 */
function dosDateTime(date: Date): { time: number; date: number } {
  const year = date.getFullYear();
  if (year < 1980) return { time: 0, date: (1 << 5) | 1 };
  return {
    time:
      (date.getHours() << 11) |
      (date.getMinutes() << 5) |
      (Math.floor(date.getSeconds() / 2) & 0x1f),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
  };
}

interface PreparedEntry {
  nameBytes: Buffer;
  data: Buffer;
  crc: number;
  compressedSize: number;
  uncompressedSize: number;
  offset: number;
  /** 8 = deflate, 0 = unveraendert abgelegt. */
  method: number;
}

/**
 * Packt die Dateien in ein ZIP-Archiv.
 *
 * @param entries  die Dateien; Namen muessen im Archiv eindeutig sein
 * @param modified Aenderungszeit aller Eintraege
 */
export function createZip(entries: ZipEntry[], modified: Date): Buffer {
  if (entries.length > MAX_ENTRIES) {
    throw new Error(
      `ZIP: ${entries.length} Dateien überschreiten die Grenze von ${MAX_ENTRIES}`,
    );
  }

  const seen = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.name)) {
      throw new Error(`ZIP: Dateiname „${entry.name}" kommt zweimal vor`);
    }
    seen.add(entry.name);
  }

  const { time, date } = dosDateTime(modified);
  const prepared: PreparedEntry[] = [];
  const chunks: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const raw = Buffer.isBuffer(entry.content)
      ? entry.content
      : Buffer.from(entry.content, 'utf8');
    const deflated = deflateRawSync(raw, { level: 9 });

    // Bei sehr kleinen oder bereits dichten Dateien kann das Ergebnis groesser
    // sein als das Original. Dann wird unveraendert abgelegt.
    const useDeflate = deflated.length < raw.length;
    const data = useDeflate ? deflated : raw;
    const method = useDeflate ? 8 : 0;

    if (raw.length > MAX_SIZE || data.length > MAX_SIZE) {
      throw new Error(`ZIP: „${entry.name}" ist zu groß für ein Archiv ohne ZIP64`);
    }

    const nameBytes = Buffer.from(entry.name, 'utf8');
    const crc = crc32(raw);

    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0); // Signatur lokaler Dateikopf
    header.writeUInt16LE(20, 4); // benoetigte Version 2.0
    header.writeUInt16LE(0x0800, 6); // Bit 11: Dateiname in UTF-8
    header.writeUInt16LE(method, 8);
    header.writeUInt16LE(time, 10);
    header.writeUInt16LE(date, 12);
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(data.length, 18);
    header.writeUInt32LE(raw.length, 22);
    header.writeUInt16LE(nameBytes.length, 26);
    header.writeUInt16LE(0, 28); // kein Zusatzfeld

    chunks.push(header, nameBytes, data);
    prepared.push({
      nameBytes,
      data,
      crc,
      compressedSize: data.length,
      uncompressedSize: raw.length,
      offset,
      method,
    });
    offset += header.length + nameBytes.length + data.length;
  }

  /* Zentrales Verzeichnis */
  const directoryStart = offset;
  for (const entry of prepared) {
    const record = Buffer.alloc(46);
    record.writeUInt32LE(0x02014b50, 0); // Signatur Verzeichniseintrag
    record.writeUInt16LE(0x031e, 4); // erzeugt unter Unix, Version 3.0
    record.writeUInt16LE(20, 6);
    record.writeUInt16LE(0x0800, 8);
    record.writeUInt16LE(entry.method, 10);
    record.writeUInt16LE(time, 12);
    record.writeUInt16LE(date, 14);
    record.writeUInt32LE(entry.crc, 16);
    record.writeUInt32LE(entry.compressedSize, 20);
    record.writeUInt32LE(entry.uncompressedSize, 24);
    record.writeUInt16LE(entry.nameBytes.length, 28);
    record.writeUInt16LE(0, 30); // Zusatzfeld
    record.writeUInt16LE(0, 32); // Kommentar
    record.writeUInt16LE(0, 34); // Datentraeger
    record.writeUInt16LE(0, 36); // interne Attribute
    record.writeUInt32LE(0o644 << 16, 38); // externe Attribute: Dateirechte
    record.writeUInt32LE(entry.offset, 42);
    chunks.push(record, entry.nameBytes);
    offset += record.length + entry.nameBytes.length;
  }
  const directorySize = offset - directoryStart;

  /* Abschluss */
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4); // Datentraegernummer
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(prepared.length, 8);
  end.writeUInt16LE(prepared.length, 10);
  end.writeUInt32LE(directorySize, 12);
  end.writeUInt32LE(directoryStart, 16);
  end.writeUInt16LE(0, 20); // kein Archivkommentar
  chunks.push(end);

  return Buffer.concat(chunks);
}
