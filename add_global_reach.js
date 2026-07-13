const fs = require('fs');
const path = require('path');

const msgsDir = path.join(__dirname, 'messages');
const files = fs.readdirSync(msgsDir).filter(f => f.endsWith('.json'));

const texts = {
  de: {
    grEyebrow: "Global Reach",
    grTitle1: "Internationale",
    grTitle2: "Handelsrouten",
    grLead: "Von Deutschland in die Welt: Unsere K-Aqua Rohrsysteme sind das Rückgrat der modernsten Megaprojekte weltweit. Von NEOM in Saudi-Arabien bis zu hochkomplexen Industrieanlagen in Singapur.",
    grHqLabel: "HQ & Produktion",
    grHqValue: "Deutschland (Frankfurt)",
    grExportLabel: "Key Export Markets",
    grExportValue: "Saudi-Arabien (NEOM), VAE, Katar, Lateinamerika",
    grCta: "Weltweite Projekte entdecken"
  },
  en: {
    grEyebrow: "Global Reach",
    grTitle1: "International",
    grTitle2: "Trade Routes",
    grLead: "From Germany to the world: Our K-Aqua pipe systems are the backbone of the most modern megaprojects globally. From NEOM in Saudi Arabia to highly complex industrial plants in Singapore.",
    grHqLabel: "HQ & Production",
    grHqValue: "Germany (Frankfurt)",
    grExportLabel: "Key Export Markets",
    grExportValue: "Saudi Arabia (NEOM), UAE, Qatar, Latin America",
    grCta: "Discover worldwide projects"
  }
};

for (const f of files) {
  const p = path.join(msgsDir, f);
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  
  if (!data.homex) data.homex = {};
  
  const isDe = f === 'de.json';
  const src = isDe ? texts.de : texts.en;
  
  Object.assign(data.homex, src);
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}
console.log("Added Global Reach texts to all languages!");
