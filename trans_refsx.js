const fs = require('fs');
const de = require('./messages/de.json');

const data = {
  refsx: de.refsx
};

fs.writeFileSync('refsx_de.json', JSON.stringify(data, null, 2));
