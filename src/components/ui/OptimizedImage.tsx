import React from 'react';
import Image from 'next/image';

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
  style?: React.CSSProperties;
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
  style,
  ...props
}) => {
  // Generate optimized image sources for different formats
  const getOptimizedSrc = (originalSrc: string, format: 'avif' | 'webp' | 'original') => {
    // If it's already an external URL, return as is
    if (originalSrc.startsWith('http') || originalSrc.startsWith('//')) {
      return originalSrc;
    }

    // For local images, we'll rely on Next.js Image optimization
    // which automatically serves AVIF/WebP when supported by the browser
    return originalSrc;
  };

  // Generate blur placeholder for better loading experience
  const generateBlurDataURL = (w: number = 10, h: number = 10) => {
    const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
    if (!canvas) return undefined;
    
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    
    // Create a simple gradient blur placeholder
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#F2F5F7');
    gradient.addColorStop(0.5, '#00BDA4');
    gradient.addColorStop(1, '#1B365D');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(width, height);

  // Common props for Next.js Image component
  const imageProps = {
    src: getOptimizedSrc(src, 'original'),
    alt,
    className: `transition-all duration-300 ${className}`,
    priority,
    quality,
    placeholder: placeholder as any,
    blurDataURL: placeholder === 'blur' ? defaultBlurDataURL : undefined,
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: {
      objectFit: 'cover',
      ...style
    },
    ...props
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
    />
  );
};

// Higher-order component for AI/Digital themed images with special effects
interface AIThemedImageProps extends OptimizedImageProps {
  theme?: 'circuit' | 'neural' | 'data' | 'futuristic';
  glowEffect?: boolean;
  hoverEffect?: boolean;
}

export const AIThemedImage: React.FC<AIThemedImageProps> = ({
  theme = 'circuit',
  glowEffect = false,
  hoverEffect = true,
  className = '',
  ...props
}) => {
  const themeClasses = {
    circuit: 'border-2 border-cyan-400/30 shadow-cyan-400/20',
    neural: 'border-2 border-purple-400/30 shadow-purple-400/20',
    data: 'border-2 border-blue-400/30 shadow-blue-400/20',
    futuristic: 'border-2 border-mint-green/30 shadow-mint-green/20'
  };

  const effectClasses = [
    themeClasses[theme],
    glowEffect ? 'animate-tech-glow' : '',
    hoverEffect ? 'hover:scale-105 hover:shadow-2xl' : '',
    'rounded-xl overflow-hidden transition-all duration-500'
  ].filter(Boolean).join(' ');

  return (
    <div className={`relative ${effectClasses} ${className}`}>
      <OptimizedImage {...props} className="w-full h-full" />
      
      {/* Overlay effects for AI theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Corner tech elements */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-mint-green rounded-full animate-pulse delay-300 opacity-60" />
    </div>
  );
};

export default OptimizedImage;