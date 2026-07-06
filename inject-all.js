const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'messages');
const SEGMENTS_DIR = path.join(__dirname, 'kaqua-integrations-segmente');

const segments = [
  '14-sektion-produkte',
  '15-sektion-loesungen',
  '16-sektion-produktfinder',
  '17-sektion-co2-rechner',
  '18-sektion-academy',
  '19-sektion-trust-center',
  '20-sektion-partnerschaft',
  '21-sektion-service',
  '22-sektion-unternehmen',
  '23-sektion-news',
  '24-sektion-kontakt',
  '25-sektion-karriere',
  '26-sektion-referenzen'
];

const messageFiles = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json'));

for (const seg of segments) {
  const uebDir = path.join(SEGMENTS_DIR, seg, 'uebersetzungen');
  
  if (!fs.existsSync(uebDir)) {
    console.log(`Skipping ${seg}, no uebersetzungen folder.`);
    continue;
  }
  
  const enPath = path.join(uebDir, 'en.json');
  const dePath = path.join(uebDir, 'de.json');
  const arPath = path.join(uebDir, 'ar.json');
  
  const enObj = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const deObj = JSON.parse(fs.readFileSync(dePath, 'utf-8'));
  const arObj = JSON.parse(fs.readFileSync(arPath, 'utf-8'));
  
  // The key is the first key in the object
  const keyName = Object.keys(enObj)[0];
  
  const enData = enObj[keyName];
  const deData = deObj[keyName];
  const arData = arObj[keyName];
  
  for (const file of messageFiles) {
    const filePath = path.join(MESSAGES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(content);
    
    let targetData = enData;
    if (file === 'de.json') targetData = deData;
    if (file === 'ar.json') targetData = arData;
    
    data[keyName] = targetData;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  }
  console.log(`Injected ${keyName} into all 12 locales.`);
}
console.log('Done injecting all segments.');
