const fs = require('fs');
const file = 'messages/de.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.resources.support.seoText = {
  "p1": "Der technische Support von K-Aqua ist das Rückgrat unserer weltweiten Infrastrukturprojekte. Wir wissen, dass bei der Installation von industriellen Rohrleitungssystemen und PP-R Hochleistungsleitungen jede Sekunde zählt. Unser Expertenteam für Fluidtechnik und Polymersysteme steht internationalen Generalunternehmern, Architekten und Bauingenieuren bei jedem Schritt zur Seite.",
  "p2": "Von der initialen Planung und isometrischen Kalkulation über die Auslegung der Druckverlustberechnung bis hin zur Überwachung der Schweißprozesse vor Ort – wir garantieren eine fehlerfreie Implementierung. Unsere Polypropylen-Random-Copolymerisat (PP-R) Systeme erfordern höchste handwerkliche Präzision. Deshalb bietet unsere Academy kontinuierliche Schulungen, während der Support bei komplexen thermischen Längenausdehnungen oder speziellen Fließdruckanforderungen eingreift.",
  "p3": "Durch den Einsatz modernster Diagnosewerkzeuge und vorausschauender Wartungsalgorithmen minimieren wir Ausfallzeiten auf ein absolutes Minimum. Egal ob es sich um Kaltwassersysteme in Wüstenregionen, hochreine Industrieanlagen oder Heizungsnetzwerke in arktischen Zonen handelt – die K-Aqua Support-Infrastruktur sichert den reibungslosen Betrieb und die kompromisslose Langlebigkeit Ihrer Investition."
};

fs.writeFileSync(file, JSON.stringify(data, null, 2));
