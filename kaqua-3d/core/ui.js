/* K-Aqua 3D · Core — Bedienrahmen.

   HTML-Gerüst und CSS des Viewers. Produktneutral: Größenknöpfe,
   Metaleiste, Zustandstext und Fallback-Maßtabelle werden aus dem
   Produktvertrag erzeugt. Kein Produkt fügt eigene UI hinzu.

   features steuert, was erscheint:
     'size' 'explode' 'section' 'dims' 'presets'
   Der Auf/Zu-Knopf erscheint nur, wenn product.states gesetzt ist. */

export const FRAME_CSS = String.raw`
*, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--color-text-link); text-decoration: none; }
  a:hover { color: var(--color-primary-800); }
  three-d-stage:not(:defined) { visibility: hidden; }

  .viewer {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--space-4) var(--space-4) var(--space-5);
    gap: var(--space-3);
  }

  /* Datenblatt-Kopf */
  .meta { display: flex; align-items: baseline; gap: var(--space-3); flex-wrap: wrap; }
  .overline {
    font: var(--font-weight-bold) 10px/1.2 var(--font-sans);
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--color-text-tertiary);
  }
  .art { font: var(--font-weight-semibold) 15px/1 var(--font-display); letter-spacing: -0.01em; }
  .meta dl { display: flex; gap: var(--space-3); margin: 0; flex-wrap: wrap; }
  .meta dl div { display: flex; gap: 5px; align-items: baseline; }
  .meta dl div[hidden] { display: none; }
  .meta dt { font: 10px/1.2 var(--font-sans); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-tertiary); }
  .meta dd { margin: 0; font: var(--font-weight-medium) 12px/1.2 var(--font-sans); font-variant-numeric: tabular-nums; }

  /* Bühne */
  .stagebox {
    position: relative;
    min-height: 0;
    border-radius: var(--radius-2xl);
    background:
      radial-gradient(120% 90% at 50% 12%, #ffffff 0%, var(--color-neutral-100) 78%);
    border: 1px solid var(--color-border-default);
    overflow: hidden;
    outline: none;
  }
  .stagebox:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  three-d-stage { position: absolute; inset: 0; width: 100%; height: 100%; }

  .skeleton {
    position: absolute; inset: 0;
    display: grid; place-items: center;
    background: var(--color-neutral-100);
    animation: pulse 1.6s var(--ease-in-out) infinite;
  }
  .skeleton span { width: 46%; height: 26%; border-radius: var(--radius-full); background: var(--color-neutral-200); }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

  .overlay { position: absolute; inset: 0; pointer-events: none; }
  .lbl {
    position: absolute;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font: var(--font-weight-medium) 11px/1 var(--font-sans);
    color: var(--color-text-secondary);
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: var(--radius-full);
    padding: 4px 9px;
    opacity: 0; transition: opacity var(--duration-fast) var(--ease-default);
  }
  .lbl.on { opacity: 1; }
  .dimlbl {
    position: absolute; transform: translate(-50%, -50%);
    font: var(--font-weight-semibold) 11px/1 var(--font-sans);
    font-variant-numeric: tabular-nums;
    color: var(--color-secondary-900);
    background: rgba(255, 255, 255, 0.92);
    border-radius: var(--radius-sm);
    padding: 2px 5px;
    opacity: 0; transition: opacity var(--duration-fast) var(--ease-default);
  }
  .dimlbl.on { opacity: 1; }
  .hot { position: absolute; transform: translate(-50%, -50%); pointer-events: auto; }
  .hot button {
    all: unset;
    display: block; width: 14px; height: 14px; border-radius: var(--radius-full);
    background: var(--color-primary-700);
    box-shadow: 0 0 0 4px rgba(20, 122, 122, 0.18);
    cursor: pointer;
  }
  .hot button:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 3px; }
  .hot .tip {
    position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%) translateY(4px);
    width: max-content; max-width: 210px;
    font: 11px/1.45 var(--font-sans); color: var(--color-text-inverse);
    background: var(--color-secondary-900);
    border-radius: var(--radius-md); padding: 7px 10px;
    opacity: 0; pointer-events: none;
    transition: opacity var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-default);
  }
  .hot:hover .tip, .hot button:focus-visible + .tip { opacity: 1; transform: translateX(-50%) translateY(0); }

  .state {
    position: absolute; left: var(--space-4); bottom: var(--space-4);
    font: var(--font-weight-medium) 11.5px/1.4 var(--font-sans);
    color: var(--color-text-secondary);
  }
  .state b { font-weight: var(--font-weight-bold); color: var(--color-text-primary); }
  .hint { margin: 3px 0 0; font: 10.5px/1.4 var(--font-sans); color: var(--color-text-tertiary); }

  /* rechte Kante: Darstellungs-Toggles */
  .edge {
    position: absolute; right: var(--space-4); top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 4px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(8px);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xs);
  }
  .edge button {
    all: unset;
    display: grid; place-items: center;
    width: 38px; height: 38px; border-radius: var(--radius-lg);
    color: var(--color-text-secondary); cursor: pointer;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .edge button:hover { background: var(--color-neutral-100); color: var(--color-text-primary); }
  .edge button[aria-pressed="true"] { background: var(--color-primary-700); color: #fff; }
  .edge button:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  .edge svg { width: 19px; height: 19px; }

  .slider {
    position: absolute; right: calc(var(--space-4) + 52px); top: 50%;
    transform: translateY(-50%);
    display: none; align-items: center; gap: var(--space-2);
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xs);
  }
  .slider.on { display: flex; }
  .slider label { font: var(--font-weight-medium) 10px/1 var(--font-sans); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); }
  .slider input { width: 110px; accent-color: var(--color-primary-700); }

  /* untere Leiste */
  .bar {
    display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;
    padding: var(--space-2);
    background: var(--color-card-bg);
    border: 1px solid var(--color-card-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
  }
  .seg { display: flex; gap: 2px; padding: 2px; background: var(--color-neutral-100); border-radius: var(--radius-lg); }
  .seg button {
    all: unset;
    min-height: 34px; padding: 0 11px;
    display: grid; place-items: center;
    font: var(--font-weight-semibold) 12px/1 var(--font-sans);
    font-variant-numeric: tabular-nums;
    color: var(--color-text-secondary);
    border-radius: var(--radius-md); cursor: pointer;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .seg button:hover { color: var(--color-text-primary); }
  .seg button[aria-pressed="true"] { background: #fff; color: var(--color-primary-700); box-shadow: var(--shadow-xs); }
  .seg button:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 1px; }

  .grp { display: flex; align-items: center; gap: var(--space-2); }
  .grp > .overline { margin-right: 2px; }
  .btn {
    all: unset;
    min-height: 40px; padding: 0 var(--space-4);
    display: inline-flex; align-items: center; gap: 8px;
    font: var(--font-weight-semibold) 13px/1 var(--font-display);
    color: #fff; background: var(--color-button-primary-bg);
    border-radius: var(--radius-xl); cursor: pointer;
    transition: transform var(--duration-normal) var(--ease-default),
                background var(--duration-fast), box-shadow var(--duration-normal);
  }
  .btn:hover { background: var(--color-button-primary-hover); transform: translateY(-1px); box-shadow: var(--shadow-glow); }
  .btn:active { transform: scale(0.97); }
  .btn:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  .btn svg { width: 16px; height: 16px; }
  .ghost {
    all: unset;
    min-height: 34px; padding: 0 11px;
    display: inline-flex; align-items: center;
    font: var(--font-weight-medium) 12px/1 var(--font-sans);
    color: var(--color-text-secondary); border-radius: var(--radius-lg); cursor: pointer;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .ghost:hover { background: var(--color-neutral-100); color: var(--color-text-primary); }
  .ghost:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 1px; }
  .spacer { flex: 1 1 auto; }

  .fallback { display: none; padding: var(--space-5); }
  .fallback table { border-collapse: collapse; font: 12px/1.5 var(--font-sans); font-variant-numeric: tabular-nums; }
  .fallback th, .fallback td { border-bottom: 1px solid var(--color-border-default); padding: 5px 12px 5px 0; text-align: left; }
  .nogl .fallback { display: block; }
  .nogl three-d-stage, .nogl .edge, .nogl .slider, .nogl .state { display: none; }

  .sr {
    position: absolute; width: 1px; height: 1px; overflow: hidden;
    clip-path: inset(50%); white-space: nowrap;
  }

  @media (max-width: 720px) {
    .viewer { padding: var(--space-3) var(--space-3) var(--space-4); gap: var(--space-2); }
    .edge { flex-direction: row; top: auto; bottom: var(--space-3); left: 50%; right: auto; transform: translateX(-50%); }
    .slider { top: auto; bottom: calc(var(--space-3) + 52px); left: 50%; right: auto; transform: translateX(-50%); }
    .state { bottom: calc(var(--space-3) + 52px); font-size: 11px; }
    .meta dl { display: none; }
  }
`;

