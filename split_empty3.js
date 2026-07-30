const fs = require('fs');
const data = require('./catalogx_empty3.json');
const keys = Object.keys(data);
const part1 = {}, part2 = {}, part3 = {};

const third = Math.ceil(keys.length / 3);
keys.slice(0, third).forEach(k => part1[k] = data[k]);
keys.slice(third, third*2).forEach(k => part2[k] = data[k]);
keys.slice(third*2).forEach(k => part3[k] = data[k]);

let p1 = JSON.stringify(part1, null, 2).slice(1, -2) + ',';
let p2 = JSON.stringify(part2, null, 2).slice(1, -2) + ',';
let p3 = JSON.stringify(part3, null, 2).slice(1, -1); // leave trailing \n}

fs.writeFileSync('empty3_1.txt', p1);
fs.writeFileSync('empty3_2.txt', p2);
fs.writeFileSync('empty3_3.txt', p3);
