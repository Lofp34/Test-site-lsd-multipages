'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Minimal performance monitoring - load only what's essential
    const initMinimalMonitoring = () => {
      // Simple DNS prefetch for critical domains only
      const criticalDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ];

      criticalDomains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `https://${domain}`;
        document.head.appendChild(link);
      });

      // Basic Web Vitals tracking (lightweight)
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        try {
          // Only track LCP (most important metric)
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry && process.env.NODE_ENV === 'development') {
              console.log(`LCP: ${Math.round(lastEntry.startTime)}ms`);
            }
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Ignore if not supported
        }
      }
    };

    // Delay initialization to avoid blocking
    setTimeout(initMinimalMonitoring, 1000);
  }, []);

  return null;
}