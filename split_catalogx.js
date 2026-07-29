const fs = require('fs');
const de = require('./scratch/missing_only.json');
const cat = de.catalogx;

// catalogx is probably a big object or array. Let's see what it is.
console.log(Array.isArray(cat) ? "Array" : "Object", Object.keys(cat || {}).length, "keys");
