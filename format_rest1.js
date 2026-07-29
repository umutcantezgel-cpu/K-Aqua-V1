const fs = require('fs');

const data = {
  "legal": {
    "imprint": {
      "title": "Impresszum",
      "p1": "Az 5. § TMG (Telemediengesetz) értelmében:",
      "company": "K-Aqua GmbH",
      "address": "K-Aqua GmbH\nHasselborner Str. 19-21\n35647 Waldsolms\nNémetország",
      "contact": "Kapcsolat:",
      "contactData": "Telefon: +49 (0) 6085 98993-0\nFax: +49 (0) 6085 98993-45\nE-mail: info@k-aqua.de",
      "represent": "Képviseli:",
      "representData": "Az ügyvezető igazgatók (Geschäftsführer):\nAndrea Nickel\nRainer Nickel",
      "register": "Cégjegyzék:",
      "registerData": "Bejegyezve a Cégbíróságon (Handelsregister).\nNyilvántartó bíróság: Amtsgericht Wetzlar\nCégjegyzékszám: HRB 6296",
      "vat": "Adószám (Umsatzsteuer-ID):",
      "vatData": "Közösségi adószám a 27 a forgalmi adóról szóló törvény (Umsatzsteuergesetz) értelmében: DE 294025175"
    },
    "privacy": {
      "title": "Adatvédelmi nyilatkozat",
      "intro": "A következőkben tájékoztatjuk Önt arról, hogy mi történik személyes adataival, amikor meglátogatja weboldalunkat. Személyes adat minden olyan adat, amely alapján Ön személyesen azonosítható. Az adatvédelemmel kapcsolatos részletes információkat a szöveg alatt található Adatvédelmi nyilatkozatunkban találja.",
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Az adatkezelő",
          "content": "Ezen a weboldalon az adatkezelésért felelős szerv (Adatkezelő):\n\nK-Aqua GmbH\nHasselborner Str. 19-21\n35647 Waldsolms\nNémetország\n\nTelefon: +49 (0) 6085 98993-0\nE-mail: info@k-aqua.de\n\nAz adatkezelő az a természetes vagy jogi személy, aki (amely) önállóan vagy másokkal együtt meghatározza a személyes adatok feldolgozásának céljait és eszközeit."
        },
        {
          "id": "sec-2",
          "title": "2. Adatvédelmi tisztviselő",
          "content": "Adatvédelmi tisztviselőt neveztünk ki vállalatunk számára:\n\nAdatvédelmi tisztviselő\nK-Aqua GmbH\nHasselborner Str. 19-21\n35647 Waldsolms\nNémetország\n\nE-mail: info@k-aqua.de (Kérjük, adja meg a \"Datenschutz\" - Adatvédelem tárgyat)"
        },
        {
          "id": "sec-3",
          "title": "3. Adatgyűjtés a weboldalunkon (Szervernaplófájlok)",
          "content": "Amikor csak tájékozódás céljából látogatja meg a weboldalt, az oldal szolgáltatója automatikusan gyűjt és tárol információkat úgynevezett szervernaplófájlokban, amelyeket az Ön böngészője automatikusan továbbít nekünk. Ezek a következők:\n\n- Böngésző típusa és verziója\n- Használt operációs rendszer\n- Referrer URL (az előzőleg meglátogatott oldal)\n- A hozzáférő számítógép hostneve\n- A szerverkérés időpontja\n- IP-cím\n\nEzeket az adatokat nem vonjuk össze más adatforrásokkal. Az adatgyűjtés a DSGVO 6. cikk (1) bekezdés f) pontja alapján történik. A weboldal üzemeltetőjének jogos érdeke fűződik a weboldal hibamentes megjelenítéséhez és optimalizálásához – ehhez szükséges a szervernaplófájlok rögzítése."
        },
        {
          "id": "sec-4",
          "title": "4. Tárhelyszolgáltatás",
          "content": "Ez a weboldal a Vercel rendszerén (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA) van hosztolva. A Vercel használata annak érdekében történik, hogy online kínálatunkat gyorsan, megbízhatóan és biztonságosan elérhetővé tegyük (DSGVO 6. cikk (1) bekezdés f) pont). A Vercel az Ön adatait csak a szolgáltatási kötelezettségei teljesítéséhez szükséges mértékben dolgozza fel, és követi a mi utasításainkat. A megfelelő szintű adatvédelem biztosítása érdekében a Vercel-lel adatfeldolgozási megállapodást kötöttünk (Data Processing Agreement), amely tartalmazza az EU szabványos szerződéses feltételeit (Standard Contractual Clauses)."
        },
        {
          "id": "sec-5",
          "title": "5. Kapcsolati és ajánlatkérő űrlapok",
          "content": "Ha valamelyik ajánlatkérő űrlapunkat használja, az ott megadott adatokat feldolgozzuk: telefonszám, e-mail cím, a kiválasztott téma, valamint az oldal, ahonnan az üzenetet elküldték. Ezeket az adatokat e-mailben továbbítjuk az info@k-aqua.de címre, és (amennyiben CRM rendszert csatlakoztattunk) ott tároljuk a kérés feldolgozása céljából.\n\nA karrier űrlapon keresztül történő jelentkezések esetén az Ön által megadott jelentkezési adatokat (név, elérhetőségek, önéletrajz vagy a tapasztalatokra és képzettségre vonatkozó adatok) e-mailben továbbítjuk a HR osztályunknak.\n\nA feldolgozás célja kizárólag az Ön kérésének, illetve jelentkezésének feldolgozása. Ennek jogalapja a DSGVO 6. cikk (1) bekezdés b) pontja (szerződéskötést megelőző intézkedések) vagy f) pontja. Az adatokat töröljük, amint a cél teljesül, és jogszabályban előírt megőrzési kötelezettség nem áll fenn.\n\nAz automatizált spam beküldések elleni védelem érdekében láthatatlan technikai ellenőrzést (Honeypot mező és időkorlát) alkalmazunk harmadik féltől származó Captcha szolgáltatások nélkül."
        },
        {
          "id": "sec-6",
          "title": "6. Sütik és hozzájárulás",
          "content": "Ez a weboldal technikailag szükséges sütiket, illetve hasonló tárolási technológiákat használ a nyelvi és megjelenítési beállítások, valamint a süti-döntés tárolására. Ezek a weboldal működéséhez elengedhetetlenek (Jogalap: DSGVO 6. cikk (1) bekezdés f) pont, illetve a TDDDG 25. § (2) bekezdése).\n\nA süti banner segítségével kiegészítőleg hozzájárulhat az \"Elemzés\" és a \"Marketing\" kategóriákhoz. Jelenleg nem használunk semmilyen elemzési vagy marketing szolgáltatást; ha a jövőben ilyen szolgáltatásokat integrálnánk, azok kizárólag az Ön hozzájárulása után töltődnek be (DSGVO 6. cikk (1) bekezdés a) pont, TDDDG 25. § (1) bekezdés). Az adott hozzájárulását a jövőre nézve bármikor visszavonhatja a süti beállításokban."
        },
        {
          "id": "sec-7",
          "title": "7. Az Ön jogai",
          "content": "A vonatkozó jogszabályok keretein belül Önnek bármikor joga van a következőkhöz:\n\n- Tájékoztatás a tárolt személyes adatairól (DSGVO 15. cikk)\n- Helytelen adatok helyesbítése (DSGVO 16. cikk)\n- Törlés (DSGVO 17. cikk)\n- Az adatkezelés korlátozása (DSGVO 18. cikk)\n- Adathordozhatóság (DSGVO 20. cikk)\n- Tiltakozás a jogos érdekeken alapuló adatkezelés ellen (DSGVO 21. cikk)\n- A megadott hozzájárulás jövőre vonatkozó visszavonása (DSGVO 7. cikk (3) bekezdés)\n\nEhhez forduljon a fent megnevezett adatkezelőhöz vagy adatvédelmi tisztviselőnkhöz. Ezen túlmenően joga van panaszt tenni az illetékes felügyeleti hatóságnál (számunkra: Hesseni Adatvédelmi és Információszabadság Biztos (HBDI), Wiesbaden)."
        },
        {
          "id": "sec-8",
          "title": "8. SSL- vagy TLS-titkosítás",
          "content": "Biztonsági okokból és a bizalmas tartalmak (mint például a nekünk küldött kérések) átvitelének védelme érdekében ez az oldal SSL- vagy TLS-titkosítást használ. A titkosított kapcsolatot arról ismeri fel, hogy a böngésző címsora \"https://\"-re vált, és megjelenik a lakat szimbólum a böngésző sorában. Ha a titkosítás aktív, az Ön által nekünk továbbított adatokat harmadik felek nem tudják elolvasni."
        }
      ]
    },
    "toc": "Tartalom",
    "eyebrow": "Jogi információk"
  },
  "cookieConsent": {
    "title": "Adatvédelem és Sütik",
    "description": "Sütiket és hasonló technológiákat (például pixeleket és Local Storage-ot) használunk, hogy a lehető legjobb élményt nyújtsuk Önnek platformunkon. Néhány zökkenőmentes működéshez elengedhetetlen, míg mások segítenek weboldalunk fejlesztésében. Bármikor teljes kontrollal rendelkezik.",
    "customize": "Beállítások módosítása",
    "declineAll": "Csak az alapvető",
    "acceptAll": "Összes elfogadása",
    "acceptSelected": "Kiválasztás mentése",
    "essentialTitle": "Alapvető (Technikailag szükséges)",
    "essentialDesc": "Ezek a sütik elengedhetetlenek a weboldal zökkenőmentes működéséhez (pl. navigáció, biztonság, az Ön adatvédelmi preferenciáinak tárolása). E technológiák nélkül a K-Aqua weboldala nem működhet megfelelően. Nem tárolnak személyazonosításra alkalmas adatokat.",
    "analyticsTitle": "Statisztika és Elemzés",
    "analyticsDesc": "Ezek a sütik segítenek megérteni látogatóink viselkedését. Pszeudonimizált adatokat gyűjtünk arról, hogy a felhasználók hogyan lépnek kapcsolatba a K-Aqua-val (pl. leggyakrabban látogatott oldalak, eltöltött idő, hibaüzenetek). Ez lehetővé teszi számunkra a hibák elhárítását és a platform folyamatos fejlesztését.",
    "marketingTitle": "Marketing és Személyre szabás",
    "marketingDesc": "Ezeket a technológiákat arra használjuk, hogy relevánsabb tartalmakat és hirdetéseket (külső platformokon is) jelenítsünk meg Önnek. Ha ezt letiltja, továbbra is látni fog hirdetéseket, de azok kevésbé lesznek az Ön érdeklődési köréhez igazítva.",
    "vendorListTitle": "Részletes sütilista megtekintése",
    "backToSimple": "Vissza az áttekintéshez"
  },
  "seo": {
    "extendedProductText": {
      "p1": "Kiváló minőségű K-Aqua rendszereink maximális megbízhatóságot és hosszú élettartamot kínálnak a legigényesebb projektekhez világszerte.",
      "p2": "A fejlett anyagoknak és a precíz németországi gyártásnak köszönhetően egyszerű telepítést és tartós biztonságot garantálunk.",
      "p3": "Bízzon a tanúsított minőségben és a fenntartható megoldásokban, amelyek megfelelnek a legszigorúbb nemzetközi szabványoknak és növelik projektjének hatékonyságát."
    },
    "extendedMarketText": {
      "p1": "A K-Aqua megoldásait kifejezetten arra tervezték, hogy megfeleljenek a helyi és nemzetközi piacok követelményeinek.",
      "p2": "Támogatjuk a generálkivitelezőket és a tervezőket a helyszínen műszaki szakértelemmel és megbízható rendszerekkel minden kihívásra.",
      "p3": "Globális hálózatunk révén biztosítjuk, hogy pontosan azokat a termékeket kapja meg, amelyek optimálisak a regionális építési projektjéhez.",
      "p4": "Korunk vízgazdálkodási kihívásai testreszabott, hosszú élettartamú infrastrukturális megoldásokat igényelnek. A K-Aqua aktívan részt vesz a nemzetközi piacokon, hogy kielégítse a higiénikus és szivárgásmentes csőhálózatok iránti növekvő igényt. Legyen szó vízhiányos régiókról, ahol minden csepp vizet meg kell védeni szivárgásmentes hegesztett kötésekkel, vagy sűrűn lakott nagyvárosokról, amelyek komplex tűzvédelmi és hangszigetelési követelményekkel rendelkeznek: PP-R és PPRCT rendszereink biztosítják a szükséges megbízhatóságot.",
      "p5": "Ennek során nemcsak a termékértékesítésre összpontosítunk, hanem stratégiai partnerként is tekintünk magunkra a helyszínen. Műszaki képzésekkel, helyszíni felügyelettel és a helyi hatóságokkal való szoros együttműködéssel biztosítjuk, hogy a nemzetközi szabványokat (mint például a DVGW, WRAS, SASO) ne csak betartsák, hanem túl is szárnyalják. Így fenntarthatóan hozzájárulunk a globális vízinfrastruktúra modernizációjához."
    }
  }
};

let str = JSON.stringify(data, null, 2);
// slice off the outer braces
str = str.substring(str.indexOf('\n') + 1, str.lastIndexOf('\n'));
fs.writeFileSync('rest1_replace.txt', str);
