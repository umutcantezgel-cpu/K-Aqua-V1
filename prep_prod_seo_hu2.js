const fs = require('fs');
let hu = JSON.parse(fs.readFileSync('prod_seo_hu.json', 'utf8'));

hu.fittings.advList = [
  "Homogén hegesztés: A cső és az idom elválaszthatatlan egységgé olvad össze.",
  "Nincs szükség tömítésekre: A tartós kötéshez nincs szükség hibaérzékeny O-gyűrűkre.",
  "Egyszerű telepítés: Gyors és biztonságos feldolgozás az építkezésen.",
  "Teljes áteresztés: Nincs keresztmetszet-csökkenés, ami fenntartja a rendszernyomást.",
  "Vegyi ellenállás: Ellenáll számos agresszív közegnek."
];

hu.weldInSaddles.advList = [
  "Utólagos telepítés: Meglévő PP-R csőhálózatok bővítése a főcső elvágása nélkül.",
  "Időtakarékos: Fúrás, melegítés, behegesztés - percek alatt kész.",
  "Nyomásálló: A nyereghegesztés eléri az alapcső nyomásosztályát.",
  "Teljes áteresztés: Nincs keresztmetszet-csökkenés a főágban.",
  "Sokoldalú: Kapható fém menetes átmenettel vagy anélkül (BM/KM)."
];

hu.accessories.advList = [
  "Tökéletes illeszkedés: Minden tartozék geometriailag a K-Aqua csőrendszerhez van igazítva.",
  "Termodinamikus rögzítés: Csőbilincsek gumibetéttel fix és csúszó megfogáshoz.",
  "Kiváló minőségű karimás kötések: Laza karimák és EPDM tömítések a fémre történő átmenethez.",
  "Gyors javítás: Javítódugók véletlenül megfúrt csövekhez.",
  "UV-állóság: A kiválasztott tartozékok speciálisan kültéri telepítésre vannak stabilizálva."
];

hu.tools.advList = [
  "Pontos hőmérséklet-szabályozás: A mikroprocesszor vezérlésű fűtőelemek pontosan 260°C-on tartják a hőt.",
  "Tapadásmentes bevonat: Teflon-PTFE a maradékmentes olvadékért.",
  "Ergonomikus kialakítás: Csökkenti a telepítő fizikai megterhelését.",
  "Digitális dokumentáció: Tompa- és elektrofúziós hegesztőgépek protokoll funkcióval.",
  "Hosszú élettartam: Robusztus mechanika a zord építkezési mindennapokhoz."
];

hu.fallback.advList = [
  "Tesztelt minőség: Megfelel az ISO 9001 irányítási rendszernek.",
  "Rendszerkompatibilitás: Tökéletesen a K-Aqua csőrendszerhez hangolva.",
  "Hosszú élettartam: Robusztus anyagok a zord építkezési mindennapokhoz.",
  "Biztonságos alkalmazás: Garantált működés szakszerű használat esetén.",
  "Gazdaságosság: Kiváló ár-érték arány."
];

fs.writeFileSync('prod_seo_hu_final.json', JSON.stringify(hu, null, 2));
