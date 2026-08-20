/* K-Aqua 3D — React-Komponente für Next.js (App Router).

   Kopierfertig. Sie kapselt die drei Dinge, die beim Einbau schiefgehen:
   den einen WebGL-Kontext, das Nachziehen der Bühnengröße und das
   Freigeben der Geometrie beim Wechsel.

   ── EINBAU ──
   1. lib/ nach public/kaqua-3d/lib/ kopieren
   2. three installieren:  npm i three@^0.184.0
   3. Diese Datei nach components/KaquaViewer.jsx
   4. Verwenden:

        import KaquaViewer from '@/components/KaquaViewer';
        <KaquaViewer productId="fittings/cap" />

   ── WARUM 'use client' ──
   Der Viewer braucht WebGL, also den Browser. Als Server-Komponente
   gerendert wirft er beim Import von three.

   ── WARUM DYNAMISCHER IMPORT ──
   lib/index.mjs zieht den Core nach; ein statischer Import legte ihn ins
   erste Bundle. Mit dem dynamischen Import lädt er erst, wenn die
   Komponente montiert — bei 27 Modellen der Unterschied zwischen 40 kB
   und 680 kB.
*/

'use client';

import { useEffect, useRef, useState } from 'react';

export default function KaquaViewer({
  productId,
  size,                       // Startgröße, sonst product.defaultSize
  features,                   // ['size','explode','section','dims','presets']
  basePath = '/kaqua-3d',
  className,
  style,
}) {
  const hostRef = useRef(null);
  const appRef = useRef(null);
  const [fehler, setFehler] = useState(null);

  useEffect(() => {
    let abgebrochen = false;
    const host = hostRef.current;
    if (!host) return;

    (async () => {
      try {
        /* stage.js registriert die Custom Element <three-d-stage> global.
           Es ist ein klassisches Skript, kein Modul — deshalb per <script>
           und nicht per import. Zweimal laden ist unschädlich, aber
           unnötig: das id-Attribut verhindert es. */
        if (!window.customElements.get('three-d-stage')) {
          await new Promise((res, rej) => {
            const vorhanden = document.getElementById('kaqua-stage-js');
            if (vorhanden) { vorhanden.addEventListener('load', res); return; }
            const s = document.createElement('script');
            s.id = 'kaqua-stage-js';
            s.src = basePath + '/lib/stage.js';
            s.onload = res;
            s.onerror = () => rej(new Error('stage.js nicht ladbar: ' + s.src));
            document.head.appendChild(s);
          });
        }

        const mod = await import(/* webpackIgnore: true */ basePath + '/lib/index.mjs');
        if (abgebrochen) return;

        const product = await mod.loadProduct(productId);
        if (abgebrochen) return;

        const app = mod.mount(product, { host, size, features });
        appRef.current = app;

        if (!app.ok) setFehler('kein WebGL2 — Maßtabelle wird angezeigt');
      } catch (e) {
        if (!abgebrochen) setFehler(e.message);
      }
    })();

    return () => {
      abgebrochen = true;
      /* Beim Verlassen die Geometrie freigeben. Ohne das wächst der
         GPU-Speicher mit jedem Seitenwechsel, bis der Kontext verloren
         geht — bei einer SPA nach wenigen Navigationen. */
      const app = appRef.current;
      if (app && app.built && app.built.dispose) app.built.dispose();
      appRef.current = null;
      if (host) host.textContent = '';
    };
  }, [productId, size, features, basePath]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ position: 'relative', minHeight: 420, ...style }}
      data-kaqua-viewer={productId}
    >
      {fehler ? (
        <p
          style={{
            padding: '12px 16px',
            font: '500 13px/1.5 var(--font-sans, system-ui, sans-serif)',
            color: 'var(--color-text-tertiary, #71717a)',
          }}
        >
          {fehler}
        </p>
      ) : null}
    </div>
  );
}

/* ── Nur die Produktliste, ohne Viewer ──

   Für Übersichtsseiten: liefert id, slug, titleDe, titleEn und category
   für alle vorhandenen Modelle, ohne ein einziges davon zu laden.

     import { useKaquaRegistry } from '@/components/KaquaViewer';
     const { registry } = useKaquaRegistry();
*/
export function useKaquaRegistry(basePath = '/kaqua-3d') {
  const [registry, setRegistry] = useState([]);
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    let abgebrochen = false;
    import(/* webpackIgnore: true */ basePath + '/lib/registry.mjs')
      .then((m) => {
        if (abgebrochen) return;
        setRegistry(m.REGISTRY);
        setBereit(true);
      })
      .catch(() => setBereit(true));
    return () => { abgebrochen = true; };
  }, [basePath]);

  return { registry, bereit };
}

/* ── Ein Viewer für viele Kacheln ──

   Die Ein-Kontext-Regel gilt seitenweit, nicht komponentenweit. Wer
   mehrere Kacheln zeigt, darf NICHT mehrere KaquaViewer montieren:
   Browser erlauben 8 bis 16 WebGL-Kontexte, danach verwirft der Treiber
   die ältesten und die Seite bricht ab.

   Muster: ein einziger KaquaViewer, dessen productId der Klick setzt.

     const [aktiv, setAktiv] = useState(null);

     <div className="grid">
       {registry.map((p) => (
         <article key={p.id}>
           <h3>{p.titleDe}</h3>
           {aktiv === p.id
             ? <KaquaViewer productId={p.id} />
             : <button onClick={() => setAktiv(p.id)}>3D starten</button>}
         </article>
       ))}
     </div>

   Das entspricht der Galerie in dist/kaqua-3d-galerie.html, die ihre
   Bühne zwischen Kopfbereich und Kacheln umhängt. Der Unterschied: dort
   wandert das DOM-Element, hier wird die Komponente neu montiert. Beides
   hält genau einen Kontext.
*/
