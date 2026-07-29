const fs = require('fs');
const de = require('./messages/de.json').about;

const extract = {
  hero: de.hero,
  intro: de.intro,
  material: de.material,
  timeline: de.timeline
};

fs.writeFileSync('about_missing.json', JSON.stringify(extract, null, 2));
