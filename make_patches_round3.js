const fs = require('fs');
const de = require('./messages/de.json');
const en = require('./messages/en.json');

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

// 1. catalogx items chunks
let itemsObj = processValue(en.catalogx.items);
let itemKeys = Object.keys(itemsObj);
let chunkSize = 20;

for (let i = 0; i < itemKeys.length; i += chunkSize) {
  let chunkKeys = itemKeys.slice(i, i + chunkSize);
  let partialObj = {};
  for (let k of chunkKeys) partialObj[k] = itemsObj[k];
  
  let str = JSON.stringify(partialObj, null, 2);
  // remove leading { and trailing }
  str = str.trim();
  str = str.substring(1, str.length - 1).trim();
  patches.push({ type: 'catalogx_items', content: str, isLast: (i + chunkSize >= itemKeys.length) });
}

// 2. solutions
let solutionsObj = processValue(en.solutions || de.solutions);
let solStr = JSON.stringify(solutionsObj, null, 2);
solStr = solStr.trim();
solStr = solStr.substring(1, solStr.length - 1).trim();
patches.push({ type: 'solutions', content: solStr });

// 3. remaining root keys
const rootKeys = [
  "productsx", "solutionsx", "trustx", "partnerx", "academyx",
  "servicex", "aboutx", "newsx", "contactx", "careerx", "refsx", "finderx", "co2x",
  "homedeep", "legal", "navigation", "cookieConsent", "seo", "application", "menu",
  "quote", "resources", "markets", "wissen", "productNames", "customerReviews",
  "seoArticle", "kontaktBlocks", "kontaktForm", "enterprise", "referenzenPage", "seoExpansion"
];

let currentPatch = {};
let currentSize = 0;
for (let k of rootKeys) {
  let val = processValue(en[k] || de[k]);
  if (!val) continue;
  let s = JSON.stringify(val, null, 2);
  if (currentSize + s.length > 25000) {
    let out = JSON.stringify(currentPatch, null, 2).trim();
    out = out.substring(1, out.length - 1).trim();
    patches.push({ type: 'root', content: ",\n" + out });
    currentPatch = {};
    currentSize = 0;
  }
  currentPatch[k] = val;
  currentSize += s.length;
}
if (Object.keys(currentPatch).length > 0) {
  let out = JSON.stringify(currentPatch, null, 2).trim();
  out = out.substring(1, out.length - 1).trim();
  patches.push({ type: 'root', content: ",\n" + out });
}

fs.writeFileSync('patches_round3.json', JSON.stringify(patches, null, 2));
console.log(`Generated ${patches.length} patches.`);
