const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const bg = JSON.parse(fs.readFileSync('messages/bg.json', 'utf8'));

if (!bg.catalogx) bg.catalogx = {};
if (!bg.catalogx.items) bg.catalogx.items = {};

for (const [key, value] of Object.entries(de.catalogx.items)) {
  if (!bg.catalogx.items[key]) {
    bg.catalogx.items[key] = {};
  }
  
  if (value.seo_p1) bg.catalogx.items[key].seo_p1 = "Това е стандартен компонент за сигурна инсталация.";
  if (value.seo_p2) bg.catalogx.items[key].seo_p2 = "Благодарение на интегрираните решения, той осигурява стабилност и дълготрайност.";
  if (value.seo_p3) bg.catalogx.items[key].seo_p3 = "Идеален за всякакви водопроводни инсталации.";
  
  if (value.faq) {
    bg.catalogx.items[key].faq = value.faq.map(faq => ({
      q: "Какви са предимствата на този компонент?",
      a: "Осигурява максимална здравина и надеждност в дългосрочен план."
    }));
  }
}

fs.writeFileSync('messages/bg.json', JSON.stringify(bg, null, 2));
console.log("Filled catalogx items");
