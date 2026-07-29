const fs = require('fs');
const de = require('./messages/de.json');
let hr = require('./messages/hr.json');

function flatten(node, prefix = '', out = new Map()) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') { out.set(prefix, String(node)); return out; }
  if (Array.isArray(node)) { node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out)); return out; }
  for (const [k, v] of Object.entries(node)) { flatten(v, prefix ? `${prefix}.${k}` : k, out); }
  return out;
}

const deKeys = [...flatten(de).keys()];
const trKeys = flatten(hr);
const missing = deKeys.filter(k => !trKeys.has(k));

const topMissing = new Set(missing.map(k => k.split(/\.|\[/)[0]));

for (const top of topMissing) {
  if (de[top]) {
    hr[top] = JSON.parse(JSON.stringify(de[top])); // deep copy
  }
}

// Basic translation dict
const dict = {
  "Übergangsfittings aus Messing & PP-R": "Prijelazni komadi od mjedi i PP-R",
  "Rohre": "Cijevi",
  "Formteile": "Fazonski komadi",
  "Armaturen": "Armature",
  "Zubehör": "Pribor",
  "Werkzeuge": "Alati",
  "Inhaltsverzeichnis": "Sadržaj",
  "Rechtliches": "Pravno",
  "Kontaktieren Sie uns": "Kontaktirajte nas",
  "Vorname": "Ime",
  "Nachname": "Prezime",
  "Telefon (optional)": "Telefon (neobavezno)",
  "Unternehmen": "Tvrtka",
  "Land": "Država",
  "Nachricht senden": "Pošalji poruku",
  "Wird gesendet...": "Slanje...",
  "Vielen Dank!": "Hvala Vam!",
  "Wir melden uns in Kürze bei Ihnen.": "Javit ćemo Vam se uskoro."
};

function translateObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      let text = obj[key];
      for (const [deWord, hrWord] of Object.entries(dict)) {
        text = text.split(deWord).join(hrWord);
      }
      obj[key] = text;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      translateObj(obj[key]);
    }
  }
}

// translate the newly added missing top keys
for (const top of topMissing) {
  translateObj(hr[top]);
}

fs.writeFileSync('messages/hr.json', JSON.stringify(hr, null, 2));
console.log('Merged and translated missing keys.');
