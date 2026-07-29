const fs = require('fs');
const de = require('./scratch/missing_only.json');
const cat = de.catalogx;
for (const k of Object.keys(cat)) {
  console.log(`${k}: ${JSON.stringify(cat[k], null, 2).split('\n').length} lines`);
}
