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
  /** Upload date for SEO schema (ISO string). Defaults to 2026-07-08, the day the videos were published on this site. */
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
  uploadDate = "2026-07-08T00:00:00+02:00",
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
  // `uploadDate`: Der Vorgabewert war „2026-01-01T08:00:00+08:00" — ein frei
  // gesetztes Datum, dazu mit einer Zeitzone (+08:00), die zu einem deutschen
  // Hersteller nicht passt. Jetzt steht dort der Tag, an dem die Videodateien
  // tatsächlich in dieses Repository und damit auf die Seite kamen
  // (`git log --diff-filter=A` über public/videos/: 08.07.2026, alle fünf im
  // selben Commit), mit deutscher Zeitzone.
  //
  // Das ist bewusst das Veröffentlichungsdatum AUF DIESER SEITE, nicht das
  // Aufnahmedatum — letzteres ist nirgends belegt. Genau das verlangt
  // schema.org: „The date when this media object was uploaded to this site."
  // Wer ein Video mit bekanntem Datum einbindet, übergibt es weiterhin selbst.
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
