const fs = require('fs');
let hu = JSON.parse(fs.readFileSync('solutions_missing_hu.json', 'utf8'));

hu.vorfertigung.sticky = {
  eyebrow: "Mérnöki Pontosság",
  title: "A Gyárból az Építkezésre.",
  lead: "Minden modul egyedi gyártású. Nincs helye az improvizációnak. Ezt garantálja az ipari előregyártás.",
  items: [
    { title: "BIM Tervezés", desc: "A 3D modell alapján pontos gyártási rajzokat készítünk, elkerülve az ütközéseket már a tervezés során." },
    { title: "Klímaszabályozott Hegesztés", desc: "Tökéletes feltételek (hőmérséklet, pormentesség) a DVS által minősített hegesztők számára a csúcsminőségű fúzió érdekében." },
    { title: "Digitális Nyomáspróba", desc: "Minden elosztó magas nyomású hidraulikus teszten esik át, dokumentált jegyzőkönyvvel, mielőtt elhagyja a gyárat." }
  ]
};
hu.vorfertigung.bento = {
  eyebrow: "Előnyök",
  title: "Miért az előregyártás a jövő?",
  lead: "Amikor a határidők szorosak és a szakemberhiány akut, az előregyártás az egyetlen megbízható megoldás.",
  b1Title: "Költség- és Időmegtakarítás",
  b1Desc: "Minimalizált kivitelezési idő, csökkentett állványzat- és emelőgépköltségek.",
  b2Title: "Plug & Play",
  b2Desc: "Az előre összeszerelt, kalibrált modulok a helyszínen egyszerűen karimával vagy hegesztéssel csatlakoznak a rendszerhez.",
  b3Title: "Minőséggarancia",
  b3Desc: "A gyári körülmények között végzett gyártás kiküszöböli a helyszíni környezeti hibákat.",
  b4Title: "Nincs Anyagveszteség",
  b4Desc: "Pontosan annyi anyagot használunk fel, amennyire szükség van, felesleges hulladék és maradékok nélkül."
};
hu.vorfertigung.visual = {
  title: "A különbség a részletekben rejlik",
  desc: "Nézze meg az ipari szabványok szerint hegesztett varratok és az építkezési körülmények közötti különbségeket."
};
hu.vorfertigung.timeline = {
  eyebrow: "A Folyamat",
  lead: "Tervezéstől a beépítésig",
  t1Year: "01", t1Title: "Elemzés", t1Text: "Meglévő tervek vagy BIM modellek átvétele.",
  t2Year: "02", t2Title: "Mérnöki Tervezés", t2Text: "Részletes 3D gyártási rajzok és alkatrészlisták készítése.",
  t3Year: "03", t3Title: "Gyártás", t3Text: "Hegesztés, méretellenőrzés és minőségbiztosítás a németországi üzemben.",
  t4Year: "04", t4Title: "Nyomáspróba", t4Text: "Hitelesített hidraulikus tesztelés minden egyes modulon.",
  t5Year: "05", t5Title: "Kiszállítás", t5Text: "Biztonságos csomagolás, Just-In-Time szállítás az építkezésre."
};
hu.vorfertigung.manifesto = {
  title: "Nem improvizálunk. Mi tervezünk.",
  p1: "Egy építkezés kaotikus lehet. A csőrendszernek azonban nem szabad annak lennie.",
  p2: "Az előregyártás biztosítja, hogy a kritikus infrastruktúra mindig azonos, kompromisszumok nélküli német minőségben készüljön el, függetlenül attól, hogy a világ mely pontján építkezik."
};
hu.vorfertigung.cta = {
  title: "Tervezze meg velünk következő projektjét",
  desc: "Vegye fel a kapcsolatot mérnökeinkkel az előregyártott megoldásokért.",
  btnPrimary: "Ajánlatkérés",
  btnSecondary: "Tudjon meg többet"
};

