const fs = require('fs');

const myStr = fs.readFileSync('messages/my.json', 'utf8');
const my = JSON.parse(myStr);
const deStr = fs.readFileSync('messages/de.json', 'utf8');
const de = JSON.parse(deStr);

const academy = my.academy;

function alignArray(myArr, deArr, keyMapping) {
  if (!myArr || !deArr) return myArr;
  return myArr.map((item, i) => {
    const deItem = deArr[i] || deArr[0]; // fallback
    const newItem = {};
    for (const [myKey, deKey] of Object.entries(keyMapping)) {
       // if myKey exists, use it, otherwise keep deKey structure
       if (item[myKey]) newItem[deKey] = item[myKey];
       else if (item[deKey]) newItem[deKey] = item[deKey];
       else newItem[deKey] = ''; 
    }
    // Also copy any remaining keys from myItem
    for (const k in item) {
       if (!keyMapping[k] && Object.values(keyMapping).indexOf(k) === -1) {
           newItem[k] = item[k];
       }
    }
    // ensure exact keys as deItem
    const finalItem = {};
    for (const k in deItem) {
       finalItem[k] = newItem[k] !== undefined ? newItem[k] : (item[k] !== undefined ? item[k] : (item['t'] || item['d'] || item['desc'] || ''));
    }
    return finalItem;
  });
}

// schulungen
if (academy.schulungen) {
  academy.schulungen.bento.items = alignArray(academy.schulungen.bento.items, de.academy.schulungen.bento.items, { t: 'title', d: 'desc' });
  academy.schulungen.sticky.items = alignArray(academy.schulungen.sticky.items, de.academy.schulungen.sticky.items, { t: 'title', d: 'desc' });
  academy.schulungen.timeline.items = alignArray(academy.schulungen.timeline.items, de.academy.schulungen.timeline.items, { year: 'year', title: 'title', desc: 'text' });
  academy.schulungen.spec.items = alignArray(academy.schulungen.spec.items, de.academy.schulungen.spec.items, { t: 'title', d: 'text' });
}

// zertifizierung
if (academy.zertifizierung) {
  academy.zertifizierung.bento.items = alignArray(academy.zertifizierung.bento.items, de.academy.zertifizierung.bento.items, { t: 'title', d: 'desc' });
  academy.zertifizierung.certifications.items = alignArray(academy.zertifizierung.certifications.items, de.academy.zertifizierung.certifications.items, { t: 'title', d: 'p1' });
  academy.zertifizierung.lab.items = alignArray(academy.zertifizierung.lab.items, de.academy.zertifizierung.lab.items, { t: 'title', d: 'desc' });
  academy.zertifizierung.timeline.items = alignArray(academy.zertifizierung.timeline.items, de.academy.zertifizierung.timeline.items, { title: 'title', desc: 'text' }); // year is missing
}

// glossar
if (academy.glossar) {
  academy.glossar.bento.items = alignArray(academy.glossar.bento.items, de.academy.glossar.bento.items, { t: 'title', d: 'desc' });
  academy.glossar.timeline.items = alignArray(academy.glossar.timeline.items, de.academy.glossar.timeline.items, { title: 'title', desc: 'text' });
}

fs.writeFileSync('chunk_schulungen_fixed.txt', `"schulungen": ${JSON.stringify(academy.schulungen, null, 2)},`);
fs.writeFileSync('chunk_zertifizierung_fixed.txt', `"zertifizierung": ${JSON.stringify(academy.zertifizierung, null, 2)},`);
fs.writeFileSync('chunk_glossar_fixed.txt', `"glossar": ${JSON.stringify(academy.glossar, null, 2)},`);
