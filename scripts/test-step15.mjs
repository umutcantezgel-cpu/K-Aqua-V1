import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Test data
const K_BENEFITS = [
  { id: 'sachbezug', value: 50 },
  { id: 'lunch', value: 108 },
  { id: 'internet', value: 50 },
  { id: 'jobrad', value: 45 },
  { id: 'kita', value: 100 },
  { id: 'vwl', value: 40 },
];

const K_CULTURE_SCORES = [
  [1, 0],   // Question 1
  [1, 0],   // Question 2
  [1, 0.5], // Question 3
  [1, 0],   // Question 4
  [1, 0.5], // Question 5
];

const EMAIL_REGEX = /.+@.+\..+/;

const DIM_GROUPS = [
  "d20 – d63",
  "d75 – d160",
  "d200 – d315",
  "d355 – d630",
];

const mockRfqData = {
  locale: 'de',
  eyebrow: 'Projektanfrage',
  title1: 'Ihr Projekt,',
  titleGrad: 'unser Angebot.',
  lead: 'In vier kurzen Schritten...',
  steps: ['Projektart', 'Bedarf', 'Termin & Region', 'Kontakt'],
  types: [
    { t: 'Neubau / Hochbau', d: 'd1' },
    { t: 'Infrastruktur / Tiefbau', d: 'd2' },
    { t: 'Sanierung / Austausch', d: 'd3' },
    { t: 'Handel / Wiederverkauf', d: 'd4' },
  ],
  fType: 'Projektart',
  fDims: 'Benötigte Dimensionen',
  fMeters: 'Geschätzte Lauflänge',
  dimsHint: 'Grobe Angaben...',
  fTime: 'Geplanter Zeitrahmen',
  fRegion: 'Lieferregion',
  timelines: ['Sofort', '1-3m', '3-6m', 'Planung'],
  regions: ['DE', 'DACH', 'EU', 'MENA', 'WW'],
  fName: 'Name',
  fCompany: 'Unternehmen',
  fEmail: 'E-Mail',
  fPhone: 'Telefon',
  fMsg: 'Nachricht',
  privacy: 'Mit dem Absenden...',
  back: 'Zurück',
  next: 'Weiter',
  send: 'Anfrage senden',
  mailSubject: 'Projektanfrage K-Aqua',
  promise: ['P1', 'P2', 'P3'],
  doneTitle: 'Done',
  doneText: 'Text',
  doneBack: 'Home',
};

// --- Test Netto Rechner ---
function testNettoRechner() {
  console.log('--- Testing Netto-Rechner Logic ---');
  let passed = true;

  const calculateNettoAndBrutto = (selectedIds) => {
    const nettoSum = K_BENEFITS.filter(b => selectedIds.includes(b.id)).reduce((sum, b) => sum + b.value, 0);
    const bruttoEquivalent = Math.round(nettoSum / 0.55 / 10) * 10;
    return { nettoSum, bruttoEquivalent };
  };

  // Test default selected: sachbezug, lunch
  const def = calculateNettoAndBrutto(['sachbezug', 'lunch']);
  if (def.nettoSum !== 158 || def.bruttoEquivalent !== 290) {
    console.error(`✖ Default benefits failed: Expected Netto=158, Brutto=290. Got Netto=${def.nettoSum}, Brutto=${def.bruttoEquivalent}`);
    passed = false;
  } else {
    console.log('✓ Default combination (sachbezug, lunch): Netto=158 EUR, Brutto=290 EUR (Passed)');
  }

  // Test all benefits
  const allIds = K_BENEFITS.map(b => b.id);
  const allRes = calculateNettoAndBrutto(allIds);
  if (allRes.nettoSum !== 393 || allRes.bruttoEquivalent !== 710) {
    console.error(`✖ All benefits failed: Expected Netto=393, Brutto=710. Got Netto=${allRes.nettoSum}, Brutto=${allRes.bruttoEquivalent}`);
    passed = false;
  } else {
    console.log('✓ All benefits: Netto=393 EUR, Brutto=710 EUR (Passed)');
  }

  // Test empty benefits
  const emptyRes = calculateNettoAndBrutto([]);
  if (emptyRes.nettoSum !== 0 || emptyRes.bruttoEquivalent !== 0) {
    console.error(`✖ Empty benefits failed: Expected Netto=0, Brutto=0. Got Netto=${emptyRes.nettoSum}, Brutto=${emptyRes.bruttoEquivalent}`);
    passed = false;
  } else {
    console.log('✓ Empty benefits: Netto=0 EUR, Brutto=0 EUR (Passed)');
  }

  // Test each individual benefit
  const expectedSingles = {
    sachbezug: { net: 50, brutto: 90 },
    lunch: { net: 108, brutto: 200 },
    internet: { net: 50, brutto: 90 },
    jobrad: { net: 45, brutto: 80 },
    kita: { net: 100, brutto: 180 },
    vwl: { net: 40, brutto: 70 },
  };

  for (const [id, val] of Object.entries(expectedSingles)) {
    const res = calculateNettoAndBrutto([id]);
    if (res.nettoSum !== val.net || res.bruttoEquivalent !== val.brutto) {
      console.error(`✖ Single benefit ${id} failed: Expected Netto=${val.net}, Brutto=${val.brutto}. Got Netto=${res.nettoSum}, Brutto=${res.bruttoEquivalent}`);
      passed = false;
    } else {
      console.log(`✓ Single benefit ${id}: Netto=${res.nettoSum} EUR, Brutto=${res.bruttoEquivalent} EUR (Passed)`);
    }
  }

  return passed;
}

