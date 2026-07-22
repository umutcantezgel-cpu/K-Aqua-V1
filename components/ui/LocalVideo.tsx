/* eslint-disable react/jsx-no-literals */

import React from 'react';
import JsonLd from '@/components/seo/JsonLd';

export interface LocalVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** Local path to the video (e.g. /videos/factory.mp4) */
  src: string;
  /** Title for SEO schema */
  title: string;
  /** Description for SEO schema */
  description?: string;
  /** Upload date for SEO schema (ISO string). Defaults to 2026-01-01T08:00:00+08:00 */
  uploadDate?: string;
  /** The fallback YouTube URL, kept strictly for SEO */
  fallbackYoutubeUrl?: string;
  /** Optional poster image */
  poster?: string;
}

export function LocalVideo({
  src,
  title,
  description = "K-Aqua PP-R / PP-RCT piping system video.",
  uploadDate = "2026-01-01T08:00:00+08:00",
  fallbackYoutubeUrl,
  poster,
  className = "",
  ...props
}: LocalVideoProps) {
  // Create VideoObject schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "uploadDate": uploadDate,
    "contentUrl": fallbackYoutubeUrl || src, // Keep YouTube URL as contentUrl if provided for SEO
    "embedUrl": fallbackYoutubeUrl,
  };

  return (
    <div className={`relative w-full aspect-video rounded-lg overflow-hidden bg-black ${className}`}>
      <JsonLd schema={schema} />
      <video
        src={src}
        title={title}
        controls
        preload="metadata"
        poster={poster}
        className="w-full h-full object-cover"
        {...props}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
