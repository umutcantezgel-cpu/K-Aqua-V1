/* K-Aqua 3D · Galerie.

   Alle 71 Produkte auf einer Seite. Jede Kachel ist ein in sich
   geschlossenes <article> — genau so wandert sie später auf ihre
   Produktseite, ohne dass am Seitencode etwas geändert wird.

   Die Regel, an der die Seite hängt: höchstens EIN aktiver
   WebGL-Kontext. Es gibt genau eine <three-d-stage>; sie beginnt im
   Kopfbereich und wandert beim Klick in die gewählte Kachel. Browser
   erlauben 8–16 Kontexte, danach verwirft der Treiber die ältesten und
   die Seite bricht ab. Zehn Kacheln nacheinander zu starten muss
   funktionieren — deshalb wird der laufende Viewer beim Start eines
   neuen abgebaut, nicht bloß versteckt.

   Zustand steht in der URL (?kategorie=…&q=…&ansicht=…&produkt=…),
   damit Ansichten teilbar sind. Kein localStorage. */

import { REGISTRY, KATEGORIEN } from './registry.js';
import { PRODUCTS } from './products.js';

export const GALLERY_CSS = String.raw`
  .gal { max-width: 1280px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-9); }

  .gal-head { display: grid; gap: var(--space-3); margin-bottom: var(--space-6); }
  .gal-head h1 {
    margin: 0; font: var(--font-weight-black) clamp(30px, 4.4vw, 52px)/1.04 var(--font-display);
    letter-spacing: -0.035em; text-transform: uppercase;
  }
  .gal-head h1 em { font-style: normal; color: var(--color-primary-700); }
  .gal-head p { margin: 0; max-width: 58ch; color: var(--color-text-secondary); font-size: 15px; line-height: 1.65; text-wrap: pretty; }
  .gal-count {
    display: inline-flex; align-items: center; gap: 8px; width: fit-content;
    padding: 5px 12px; border-radius: var(--radius-full);
    background: var(--color-primary-50); color: var(--color-primary-800);
    font: var(--font-weight-semibold) 12px/1 var(--font-sans);
    border: 1px solid var(--color-primary-100); white-space: nowrap;
  }
  .gal-count b { font-variant-numeric: tabular-nums; }

  /* Kopfbereich: der eine Viewer, sofort bedienbar */
  .hero {
    position: relative; height: clamp(340px, 46vh, 520px);
    border: 1px solid var(--color-border-default); border-radius: var(--radius-2xl);
    background: radial-gradient(120% 90% at 50% 12%, #fff 0%, var(--color-neutral-100) 78%);
    overflow: hidden; margin-bottom: var(--space-6);
  }
  .hero.empty::after {
    content: 'Viewer läuft in einer Kachel — hier klicken holt ihn zurück';
    position: absolute; inset: 0; display: grid; place-items: center;
    font: var(--font-weight-medium) 13px/1 var(--font-sans); color: var(--color-text-tertiary);
  }
  .hero-cap {
    position: absolute; left: var(--space-4); bottom: var(--space-4); z-index: 2;
    font: var(--font-weight-semibold) 13px/1.4 var(--font-sans); color: var(--color-text-primary);
    pointer-events: none;
  }
  .hero-cap span { display: block; font-weight: var(--font-weight-regular); font-size: 11.5px; color: var(--color-text-tertiary); }

  /* Filterleiste */
  .bar2 {
    display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: center;
    padding: var(--space-2); margin-bottom: var(--space-5);
    background: #fff; border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);
    position: sticky; top: 8px; z-index: 20; backdrop-filter: blur(8px);
  }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .chip {
    all: unset; box-sizing: border-box;
    min-height: 44px; padding: 0 16px; display: inline-flex; align-items: center;
    font: var(--font-weight-semibold) 13.5px/1 var(--font-sans); color: var(--color-text-secondary);
    border-radius: var(--radius-xl); cursor: pointer;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .chip:hover { background: var(--color-neutral-100); color: var(--color-text-primary); }
  .chip[aria-pressed="true"] { background: var(--color-primary-700); color: #fff; }
  .chip:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  .search {
    box-sizing: border-box;
    flex: 1 1 190px; min-width: 150px; min-height: 44px; padding: 0 16px;
    font: 14px/1 var(--font-sans); color: var(--color-text-primary);
    background: var(--color-neutral-50); border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
  }
  .search:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 1px; }

  /* Raster */
  /* grid-auto-rows: 1fr gleicht ALLE Kacheln auf dieselbe Höhe an.
     Ohne das streckt der längste Titel oder die längste
     Artikelnummernzeile ihre Reihe, und das Raster wird unruhig — bei
     71 Kacheln mit Titeln von „Kappe" bis „Metallverschraubung mit
     PP-R-Mutter (Innengewinde)" gut sichtbar. */
  .grid {
    display: grid; gap: var(--space-4);
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-auto-rows: 1fr;
  }
  .grid.list { grid-template-columns: 1fr; }

  .tile {
    display: grid; grid-template-rows: auto 1fr auto;
    background: #fff; border: 1px solid var(--color-border-default);
    border-radius: var(--radius-2xl); box-shadow: var(--shadow-sm); overflow: hidden;
    transition: all var(--duration-normal) var(--ease-default);
  }
  .tile:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
  .tile.on { box-shadow: var(--shadow-lg); transform: none; border-color: var(--color-primary-300); }
  .grid.list .tile { grid-template-columns: 220px 1fr; grid-template-rows: auto; align-items: center; }

  .tile-stage {
    position: relative; aspect-ratio: 4 / 3; min-height: 168px;
    background: radial-gradient(120% 90% at 50% 14%, #fff 0%, var(--color-neutral-100) 80%);
    border-bottom: 1px solid var(--color-border-subtle);
    display: grid; place-items: center;
  }
  .grid.list .tile-stage { border-bottom: 0; border-right: 1px solid var(--color-border-subtle); aspect-ratio: 4/3; }
  /* Beide Mounts, nicht nur der Kachel-Mount: die Komponente bringt im
     Shadow DOM :host { height: 100vh } mit. Ohne diese Regel wächst die
     Bühne im Hero über ihren Container hinaus und wird beschnitten. */
  .hero three-d-stage,
  .tile-stage three-d-stage { position: absolute; inset: 0; width: 100%; height: 100%; }

  .tile-body { padding: var(--space-4); display: grid; gap: 6px; align-content: start; }
  /* Zwei Zeilen Platz, dann Ellipse. Ohne feste Höhe streckt der
     längste Titel einer Reihe alle Kacheln darin — bei 71 Produkten mit
     Titeln von „Kappe" bis „Metallverschraubung mit PP-R-Mutter
     (Innengewinde)" ergibt das ein unruhiges Raster. */
  .tile h2 {
    margin: 0; font: var(--font-weight-bold) 15px/1.25 var(--font-display);
    letter-spacing: -0.012em; min-height: 2.5em;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tile .en { font: 11.5px/1.3 var(--font-sans); color: var(--color-text-tertiary); }
  /* Der Datenblock wächst nach unten in den freien Raum, damit die
     Fußzeile aller Kacheln auf gleicher Höhe sitzt. */
  .tile-body { align-content: start; }
  .tile dl { display: flex; flex-wrap: wrap; gap: 3px 14px; margin: 4px 0 0; }
  .tile dl div { display: flex; gap: 5px; align-items: baseline; }
  .tile dt { font: 9.5px/1.2 var(--font-sans); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-tertiary); }
  .tile dd { margin: 0; font: var(--font-weight-medium) 11.5px/1.2 var(--font-sans); font-variant-numeric: tabular-nums; }

  /* wrap, damit Knopf und Link untereinander rutschen statt ihre Labels
     zu brechen — die Pillenform bleibt in jedem Fall einzeilig. */
  .tile-foot { padding: 0 var(--space-4) var(--space-4); display: flex; flex-wrap: wrap;
               gap: 8px; align-items: center; }
  /* Knöpfe folgen .btn des Website-UI-Kits: 48 px hoch, min-height 44,
     Radius xl, Hover -2px. Nicht frei gewählt — die Kachel landet später
     auf einer Produktseite im Mobilkontext, dort zählt das Tippziel. */
  .go {
    all: unset; box-sizing: border-box; white-space: nowrap;
    height: 48px; min-height: 44px; padding: 0 18px;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font: var(--font-weight-semibold) 15px/1 var(--font-display); color: #fff;
    background: var(--color-primary-700); border-radius: var(--radius-xl); cursor: pointer;
    box-shadow: 0 10px 20px rgba(20, 122, 122, 0.25);
    transition: all var(--duration-normal) var(--ease-default);
  }
  .go:hover { background: var(--color-primary-800); transform: translateY(-2px);
              box-shadow: 0 16px 30px rgba(20, 122, 122, 0.3); }
  .go:active { transform: translateY(0); }
  .go:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  .go svg { width: 18px; height: 18px; }
  .link {
    display: inline-flex; align-items: center; min-height: 44px; padding: 0 10px;
    white-space: nowrap;
    font: var(--font-weight-semibold) 13px/1 var(--font-sans); color: var(--color-primary-700);
    text-decoration: none; border-radius: var(--radius-lg);
  }
  .link:hover { color: var(--color-primary-800); background: var(--color-neutral-100); }
  .link:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }

  .soon { opacity: 0.72; }
  .soon .tile-stage { background: var(--color-neutral-100); }
  .badge {
    display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px;
    font: var(--font-weight-semibold) 10.5px/1 var(--font-sans); letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--color-text-tertiary);
    border: 1px dashed var(--color-border-strong); border-radius: var(--radius-full);
  }
  .tile-stage .badge { min-height: 0; padding: 8px 14px; }
  /* Prototyp-Kennzeichen als Ecküberlagerung auf der Bühne. In der
     Fußzeile stapelte es die Reihe auf drei Elemente und streckte die
     ganze Grid-Zeile um 71 px — bei mehreren Prototypen nebeneinander
     wäre das Raster unruhig geworden. */
  .proto-flag {
    position: absolute; top: 8px; left: 8px; z-index: 3;
    padding: 5px 10px; border-radius: var(--radius-md);
    font: var(--font-weight-bold) 9.5px/1 var(--font-sans);
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--color-accent-700); background: var(--color-accent-50);
    border: 1px solid var(--color-accent-300); pointer-events: none;
  }
  .fam { font: 10px/1 var(--font-mono); color: var(--color-text-tertiary); }

  .empty-note { padding: var(--space-7) 0; text-align: center; color: var(--color-text-tertiary); font-size: 14px; }

  @media (max-width: 640px) {
    .gal { padding: var(--space-4) var(--space-3) var(--space-7); }
    .grid.list .tile { grid-template-columns: 1fr; }
    .bar2 { position: static; }
  }
`;

