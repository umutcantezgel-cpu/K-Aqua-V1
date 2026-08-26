/* Absicherung der von Hand aus dem Katalog uebertragenen BIM-Systemdaten.
 *
 * Diese Tabellen sind Seite fuer Seite aus KA-Katalog_GB_06-2025_NEU.pdf
 * abgetippt, weil die Textebene des PDF die Hoch- und Tiefstellungen verliert.
 * Handarbeit heisst Tippfehlerrisiko. Die Pruefungen hier sind deshalb bewusst
 * so gebaut, dass sie einen Zahlendreher auffallen lassen, ohne den Katalog
 * ein zweites Mal abzuschreiben:
 *
 *   - Formenpruefung  (Spaltenzahl stimmt zur Kopfzeile)
 *   - Monotonie       (Halterungsabstand faellt mit steigender Temperatur)
 *   - Invarianten     (Betriebskollektiv summiert sich auf 50 Jahre)
 *   - Groessenordnung (Rechenproben mit bekanntem Ergebnis)
 */

import { describe, it, expect } from 'vitest';
import {
  BIM_MATERIALS,
  MASS_DENSITY_KG_M3,
  THERMAL_CONDUCTIVITY_W_MK,
  THERMAL_EXPANSION_PER_K,
  YOUNG_MODULUS_MPA,
  resolveMaterialId,
  CREEP_STRENGTH_BAR,
  ISO_9080_70C_50A_MPA,
} from '@/lib/bim/tables/material';
import {
  APPLICATION_CLASSES,
  getApplicationClass,
  allowablePressureBar,
  BAR_TO_MPA,
} from '@/lib/bim/tables/application-classes';
import {
  SUPPORT_SPACING_TABLES,
  SUSPECT_VALUES,
  selectSupportTable,
  supportSpacingCm,
  conservativeSupportSpacingCm,
} from '@/lib/bim/tables/support-spacing';
import {
  EXPANSION_COEFFICIENT_PER_K,
  linearExpansionMm,
  bendingLimbLengthMm,
  expansionBendSpacingMm,
} from '@/lib/bim/tables/expansion';
import { STANDARDS, standardsForScope, standardCodes } from '@/lib/bim/tables/standards';

