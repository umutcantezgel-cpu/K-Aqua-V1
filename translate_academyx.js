const fs = require('fs');
const de = require('./messages/de.json').academyx;

const hu = JSON.parse(JSON.stringify(de));
hu.paramEyebrow = "Hegesztési Paraméterek";
hu.paramTitle = "Tokos hegesztés: az irányértékek.";
hu.paramLead = "Melegítési, átállítási és hűtési idők a DVS 2207-11 szerinti tokos hegesztéshez (fűtőelem 250-270 °C), ez az alapja a videókban bemutatott gyakorlatnak.";
hu.paramHead = ["d (mm)", "Hegesztési mélység (mm)", "Melegítés (s)", "Átállítás max. (s)", "Hűtés (min)"];
hu.paramNote = "DVS 2207-11 szerinti irányértékek PP-hez 250-270 °C fűtőelem-hőmérsékleten. A hegesztőgép gyártójának adatai és a feldolgozási utasítás a kötelező érvényű. Kétség esetén: nézze meg a videót, ellenőrizze a paramétereket a gépen.";

hu.stepEyebrow = "Eljárások Lépésről Lépésre";
hu.stepTitle = "Négy eljárás, egy minőségi követelmény.";
hu.stepLead = "Minden eljárásnak megvan a maga mérettartománya és öt lépése, amelyek meghatározzák a kapcsolat minőségét.";
hu.procTabs = ["Tokos (Kézi)", "Tokos (Gép)", "Elektrofúziós", "Tompahegesztés"];

hu.procs[0].t = "Kézi tokos hegesztés: d63-ig";
hu.procs[0].steps[0].t = "Vágás és sorjázás";
hu.procs[0].steps[0].d = "Vágja le a csövet derékszögben, tisztítsa meg és törje le az éleket. Használjon csővágót a K-Aqua szerszámprogramból.";
hu.procs[0].steps[1].t = "Hegesztési mélység jelölése";
hu.procs[0].steps[1].d = "Jelölje be a csövön a táblázat szerinti betolási mélységet (pl. 14 mm d20 esetén): ez határozza meg az illesztési zónát.";
hu.procs[0].steps[2].t = "Egyidejű melegítés";
hu.procs[0].steps[2].d = "A csövet a fűtőhüvelybe, az idomot a fűtőtüskére. Egyszerre tolja fel és tartsa be pontosan a melegítési időt.";
hu.procs[0].steps[3].t = "Gyors illesztés, forgatás nélkül";
hu.procs[0].steps[3].d = "Az átállítási időn belül tengelyirányban csatlakoztassa. Soha ne forgassa el: a forgatás tönkreteszi a lágyított szerkezetet.";
hu.procs[0].steps[4].t = "Rögzítés és hűtés";
hu.procs[0].steps[4].d = "Rögzítse a csatlakozást néhány másodpercig, majd várja meg a hűtési időt a mechanikai terhelés előtt.";

hu.procs[1].t = "Tokos hegesztés géppel: közepes méretek";
hu.procs[1].steps[0].t = "Előkészítés, mint a kézi hegesztésnél";
hu.procs[1].steps[0].d = "Vágás, sorjázás, hegesztési mélység jelölése. Az alapszabályok azonosak maradnak.";
hu.procs[1].steps[1].t = "Cső és idom befogása";
hu.procs[1].steps[1].d = "A gép mindkét csatlakozó partnert koaxiálisan tartja. Az eltolódás és a dőlési hibák mechanikusan kizártak.";
hu.procs[1].steps[2].t = "Melegítés fűtőelemmel";
hu.procs[1].steps[2].d = "Fűtőhüvely és -tüske a DVS irányértékei szerint; a gép reprodukálhatóan tartja a pozíciót és az időt.";
hu.procs[1].steps[3].t = "Gépi illesztés";
hu.procs[1].steps[3].d = "Az előtolás tengelyirányban és egyenletesen csatlakozik, különösen d75 és d125 között ez az állandó minőség kulcsa.";
hu.procs[1].steps[4].t = "Hűtés rögzítés alatt";
hu.procs[1].steps[4].d = "Csak a hűtési idő lejárta után lazítsa ki és folytassa a munkát.";

hu.procs[2].t = "Elektrofúziós hegesztés: Fűtőszálas idomok";
hu.procs[2].steps[0].t = "Felület hámozása";
hu.procs[2].steps[0].d = "Hámozza le és tisztítsa meg a csőfelületet a kötési zónában. Az oxidréteg és a szennyeződés megakadályozza a hegesztést.";
hu.procs[2].steps[1].t = "Betolási mélység jelölése";
hu.procs[2].steps[1].d = "Jelölje be a mélységet a csövön, tolja a csövet ütközésig az idomba.";
hu.procs[2].steps[2].t = "Feszültségmentes rögzítés";
hu.procs[2].steps[2].d = "Használjon rögzítőbilincseket: az idom hegesztés közben nem állhat hajlítófeszültség alatt.";
hu.procs[2].steps[3].t = "Hegesztési folyamat indítása";
hu.procs[2].steps[3].d = "A készülék áram alá helyezi az idomba ágyazott fűtőszálakat. A paraméterek az idomból származnak, nem érzésből.";
hu.procs[2].steps[4].t = "Hűtési idő betartása";
hu.procs[2].steps[4].d = "Csak a megadott hűtési idő után mozgassa vagy terhelje. Ellenőrizze a jelzőindikátorokat az idomon.";

