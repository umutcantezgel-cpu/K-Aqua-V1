const m = require('./markets_de.json').markets;
const keys = Object.keys(m.landwirtschaft);
const differing = [];
for (let k of keys) {
  if (m.landwirtschaft[k] !== m.schiffbau[k]) {
    differing.push(k);
  }
}
console.log(differing);
