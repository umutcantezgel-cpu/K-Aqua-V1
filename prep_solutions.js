const fs = require('fs');
let de = JSON.parse(fs.readFileSync('solutions_missing_de.json', 'utf8'));
let hu = require('./messages/hu.json').solutions;

// For vorfertigung
hu.vorfertigung.intro = {
  ...hu.vorfertigung.intro,
  p1: "A nagy projektek esetében az építkezésen az idő az egyik legnagyobb költségtényező. Képzett telepítőkkel végezni a hegesztést rossz időjárás, szűk aknák és feszített határidők mellett – ez hibákhoz és késésekhez vezet.",
  p2: "Az előregyártással ezeket a kockázatokat áthelyezzük egy ellenőrzött környezetbe. A németországi üzemünkben található mérnökeink átveszik a csőhálózati terveket (CAD/BIM), és mikrométeres pontosságú, teljesen hegesztett, tesztelt csomópontokat építenek.",
  quote: "Nem csupán csöveket szállítunk. Plug-and-play infrastruktúrát szállítunk.",
  p3: "Tapasztalataink szerint az előregyártott elosztók telepítési ideje az építkezésen akár 70%-kal is csökkenhet. Kevesebb hulladék, kevesebb szerszámigény a helyszínen, és garantált nulla hibaarány a gyári nyomáspróbáknak köszönhetően."
};
hu.vorfertigung.sticky = de.vorfertigung.sticky;
hu.vorfertigung.bento = de.vorfertigung.bento;
hu.vorfertigung.visual = de.vorfertigung.visual;
hu.vorfertigung.timeline = de.vorfertigung.timeline;
hu.vorfertigung.manifesto = de.vorfertigung.manifesto;
hu.vorfertigung.cta = de.vorfertigung.cta;

// For hochhaus
hu.hochhaus.intro = de.hochhaus.intro;
hu.hochhaus.sticky = de.hochhaus.sticky;
hu.hochhaus.bento = de.hochhaus.bento;
hu.hochhaus.timeline = de.hochhaus.timeline;
hu.hochhaus.data = de.hochhaus.data;

fs.writeFileSync('solutions_missing_hu.json', JSON.stringify({
  vorfertigung: hu.vorfertigung,
  hochhaus: hu.hochhaus
}, null, 2));
