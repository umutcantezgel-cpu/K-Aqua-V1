const fs = require('fs');

const products = {
  "narrative": {
    "sizeRange": "Ova komponenta se proizvodi u opsežnom rasponu nominalnih prečnika od kompaktnih {minSize} mm do znatnih {maxSize} mm, što osigurava maksimalnu svestranost u različitim scenarijima instalacije.",
    "sizeSpecific": "Ova komponenta je precizno dizajnirana za specifičan nominalni prečnik od {minSize} mm i nudi ciljane performanse za specijalizovane arhitekture cevovoda.",
    "weights": "Efikasnost materijala je optimizovana u celom asortimanu, sa težinom komada koja varira od {minWeight} kg do {maxWeight} kg, u zavisnosti od izabrane dimenzije.",
    "packaging": "Logistika je optimizovana kroz standardizovane jedinice pakovanja koje su dizajnirane za siguran globalni transport i efikasno rukovanje na gradilištu.",
    "rowCount": "Naš tehnički portfolio nudi ovu konfiguraciju u {count} visoko specijalizovanih dimenzionalnih varijanti koje su precizno skalirane da zadovolje hidrauličke i mehaničke zahteve modernih sistema za transport tečnosti.",
    "intro": "Proizvod {title} čini kamen temeljac K-Aqua rešenja za upravljanje fluidima visokih performansi. Zvanično katalogizovana pod brojevima artikala {codes}, svaka varijanta prolazi kroz stroge protokole osiguranja kvaliteta u našim nemačkim proizvodnim pogonima pre isporuke.",
    "outro": "Korišćenjem naprednih tehnika obrade polimera, geometrijska preciznost proizvoda {title} garantuje optimalne karakteristike protoka, minimizuje gubitke pritiska i potpuno eliminiše rizik od kalcifikacije ili korozije tokom celog životnog veka. Ova beskompromisna posvećenost nauci o materijalima osigurava da svaka veza održava apsolutni integritet čak i pod ekstremnim termičkim fluktuacijama i fluktuacijama pritiska. Bilo da se koristi u stambenim zgradama, kritičnim zdravstvenim ustanovama ili zahtevnim industrijskim postrojenjima za preradu, ovaj proizvod pruža pouzdanost bez održavanja kojoj inženjeri i instalateri mogu slepo verovati."
  },
  "uniqueProductContext": "Proizvod {title} je suštinska komponenta K-Aqua {category} asortimana. Dizajniran je za maksimalnu dugovečnost i besprekornu integraciju, ispunjavajući najviše međunarodne standarde za moderne primene cevovoda i vodovoda. Ovaj specifičan proizvod možete identifikovati i naručiti koristeći broj(eve) artikla: {codes}. Za dalju dokumentaciju ili podršku, molimo kontaktirajte naš tehnički tim.",
  "heroDesc": "Otkrijte specifikacije, dimenzije i oblasti primene. Za detaljne informacije preuzmite tehnički list.",
  "articleNumbers": "Brojevi artikala",
  "technicalSpecs": "Tehničke specifikacije",
  "eyebrow": "Proizvodi",
  "videoGuide": "K-Aqua video vodič",
  "localAvailability": "Lokalna dostupnost",
  "localDesc": "Pronađite lokalne distributere, specifična odobrenja i standarde za vaš region.",
  "allMarkets": "Pogledajte svih 50+ tržišta",
  "title1": "PP-R/PPRCT Cevi i fitinzi za",
  "titleGrad": "Pijaću vodu.",
  "lead": "Kompletan sistem cevovoda za toplu i hladnu pijaću vodu: od cevi do fitinga i tehnologije zavarivanja. Četiri bloka, jedan sistem.",
  "ctaCatalog": "Katalog proizvoda (PDF)",
  "ctaVideos": "Video instalacije",
  "sysEyebrow": "Sistem",
  "sysTitle": "K-Aqua PP-R cevi i fitinzi: Četiri bloka, jedan sistem.",
  "range": [
    {
      "t": "Cevi: Jednoslojne i višeslojne",
      "d": "Jednoslojne i višeslojne cevi ojačane staklenim vlaknima u SDR 6, 7.4, 9, 11 i 17. Dimenzije od 20 mm do 630 mm."
    },
    {
      "t": "Fitinzi i armature",
      "d": "Fitinzi od 20 mm do 315 mm, dopunjeni ventilima, spojevima i prelaznim komadima."
    },
    {
      "t": "Tehnologija zavarivanja i alati",
      "d": "Alati za sečenje, aparati i mašine za zavarivanje za polifuziono, sučeono i elektrofuziono zavarivanje."
    },
    {
      "t": "Topla i hladna voda",
      "d": "Dizajnirano za pijaću vodu (toplu i hladnu) sa visokom temperaturnom otpornošću i otpornošću na pritisak tokom decenija."
    }
  ],
  "techEyebrow": "Tehnički podaci",
  "techTitle": "Dimenzije i klase pritiska",
  "techLead": "Zavisno od tipa cevi od 20 mm do 630 mm, fitinzi do 315 mm.",
  "ctaFeatures": "Karakteristike proizvoda (PDF)",
  "tableHead": [
    "Komponenta",
    "Dimenzija",
    "Klase pritiska"
  ],
  "tableRows": [
    [
      "Jednoslojne cevi",
      "20 – 630 mm",
      "SDR 6 / 7,4 / 9 / 11 / 17"
    ],
    [
      "Višeslojne cevi (GF ojačane)",
      "20 – 630 mm",
      "SDR 6 / 7,4 / 9 / 11 / 17"
    ],
    [
      "Fitinzi",
      "20 – 315 mm",
      "kompatibilno sa sistemom"
    ],
    [
      "Ventili i spojevi",
      "zavisno od sistema",
      "-"
    ],
    [
      "Tehnologija zavarivanja i alati",
      "sve dimenzije",
      "-"
    ]
  ]
};

let rawJson = JSON.stringify({ products }, null, 2);
rawJson = rawJson.substring(1, rawJson.length - 1); // remove wrapping {}
fs.writeFileSync('products-sr1.txt', ',' + rawJson);
