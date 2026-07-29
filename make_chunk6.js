const de = require('./messages/de.json');
const sol = de.solutions;
const res = {
  vorfertigung: sol.vorfertigung,
  hochhaus: sol.hochhaus,
  index: sol.index,
  rechenzentrum: sol.rechenzentrum
};
const fs = require('fs');
fs.writeFileSync('chunk6_de.json', JSON.stringify(res, null, 2));
