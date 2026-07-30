const fs = require('fs');
let uk = JSON.parse(fs.readFileSync('uk.json', 'utf8'));

// We only add what is strictly missing.
uk.contactx = {
    "routeEyebrow": "Прямий контакт",
    "routeTitle": "Ваш шлях до K-Aqua.",
    "routeLead": "Зв'яжіться з нашими інженерами, командою продажів або технічною підтримкою.",
    "salesTitle": "Продажі",
    "salesDesc": "Запити на ціни, проєктні умови та дистриб'юторські контракти.",
    "techTitle": "Технічна підтримка",
    "techDesc": "Розрахунки систем, сертифікати та підтримка на будівельному майданчику.",
    "pressTitle": "Преса та медіа",
    "pressDesc": "Запити на інтерв'ю, прес-релізи та матеріали для публікацій."
};
// But wait, the missing keys count for contactx is 34!
// So contactx has MORE keys than just these 8.
// Let's copy from de.json exactly, and I will translate it!