const ICONS = {
  explode: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
  section: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/>' +
    '<path d="M12 3.5H6.5A3 3 0 0 0 3.5 6.5v11a3 3 0 0 0 3 3H12z" fill="currentColor" opacity=".28" stroke="none"/>' +
    '<path d="M12 3.5v17"/>',
  dims: '<path d="M3 14h18M5 14v-3.5M9.66 14v-2M14.33 14v-2M19 14v-3.5M3 18.5h18"/>',
  toggle: '<path d="M4 12h16M14 6l6 6-6 6"/>',
};
const svg = (d, w) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
  (w || 1.7) + '" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const de = (v) =>
  typeof v === 'number' || typeof v === 'string' ? String(v).replace('.', ',') : v;

/* Die Spalten der Fallback-Tabelle: alles, was dimensionKey benennt und
   in den Artikeln tatsächlich vorkommt, plus Gewicht. */
export function tableColumns(product) {
  const keys = Object.keys(product.dimensionKey || {});
  const has = (k) => product.articles.some((a) => a[k] !== undefined && a[k] !== null);
  const cols = keys.filter(has);
  if (has('kg')) cols.push('kg');
  return cols;
}

export function fallbackTable(product) {
  const cols = tableColumns(product);
  const head = cols.map((k) => '<th>' + esc(k === 'kg' ? 'kg' : k) + '</th>').join('');
  const rows = product.articles.map((a) =>
    '<tr><td>' + esc(a.code) + '</td>' +
    cols.map((k) => '<td>' + esc(de(a[k] ?? '—')) + '</td>').join('') + '</tr>').join('\n        ');
  return '<table>\n        <caption class="sr">Maßtabelle ' + esc(product.titleDe) + '</caption>\n' +
    '        <tr><th>Code</th>' + head + '</tr>\n        ' + rows + '\n      </table>';
}

