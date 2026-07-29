const fs = require('fs');

const de = require('./messages/de.json');
const en = require('./messages/en.json');

const targetKeys = [
  "catalogx", "solutions", "productsx", "solutionsx", "trustx", "partnerx", "academyx",
  "servicex", "aboutx", "newsx", "contactx", "careerx", "refsx", "finderx", "co2x",
  "homedeep", "legal", "navigation", "cookieConsent", "seo", "application", "menu",
  "quote", "resources", "markets", "wissen", "productNames", "customerReviews",
  "seoArticle", "kontaktBlocks", "kontaktForm", "enterprise", "referenzenPage", "seoExpansion"
];

function toAU(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/\bColor\b/g, 'Colour')
    .replace(/\bcolor\b/g, 'colour')
    .replace(/\bColors\b/g, 'Colours')
    .replace(/\bcolors\b/g, 'colours')
    .replace(/\bLaboratories\b/g, 'Labouratories')
    .replace(/\blaboratories\b/g, 'labouratories')
    .replace(/\bLaboratory\b/g, 'Labouratory')
    .replace(/\blaboratory\b/g, 'labouratory')
    .replace(/\bCatalog\b/g, 'Catalogue')
    .replace(/\bcatalog\b/g, 'catalogue')
    .replace(/\bCatalogs\b/g, 'Catalogues')
    .replace(/\bcatalogs\b/g, 'catalogues')
    .replace(/\bOptimization\b/g, 'Optimisation')
    .replace(/\boptimization\b/g, 'optimisation')
    .replace(/\bOptimize\b/g, 'Optimise')
    .replace(/\boptimize\b/g, 'optimise')
    .replace(/\bCustomization\b/g, 'Customisation')
    .replace(/\bcustomization\b/g, 'customisation')
    .replace(/\bCustomize\b/g, 'Customise')
    .replace(/\bcustomize\b/g, 'customise')
    .replace(/\bBehavior\b/g, 'Behaviour')
    .replace(/\bbehavior\b/g, 'behaviour')
    .replace(/\bTheater\b/g, 'Theatre')
    .replace(/\btheater\b/g, 'theatre')
    .replace(/\bCenter\b/g, 'Centre')
    .replace(/\bcenter\b/g, 'centre')
    .replace(/\bCenters\b/g, 'Centres')
    .replace(/\bcenters\b/g, 'centres')
    .replace(/\bMeter\b/g, 'Metre')
    .replace(/\bmeter\b/g, 'metre')
    .replace(/\bMeters\b/g, 'Metres')
    .replace(/\bmeters\b/g, 'metres')
    .replace(/\bLiters\b/g, 'Litres')
    .replace(/\bliters\b/g, 'litres')
    .replace(/\bLiter\b/g, 'Litre')
    .replace(/\bliter\b/g, 'litre');
}

function processValue(val) {
  if (Array.isArray(val)) {
    return val.map(processValue);
  } else if (val !== null && typeof val === 'object') {
    let res = {};
    for (let k in val) {
      res[k] = processValue(val[k]);
    }
    return res;
  } else if (typeof val === 'string') {
    return toAU(val);
  }
  return val;
}

let patches = [];
let currentPatch = {};
let currentSize = 0;
const MAX_SIZE = 25000;

function flush() {
  if (Object.keys(currentPatch).length > 0) {
    let text = JSON.stringify(currentPatch, null, 2);
    // remove leading and trailing { } to get just the comma-separated contents
    text = text.trim();
    text = text.substring(1, text.length - 1).trim();
    text = ",\n" + text;
    patches.push({ replacement: text });
    currentPatch = {};
    currentSize = 0;
  }
}

// Ensure catalogx items are included completely now
for (let key of targetKeys) {
  if (de[key] !== undefined) {
    let srcData = en[key];
    if (!srcData) {
      // Fallback to German if completely missing in en
      srcData = de[key];
    }
    
    let processed = processValue(srcData);
    let jsonStr = JSON.stringify(processed, null, 2);
    
    if (currentSize + jsonStr.length > MAX_SIZE) {
      flush();
    }
    
    currentPatch[key] = processed;
    currentSize += jsonStr.length;
  }
}
flush();

fs.writeFileSync('patches_round2.json', JSON.stringify(patches, null, 2));
console.log(`Generated ${patches.length} patches in round 2`);
