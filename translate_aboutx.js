const fs = require('fs');
const de = require('./messages/de.json').aboutx;

const hu = JSON.parse(JSON.stringify(de));
hu.numEyebrow = "Számok a Gyárból";
hu.numTitle = "Waldsolms mutatókban.";
hu.numLead = "Közép-Hessen, Auweg 3: itt fejleszti és gyártja a KWT GmbH a teljes K-Aqua programot.";

hu.nums[0].l = "cső naponta és extrudáló berendezésenként: kapacitás a nagy projektekhez";
hu.nums[1].l = "a csőgyártás mérettartománya, idomok 315 mm-ig";
hu.nums[2].l = "a vágási hulladék és gyártási selejt aránya, ami visszakerül a körforgásba";
hu.nums[3].l = "Minőség, Környezet, Energia: DAkkS-akkreditált 2025 októbere óta";

hu.prodEyebrow = "Gyártás";
hu.prodTitle = "Négy állomás, egy minőségi ígéret.";
hu.prodLead = "A granulátumtól a feliratozott csőig: így készül a termék.";
hu.prod[0].t = "Extrúzió";
hu.prod[0].d = "Egyrétegű és üvegszállal erősített többrétegű csövek készülnek az extrudáló berendezéseken, berendezésenként akár napi 14 000 méteres teljesítménnyel.";
hu.prod[1].t = "Fröccsöntés";
hu.prod[1].d = "A d20-tól d315-ig terjedő idomok fröccsöntéssel készülnek: összetett geometriák nagy darabszámban és állandó minőségben.";
hu.prod[2].t = "Zárt hűtőkörfolyamat";
hu.prod[2].d = "A gyártási folyamatvíz zárt körforgásban kering: a vízi környezet védelme mint rendszerszintű döntés, az ISO 14001 alapján felügyelve.";
hu.prod[3].t = "Feliratozás és Vizsgálat";
hu.prod[3].d = "Minden csövet az extrudálási folyamat során folyamatosan jelölnek és a minőségbiztosítási kézikönyv szerint vizsgálnak: visszakövethetőség tételenként.";

hu.houseEyebrow = "A KWT Háza";
hu.houseTitle = "Négy haszon, egy ház.";
hu.houseLead = "A KWT GmbH vállalati politikája a hasznot körforgásként értelmezi: egyik sem létezik a másik három nélkül.";
hu.house[0].t = "Ügyfélhaszon";
hu.house[0].d = "Az ügyfelek és az érdeklődők kívánságait felismerjük, komolyan vesszük és megvalósítjuk, a jogi és szociális normák betartásával.";
hu.house[1].t = "Munkavállalói haszon";
hu.house[1].d = "Minden munkavállaló be van vonva a folyamatos fejlesztési folyamatba. Nincs ügyfélhaszon munkavállalói haszon nélkül.";
hu.house[2].t = "Vállalati haszon";
hu.house[2].d = "A minőség mindig összeegyeztethető marad a költségekkel és a határidőkkel, így a mai siker finanszírozza a holnap beruházásait.";
hu.house[3].t = "Környezet és Természet";
hu.house[3].d = "Az erőforrások megőrzése és a környezeti fenntarthatóság a minőségfelfogás része, amely a GENAU-rendszerben gyökerezik.";

hu.mileEyebrow = "Mérföldkövek";
hu.mileTitle = "Az ide vezető út.";
hu.miles[0].y = "Évtizedek";
hu.miles[0].t = "Gyártási tapasztalat";
hu.miles[0].d = "Műanyagfeldolgozás a vízellátás számára: tapasztalat, amely minden egyes tételbe beépül.";
hu.miles[1].y = "Partnerség";
hu.miles[1].t = "Szoros kapcsolat a KESSEL-lel";
hu.miles[1].d = "A „Leading in Drainage\" prémium gyártóhoz a KWT-t egy többéves értékközösség köti.";
hu.miles[2].y = "GENAU";
hu.miles[2].t = "Irányítási rendszer a KWT Házában";
hu.miles[2].d = "Munkavédelem, környezet és energia mint minden munkavállaló napi gyakorlata, nem pedig audit-gyakorlat.";
hu.miles[3].y = "2025/10";
hu.miles[3].t = "Háromszoros ISO vizsga";
hu.miles[3].d = "ISO 9001, 14001 és 50001 egy lépésben: DAkkS-akkreditált, érvényes 2028/10-ig.";
hu.miles[4].y = "2026";
hu.miles[4].t = "Digitális Platform";
hu.miles[4].d = "A termékkereső, a CO₂-kalkulátor, a Bizalom Központ (Trust Center) és az Akadémia eszköztárrá teszi a weboldalt.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject aboutx',
  Description: 'Update aboutx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "aboutx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_aboutx.json', JSON.stringify(req, null, 2));
