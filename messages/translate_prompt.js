const fs = require('fs');
const de = JSON.parse(fs.readFileSync('de.json', 'utf8'));

const extract = {
  kontaktForm: de.kontaktForm,
  customerReviews: de.customerReviews,
  kontaktBlocks: de.kontaktBlocks
};

fs.writeFileSync('to_translate.json', JSON.stringify(extract, null, 2));
