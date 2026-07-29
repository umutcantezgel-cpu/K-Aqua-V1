const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

let injection = `  "servicex": {
    "libEyebrow": "Βιβλιοθήκη",
    "libTitle": "Έγγραφα & Πόροι",
    "libLead": "Βρείτε όλα τα τεχνικά έγγραφα εδώ.",
    "libHead": ${JSON.stringify(de.servicex.libHead)},
    "libRows": ${JSON.stringify(de.servicex.libRows)},
    "libOpen": "Άνοιγμα",
    "libRequest": "Αίτημα",
    "faqEyebrow": "Συχνές Ερωτήσεις",
    "faqTitle": "Απαντήσεις",
    "faq": ${JSON.stringify(de.servicex.faq)},`;

fs.writeFileSync('rep_servicex.txt', injection);
