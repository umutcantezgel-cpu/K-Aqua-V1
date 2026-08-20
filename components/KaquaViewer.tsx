/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-no-literals */
/* K-Aqua 3D — React-Komponente für Next.js (App Router).
   Kapselt WebGL-Lifecycle, Ein-Kontext-Garantie, Doppel-Resize und GPU-Speicherbereinigung. */

'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface KaquaProductMeta {
  id: string;
  slug: string;
  module: string;
  titleDe: string;
  titleEn: string;
  category: string;
}

export interface KaquaViewerProps {
  productId: string;
  size?: number;
  features?: string[];
  basePath?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function KaquaViewer({
  productId,
  size,
  features,
  basePath = '/kaqua-3d',
  className,
  style,
}: KaquaViewerProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<any>(null);
  const [fehler, setFehler] = useState<string | null>(null);

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
        if (typeof window !== 'undefined' && !window.customElements.get('three-d-stage')) {
          await new Promise<void>((res, rej) => {
            const vorhanden = document.getElementById('kaqua-stage-js');
            if (vorhanden) {
              vorhanden.addEventListener('load', () => res());
              return;
            }
            const s = document.createElement('script');
            s.id = 'kaqua-stage-js';
            s.src = `${basePath}/lib/stage.js`;
            s.onload = () => res();
            s.onerror = () => rej(new Error(`stage.js nicht ladbar: ${s.src}`));
            document.head.appendChild(s);
          });
        }

        const mod = await import(/* webpackIgnore: true */ `${basePath}/lib/index.mjs`);
        if (abgebrochen) return;

        const product = await mod.loadProduct(productId);
        if (abgebrochen) return;

        const app = mod.mount(product, { host, size, features });
        appRef.current = app;

        if (!app.ok) {
          setFehler('kein WebGL2 — Maßtabelle wird angezeigt');
        }
      } catch (e: any) {
        if (!abgebrochen) {
          setFehler(e?.message || 'Fehler beim Laden des 3D-Modells');
        }
      }
    })();

    return () => {
      abgebrochen = true;
      /* Beim Verlassen die Geometrie freigeben. Ohne das wächst der
         GPU-Speicher mit jedem Seitenwechsel, bis der Kontext verloren
         geht — bei einer SPA nach wenigen Navigationen. */
      const app = appRef.current;
      if (app && app.built && typeof app.built.dispose === 'function') {
        app.built.dispose();
      }
      appRef.current = null;
      if (host) {
        host.textContent = '';
      }
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

/* ── Hook für die Produktliste aus der Registry ── */
export function useKaquaRegistry(basePath = '/kaqua-3d') {
  const [registry, setRegistry] = useState<KaquaProductMeta[]>([]);
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    let abgebrochen = false;
    import(/* webpackIgnore: true */ `${basePath}/lib/registry.mjs`)
      .then((m) => {
        if (abgebrochen) return;
        setRegistry(m.REGISTRY || []);
        setBereit(true);
      })
      .catch(() => setBereit(true));
    return () => {
      abgebrochen = true;
    };
  }, [basePath]);

  return { registry, bereit };
}
