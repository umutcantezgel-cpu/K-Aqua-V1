const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_final_lt.json', 'utf8'));

if (patch.krankenhaus && patch.krankenhaus.sticky) {
  lt.solutions.krankenhaus.sticky = patch.krankenhaus.sticky;
}

if (patch.index) {
  if (!lt.solutions.index) lt.solutions.index = {};
  if (patch.index.sticky) lt.solutions.index.sticky = patch.index.sticky;
  if (patch.index.timeline) lt.solutions.index.timeline = patch.index.timeline;
  if (patch.index.bento) lt.solutions.index.bento = patch.index.bento;
}

if (patch.rechenzentrum) {
  lt.solutions.rechenzentrum = patch.rechenzentrum;
}

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
