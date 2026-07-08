export type CatalogCategoryId =
  | 'pipes' | 'fittings' | 'transitionFittings' | 'valves'
  | 'weldInSaddles' | 'accessories' | 'tools';

export interface CatalogItem {
  slug: string;
  title: string;
  codes: string;
  material?: string;
  sdr?: number | string;
  series?: string;
  pressure?: string;
  len?: string;
  head: string[];
  rows: (string | number)[][];
  note?: string;
}

export type CatalogLocale = 'de' | 'en' | 'ar';

export interface CatalogCategory {
  id: CatalogCategoryId;
  count: number;
  items: CatalogItem[];
}

export function getCatalogTotalArticleCount(): number {
  return CATALOG.reduce((sum, cat) => sum + cat.items.length, 0);
}

export const CATALOG_COL_LABELS: Record<CatalogLocale, Record<string, string>> = {
  "de": {
    "weight": "Gewicht (kg)",
    "weightM": "Gewicht (kg/m)",
    "pack": "VPE",
    "thread": "Gewinde",
    "mainPipe": "Hauptrohr (mm)",
    "branch": "Abzweig d (mm)",
    "dim": "Maß",
    "range": "Bereich (mm)",
    "app": "Anwendung",
    "minL": "Min L (mm)",
    "maxL": "Max L (mm)"
  },
  "en": {
    "weight": "Weight (kg)",
    "weightM": "Weight (kg/m)",
    "pack": "Pack",
    "thread": "Thread",
    "mainPipe": "Main pipe (mm)",
    "branch": "Branch d (mm)",
    "dim": "Dimension",
    "range": "Range (mm)",
    "app": "Application",
    "minL": "Min L (mm)",
    "maxL": "Max L (mm)"
  },
  "ar": {
    "weight": "الوزن (كغ)",
    "weightM": "الوزن (كغ/م)",
    "pack": "التعبئة",
    "thread": "مسنن",
    "mainPipe": "الأنبوب الرئيسي (مم)",
    "branch": "فرع d (مم)",
    "dim": "المقاس",
    "range": "المدى (مم)",
    "app": "التطبيق",
    "minL": "أدنى L (مم)",
    "maxL": "أقصى L (مم)"
  }
};

export function resolveCatalogHead(head: string[], locale: 'de' | 'en' | 'ar'): string[] {
  const L = CATALOG_COL_LABELS[locale] || CATALOG_COL_LABELS.en;
  return head.map((h) => (h[0] === '#' ? (L[h.slice(1)] || h) : h));
}

