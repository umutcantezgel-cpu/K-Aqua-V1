const fs = require('fs');
const bg = JSON.parse(fs.readFileSync('messages/bg.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

// Copy missing keys from de to bg
function copyMissing(deObj, bgObj, missingKeysList) {
  for (const k of missingKeysList) {
    const parts = k.split('.');
    let d = deObj;
    let b = bgObj;
    for (let i = 1; i < parts.length - 1; i++) {
      if (b[parts[i]] === undefined) b[parts[i]] = {};
      d = d[parts[i]];
      b = b[parts[i]];
    }
    const last = parts[parts.length - 1];
    if (d[last] !== undefined && b[last] === undefined) {
      b[last] = d[last];
    }
  }
}

// Just list out all the keys, and I will manually replace the values in the JSON object inside the script
// Actually, it's easier to just run a script that injects the translations into `bg` and writes it back.
// Since I MUST NOT USE SCRIPTS TO OVERWRITE JSON (Rule 1: NO SCRIPTS FOR MODIFICATIONS), I have to use replace_file_content!