const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
const escG = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function mountGallery(host) {
  const params = new URLSearchParams(location.search);
  let cat = params.get('kategorie') || 'alle';
  let q = params.get('q') || '';
  let view = params.get('ansicht') === 'liste' ? 'liste' : 'raster';

  /* Ein Prädikat für „hat ein Modell" — Badge UND Kachel benutzen es.
     Vorher zählte der Badge nur 'fertig', während tileHTML alles außer
     'offen' als vorhanden behandelte: Badge 27, Startknöpfe 28. Zwei
     Definitionen desselben Begriffs in einer Datei, dieselbe
     Fehlerklasse wie Fall 28. */
  const hasModel = (p) => p.status !== 'offen';
  const done = REGISTRY.filter(hasModel).length;
  const vorlaeufig = REGISTRY.filter((p) => p.status === 'prototyp').length;

  host.insertAdjacentHTML('afterbegin', `
<main class="gal">
  <header class="gal-head">
    <span class="gal-count"><b>${done}</b> von <b>${REGISTRY.length}</b> Produkten als 3D-Modell verfügbar${vorlaeufig ? ' · ' + vorlaeufig + ' vorläufig' : ''}</span>
    <h1>Das ganze System<br><em>dreidimensional</em></h1>
    <p>Jedes Modell ist maßhaltig aus der Herstellertabelle gebaut. Nennweite
    wechseln, Bauteil zerlegen, aufschneiden — und im Schnitt sehen, was ein
    Katalogfoto nicht zeigen kann.</p>
  </header>

  <div class="hero" id="hero">
    <div class="hero-cap" id="heroCap"></div>
  </div>

  <div class="bar2" role="group" aria-label="Filter">
    <div class="chips" id="cats">
      <button type="button" class="chip" data-cat="alle">Alle</button>
${KATEGORIEN.map((k) => `      <button type="button" class="chip" data-cat="${k.key}">${escG(k.de)}</button>`).join('\n')}
    </div>
    <input type="search" class="search" id="q" placeholder="Titel oder Artikelnummer, z. B. AQ13032" aria-label="Suche">
    <div class="chips" id="views">
      <button type="button" class="chip" data-view="raster">Raster</button>
      <button type="button" class="chip" data-view="liste">Liste</button>
    </div>
  </div>

  <div class="grid" id="grid"></div>
  <p class="empty-note" id="none" hidden>Keine Treffer. Filter zurücksetzen oder anders suchen.</p>
</main>`);

  const $ = (id) => document.getElementById(id);
  const grid = $('grid');
  const hero = $('hero');
  const heroCap = $('heroCap');

  /* Die eine Bühne. Sie existiert genau einmal und wird umgehängt. */
  const stage = document.createElement('three-d-stage');
  stage.setAttribute('background', 'transparent');
  stage.setAttribute('role', 'img');
  hero.appendChild(stage);

  /* ── Zustand ──
     mountId IST der Ort der Bühne: null bedeutet Kopfbereich, ein Wert
     bedeutet diese Kachel. Vorher gab es zwei Wahrheiten — die Bühne
     stand im Hero, während der Zustand auf eine Kachel zeigte, und das
     nächste render() hat sie dorthin umgehängt, ohne Hero-Klasse,
     Bildunterschrift und URL nachzuziehen. */
  let active = null;    // laufende Baugruppe
  let mountId = null;   // null = Kopfbereich
  let heroProduct = null;
  const clip = null;

  /* Die einzige Stelle, die die Bühne bewegt. Alles Abhängige wird hier
     aus mountId abgeleitet, nirgends sonst. */
  function place(id) {
    const slot = id === null ? hero
      : grid.querySelector('[data-slot="' + CSS.escape(id) + '"]');
    if (!slot) return place(null);   // Kachel ausgefiltert → zurück in den Kopf
    mountId = id;
    if (stage.parentElement !== slot) slot.appendChild(stage);
    // Der Wechsel in einen anders großen Container löst den internen
    // ResizeObserver nicht zuverlässig aus, und beim appendChild hat der
    // Slot noch keine Layoutgröße — daher zweimal.
    stage.resize();
    requestAnimationFrame(() => stage.resize());
    hero.classList.toggle('empty', id !== null);
    heroCap.hidden = id !== null;
    grid.querySelectorAll('.tile').forEach((t) => t.classList.toggle('on', t.dataset.id === id));
    writeUrl();
  }

  function writeUrl() {
    const u = new URLSearchParams();
    if (cat !== 'alle') u.set('kategorie', cat);
    if (q.trim()) u.set('q', q.trim());
    if (view !== 'raster') u.set('ansicht', view);
    // Nur eine echte Kachelansicht ist teilbar. Steht die Bühne im
    // Kopfbereich, darf die URL kein Produkt behaupten.
    if (mountId) u.set('produkt', mountId);
    history.replaceState(null, '', u.toString() ? '?' + u : location.pathname);
  }

  /* Ein Titel, eine Quelle: das Produktmodul, sobald es existiert.
     Vorher kam die Kachel aus registry.de und der Viewer aus
     product.titleDe — bei sechs Produkten wichen sie ab, und weil der
     Suchfilter über die Kachelquelle lief, fand „Reduzierbuchse"
     (der Titel, den der Viewer anzeigt) nichts. */
  const titleOf = (p) => (PRODUCTS[p.id] ? PRODUCTS[p.id].titleDe : p.de);
  const titleEnOf = (p) => (PRODUCTS[p.id] ? PRODUCTS[p.id].titleEn : p.en);

  /* Größenbereich in der Schreibweise des Produkts. Mehrstufige
     Produkte bringen eine sizeLabel-Funktion mit ('40x25' → 'd40 → d25',
     '32x1' → 'd32 · R1"'); ein selbst zusammengesetztes 'd' + Schlüssel
     ergäbe dort Unsinn. Trägt das Label schon ein Trennzeichen, wird
     der Bereich mit „bis" verbunden — sonst steht ein zweiter
     Bindestrich mitten im Ausdruck. */
  function rangeOf(p) {
    const mod = PRODUCTS[p.id];
    if (!mod) return String(p.n);
    const fmt = mod.sizeLabel || ((s) => 'd' + s);
    const a = fmt(mod.sizes[0]);
    const b = fmt(mod.sizes[mod.sizes.length - 1]);
    if (a === b) return a;
    return /[–—→·]/.test(a) ? a + ' bis ' + b : a + '–' + b;
  }

  function tileHTML(p) {
    const ready = hasModel(p);
    const mod = PRODUCTS[p.id];
    // Das Wort „Größen" steht bereits im <dt> — hier nur der Wert.
    const range = rangeOf(p);
    return `
<article class="tile${ready ? '' : ' soon'}" data-id="${escG(p.id)}" data-cat="${escG(p.cat)}">
  <div class="tile-stage" data-slot="${escG(p.id)}">
    ${ready ? '' : '<span class="badge">3D-Modell in Vorbereitung</span>'}
    ${p.status === 'prototyp' ? '<span class="proto-flag">Maße vorläufig</span>' : ''}
  </div>
  <div class="tile-body">
    <h2>${escG(titleOf(p))}</h2>
    <span class="en">${escG(titleEnOf(p))}</span>
    <dl>
      <div><dt>Artikel</dt><dd>${escG(p.codes[0])}${p.codes[1] !== p.codes[0] ? '–' + escG(p.codes[1]) : ''}</dd></div>
      <div><dt>Größen</dt><dd>${escG(range)}</dd></div>
      <div><dt>Familie</dt><dd class="fam">${escG(p.fam)}</dd></div>
    </dl>
  </div>
  <div class="tile-foot">
    ${mod ? `<button type="button" class="go" data-start="${escG(p.id)}">${ARROW}3D starten</button>` : ''}
    <a class="link" href="${escG(p.url)}" target="_top">Zur Produktseite</a>
  </div>
</article>`;
  }

  function render() {
    const needle = q.trim().toLowerCase();
    /* p.alle trägt JEDE Artikelnummer des Produkts. Vorher lief der
       Filter über p.codes — das sind nur die erste und die letzte, also
       fand eine Nummer aus der Mitte der Preisliste nichts. */
    /* Gesucht wird über den ANGEZEIGTEN Titel plus den Registry-Namen:
       so findet sowohl, wer vom Viewer kommt, als wer den Katalognamen
       kennt. p.alle trägt jede Artikelnummer des Produkts. */
    const rows = REGISTRY.filter((p) => {
      if (cat !== 'alle' && p.cat !== cat) return false;
      if (!needle) return true;
      const hay = (titleOf(p) + ' ' + titleEnOf(p) + ' ' + p.de + ' ' + p.en).toLowerCase();
      return hay.includes(needle) || (p.alle || '').includes(needle) || p.id.includes(needle);
    });
    grid.innerHTML = rows.map(tileHTML).join('');
    grid.classList.toggle('list', view === 'liste');
    $('none').hidden = rows.length > 0;
    [...$('cats').children].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === cat)));
    [...$('views').children].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    // innerHTML hat den alten Slot zerstört: an denselben Ort zurückhängen.
    place(mountId);
  }

  /* Modell bauen und an seinen Ort setzen. slotId === null heißt Kopfbereich. */
  async function show(productId, slotId) {
    const mod = PRODUCTS[productId];
    if (!mod) return;
    await stage.ready;
    if (active) { active.dispose(); active = null; }
    const built = mod.build(mod.defaultSize, null, clip);
    const holder = new stage.three.Group();
    holder.name = 'mm_to_m';
    holder.scale.setScalar(0.001);
    holder.add(built.root);
    stage.setAttribute('name', mod.module + '-d' + mod.defaultSize);
    stage.setAttribute('aria-label', mod.titleDe + ' — dreidimensionale Produktansicht');
    stage.setObject(holder);
    active = built;
    heroCap.innerHTML = '<b>' + escG(mod.titleDe) + '</b>' +
      '<span>Ziehen zum Drehen · Scrollen zum Zoomen</span>';
    place(slotId);
  }

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-start]');
    if (b) show(b.dataset.start, b.dataset.start);
  });
  // Klick in den leeren Kopfbereich holt das Aushängemodell zurück.
  hero.addEventListener('click', () => { if (mountId !== null) show(heroProduct.id, null); });

  $('cats').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-cat]');
    if (b) { cat = b.dataset.cat; render(); }
  });
  $('views').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-view]');
    if (b) { view = b.dataset.view; render(); }
  });
  const qi = $('q');
  qi.value = q;
  qi.addEventListener('input', (e) => { q = e.target.value; render(); });

  render();

  /* Startzustand: der Kugelhahn im Kopfbereich — das reichste Modell.
     Steht ?produkt=… in der URL und ist die Kachel sichtbar, startet
     stattdessen dieses Produkt in seiner Kachel. */
  heroProduct = PRODUCTS['valves/pp-r-ball-valve-ball-in-pp'] ||
    PRODUCTS[REGISTRY.find((p) => PRODUCTS[p.id]).id];
  const wanted = params.get('produkt');
  if (wanted && PRODUCTS[wanted] && grid.querySelector('[data-slot="' + CSS.escape(wanted) + '"]')) {
    show(wanted, wanted);
  } else {
    show(heroProduct.id, null);
  }
}
