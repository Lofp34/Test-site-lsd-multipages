/**
 * Performance optimization utilities for resource pages
 */

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/inter-var.woff2',
    '/fonts/roboto-slab-var.woff2'
  ];

  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    '/images/logo.png',
    '/ressources/previews/tableau-bord-preview.jpg',
    '/ressources/previews/grille-evaluation-preview.jpg',
    '/ressources/previews/reporting-preview.jpg'
  ];

  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = image;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Lazy load non-critical resources
export const lazyLoadNonCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Lazy load analytics scripts
  const loadAnalytics = () => {
    // Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);
    }

    // HubSpot tracking
    if (process.env.NEXT_PUBLIC_HUBSPOT_ID) {
      const script = document.createElement('script');
      script.src = `//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_ID}.js`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  };

  // Load analytics after page interaction or 3 seconds
  const loadAfterInteraction = () => {
    loadAnalytics();
    document.removeEventListener('click', loadAfterInteraction);
    document.removeEventListener('scroll', loadAfterInteraction);
    document.removeEventListener('touchstart', loadAfterInteraction);
  };

  document.addEventListener('click', loadAfterInteraction);
  document.addEventListener('scroll', loadAfterInteraction);
  document.addEventListener('touchstart', loadAfterInteraction);

  setTimeout(loadAnalytics, 3000);
};

// Optimize images for different screen sizes
export const getOptimizedImageSizes = (type: 'hero' | 'preview' | 'thumbnail' | 'icon') => {
  switch (type) {
    case 'hero':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px';
    case 'preview':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px';
    case 'thumbnail':
      return '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px';
    case 'icon':
      return '64px';
    default:
      return '100vw';
  }
};

// Generate WebP/AVIF sources for better compression
export const generateOptimizedImageSources = (src: string) => {
  const basePath = src.replace(/\.[^/.]+$/, '');
  const extension = src.split('.').pop();

  return {
    avif: `${basePath}.avif`,
    webp: `${basePath}.webp`,
    fallback: src,
    original: src
  };
};

// Measure Core Web Vitals
export const measureCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const measureLCP = () => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime)
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID)
  const measureFID = () => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime)
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });
  };

  // Cumulative Layout Shift (CLS)
  const measureCLS = () => {
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000)
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  };

  measureLCP();
  measureFID();
  measureCLS();
};

// Prefetch next page resources
export const prefetchNextPageResources = (nextPageUrl: string) => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = nextPageUrl;
  document.head.appendChild(link);
};

// Optimize scroll performance
export const optimizeScrollPerformance = () => {
  if (typeof window === 'undefined') return;

  let ticking = false;

  const updateScrollPosition = () => {
    // Update scroll-dependent elements
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Update parallax elements
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
      const yPos = -(scrollY * speed);
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });

    // Update progress indicators
    const progressElements = document.querySelectorAll('[data-scroll-progress]');
    progressElements.forEach((element) => {
      const progress = Math.min(scrollY / (document.body.scrollHeight - windowHeight), 1);
      (element as HTMLElement).style.width = `${progress * 100}%`;
    });

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

// Resource hints for better loading
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;

  // DNS prefetch for external domains
  const externalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.google-analytics.com',
    'js.hs-scripts.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical domains
  const criticalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];

  criticalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `https://${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Placeholder for service worker registration (disabled for performance)
export const registerServiceWorker = () => {
  // Service worker disabled to improve initial load performance
  if (process.env.NODE_ENV === 'development') {
    console.log('Service worker registration skipped in development');
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Run immediately
  addResourceHints();
  preloadCriticalResources();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadNonCriticalResources();
      optimizeScrollPerformance();
      measureCoreWebVitals();
    });
  } else {
    lazyLoadNonCriticalResources();
    optimizeScrollPerformance();
    measureCoreWebVitals();
  }
};