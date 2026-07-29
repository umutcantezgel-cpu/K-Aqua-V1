const fs = require('fs');
let hu = fs.readFileSync('messages/hu.json', 'utf8');
const refsx = fs.readFileSync('refsx_hu.json', 'utf8');

// refsx is a full JSON object. We just want to extract the inner "refsx": { ... } and append it.
const refsxObj = JSON.parse(refsx);
const huObj = JSON.parse(hu);
huObj.refsx = refsxObj.refsx;

fs.writeFileSync('messages/hu.json', JSON.stringify(huObj, null, 2));
