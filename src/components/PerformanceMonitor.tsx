'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/utils/web-vitals';
import { registerServiceWorker } from '@/utils/performance-optimization';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Register service worker for caching
    registerServiceWorker();
    
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontPreloads = [
        { href: '/fonts/inter-var.woff2', type: 'font/woff2' },
        { href: '/fonts/open-sans-var.woff2', type: 'font/woff2' },
      ];

      fontPreloads.forEach(({ href, type }) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'font';
        link.type = type;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Preload critical images
      const imagePreloads = [
        '/images/logo-laurent-serre.png',
        '/images/hero-background.jpg',
      ];

      imagePreloads.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // DNS prefetch for external domains
    const addDNSPrefetch = () => {
      const domains = [
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      domains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    addDNSPrefetch();

    // Monitor page visibility for performance optimization
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, reduce activity
        console.log('Page hidden - reducing activity');
      } else {
        // Page is visible, resume normal activity
        console.log('Page visible - resuming activity');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
}