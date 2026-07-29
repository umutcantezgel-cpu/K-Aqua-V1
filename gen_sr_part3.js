const fs = require('fs');

const data = {
  "service": {
    "title": "Korisnički servis",
    "desc": "Tehnička podrška za vaše K-Aqua projekte."
  },
  "about": {
    "title": "O nama",
    "desc": "K-Aqua je vodeći svetski proizvođač PP-R sistema cevi visokih performansi."
  },
  "news": {
    "title": "Vesti",
    "desc": "Najnovije informacije, projekti i inovacije proizvoda."
  },
  "career": {
    "title": "Karijera",
    "desc": "Postanite deo K-Aqua tima i gradite budućnost sa nama."
  },
  "contact": {
    "title": "Kontakt",
    "desc": "Stupite u kontakt sa našim inženjerima i prodajnim timom."
  },
  "imprint": {
    "title": "Impresum",
    "desc": "Pravne informacije."
  },
  "finder": {
    "title": "Pretraga proizvoda",
    "desc": "Pronađite odgovarajuće cevi, fitinge i alate."
  },
  "trustAndCases": {
    "title": "Centar poverenja i Studije slučaja",
    "desc": "Dokazana sigurnost kroz globalne reference."
  },
  "co2": {
    "title": "CO2 kalkulator",
    "desc": "Izračunajte smanjenje emisije ugljenika sa K-Aqua sistemima."
  },
  "trust": {
    "title": "Centar poverenja",
    "desc": "Sertifikati, norme i garancije."
  },
  "partner": {
    "title": "Partnerski program",
    "desc": "Postanite sertifikovani K-Aqua partner."
  },
  "academy": {
    "title": "K-Aqua Akademija",
    "desc": "Obuka, sertifikacija i tehničko znanje."
  },
  "refs": {
    "title": "Reference",
    "desc": "Naši globalni projekti."
  },
  "buyers": {
    "title": "Vodič za kupce",
    "desc": "Informacije za nabavku."
  },
  "rfq": {
    "title": "Zahtev za ponudu",
    "desc": "Pošaljite nam detalje vašeg projekta."
  },
  "geoContent": {
    "title": "Lokalne informacije",
    "desc": "Dostupnost specifična za vaš region."
  },
  "notFound": {
    "title": "Stranica nije pronađena",
    "desc": "Tražena stranica ne postoji."
  },
  "homedeep": {
    "title": "Početna - Dubinsko znanje",
    "desc": "Tehnički uvid u naše sisteme."
  },
  "legal": {
    "title": "Pravne informacije",
    "privacy": "Politika privatnosti",
    "terms": "Uslovi korišćenja"
  },
  "navigation": {
    "home": "Početna",
    "products": "Proizvodi",
    "solutions": "Rešenja",
    "service": "Servis",
    "contact": "Kontakt"
  },
  "cookieConsent": {
    "title": "Postavke kolačića",
    "desc": "Koristimo kolačiće za poboljšanje vašeg iskustva.",
    "acceptAll": "Prihvati sve",
    "decline": "Odbij"
  },
  "seo": {
    "title": "K-Aqua | Sistemi cevi visokih performansi",
    "desc": "Vodeći svetski proizvođač PP-R i PPRCT cevi za građevinarstvo i industriju."
  },
  "application": {
    "title": "Oblasti primene",
    "desc": "Gde se koriste K-Aqua sistemi."
  },
  "menu": {
    "open": "Otvori meni",
    "close": "Zatvori meni"
  },
  "quote": {
    "title": "Zatražite ponudu",
    "desc": "Dobićete odgovor u roku od 24 sata."
  },
  "resources": {
    "title": "Resursi",
    "desc": "Preuzimanja, CAD fajlovi i tehnički listovi."
  },
  "markets": {
    "title": "Tržišta",
    "desc": "Naše globalno prisustvo."
  },
  "wissen": {
    "title": "Baza znanja",
    "desc": "Tehnički članci i uputstva."
  },
  "productNames": {
    "pipes": "Cevi",
    "fittings": "Fitinzi",
    "valves": "Ventili i armature",
    "tools": "Alati"
  },
  "customerReviews": {
    "title": "Iskustva kupaca",
    "desc": "Šta inženjeri kažu o nama."
  },
  "kontaktBlocks": {
    "sales": "Prodaja",
    "support": "Tehnička podrška",
    "hq": "Sedište"
  },
  "kontaktForm": {
    "name": "Ime",
    "email": "Email adresa",
    "message": "Vaša poruka",
    "submit": "Pošalji upit"
  },
  "enterprise": {
    "title": "Za velika preduzeća",
    "desc": "Rešenja za globalne mega projekte."
  },
  "referenzenPage": {
    "title": "Referentni projekti",
    "desc": "Pogledajte gde je ugrađen K-Aqua sistem."
  },
  "seoExpansion": {
    "title": "Prošireni SEO",
    "desc": "Dodatne tehničke ključne reči za pretraživače."
  }
};

let rawJson = JSON.stringify(data, null, 2);
rawJson = rawJson.substring(1, rawJson.length - 1);
fs.writeFileSync('rest_sr.txt', ',' + rawJson);
