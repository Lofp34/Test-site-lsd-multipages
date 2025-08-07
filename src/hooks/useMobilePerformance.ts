'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ConnectionInfo {
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g' | undefined;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

interface PerformanceMetrics {
  memoryUsage: number;
  renderTime: number;
  scrollPerformance: number;
  networkLatency: number;
}

interface MobilePerformanceState {
  // Connection detection
  connectionInfo: ConnectionInfo;
  isSlowConnection: boolean;
  isOffline: boolean;
  
  // Battery optimization
  batteryInfo: BatteryInfo | null;
  isLowBattery: boolean;
  shouldEnergySave: boolean;
  
  // Performance metrics
  performanceMetrics: PerformanceMetrics;
  
  // Optimization flags
  shouldLazyLoad: boolean;
  shouldReduceAnimations: boolean;
  shouldCompressImages: boolean;
  shouldLimitMarkdown: boolean;
  
  // Helper functions
  optimizeForConnection: () => void;
  optimizeForBattery: () => void;
  measurePerformance: (operation: string, fn: () => void) => void;
  getOptimizedConfig: () => OptimizedConfig;
}

interface OptimizedConfig {
  maxMessageLength: number;
  enableSyntaxHighlighting: boolean;
  enableAnimations: boolean;
  imageQuality: 'low' | 'medium' | 'high';
  lazyLoadThreshold: number;
  debounceDelay: number;
}

export function useMobilePerformance(): MobilePerformanceState {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    effectiveType: undefined,
    downlink: 0,
    rtt: 0,
    saveData: false
  });
  
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    memoryUsage: 0,
    renderTime: 0,
    scrollPerformance: 0,
    networkLatency: 0
  });
  
  const performanceObserverRef = useRef<PerformanceObserver | null>(null);
  const memoryCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize connection monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      if (connection) {
        setConnectionInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
          saveData: connection.saveData || false
        });
      }
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Initial check
    updateConnectionInfo();
    setIsOffline(!navigator.onLine);

    // Listen for changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  // Initialize battery monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getBatteryInfo = async () => {
      try {
        const battery = await (navigator as any).getBattery?.();
        if (battery) {
          const updateBatteryInfo = () => {
            setBatteryInfo({
              level: battery.level,
              charging: battery.charging,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime
            });
          };

          updateBatteryInfo();
          
          battery.addEventListener('levelchange', updateBatteryInfo);
          battery.addEventListener('chargingchange', updateBatteryInfo);
          
          return () => {
            battery.removeEventListener('levelchange', updateBatteryInfo);
            battery.removeEventListener('chargingchange', updateBatteryInfo);
          };
        }
      } catch (error) {
        console.warn('Battery API not supported:', error);
      }
    };

    getBatteryInfo();
  }, []);

  // Initialize performance monitoring
  useEffect(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    try {
      performanceObserverRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            setPerformanceMetrics(prev => ({
              ...prev,
              renderTime: entry.duration
            }));
          } else if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            setPerformanceMetrics(prev => ({
              ...prev,
              networkLatency: navEntry.responseStart - navEntry.requestStart
            }));
          }
        });
      });

      performanceObserverRef.current.observe({ 
        entryTypes: ['measure', 'navigation', 'paint'] 
      });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    // Memory usage monitoring
    if ((performance as any).memory) {
      memoryCheckIntervalRef.current = setInterval(() => {
        const memory = (performance as any).memory;
        setPerformanceMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit
        }));
      }, 5000);
    }

    return () => {
      if (performanceObserverRef.current) {
        performanceObserverRef.current.disconnect();
      }
      if (memoryCheckIntervalRef.current) {
        clearInterval(memoryCheckIntervalRef.current);
      }
    };
  }, []);

  // Derived states
  const isSlowConnection = connectionInfo.effectiveType === '2g' || 
                          connectionInfo.effectiveType === 'slow-2g' ||
                          connectionInfo.downlink < 1.5;
  
  const isLowBattery = batteryInfo ? batteryInfo.level < 0.2 && !batteryInfo.charging : false;
  
  const shouldEnergySave = isLowBattery || 
                          (batteryInfo && batteryInfo.level < 0.5 && !batteryInfo.charging);
  
  const shouldLazyLoad = isSlowConnection || performanceMetrics.memoryUsage > 0.8;
  
  const shouldReduceAnimations = shouldEnergySave || 
                                isSlowConnection || 
                                performanceMetrics.renderTime > 16; // 60fps threshold
  
  const shouldCompressImages = isSlowConnection || connectionInfo.saveData;
  
  const shouldLimitMarkdown = performanceMetrics.memoryUsage > 0.7 || isSlowConnection;

  // Optimization functions
  const optimizeForConnection = useCallback(() => {
    if (isSlowConnection) {
      // Reduce image quality
      const images = document.querySelectorAll('img[data-optimizable]');
      images.forEach((img) => {
        const element = img as HTMLImageElement;
        if (element.dataset.lowRes) {
          element.src = element.dataset.lowRes;
        }
      });
      
      // Disable non-essential animations
      document.body.classList.add('reduce-motion');
    }
  }, [isSlowConnection]);

  const optimizeForBattery = useCallback(() => {
    if (shouldEnergySave) {
      // Reduce CPU-intensive operations
      document.body.classList.add('energy-save-mode');
      
      // Pause non-essential timers
      const intervals = (window as any).__chatIntervals || [];
      intervals.forEach((id: number) => clearInterval(id));
      
      // Reduce animation frame rate
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: 0.01ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, [shouldEnergySave]);

  const measurePerformance = useCallback((operation: string, fn: () => void) => {
    if (typeof window === 'undefined' || !performance.mark) return fn();
    
    const startMark = `${operation}-start`;
    const endMark = `${operation}-end`;
    const measureName = `${operation}-duration`;
    
    performance.mark(startMark);
    fn();
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
  }, []);

  const getOptimizedConfig = useCallback((): OptimizedConfig => {
    return {
      maxMessageLength: isSlowConnection ? 1000 : shouldEnergySave ? 2000 : 5000,
      enableSyntaxHighlighting: !shouldLimitMarkdown && !shouldEnergySave,
      enableAnimations: !shouldReduceAnimations,
      imageQuality: shouldCompressImages ? 'low' : isSlowConnection ? 'medium' : 'high',
      lazyLoadThreshold: shouldLazyLoad ? 100 : 300,
      debounceDelay: isSlowConnection ? 500 : 200
    };
  }, [
    isSlowConnection, 
    shouldEnergySave, 
    shouldLimitMarkdown, 
    shouldReduceAnimations, 
    shouldCompressImages, 
    shouldLazyLoad
  ]);

  return {
    connectionInfo,
    isSlowConnection,
    isOffline,
    batteryInfo,
    isLowBattery,
    shouldEnergySave,
    performanceMetrics,
    shouldLazyLoad,
    shouldReduceAnimations,
    shouldCompressImages,
    shouldLimitMarkdown,
    optimizeForConnection,
    optimizeForBattery,
    measurePerformance,
    getOptimizedConfig
  };
}