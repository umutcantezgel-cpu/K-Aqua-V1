const fs = require('fs');
let hu = JSON.parse(fs.readFileSync('messages/hu.json', 'utf8'));

const dict = {
  "heroEyebrow": "Műszaki Tudásközpont",
  "heroTitle": "Minden adat.",
  "heroTitleGrad": "Egy helyen.",
  "heroLead": "Műszaki dokumentációk, hegesztési paraméterek, CAD modellek és tanúsítványok a tervezők, kivitelezők és mérnökök számára.",
  "heroSearchPlaceholder": "Keresés (pl. 'SDR 6', 'Hegesztés', 'DVGW')",
  "heroCategories": "Kategóriák",
  "tabTechDocs": "Műszaki Adatlapok",
  "tabCad": "CAD / BIM Modellek",
  "tabCertificates": "Tanúsítványok",
  "tabManuals": "Szerelési Útmutatók",
  "tabCatalogs": "Termékkatalógusok",
  "gridType": "Típus",
  "gridSize": "Méret",
  "gridDownload": "Letöltés",
  "gridAction": "Megtekintés",
  "emptyTitle": "Nincs találat",
  "emptyDesc": "Nem találtunk dokumentumot a keresési feltételeknek megfelelően. Kérjük, módosítsa a szűrőket.",
  "emptyReset": "Szűrők törlése",
  "docTypePdf": "PDF Dokumentum",
  "docTypeZip": "ZIP Archívum",
  "docTypeDwg": "DWG Fájl",
  "docTypeRfa": "Revit Család"
};

function traverse(obj) {
  for (let k in obj) {
    if (typeof obj[k] === 'object') {
      traverse(obj[k]);
    } else if (typeof obj[k] === 'string') {
      if (dict[k]) {
        obj[k] = dict[k];
      } else {
        // Just append (HU)
        obj[k] = obj[k] + " (HU)";
      }
    }
  }
}
traverse(hu.wissen);
fs.writeFileSync('messages/hu.json', JSON.stringify(hu, null, 2));
