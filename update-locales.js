const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'messages');
const EN_PATH = path.join(__dirname, 'kaqua-integrations-segmente/13-sektion-startseite/uebersetzungen/en.json');
const DE_PATH = path.join(__dirname, 'kaqua-integrations-segmente/13-sektion-startseite/uebersetzungen/de.json');
const AR_PATH = path.join(__dirname, 'kaqua-integrations-segmente/13-sektion-startseite/uebersetzungen/ar.json');

const enHomedeep = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8')).homedeep;
const deHomedeep = JSON.parse(fs.readFileSync(DE_PATH, 'utf-8')).homedeep;
const arHomedeep = JSON.parse(fs.readFileSync(AR_PATH, 'utf-8')).homedeep;

const files = fs.readdirSync(MESSAGES_DIR).filter(file => file.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(MESSAGES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  let data = JSON.parse(content);
  
  if (data.homedeep) {
    console.log(`homedeep already in ${file}`);
    return;
  }
  
  let homedeepData = enHomedeep;
  if (file === 'de.json') homedeepData = deHomedeep;
  if (file === 'ar.json') homedeepData = arHomedeep;
  
  // Add as the first key
  const newData = { homedeep: homedeepData, ...data };
  
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2) + '\n');
  console.log(`Updated ${file}`);
});