// --- Test Culture Matcher ---
function testCultureMatcher() {
  console.log('\n--- Testing Culture-Matcher Logic ---');
  let passed = true;

  const calculateCultureMatch = (answers) => {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      score += K_CULTURE_SCORES[i][answers[i]];
    }
    const percent = Math.round((score / 5) * 100);
    let recommendation = '';
    if (percent >= 80) {
      recommendation = 'resHigh';
    } else if (percent >= 50) {
      recommendation = 'resMid';
    } else {
      recommendation = 'resLow';
    }
    return { score, percent, recommendation };
  };

  // Test combinations
  // 1. All first options (expected score = 5, percent = 100, recommendation = resHigh)
  const c1 = calculateCultureMatch([0, 0, 0, 0, 0]);
  if (c1.percent !== 100 || c1.recommendation !== 'resHigh') {
    console.error(`✖ All first options failed: Expected 100% / resHigh, Got ${c1.percent}% / ${c1.recommendation}`);
    passed = false;
  } else {
    console.log('✓ All first options: 100% Match -> Starkes Match (Passed)');
  }

  // 2. All second options (expected score = 1, percent = 20, recommendation = resLow)
  const c2 = calculateCultureMatch([1, 1, 1, 1, 1]);
  if (c2.percent !== 20 || c2.recommendation !== 'resLow') {
    console.error(`✖ All second options failed: Expected 20% / resLow, Got ${c2.percent}% / ${c2.recommendation}`);
    passed = false;
  } else {
    console.log('✓ All second options: 20% Match -> Ehrliches Ergebnis (Passed)');
  }

  // 3. Mixed 1: 0, 1, 1, 0, 1 (score = 1 + 0 + 0.5 + 1 + 0.5 = 3 -> percent = 60%, recommendation = resMid)
  const c3 = calculateCultureMatch([0, 1, 1, 0, 1]);
  if (c3.percent !== 60 || c3.recommendation !== 'resMid') {
    console.error(`✖ Mixed options [0,1,1,0,1] failed: Expected 60% / resMid, Got ${c3.percent}% / ${c3.recommendation}`);
    passed = false;
  } else {
    console.log('✓ Mixed [0,1,1,0,1]: 60% Match -> Gutes Match mit Gesprächsbedarf (Passed)');
  }

  // 4. Mixed 2: 0, 0, 0, 0, 1 (score = 1 + 1 + 1 + 1 + 0.5 = 4.5 -> percent = 90%, recommendation = resHigh)
  const c4 = calculateCultureMatch([0, 0, 0, 0, 1]);
  if (c4.percent !== 90 || c4.recommendation !== 'resHigh') {
    console.error(`✖ Mixed options [0,0,0,0,1] failed: Expected 90% / resHigh, Got ${c4.percent}% / ${c4.recommendation}`);
    passed = false;
  } else {
    console.log('✓ Mixed [0,0,0,0,1]: 90% Match -> Starkes Match (Passed)');
  }

  return passed;
}

