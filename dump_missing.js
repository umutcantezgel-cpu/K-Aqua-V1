const de = require('./messages/de.json');
const uz = require('./messages/uz.json');
const keys = [
  "products.narrative",
  "products.transitionFittings.sticky",
  "products.transitionFittings.bento",
  "solutions.krankenhaus.sticky",
  "solutions.krankenhaus.timeline",
  "solutions.krankenhaus.intro",
  "solutions.krankenhaus.stickySection",
  "solutions.krankenhaus.bentoSection",
  "solutions.krankenhaus.bento",
  "solutions.krankenhaus.timelineSection",
  "solutions.krankenhaus.specs",
  "solutions.krankenhaus.bim",
  "solutions.krankenhaus.cta",
  "solutions.hotels.intro",
  "solutions.hotels.bentoSection",
  "solutions.hotels.bento",
  "solutions.hotels.textSection",
  "solutions.hotels.stickySection",
  "solutions.hotels.sticky",
  "solutions.hotels.perf",
  "solutions.hotels.timelineSection",
  "solutions.hotels.timeline",
  "solutions.hotels.research",
  "solutions.hotels.certs",
  "solutions.hotels.cta",
  "solutions.vorfertigung.hero.badge",
  "solutions.vorfertigung.intro",
  "solutions.vorfertigung.sticky",
  "solutions.vorfertigung.bento",
  "solutions.vorfertigung.visual",
  "solutions.vorfertigung.timeline",
  "solutions.vorfertigung.manifesto",
  "solutions.vorfertigung.cta",
  "solutions.hochhaus.intro",
  "solutions.hochhaus.sticky",
  "solutions.hochhaus.bento",
  "solutions.hochhaus.timeline",
  "solutions.hochhaus.data",
  "solutions.hochhaus.cta",
  "solutions.index.meta",
  "solutions.index.sticky",
  "solutionsx"
];
let out = {};
for (const key of keys) {
  let parts = key.split('.');
  let obj = de;
  for (let p of parts) obj = obj[p];
  
  let target = out;
  for (let i = 0; i < parts.length - 1; i++) {
    target[parts[i]] = target[parts[i]] || {};
    target = target[parts[i]];
  }
  target[parts[parts.length-1]] = obj;
}
require('fs').writeFileSync('temp_missing_uz.json', JSON.stringify(out, null, 2));
console.log("Done");
