'use client';

import { useEffect } from 'react';

interface PerformanceMonitorProps {
  pageName: string;
  enableReporting?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  pageName, 
  enableReporting = true 
}) => {
  useEffect(() => {
    if (!enableReporting || typeof window === 'undefined') return;

    // Core Web Vitals measurement
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const measureLCP = () => {
        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            const lcpValue = Math.round(lastEntry.startTime);
            
            // Report to analytics
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'Performance',
                event_label: 'LCP',
                value: lcpValue,
                custom_map: { page_name: pageName }
              });
            }

            // Console log for development
            if (process.env.NODE_ENV === 'development') {
              console.log(`LCP for ${pageName}: ${lcpValue}ms`);
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
          console.warn('LCP measurement not supported');
        }
      };

      // First Input Delay (FID)
      const measureFID = () => {
        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const fidValue = Math.round(entry.processingStart - entry.startTime);
              
              if ((window as any).gtag) {
                (window as any).gtag('event', 'web_vitals', {
                  event_category: 'Performance',
                  event_label: 'FID',
                  value: fidValue,
                  custom_map: { page_name: pageName }
                });
              }

              if (process.env.NODE_ENV === 'development') {
                console.log(`FID for ${pageName}: ${fidValue}ms`);
              }
            });
          }).observe({ entryTypes: ['first-input'] });
        } catch (error) {
          console.warn('FID measurement not supported');
        }
      };

      // Cumulative Layout Shift (CLS)
      const measureCLS = () => {
        try {
          let clsValue = 0;
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });

            const clsScore = Math.round(clsValue * 1000);
            
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'Performance',
                event_label: 'CLS',
                value: clsScore,
                custom_map: { page_name: pageName }
              });
            }

            if (process.env.NODE_ENV === 'development') {
              console.log(`CLS for ${pageName}: ${clsValue}`);
            }
          }).observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.warn('CLS measurement not supported');
        }
      };

      // Time to First Byte (TTFB)
      const measureTTFB = () => {
        try {
          const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigationEntry) {
            const ttfbValue = Math.round(navigationEntry.responseStart - navigationEntry.requestStart);
            
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'Performance',
                event_label: 'TTFB',
                value: ttfbValue,
                custom_map: { page_name: pageName }
              });
            }

            if (process.env.NODE_ENV === 'development') {
              console.log(`TTFB for ${pageName}: ${ttfbValue}ms`);
            }
          }
        } catch (error) {
          console.warn('TTFB measurement not supported');
        }
      };

      // First Contentful Paint (FCP)
      const measureFCP = () => {
        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const fcpValue = Math.round(entry.startTime);
              
              if ((window as any).gtag) {
                (window as any).gtag('event', 'web_vitals', {
                  event_category: 'Performance',
                  event_label: 'FCP',
                  value: fcpValue,
                  custom_map: { page_name: pageName }
                });
              }

              if (process.env.NODE_ENV === 'development') {
                console.log(`FCP for ${pageName}: ${fcpValue}ms`);
              }
            });
          }).observe({ entryTypes: ['paint'] });
        } catch (error) {
          console.warn('FCP measurement not supported');
        }
      };

      // Initialize measurements
      measureLCP();
      measureFID();
      measureCLS();
      measureTTFB();
      measureFCP();
    };

    // Resource loading performance
    const measureResourcePerformance = () => {
      try {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        // Measure image loading times
        const imageResources = resources.filter(resource => 
          resource.initiatorType === 'img' || 
          resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)
        );

        const avgImageLoadTime = imageResources.length > 0 
          ? imageResources.reduce((sum, resource) => sum + resource.duration, 0) / imageResources.length
          : 0;

        if (avgImageLoadTime > 0 && (window as any).gtag) {
          (window as any).gtag('event', 'resource_performance', {
            event_category: 'Performance',
            event_label: 'Average Image Load Time',
            value: Math.round(avgImageLoadTime),
            custom_map: { page_name: pageName }
          });
        }

        // Measure CSS loading times
        const cssResources = resources.filter(resource => 
          resource.initiatorType === 'link' && resource.name.includes('.css')
        );

        const avgCSSLoadTime = cssResources.length > 0
          ? cssResources.reduce((sum, resource) => sum + resource.duration, 0) / cssResources.length
          : 0;

        if (avgCSSLoadTime > 0 && (window as any).gtag) {
          (window as any).gtag('event', 'resource_performance', {
            event_category: 'Performance',
            event_label: 'Average CSS Load Time',
            value: Math.round(avgCSSLoadTime),
            custom_map: { page_name: pageName }
          });
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(`Resource Performance for ${pageName}:`, {
            totalResources: resources.length,
            imageResources: imageResources.length,
            avgImageLoadTime: Math.round(avgImageLoadTime),
            cssResources: cssResources.length,
            avgCSSLoadTime: Math.round(avgCSSLoadTime)
          });
        }
      } catch (error) {
        console.warn('Resource performance measurement failed:', error);
      }
    };

    // Page visibility and engagement metrics
    const measureEngagement = () => {
      let startTime = Date.now();
      let isVisible = !document.hidden;

      const handleVisibilityChange = () => {
        if (document.hidden && isVisible) {
          // Page became hidden
          const timeOnPage = Date.now() - startTime;
          
          if ((window as any).gtag) {
            (window as any).gtag('event', 'page_engagement', {
              event_category: 'Engagement',
              event_label: 'Time on Page',
              value: Math.round(timeOnPage / 1000), // Convert to seconds
              custom_map: { page_name: pageName }
            });
          }
          
          isVisible = false;
        } else if (!document.hidden && !isVisible) {
          // Page became visible again
          startTime = Date.now();
          isVisible = true;
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Cleanup
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    // Initialize all measurements
    const cleanup = measureEngagement();
    
    // Delay some measurements to ensure page is fully loaded
    setTimeout(() => {
      measureWebVitals();
      measureResourcePerformance();
    }, 1000);

    return cleanup;
  }, [pageName, enableReporting]);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;