import React from 'react';
import Link from 'next/link';
import TrackedButton from './TrackedButton';

interface NegotiationCTAProps {
  variant: 'diagnostic' | 'bootcamp' | 'consultation' | 'resources';
  title: string;
  description: string;
  buttonText: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
  ctaId: string;
  section: string;
  position?: number;
}

const NegotiationCTA: React.FC<NegotiationCTAProps> = ({
  variant,
  title,
  description,
  buttonText,
  href,
  icon,
  className = '',
  ctaId,
  section,
  position
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'diagnostic':
        return {
          gradient: 'bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg',
          iconBg: 'bg-red-600',
          buttonVariant: 'primary' as const,
          accentColor: 'text-red-600'
        };
      case 'bootcamp':
        return {
          gradient: 'bg-gradient-to-br from-orange-600 via-red-500/10 to-primary-bg',
          iconBg: 'bg-orange-600',
          buttonVariant: 'secondary' as const,
          accentColor: 'text-orange-600'
        };
      case 'consultation':
        return {
          gradient: 'bg-gradient-to-br from-red-700 via-orange-600/10 to-primary-bg',
          iconBg: 'bg-red-700',
          buttonVariant: 'primary' as const,
          accentColor: 'text-red-700'
        };
      case 'resources':
        return {
          gradient: 'bg-gradient-to-br from-orange-500 via-red-400/10 to-primary-bg',
          iconBg: 'bg-orange-500',
          buttonVariant: 'ghost' as const,
          accentColor: 'text-orange-500'
        };
      default:
        return {
          gradient: 'bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg',
          iconBg: 'bg-red-600',
          buttonVariant: 'primary' as const,
          accentColor: 'text-red-600'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`
      relative ${styles.gradient} rounded-2xl p-6 
      border border-red-200/30 backdrop-blur-sm
      hover:shadow-xl hover:shadow-red-500/10 
      transition-all duration-300 group
      ${className}
    `}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          {icon && (
            <div className={`
              w-12 h-12 ${styles.iconBg} rounded-2xl 
              flex items-center justify-center text-white text-xl
            `}>
              {icon}
            </div>
          )}
          <h3 className={`text-xl font-bold ${styles.accentColor}`}>
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-primary-secondary/90 leading-relaxed mb-6">
          {description}
        </p>

        {/* CTA Button */}
        {href.startsWith('http') ? (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <TrackedButton
              variant={styles.buttonVariant}
              size="md"
              ctaId={ctaId}
              ctaText={buttonText}
              ctaType="primary"
              section={section}
              destination={href}
              position={position}
              className="w-full sm:w-auto"
            >
              {buttonText}
            </TrackedButton>
          </a>
        ) : (
          <Link href={href} className="inline-block">
            <TrackedButton
              variant={styles.buttonVariant}
              size="md"
              ctaId={ctaId}
              ctaText={buttonText}
              ctaType="primary"
              section={section}
              destination={href}
              position={position}
              className="w-full sm:w-auto"
            >
              {buttonText}
            </TrackedButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NegotiationCTA;