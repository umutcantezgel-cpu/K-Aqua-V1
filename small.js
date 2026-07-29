const de = require('./messages/de.json');
const keys = ['cookieConsent', 'enterprise', 'co2x', 'seo', 'application', 'homedeep'];
for (const k of keys) {
    console.log(`\n--- ${k} ---`);
    console.log(JSON.stringify(de[k], null, 2));
}
