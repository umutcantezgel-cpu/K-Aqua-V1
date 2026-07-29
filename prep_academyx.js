const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

let injection = `  "academyx": {
    "paramEyebrow": "Παράμετροι",
    "paramTitle": "Ακριβής Έλεγχος",
    "paramLead": "Διατηρώντας τα σωστά πρότυπα σε κάθε βήμα.",
    "paramHead": ${JSON.stringify(de.academyx.paramHead)},
    "paramNote": "Σημείωση: Οι παράμετροι ενδέχεται να διαφέρουν.",
    "stepEyebrow": "Βήματα",
    "stepTitle": "Διαδικασία",
    "stepLead": "Ακολουθήστε τον οδηγό βήμα προς βήμα.",
    "procTabs": ${JSON.stringify(de.academyx.procTabs)},
    "procs": ${JSON.stringify(de.academyx.procs)},
    "errEyebrow": "Σφάλματα",
    "errTitle": "Αντιμετώπιση Προβλημάτων",
    "errHead": ${JSON.stringify(de.academyx.errHead)},
    "errRows": ${JSON.stringify(de.academyx.errRows)},
    "glossEyebrow": "Γλωσσάρι",
    "glossTitle": "Ορολογία",
    "gloss": ${JSON.stringify(de.academyx.gloss)},`;

fs.writeFileSync('rep_academyx.txt', injection);
