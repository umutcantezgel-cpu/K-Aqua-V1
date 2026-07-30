const fs = require('fs');
const _ = require('lodash');

const deMissing = JSON.parse(fs.readFileSync('missing_from_de.json', 'utf8'));
const myTranslations = JSON.parse(fs.readFileSync('missing_uz_translations.json', 'utf8'));

// Convert flat myTranslations to deep
const myDeep = {};
for (const [k, v] of Object.entries(myTranslations)) {
  _.set(myDeep, k, v);
}

// Merge them! But wait, myTranslations has wrong structure for trust.certs!
// Let's delete trust.certs from myDeep so it doesn't overwrite deMissing's array.
delete myDeep.trust;
delete myDeep.partner;

// Merge
const finalTranslations = _.merge({}, deMissing, myDeep);

fs.writeFileSync('missing_uz_translations_full.json', JSON.stringify(finalTranslations, null, 2));
