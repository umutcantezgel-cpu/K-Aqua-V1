const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const missing = {
  productsx: de.productsx,
  solutionsx: de.solutionsx,
  partnerx: de.partnerx,
  academyx: de.academyx,
  servicex: de.servicex,
  aboutx: de.aboutx,
  newsx: de.newsx,
  contactx: de.contactx,
  careerx: de.careerx,
  refsx: de.refsx,
  markets: de.markets,
  kontaktBlocks: de.kontaktBlocks,
  kontaktForm: de.kontaktForm,
  enterprise: de.enterprise,
  referenzenPage: de.referenzenPage
};
fs.writeFileSync('de_missing.json', JSON.stringify(missing, null, 2));
