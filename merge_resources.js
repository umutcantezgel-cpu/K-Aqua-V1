const fs = require('fs');

const support = JSON.parse(fs.readFileSync('resources_support.json', 'utf8')).resources;
const rest = JSON.parse(fs.readFileSync('resources_rest.json', 'utf8'));

const full = {
  resources: {
    ...support,
    ...rest
  }
};

fs.writeFileSync('resources_full.json', JSON.stringify(full, null, 2));