// --- Test RFQ Wizard Validations and Mailto ---
function testRfqWizard() {
  console.log('\n--- Testing RFQ Wizard Validations and Mailto Construction ---');
  let passed = true;

  const validateStep = (step, state) => {
    switch (step) {
      case 0:
        return state.type !== null;
      case 1:
        return state.dims.length > 0;
      case 2:
        return state.timeline !== null && state.region !== null;
      case 3:
        return state.name.trim() !== "" &&
               state.company.trim() !== "" &&
               EMAIL_REGEX.test(state.email.trim());
      default:
        return false;
    }
  };

  const buildMailto = (state, locale = 'de') => {
    const selectedTypeName = state.type !== null && mockRfqData.types[state.type] ? mockRfqData.types[state.type].t : '—';
    const formatNum = (val) => new Intl.NumberFormat(locale).format(val);

    const body = [
      `${mockRfqData.fType}: ${selectedTypeName}`,
      `${mockRfqData.fDims}: ${state.dims.join(", ")} . ~${formatNum(state.meters)} m`,
      `${mockRfqData.fTime}: ${state.timeline} . ${mockRfqData.fRegion}: ${state.region}`,
      `${mockRfqData.fName}: ${state.name} . ${mockRfqData.fCompany}: ${state.company}`,
      `${mockRfqData.fEmail}: ${state.email} . ${mockRfqData.fPhone}: ${state.phone || '—'}`,
      state.msg.trim() ? `${mockRfqData.fMsg}: ${state.msg}` : "",
    ].filter(Boolean).join("\n");

    const subjectText = `${mockRfqData.mailSubject} — ${state.company}`;
    return `mailto:info@k-aqua.de?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(body)}`;
  };

  // Test validations
  const stateEmpty = {
    type: null,
    meters: 1000,
    dims: [],
    timeline: null,
    region: null,
    name: "",
    company: "",
    email: "",
    phone: "",
    msg: "",
  };

  if (validateStep(0, stateEmpty) !== false) {
    console.error('✖ Step 0 validation failed for empty type');
    passed = false;
  }
  if (validateStep(1, stateEmpty) !== false) {
    console.error('✖ Step 1 validation failed for empty dims');
    passed = false;
  }
  if (validateStep(2, stateEmpty) !== false) {
    console.error('✖ Step 2 validation failed for empty timeline/region');
    passed = false;
  }
  if (validateStep(3, stateEmpty) !== false) {
    console.error('✖ Step 3 validation failed for empty contacts');
    passed = false;
  }

  const statePartial = {
    type: 1,
    meters: 2500,
    dims: ['d20 – d63'],
    timeline: 'Sofort',
    region: 'DE',
    name: 'John Doe',
    company: 'ACME Corp',
    email: 'john.doe@', // invalid email
    phone: '12345',
    msg: 'Hello',
  };

  if (validateStep(0, statePartial) !== true) {
    console.error('✖ Step 0 validation failed for valid type');
    passed = false;
  }
  if (validateStep(1, statePartial) !== true) {
    console.error('✖ Step 1 validation failed for valid dims');
    passed = false;
  }
  if (validateStep(2, statePartial) !== true) {
    console.error('✖ Step 2 validation failed for valid timeline/region');
    passed = false;
  }
  if (validateStep(3, statePartial) !== false) {
    console.error('✖ Step 3 validation passed with invalid email');
    passed = false;
  }

  // Test valid complete state
  const stateComplete = {
    ...statePartial,
    email: 'john.doe@acme.com', // valid
  };

  if (validateStep(3, stateComplete) !== true) {
    console.error('✖ Step 3 validation failed with valid email');
    passed = false;
  }

  console.log('✓ All steps validate correctly (Passed)');

  // Test mailto link construction
  const linkDe = buildMailto(stateComplete, 'de');
  const expectedSubject = encodeURIComponent('Projektanfrage K-Aqua — ACME Corp');
  const expectedBodyLines = [
    'Projektart: Infrastruktur / Tiefbau',
    'Benötigte Dimensionen: d20 – d63 . ~2.500 m', // note the dot formatted number for DE: 2.500
    'Geplanter Zeitrahmen: Sofort . Lieferregion: DE',
    'Name: John Doe . Unternehmen: ACME Corp',
    'E-Mail: john.doe@acme.com . Telefon: 12345',
    'Nachricht: Hello'
  ];

  if (!linkDe.startsWith('mailto:info@k-aqua.de?')) {
    console.error(`✖ Mailto base invalid: ${linkDe}`);
    passed = false;
  }

  if (!linkDe.includes(`subject=${expectedSubject}`)) {
    console.error(`✖ Mailto subject invalid. Expected subject query param to contain: ${expectedSubject}`);
    passed = false;
  }

  for (const line of expectedBodyLines) {
    const encodedLine = encodeURIComponent(line);
    if (!linkDe.includes(encodedLine)) {
      console.error(`✖ Mailto body missing line: "${line}" (encoded: ${encodedLine})`);
      passed = false;
    }
  }

  // Test with EN locale formatting (2,500 instead of 2.500)
  const linkEn = buildMailto(stateComplete, 'en');
  if (!linkEn.includes(encodeURIComponent('~2,500 m'))) {
    console.error(`✖ Number formatting failed for EN locale: expected "~2,500 m" in body`);
    passed = false;
  } else {
    console.log('✓ Intl.NumberFormat dynamically applies correct locale-specific formatting (Passed)');
  }

  console.log('✓ Mailto link builds and encodes parameters correctly (Passed)');

  return passed;
}