export const CATALOG: CatalogCategory[] = [
  {
    id: "pipes",
    count: 12,
    items: [
      {
        slug: "k-pipe-pp-r-sdr-6",
        title: "K-Pipe PP-R SDR 6",
        codes: "AQ200P20–AQ200P50",
        material: "PP-R",
        sdr: 6,
        series: "S 2.5",
        pressure: "20°C / 2.0 MPa · 70°C / 1.0 MPa",
        len: "4 m",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            20,
            3.4,
            152,
            0.18,
            100
          ],
          [
            25,
            4.2,
            166,
            0.28,
            100
          ],
          [
            32,
            5.4,
            212,
            0.46,
            60
          ],
          [
            40,
            6.7,
            266,
            0.68,
            40
          ],
          [
            50,
            8.3,
            332,
            1.09,
            20
          ]
        ]
      },
      {
        slug: "k-pipe-pp-rct-sdr-74",
        title: "K-Pipe PP-RCT SDR 7.4",
        codes: "AQ20020–AQ20050",
        material: "PP-RCT",
        sdr: 7.4,
        series: "S 3.2",
        pressure: "20°C / 2.0 MPa · 70°C / 1.0 MPa",
        len: "4 m",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            20,
            2.8,
            144,
            0.16,
            100
          ],
          [
            25,
            3.5,
            180,
            0.23,
            100
          ],
          [
            32,
            4.4,
            232,
            0.37,
            60
          ],
          [
            40,
            5.5,
            290,
            0.57,
            40
          ],
          [
            50,
            6.9,
            362,
            0.88,
            20
          ]
        ]
      },
      {
        slug: "k-pipe-pp-r-sdr-11",
        title: "K-Pipe PP-R SDR 11",
        codes: "AQ11P20–AQ11P50",
        material: "PP-R",
        sdr: 11,
        series: "S 5",
        pressure: "20°C / 1.2 MPa · 60°C / 0.6 MPa",
        len: "4 m",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "kg/m",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            2,
            162,
            0.11,
            0.21,
            100
          ],
          [
            25,
            2.5,
            204,
            0.16,
            0.33,
            100
          ],
          [
            32,
            3.2,
            262,
            0.26,
            0.56,
            60
          ],
          [
            40,
            4,
            326,
            0.41,
            0.83,
            40
          ],
          [
            50,
            5,
            408,
            0.65,
            1.31,
            20
          ]
        ]
      },
      {
        slug: "k-pipe-purple-pp-r-sdr-11",
        title: "K-Pipe Purple PP-R SDR 11",
        codes: "AQ11PL20–AQ11PL50",
        material: "PP-R",
        sdr: 11,
        series: "S 5",
        pressure: "20°C / 1.2 MPa · 60°C / 0.6 MPa",
        len: "4 m",
        note: "Violett eingefärbt — z. B. für Betriebswasser-/Bewässerungssysteme zur eindeutigen Kennzeichnung.",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "kg/m",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            "—",
            162,
            "—",
            "—",
            100
          ],
          [
            25,
            2,
            204,
            0.16,
            0.33,
            100
          ],
          [
            32,
            2.5,
            262,
            0.26,
            0.54,
            60
          ],
          [
            40,
            3.2,
            326,
            0.41,
            0.85,
            40
          ],
          [
            50,
            4,
            408,
            0.65,
            1.31,
            20
          ]
        ]
      },
      {
        slug: "k-fiber-pipe-pp-rct-sdr-74",
        title: "K-Fiber Pipe PP-RCT SDR 7.4",
        codes: "AQ200F20–AQ200F50",
        material: "PP-RCT + Faser",
        sdr: 7.4,
        series: "S 3.2",
        pressure: "20°C / 2.0 MPa · 70°C / 1.0 MPa",
        len: "4 m",
        note: "Faserverstärkte Mittelschicht reduziert die Wärmeausdehnung um rund 50 %.",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            20,
            2.8,
            144,
            0.16,
            100
          ],
          [
            25,
            3.5,
            180,
            0.25,
            100
          ],
          [
            32,
            4.4,
            232,
            0.39,
            60
          ],
          [
            40,
            5.5,
            280,
            0.59,
            40
          ],
          [
            50,
            6.9,
            362,
            0.91,
            20
          ]
        ]
      },
      {
        slug: "k-fiberclima-pipe-pp-rct-sdr-11",
        title: "K-Fiberclima Pipe PP-RCT SDR 11",
        codes: "AQ160F20–AQ160F50",
        material: "PP-RCT + Faser",
        sdr: 11,
        series: "S 5",
        pressure: "20°C / 1.6 MPa · 70°C / 0.8 MPa",
        len: "4 m",
        note: "Optimiert für Klima-/HLK-Anwendungen (Kühl- und Heizwasser).",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            20,
            2.8,
            144,
            0.16,
            100
          ],
          [
            25,
            3.5,
            180,
            0.25,
            100
          ],
          [
            32,
            2.9,
            252,
            0.28,
            60
          ],
          [
            40,
            3.7,
            326,
            0.43,
            40
          ],
          [
            50,
            4.6,
            408,
            0.67,
            20
          ]
        ]
      },
      {
        slug: "k-fiber-pipe-pp-r-sdr-74",
        title: "K-Fiber Pipe PP-R SDR 7.4",
        codes: "AQ207PF20–AQ207PF50",
        material: "PP-R + Faser",
        sdr: 7.4,
        series: "S 3.2",
        pressure: "20°C / 2.5 MPa · 60°C / 1.2 MPa",
        len: "4 m",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            20,
            2.8,
            144,
            0.16,
            100
          ],
          [
            25,
            3.5,
            180,
            0.25,
            100
          ],
          [
            32,
            4.4,
            252,
            0.39,
            60
          ],
          [
            40,
            5.5,
            290,
            0.59,
            40
          ],
          [
            50,
            6.9,
            362,
            0.91,
            20
          ]
        ]
      },
      {
        slug: "k-fiber-pipe-pp-r-sdr-9",
        title: "K-Fiber Pipe PP-R SDR 9",
        codes: "AQ169PF32–AQ169PF75",
        material: "PP-R + Faser",
        sdr: 9,
        series: "S 4",
        pressure: "20°C / 2.0 MPa · 60°C / 1.0 MPa",
        len: "4 m",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            32,
            4,
            248,
            0.55,
            60
          ],
          [
            40,
            5,
            310,
            0.84,
            40
          ],
          [
            50,
            6.2,
            388,
            0.8,
            20
          ],
          [
            63,
            7.8,
            488,
            1.25,
            20
          ],
          [
            75,
            9.2,
            "—",
            1.77,
            12
          ]
        ]
      },
      {
        slug: "k-fiber-pipe-pp-r-sdr-11",
        title: "K-Fiber Pipe PP-R SDR 11",
        codes: "AQ11PF20–AQ11PF50",
        material: "PP-R + Faser",
        sdr: 11,
        series: "S 5",
        pressure: "20°C / 1.6 MPa · 60°C / 0.8 MPa",
        len: "4 m",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "kg/m",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            1.8,
            144,
            0.16,
            0.16,
            100
          ],
          [
            25,
            2,
            180,
            0.28,
            0.25,
            100
          ],
          [
            32,
            2.5,
            262,
            0.28,
            0.54,
            60
          ],
          [
            40,
            3.2,
            326,
            0.43,
            0.83,
            40
          ],
          [
            50,
            4,
            408,
            0.87,
            1.31,
            20
          ]
        ]
      },
      {
        slug: "k-fiber-pipe-pp-r-sdr-17",
        title: "K-Fiber Pipe PP-R SDR 17",
        codes: "AQ17PF90–AQ17PF200",
        material: "PP-R + Faser",
        sdr: 17,
        series: "S 8",
        pressure: "20°C / 1.0 MPa · 60°C / 0.6 MPa",
        len: "4 m",
        note: "Großdimensioniertes Faserrohr für Industrie und Gebäudeversorgung.",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "kg/m",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            90,
            6.5,
            792,
            1.46,
            4.93,
            8
          ],
          [
            110,
            8,
            968,
            2.16,
            7.36,
            4
          ],
          [
            125,
            10,
            1102,
            2.77,
            9.4,
            4
          ],
          [
            160,
            12.5,
            1400,
            4.52,
            15.61,
            4
          ],
          [
            200,
            16,
            1762,
            7.05,
            24.38,
            2
          ]
        ]
      },
      {
        slug: "k-fiber-uv-pipe-pp-r-sdr-74",
        title: "K-Fiber UV Pipe PP-R SDR 7.4",
        codes: "AQ200PFUV20–50",
        material: "PP-R + UV",
        sdr: 7.4,
        series: "S 3.2",
        pressure: "20°C / 2.0 MPa · 60°C / 1.0 MPa",
        len: "4 m",
        note: "UV-stabilisierte Außenschicht für Anwendungen im Freien.",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            20,
            2.8,
            144,
            0.16,
            100
          ],
          [
            25,
            3.5,
            180,
            0.25,
            100
          ],
          [
            32,
            4.4,
            232,
            0.39,
            60
          ],
          [
            40,
            5.5,
            290,
            0.59,
            40
          ],
          [
            50,
            6.9,
            362,
            0.91,
            20
          ]
        ]
      },
      {
        slug: "k-fiber-uv-pipe-pp-rct-sdr-74",
        title: "K-Fiber UV Pipe PP-RCT SDR 7.4",
        codes: "AQ200FUVCT20–50",
        material: "PP-RCT + UV",
        sdr: 7.4,
        series: "S 3.2",
        pressure: "20°C / 2.0 MPa · 70°C / 1.0 MPa",
        len: "4 m",
        note: "UV-stabilisiert für Freileitungen und Dachinstallationen.",
        head: [
          "d (mm)",
          "s (mm)",
          "L (mm)",
          "#weightM",
          "#pack"
        ],
        rows: [
          [
            20,
            2.8,
            144,
            0.16,
            100
          ],
          [
            25,
            3.5,
            180,
            0.25,
            100
          ],
          [
            32,
            4.4,
            232,
            0.39,
            60
          ],
          [
            40,
            5.5,
            290,
            0.59,
            40
          ],
          [
            50,
            6.9,
            362,
            0.91,
            20
          ]
        ]
      }
    ]
  },
  {
    id: "fittings",
    count: 15,
    items: [
      {
        slug: "cap",
        title: "Cap",
        codes: "AQ30120–AQ30175",
        head: [
          "d (mm)",
          "H (mm)",
          "L (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            29,
            25,
            0.01,
            600
          ],
          [
            25,
            34,
            28,
            0.01,
            400
          ],
          [
            32,
            43,
            32,
            0.02,
            255
          ],
          [
            40,
            52,
            36,
            0.03,
            160
          ],
          [
            50,
            65,
            41,
            0.06,
            100
          ],
          [
            63,
            79,
            48,
            0.09,
            60
          ],
          [
            75,
            99,
            54,
            0.18,
            30
          ]
        ]
      },
      {
        slug: "socket",
        title: "Socket",
        codes: "AQ27020–AQ27075",
        head: [
          "d (mm)",
          "L (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            34,
            0.01,
            500
          ],
          [
            25,
            35,
            0.02,
            300
          ],
          [
            32,
            "—",
            0.03,
            160
          ],
          [
            40,
            56,
            0.05,
            80
          ],
          [
            50,
            65,
            0.07,
            60
          ],
          [
            63,
            "—",
            0.15,
            45
          ],
          [
            75,
            90,
            0.2,
            24
          ]
        ]
      },
      {
        slug: "elbow-45",
        title: "Elbow 45°",
        codes: "AQ04520–AQ04575",
        head: [
          "d (mm)",
          "L1 (mm)",
          "L2 (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            "—",
            "—",
            "—",
            0.02,
            300
          ],
          [
            25,
            "—",
            "—",
            "—",
            0.02,
            200
          ],
          [
            32,
            44,
            "—",
            "—",
            0.05,
            100
          ],
          [
            40,
            52,
            "—",
            "—",
            0.06,
            70
          ],
          [
            50,
            "—",
            "—",
            "—",
            0.1,
            48
          ],
          [
            63,
            "—",
            "—",
            "—",
            0.21,
            24
          ],
          [
            75,
            99,
            "—",
            50,
            0.32,
            12
          ]
        ]
      },
      {
        slug: "elbow-45-femalemale",
        title: "Elbow 45° (Female/Male)",
        codes: "AQ04120–AQ04125",
        head: [
          "d (mm)",
          "Rp",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            "1/2\"",
            "—",
            "—",
            0.02,
            300
          ],
          [
            25,
            "3/4\"",
            "—",
            "—",
            0.02,
            200
          ]
        ]
      },
      {
        slug: "elbow-90",
        title: "Elbow 90°",
        codes: "AQ09020–AQ09075",
        head: [
          "d (mm)",
          "L1 (mm)",
          "L2 (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            29,
            27,
            "—",
            0.02,
            300
          ],
          [
            25,
            "—",
            "—",
            "—",
            0.02,
            180
          ],
          [
            32,
            "—",
            "—",
            "—",
            0.05,
            100
          ],
          [
            40,
            52,
            "—",
            "—",
            0.07,
            60
          ],
          [
            50,
            65,
            "—",
            "—",
            0.11,
            36
          ],
          [
            63,
            "—",
            "—",
            "—",
            0.27,
            "—"
          ],
          [
            75,
            "—",
            "—",
            "—",
            0.44,
            10
          ]
        ]
      },
      {
        slug: "elbow-90-femalemale",
        title: "Elbow 90° (Female/Male)",
        codes: "AQ09120–AQ09125",
        head: [
          "d (mm)",
          "Rp",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            "1/2\"",
            "—",
            "—",
            0.02,
            300
          ],
          [
            25,
            "3/4\"",
            "—",
            "—",
            0.02,
            180
          ]
        ]
      },
      {
        slug: "electrofusion-socket",
        title: "Electrofusion Socket",
        codes: "AQ27E20–AQ27E75",
        head: [
          "d (mm)",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        note: "Elektroschweißmuffe — Fügung über elektrische Beheizung ohne Schweißeisen.",
        rows: [
          [
            20,
            38,
            57,
            0.05,
            60
          ],
          [
            25,
            48,
            57,
            0.05,
            50
          ],
          [
            32,
            45,
            65,
            "—",
            47
          ],
          [
            40,
            55,
            65,
            0.11,
            40
          ],
          [
            50,
            61,
            "—",
            0.15,
            20
          ],
          [
            63,
            72,
            56,
            "—",
            20
          ],
          [
            75,
            56,
            "—",
            0.54,
            10
          ]
        ]
      },
      {
        slug: "flange-adaptor",
        title: "Flange Adaptor",
        codes: "AQ79040–AQ790125",
        head: [
          "d (mm)",
          "DN",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        note: "Übergang auf Flanschverbindung — für Armaturen, Pumpen, Wasserzähler.",
        rows: [
          [
            40,
            40,
            60,
            29,
            0.15,
            8
          ],
          [
            50,
            50,
            70,
            38,
            0.19,
            8
          ],
          [
            63,
            65,
            40,
            95,
            "—",
            4
          ],
          [
            75,
            80,
            57,
            75,
            "—",
            4
          ],
          [
            90,
            90,
            65,
            "—",
            "—",
            2
          ],
          [
            110,
            100,
            57,
            58,
            "—",
            2
          ],
          [
            125,
            125,
            56,
            22,
            "—",
            1
          ]
        ]
      },
      {
        slug: "reducing-bush",
        title: "Reducing Bush",
        codes: "AQ2432520–AQ2435020",
        head: [
          "d1 (mm)",
          "d2 (mm)",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            25,
            20,
            "—",
            "—",
            0.01,
            400
          ],
          [
            32,
            20,
            "—",
            "—",
            0.02,
            325
          ],
          [
            32,
            25,
            "—",
            "—",
            0.02,
            325
          ],
          [
            40,
            20,
            44,
            45,
            0.02,
            210
          ],
          [
            40,
            25,
            54,
            37,
            0.02,
            195
          ],
          [
            40,
            32,
            43,
            45,
            0.03,
            180
          ],
          [
            50,
            20,
            48,
            56,
            0.04,
            160
          ]
        ]
      },
      {
        slug: "reducing-tee",
        title: "Reducing Tee",
        codes: "AQ1302520–AQ1305020",
        head: [
          "d1 (mm)",
          "d2 (mm)",
          "L1 (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            25,
            20,
            25,
            "—",
            0.03,
            50
          ],
          [
            32,
            20,
            32,
            "—",
            0.06,
            80
          ],
          [
            32,
            25,
            32,
            "—",
            0.06,
            80
          ],
          [
            40,
            20,
            40,
            "—",
            0.08,
            48
          ],
          [
            40,
            25,
            40,
            "—",
            0.09,
            48
          ],
          [
            40,
            32,
            40,
            "—",
            0.09,
            48
          ],
          [
            50,
            20,
            50,
            "—",
            0.16,
            36
          ]
        ]
      },
      {
        slug: "reducing-tee-large-sizes",
        title: "Reducing Tee (Large Sizes)",
        codes: "AQ1506320–AQ1507532",
        head: [
          "d1 (mm)",
          "d2 (mm)",
          "L1 (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        note: "Für Hauptleitungen 63–75 mm.",
        rows: [
          [
            63,
            20,
            63,
            85,
            0.45,
            6
          ],
          [
            63,
            25,
            63,
            85,
            0.45,
            6
          ],
          [
            63,
            32,
            63,
            85,
            0.45,
            6
          ],
          [
            63,
            40,
            63,
            85,
            0.47,
            6
          ],
          [
            63,
            50,
            63,
            85,
            0.48,
            6
          ],
          [
            75,
            25,
            75,
            100,
            "—",
            "—"
          ],
          [
            75,
            32,
            75,
            100,
            "—",
            "—"
          ]
        ]
      },
      {
        slug: "tee",
        title: "Tee",
        codes: "AQ13020–AQ13075",
        head: [
          "d (mm)",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            "—",
            "—",
            0.02,
            200
          ],
          [
            25,
            "—",
            "—",
            0.04,
            100
          ],
          [
            32,
            "—",
            "—",
            0.06,
            60
          ],
          [
            40,
            65,
            "—",
            0.09,
            36
          ],
          [
            50,
            "—",
            "—",
            0.17,
            22
          ],
          [
            63,
            "—",
            "—",
            "—",
            "—"
          ],
          [
            75,
            "—",
            "—",
            "—",
            "—"
          ]
        ]
      },
      {
        slug: "cross",
        title: "Cross",
        codes: "AQ18025–AQ18032",
        head: [
          "d (mm)",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            25,
            60,
            "—",
            0.06,
            80
          ],
          [
            32,
            75,
            34,
            0.08,
            50
          ]
        ]
      },
      {
        slug: "cross-over",
        title: "Cross Over",
        codes: "AQ26720–AQ26732",
        head: [
          "d (mm)",
          "L (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        note: "Kreuzt eine zweite Leitung ohne Verbindung.",
        rows: [
          [
            20,
            "—",
            "—",
            "—",
            90
          ],
          [
            25,
            "—",
            "—",
            "—",
            90
          ],
          [
            32,
            "—",
            "—",
            "—",
            65
          ]
        ]
      },
      {
        slug: "cross-over-pipe",
        title: "Cross Over Pipe",
        codes: "AQ28520–AQ28532",
        head: [
          "d (mm)",
          "L1 (mm)",
          "L2 (mm)",
          "H (mm)",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            20,
            54,
            53,
            36.5,
            0.06,
            100
          ],
          [
            25,
            42,
            "—",
            37,
            0.09,
            70
          ],
          [
            32,
            54,
            68,
            37,
            0.15,
            50
          ]
        ]
      }
    ]
  },
  {
    id: "transitionFittings",
    count: 13,
    items: [
      {
        slug: "adaptor-socket-female-thread",
        title: "Adaptor Socket (Female Thread)",
        codes: "AQ24RP20–AQ24RP315",
        head: [
          "d (mm)",
          "Rp",
          "#pack"
        ],
        rows: [
          [
            20,
            "½\"",
            100
          ],
          [
            25,
            "¾\"",
            100
          ],
          [
            32,
            "1\"",
            60
          ],
          [
            40,
            "1¼\"",
            40
          ],
          [
            50,
            "1½\"",
            20
          ],
          [
            63,
            "2\"",
            20
          ],
          [
            75,
            "2½\"",
            10
          ],
          [
            90,
            "3\"",
            8
          ],
          [
            110,
            "4\"",
            8
          ],
          [
            125,
            "—",
            4
          ],
          [
            160,
            "—",
            2
          ],
          [
            315,
            "—",
            1
          ]
        ]
      },
      {
        slug: "adaptor-socket-male-thread",
        title: "Adaptor Socket (Male Thread)",
        codes: "AQ24R20–AQ24R160",
        head: [
          "d (mm)",
          "R",
          "#pack"
        ],
        rows: [
          [
            20,
            "½\"",
            100
          ],
          [
            25,
            "¾\"",
            100
          ],
          [
            32,
            "1\"",
            60
          ],
          [
            40,
            "1¼\"",
            40
          ],
          [
            50,
            "1½\"",
            20
          ],
          [
            63,
            "2\"",
            20
          ],
          [
            75,
            "2½\"",
            10
          ],
          [
            90,
            "3\"",
            8
          ],
          [
            110,
            "4\"",
            8
          ],
          [
            125,
            "—",
            4
          ],
          [
            160,
            "—",
            2
          ]
        ]
      },
      {
        slug: "elbow-90-male-thread",
        title: "Elbow 90° (Male Thread)",
        codes: "AQ09R20–AQ09R40",
        head: [
          "d (mm)",
          "R"
        ],
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ]
        ]
      },
      {
        slug: "elbow-bracket-90-female-thread",
        title: "Elbow Bracket 90° (Female Thread)",
        codes: "AQ09BRP20–AQ09BRP50",
        head: [
          "d (mm)",
          "Rp"
        ],
        note: "Mit Montageflansch zur Wandbefestigung.",
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ],
          [
            50,
            "1½\""
          ]
        ]
      },
      {
        slug: "elbowwall-bracket-90-female-thread",
        title: "Elbow/Wall Bracket 90° (Female Thread)",
        codes: "AQ09WBRP20–AQ09WBRP40",
        head: [
          "d (mm)",
          "Rp"
        ],
        note: "Beidseitige Wandbefestigung.",
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ]
        ]
      },
      {
        slug: "metal-union-male-thread-yellow-brass",
        title: "Metal Union — Male Thread (Yellow Brass)",
        codes: "AQ70R20–AQ70R50",
        head: [
          "d (mm)",
          "R"
        ],
        note: "Messing CW617N.",
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ],
          [
            50,
            "1½\""
          ]
        ]
      },
      {
        slug: "metal-union-female-thread-yellow-brass",
        title: "Metal Union — Female Thread (Yellow Brass)",
        codes: "AQ70RP20–AQ70RP50",
        head: [
          "d (mm)",
          "Rp"
        ],
        note: "Messing CW617N.",
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ],
          [
            50,
            "1½\""
          ]
        ]
      },
      {
        slug: "metal-union-male-thread",
        title: "Metal Union — Male Thread",
        codes: "AQ71R20–AQ71R50",
        head: [
          "d (mm)",
          "R"
        ],
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ],
          [
            50,
            "1½\""
          ]
        ]
      },
      {
        slug: "metal-union-female-thread",
        title: "Metal Union — Female Thread",
        codes: "AQ71RP20–AQ71RP50",
        head: [
          "d (mm)",
          "Rp"
        ],
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ],
          [
            50,
            "1½\""
          ]
        ]
      },
      {
        slug: "tee-90-male-thread",
        title: "Tee 90° (Male Thread)",
        codes: "AQ13R20–AQ13R40",
        head: [
          "d (mm)",
          "R"
        ],
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ]
        ]
      },
      {
        slug: "tee-90-female-thread",
        title: "Tee 90° (Female Thread)",
        codes: "AQ13RP20–AQ13RP40",
        head: [
          "d (mm)",
          "Rp"
        ],
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "¾\""
          ],
          [
            32,
            "1\""
          ],
          [
            40,
            "1¼\""
          ]
        ]
      },
      {
        slug: "union",
        title: "Union",
        codes: "AQ69E20–AQ69E63",
        head: [
          "d (mm)",
          "L (mm)",
          "#pack"
        ],
        note: "Zerlegbar für Wartungsarbeiten ohne Rohrtrennung.",
        rows: [
          [
            20,
            "—",
            114
          ],
          [
            25,
            137,
            120
          ],
          [
            32,
            161,
            48
          ],
          [
            40,
            "—",
            26
          ],
          [
            50,
            213,
            17
          ],
          [
            63,
            "2½\"",
            8
          ]
        ]
      },
      {
        slug: "union-for-watermeters",
        title: "Union for Watermeters",
        codes: "AQ72E20–AQ72E32",
        head: [
          "d (mm)",
          "#pack"
        ],
        note: "Erleichtert Ein- und Ausbau von Wasserzählern.",
        rows: [
          [
            20,
            "—"
          ],
          [
            25,
            "—"
          ],
          [
            32,
            "—"
          ]
        ]
      }
    ]
  },
  {
    id: "valves",
    count: 9,
    items: [
      {
        slug: "pp-r-ball-valve-ball-in-pp",
        title: "PP-R Ball Valve (Ball in PP)",
        codes: "AQ50020–AQ50063",
        head: [
          "d (mm)",
          "L (mm)",
          "H (mm)",
          "#weight"
        ],
        note: "Vollbohrung, PP-Kugel, Schweißmuffen beidseitig.",
        rows: [
          [
            20,
            90,
            63,
            "—"
          ],
          [
            25,
            96,
            63,
            0.28
          ],
          [
            32,
            104,
            82,
            "—"
          ],
          [
            40,
            108,
            100,
            0.55
          ],
          [
            50,
            106,
            98,
            "—"
          ],
          [
            63,
            107,
            103,
            0.64
          ]
        ]
      },
      {
        slug: "pp-r-ball-valve-ball-in-brass-chromium-plated",
        title: "PP-R Ball Valve (Ball in Brass, Chromium Plated)",
        codes: "AQ60020–AQ60090",
        head: [
          "d (mm)",
          "L (mm)",
          "H (mm)",
          "#weight"
        ],
        note: "Verchromte Messingkugel für hohe Beanspruchung.",
        rows: [
          [
            20,
            67.5,
            64.5,
            "—"
          ],
          [
            25,
            75,
            63,
            "—"
          ],
          [
            32,
            90,
            46,
            "—"
          ],
          [
            40,
            108,
            100,
            "—"
          ],
          [
            50,
            106,
            120,
            "—"
          ],
          [
            63,
            127,
            120,
            "—"
          ],
          [
            75,
            "—",
            "—",
            "—"
          ],
          [
            90,
            175,
            155,
            "—"
          ]
        ]
      },
      {
        slug: "tee-90-female-thread-for-internal-valve",
        title: "Tee 90° (Female Thread) for Internal Valve",
        codes: "AQ60RP20–AQ60RP40",
        head: [
          "d (mm)",
          "Rp",
          "L (mm)",
          "H (mm)",
          "#pack"
        ],
        note: "Aufnahme-Tee für Unterputzventile.",
        rows: [
          [
            20,
            "½\"",
            80,
            43,
            100
          ],
          [
            25,
            "¾\"",
            80,
            43,
            80
          ],
          [
            32,
            "1\"",
            70,
            40,
            80
          ],
          [
            40,
            "1¼\"",
            70,
            40,
            80
          ]
        ]
      },
      {
        slug: "concealed-valve-chrome-light-part",
        title: "Concealed Valve Chrome — Light Part",
        codes: "AQ62992",
        head: [
          "#dim",
          "#weight",
          "#pack"
        ],
        note: "Sichtbare Blende + Spindel, Chromausführung.",
        rows: [
          [
            "½\"",
            0.21,
            1
          ]
        ]
      },
      {
        slug: "concealed-valve-chrome-heavy-part",
        title: "Concealed Valve Chrome — Heavy Part",
        codes: "AQ62993",
        head: [
          "#dim",
          "#weight",
          "#pack"
        ],
        note: "Unterputz-Ventilkörper, im Aufnahme-Tee montiert.",
        rows: [
          [
            "½\"",
            0.21,
            1
          ]
        ]
      },
      {
        slug: "straight-seat-valve-upper-part-green-handle",
        title: "Straight Seat Valve — Upper Part, Green Handle",
        codes: "AQ62591",
        head: [
          "#dim",
          "#weight",
          "#pack"
        ],
        note: "Oberteil mit Griff für Durchgangs-/Geradsitzventile.",
        rows: [
          [
            "3/4\"",
            0.25,
            1
          ]
        ]
      },
      {
        slug: "elongation-pieces",
        title: "Elongation Pieces",
        codes: "AQ62990",
        head: [
          "d (mm)",
          "#weight",
          "#pack"
        ],
        note: "Verlängerung für unterschiedliche Wandstärken.",
        rows: [
          [
            30,
            0.05,
            1
          ]
        ]
      },
      {
        slug: "battery-female-thread",
        title: "Battery (Female Thread)",
        codes: "AQ64RCG20–AQ64RCG25",
        head: [
          "d (mm)",
          "Rp",
          "L (mm)",
          "#weight"
        ],
        note: "Verteilerbatterie für Fußbodenheizung/Mehrkreisverteilung.",
        rows: [
          [
            20,
            "½\"",
            166,
            0.38
          ],
          [
            25,
            "½\"",
            166,
            0.38
          ]
        ]
      },
      {
        slug: "adjustable-battery-female-thread",
        title: "Adjustable Battery (Female Thread)",
        codes: "AQ64ARCG20–AQ64ARCG25",
        head: [
          "d (mm)",
          "Rp"
        ],
        note: "Verstellbarer Achsabstand zwischen den Abgängen.",
        rows: [
          [
            20,
            "½\""
          ],
          [
            25,
            "½\""
          ]
        ]
      }
    ]
  },
  {
    id: "weldInSaddles",
    count: 3,
    items: [
      {
        slug: "weld-in-saddle",
        title: "Weld-in Saddle",
        codes: "AQ1505406320–AQ1505160250",
        head: [
          "#mainPipe",
          "#branch",
          "#weight",
          "#pack"
        ],
        note: "Ohne Gewinde — PP-R-Abzweig, direkt an die Hauptleitung geschweißt.",
        rows: [
          [
            "40–63",
            20,
            "—",
            150
          ],
          [
            "40–63",
            25,
            "—",
            90
          ],
          [
            "40–63",
            32,
            "—",
            90
          ],
          [
            "75–125",
            32,
            "—",
            60
          ],
          [
            "75–125",
            "—",
            "—",
            60
          ],
          [
            "75–125",
            40,
            0.38,
            60
          ],
          [
            "160–250",
            25,
            "—",
            40
          ],
          [
            "160–250",
            32,
            "—",
            40
          ]
        ]
      },
      {
        slug: "weld-in-saddle-female-thread",
        title: "Weld-in Saddle (Female Thread)",
        codes: "AQ270S406332–AQ270S751254",
        head: [
          "#mainPipe",
          "Rp",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            "40–63",
            "1\"",
            "—",
            150
          ],
          [
            "40–63",
            "1¼\"",
            3.2,
            90
          ],
          [
            "75–125",
            "1\"",
            "—",
            90
          ],
          [
            "75–125",
            "1¼\"",
            2.5,
            60
          ]
        ]
      },
      {
        slug: "weld-in-saddle-male-thread",
        title: "Weld-in Saddle (Male Thread)",
        codes: "AQ243S406334–AQ243S751251",
        head: [
          "#mainPipe",
          "R",
          "#weight",
          "#pack"
        ],
        rows: [
          [
            "40–63",
            "3/4\"",
            3.2,
            90
          ],
          [
            "75–125",
            "1\"",
            8.8,
            "—"
          ]
        ]
      }
    ]
  },
  {
    id: "accessories",
    count: 5,
    items: [
      {
        slug: "pipe-clamps",
        title: "Pipe Clamps",
        codes: "AQ9520–AQ95200",
        head: [
          "d (mm)",
          "#weight",
          "#pack"
        ],
        note: "Mit Gummieinlage — für Rohrhalterung und -befestigung.",
        rows: [
          [
            20,
            "—",
            100
          ],
          [
            25,
            "—",
            75
          ],
          [
            32,
            "—",
            60
          ],
          [
            40,
            0.06,
            50
          ],
          [
            50,
            "—",
            40
          ],
          [
            63,
            "—",
            25
          ],
          [
            75,
            "—",
            20
          ],
          [
            90,
            "—",
            10
          ],
          [
            110,
            "—",
            10
          ],
          [
            125,
            "—",
            10
          ],
          [
            160,
            "—",
            5
          ],
          [
            200,
            "—",
            5
          ]
        ]
      },
      {
        slug: "backing-flange-pp-steel-sfbf",
        title: "Backing Flange PP-Steel (SF/BF)",
        codes: "AQ575040–AQ575315",
        head: [
          "d (mm)",
          "DN",
          "#weight",
          "#pack"
        ],
        note: "Stahlverstärkter Gegenflansch für Flanschadapter.",
        rows: [
          [
            40,
            40,
            0.37,
            12
          ],
          [
            50,
            50,
            0.48,
            8
          ],
          [
            63,
            65,
            "—",
            "—"
          ],
          [
            75,
            80,
            "—",
            "—"
          ],
          [
            90,
            90,
            "—",
            "—"
          ],
          [
            110,
            100,
            "—",
            "—"
          ],
          [
            125,
            125,
            2.24,
            "—"
          ],
          [
            160,
            150,
            "—",
            "—"
          ],
          [
            200,
            200,
            "—",
            "—"
          ],
          [
            250,
            250,
            4.55,
            "—"
          ],
          [
            315,
            300,
            "—",
            "—"
          ]
        ]
      },
      {
        slug: "flat-gasket",
        title: "Flat Gasket",
        codes: "AQ97040–AQ97250",
        head: [
          "d (mm)",
          "#pack"
        ],
        note: "EPDM-Flachdichtung für Flanschverbindungen.",
        rows: [
          [
            40,
            1
          ],
          [
            50,
            1
          ],
          [
            63,
            1
          ],
          [
            75,
            1
          ],
          [
            90,
            1
          ],
          [
            110,
            1
          ],
          [
            125,
            1
          ],
          [
            160,
            1
          ],
          [
            200,
            1
          ],
          [
            250,
            1
          ]
        ]
      },
      {
        slug: "flat-gasket-for-unions-pp-r",
        title: "Flat Gasket for Unions PP-R",
        codes: "AQ9ANRP20–AQ9ANRP32",
        head: [
          "d (mm)",
          "Rp",
          "d1 (mm)",
          "d2 (mm)",
          "#pack"
        ],
        note: "EPDM-Dichtung für Verschraubungen.",
        rows: [
          [
            20,
            "½\"",
            27,
            20,
            1
          ],
          [
            25,
            "¾\"",
            35,
            26,
            1
          ],
          [
            32,
            "1\"",
            42,
            33,
            1
          ]
        ]
      },
      {
        slug: "plug",
        title: "Plug",
        codes: "AQ98P57",
        head: [
          "Rp",
          "#pack"
        ],
        note: "Gewindestopfen zum Verschließen offener Enden — weitere Größen auf Anfrage.",
        rows: [
          [
            "½\"",
            1
          ]
        ]
      }
    ]
  },
  {
    id: "tools",
    count: 14,
    items: [
      {
        slug: "pipe-cutter-2040",
        title: "Pipe Cutter 20–40",
        codes: "AQ97040",
        head: [
          "#range",
          "#pack"
        ],
        note: "Ratschen-Rohrschneider für saubere, rechtwinklige Schnitte.",
        rows: [
          [
            "20–40",
            1
          ]
        ]
      },
      {
        slug: "pipe-cutter-50125",
        title: "Pipe Cutter 50–125",
        codes: "AQ975125",
        head: [
          "#range",
          "#pack"
        ],
        note: "Robuster Rohrschneider für große Dimensionen.",
        rows: [
          [
            "50–125",
            1
          ]
        ]
      },
      {
        slug: "pipe-cutter-50125-1",
        title: "Pipe Cutter 50–125 (1¼)",
        codes: "AQ974",
        head: [
          "#range",
          "#pack"
        ],
        note: "Alternative Ausführung (1¼).",
        rows: [
          [
            "50–125",
            1
          ]
        ]
      },
      {
        slug: "hand-welding-machine-2032-complete-set",
        title: "Hand Welding Machine 20–32 (Complete Set)",
        codes: "AQ98032",
        head: [
          "#range",
          "#pack"
        ],
        note: "Kompaktes Muffenschweißgerät.",
        rows: [
          [
            "20–32",
            1
          ]
        ]
      },
      {
        slug: "hand-welding-machine-2063-complete-set",
        title: "Hand Welding Machine 20–63 (Complete Set)",
        codes: "AQ98063",
        head: [
          "#range",
          "#pack"
        ],
        note: "Komplettset mit Heizplatte, Ständer und Werkzeugen.",
        rows: [
          [
            "20–63",
            1
          ]
        ]
      },
      {
        slug: "hand-welding-machine-mirror-50125",
        title: "Hand Welding Machine Mirror 50–125",
        codes: "AQ991125",
        head: [
          "#range",
          "#pack"
        ],
        note: "Ersatz-Heizspiegel für das 50–125-mm-Gerät.",
        rows: [
          [
            "50–125",
            1
          ]
        ]
      },
      {
        slug: "welding-tool",
        title: "Welding Tool",
        codes: "AQ98220–AQ98290",
        head: [
          "d (mm)",
          "#pack"
        ],
        note: "Einzelne Heizdorn-/Muffen-Werkzeugpaare je Dimension.",
        rows: [
          [
            20,
            1
          ],
          [
            25,
            1
          ],
          [
            32,
            1
          ],
          [
            40,
            1
          ],
          [
            50,
            1
          ],
          [
            63,
            1
          ],
          [
            75,
            1
          ],
          [
            90,
            1
          ]
        ]
      },
      {
        slug: "welding-machine-50125-complete-set",
        title: "Welding Machine 50–125 (Complete Set)",
        codes: "AQ985125",
        head: [
          "#range",
          "#pack"
        ],
        note: "Profi-Muffenschweißgerät für Großdimensionen.",
        rows: [
          [
            "50–125",
            1
          ]
        ]
      },
      {
        slug: "butt-welding-machine-90250",
        title: "Butt Welding Machine 90–250",
        codes: "AQ989250",
        head: [
          "#range",
          "#pack"
        ],
        note: "Stumpfschweißmaschine für Großdimensionen.",
        rows: [
          [
            "90–250",
            1
          ]
        ]
      },
      {
        slug: "electrofusion-machine",
        title: "Electrofusion Machine",
        codes: "AQ990",
        head: [
          "#pack"
        ],
        note: "Steuergerät für Elektroschweißfittings — mit Barcode-Scanner.",
        rows: [
          [
            1
          ]
        ]
      },
      {
        slug: "welding-tool-for-weld-in-saddles",
        title: "Welding Tool for Weld-in Saddles",
        codes: "AQ9850400632S–AQ98516025050",
        head: [
          "#mainPipe",
          "#branch",
          "#pack"
        ],
        note: "Spezialwerkzeug zum Aufschweißen von Einschweißsätteln.",
        rows: [
          [
            "40–63",
            25,
            1
          ],
          [
            "75–125",
            25,
            1
          ],
          [
            "75–125",
            32,
            1
          ],
          [
            "75–125",
            40,
            1
          ],
          [
            "160–250",
            25,
            1
          ],
          [
            "160–250",
            32,
            1
          ],
          [
            "160–250",
            40,
            1
          ],
          [
            "160–250",
            50,
            1
          ]
        ]
      },
      {
        slug: "drilling-tool-for-weld-in-saddle",
        title: "Drilling Tool for Weld-in Saddle",
        codes: "AQ98625–AQ98663",
        head: [
          "d (mm)",
          "#pack"
        ],
        note: "Kernbohrer zum Öffnen der Abzweigstelle nach dem Sattelschweißen.",
        rows: [
          [
            25,
            1
          ],
          [
            32,
            1
          ],
          [
            40,
            1
          ],
          [
            50,
            1
          ],
          [
            63,
            1
          ]
        ]
      },
      {
        slug: "welding-tool-for-repairing-plug",
        title: "Welding Tool for Repairing Plug",
        codes: "AQ98625–AQ98663",
        head: [
          "d (mm)",
          "#pack"
        ],
        note: "Heizwerkzeuge für das Reparaturpfropfen-System.",
        rows: [
          [
            25,
            1
          ],
          [
            32,
            1
          ],
          [
            40,
            1
          ],
          [
            50,
            1
          ],
          [
            63,
            1
          ]
        ]
      },
      {
        slug: "repairing-plug",
        title: "Repairing Plug",
        codes: "AQ96557 · AQ96511",
        head: [
          "d (mm)",
          "#pack"
        ],
        note: "Notfall-Reparaturpfropfen zum Abdichten von Lecks ohne Entleerung.",
        rows: [
          [
            75,
            1
          ],
          [
            110,
            1
          ]
        ]
      }
    ]
  }
];
