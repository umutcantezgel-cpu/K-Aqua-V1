const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));

let p1 = JSON.parse(fs.readFileSync('patch_support.json', 'utf8'));
let p2 = JSON.parse(fs.readFileSync('patch_common.json', 'utf8'));
let p3 = JSON.parse(fs.readFileSync('patch_downloads.json', 'utf8'));
let p4 = JSON.parse(fs.readFileSync('patch_resources_2.json', 'utf8'));

lt.resources = {
  ...p1,
  ...p2,
  ...p3,
  ...p4
};

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
