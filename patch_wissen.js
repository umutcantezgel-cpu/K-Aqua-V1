const fs = require('fs');
let hu = JSON.parse(fs.readFileSync('messages/hu.json', 'utf8'));

hu.wissen.hero = {
  "eyebrow": "Anyagtudomány",
  "title1": "Tudnivalók a",
  "title2": "K-Aqua-ról.",
  "desc": "Értse meg azokat a fizikai elveket, amelyek rendszereinket elpusztíthatatlanná teszik.",
  "cta1": "Műszaki specifikációk",
  "cta2": "Kapcsolat az Akadémiával"
};

hu.wissen.timeline = {
  "title": "Az extrudálástól az építkezésig.",
  "desc": "Átláthatóság az ellátási láncban, kompromisszummentes kivitelezés.",
  "items": [
    { "year": "1. Fázis", "title": "Nyersanyag Kiválasztása", "text": "Csak európai prémium gyártók tanúsított PPR-C és PPRCT granulátumai felelnek meg a szigorú bejövő ellenőrzésünknek." },
    { "year": "2. Fázis", "title": "Extrudálás & Fröccsöntés", "text": "Teljesen automatizált gyártósorok garantálják a mikrométeres pontosságú falvastagságot ultrahangos vezérléssel." },
    { "year": "3. Fázis", "title": "Tesztelés", "text": "Minden tételt belső nyomásvizsgálatnak, ejtőpróbának és méretellenőrzésnek vetnek alá a gyári laboratóriumunkban." },
    { "year": "4. Fázis", "title": "Engedélyezés & Szállítás", "text": "Az anyagot csak akkor szállítjuk a globális építkezésekre, ha az 100%-ban megfelel a német minőségi szabványoknak." }
  ]
};

hu.wissen.faq = {
  "eyebrow": "Gyakran Ismételt Kérdések",
  "title": "Tudásbázis GYIK",
  "items": [
    { "q": "Mi az a PPRCT?", "a": "A PPRCT a módosított kristályszerkezetű, továbbfejlesztett PP-R (polipropilén random kopolimer) anyagot jelenti. Akár 50%-kal nagyobb nyomásállóságot biztosít magas hőmérsékleten, lehetővé téve a vékonyabb falvastagságot és a nagyobb áramlási volument azonos külső átmérő mellett." },
    { "q": "Mennyi a K-Aqua csövek várható élettartama?", "a": "A DIN EN ISO 15874 szabvány szerinti szakszerű telepítés és a meghatározott nyomás-/hőmérsékleti határértékeken belüli üzemeltetés esetén rendszereink számított élettartama jóval meghaladja az 50 évet." },
    { "q": "Használhatók a csövek kültéren is?", "a": "A PP-R alapvetően érzékeny az UV-sugárzásra. Ha a csöveket tartósan közvetlen napfénynek teszik ki (pl. tetőkön), megfelelően szigetelni kell őket, vagy fekete, UV-álló speciális csöveinket kell használni." },
    { "q": "A rendszer kombatibilis más anyagokkal?", "a": "Igen, kínálunk speciális átmeneti idomokat (sárgaréz vagy rozsdamentes acél menettel) a fémcsövekhez, szelepekhez vagy szivattyúkhoz való problémamentes csatlakoztatáshoz." }
  ]
};

// I am writing a patch script just to create a replacement string!
fs.writeFileSync('wissen_insert.json', JSON.stringify({
  timeline: hu.wissen.timeline,
  hero: hu.wissen.hero,
  faq: hu.wissen.faq
}, null, 2));
