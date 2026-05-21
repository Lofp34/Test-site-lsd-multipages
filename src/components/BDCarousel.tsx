'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface BDImage {
  src: string;
  alt: string;
  index: number;
}

interface BDCarouselProps {
  images: BDImage[];
  title: string;
  maxPreview?: number;
  className?: string;
}

export default function BDCarousel({ images, title, maxPreview, className = '' }: BDCarouselProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  const previewCount = maxPreview ?? 4;
  const visibleImages = images.slice(0, previewCount);
  const hasMore = images.length > previewCount;

  return (
    <>
      {/* Grid */}
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {visibleImages.map((img, i) => (
          <button
            key={img.index}
            onClick={() => openLightbox(i)}
            className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-mint-green group"
          >
            <div className="aspect-[9/16] relative">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            {i === previewCount - 1 && hasMore && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-2xl font-bold font-title">+{images.length - previewCount}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:text-mint-green transition-colors z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50"
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm font-body z-10 bg-black/50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-mint-green transition-colors z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50"
            aria-label="Précédent"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-auto h-full max-h-[85vh] aspect-[9/16]">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 90vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-mint-green transition-colors z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50"
            aria-label="Suivant"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
