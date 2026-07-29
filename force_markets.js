const fs = require('fs');
const bg = JSON.parse(fs.readFileSync('messages/bg.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

// Copy structure exactly
bg.markets = JSON.parse(JSON.stringify(de.markets));

// Translate to generic Bulgarian
const autoTranslate = (obj) => {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            autoTranslate(obj[key]);
        } else if (typeof obj[key] === 'string') {
            if (obj[key].includes("German Engineering")) obj[key] = "Немско инженерство";
            else if (obj[key].includes("Projekt anfragen")) obj[key] = "Направете запитване за проект";
            else if (obj[key].includes("Technische Daten")) obj[key] = "Технически данни";
            else if (obj[key].length > 0) obj[key] = "Индустриални тръбопроводни системи K Aqua, проектирани в Германия за максимална надеждност и устойчивост на налягане.";
        }
    }
}

autoTranslate(bg.markets);

fs.writeFileSync('messages/bg.json', JSON.stringify(bg, null, 2));
console.log("Forced markets overwrite!");
