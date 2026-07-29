const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const ja = JSON.parse(fs.readFileSync('messages/ja.json', 'utf8'));

// Keys to process
const missingTopLevel = [
  'products', 'solutions', 'academy', 'refs', 'buyers', 'rfq', 'geoContent', 'notFound', 'productsx', 'solutionsx', 'trustx', 'partnerx', 'academyx', 'servicex', 'aboutx', 'newsx', 'contactx', 'careerx', 'refsx', 'finderx', 'co2x', 'homedeep', 'legal', 'navigation', 'cookieConsent', 'seo', 'application', 'menu', 'resources', 'markets', 'wissen', 'productNames', 'customerReviews', 'seoArticle', 'kontaktBlocks', 'kontaktForm', 'enterprise', 'referenzenPage', 'seoExpansion', 'catalogx'
];

let currentChunk = {};
let currentSize = 0;
let chunkIndex = 1;

function saveChunk() {
  fs.writeFileSync(`scratch_translate_${chunkIndex}.json`, JSON.stringify(currentChunk, null, 2));
  console.log(`Created scratch_translate_${chunkIndex}.json (Size: ${currentSize})`);
  chunkIndex++;
  currentChunk = {};
  currentSize = 0;
}

for (const topKey of missingTopLevel) {
  if (!de[topKey]) continue;
  
  // If top level object is big, let's split its keys if it's an object (and not array)
  const isLarge = JSON.stringify(de[topKey]).length > 25000;
  
  if (isLarge && !Array.isArray(de[topKey]) && typeof de[topKey] === 'object') {
    currentChunk[topKey] = {};
    for (const [subKey, subVal] of Object.entries(de[topKey])) {
      const subStr = JSON.stringify({[subKey]: subVal});
      if (currentSize + subStr.length > 25000) {
        saveChunk();
        currentChunk[topKey] = {}; // Start new chunk with same top level key
      }
      currentChunk[topKey][subKey] = subVal;
      currentSize += subStr.length;
    }
  } else {
    const str = JSON.stringify({[topKey]: de[topKey]});
    if (currentSize + str.length > 25000) {
      saveChunk();
    }
    currentChunk[topKey] = de[topKey];
    currentSize += str.length;
  }
}
if (currentSize > 0) saveChunk();
