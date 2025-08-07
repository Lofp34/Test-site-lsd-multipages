'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useMobilePerformance } from '@/hooks/useMobilePerformance';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface BatteryOptimizerProps {
  onOptimizationChange?: (isOptimizing: boolean) => void;
  className?: string;
  autoOptimize?: boolean;
}

interface OptimizationSettings {
  reduceAnimations: boolean;
  limitBackgroundTasks: boolean;
  reducePolling: boolean;
  dimScreen: boolean;
  pauseNonEssential: boolean;
}

const BatteryOptimizer: React.FC<BatteryOptimizerProps> = ({
  onOptimizationChange,
  className = '',
  autoOptimize = true
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const [optimizationSettings, setOptimizationSettings] = useState<OptimizationSettings>({
    reduceAnimations: false,
    limitBackgroundTasks: false,
    reducePolling: false,
    dimScreen: false,
    pauseNonEssential: false
  });

  const { 
    batteryInfo, 
    isLowBattery, 
    shouldEnergySave,
    optimizeForBattery,
    getOptimizedConfig 
  } = useMobilePerformance();
  
  const { isMobile, getMobileClasses } = useMobileOptimization();
  const optimizedConfig = getOptimizedConfig();

  // Auto-optimization logic
  useEffect(() => {
    if (!autoOptimize || userOverride !== null) return;
    
    const shouldOptimize = shouldEnergySave || isLowBattery;
    
    if (shouldOptimize !== isOptimizing) {
      setIsOptimizing(shouldOptimize);
      
      if (shouldOptimize) {
        applyOptimizations();
      } else {
        removeOptimizations();
      }
    }
  }, [shouldEnergySave, isLowBattery, autoOptimize, userOverride, isOptimizing]);

  // Notify parent of optimization changes
  useEffect(() => {
    if (onOptimizationChange) {
      onOptimizationChange(isOptimizing);
    }
  }, [isOptimizing, onOptimizationChange]);

  // Apply battery optimizations
  const applyOptimizations = useCallback(() => {
    const newSettings: OptimizationSettings = {
      reduceAnimations: true,
      limitBackgroundTasks: true,
      reducePolling: true,
      dimScreen: isLowBattery,
      pauseNonEssential: isLowBattery
    };
    
    setOptimizationSettings(newSettings);
    
    // Apply CSS optimizations
    document.body.classList.add('battery-save-mode');
    
    // Reduce animations
    if (newSettings.reduceAnimations) {
      const style = document.createElement('style');
      style.id = 'battery-animation-reducer';
      style.textContent = `
        .battery-save-mode * {
          animation-duration: 0.1s !important;
          transition-duration: 0.1s !important;
        }
        .battery-save-mode .animate-pulse,
        .battery-save-mode .animate-spin,
        .battery-save-mode .animate-bounce {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Limit background tasks
    if (newSettings.limitBackgroundTasks) {
      // Pause non-essential intervals
      const intervals = (window as any).__chatIntervals || [];
      intervals.forEach((id: number) => {
        if ((window as any).__essentialIntervals?.includes(id)) return;
        clearInterval(id);
      });
      
      // Reduce polling frequency
      if (newSettings.reducePolling) {
        (window as any).__originalPollingInterval = (window as any).__pollingInterval;
        (window as any).__pollingInterval = Math.max(
          ((window as any).__pollingInterval || 1000) * 3,
          5000
        );
      }
    }
    
    // Dim screen effect
    if (newSettings.dimScreen) {
      const dimOverlay = document.createElement('div');
      dimOverlay.id = 'battery-dim-overlay';
      dimOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(dimOverlay);
    }
    
    // Pause non-essential features
    if (newSettings.pauseNonEssential) {
      // Disable syntax highlighting
      document.body.classList.add('disable-syntax-highlighting');
      
      // Reduce image quality
      const images = document.querySelectorAll('img[data-optimizable]');
      images.forEach((img) => {
        const element = img as HTMLImageElement;
        if (element.dataset.originalSrc && !element.dataset.batteryOptimized) {
          element.dataset.originalSrc = element.src;
          element.src = element.src + '?w=200&q=30'; // Very low quality
          element.dataset.batteryOptimized = 'true';
        }
      });
    }
    
    // Call the hook's optimization function
    optimizeForBattery();
  }, [isLowBattery, optimizeForBattery]);

  // Remove battery optimizations
  const removeOptimizations = useCallback(() => {
    setOptimizationSettings({
      reduceAnimations: false,
      limitBackgroundTasks: false,
      reducePolling: false,
      dimScreen: false,
      pauseNonEssential: false
    });
    
    // Remove CSS classes
    document.body.classList.remove('battery-save-mode', 'disable-syntax-highlighting');
    
    // Remove animation reducer
    const animationStyle = document.getElementById('battery-animation-reducer');
    if (animationStyle) {
      animationStyle.remove();
    }
    
    // Remove dim overlay
    const dimOverlay = document.getElementById('battery-dim-overlay');
    if (dimOverlay) {
      dimOverlay.remove();
    }
    
    // Restore polling interval
    if ((window as any).__originalPollingInterval) {
      (window as any).__pollingInterval = (window as any).__originalPollingInterval;
      delete (window as any).__originalPollingInterval;
    }
    
    // Restore images
    const images = document.querySelectorAll('img[data-battery-optimized]');
    images.forEach((img) => {
      const element = img as HTMLImageElement;
      if (element.dataset.originalSrc) {
        element.src = element.dataset.originalSrc;
        delete element.dataset.originalSrc;
        delete element.dataset.batteryOptimized;
      }
    });
  }, []);

  // Manual toggle
  const toggleOptimization = useCallback(() => {
    const newState = !isOptimizing;
    setIsOptimizing(newState);
    setUserOverride(newState);
    
    if (newState) {
      applyOptimizations();
    } else {
      removeOptimizations();
    }
  }, [isOptimizing, applyOptimizations, removeOptimizations]);

  // Reset user override when battery is critically low
  useEffect(() => {
    if (batteryInfo && batteryInfo.level < 0.1 && !batteryInfo.charging) {
      setUserOverride(null);
      setIsOptimizing(true);
      applyOptimizations();
    }
  }, [batteryInfo, applyOptimizations]);

  // Get battery level color
  const getBatteryColor = () => {
    if (!batteryInfo) return 'text-gray-500';
    
    if (batteryInfo.level > 0.5) return 'text-green-500';
    if (batteryInfo.level > 0.2) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get battery icon
  const getBatteryIcon = () => {
    if (!batteryInfo) return '🔋';
    
    if (batteryInfo.charging) return '🔌';
    if (batteryInfo.level > 0.75) return '🔋';
    if (batteryInfo.level > 0.5) return '🔋';
    if (batteryInfo.level > 0.25) return '🪫';
    return '🪫';
  };

  // Don't show on desktop or when battery API is not available
  if (!isMobile || !batteryInfo) {
    return null;
  }

  return (
    <div className={getMobileClasses(
      `battery-optimizer ${className}`,
      'text-xs'
    )}>
      {/* Battery status */}
      <div className={getMobileClasses(
        'flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm',
        'p-2'
      )}>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getBatteryIcon()}</span>
          <div>
            <div className={`font-medium ${getBatteryColor()}`}>
              {Math.round(batteryInfo.level * 100)}%
            </div>
            <div className={getMobileClasses('text-xs text-gray-500 dark:text-gray-400', 'text-[10px]')}>
              {batteryInfo.charging ? 'En charge' : 
               batteryInfo.dischargingTime !== Infinity ? 
               `${Math.round(batteryInfo.dischargingTime / 3600)}h restantes` : 
               'Autonomie inconnue'}
            </div>
          </div>
        </div>
        
        {/* Optimization toggle */}
        <button
          onClick={toggleOptimization}
          className={getMobileClasses(
            `px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              isOptimizing 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`,
            'px-2 py-0.5 text-[10px]'
          )}
        >
          {isOptimizing ? 'Économie ON' : 'Économie OFF'}
        </button>
      </div>
      
      {/* Optimization details */}
      {isOptimizing && (
        <div className={getMobileClasses(
          'mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800',
          'mt-1 p-2'
        )}>
          <div className={getMobileClasses('font-medium text-green-800 dark:text-green-200 mb-2', 'text-xs mb-1')}>
            🔋 Mode économie d'énergie actif
          </div>
          
          <div className={getMobileClasses('space-y-1', 'space-y-0.5')}>
            {optimizationSettings.reduceAnimations && (
              <div className={getMobileClasses('text-xs text-green-700 dark:text-green-300', 'text-[10px]')}>
                ✓ Animations réduites
              </div>
            )}
            {optimizationSettings.limitBackgroundTasks && (
              <div className={getMobileClasses('text-xs text-green-700 dark:text-green-300', 'text-[10px]')}>
                ✓ Tâches en arrière-plan limitées
              </div>
            )}
            {optimizationSettings.reducePolling && (
              <div className={getMobileClasses('text-xs text-green-700 dark:text-green-300', 'text-[10px]')}>
                ✓ Fréquence de mise à jour réduite
              </div>
            )}
            {optimizationSettings.dimScreen && (
              <div className={getMobileClasses('text-xs text-green-700 dark:text-green-300', 'text-[10px]')}>
                ✓ Écran assombri
              </div>
            )}
            {optimizationSettings.pauseNonEssential && (
              <div className={getMobileClasses('text-xs text-green-700 dark:text-green-300', 'text-[10px]')}>
                ✓ Fonctionnalités non-essentielles pausées
              </div>
            )}
          </div>
          
          {isLowBattery && (
            <div className={getMobileClasses('mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800', 'mt-1 p-1.5')}>
              <div className={getMobileClasses('text-xs font-medium text-red-800 dark:text-red-200', 'text-[10px]')}>
                ⚠️ Batterie faible - Optimisations maximales activées
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Performance impact */}
      {process.env.NODE_ENV === 'development' && (
        <div className={getMobileClasses('mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs', 'mt-1 p-1.5 text-[10px]')}>
          <div>Battery Level: {batteryInfo.level.toFixed(2)}</div>
          <div>Charging: {batteryInfo.charging ? 'Yes' : 'No'}</div>
          <div>Should Energy Save: {shouldEnergySave ? 'Yes' : 'No'}</div>
          <div>User Override: {userOverride === null ? 'None' : userOverride ? 'On' : 'Off'}</div>
        </div>
      )}
    </div>
  );
};

export default BatteryOptimizer;
export type { BatteryOptimizerProps };