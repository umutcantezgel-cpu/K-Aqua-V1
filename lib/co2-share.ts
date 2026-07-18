export function co2EncodeHash(p: any) {
  try { return '#s=' + btoa(unescape(encodeURIComponent(JSON.stringify(p)))); } catch (e) { return ''; }
}

export function co2DecodeHash() {
  try {
    if (typeof location === 'undefined') return null;
    const m = location.hash.match(/#s=(.+)/);
    if (!m) return null;
    return JSON.parse(decodeURIComponent(escape(atob(m[1]))));
  } catch (e) { return null; }
}

export function co2Download(name: string, blob: Blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
}

export function co2Slug(meta?: string) {
  return 'kaqua-co2-' + String(meta || 'export').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
}

export function co2ExportCsv(series: any[], horizon: number, meta: string) {
  const head = ['Jahr'].concat(series.map((s) => s.label)).join(';');
  const lines = [head];
  const n = series[0] ? series[0].points.length : 0;
  for (let i = 0; i < n; i++) {
    const row = [series[0].points[i].year];
    series.forEach((s) => { row.push(String((s.points[i] ? s.points[i].value : 0).toFixed(1)).replace('.', ',')); });
    lines.push(row.join(';'));
  }
  lines.push(''); 
  lines.push(((window as any).CO2_DISCLAIMER || '') + ' — ' + (meta || ''));
  co2Download(co2Slug(meta) + '.csv', new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' }));
}

export function co2ExportPng(svgEl: SVGElement | null, meta: string) {
  if (!svgEl) return;
  const clone = svgEl.cloneNode(true) as SVGElement;
  const src = svgEl.querySelectorAll('*');
  const dst = clone.querySelectorAll('*');
  const props = ['fill', 'stroke', 'stop-color', 'stroke-width', 'opacity', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin'];
  for (let i = 0; i < src.length; i++) {
    const cs = getComputedStyle(src[i]);
    props.forEach((p) => { const v = cs.getPropertyValue(p); if (v) dst[i].setAttribute(p, v); });
  }
  const W = 2000, H = 760, CAP = 88;
  clone.setAttribute('width', String(W)); 
  clone.setAttribute('height', String(H));
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const bodyCs = getComputedStyle(document.body);
  const bg = bodyCs.backgroundColor && bodyCs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? bodyCs.backgroundColor : '#0A0A0F';
  const fg = bodyCs.color || '#fff';
  const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = W; c.height = H + CAP;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H + CAP);
    ctx.drawImage(img, 0, 0, W, H);
    ctx.fillStyle = fg; ctx.globalAlpha = 0.85;
    ctx.font = '600 26px system-ui, sans-serif';
    ctx.fillText('K-Aqua CO₂-Rechner · ' + (meta || ''), 32, H + 36);
    ctx.globalAlpha = 0.55; ctx.font = '400 20px system-ui, sans-serif';
    ctx.fillText(((window as any).CO2_DISCLAIMER || '').slice(0, 140), 32, H + 68);
    URL.revokeObjectURL(url);
    c.toBlob((b) => { if (b) co2Download(co2Slug(meta) + '.png', b); }, 'image/png');
  };
  img.src = url;
}
