const fs = require('fs');
const de = require('./messages/de.json').servicex;

const hu = JSON.parse(JSON.stringify(de));
hu.libEyebrow = "Dokumentumkönyvtár";
hu.libTitle = "Minden dokumentum, egyetlen áttekintés.";
hu.libLead = "Három katalógus közvetlen letöltésre, tanúsítványok két nyelven és az audit dokumentumok önkiszolgáló jelleggel a Bizalom Központban (Trust Center).";
hu.libHead = ["Dokumentum", "Tartalom", "Nyelv", "Hozzáférés"];

hu.libRows[0].t = "K-Aqua Termékprogram";
hu.libRows[0].s = "Teljes katalógus: Méretek, Cikkek, Rendszeráttekintés";
hu.libRows[1].t = "K-Aqua Terméktulajdonságok";
hu.libRows[1].s = "Műszaki jellemzők és anyagadatok";
hu.libRows[2].t = "K-Aqua Minőségbiztosítás";
hu.libRows[2].s = "Vizsgálati eljárások és minőségi szabványok";
hu.libRows[3].t = "ISO Tanúsítványok (Német)";
hu.libRows[3].s = "ISO 9001 · 14001 · 50001, DAkkS-akkreditált";
hu.libRows[4].t = "ISO Certificates (English)";
hu.libRows[4].s = "ISO 9001 · 14001 · 50001, DAkkS-accredited";
hu.libRows[5].t = "GENAU-Politika és Kockázatértékelés";
hu.libRows[5].s = "Irányítási rendszer, Megelőzés, Veszélyelemzés";
hu.libRows[6].t = "EPD Adatlapok (Typ III, EN 15804)";
hu.libRows[6].s = "Életciklus-értékelési adatok LEED, BREEAM, DGNB rendszerekhez";
hu.libRows[7].t = "GAEB Kiírási szövegek";
hu.libRows[7].s = "Kész szövegek a teljesítménykiírásokhoz";
hu.libRows[8].t = "Minőségbiztosítási Kézikönyv";
hu.libRows[8].s = "QA-folyamatok beszállítói auditokhoz";

hu.libOpen = "Letöltés";
hu.libRequest = "Kérés a Bizalom Központban";

hu.supEyebrow = "Támogatási csatornák";
hu.supTitle = "Három út a válaszhoz.";
hu.supLead = "A kéréstől függően egy másik út vezet a leggyorsabban a célhoz, mindegyik egy munkanapon belüli válasszal.";

hu.sup[0].t = "Értékesítés és Projektek";
hu.sup[0].d = "Ajánlatok, feltételek, szállítási idők és projekt tanácsadás. Vagy közvetlenül a projekt ajánlatkérés öt lépésben.";
hu.sup[1].t = "Minőség és Műszaki Támogatás";
hu.sup[1].d = "Anyaggal, tervezéssel és feldolgozással kapcsolatos kérdések, tanúsítványok ellenőrzése, panaszok a minőségbiztosítási kézikönyv szerint.";
hu.sup[2].t = "Feldolgozás és Akadémia";
hu.sup[2].d = "Négy hegesztési eljárás videóként plusz paramétertáblázatok: betanítás az Ön csapata számára egyeztetés alapján.";
hu.sup[2].c = "Tovább az Akadémiához";

hu.faqEyebrow = "Szerviz GYIK";
hu.faqTitle = "Gyors válaszok.";
hu.faq[0].q = "Milyen dokumentumokra van szükségem a tervezéshez?";
hu.faq[0].a = "Termékprogram (méretek és cikkek), terméktulajdonságok (anyagadatok) és a projekttől függően a mérettáblázatok a termékoldalon. Kiírásokhoz GAEB szövegek és EPD egészíti ki a csomagot. Mindkettő a Trust Centerben található.";
hu.faq[1].q = "Hol találom a hegesztési paramétereket?";
hu.faq[1].a = "A DVS 2207-11 szerinti irányértékek az Akadémián találhatók, beleértve a lépésről lépésre szóló útmutatókat és a hibaelhárítást is. Mindig a hegesztőgép gyártójának adatai a kötelező érvényűek.";
hu.faq[2].q = "Hogyan kaphatom meg a tanúsítványokat és audit dokumentumokat?";
hu.faq[2].a = "Az ISO tanúsítványokat közvetlenül innen töltheti le (DE/EN). A GENAU-politikát, az EPD-t, a GAEB-et és a minőségbiztosítási kézikönyvet a Trust Centerben állíthatja össze RFP-csomagként: egy kattintással kérheti a napokig tartó várakozás helyett.";
hu.faq[3].q = "Kihez fordulhatok műszaki kérdésekkel?";
hu.faq[3].a = "A support@k-aqua.de címen. A minőségbiztosítási és műszaki támogatási csapat egy munkanapon belül válaszol az anyaggal, tervezéssel és feldolgozással kapcsolatos kérdésekre.";
hu.faq[4].q = "Hogyan jutok el leggyorsabban az ajánlathoz?";
hu.faq[4].a = "A projektkérésen keresztül: öt lépés, kötelezettség nélkül, az értékesítés személyes visszajelzésével egy munkanapon belül. Közvetlenül a gyártótól, közvetítők nélkül.";
hu.faq[5].q = "Milyen nyelveken érhetők el a dokumentumok?";
hu.faq[5].a = "A katalógusok jelenleg angolul, a tanúsítványok németül és angolul. Ez a weboldal három nyelven működik (DE/EN/AR). További dokumentumnyelvek az értékesítésen keresztül igényelhetők.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject servicex',
  Description: 'Update servicex translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "servicex": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_servicex.json', JSON.stringify(req, null, 2));