hu.procs[3].t = "Tompahegesztés (Butt Fusion): Nagy méretek d630-ig";
hu.procs[3].steps[0].t = "Végső síkgyalulás";
hu.procs[3].steps[0].d = "Gyalulja síkra mindkét csővéget a gépben, amíg összefüggő forgács nem képződik: a párhuzamosság kötelező.";
hu.procs[3].steps[1].t = "Beállítás és eltolódás ellenőrzése";
hu.procs[3].steps[1].d = "Az eltolódás legfeljebb a falvastagság 10%-a lehet. A d630-nál minden milliméter számít.";
hu.procs[3].steps[2].t = "Melegítés a fűtőelemen";
hu.procs[3].steps[2].d = "Kiegyenlítés nyomás alatt a peremképződésig, majd nyomás nélküli áthevítés. Idők a DVS 2207-11 szerint.";
hu.procs[3].steps[3].t = "Átállítás és csatlakoztatás";
hu.procs[3].steps[3].d = "Távolítsa el gyorsan a fűtőelemet, és mozgassa össze a végeket meghatározott csatlakozási nyomás alatt.";
hu.procs[3].steps[4].t = "Hűtés csatlakozási nyomás alatt";
hu.procs[3].steps[4].d = "A csatlakozási nyomás a hűtési idő végéig fennmarad, ekkor jön létre a homogén, tartósan tömített szakasz.";

hu.errEyebrow = "Hibaelhárítás";
hu.errTitle = "A hat legdrágább hiba és megelőzésük.";
hu.errHead = ["Hiba", "Következmény", "Megelőzés"];

hu.errRows[0] = ["Túl hosszú melegítés", "A perem befelé nő, a keresztmetszet szűkül", "Mérje az időt a táblázat alapján, ne érzésből"];
hu.errRows[1] = ["Elforgatás csatlakoztatáskor", "A lágyított szerkezet tönkremegy, a csatlakozás szivárog", "Csak tengelyirányban csatlakoztasson, használja a jelölést ellenőrzésként"];
hu.errRows[2] = ["Hiányzó sorjázás/letörés", "Az anyag felgyűrődik, az illesztési zóna egyenetlen lesz", "Minden vágást sorjázzon: a szerszám a rendszer része"];
hu.errRows[3] = ["Szennyezett fűtőelem", "A tapadó szennyeződések elégnek és beépülnek a varratba", "Minden hegesztés előtt tisztítsa meg a fűtőfelületeket szöszmentes ruhával"];
hu.errRows[4] = ["Túl korai terhelés", "A varrat deformálódik a megszilárdulás előtt", "Tartsa be a hűtési időket: d110 esetén ez 8 perc"];
hu.errRows[5] = ["Helytelen hegesztési mélység", "Túl rövid: kis csatlakozási felület · túl mély: keresztmetszet szűkülése", "Mindig jelölje be a betolási mélységet, soha ne becsülje"];

hu.glossEyebrow = "Szójegyzék";
hu.glossTitle = "A csővezeték-technológia fogalmai.";

hu.gloss[0] = ["SDR", "Standard Dimension Ratio = Külső átmérő osztva a falvastagsággal (d/s). Kisebb SDR = vastagabb fal = nagyobb névleges nyomás."];
hu.gloss[1] = ["PN", "Névleges nyomás bar-ban 20 °C-on a tervezési horizonton: SDR 6 megfelel PN 20-nak, SDR 17 megfelel PN 6-nak."];
hu.gloss[2] = ["d / di / s", "Külső átmérő / Belső átmérő / Falvastagság milliméterben. di = d − 2s."];
hu.gloss[3] = ["PP-R", "Polipropilén Random Kopolimer: a bevált alapanyag ivóvíz-szerelésekhez."];
hu.gloss[4] = ["PPRCT", "PP-R módosított kristályszerkezettel („Crystallinity Temperature\"): nagyobb hőmérséklet- és nyomástartalék azonos falvastagság mellett."];
hu.gloss[5] = ["K-Fiber / GF", "Üvegszállal erősített többrétegű szerkezet: körülbelül egynegyedére csökkenti a hőtágulást."];
hu.gloss[6] = ["Tokos hegesztés", "Socket Fusion: a csövet és az idomot egy fűtőhüvely és -tüske segítségével megolvasztják és egymásba illesztik."];
hu.gloss[7] = ["Elektrofúziós hegesztés", "Electrofusion: az idomba ágyazott fűtőszálak hozzák létre a hegesztési hőt, paramétervezérelten."];
hu.gloss[8] = ["Tompahegesztés", "Butt Fusion: a síkpárhuzamos csővégeket fűtőelemmel felmelegítik és nyomás alatt összenyomják, alapértelmezett d630-ig."];
hu.gloss[9] = ["DVS 2207-11", "A polipropilén hegesztésének szabályozása: az ezen az oldalon található irányértékek forrása."];

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject academyx',
  Description: 'Update academyx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "academyx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_academyx.json', JSON.stringify(req, null, 2));
