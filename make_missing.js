const fs = require('fs');
const de = require('./messages/de.json');
const kk = require('./messages/kk.json');

const missingPaths = [
  "catalogx", "products", "about", "academy", "rfq", "geoContent",
  "productsx", "solutionsx", "trustx", "partnerx", "academyx", "servicex",
  "aboutx", "newsx", "contactx", "careerx", "refsx", "finderx", "co2x",
  "homedeep", "legal", "resources", "markets", "seoArticle"
];

let extract = {};
for (const p of missingPaths) {
  extract[p] = de[p];
}
fs.writeFileSync('tmp_missing_all.json', JSON.stringify(extract, null, 2));
