'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate blur placeholder for better UX
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined);

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center text-gray-400">
          <ImageIcon size={48} className="mx-auto mb-2" />
          <p className="text-sm">Image non disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
    >
      {/* Loading skeleton */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          sizes={sizes || (fill ? '100vw' : undefined)}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${objectFit === 'cover' ? 'object-cover' : 
              objectFit === 'contain' ? 'object-contain' : 
              objectFit === 'fill' ? 'object-fill' : 
              objectFit === 'none' ? 'object-none' : 'object-scale-down'}`}
          loading={priority ? 'eager' : loading || 'lazy'} // Default loading="lazy" for performance
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Placeholder when not in view */}
      {!isInView && !priority && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-mint-green rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;