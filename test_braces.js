const fs = require('fs');
try { JSON.parse(fs.readFileSync('messages/mk.json', 'utf8')); console.log("OK"); }
catch(e) { console.log(e.message); }
