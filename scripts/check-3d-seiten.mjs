/* K-Aqua 3D — statische Seitenprüfung (LOOP-STATUS §3.26, Teil 1 von 2).

   Prüft für jede der gebauten Produktseiten, dass der Server sie
   ausliefert und dass sie ihr Produktmodul referenziert und die
   Moduldatei existiert. Das ist die Prüfung, die OHNE Browser möglich
   ist; was nur eine laufende Seite zeigen kann (window.kaqua, tote
   Größenknöpfe), prüft Teil 2: /kaqua-3d/seiten-pruefstand.html im
   Browser öffnen und window.pruefstand.results lesen.

   Die Trennung ist erzwungen, nicht gewählt: dieses Repository hat
   keinen Headless-Browser (kein puppeteer/playwright), und ein Node-
   Skript kann eine WebGL-Seite nicht fahren.

   Aufruf:  node scripts/check-3d-seiten.mjs   (Server auf 8731 muss laufen:
            cd public && python3 -m http.server 8731) */

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASIS = process.env.KAQUA_BASIS || 'http://localhost:8731/kaqua-3d';

const { REGISTRY } = await import(
  new URL('../kaqua-3d/dist/lib/registry.mjs', import.meta.url)
);

let fehler = 0;
const zeile = (s, ok, grund) => {
  console.log((ok ? '  ok    ' : '  FEHLT ') + s + (grund ? ' — ' + grund : ''));
  if (!ok) fehler++;
};

console.log('Seitenprüfung (statisch) gegen ' + BASIS + ' — ' + REGISTRY.length + ' Produkte\n');

for (const p of REGISTRY) {
  const seite = p.module + '.html';
  let html = null;
  try {
    const r = await fetch(BASIS + '/' + seite);
    if (r.status !== 200) { zeile(seite, false, 'HTTP ' + r.status); continue; }
    html = await r.text();
  } catch (e) {
    zeile(seite, false, 'Server nicht erreichbar: ' + e.message);
    continue;
  }
  /* Die Seite trägt ihr Produkt als eingebettetes Modul oder als
     Verweis — in beiden Fällen muss der Modulname im Quelltext stehen. */
  if (!html.includes(p.module)) {
    zeile(seite, false, 'Seite nennt ihr Modul nicht — falscher oder leerer Inhalt');
    continue;
  }
  const modulDatei = join(wurzel, 'public/kaqua-3d/lib/products', p.slug + '.mjs');
  if (!existsSync(modulDatei)) {
    zeile(seite, false, 'lib/products/' + p.slug + '.mjs fehlt in public/');
    continue;
  }
  zeile(seite, true);
}

console.log('\n' + (REGISTRY.length - fehler) + ' von ' + REGISTRY.length + ' Seiten statisch in Ordnung' +
  (fehler ? ' — ' + fehler + ' FEHLER' : ''));
console.log('Teil 2 (lebende Seiten): ' + BASIS + '/seiten-pruefstand.html öffnen,');
console.log('window.pruefstand.results lesen. Ohne Teil 2 ist nichts bewiesen (Fall 38).');
process.exit(fehler ? 1 : 0);
