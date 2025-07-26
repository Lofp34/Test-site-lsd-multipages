'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  threshold?: number;
  cacheKey?: string;
  priority?: 'high' | 'medium' | 'low';
  preload?: boolean;
}

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class PerformanceCache {
  private static instance: PerformanceCache;
  private cache: Map<string, CacheEntry> = new Map();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  static getInstance(): PerformanceCache {
    if (!PerformanceCache.instance) {
      PerformanceCache.instance = new PerformanceCache();
    }
    return PerformanceCache.instance;
  }

  set(key: string, data: any, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
  threshold = 0.1,
  cacheKey,
  priority = 'medium',
  preload = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cachedData, setCachedData] = useState<any>(null);
  
  const cache = useMemo(() => PerformanceCache.getInstance(), []);

  // Intersection Observer pour le lazy loading
  const observerRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold }
      );
      observer.observe(node);
    }
  }, [threshold]);

  // Gestion du cache
  useEffect(() => {
    if (cacheKey && isVisible) {
      const cached = cache.get(cacheKey);
      if (cached) {
        setCachedData(cached);
        setIsLoaded(true);
      }
    }
  }, [cacheKey, isVisible, cache]);

  // Preload pour les éléments prioritaires
  useEffect(() => {
    if (preload && priority === 'high') {
      setIsVisible(true);
    }
  }, [preload, priority]);

  // Optimisation des animations selon la priorité
  const animationVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: priority === 'high' ? 20 : 40,
      scale: priority === 'high' ? 0.98 : 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: priority === 'high' ? 0.3 : 0.5,
        ease: "easeOut" as const
      }
    }
  }), [priority]);

  // Optimisation du rendu conditionnel
  if (!isVisible && !preload) {
    return (
      <div 
        ref={observerRef}
        className={`performance-placeholder ${priority === 'high' ? 'min-h-[200px]' : 'min-h-[100px]'}`}
        style={{ 
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }}
      />
    );
  }

  return (
    <motion.div
      ref={observerRef}
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      className={`performance-optimized ${priority === 'high' ? 'priority-high' : 'priority-normal'}`}
    >
      <AnimatePresence mode="wait">
        {isLoaded && cachedData ? (
          <motion.div
            key="cached"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Hook personnalisé pour l'optimisation des performances
export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  });

  const measurePerformance = useCallback(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Mesure LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Mesure FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0] as PerformanceEventTiming;
        if (firstEntry && 'processingStart' in firstEntry) {
          setMetrics(prev => ({ ...prev, fid: firstEntry.processingStart - firstEntry.startTime }));
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Mesure CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (layoutShiftEntry && !layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Mesure TTFB (Time to First Byte)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }));
      }
    }
  }, []);

  useEffect(() => {
    measurePerformance();
  }, [measurePerformance]);

  return { metrics, measurePerformance };
};

// Composant d'affichage des métriques de performance (développement uniquement)
export const PerformanceMetrics: React.FC = () => {
  const { metrics } = usePerformanceOptimization();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50">
      <div className="font-bold mb-2">Core Web Vitals</div>
      <div className="space-y-1">
        <div>LCP: {metrics.lcp.toFixed(0)}ms</div>
        <div>FID: {metrics.fid.toFixed(0)}ms</div>
        <div>CLS: {metrics.cls.toFixed(3)}</div>
        <div>TTFB: {metrics.ttfb.toFixed(0)}ms</div>
      </div>
    </div>
  );
};

export default PerformanceOptimizer; 