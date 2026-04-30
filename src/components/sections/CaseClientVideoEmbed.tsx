'use client';

import { useState } from 'react';
import Image from 'next/image';

type CaseClientVideoEmbedProps = {
  youtubeId: string;
  title: string;
  eyebrow?: string;
  summary?: string;
};

function thumbnailUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function CaseClientVideoEmbed({ youtubeId, title, eyebrow, summary }: CaseClientVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-gray-200 bg-blue-ink shadow-sm">
      <div className="relative aspect-video bg-black">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1`}
            title={title}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group relative block h-full w-full overflow-hidden text-left"
            aria-label={`Lire la vidéo : ${title}`}
          >
            {thumbnailFailed ? (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,189,164,0.28),_transparent_34%),linear-gradient(135deg,#07111B,#102A3D)]" />
            ) : (
              <Image
                src={thumbnailUrl(youtubeId)}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                quality={70}
                onError={() => setThumbnailFailed(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-white/20 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <svg width="28" height="32" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-0.5">
                  <path d="M1 1.5L14 9L1 16.5V1.5Z" fill="white" />
                </svg>
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              {eyebrow && (
                <p className="mb-2 font-title text-xs font-semibold uppercase tracking-[0.22em] text-mint-green md:text-sm">
                  {eyebrow}
                </p>
              )}
              <p className="max-w-2xl text-lg font-title font-bold leading-tight text-white md:text-2xl">
                {title}
              </p>
            </div>
          </button>
        )}
      </div>
      {summary && (
        <div className="bg-white p-5 text-sm leading-relaxed text-gray-anthracite md:p-6">
          {summary}
        </div>
      )}
    </div>
  );
}
