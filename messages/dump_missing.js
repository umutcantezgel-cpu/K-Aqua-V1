const fs = require('fs');
const de = require('./de.json');

const res = {
  schulungen: {
    "bento.items[3]": de.academy.schulungen.bento.items[3],
    typography: de.academy.schulungen.typography,
    curriculum: de.academy.schulungen.curriculum,
    sticky: de.academy.schulungen.sticky,
    "timeline.items[4]": de.academy.schulungen.timeline.items[4],
    spec: de.academy.schulungen.spec
  },
  zertifizierung: {
    "bento.items[3]": de.academy.zertifizierung.bento.items[3],
    "bento.items[4]": de.academy.zertifizierung.bento.items[4],
    certifications: de.academy.zertifizierung.certifications,
    lab: de.academy.zertifizierung.lab,
    "timeline.items[4]": de.academy.zertifizierung.timeline.items[4],
    cta: de.academy.zertifizierung.cta
  }
};
console.log(JSON.stringify(res, null, 2));
