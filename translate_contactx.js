const fs = require('fs');
const de = require('./messages/de.json').contactx;

const hu = JSON.parse(JSON.stringify(de));
hu.routeEyebrow = "Közvetlen utak";
hu.routeTitle = "Ki miért felel.";
hu.routeLead = "Három postafiók, egyértelmű felelősségi körök: válasz egy munkanapon belül.";
hu.routes[0].t = "Értékesítés és Projektek";
hu.routes[0].d = "Ajánlatok, szállítási idők, feltételek, projekt tanácsadás d20-tól d630-ig.";
hu.routes[1].t = "Minőség és Műszaki Támogatás";
hu.routes[1].d = "Anyaggal és feldolgozással kapcsolatos kérdések, tanúsítványok, reklamációk.";
hu.routes[2].t = "Karrier és Jelentkezés";
hu.routes[2].d = "Jelentkezések és a K-Aqua-nál történő munkavégzéssel kapcsolatos kérdések: közvetlenül Andrea Nickel-nek.";

hu.factsTitle = "Jó tudni";
hu.facts[0] = ["Válaszidő", "Válasz egy munkanapon belül: Projektkérések az értékesítés személyes visszajelzésével"];
hu.facts[1] = ["Helyszín", "KWT GmbH · Auweg 3 · 35647 Waldsolms-Brandoberndorf, Közép-Hessen"];
hu.facts[2] = ["Telefon / Fax", "+49 (0)60 85 / 9868-410 · Fax -420"];
hu.facts[3] = ["Nyelvek", "Német és angol, a weboldal emellett arabul is"];
hu.facts[4] = ["Gyárlátogatás", "Auditok és látogatások az értékesítésen keresztüli időpontegyeztetés alapján"];

hu.mapLabel = "Waldsolms megközelítési térkép, térképrészlet elhelyezése";
hu.faqEyebrow = "Mielőtt írna";
hu.faqTitle = "A négy leggyakoribb kérdés.";
hu.faq[0].q = "Mit kell tartalmaznia egy jó projektkérésnek?";
hu.faq[0].a = "A projekt típusa, a szükséges méretek (durva becslés elegendő), a becsült hosszak, a szállítási régió és az időkeret. Pontosan ezt az öt pontot kérdezi le a strukturált projekt ajánlatkérés, amely két perc alatt kitölthető.";
hu.faq[1].q = "Milyen gyorsan kapok választ?";
hu.faq[1].a = "Egy munkanapon belül: A projektkéréseket az értékesítés személyesen válaszolja meg, a műszaki kérdéseket a támogató csapat.";
hu.faq[2].q = "Meglátogathatom vagy auditálhatom a gyárat?";
hu.faq[2].a = "Igen, időpont egyeztetés alapján. A beszállítói auditokhoz ajánlott előzetesen lekérni az RFP dokumentumcsomagot a Bizalom Központból (Trust Center), így a helyszíni megbeszélés maximálisan hatékony lesz.";
hu.faq[3].q = "Hol találom a tanúsítványokat és a kiírási szövegeket?";
hu.faq[3].a = "ISO tanúsítványok (DE/EN) a Szerviz és Letöltések alatt, a teljes auditcsomag GAEB szövegekkel együtt a Trust Centerben: önkiszolgálóként, várakozási idő nélkül.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject contactx',
  Description: 'Update contactx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "contactx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_contactx.json', JSON.stringify(req, null, 2));