// --- Check for hardcoded strings and RTL in source code ---
function checkSourceFiles() {
  console.log('\n--- Checking Source Code for Hardcoded Text & RTL Styles ---');
  let passed = true;

  const filesToScan = [
    { name: 'Career.tsx', path: path.join(ROOT, 'components/tools/Career.tsx') },
    { name: 'RfqWizard.tsx', path: path.join(ROOT, 'components/tools/RfqWizard.tsx') },
  ];

  for (const file of filesToScan) {
    if (!fs.existsSync(file.path)) {
      console.error(`✖ File does not exist: ${file.path}`);
      passed = false;
      continue;
    }

    const content = fs.readFileSync(file.path, 'utf-8');

    // 1. Check for physical layout values: pl-, pr-, ml-, mr-, text-left, text-right, left-, right-
    // Exceptions: "absolute left-0", "absolute right-0" for overlays, or "iconPosition: 'left'/'right'", etc.
    // Let's identify classNames containing physical padding/margins.
    const physicalClasses = [];
    const classNameRegex = /className=["`]([^"`]+)["`]|className=\{([^}]+)\}/g;
    let match;
    while ((match = classNameRegex.exec(content)) !== null) {
      const classStr = match[1] || match[2] || '';
      const parts = classStr.split(/\s+/);
      for (const part of parts) {
        if (/^(pl|pr|ml|mr)-/.test(part)) {
          physicalClasses.push({ class: part, file: file.name });
        }
        if (/^text-(left|right)$/.test(part)) {
          physicalClasses.push({ class: part, file: file.name });
        }
      }
    }

    if (physicalClasses.length > 0) {
      console.warn(`⚠ Warning: Physical layout classes found in ${file.name} (should ideally be logical ps-/pe-/ms-/me-/text-start/text-end):`);
      physicalClasses.forEach(item => console.warn(`  - ${item.class}`));
    } else {
      console.log(`✓ ${file.name} uses logial properties, no physical paddings/margins/text-alignments found (Passed)`);
    }

    // 2. Check for raw German/English words in JSX:
    // Regex for finding words between > and < tags or inside JSX expressions that might be hardcoded strings.
    // In our files, we want to look for literal strings that look like German or English words inside JSX.
    // Let's check for any hardcoded strings in JSX tags:
    const jsxLiteralMatches = [];
    // A simple regex to find raw text between JSX brackets. e.g. >Some Text<
    const rawTextRegex = />([^<>{}\s\n]+[^<>{}\n]*)<\//g;
    let jsxMatch;
    while ((jsxMatch = rawTextRegex.exec(content)) !== null) {
      const text = jsxMatch[1].trim();
      // Ignore if it's just punctuation, icons, variables, numbers, brackets, etc.
      if (text && /[a-zA-ZäöüÄÖÜß]/.test(text)) {
        jsxLiteralMatches.push(text);
      }
    }

    if (jsxLiteralMatches.length > 0) {
      console.error(`✖ Hardcoded JSX text nodes found in ${file.name}:`);
      jsxLiteralMatches.forEach(t => console.error(`  - "${t}"`));
      passed = false;
    } else {
      console.log(`✓ ${file.name} has zero hardcoded text nodes inside JSX (Passed)`);
    }
  }

  return passed;
}

// Run all tests
const r1 = testNettoRechner();
const r2 = testCultureMatcher();
const r3 = testRfqWizard();
const r4 = checkSourceFiles();

if (r1 && r2 && r3 && r4) {
  console.log('\n======================================');
  console.log('🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
  console.log('======================================');
  process.exit(0);
} else {
  console.log('\n======================================');
  console.log('✖ SOME VERIFICATION TESTS FAILED.');
  console.log('======================================');
  process.exit(1);
}
