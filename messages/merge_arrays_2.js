const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_final_arrays.json', 'utf8'));

if (patch.krankenhaus && patch.krankenhaus.timeline) {
  lt.solutions.krankenhaus.timeline = patch.krankenhaus.timeline;
}

if (patch.hotels) {
  if (patch.hotels.sticky) lt.solutions.hotels.sticky = patch.hotels.sticky;
  if (patch.hotels.timeline) lt.solutions.hotels.timeline = patch.hotels.timeline;
}

if (patch.vorfertigung && patch.vorfertigung.sticky) {
  lt.solutions.vorfertigung.sticky = patch.vorfertigung.sticky;
}

if (patch.hochhaus) {
  if (patch.hochhaus.sticky) lt.solutions.hochhaus.sticky = patch.hochhaus.sticky;
  if (patch.hochhaus.timeline) lt.solutions.hochhaus.timeline = patch.hochhaus.timeline;
}

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
