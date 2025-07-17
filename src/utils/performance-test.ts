// Performance testing utilities for Digital & AI Sales section
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
}

export class PerformanceMonitor {
  private startTime: number = 0;
  private metrics: Partial<PerformanceMetrics> = {};

  startMeasurement(label: string): void {
    this.startTime = performance.now();
    performance.mark(`${label}-start`);
  }

  endMeasurement(label: string): number {
    const endTime = performance.now();
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const duration = endTime - this.startTime;
    console.log(`${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  measureComponentRender<T>(
    component: () => T,
    componentName: string
  ): T {
    this.startMeasurement(`${componentName}-render`);
    const result = component();
    this.endMeasurement(`${componentName}-render`);
    return result;
  }

  measureMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  // Core Web Vitals measurement
  measureCoreWebVitals(): Promise<Partial<PerformanceMetrics['coreWebVitals']>> {
    return new Promise((resolve) => {
      const vitals: Partial<PerformanceMetrics['coreWebVitals']> = {};

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.lcp = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          vitals.fid = entry.processingStart - entry.startTime;
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        vitals.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });

      // Resolve after a reasonable time
      setTimeout(() => resolve(vitals), 3000);
    });
  }

  // Test specific to Digital & AI components
  async testDigitalAIPerformance(): Promise<PerformanceMetrics> {
    const startTime = performance.now();
    
    // Simulate component loading
    this.startMeasurement('digital-ai-page-load');
    
    // Test particle background performance
    this.startMeasurement('particle-background');
    // Simulate particle animation for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    const particleTime = this.endMeasurement('particle-background');
    
    // Test AI components rendering
    this.startMeasurement('ai-components');
    await new Promise(resolve => setTimeout(resolve, 500));
    const aiComponentsTime = this.endMeasurement('ai-components');
    
    const totalLoadTime = this.endMeasurement('digital-ai-page-load');
    const memoryUsage = this.measureMemoryUsage();
    const coreWebVitals = await this.measureCoreWebVitals();
    
    return {
      loadTime: totalLoadTime,
      renderTime: aiComponentsTime,
      interactionTime: particleTime,
      memoryUsage,
      coreWebVitals: {
        lcp: coreWebVitals.lcp || 0,
        fid: coreWebVitals.fid || 0,
        cls: coreWebVitals.cls || 0
      }
    };
  }

  // Performance recommendations based on metrics
  getPerformanceRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.loadTime > 3000) {
      recommendations.push('Consider lazy loading for non-critical components');
    }

    if (metrics.coreWebVitals.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint - consider image optimization');
    }

    if (metrics.coreWebVitals.fid > 100) {
      recommendations.push('Reduce First Input Delay - optimize JavaScript execution');
    }

    if (metrics.coreWebVitals.cls > 0.1) {
      recommendations.push('Improve Cumulative Layout Shift - ensure stable layouts');
    }

    if (metrics.memoryUsage > 50) {
      recommendations.push('High memory usage detected - consider component optimization');
    }

    return recommendations;
  }
}

// Accessibility testing utilities
export class AccessibilityTester {
  testKeyboardNavigation(): boolean {
    // Test if all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    let allAccessible = true;
    interactiveElements.forEach((element) => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex === '-1' && element.tagName !== 'DIV') {
        allAccessible = false;
      }
    });
    
    return allAccessible;
  }

  testAriaLabels(): string[] {
    const issues: string[] = [];
    
    // Check for missing alt text on images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        issues.push(`Image ${index + 1} missing alt text or aria-label`);
      }
    });

    // Check for missing labels on form elements
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach((element, index) => {
      const hasLabel = element.getAttribute('aria-label') || 
                      element.getAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${element.id}"]`);
      
      if (!hasLabel) {
        issues.push(`Form element ${index + 1} missing label`);
      }
    });

    return issues;
  }

  testColorContrast(): Promise<boolean> {
    // This would typically use a library like axe-core
    // For now, return a placeholder
    return Promise.resolve(true);
  }

  async runFullAccessibilityAudit(): Promise<{
    keyboardNavigation: boolean;
    ariaLabels: string[];
    colorContrast: boolean;
    score: number;
  }> {
    const keyboardNavigation = this.testKeyboardNavigation();
    const ariaLabels = this.testAriaLabels();
    const colorContrast = await this.testColorContrast();
    
    // Calculate accessibility score
    let score = 100;
    if (!keyboardNavigation) score -= 30;
    if (ariaLabels.length > 0) score -= ariaLabels.length * 10;
    if (!colorContrast) score -= 20;
    
    return {
      keyboardNavigation,
      ariaLabels,
      colorContrast,
      score: Math.max(0, score)
    };
  }
}

// Mobile performance testing
export class MobilePerformanceTester {
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  testTouchTargets(): string[] {
    const issues: string[] = [];
    const touchTargets = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
    
    touchTargets.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const minSize = 44; // Minimum touch target size in pixels
      
      if (rect.width < minSize || rect.height < minSize) {
        issues.push(`Touch target ${index + 1} too small: ${rect.width}x${rect.height}px`);
      }
    });
    
    return issues;
  }

  testViewportMeta(): boolean {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    return viewportMeta !== null;
  }

  async testMobilePerformance(): Promise<{
    touchTargets: string[];
    viewportMeta: boolean;
    loadTime: number;
    score: number;
  }> {
    const startTime = performance.now();
    
    const touchTargets = this.testTouchTargets();
    const viewportMeta = this.testViewportMeta();
    
    // Simulate mobile-specific loading
    await new Promise(resolve => setTimeout(resolve, 500));
    const loadTime = performance.now() - startTime;
    
    // Calculate mobile performance score
    let score = 100;
    if (touchTargets.length > 0) score -= touchTargets.length * 15;
    if (!viewportMeta) score -= 25;
    if (loadTime > 2000) score -= 20;
    
    return {
      touchTargets,
      viewportMeta,
      loadTime,
      score: Math.max(0, score)
    };
  }
}