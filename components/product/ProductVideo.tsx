'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LocalVideo } from '@/components/ui/LocalVideo';

interface ProductVideoProps {
  category: string;
}

interface VideoData {
  src: string;
  youtubeId: string;
  title: string;
}

// Maps product SEO categories to specific K-Aqua videos
function getVideoForCategory(category: string): VideoData {
  const cat = category.toLowerCase();
  
  if (cat.includes('electrofusion') || cat.includes('elektroschweiss')) {
    return {
      src: '/videos/electrofusion.mp4',
      youtubeId: 'ob2wMFZgm0k',
      title: 'K-Aqua Electrofusion Welding'
    };
  }
  
  if (cat.includes('fittings') || cat.includes('transition')) {
    return {
      src: '/videos/socket-welding-hand.mp4',
      youtubeId: 'd56p048YB2o',
      title: 'K-Aqua Socket Welding by Hand'
    };
  }
  
  if (cat.includes('pipes')) {
    return {
      src: '/videos/factory.mp4',
      youtubeId: 'QDe3x9-ztHQ',
      title: 'Inside the K-Aqua Factory'
    };
  }
  
  // Default to factory tour
  return {
    src: '/videos/factory.mp4',
    youtubeId: 'QDe3x9-ztHQ',
    title: 'Inside the K-Aqua Factory'
  };
}

export default function ProductVideo({ category }: ProductVideoProps) {
  const video = getVideoForCategory(category);
  const t = useTranslations('products');
  
  return (
    <div className="w-full bg-card border border-card-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-card-border flex items-center justify-between bg-background-subtle">
        <h4 className="font-heading font-bold text-foreground text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
          {t('videoGuide')}
        </h4>
      </div>
      <LocalVideo
        src={video.src}
        title={video.title}
        fallbackYoutubeUrl={`https://www.youtube.com/watch?v=${video.youtubeId}`}
        className="rounded-none rounded-b-xl"
      />
    </div>
  );
}