describe('Werkstoffkennwerte (Katalog S. 16 und S. 22)', () => {
  it('fuehrt beide Werkstoffe mit Seitenbeleg', () => {
    expect(BIM_MATERIALS['PP-R'].source).toContain('S. 16');
    expect(BIM_MATERIALS['PP-RCT'].source).toContain('S. 22');
  });

  it('haelt die Direktzugriffe mit der Merkmalsliste im Gleichklang', () => {
    // Der IFC-Schreiber liest die Einzelkonstanten, die Seiten die Liste.
    // Laufen sie auseinander, meldet die Website andere Werte als die Datei.
    for (const id of ['PP-R', 'PP-RCT'] as const) {
      const props = BIM_MATERIALS[id].properties;
      const find = (key: string) => props.find((p) => p.key === key)?.value;
      expect(find('density')).toBe(MASS_DENSITY_KG_M3);
      expect(find('thermal_conductivity')).toBe(THERMAL_CONDUCTIVITY_W_MK);
      expect(find('thermal_expansion')).toBe(THERMAL_EXPANSION_PER_K);
      expect(find('tensile_modulus')).toBe(YOUNG_MODULUS_MPA);
    }
  });

  it('nennt die Dichte mit 905 kg/m³, nicht mit den 900 aus der 3D-Massenprobe', () => {
    expect(MASS_DENSITY_KG_M3).toBe(905);
  });

  it('vergibt je Werkstoff eindeutige Merkmalsschluessel', () => {
    for (const id of ['PP-R', 'PP-RCT'] as const) {
      const keys = BIM_MATERIALS[id].properties.map((p) => p.key);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it('gibt jedem Merkmal eine Pruefnorm', () => {
    for (const id of ['PP-R', 'PP-RCT'] as const) {
      for (const p of BIM_MATERIALS[id].properties) {
        expect(p.testMethod.length).toBeGreaterThan(0);
      }
    }
  });

  it('bildet PP-RCT nur bei ausdruecklicher Nennung ab, sonst PP-R', () => {
    expect(resolveMaterialId('PP-RCT')).toBe('PP-RCT');
    expect(resolveMaterialId('PP-R / PP-RCT')).toBe('PP-RCT');
    expect(resolveMaterialId('PP-R')).toBe('PP-R');
    expect(resolveMaterialId(undefined)).toBe('PP-R');
  });

  it('haelt die Werkstoffaussage des Katalogs fest: PP-RCT gewinnt erst in der Waerme', () => {
    // Genau das ist der Grund fuer die Werkstoffwahl — und ein Wert, der beim
    // Abtippen leicht verdreht wird, weil er der Erwartung widerspricht.
    expect(CREEP_STRENGTH_BAR['20C_50a']['PP-R']).toBeGreaterThan(
      CREEP_STRENGTH_BAR['20C_50a']['PP-RCT'],
    );
    expect(CREEP_STRENGTH_BAR['70C_50a']['PP-RCT']).toBeGreaterThan(
      CREEP_STRENGTH_BAR['70C_50a']['PP-R'],
    );
    expect(CREEP_STRENGTH_BAR['95C_5a']['PP-RCT']).toBeGreaterThan(
      CREEP_STRENGTH_BAR['95C_5a']['PP-R'],
    );
    expect(ISO_9080_70C_50A_MPA['PP-RCT']).toBe(5.0);
    expect(ISO_9080_70C_50A_MPA['PP-R']).toBe(3.2);
  });

  it('haelt die Mindestanforderungen des Diagramms ein', () => {
    expect(CREEP_STRENGTH_BAR['20C_50a']['PP-R']).toBeGreaterThan(
      CREEP_STRENGTH_BAR['20C_50a'].minimum,
    );
    expect(CREEP_STRENGTH_BAR['70C_50a']['PP-RCT']).toBeGreaterThan(
      CREEP_STRENGTH_BAR['70C_50a'].minimum,
    );
  });
});

describe('Anwendungsklassen (Katalog S. 51)', () => {
  it('fuehrt die vier Klassen des Katalogs — 3 fuehrt er nicht', () => {
    expect(APPLICATION_CLASSES.map((c) => c.id)).toEqual([1, 2, 4, 5]);
    expect(getApplicationClass(4)).toBeDefined();
  });

  it('summiert jedes Betriebskollektiv mit T_max auf 50 Jahre', () => {
    // Der Katalog rechnet die Klasse 5 vor: 14 + 25 + 10 Jahre Kollektiv,
    // 1 Jahr bei T_max, 100 h bei T_mal — zusammen 50 Jahre. Dieselbe
    // Invariante traegt jede der vier Klassen. Sie faellt sofort auf, wenn
    // eine Jahreszahl falsch abgetippt ist.
    for (const c of APPLICATION_CLASSES) {
      const collective = c.collective.reduce((s, seg) => s + seg.years, 0);
      expect(collective + c.maxServiceLifeYears).toBeCloseTo(50, 5);
    }
  });

  it('haelt die Auslegungstemperatur als Hoechstwert des Kollektivs', () => {
    for (const c of APPLICATION_CLASSES) {
      const highest = Math.max(...c.collective.map((s) => s.temperatureC));
      expect(c.designTemperatureC).toBe(highest);
    }
  });

  it('staffelt die Temperaturen aufsteigend: T_D < T_max < T_mal', () => {
    for (const c of APPLICATION_CLASSES) {
      expect(c.designTemperatureC).toBeLessThan(c.maxTemperatureC);
      expect(c.maxTemperatureC).toBeLessThan(c.malfunctionTemperatureC);
      expect(c.malfunctionTemperatureC).toBeLessThanOrEqual(100);
    }
  });

  it('haelt die Betriebsdruecke im vom Katalog genannten Rahmen', () => {
    // „an allowable operating pressure p_D of 4 bar, 6 bar, 8 bar or 10 bar"
    const allowed = [4, 6, 8, 10];
    for (const c of APPLICATION_CLASSES) {
      expect(allowed).toContain(c.pressurePpRSdr6Bar);
      expect(allowed).toContain(c.pressurePpRctSdr74Bar);
    }
  });

  it('gibt PP-RCT nie einen niedrigeren Druck als PP-R', () => {
    for (const c of APPLICATION_CLASSES) {
      expect(c.pressurePpRctSdr74Bar).toBeGreaterThanOrEqual(c.pressurePpRSdr6Bar);
    }
  });

  it('liefert einen Druck nur fuer die beiden vom Katalog belegten Kombinationen', () => {
    expect(allowablePressureBar(2, 'PP-R', 6)).toBe(8);
    expect(allowablePressureBar(2, 'PP-RCT', 7.4)).toBe(10);
    // SDR 11 fuehrt der Katalog in dieser Tabelle nicht — dann kein Wert,
    // statt einer hochgerechneten Zahl.
    expect(allowablePressureBar(2, 'PP-R', 11)).toBeNull();
    expect(allowablePressureBar(1, 'PP-RCT', 6)).toBeNull();
  });

  it('rechnet bar in MPa wie in der Fussnote des Katalogs', () => {
    expect(10 * BAR_TO_MPA).toBeCloseTo(0.1, 10);
    expect(20 * BAR_TO_MPA).toBeCloseTo(0.2, 10);
  });
});

describe('Halterungsabstaende (Katalog S. 63 und S. 64)', () => {
  const tables = Object.values(SUPPORT_SPACING_TABLES);

  it('haelt vier Tabellen mit Seitenbeleg und Bildnummer', () => {
    expect(tables).toHaveLength(4);
    for (const t of tables) {
      expect(t.source).toMatch(/S\. 6[34]/);
      expect(t.figure).toMatch(/^Figure \d+$/);
    }
  });

  it('gibt jeder Zeile so viele Werte, wie die Kopfzeile Spalten hat', () => {
    for (const t of tables) {
      for (const row of t.rows) {
        expect(row.spacingCm).toHaveLength(t.temperaturesC.length);
      }
    }
  });

  it('sortiert Durchmesser und Temperaturen aufsteigend', () => {
    for (const t of tables) {
      const ds = t.rows.map((r) => r.d);
      expect([...ds].sort((a, b) => a - b)).toEqual(ds);
      expect([...t.temperaturesC].sort((a, b) => a - b)).toEqual(t.temperaturesC);
    }
  });

  it('laesst den Abstand mit steigender Temperatur nie wachsen — ausser beim bekannten Katalogfehler', () => {
    // Das ist die eigentliche Tippfehlerbremse. Jede der vier Tabellen faellt
    // zeilenweise monoton; die einzige Ausnahme ist in SUSPECT_VALUES
    // ausdruecklich benannt und begruendet.
    const abweichungen: string[] = [];
    for (const t of tables) {
      for (const row of t.rows) {
        for (let i = 1; i < row.spacingCm.length; i++) {
          const vorher = row.spacingCm[i - 1]!;
          const jetzt = row.spacingCm[i]!;
          if (jetzt > vorher) {
            abweichungen.push(`${t.id} d${row.d} @${t.temperaturesC[i]}°C`);
          }
        }
      }
    }
    const bekannt = SUSPECT_VALUES.map((s) => `${s.table} d${s.d} @${s.temperatureC}°C`);
    expect(abweichungen).toEqual(bekannt);
  });

  it('laesst den Abstand mit wachsendem Durchmesser nie kleiner werden', () => {
    for (const t of tables) {
      for (let col = 0; col < t.temperaturesC.length; col++) {
        for (let i = 1; i < t.rows.length; i++) {
          expect(t.rows[i]!.spacingCm[col]!).toBeGreaterThanOrEqual(
            t.rows[i - 1]!.spacingCm[col]!,
          );
        }
      }
    }
  });

  it('gibt K-Fiber-Rohren durchweg weitere Abstaende als Monoschichtrohren', () => {
    // Die Faserlage versteift das Rohr — bei gleicher Druckstufe und
    // Temperatur muss der Faserverbund weiter gestuetzt werden duerfen.
    const mono = SUPPORT_SPACING_TABLES['k-pipe-2.0'];
    const fiber = SUPPORT_SPACING_TABLES['k-fiber-2.0'];
    for (const row of mono.rows) {
      const gegen = fiber.rows.find((r) => r.d === row.d);
      if (!gegen) continue; // d16 fuehrt nur die Monoschichttabelle
      for (let i = 0; i < mono.temperaturesC.length; i++) {
        expect(gegen.spacingCm[i]!).toBeGreaterThanOrEqual(row.spacingCm[i]!);
      }
    }
  });

  it('waehlt die Tabelle nach Bauart und Druckstufe', () => {
    expect(selectSupportTable(false, 2.0).id).toBe('k-pipe-2.0');
    expect(selectSupportTable(false, 1.0).id).toBe('k-pipe-1.0');
    expect(selectSupportTable(true, 2.0).id).toBe('k-fiber-2.0');
    expect(selectSupportTable(true, 1.6).id).toBe('k-fiber-1.6');
  });

  it('gibt den gedruckten Wert zurueck und interpoliert nicht', () => {
    const t = SUPPORT_SPACING_TABLES['k-pipe-2.0'];
    expect(supportSpacingCm(t, 32, 20)).toBe(90);
    expect(supportSpacingCm(t, 32, 80)).toBe(70);
    // d35 gibt es nicht, 25 °C ist keine Spalte — beides ohne Wert.
    expect(supportSpacingCm(t, 35, 20)).toBeNull();
    expect(supportSpacingCm(t, 32, 25)).toBeNull();
  });

  it('ersetzt den beanstandeten Wert erst im belastbaren Zugang', () => {
    const t = SUPPORT_SPACING_TABLES['k-pipe-1.0'];
    // So steht es im Katalog …
    expect(supportSpacingCm(t, 200, 50)).toBe(245);
    // … und so darf geplant werden.
    expect(conservativeSupportSpacingCm(t, 200, 50)).toBe(225);
    // Unbeanstandete Werte bleiben in beiden Zugaengen gleich.
    expect(conservativeSupportSpacingCm(t, 200, 60)).toBe(205);
  });

  it('haelt jeden Ersatzwert unterhalb des gedruckten', () => {
    for (const s of SUSPECT_VALUES) {
      expect(s.conservative).toBeLessThan(s.printed);
    }
  });
});

describe('Waermeausdehnung (Katalog S. 65 bis S. 67)', () => {
  it('unterscheidet Monoschicht von K-Fiber', () => {
    expect(EXPANSION_COEFFICIENT_PER_K.monolayer).toBe(1.5e-4);
    expect(EXPANSION_COEFFICIENT_PER_K.fiber).toBe(0.35e-4);
    expect(EXPANSION_COEFFICIENT_PER_K.fiber).toBeLessThan(
      EXPANSION_COEFFICIENT_PER_K.monolayer,
    );
  });

  it('rechnet die Laengenaenderung in Millimetern, nicht in Metern', () => {
    // Der Katalog gibt die Einheiten auf S. 67 ungenau an; setzte man L in
    // Metern ein, kaeme ein Tausendstel heraus. 10 m bei 50 K sind 75 mm.
    expect(linearExpansionMm(10, 50, false)).toBeCloseTo(75, 6);
    expect(linearExpansionMm(10, 50, true)).toBeCloseTo(17.5, 6);
  });

  it('laesst K-Fiber-Rohre gut viermal weniger arbeiten', () => {
    const mono = linearExpansionMm(20, 40, false);
    const fiber = linearExpansionMm(20, 40, true);
    expect(mono / fiber).toBeCloseTo(1.5 / 0.35, 6);
  });

  it('bleibt bei Nulllaenge und Nulltemperatur bei null', () => {
    expect(linearExpansionMm(0, 50, false)).toBe(0);
    expect(linearExpansionMm(10, 0, false)).toBe(0);
  });

  it('berechnet den Dehnungsschenkel nach L_s = C · √(d · ΔL)', () => {
    // d32 bei ΔL = 75 mm ergibt rund 980 mm; das deckt sich mit Figure 14.
    expect(bendingLimbLengthMm(32, 75)).toBeCloseTo(980, 0);
    // Verdoppelt sich ΔL, waechst der Schenkel um den Faktor √2.
    expect(bendingLimbLengthMm(32, 150) / bendingLimbLengthMm(32, 75)).toBeCloseTo(
      Math.SQRT2,
      6,
    );
  });

  it('haelt den Schenkelabstand bei mindestens dem Zehnfachen des Durchmessers', () => {
    expect(expansionBendSpacingMm(32)).toBe(320);
    expect(expansionBendSpacingMm(110)).toBe(1100);
  });
});

describe('Normen (Katalog S. 34)', () => {
  it('fuehrt die Normen des Katalogs mit eindeutigen Bezeichnungen', () => {
    const codes = standardCodes();
    expect(new Set(codes).size).toBe(codes.length);
    expect(codes).toContain('ISO 15874');
    expect(codes).toContain('DVS 2207-11');
    expect(codes).toContain('DVGW W 270');
  });

  it('gliedert ISO 15874 in die fuenf gedruckten Teile', () => {
    const iso = STANDARDS.find((s) => s.code === 'ISO 15874');
    expect(iso?.parts?.map((p) => p.part)).toEqual([
      'Teil 1',
      'Teil 2',
      'Teil 3',
      'Teil 5',
      'Teil 7',
    ]);
  });

  it('gibt jeder Norm einen deutschen und einen englischen Titel', () => {
    for (const s of STANDARDS) {
      expect(s.titleDe.length).toBeGreaterThan(0);
      expect(s.titleEn.length).toBeGreaterThan(0);
    }
  });

  it('nimmt die Systemnormen in jede Auswahl auf', () => {
    const fuerRohre = standardsForScope('pipes');
    expect(standardCodes(fuerRohre)).toContain('ISO 15874');
    expect(standardCodes(fuerRohre)).toContain('DIN 8077');
    // Gewindenormen gehoeren nicht zu einem Rohr.
    expect(standardCodes(fuerRohre)).not.toContain('EN ISO 228');
  });
});
