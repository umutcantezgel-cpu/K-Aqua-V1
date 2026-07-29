const fs = require('fs');
const de = require('./rest_de.json');
fs.writeFileSync('rest1_de.json', JSON.stringify({legal: de.legal, cookieConsent: de.cookieConsent, seo: de.seo}, null, 2));
fs.writeFileSync('rest2_de.json', JSON.stringify({application: de.application, markets: de.markets}, null, 2));
fs.writeFileSync('rest3_de.json', JSON.stringify({wissen: de.wissen, productNames: de.productNames}, null, 2));
fs.writeFileSync('rest4_de.json', JSON.stringify({customerReviews: de.customerReviews, referenzenPage: de.referenzenPage}, null, 2));
