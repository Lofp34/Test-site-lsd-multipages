'use client';

import React, { useState } from 'react';
import { Play, Image as ImageIcon, FileText, Download, Eye, Maximize2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import OptimizedImage from '@/components/ui/OptimizedImage';

export interface ToolPreviewProps {
  title: string;
  description: string;
  benefits: string[];
  preview: {
    type: 'image' | 'video' | 'demo' | 'document';
    src: string;
    alt: string;
    thumbnail?: string;
  };
  features?: string[];
  difficulty?: 'Facile' | 'Intermédiaire' | 'Avancé';
  estimatedTime?: string;
  format?: string;
  onPreviewClick?: () => void;
  className?: string;
}

const ToolPreview: React.FC<ToolPreviewProps> = ({
  title,
  description,
  benefits,
  preview,
  features,
  difficulty,
  estimatedTime,
  format,
  onPreviewClick,
  className = ''
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getPreviewIcon = () => {
    switch (preview.type) {
      case 'video':
        return <Play size={24} className="text-white" />;
      case 'image':
        return <ImageIcon size={24} className="text-white" />;
      case 'demo':
        return <Eye size={24} className="text-white" />;
      case 'document':
        return <FileText size={24} className="text-white" />;
      default:
        return <Eye size={24} className="text-white" />;
    }
  };

  const getPreviewLabel = () => {
    switch (preview.type) {
      case 'video':
        return 'Voir la vidéo';
      case 'image':
        return 'Voir l\'aperçu';
      case 'demo':
        return 'Voir la démo';
      case 'document':
        return 'Voir le document';
      default:
        return 'Voir l\'aperçu';
    }
  };

  return (
    <div className={`bg-white dark:bg-blue-ink/80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Preview Section */}
      <div className="relative">
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden group">
          <OptimizedImage
            src={preview.thumbnail || preview.src}
            alt={preview.alt}
            fill
            objectFit="cover"
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-all duration-500 group-hover:scale-105"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />

          {/* Preview Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={onPreviewClick}
              className="bg-mint-green hover:bg-mint-green/90 text-white rounded-full p-4 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg"
              aria-label={getPreviewLabel()}
            >
              {getPreviewIcon()}
            </button>
          </div>

          {/* Preview Type Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="default" size="sm" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
              {preview.type === 'video' && '🎥 Vidéo'}
              {preview.type === 'image' && '🖼️ Image'}
              {preview.type === 'demo' && '🎯 Démo'}
              {preview.type === 'document' && '📄 Document'}
            </Badge>
          </div>

          {/* Expand Button */}
          <button
            onClick={onPreviewClick}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            aria-label="Agrandir l'aperçu"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header with Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {difficulty && (
            <Badge variant="difficulty" difficulty={difficulty} size="sm">
              {difficulty}
            </Badge>
          )}
          {estimatedTime && (
            <Badge variant="outline" size="sm" className="text-gray-600 dark:text-gray-300">
              ⏱️ {estimatedTime}
            </Badge>
          )}
          {format && (
            <Badge variant="outline" size="sm" className="text-gray-600 dark:text-gray-300">
              📁 {format}
            </Badge>
          )}
        </div>

        {/* Title and Description */}
        <AnimatedSection animation="fade-in" delay={100}>
          <h3 className="text-xl font-bold text-blue-ink dark:text-white mb-3">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {description}
          </p>
        </AnimatedSection>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <AnimatedSection animation="slide-up" delay={200}>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-blue-ink dark:text-mint-green mb-2 uppercase tracking-wide">
                Bénéfices clés
              </h4>
              <ul className="space-y-2">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="inline-block w-1.5 h-1.5 bg-mint-green rounded-full mt-2 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
              {benefits.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  +{benefits.length - 3} autres bénéfices
                </p>
              )}
            </div>
          </AnimatedSection>
        )}

        {/* Features */}
        {features && features.length > 0 && (
          <AnimatedSection animation="slide-up" delay={300}>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-blue-ink dark:text-mint-green mb-2 uppercase tracking-wide">
                Fonctionnalités
              </h4>
              <div className="flex flex-wrap gap-2">
                {features.slice(0, 4).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
                {features.length > 4 && (
                  <span className="inline-block bg-mint-green/10 text-mint-green text-xs px-2 py-1 rounded-md">
                    +{features.length - 4}
                  </span>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Action Button */}
        <AnimatedSection animation="slide-up" delay={400}>
          <button
            onClick={onPreviewClick}
            className="w-full bg-gradient-to-r from-mint-green to-mint-green/90 hover:from-mint-green/90 hover:to-mint-green text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Download size={18} />
            {getPreviewLabel()}
          </button>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ToolPreview;