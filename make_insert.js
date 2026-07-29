const fs = require('fs');

let out = `    "fallback": {
      "kicker": "Контакт",
      "head": "Говорете директно с нашите инженери.",
      "short": "Директна връзка",
      "text": "Оставете вашия телефонен номер, имейл и тема. Останалото ще изясним в разговор.",
      "interest": "Консултация",
      "done": "Експерт ще се свърже с вас в рамките на един работен ден."
    },
`;

for(let i=1; i<=4; i++) {
  const data = fs.readFileSync(`kontaktBlocks_bg_${i}.json`, 'utf8');
  let inner = data.substring(data.indexOf('\n') + 1, data.lastIndexOf('\n'));
  out += inner + (i < 4 ? ',\n' : '\n');
}

fs.writeFileSync('insert.txt', out);
