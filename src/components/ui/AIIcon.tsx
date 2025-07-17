import React, { memo } from 'react';

interface AIIconProps {
  type: 'brain' | 'circuit' | 'network' | 'robot' | 'data' | 'automation' | 'digital' | 'future';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  color?: string;
  className?: string;
  'aria-label'?: string;
}

const AIIcon: React.FC<AIIconProps> = memo(({
  type,
  size = 'md',
  animated = false,
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const animationClass = animated ? 'animate-pulse' : '';

  // Accessibility labels for each icon type
  const defaultAriaLabels = {
    brain: 'Intelligence artificielle',
    circuit: 'Circuit électronique',
    network: 'Réseau connecté',
    robot: 'Robot automatisé',
    data: 'Analyse de données',
    automation: 'Automatisation',
    digital: 'Technologie numérique',
    future: 'Innovation future'
  };

  const renderIcon = () => {
    switch (type) {
      case 'brain':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5.5 3 1.5 4.5L12 22l4.5-9.5C17.5 11 18 9.5 18 8c0-3.5-2.5-6-6-6z"/>
            <circle cx="12" cy="8" r="3"/>
            <path d="M9 8h6"/>
            <path d="M10.5 6.5L13.5 9.5"/>
            <path d="M13.5 6.5L10.5 9.5"/>
          </svg>
        );
      
      case 'circuit':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M7 7h10"/>
            <path d="M7 12h10"/>
            <path d="M7 17h10"/>
            <circle cx="12" cy="7" r="1"/>
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="17" r="1"/>
          </svg>
        );
      
      case 'network':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <circle cx="6" cy="6" r="2"/>
            <circle cx="18" cy="6" r="2"/>
            <circle cx="6" cy="18" r="2"/>
            <circle cx="18" cy="18" r="2"/>
            <path d="M8.5 7.5L10.5 10.5"/>
            <path d="M15.5 7.5L13.5 10.5"/>
            <path d="M8.5 16.5L10.5 13.5"/>
            <path d="M15.5 16.5L13.5 13.5"/>
          </svg>
        );
      
      case 'robot':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
            <circle cx="9" cy="9" r="1"/>
            <circle cx="15" cy="9" r="1"/>
            <path d="M9 13h6"/>
            <path d="M12 2v4"/>
            <path d="M6 18v2"/>
            <path d="M18 18v2"/>
            <path d="M4 12h2"/>
            <path d="M18 12h2"/>
          </svg>
        );
      
      case 'data':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"/>
            <path d="M7 16l4-4 4 4 6-6"/>
            <circle cx="7" cy="16" r="1"/>
            <circle cx="11" cy="12" r="1"/>
            <circle cx="15" cy="16" r="1"/>
            <circle cx="21" cy="10" r="1"/>
          </svg>
        );
      
      case 'automation':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6"/>
            <path d="M12 17v6"/>
            <path d="M4.22 4.22l4.24 4.24"/>
            <path d="M15.54 15.54l4.24 4.24"/>
            <path d="M1 12h6"/>
            <path d="M17 12h6"/>
            <path d="M4.22 19.78l4.24-4.24"/>
            <path d="M15.54 8.46l4.24-4.24"/>
          </svg>
        );
      
      case 'digital':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            <path d="M7 8h10"/>
            <path d="M7 12h6"/>
          </svg>
        );
      
      case 'future':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M8 11l2 2 4-4"/>
            <circle cx="12" cy="12" r="1"/>
          </svg>
        );
      
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
        );
    }
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${animationClass} ${className}`}
      role="img"
      aria-label={ariaLabel || defaultAriaLabels[type]}
    >
      {renderIcon()}
    </div>
  );
});

AIIcon.displayName = 'AIIcon';

export default AIIcon;