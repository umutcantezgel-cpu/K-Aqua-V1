/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-no-literals */
'use client';

import React, { useEffect, useState } from 'react';
import Native3DCanvas from '@/components/3d/Native3DCanvas';

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
  className,
  basePath = '/kaqua-3d',
}: KaquaViewerProps) {
  return (
    <Native3DCanvas
      productId={productId}
      initialSize={size}
      basePath={basePath}
      className={className}
      showControls={true}
      showSizeSelector={true}
      autoRotateDefault={true}
    />
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
