import React, { memo } from 'react';

interface AIIconProps {
  type: 'brain' | 'circuit' | 'network' | 'robot' | 'data' | 'automation' | 'digital' | 'future' | 
        'target' | 'handshake' | 'leadership' | 'psychology' | 'process';
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
    future: 'Innovation future',
    target: 'Ciblage et prospection',
    handshake: 'Négociation et accord',
    leadership: 'Leadership et management',
    psychology: 'Psychologie et influence',
    process: 'Processus et méthodes'
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
      
      case 'target':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
          </svg>
        );
      
      case 'handshake':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"/>
            <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/>
            <path d="m2 13 6 6 3-3"/>
            <path d="m8 21 2-2"/>
          </svg>
        );
      
      case 'leadership':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <path d="M12 2l3 3-3 3"/>
          </svg>
        );
      
      case 'psychology':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
            <path d="M8.5 8.5c.5 0 1-.2 1.4-.6"/>
            <path d="M12 2c0 2.5-2.5 5-5 5s-5-2.5-5-5a5 5 0 0 1 10 0Z"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="M14 14c1.5 1.5 3 3 3 5a2 2 0 1 1-4 0c0-2 1.5-3.5 3-5"/>
          </svg>
        );
      
      case 'process':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="6" height="6" rx="1"/>
            <rect x="15" y="3" width="6" height="6" rx="1"/>
            <rect x="9" y="15" width="6" height="6" rx="1"/>
            <path d="M6 9v3a3 3 0 0 0 3 3h6"/>
            <path d="M18 9v3a3 3 0 0 1-3 3h-3"/>
            <path d="M12 12v3"/>
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