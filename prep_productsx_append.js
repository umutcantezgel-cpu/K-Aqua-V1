const fs = require('fs');
let t_productsx = fs.readFileSync('t_productsx.json', 'utf8');

// extract the inner contents of productsx
let match = t_productsx.match(/"productsx":\s*\{\s*([\s\S]*)\s*\}/);
let inner = match[1];

let target = `      }
    ]`;

let replacement = `      }
    ],
` + inner;

fs.writeFileSync('target_chunk.txt', target);
fs.writeFileSync('replace_chunk.txt', replacement);
