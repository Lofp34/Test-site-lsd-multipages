'use client';

import React, { useState, useEffect } from 'react';
import { useMobilePerformance } from '@/hooks/useMobilePerformance';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface ConnectionSpeedIndicatorProps {
  className?: string;
  showDetails?: boolean;
  onSpeedChange?: (speed: 'slow' | 'medium' | 'fast') => void;
}

const ConnectionSpeedIndicator: React.FC<ConnectionSpeedIndicatorProps> = ({
  className = '',
  showDetails = false,
  onSpeedChange
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [speedTest, setSpeedTest] = useState<{
    testing: boolean;
    result: number | null;
    error: string | null;
  }>({
    testing: false,
    result: null,
    error: null
  });

  const { 
    connectionInfo, 
    isSlowConnection, 
    isOffline,
    shouldCompressImages,
    getOptimizedConfig 
  } = useMobilePerformance();
  
  const { isMobile, getMobileClasses } = useMobileOptimization();
  const optimizedConfig = getOptimizedConfig();

  // Determine connection speed category
  const getSpeedCategory = (): 'slow' | 'medium' | 'fast' => {
    if (isOffline) return 'slow';
    if (isSlowConnection) return 'slow';
    if (connectionInfo.effectiveType === '3g') return 'medium';
    if (connectionInfo.effectiveType === '4g' && connectionInfo.downlink > 5) return 'fast';
    return 'medium';
  };

  const speedCategory = getSpeedCategory();

  // Notify parent of speed changes
  useEffect(() => {
    if (onSpeedChange) {
      onSpeedChange(speedCategory);
    }
  }, [speedCategory, onSpeedChange]);

  // Show indicator when connection is slow or when testing
  useEffect(() => {
    setIsVisible(isSlowConnection || isOffline || speedTest.testing);
  }, [isSlowConnection, isOffline, speedTest.testing]);

  // Simple speed test function
  const runSpeedTest = async () => {
    if (speedTest.testing) return;
    
    setSpeedTest({ testing: true, result: null, error: null });
    
    try {
      const startTime = performance.now();
      
      // Download a small test file (1KB)
      const response = await fetch('/api/speed-test', {
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        throw new Error('Speed test failed');
      }
      
      await response.text();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Calculate approximate speed (very rough estimate)
      const speed = 1000 / duration; // KB/s
      
      setSpeedTest({
        testing: false,
        result: speed,
        error: null
      });
    } catch (error) {
      setSpeedTest({
        testing: false,
        result: null,
        error: 'Test failed'
      });
    }
  };

  // Get indicator color based on connection speed
  const getIndicatorColor = () => {
    if (isOffline) return 'bg-red-500';
    
    switch (speedCategory) {
      case 'slow': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'fast': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Get connection description
  const getConnectionDescription = () => {
    if (isOffline) return 'Hors ligne';
    if (connectionInfo.effectiveType) {
      return `${connectionInfo.effectiveType.toUpperCase()}${connectionInfo.saveData ? ' (Économie de données)' : ''}`;
    }
    return 'Connexion inconnue';
  };

  // Get optimization suggestions
  const getOptimizationSuggestions = () => {
    const suggestions = [];
    
    if (shouldCompressImages) {
      suggestions.push('Images compressées');
    }
    
    if (!optimizedConfig.enableSyntaxHighlighting) {
      suggestions.push('Coloration syntaxique désactivée');
    }
    
    if (!optimizedConfig.enableAnimations) {
      suggestions.push('Animations réduites');
    }
    
    if (optimizedConfig.maxMessageLength < 5000) {
      suggestions.push('Messages tronqués');
    }
    
    return suggestions;
  };

  if (!isVisible && !showDetails) {
    return null;
  }

  return (
    <div className={getMobileClasses(
      `connection-indicator ${className}`,
      'text-xs'
    )}>
      {/* Main indicator */}
      <div className={getMobileClasses(
        'flex items-center space-x-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm',
        'p-1.5 space-x-1'
      )}>
        {/* Connection status dot */}
        <div className={`w-2 h-2 rounded-full ${getIndicatorColor()} ${
          speedTest.testing ? 'animate-pulse' : ''
        }`} />
        
        {/* Connection info */}
        <div className="flex-1 min-w-0">
          <div className={getMobileClasses('font-medium text-gray-900 dark:text-gray-100', 'text-xs')}>
            {getConnectionDescription()}
          </div>
          
          {connectionInfo.downlink > 0 && (
            <div className={getMobileClasses('text-xs text-gray-500 dark:text-gray-400', 'text-[10px]')}>
              {connectionInfo.downlink.toFixed(1)} Mbps
              {connectionInfo.rtt > 0 && ` • ${connectionInfo.rtt}ms`}
            </div>
          )}
        </div>
        
        {/* Speed test button */}
        {!isOffline && (
          <button
            onClick={runSpeedTest}
            disabled={speedTest.testing}
            className={getMobileClasses(
              'px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded transition-colors duration-200',
              'px-1 py-0.5 text-[10px]'
            )}
            title="Tester la vitesse de connexion"
          >
            {speedTest.testing ? '...' : 'Test'}
          </button>
        )}
      </div>
      
      {/* Detailed information */}
      {showDetails && (
        <div className={getMobileClasses(
          'mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600',
          'mt-1 p-2'
        )}>
          {/* Speed test results */}
          {speedTest.result && (
            <div className={getMobileClasses('mb-2 text-sm', 'mb-1 text-xs')}>
              <span className="font-medium">Vitesse mesurée :</span> {speedTest.result.toFixed(1)} KB/s
            </div>
          )}
          
          {speedTest.error && (
            <div className={getMobileClasses('mb-2 text-sm text-red-600 dark:text-red-400', 'mb-1 text-xs')}>
              {speedTest.error}
            </div>
          )}
          
          {/* Optimization status */}
          <div className={getMobileClasses('mb-2', 'mb-1')}>
            <div className={getMobileClasses('font-medium text-gray-900 dark:text-gray-100 mb-1', 'text-xs mb-0.5')}>
              Optimisations actives :
            </div>
            
            {getOptimizationSuggestions().length > 0 ? (
              <ul className={getMobileClasses('text-xs text-gray-600 dark:text-gray-400 space-y-1', 'text-[10px] space-y-0.5')}>
                {getOptimizationSuggestions().map((suggestion, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={getMobileClasses('text-xs text-gray-500 dark:text-gray-400', 'text-[10px]')}>
                Aucune optimisation nécessaire
              </div>
            )}
          </div>
          
          {/* Performance tips */}
          {isSlowConnection && (
            <div className={getMobileClasses('p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800', 'p-1.5')}>
              <div className={getMobileClasses('text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-1', 'text-[10px] mb-0.5')}>
                💡 Conseils pour améliorer les performances :
              </div>
              <ul className={getMobileClasses('text-xs text-yellow-700 dark:text-yellow-300 space-y-1', 'text-[10px] space-y-0.5')}>
                <li>• Activez l'économie de données dans vos paramètres</li>
                <li>• Rapprochez-vous d'un point d'accès Wi-Fi</li>
                <li>• Fermez les autres applications consommant de la bande passante</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionSpeedIndicator;
export type { ConnectionSpeedIndicatorProps };