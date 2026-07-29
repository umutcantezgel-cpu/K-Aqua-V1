const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const ja = JSON.parse(fs.readFileSync('messages/ja.json', 'utf8'));

const keys = [
  'products', 'solutions', 'academy', 'refs', 'buyers', 'rfq', 'geoContent', 'notFound', 'productsx', 'solutionsx', 'trustx', 'partnerx', 'academyx', 'servicex', 'aboutx', 'newsx', 'contactx', 'careerx', 'refsx', 'finderx', 'co2x', 'homedeep', 'legal', 'navigation', 'cookieConsent', 'seo', 'application', 'menu', 'resources', 'markets', 'wissen', 'productNames', 'customerReviews', 'seoArticle', 'kontaktBlocks', 'kontaktForm', 'enterprise', 'referenzenPage', 'seoExpansion'
];

let chunk = {};
let size = 0;
for (const k of keys) {
  if (!ja[k] && de[k]) {
    const jsonStr = JSON.stringify({[k]: de[k]});
    if (size + jsonStr.length > 25000) break; 
    chunk[k] = de[k];
    size += jsonStr.length;
  }
}
fs.writeFileSync('scratch_chunk.json', JSON.stringify(chunk, null, 2));
console.log('Saved to scratch_chunk.json, keys: ' + Object.keys(chunk).join(', ') + ' Size: ' + size);
