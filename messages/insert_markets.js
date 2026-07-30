const fs = require('fs');

const lvPath = 'lv.json';
const lvData = JSON.parse(fs.readFileSync(lvPath, 'utf8'));

lvData.markets = {
  industrie: JSON.parse(fs.readFileSync('markets_industrie_lv.json', 'utf8')),
  klimaanlagen: JSON.parse(fs.readFileSync('markets_klima_lv.json', 'utf8')),
  landwirtschaft: JSON.parse(fs.readFileSync('markets_land_lv.json', 'utf8')),
  schiffbau: JSON.parse(fs.readFileSync('markets_schiff_lv.json', 'utf8')),
  trinkwasser: JSON.parse(fs.readFileSync('markets_trink_lv.json', 'utf8'))
};

fs.writeFileSync(lvPath, JSON.stringify(lvData, null, 2), 'utf8');
console.log('Markets inserted successfully');
