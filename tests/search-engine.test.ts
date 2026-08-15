// tests/search-engine.test.ts
// Automatische Test-Suite für K-Aqua Search-Engine, Ranking, Snippets & Normalisierung

import { SEARCH_INDEX } from '../lib/search-data';
import {
  searchKAqua,
  normalizeSearchText,
  generateSearchSnippet,
  buildDeepLink,
} from '../lib/search-engine';

interface TestStats {
  passed: number;
  failed: number;
  total: number;
}

const stats: TestStats = { passed: 0, failed: 0, total: 0 };

function assert(condition: boolean, testName: string, details?: string) {
  stats.total++;
  if (condition) {
    stats.passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    stats.failed++;
    console.error(`  ✗ FAIL: ${testName}${details ? ` (${details})` : ''}`);
  }
}

console.log('====================================================');
console.log('🧪 RUNNING K-AQUA OMNI-SEARCH TEST SUITE');
console.log('====================================================\n');

// ----------------------------------------------------
// 1. SEARCH INDEX INTEGRITY TESTS
// ----------------------------------------------------
console.log('📁 1. Testing Search Index Integrity...');

assert(SEARCH_INDEX.length >= 25, 'Index contains at least 25 core entries', `Actual: ${SEARCH_INDEX.length}`);

let allEntriesHaveValidPaths = true;
let allEntriesHaveTitles = true;
let allEntriesHaveDescriptions = true;
let allEntriesHaveKeywords = true;

for (const entry of SEARCH_INDEX) {
  if (!entry.id || !entry.href || !entry.href.startsWith('/')) {
    allEntriesHaveValidPaths = false;
  }
  if (!entry.title || !entry.title.de || !entry.title.en) {
    allEntriesHaveTitles = false;
  }
  if (!entry.description || !entry.description.de || !entry.description.en) {
    allEntriesHaveDescriptions = false;
  }
  if (!entry.keywords || entry.keywords.length === 0) {
    allEntriesHaveKeywords = false;
  }
}

assert(allEntriesHaveValidPaths, 'All entries have valid href starting with "/"');
assert(allEntriesHaveTitles, 'All entries have valid localized titles (de, en)');
assert(allEntriesHaveDescriptions, 'All entries have valid localized descriptions (de, en)');
assert(allEntriesHaveKeywords, 'All entries have non-empty keywords lists');

// ----------------------------------------------------
// 2. TEXT NORMALIZATION TESTS
// ----------------------------------------------------
console.log('\n🔤 2. Testing Text Normalization & Umlaut Resilience...');

assert(
  normalizeSearchText('PP-RCT Rohr (SDR 7.4)') === 'pp rct rohr sdr 7 4',
  'Normalizes hyphens and parentheses',
  normalizeSearchText('PP-RCT Rohr (SDR 7.4)')
);

assert(
  normalizeSearchText('Schweißen & Übergänge') === 'schweissen uebergaenge',
  'Normalizes German umlauts and eszett',
  normalizeSearchText('Schweißen & Übergänge')
);

assert(
  normalizeSearchText('   K-FIBER   UV   ') === 'k fiber uv',
  'Trims and collapses multiple spaces',
  normalizeSearchText('   K-FIBER   UV   ')
);

// ----------------------------------------------------
// 3. SNIPPET GENERATOR TESTS
// ----------------------------------------------------
console.log('\n✂️ 3. Testing Dynamic Snippet Generation...');

const sampleText =
  'In modernen Gebäuden ist der Schallschutz von zentraler Bedeutung. K-Aqua PP-R Rohrsysteme bieten hervorragende Dämpfungseigenschaften gegen Fließgeräusche und Druckschläge.';

const snippetAcoustic = generateSearchSnippet(sampleText, 'Schallschutz', 80);
assert(
  snippetAcoustic.includes('Schallschutz'),
  'Snippet contains the searched term',
  snippetAcoustic
);
assert(
  snippetAcoustic.length <= 95,
  'Snippet length stays within bounds',
  `Length: ${snippetAcoustic.length}`
);

