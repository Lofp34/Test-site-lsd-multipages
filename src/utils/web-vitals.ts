/**
 * Web Vitals monitoring for Core Web Vitals optimization
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Thresholds for Core Web Vitals (Google recommendations)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  INP: { good: 200, poor: 500 },   // Interaction to Next Paint (replaces FID)
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

// Performance budget alerts
const PERFORMANCE_BUDGET = {
  maxBundleSize: 500, // KB
  maxImageSize: 200,  // KB
  maxFontSize: 100,   // KB
  maxCSSSize: 50,     // KB
};

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

// Send metrics to analytics
function sendToAnalytics(metric: WebVitalMetric) {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      },
    });
  }

  // Send to custom analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        page: window.location.pathname,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType || 'unknown',
      }),
    }).catch(console.error);
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      threshold: THRESHOLDS[metric.name as keyof typeof THRESHOLDS],
    });
  }
}

// Rate metric based on thresholds
function rateMetric(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Initialize Web Vitals monitoring
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  onCLS((metric) => {
    sendToAnalytics({
      ...metric,
      rating: rateMetric('CLS', metric.value),
    });
  });

  onINP((metric) => {
    sendToAnalytics({
      ...metric,
      rating: rateMetric('INP', metric.value),
    });
  });

  onLCP((metric) => {
    sendToAnalytics({
      ...metric,
      rating: rateMetric('LCP', metric.value),
    });
  });

  // Additional metrics
  onFCP((metric) => {
    sendToAnalytics({
      ...metric,
      rating: rateMetric('FCP', metric.value),
    });
  });

  onTTFB((metric) => {
    sendToAnalytics({
      ...metric,
      rating: rateMetric('TTFB', metric.value),
    });
  });
}

// Monitor resource loading performance
export function monitorResourcePerformance() {
  if (typeof window === 'undefined') return;

  // Monitor large resources
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        const size = resourceEntry.transferSize || 0;
        
        // Check against performance budget
        if (resourceEntry.name.includes('.js') && size > PERFORMANCE_BUDGET.maxBundleSize * 1024) {
          console.warn(`Large JavaScript bundle detected: ${resourceEntry.name} (${Math.round(size / 1024)}KB)`);
        }
        
        if (resourceEntry.name.match(/\.(jpg|jpeg|png|webp|avif)/) && size > PERFORMANCE_BUDGET.maxImageSize * 1024) {
          console.warn(`Large image detected: ${resourceEntry.name} (${Math.round(size / 1024)}KB)`);
        }
        
        if (resourceEntry.name.includes('.css') && size > PERFORMANCE_BUDGET.maxCSSSize * 1024) {
          console.warn(`Large CSS file detected: ${resourceEntry.name} (${Math.round(size / 1024)}KB)`);
        }
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });
}

// Monitor long tasks that block the main thread
export function monitorLongTasks() {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) { // Tasks longer than 50ms
        console.warn(`Long task detected: ${entry.duration}ms`);
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'long_task', {
            event_category: 'Performance',
            value: Math.round(entry.duration),
            custom_map: {
              task_duration: entry.duration,
              page: window.location.pathname,
            },
          });
        }
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task API not supported
  }
}

// Monitor memory usage
export function monitorMemoryUsage() {
  if (typeof window === 'undefined') return;

  const checkMemory = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
      const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
      
      // Warn if memory usage is high
      if (usedMB > 50) { // 50MB threshold
        console.warn(`High memory usage: ${usedMB}MB / ${limitMB}MB`);
      }
      
      // Send to analytics periodically
      if (window.gtag && Math.random() < 0.1) { // 10% sampling
        window.gtag('event', 'memory_usage', {
          event_category: 'Performance',
          value: usedMB,
          custom_map: {
            used_memory: usedMB,
            total_memory: totalMB,
            memory_limit: limitMB,
          },
        });
      }
    }
  };

  // Check memory usage every 30 seconds
  setInterval(checkMemory, 30000);
}

// Monitor network conditions
export function monitorNetworkConditions() {
  if (typeof window === 'undefined') return;

  const connection = (navigator as any).connection;
  if (connection) {
    const logConnection = () => {
      console.log(`Network: ${connection.effectiveType}, Downlink: ${connection.downlink}Mbps`);
      
      // Adjust performance based on connection
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Disable non-essential features for slow connections
        document.documentElement.classList.add('slow-connection');
      }
    };

    logConnection();
    connection.addEventListener('change', logConnection);
  }
}

// Initialize all performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  initWebVitals();
  monitorResourcePerformance();
  monitorLongTasks();
  monitorMemoryUsage();
  monitorNetworkConditions();

  // Report initial page load performance
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        console.log(`Page load time: ${Math.round(loadTime)}ms`);
        console.log(`DOM content loaded: ${Math.round(domContentLoaded)}ms`);
        
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            event_category: 'Performance',
            value: Math.round(loadTime),
            custom_map: {
              dom_content_loaded: Math.round(domContentLoaded),
              page: window.location.pathname,
            },
          });
        }
      }
    }, 0);
  });
}

// Export for use in _app.tsx or layout.tsx
export { sendToAnalytics };