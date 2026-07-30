const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const missing = {
  customerReviews: de.customerReviews,
  seoArticle: de.seoArticle,
  productNames: de.productNames
};
fs.writeFileSync('de_missing2.json', JSON.stringify(missing, null, 2));
