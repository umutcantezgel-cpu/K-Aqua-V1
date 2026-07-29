const fs = require('fs');
const de = require('./messages/de.json').newsx;

const hu = JSON.parse(JSON.stringify(de));
hu.moreEyebrow = "A Gyárból és a Tudásból";
hu.moreTitle = "Több a K-Aqua házatájáról.";
hu.moreLead = "Aktuális hírek a K-Aqua-tól. Háttérinformációk a gyártásból és az anyagismeretből, kinyitható formátumban.";
hu.readMore = "A teljes K-Aqua szakcikk elolvasása";
hu.readLess = "Összecsukás";

hu.posts[0].t = "Háromszorosan vizsgált: ISO 9001, 14001 és 50001";
hu.posts[0].tag = "Vállalat";
hu.posts[0].teaser = "A KWT GmbH ISO irányítási rendszere mostantól a minőségre, a környezetre és az energiára is kiterjed: DAkkS-akkreditált.";
hu.posts[0].body[0] = "2025 októbere óta a KWT GmbH irányítási rendszere háromszorosan vizsgált: ISO 9001:2015 minőség, ISO 14001:2015 környezet és ISO 50001:2018 energia tekintetében. A tanúsítványok egy DAkkS által akkreditált tanúsító cégtől származnak, és 2028 októberéig érvényesek.";
hu.posts[0].body[1] = "A beszerzés és a megfelelőség számára ez a következőt jelenti: dokumentált, auditálható folyamatok az extrudertől a kiszállításig. A bevált GENAU irányítási rendszer már korábban is teljesítette a DIN EN ISO 14001 és 50001 követelményeit. A vizsgálat külsőleg is megbízhatóvá teszi ezt.";
hu.posts[0].body[2] = "Mindkét tanúsítványverzió (DE/EN) letölthető; a teljes auditcsomagot a Bizalom Központban állíthatja össze.";
hu.posts[0].date = "2025 Október";

hu.posts[1].t = "Folyamatosan jelölve: Visszakövethetőség az extrudertől";
hu.posts[1].tag = "Gyártás";
hu.posts[1].teaser = "Minden K-Aqua cső folyamatos jelölést kap közvetlenül az extrudálási folyamatból.";
hu.posts[1].body[0] = "Berendezésenként akár napi 14 000 méter cső esetén a visszakövethetőség nem opció: Minden csövet a folyamatban lévő extrudálási folyamat során folyamatosan jelölnek: azokkal az információkkal, amelyekre a tervezőknek és az ellenőröknek az építkezésen szükségük van.";
hu.posts[1].body[1] = "A jelölés összekapcsolja a fizikai terméket a tételével és a minőségbiztosítási vizsgálati jegyzőkönyvekkel. Ami a csövön szerepel, az visszakövethető a vizsgáló laboratóriumig, ami a minőségbiztosítási kézikönyv egyik eleme, amelyet az auditorok a Bizalom Központban kérhetnek.";
hu.posts[1].date = "2018";

hu.posts[2].t = "Miért pont PP-R?";
hu.posts[2].tag = "Anyag";
hu.posts[2].teaser = "Az elégetett gáztól az ivóvízcsőig: a polipropilén rövid anyagtörténete.";
hu.posts[2].body[0] = "A polipropilén olyan gázokból származik, amelyeket korábban haszontalanul elégettek. Az anyagként való hasznosítás a forrásnál csökkenti a légszennyezést. Műszaki műanyagként a PP szokatlanul ellenálló az oldószerekkel, lúgokkal és savakkal szemben, és fröccsöntéssel összetett geometriákat formál.";
hu.posts[2].body[1] = "A csőben leginkább a belső felület számít: A 0,007 mm-es érdesség miatt a nyomásveszteség minimális marad, a biofilm és a lerakódás alig tud megkapaszkodni. Ehhez jön még a 0,24 W/(m·K) hővezető képesség: A melegvíz meleg marad anélkül, hogy a vezeték önmaga ellen dolgozna a szigetelésben.";
hu.posts[2].body[2] = "A PPRCT ismét kitolja a határokat: A módosított kristályszerkezet több hőmérséklet- és nyomástartalékot hoz. Az SDR 7,4 folyamatos üzemben 10 bar nyomáson 70 °C-ot bír.";
hu.posts[2].date = "Tudás";

hu.posts[3].t = "A sárgaréz találkozik a polipropilénnel: Átmenetek a meglévő rendszerhez";
hu.posts[3].tag = "Anyag";
hu.posts[3].teaser = "A felújítás szinte mindig rendszerváltást jelent: A sárgaréz menetes átmeneti idomok tisztává teszik ezt.";
hu.posts[3].body[0] = "Szinte egyetlen projekt sem indul a zöldmezőn: Rézből vagy horganyzott acélból készült meglévő vezetékeket kell csatlakoztatni. Erre valók a beágyazott sárgaréz belső vagy külső menettel ellátott átmeneti idomok: a menetes oldal a fémhez csatlakozik, a PP oldal anyagzáróan hegesztett.";
hu.posts[3].body[1] = "Így szakaszonként lehet felújítani: A korrodált vezetékeket kicserélik, a működőképesek megmaradnak, és a korróziós probléma nem vándorol át az új rendszerbe. A csavarzatok szükség esetén, például szerelvényeknél és vízóráknál oldhatóvá teszik a csatlakozást.";
hu.posts[3].date = "Tudás";

hu.ishTitle = "Iparági Találkozóhely";
hu.ishText = "Az épületgépészeti iparág a frankfurti ISH-n, a vezető világkiállításon találkozik, ahol a partner KESSEL rendszeresen jelen van. Amint a K-Aqua időpontjai rögzülnek, itt is megjelennek.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject newsx',
  Description: 'Update newsx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "newsx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_newsx.json', JSON.stringify(req, null, 2));
