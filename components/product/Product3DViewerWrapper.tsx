'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Product3DViewerSkeleton = () => (
  <div className="w-full h-full min-h-[400px] lg:min-h-[500px] relative rounded-3xl overflow-hidden bg-gradient-to-tr from-card to-background border border-card-border shadow-2xl flex items-center justify-center animate-pulse">
    <div className="flex flex-col items-center gap-4 text-muted-foreground/60">
      <div className="w-12 h-12 rounded-xl bg-card-border/60" />
      <span className="text-xs font-semibold uppercase tracking-wider">Loading 3D Engine...</span>
    </div>
  </div>
);

const LazyProduct3DViewer = dynamic(() => import('./Product3DViewer'), {
  ssr: false,
  loading: () => <Product3DViewerSkeleton />
});

interface Product3DViewerWrapperProps {
  category: string;
}

export default function Product3DViewerWrapper({ category }: Product3DViewerWrapperProps) {
  return (
    <Suspense fallback={<Product3DViewerSkeleton />}>
      <LazyProduct3DViewer category={category} />
    </Suspense>
  );
}