hu.hochhaus.intro = {
  eyebrow: "Magasépítés",
  title: "A függőleges kihívás.",
  lead: "A felhőkarcolók extrém követelményeket támasztanak a csőhálózatokkal szemben. Nyomás, hőmérséklet, statika – a K-Aqua rendszer mindezt uralja.",
  p1: "Minél magasabb az épület, annál nagyobb a hidrosztatikus nyomás az alsó szinteken. A 100 méternél magasabb épületekben a hagyományos műanyag csövek gyorsan elérik határaikat.",
  p2: "A K-Aqua SDR 6 és SDR 7.4 PP-R csövei úgy lettek kialakítva, hogy ellenálljanak ezeknek az extrém nyomásviszonyoknak, akár PN25 (25 bar) értékig, folyamatos működés mellett.",
  quote: "Nem csupán vizet szállítunk. Biztonságot építünk a magasba.",
  p3: "Rendszereink kis súlya drasztikusan csökkenti az épület szerkezetére nehezedő statikus terhelést, és megkönnyíti a szállítást és a telepítést a felső szinteken."
};
hu.hochhaus.sticky = {
  eyebrow: "Kritikus Tényezők",
  title: "Magasépítési követelmények.",
  lead: "Minden felhőkarcoló egyedi, de a kihívások azonosak. A K-Aqua mindegyikre választ ad.",
  items: [
    { title: "Extrém Nyomásállóság", desc: "Robusztus falvastagságok és polifúziós kötések garantálják a rendszer integritását a legnagyobb hidrosztatikus terhelés alatt is." },
    { title: "Zajcsillapítás", desc: "A PP-R anyag természetes rezgéscsillapító tulajdonságai megakadályozzák az áramlási zajok átterjedését az épület szerkezetére." },
    { title: "Korróziómentesség", desc: "A magas épületekben a rozsda és a vízkő katasztrofális lehet. A PP-R immunis mindkettőre." }
  ]
};
hu.hochhaus.bento = {
  eyebrow: "Teljesítmény",
  title: "Műszaki Adatok a csúcsra",
  lead: "Miért választják a vezető építészek a K-Aquát a világ legmagasabb épületeihez?",
  b1Title: "Könnyű Súly",
  b1Desc: "Akár 70%-kal könnyebb, mint a fémcsövek, ami jelentősen felgyorsítja a daruzást és az akna-szerelést.",
  b2Title: "Rugalmasság",
  b2Desc: "A műanyag csövek jobban elnyelik az épület mozgását és a szeizmikus rezgéseket, mint a merev fémrendszerek.",
  b3Title: "Alacsony Hőveszteség",
  b3Desc: "A PP-R kiváló szigetelő, így csökken a hűtési/fűtési energiaveszteség a hosszú felszállóvezetékeken.",
  b4Title: "Gyors Hegesztés",
  b4Desc: "A polifúzió percek alatt elvégezhető, felgyorsítva a kivitelezési időt a szoros határidős projekteknél."
};
hu.hochhaus.timeline = {
  eyebrow: "Telepítés",
  lead: "Hatékonyság a magasban",
  t1Year: "01", t1Title: "Logisztika", t1Text: "Könnyű súlyú csövek szállítása a legfelső szintekre.",
  t2Year: "02", t2Title: "Előkészítés", t2Text: "Felszállóvezetékek szakaszos hegesztése és rögzítése az aknákban.",
  t3Year: "03", t3Title: "Nyomáspróba", t3Text: "Szakaszos nyomáspróba a beépítés során.",
  t4Year: "04", t4Title: "Üzembe helyezés", t4Text: "Teljes rendszer integráció és tesztelés."
};
hu.hochhaus.data = {
  title: "PP-R SDR 6 a magasépítésben",
  desc: "A legkeményebb nyomásosztály a legmagasabb kihívásokhoz.",
  value1: "25 Bar", label1: "Névleges Nyomás",
  value2: "-70%", label2: "Súlycsökkenés",
  value3: "50+ Év", label3: "Élettartam",
  value4: "0", label4: "Korrózió"
};

fs.writeFileSync('solutions_missing_hu_final.json', JSON.stringify(hu, null, 2));
