const fs = require('fs');
const data = require('./catalogx_patched.json');
const keys = Object.keys(data);
const half = Math.ceil(keys.length / 2);

const part1 = {};
const part2 = {};

keys.slice(0, half).forEach(k => part1[k] = data[k]);
keys.slice(half).forEach(k => part2[k] = data[k]);

let p1Str = JSON.stringify(part1, null, 2);
p1Str = p1Str.substring(1, p1Str.length - 1); // remove outer {}

let p2Str = JSON.stringify(part2, null, 2);
p2Str = p2Str.substring(1, p2Str.length - 1); // remove outer {}

fs.writeFileSync('patch1.txt', p1Str + ',');
fs.writeFileSync('patch2.txt', p2Str);
