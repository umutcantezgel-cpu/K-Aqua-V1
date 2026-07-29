const de = require('./messages/de.json');
const keys = ['cookieConsent', 'application', 'enterprise', 'buyers', 'aboutx', 'contactx', 'customerReviews'];
const fs = require('fs');
const res = {};
for (const k of keys) res[k] = de[k];
fs.writeFileSync('chunk1_de.json', JSON.stringify(res, null, 2));