export function frameHTML(product, opt = {}) {
  const f = new Set(opt.features || ['size', 'explode', 'section', 'dims', 'presets']);
  const size = opt.size ?? product.defaultSize;
  const key = product.sizeKey || 'd';
  const first = product.articles.find((a) => String(a[key]) === String(size)) || product.articles[0];
  const meta = (product.metaFields || ['d']).map((k) =>
    '<div id="mw_' + esc(k) + '"' + (first[k] == null ? ' hidden' : '') +
    '><dt>' + esc(k === 'kg' ? 'Gewicht' : k) + '</dt><dd id="m_' + esc(k) + '">' +
    esc(k === 'kg' ? de(Number(first.kg).toFixed(2)) + ' kg' : de(first[k] ?? '—')) +
    '</dd></div>').join('');

  const edge = [];
  if (f.has('explode')) edge.push(['tExplode', 'Explosionsansicht', ICONS.explode]);
  if (f.has('section')) edge.push(['tSection', 'Schnittansicht', ICONS.section]);
  if (f.has('dims')) edge.push(['tDims', 'Bemaßung', ICONS.dims]);

  const st = product.states;
  const stateLine = st
    ? '<b>' + esc(st.open.short) + '</b> — ' + esc(st.open.note)
    : '<b>' + esc(product.titleDe) + '</b>';
  const hint = 'Ziehen zum Drehen · Scrollen zum Zoomen' +
    (st && st.pickHint ? ' · ' + esc(st.pickHint) : '');

  return `<main class="viewer" id="viewer">
  <header class="meta">
    <span class="overline">${esc(product.brandLine || 'K-Aqua')}</span>
    <span class="art" id="artNo">${esc(first.code)}</span>
    <dl id="metaList">${meta}</dl>
  </header>

  <div class="stagebox" id="stagebox" tabindex="0"
       aria-label="Interaktive 3D-Ansicht. Pfeiltasten drehen, Plus und Minus zoomen${st ? ', O schaltet auf und zu' : ''}, R setzt zurück.">
    <three-d-stage id="stage" name="${esc(product.module || 'kaqua')}-d${esc(size)}"
                   background="transparent" autorotate role="img"
                   aria-label="${esc(product.titleDe)} ${esc(first.code)}, dreidimensionale Produktansicht"></three-d-stage>
    <div class="overlay" id="ov"></div>
    <div class="skeleton" id="skel" aria-hidden="true"><span></span></div>
${edge.length ? `
    <div class="edge" role="group" aria-label="Darstellung">
${edge.map(([id, label, d]) => `      <button type="button" id="${id}" aria-pressed="false" title="${label}" aria-label="${label}">
        ${svg(d)}
      </button>`).join('\n')}
    </div>` : ''}
${f.has('explode') ? `
    <div class="slider" id="explodeWrap">
      <label for="explodeRange">Explosion</label>
      <input type="range" id="explodeRange" min="0" max="100" value="0" step="1" aria-label="Explosionsgrad">
    </div>` : ''}

    <div class="state">
      <span id="stateLbl">${stateLine}</span>
      <p class="hint">${hint}</p>
    </div>

    <div class="fallback" id="fallback">
      <p class="overline">3D-Ansicht nicht verfügbar (kein WebGL)</p>
      ${fallbackTable(product)}
    </div>
  </div>

  <footer class="bar">
${f.has('size') && product.sizes.length > 1 ? `    <div class="grp">
      <span class="overline">${esc(product.sizeTitle || 'Nennweite')}</span>
      <div class="seg" id="sizes" role="group" aria-label="Nennweite wählen">
${product.sizes.map((s) => `        <button type="button" data-d="${s}" aria-pressed="${String(s) === String(size)}">${esc(product.sizeLabel ? product.sizeLabel(s) : 'd' + s)}</button>`).join('\n')}
      </div>
    </div>` : ''}
${st ? `    <button type="button" class="btn" id="btnState" aria-pressed="true">
      ${svg(ICONS.toggle, 1.9)}
      <span id="btnStateLbl">${esc(st.closed.action)}</span>
    </button>` : ''}
    <div class="spacer"></div>
${f.has('presets') ? `    <div class="grp" id="presets" role="group" aria-label="Ansicht">
      <span class="overline">Ansicht</span>
      <button type="button" class="ghost" data-v="iso">3/4</button>
      <button type="button" class="ghost" data-v="front">Front</button>
      <button type="button" class="ghost" data-v="top">Draufsicht</button>
${f.has('section') ? '      <button type="button" class="ghost" data-v="section">Schnitt</button>' : ''}
    </div>` : ''}
  </footer>
</main>`;
}