const snippetNotFound = generateSearchSnippet(sampleText, 'NonExistentTerm', 50);
assert(
  snippetNotFound.endsWith('...'),
  'Falls back to beginning with ellipsis if term not found',
  snippetNotFound
);

// ----------------------------------------------------
// 4. DEEP-LINK BUILDER TESTS
// ----------------------------------------------------
console.log('\n🔗 4. Testing Deep-Link Builder...');

const sampleEntry = SEARCH_INDEX[0];
if (sampleEntry) {
  const deepLink = buildDeepLink(sampleEntry, 'PP-RCT');
  assert(
    deepLink.includes('highlight=PP-RCT'),
    'Appends URL-encoded highlight parameter',
    deepLink
  );

  if (sampleEntry.anchorId) {
    assert(
      deepLink.includes(`#${sampleEntry.anchorId}`),
      'Appends anchor ID if present',
      deepLink
    );
  }
}

// ----------------------------------------------------
// 5. SEARCH & RANKING TESTS
// ----------------------------------------------------
console.log('\n🎯 5. Testing Search Engine Ranking & Relevance...');

// Test 5.1: Exact Article Code Match
const codeResults = searchKAqua({ query: 'AQ200F20', locale: 'de' });
assert(
  codeResults.length > 0 && codeResults[0]?.entry.articleCodes?.includes('AQ200F20') === true,
  'Article code query "AQ200F20" ranks the exact product #1',
  codeResults[0]?.entry?.title?.de
);
assert(
  (codeResults[0]?.score ?? 0) >= 200,
  'Article code yields high priority score',
  `Score: ${codeResults[0]?.score}`
);

// Test 5.2: Query "Schallschutz"
const soundResults = searchKAqua({ query: 'Schallschutz', locale: 'de' });
assert(
  soundResults.length > 0,
  'Finds results for "Schallschutz"',
  `Count: ${soundResults.length}`
);
assert(
  Boolean(soundResults[0]?.entry?.title?.de?.includes('Schallschutz')) ||
    Boolean(soundResults[0]?.entry?.keywords?.includes('schallschutz')),
  'Top result for "Schallschutz" is acoustic article or pipe clamp',
  soundResults[0]?.entry?.title?.de
);

// Test 5.3: Category Filtering
const toolResults = searchKAqua({ query: 'Rechner', category: 'tools', locale: 'de' });
assert(
  toolResults.every((r) => r.entry.category === 'tools'),
  'Category filter restricts results exclusively to "tools"'
);
assert(
  toolResults.some((r) => r.entry.id === 'tool_co2_calculator'),
  'Category filter finds CO2 calculator under "tools"'
);

// Test 5.4: Multilingual Query (English)
const englishResults = searchKAqua({ query: 'Welding', locale: 'en' });
assert(
  englishResults.length > 0,
  'Finds results for English term "Welding"',
  `Count: ${englishResults.length}`
);

// Test 5.5: Multilingual Query (Arabic)
const arabicResults = searchKAqua({ query: 'أنابيب', locale: 'ar' });
assert(
  arabicResults.length > 0,
  'Finds results for Arabic term "أنابيب"',
  `Count: ${arabicResults.length}`
);

// Test 5.6: Forgiving Hyphen Search ("PPRCT" should find "PP-RCT")
const fuzzyResults = searchKAqua({ query: 'PPRCT', locale: 'de' });
assert(
  fuzzyResults.length > 0,
  'Finds PP-RCT entries when searching without hyphen "PPRCT"',
  fuzzyResults[0]?.entry?.title?.de
);

// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log('\n====================================================');
console.log(`📊 TEST RESULTS: ${stats.passed} Passed, ${stats.failed} Failed (Total: ${stats.total})`);
console.log('====================================================');

if (stats.failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SEARCH ENGINE TESTS PASSED SUCCESSFULLY!\n');
}
