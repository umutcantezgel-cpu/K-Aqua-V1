const log = require('./ko_recover_log.json');

// The chunks are in log[7], log[8], log[9]
// Let's just create the markets object by doing some string manipulation 
// or simply outputting the exact ReplacementContent for each so we can inject them sequentially.

const fs = require('fs');

// The file ko.json currently ends with:
//   "productNames": { ... }
// }

// I can just append log[7], then log[8], then log[9] using multi_replace_file_content!
