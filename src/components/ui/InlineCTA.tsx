'use client';

import React from 'react';
import Link from 'next/link';
import TrackedButton from './TrackedButton';
import { trackSectionView } from '@/utils/cta-tracking';

interface InlineCTAProps {
  variant: 'diagnostic' | 'bootcamp' | 'consultation' | 'resources';
  context: string; // Contexte où le CTA apparaît (ex: "after-case-study")
  title: string;
  description: string;
  buttonText: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
  compact?: boolean;
}

const InlineCTA: React.FC<InlineCTAProps> = ({
  variant,
  context,
  title,
  description,
  buttonText,
  href,
  icon,
  className = '',
  compact = false
}) => {
  React.useEffect(() => {
    trackSectionView(`inline_cta_${context}`);
  }, [context]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'diagnostic':
        return {
          bgGradient: 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
          borderColor: 'border-red-200/30',
          iconBg: 'bg-red-600',
          textColor: 'text-red-700 dark:text-red-400',
          buttonVariant: 'primary' as const
        };
      case 'bootcamp':
        return {
          bgGradient: 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
          borderColor: 'border-orange-200/30',
          iconBg: 'bg-orange-600',
          textColor: 'text-orange-700 dark:text-orange-400',
          buttonVariant: 'secondary' as const
        };
      case 'consultation':
        return {
          bgGradient: 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
          borderColor: 'border-red-200/30',
          iconBg: 'bg-red-700',
          textColor: 'text-red-700 dark:text-red-400',
          buttonVariant: 'primary' as const
        };
      case 'resources':
        return {
          bgGradient: 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
          borderColor: 'border-orange-200/30',
          iconBg: 'bg-orange-500',
          textColor: 'text-orange-700 dark:text-orange-400',
          buttonVariant: 'ghost' as const
        };
      default:
        return {
          bgGradient: 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
          borderColor: 'border-red-200/30',
          iconBg: 'bg-red-600',
          textColor: 'text-red-700 dark:text-red-400',
          buttonVariant: 'primary' as const
        };
    }
  };

  const styles = getVariantStyles();

  if (compact) {
    return (
      <div className={`
        ${styles.bgGradient} rounded-xl p-4 border ${styles.borderColor}
        hover:shadow-lg transition-all duration-300 group
        ${className}
      `}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && (
              <div className={`
                w-8 h-8 ${styles.iconBg} rounded-lg 
                flex items-center justify-center text-white text-sm
                group-hover:scale-110 transition-transform
              `}>
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold ${styles.textColor} truncate`}>
                {title}
              </h4>
              <p className="text-sm text-primary-secondary/80 truncate">
                {description}
              </p>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            {href.startsWith('http') ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                <TrackedButton
                  variant={styles.buttonVariant}
                  size="sm"
                  ctaId={`inline-${variant}-${context}`}
                  ctaText={buttonText}
                  ctaType="secondary"
                  section={`inline_cta_${context}`}
                  destination={href}
                  className="whitespace-nowrap"
                >
                  {buttonText}
                </TrackedButton>
              </a>
            ) : (
              <Link href={href}>
                <TrackedButton
                  variant={styles.buttonVariant}
                  size="sm"
                  ctaId={`inline-${variant}-${context}`}
                  ctaText={buttonText}
                  ctaType="secondary"
                  section={`inline_cta_${context}`}
                  destination={href}
                  className="whitespace-nowrap"
                >
                  {buttonText}
                </TrackedButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      ${styles.bgGradient} rounded-2xl p-6 border ${styles.borderColor}
      hover:shadow-xl transition-all duration-300 group
      ${className}
    `}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className={`
              w-12 h-12 ${styles.iconBg} rounded-2xl 
              flex items-center justify-center text-white text-xl
              group-hover:scale-110 transition-transform
            `}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${styles.textColor} mb-2`}>
              {title}
            </h3>
            <p className="text-primary-secondary/90 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-start">
          {href.startsWith('http') ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              <TrackedButton
                variant={styles.buttonVariant}
                size="md"
                ctaId={`inline-${variant}-${context}`}
                ctaText={buttonText}
                ctaType="secondary"
                section={`inline_cta_${context}`}
                destination={href}
              >
                {buttonText}
              </TrackedButton>
            </a>
          ) : (
            <Link href={href}>
              <TrackedButton
                variant={styles.buttonVariant}
                size="md"
                ctaId={`inline-${variant}-${context}`}
                ctaText={buttonText}
                ctaType="secondary"
                section={`inline_cta_${context}`}
                destination={href}
              >
                {buttonText}
              </TrackedButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default InlineCTA;