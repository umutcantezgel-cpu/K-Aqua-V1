const fi = require('./messages/fi.json');
const de = require('./messages/de.json');

const aboutFiStr = JSON.stringify(fi.about, null, 2);
console.log("Current length: ", aboutFiStr.length);
