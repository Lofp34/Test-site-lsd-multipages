'use client';

import React from 'react';
import { Button } from './Button';
import { useABTest } from '@/utils/ab-testing';

interface ABTestButtonProps {
  // Props Button standard
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  
  // A/B Testing
  testId: string;
  defaultText: string;
  defaultClassName?: string;
}

const ABTestButton: React.FC<ABTestButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  disabled = false,
  testId,
  defaultText,
  defaultClassName = ''
}) => {
  const { variant: abVariant, isActive } = useABTest(testId);
  
  // Déterminer le texte final
  const finalText = isActive && abVariant ? abVariant.text : defaultText;
  
  // Déterminer les classes CSS finales
  let finalClassName = className;
  
  if (isActive && abVariant && abVariant.metadata?.colorClass) {
    // Remplacer les classes de couleur par celles du variant A/B
    finalClassName = `${defaultClassName} ${abVariant.metadata.colorClass}`;
  } else {
    finalClassName = `${defaultClassName} ${className}`;
  }
  
  // Log pour debug en développement
  if (process.env.NODE_ENV === 'development' && isActive && abVariant) {
    console.log(`A/B Test Button - Test: ${testId}, Variant: ${abVariant.id}`, {
      originalText: defaultText,
      finalText,
      originalClassName: className,
      finalClassName,
      metadata: abVariant.metadata
    });
  }
  
  return (
    <Button
      variant={variant}
      size={size}
      icon={icon}
      className={finalClassName}
      disabled={disabled}
      data-ab-test={testId}
      data-ab-variant={abVariant?.id}
      data-ab-active={isActive}
    >
      {finalText}
    </Button>
  );
};

export default ABTestButton;