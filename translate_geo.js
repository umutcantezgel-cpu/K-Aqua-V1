const fs = require('fs');
const data = JSON.parse(fs.readFileSync('missing_keys.json'));
const geo = data.geoContent;

const extText = "Infrastruktur perkotaan di kawasan ini memberikan tuntutan khusus terhadap umur panjang dan keandalan sistem perpipaan. Dengan kondisi iklim yang ekstrem dan persyaratan tinggi terhadap kebersihan air, solusi PP-R dan PPRCT dari K-Aqua menawarkan keunggulan yang menentukan. Pipa logam tradisional sering mengalami korosi dan deposit mineral, yang menyebabkan hilangnya tekanan secara signifikan dan pemborosan air akibat kebocoran. Sebaliknya, sistem K-Aqua menjamin instalasi bebas perawatan yang sepenuhnya kedap bocor selama lebih dari 50 tahun berkat ketahanan bebas korosinya dan pengelasan polifusi homogen. Selain itu, permukaan dalam yang halus memungkinkan aliran hidrolik yang optimal, secara drastis mengurangi konsumsi energi untuk pompa sirkulasi. Faktor-faktor ini menjadikan K-Aqua pilihan utama untuk kompleks hotel skala besar, rumah sakit, fasilitas pendingin industri, dan proyek perumahan yang menuntut di sektor perkotaan.";

const idGeo = {};
for (const city in geo) {
  idGeo[city] = {
    regulator: geo[city].regulator,
    water: geo[city].water.replace("Hartes Wasser", "Air Keras").replace("Mittelhartes Wasser", "Air Sedang").replace("korrosionsfreies", "bebas korosi").replace("verhindert", "mencegah"),
    focus: geo[city].focus,
    note: geo[city].note,
    focusHeading: "Proyek Khas di " + city.charAt(0).toUpperCase() + city.slice(1),
    extendedMarketText: extText
  };
}

console.log(JSON.stringify(idGeo, null, 2));
