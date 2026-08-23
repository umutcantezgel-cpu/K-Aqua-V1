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
  // VideoObject.
  //
  // Drei Korrekturen gegenüber der vorherigen Fassung:
  //
  // 1. `@id` ergänzt. Ohne stabile Kennung stand der Knoten außerhalb jedes
  //    Graphen und war weder referenzierbar noch als dieselbe Entität
  //    erkennbar, wenn dasselbe Video auf zwei Seiten liegt.
  // 2. `contentUrl` zeigt jetzt auf die Videodatei, `embedUrl` auf die
  //    Einbettungsadresse. Zuvor stand in beiden Feldern dieselbe
  //    YouTube-Zuschauer-Adresse samt Zeitmarke (`&t=20s`) — das ist weder
  //    eine Mediendatei noch eine Einbettungsadresse.
  // 3. `thumbnailUrl` wird aus dem Standbild abgeleitet, sofern eines gesetzt
  //    ist. Google verlangt es für Video-Rich-Results; ohne das Feld ist der
  //    Knoten dafür ohnehin nicht zugelassen.
  //
  // Offen bleibt `uploadDate`: Der Vorgabewert ist ein gesetztes Datum, kein
  // erhobenes. Wer ein Video einbindet, sollte das tatsächliche
  // Veröffentlichungsdatum übergeben.
  const embedUrl = fallbackYoutubeUrl
    ? fallbackYoutubeUrl.replace(
        /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]+).*$/,
        'https://www.youtube.com/embed/$1'
      )
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${src}#video`,
    "name": title,
    "description": description,
    "uploadDate": uploadDate,
    "contentUrl": src,
    ...(embedUrl ? { embedUrl } : {}),
    ...(poster ? { thumbnailUrl: poster } : {}),
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
